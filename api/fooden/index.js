const { Router } = require('express')

const router = Router();

router.get('/', (req,res)=>{
  res.send('Welcome to Fooden`s Backend');
  console.log('estoy en route Fooden');
});

module.exports = router;
