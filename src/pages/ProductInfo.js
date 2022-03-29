import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getDoc, doc } from 'firebase/firestore'
import fireDB from '../fireConfig'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import '../stylesheets/Layout.css'

const ProductInfo = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [product, setProduct] = useState([])
  const { cartItems } = useSelector((state) => state.cartReducer)
  const params = useParams()
  //   console.log("prams", params);
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    try {
      setLoading(true)
      const productTemp = await getDoc(
        doc(fireDB, 'products', params.productid)
      )

      //   console.log(productTemp.data());
      setProduct(productTemp.data())
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }
  return (
    <Layout loading={loading}>
      <div className='container' style={{ marginTop: '150px' }}>
        <div className='row justify-content-center'>
          <div className='col-md-9'>
            {' '}
            {product && (
              <div>
                <div className='products-info'>
                  <img
                    src={product.imageURL}
                    alt='product-info-img'
                    className='product-info-img'
                  />
                  <div className='product-price'>
                    <h2>{product.name}</h2>
                    <p style={{ fontSize: '26px' }}>
                      Giá tiền: <b>${product.price}</b>
                    </p>
                    <hr />
                    <p style={{ fontSize: '20px' }}>Mô tả:</p>
                    <p style={{ marginLeft: '20px' }}>{product.description}</p>
                    <hr />
                    <div className='d-flex justify-content-center my-3'>
                      <button
                        className='gradient_bg btn-add-to-cart'
                        onClick={() => addToCart(product)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductInfo
