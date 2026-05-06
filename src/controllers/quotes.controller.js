import * as quotesService from '../services/quotes.service.js'

export const getRandomQuote = async (req, res) => {
  try {
    const quote = await quotesService.fetchRandomQuote()
    if (quote?.error){
      res.status(503).json({"Error": "Error al obtener una frase de la api"})
    }else{
      res.status(200).json(quote)
    }
  } catch (error) {
    res.status(500).json({ "Error": 'Internal Server Error' })
  }
}

export const addFavoriteQuote = (req, res) => {

  if(!req.body){
    return res.status(500).json({"Error": "Missing body"})
  }

  const { quote, author } = req.body

  if (!quote) {
    return res.status(400).json({ "Error": 'Missing requirement: quote' })
  }
  if (!author) {
    return res.status(400).json({ "Error": 'Missing requirement: author' })
  }

  try {
    const newFavorite = quotesService.saveFavoriteQuote({ quote, author })
    res.status(201).json({ "message": 'Frase guardada', "favorite": newFavorite })
  } catch (error) {
    res.status(500).json({ "message": 'Internal Server Error' })
  }
}

export const getFavoriteQuotes = (req, res) => {
  try {
    const favorites = quotesService.getAllFavoriteQuotes()
    res.status(200).json({ favorites })
  } catch (error) {
    res.status(500).json({ "message": 'Internal Server Error' })
  }
}

export const deleteFavoriteQuote = (req, res) => {
  const { id } = req.params

  try {
    const deleted = quotesService.removeFavoriteQuote(id)
    if (!deleted) {
      return res.status(404).json({ "message": 'No encontrado: El id proporcionado no existe.' })
    }
    res.status(200).json({ "message": 'Frase borrada' })
  } catch (error) {
    res.status(500).json({ "message": 'Internal Server Error' })
  }
}