import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js'
import { postVideo, viewVideo } from '../controllers/videoController.js'


const router = express.Router()

router.post('/postvideo', isAuthenticated, postVideo)

router.get('/viewpost', viewVideo)



export default router;