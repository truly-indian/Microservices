const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BookSchema = new Schema({
   Title: {
       type:String,
       require:true
   },
   Author:{
       type:String,
       require:true
   },
   NumberOfPages:{
       type: Number,
       require:true
   },
   Publisher:{
       type:String,
       require:true
   }
})

const Book = mongoose.model('book' , BookSchema)

module.exports = Book