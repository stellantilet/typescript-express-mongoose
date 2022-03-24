import { Request, Response, Router } from 'express'
import HttpStatusCodes from 'http-status-codes'
import { ProductService } from '../services/product'

const router: Router = Router()

/**
 * @route   GET products
 * @desc    Get all products
 **/
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await ProductService.getProducts()
    res.json(users)
  } catch (err) {
    console.error(err.message)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error.')
  }
})

/**
 * @route   GET products/:id
 * @desc    Get product information
 **/
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await ProductService.getProduct(req.params.id)
    if (!user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: 'There is no product.',
      })
    }
    res.json(user)
  } catch (err) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error.' })
  }
})

export default router
