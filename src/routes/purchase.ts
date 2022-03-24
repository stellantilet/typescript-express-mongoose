import { Request, Response, Router } from 'express'
import HttpStatusCodes from 'http-status-codes'
import { PurchaseError, PurchaseService } from '../services/purchase'

const router: Router = Router()

/**
 * @route   POST purchase/:username/:productId
 * @desc    Purchase the product
 **/
router.post('/:username/:productId', async (req: Request, res: Response) => {
  try {
    const { username, productId } = req.params
    const { quantity } = req.body

    if (!quantity || parseInt(quantity, 10) + 0 === 0) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: 'Quantity is not provided.',
      })
    }

    const receipt = await PurchaseService.purchaseProduct(
      username,
      productId,
      quantity,
    )
    return res.json(receipt)
  } catch (err) {
    console.log(err)
    if (err instanceof PurchaseError) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      })
    }
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error.' })
  }
})

export default router
