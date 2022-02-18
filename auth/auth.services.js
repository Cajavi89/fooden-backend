const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../api/user/user.service')

const config = {
  secrets: {
    session: 'm1p455w0rd'
  },
  expiresIn: '1h',
}

async function isAuthenticated(req,res,next){
  const authHeader = req.headers?.authorization;

  //verificar si llega el token por headers.
  if(!authHeader){
    return res.status(401).json({
      message: 'Unauthorized'
    });
  };

  //capturar el token de los headers, destructuring con split espacio.
  const [, token] = authHeader.split(' ');

  //validar token
  const payload = await validateToken(token)

  if(!payload){
    return res.status(401).json({
      message: 'Unauthorized'
    });
  };

  const user = await getUserByEmail(payload.email)

  //validar que el usuario exista
  if(!user){
    return res.status(401).json({
      message:'Unauthorized'
    });
  };

  req.user= user;

  next()
};

async function hasRole(req, res, next, role){
  const { user } = req;

  if(user.role !== role){
    return res.status(403).json({
      message: 'Forbidden'
    });
  };

  next()
};

async function validateToken(token){
  try {
    const payload = await jwt.verify(token, config.secrets.session);
    return payload;
  } catch (error) {
    throw error
  }
};

function signToken(payload){
  const token = jwt.sign(payload, config.secrets.session,{
      expiresIn: config.expiresIn
    });

    return token
}


module.exports = {
  signToken,
  isAuthenticated,
  hasRole
}
