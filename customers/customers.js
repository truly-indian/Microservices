const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Customer = require('./customer')
const BodyParser = require('body-parser')
mongoose.connect('mongodb://deepak:deepak123@cluster0-shard-00-00-ewy8l.mongodb.net:27017,cluster0-shard-00-01-ewy8l.mongodb.net:27017,cluster0-shard-00-02-ewy8l.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(() => {
    console.log('database is connected!!')
}).catch((err) => {
  console.log( err)
})

app.use(BodyParser.json())

app.post('/customer' , (req,res) => {
   const NewCustomer = {
       Name: req.body.Name,
       Age: req.body.Age,
       Address: req.body.Address
   }
   new Customer(NewCustomer).save()
   .then((customer) => {
           res.status(200).json({message:'customer added',customer:customer})
   }).catch((err) => {
       console.log(err)
       res.status(404).json({message:'error occured!!'})
   })
})

app.get('/customers' , (req,res) => {
   Customer.find().then((customers) => {
          res.status(200).json(customers)
   }).catch((err) => {
       console.log(err)
       res.status(404).json({message:'error occured!!'})
   })
})


app.get('/customer/:id' , (req,res) => {
    Customer.find({_id: req.params.id}).then((customer) => {
           res.status(200).json(customer)
    }).catch((err) => {
        console.log(err)
        res.status(404).json({message:'error occured!!'})
    })
 })

 app.delete('/customer/:id' , (req,res) => {
         Customer.deleteOne({_id: req.params.id})
         .then(() => {
             res.status(200).json({message:'custoemr deleted successfully!!'})
         }).catch((err) => {
             console.log(err)
             res.status(404).json({message:'error occured!!'})
         })
 })

app.listen(5555 , () => {
    console.log('server started for customer service at port 5555')
})