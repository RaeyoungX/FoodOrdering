import { CART_ADD_ITEM, CART_REMOVE_ITEM , CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD} from '../contents/cartConstents'
import axios from 'axios'

 
export const addToCart = (id, qty,fromProductPage = false) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  // 计算新的数量
  const itemInCart = getState().cart.cartItems.find((x) => x.product === id);
  const currentQty = itemInCart ? itemInCart.qty : 0;
  const newQty = fromProductPage ? currentQty + qty : qty; 

  // 用更新后的数量派发动作
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      qty: newQty > data.stock ? data.stock : newQty, // 不要超过库存量
      fromProductPage
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//保存收货地址action
export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

//保存支付方式action
export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })
  localStorage.setItem('paymentMethod', JSON.stringify(data))
}