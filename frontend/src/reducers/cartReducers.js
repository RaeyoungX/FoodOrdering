import { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD, } from '../contents/cartConstents'

//购物车reducer
export const cartReducer = (state = { cartItems: [],shippingAddress:{}}, action) => {
  switch (action.type) {
    // 在cartReducer中
    case CART_ADD_ITEM: {
      const { product, name, image, price, stock, qty, fromProductPage } = action.payload;
      const existItem = state.cartItems.find(x => x.product === product);
    
      if (existItem) {
        const updatedQty = fromProductPage ? existItem.qty + 1 : qty;
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === product ? { ...x, qty: updatedQty } : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload }
    
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload }
      
    default:
      return state
  }
}