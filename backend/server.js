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
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'
import axios from 'axios'

dotenv.config()
connectDB()

const app = express()


 
app.get('/', (req, res) => {
    res.send('服务器已经运行...')
  })
//获取支付的status状态码
app.get('/status', (req, res) => {
    axios.get('https://www.thenewstep.cn/pay/logs/log.txt').then((response) => {
      res.json({ status: response.data })
    })
  })
app.use(cors());
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//upload文件夹作为静态文件
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


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
