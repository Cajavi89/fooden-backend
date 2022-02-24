const { Router } = require('express');
const {
  getAllRestaurantsHandler,
  getAllRestaurantDetails,
  getAllRestaurantPhotos,
  createRestaurantHandler,
  getRestaurantByIdHandler,
  updateRestaurantByIdHandler,
  deleteRestaurantHandler
} = require('./restaurant.controller')

 const { isAuthenticated, hasRole } = require('../../auth/auth.services')

const router = Router();

router.get('/', getAllRestaurantsHandler);
router.post('/', isAuthenticated,(req,res,next)=> hasRole(req,res,next, 'user'), createRestaurantHandler);
router.get('/details/:place_id', getAllRestaurantDetails);
router.get('/photo/:photo_reference', getAllRestaurantPhotos);
router.get('/:id', getRestaurantByIdHandler);
router.patch('/:id', updateRestaurantByIdHandler);
router.delete('/:id', deleteRestaurantHandler);


module.exports = router;
