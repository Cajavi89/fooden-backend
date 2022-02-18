const User = require('./user.model');


async function getAllUsers(){
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error
  }

};

async function createUser(infoUser){
  try {
    const newUser = new User(infoUser);
    const savedUser = await newUser.save()
    return savedUser
  } catch (error) {
    throw error
  }
};

async function getUserById(id){
  try {
    const user = await User.findById(id)
    return user
  } catch (error) {
    throw error
  }
};

async function updateUserById(id, infoToUpdate){
  try {
    const updatedUser = await User.findByIdAndUpdate(id, infoToUpdate, {new: true})
    return updatedUser
  } catch (error) {
    throw error
  }
};

async function deleteUserById(id){
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser
  } catch (error) {
    throw error
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById
}
