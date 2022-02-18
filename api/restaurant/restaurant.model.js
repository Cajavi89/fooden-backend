const mongoose  = require("mongoose");


const restaurantSchema= new mongoose.Schema({
  nameRestaurant:{
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  neighborhood: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  rating: {
    type: Number
  },
  foodType: {
    type: Array
  },
  reviews: [
    {
      comment: {
        type: String,
      }
    }
  ]
},{
  timestamps:true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
