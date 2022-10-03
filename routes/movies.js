import { Router } from 'express'
import * as moviesCtrl from '../controllers/movies.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', moviesCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, moviesCtrl.create)
router.delete('/:id', checkAuth, moviesCtrl.delete)

export { router }
