import express from 'express'
import quotesRoutes from './src/routes/quotes.routes.js'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(morgan('dev')); 
app.use('/api/v1', quotesRoutes)

app.use((request, response) => {
    response
        .status(404)
        .json({
            msg: "Página no encontrada"
        })
})

export default app