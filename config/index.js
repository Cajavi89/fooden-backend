require('dotenv').config();

const all= {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  expiresInL: '24h',
  seedDB: process.env.NODE_ENV !== 'production',
  secrets: {
    session: process.env.SECRET_KEY || 'th1s_s3cr3t_k3y'
  },
  userRoles:['admin', 'user'],
};

module.exports = all;
