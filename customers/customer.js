const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
   Name: {
       type:String,
       require:true
   },
   Age:{
       type:Number,
       require:true
   },
   Address:{
       type:String,
       require:true
   }
})


const Customer = mongoose.model('customer' , CustomerSchema)

module.exports = Customer