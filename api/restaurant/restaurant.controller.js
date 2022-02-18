
const res = require('express/lib/response');
const {
  // getRestaurants,
  getRestaurantDetails,
  getRestaurantPhoto,
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById
} = require('./restaurant.service.js')

// async function getAllRestaurants(req, res){
//   try {
//     const restaurants = await getRestaurants();
//     return res.status(200).json(restaurants)
//   } catch (error) {
//     return res.status(400).json({ Error: error.message })
//   }
// }

async function getAllRestaurantDetails(req,res) {
  const { place_id } = req.params
  console.log('PARAAAAAMS', place_id)
  try {
    const details = await getRestaurantDetails(place_id);
    return res.status(200).json(details)
  } catch (error) {
    return res.status(400).json({Error: error.message})
  }
}

async function getAllRestaurantPhotos(req,res) {
  const { photo_reference } = req.params
  console.log('PARAAAAAMS', photo_reference)
  try {
    const photo = await getRestaurantPhoto(photo_reference);
    return res.status(200).json(photo)
  } catch (error) {
    return res.status(400).json({Error: error.message})
  }
}

async function getAllRestaurantsHandler(req, res) {
  try {
    const allRestaurants = await getAllRestaurants();
    return res.status(200).json(allRestaurants)
  } catch (error) {
    return res.status(500).json({Error: error.message})
  }

}

async function createRestaurantHandler(req,res){
  try {
    const restaurant = await createRestaurant(req.body)
    return res.status(201).json(restaurant)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
};

async function getRestaurantByIdHandler(req, res){
  const { id } = req.params
  try {
    const restaurant = await getRestaurantById(id)
    return res.status(200).json(restaurant)
  } catch (error) {
    return res.status(400).json({Error: error.message})
  }
};

async function updateRestaurantByIdHandler(req, res){
  const { id }= req.params
  const review= req.body
  console.log(review);
  try {
    const restaurantToUpdate = await getRestaurantById(id);
    console.log(restaurantToUpdate.reviews);
    restaurantToUpdate.reviews.push(review)

    const updatedRestaurant = await updateRestaurantById(id, restaurantToUpdate)

    if(!updatedRestaurant){
      return res.status(404).json({message: `Restaurant not found with id: ${id}`})
    }
    return res.status(200).json(updatedRestaurant);
  } catch (error) {
    return res.status(400).json({Error: error.message})
  }
};

async function deleteRestaurantHandler(req,res) {
  const { id } = req.params
  try {
    await deleteRestaurantById(id);
    return res.status(202).json({message:` Restaurante eliminado con id: ${id}`})

  } catch (error) {
    return res.status(400).json({Error: error.message})
  }
}

module.exports = {
  // getAllRestaurants,
  getAllRestaurantDetails,
  getAllRestaurantPhotos,
  getAllRestaurantsHandler,
  createRestaurantHandler,
  getRestaurantByIdHandler,
  updateRestaurantByIdHandler,
  deleteRestaurantHandler
};
