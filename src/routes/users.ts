import { Request, Response, Router } from 'express'
import HttpStatusCodes from 'http-status-codes'
import { UserService } from '../services/user'

const router: Router = Router()

/**
 * @route   GET users
 * @desc    Get all users
 **/
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await UserService.getUsers()
    res.json(users)
  } catch (err) {
    console.error(err.message)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error.')
  }
})

/**
 * @route   GET users/:username
 * @desc    Get user information
 **/
router.get('/:username', async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUser(req.params.username)
    if (!user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: 'There is no user.',
      })
    }
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error.')
  }
})

/**
 * @route   GET user/:username
 * @desc    Get user information
 **/
router.get('/:username/details', async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserDetail(req.params.username)
    if (!user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: 'There is no user.',
      })
    }
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error.' })
  }
})

export default router
