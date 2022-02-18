require('dotenv').config();
const axios = require('axios');
const Restaurant = require('./restaurant.model')



async function getRestaurants(){
  //configuration Axios call to google api
  const config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants%20in%Medellin&key=${process.env.GOOGLE_API_KEY}`,
    headers: { }
  };
  try {
    const restaurantsData = await axios(config)
      return await restaurantsData.data
  } catch (error) {
    throw error
  }
}

async function getRestaurantDetails(placeId){
  //configuration Axios call to google api
  const config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_API_KEY}`,
    headers: { }
  };
  try {
    const restaurantDetails = await axios(config)
      return await restaurantDetails.data
  } catch (error) {
    throw error
  }
}

async function getRestaurantPhoto(photo_reference){
  //configuration Axios call to google api
  const config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/photo/&photo_reference=${photo_reference}&key=${process.env.GOOGLE_API_KEY}`,
    headers: { }
  };
  try {
    const restaurantPhoto = await axios(config)
      return await restaurantPhoto.data
  } catch (error) {
    throw error
  }
}

/**
 * Get All Restaurants
 * @returns all restaurants created
 */
async function getAllRestaurants() {
  try {
    const restaurants = await Restaurant.find()
    return restaurants;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param {object} restaurantInfo details of restaurant
 * @returns restaurant created
 */
async function createRestaurant(restaurantInfo){
  try {
    const newRestaurant = new Restaurant(restaurantInfo);
    const savedRestaurant = await newRestaurant.save();
    return savedRestaurant;
  } catch (error) {
    throw error;
  }
};

async function getRestaurantById(id){
  try {
    const restaurant = await Restaurant.findById(id)
    return restaurant;
  } catch (error) {
    throw error
  }
}

async function updateRestaurantById(id, infoToUpdate){
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, infoToUpdate, {new: true});
    return updatedRestaurant;
  } catch (error) {
    throw error
  }

}

async function deleteRestaurantById(id){
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    return deletedRestaurant
  } catch (error) {
    throw error
  }
};


module.exports = {
  getRestaurants,
  getRestaurantDetails,
  getRestaurantPhoto,
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById
};




