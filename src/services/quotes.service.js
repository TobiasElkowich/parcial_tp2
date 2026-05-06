import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FAVORITOS_FILE = path.join(__dirname, '../../data/favorites.json')

export const fetchRandomQuote = async () => {
  try {
    const response = await axios.get(process.env.API_URL)
    // console.log("API response: ", response.data)
    const { q, a } = response.data[0]
    return { quote: q, author: a }
  } catch (error) {
    console.log('Error al traer una frase:', error.message)
    return { "error": error.message }
  }
}

const readFavorites = () => {
  try {
    const data = fs.readFileSync(FAVORITOS_FILE, 'utf-8')
    // console.log("data: ", data)
    return JSON.parse(data)
  } catch (error) {
    console.log("Error:", error.message)
    return []
  }
}

const writeFavorites = (favorites) => {
  fs.writeFileSync(FAVORITOS_FILE, JSON.stringify(favorites), 'utf-8')
};

export const saveFavoriteQuote = ({ quote, author }) => {
  const favorites = readFavorites()
  const newFavorite = {
    id: Date.now().toString(),
    quote,
    author,
    createdAt: new Date().toISOString(),
  };
  favorites.push(newFavorite)
  writeFavorites(favorites)
  return newFavorite
}

export const getAllFavoriteQuotes = () => {
  return readFavorites()
}

export const removeFavoriteQuote = (id) => {
  let favorites = readFavorites()
  const initialLength = favorites.length
  favorites = favorites.filter(fav => fav.id !== id)
  writeFavorites(favorites)
  return favorites.length < initialLength
}