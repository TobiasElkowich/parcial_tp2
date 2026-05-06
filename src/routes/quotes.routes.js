import express from 'express'
import * as quotesController from '../controllers/quotes.controller.js'

const router = express.Router()

router.get('/quotes/random', quotesController.getRandomQuote)
router.post('/quotes/favorites', quotesController.addFavoriteQuote)
router.get('/quotes/favorites', quotesController.getFavoriteQuotes)
router.delete('/quotes/favorites/:id', quotesController.deleteFavoriteQuote)

export default router