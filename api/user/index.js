const { Router } = require('express')

const {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
  loginUserHandler,
  getUserByEmailHandler
 } = require('./user.controller')

 const { isAuthenticated } = require('../../auth/auth.services')

const router = Router();

router.get('/', getAllUsersHandler );
router.post('/', createUserHandler );
router.post('/login', loginUserHandler);
router.get('/userEmail', getUserByEmailHandler);
router.get('/:id', getUserByIdHandler );
router.patch('/:id', isAuthenticated, updateUserByIdHandler );
router.delete('/:id', deleteUserByIdHandler );




module.exports = router;
