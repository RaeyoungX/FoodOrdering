import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './config/db.js'
import cors from 'cors'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
 
dotenv.config()
connectDB()

const app= express()
 
 
  
app.use(cors());
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/',(req, res) => {
     res.send('服务器运行...')
} )

app.get('/api/products',(req, res) => {
    res.json(products)
} )
app.get('/api/products/:id',(req, res) => {
    const product = products.find(product => product._id === req.params.id)
    res.json(product)

} )

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5001

app.listen(
    PORT,
    console.log(`服务器在${process.env.NODE_ENV}模式下${PORT}号运行`.yellow.bold)
)