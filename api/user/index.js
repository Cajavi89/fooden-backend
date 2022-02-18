const { Router } = require('express')

const {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
  loginUserHandler
 } = require('./user.controller')

 const { isAuthenticated } = require('../../auth/auth.services')

const router = Router();

router.get('/', getAllUsersHandler );
router.post('/', createUserHandler );
router.get('/:id', getUserByIdHandler );
router.patch('/:id', isAuthenticated, updateUserByIdHandler );
router.delete('/:id', deleteUserByIdHandler );
router.post('/login', loginUserHandler);




module.exports = router;
