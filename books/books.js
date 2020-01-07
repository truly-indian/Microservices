const express = require('express')
const app = express()
const mongoose = require('mongoose')
const BodyParser = require('body-parser')
const Book = require('./book')
mongoose.connect('mongodb://deepak:deepak123@cluster0-shard-00-00-ewy8l.mongodb.net:27017,cluster0-shard-00-01-ewy8l.mongodb.net:27017,cluster0-shard-00-02-ewy8l.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(() => {
    console.log('database is connected!!')
}).catch((err) => {
  console.log( err)
})

app.use(BodyParser.json())

app.get('/' , (req,res) => {
   res.send('this is our main page!!')
})

app.get('/book/:id' , (req,res) => {
     Book.find({_id:req.params.id})
     .then((book) => {
            res.status(200).json(book)
     }).catch((err) => {
       console.log(err)
       res.status(404).json({message:'No book found!!'})
     })
})

app.get('/books' , (req,res) => {
     Book.find()
     .then((books) => {
        res.status(200).json(books)
     }).catch((err) => {
       console.log(err)
       res.status(404).json({message:'error occured!!'})
     })
})

app.post('/book' , (req,res) => {
    //console.log(req.body)
    const NewBook = {
      Title: req.body.Title,
      Author: req.body.Author,
      Publisher: req.body.Publisher,
      NumberOfPages: req.body.NumberOfPages
    }
    new Book(NewBook).save()
    .then((NewBook) => {
            console.log(NewBook)
            res.status(200).json({message: 'Book added sucessfully!!',addedBook:NewBook})
    }).catch((err) => {
         console.log(err)
         res.status(404).json({message:'an error occured!!'})
    })
})

app.delete('/book/:id' , (req,res) => {
     Book.deleteOne({_id: req.params.id})
     .then(() => {
          res.status(200).json({message:'Book deleted successfully!!'})
     }).catch((err) => {
         console.log(err)
         res.status(404).json({message:'error occured!!'})
     })
})

app.listen(3000 , () => {
    console.log('server started at port 3000')
})