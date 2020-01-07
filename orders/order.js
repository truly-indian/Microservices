const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  CustomerId:{
      type:mongoose.SchemaTypes.ObjectId,
      require:true
  },
  BookId:{
     type:mongoose.SchemaTypes.ObjectId,
     require:true
  },
  InitialDate:{
      type:Date,
      require:true
  },
  DeliveryDate:{
      type:Date,
      require:true
  }
})


const Order = mongoose.model('order' , OrderSchema)

module.exports = Order