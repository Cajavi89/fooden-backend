const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    uppercase: true,
    required : true,
  },
  lastName: {
    type: String,
    uppercase: true,
    required : true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password:{
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  isVerified:{
    type: Boolean,
    default: false
  },
  role:{
    type: String,
    default: 'user'
  },
  passwordResetToken: String,
  passwordResetExpires: Date
},{
  timestamps: true
});

// encriptacion de contrasena
userSchema.pre('save', async function(next){
  const user = this;
  try {
    if(!user.isModified('password')){
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password= hash;

  } catch (error) {
    next(error)
  }
});

// comparacion de contrasenas
userSchema.methods.comparePassword = async function (candidatePassword){
  const user = this;
  try {
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (error) {
    throw error
  }
};

userSchema.virtual('profile').get(function() {
  const user = this;
  const {firstName, lastName, email, role} = user
  return {fullName: `${firstName} ${lastName}`, role, email};

})

module.exports= new mongoose.model('User', userSchema);
