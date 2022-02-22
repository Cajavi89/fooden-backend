const { Router } = require('express');
const multer = require('multer');

const { uploadSingleHandler , uploadArrayHandler} = require('./upload.controller');
 const { isAuthenticated } = require('../../auth/auth.services')


const router = Router();
const upload = multer({dest: './temp'})

router.post('/file', upload.single('file'),isAuthenticated, uploadSingleHandler)
router.post('/files', upload.array('file'),isAuthenticated, uploadArrayHandler)

module.exports = router;
