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
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  ratingTimes: {
    type: Number
  },
  foodType:
    {
      type: String
    },
  reviews: [
    {
      comment: {
        type: String,
      },
      user:{
        type: String
      }
    }
  ],
  photo: {
    type: String,
  }
},{
  timestamps:true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
