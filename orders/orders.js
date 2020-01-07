const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Order = require('./order')
const BodyParser = require('body-parser')
const axios = require('axios')
mongoose.connect('mongodb://deepak:deepak123@cluster0-shard-00-00-ewy8l.mongodb.net:27017,cluster0-shard-00-01-ewy8l.mongodb.net:27017,cluster0-shard-00-02-ewy8l.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(() => {
    console.log('database is connected!!')
}).catch((err) => {
  console.log( err)
})

app.use(BodyParser.json())

app.post('/order' , (req,res) => {
     const NewOrder = {
         CustomerId: mongoose.Types.ObjectId( req.body.CustomerId),
         BookId: mongoose.Types.ObjectId( req.body.BookId),
         InitialDate: req.body.InitialDate,
         DeliveryDate: req.body.DeliveryDate
     }
     new Order(NewOrder).save()
     .then((order) => {
         res.status(200).json({message:'order added successfully',order:order})
     }).catch((err) => {
         console.log(err)
         res.status(404).json({message:'error occured!!'})
     })
})

app.get('/orders', (req,res) => {
   Order.find().then((orders) => {
       res.status(200).json(orders)
   }).catch((err) => {
       res.status(404).json({message:'error'})
   })
})

app.get('/order/:id' , (req,res) => {
     Order.find({_id: req.params.id}).then((order) => {
          
          axios.get('http://localhost:5555/customer/' + order[0].CustomerId)
          .then((response) => {
                //console.log(response)
              const orderObject = {Customername: response.data[0].Name, BookTitle:''}
              axios.get('http://localhost:3000/book/' + order[0].BookId).then((response) => {
                 orderObject.BookTitle = response.data[0].Title
                 console.log(orderObject)
                 res.status(200).json(orderObject)
              })

          })
          .catch((err) => {
             console.log(err)
          })
         // res.status(200).json({message:'sucess'})
     }).catch((err) => {
          console.log(err)
          res.status(404).json({message:'error occured!!'})
     })
})

app.listen(5000 , () => {
    console.log('server started at port 5000')
})