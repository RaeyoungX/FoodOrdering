import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails , updateProduct} from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCT_UPDATE_RESET } from '../contents/productConstents'

const ProductEditScreen = ({ match, history }) => {
  const navigate = useNavigate();
  const { id: productId} = useParams();
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setstock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails) 
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate


  useEffect(() => {
    if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET })
        navigate('/admin/productlist')
      } else {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setCategory(product.category)
      setstock(product.stock)
    
    }
   }
}, [dispatch, navigate, productId, product, successUpdate])

 //表单提交函数
 const submitHandler = (e) => {
    e.preventDefault()
    //dispatch 更新产品函数
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        stock,
      })
    )
  }

  //处理文件上传
  const uploadFileHandler = async (e) => {
    //获取用户选择上传的文件
    const file = e.target.files[0]
    //实例化formdata表单数据对象
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multerpart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }
  return (
    <FormContainer>
      <Link to='/admin/productlist' className='btn btn-dark my-3'>
        返回上一页
      </Link>
      <h1>编辑产品界面</h1>

      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>名称：</Form.Label>
            <Form.Control
              type='name'
              placeholder='请输入产品名称'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>产品价格：</Form.Label>
            <Form.Control
              type='number'
              placeholder='请输入价格'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
         <Form.Group controlId='image'>
        <Form.Label>图片：</Form.Label>
        <Form.Control
            type='text'
            placeholder='请输入图片路径'
            value={image}
            onChange={(e) => setImage(e.target.value)}
        ></Form.Control>
        {/* 使用原生 HTML input 来替代 Form.File */}
        <input
            type="file"
            id='image-file'
            onChange={uploadFileHandler}
        />
        {uploading && <Loader />}
        </Form.Group>
          <Form.Group controlId='stock'>
            <Form.Label>产品库存：</Form.Label>
            <Form.Control
              type='number'
              placeholder='请输入库存数量'
              value={stock}
              onChange={(e) => setstock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>产品类型：</Form.Label>
            <Form.Control
              type='text'
              placeholder='请输入产品类型'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            更新信息
          </Button>
        </Form>
      )}
    </FormContainer>
  )
}

export default ProductEditScreen