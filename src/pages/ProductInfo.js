import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getDoc, doc } from 'firebase/firestore'
import fireDB from '../fireConfig'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

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
      <div className='container' style={{ marginTop: '100px' }}>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            {' '}
            {product && (
              <div>
                <p>
                  <b>{product.name}</b>
                </p>
                <img
                  src={product.imageURL}
                  alt=''
                  className='product-info-img'
                />
                <hr />
                <p>{product.description}</p>
                <div className='d-flex justify-content-end my-3'>
                  <button onClick={() => addToCart(product)}>
                    Add To Cart
                  </button>
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
