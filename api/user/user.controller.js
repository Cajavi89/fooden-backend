const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByEmail
} = require('./user.service');
const User = require('./user.model')
const { signToken } = require('../../auth/auth.services')

async function getAllUsersHandler(req, res){
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({Error: error.message})
  }
};

async function createUserHandler(req,res){
  try {
    const newUser = await createUser(req.body);
    return res.status(201).json(newUser)
  } catch (error) {
    return res.status(400).json({Error: error.message})
  }
};

async function getUserByIdHandler(req, res){
  const { id } = req.params
  try {
    const user = await getUserById(id)
    if(!user){
      return res.status(404).json({Error: `User with id: ${id}, not found`})
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({Error:error.message})
  }
};

async function updateUserByIdHandler(req,res){
  const { id } = req.params

  try {
    const userFromDB = await getUserById(id);

    userFromDB.profilePhoto = req.body.profilePhoto

    const user = await updateUserById(id, userFromDB);
    const token = signToken(user.profile)
    return res.status(200).json(token);
  } catch (error) {
    return res.status(404).json({Error: error.message})
  }
};


async function deleteUserByIdHandler(req, res) {
  const { id } = req.params
  try {
    const user = await deleteUserById(id);
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({Error: error.message})
  }
}

async function loginUserHandler(req,res){
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(401).json({
        message:'Email o Contrasena invalida'
      });
    };
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      return res.status(401).json({
        message: 'Email o Contrasena invalida',
      });
    };

    const token = signToken(user.profile)

    res.status(200).json(token)
  } catch (error) {
    return res.status(400).json({Error: error.message})
  }
}

async function getUserByEmailHandler(req,res){
  const { email }= req.body
  console.log('BBBBB', req.body);
  try {
    const user = await getUserByEmail(email)
    console.log(user);
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({Error: error.message})
  }
}

module.exports = {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
  loginUserHandler,
  getUserByEmailHandler
}
