import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import PayPal from '../components/PayPal'
import '../stylesheets/cart.css'

import Layout from '../components/Layout'
import fireDB from '../fireConfig'

const CartPage = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const [PaypalInfor, setPaypalInfor] = useState(0)
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cartReducer)
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    setCheckOut(false)
    if (localStorage.getItem('isPaypalSuccess') === 'true') {
      updateOrder()
    }
  }
  const handleShow = () => {
    setShow(true)
  }
  const [name, setName] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkout, setCheckOut] = useState(false)

  useEffect(() => {
    let temp = 0
    cartItems.forEach((cartItems) => {
      temp = temp + parseFloat(cartItems.price)
    })
    setTotalAmount(temp)
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const deleteFromCart = (product) => {
    dispatch({ type: 'DELETE_FROM_CART', payload: product })
  }

  const deleteAllCart = () => {
    dispatch({ type: 'DELETE_ALL_CART', payload: '' })
  }

  const placeOrder = async () => {
    const payday = new Date().toLocaleDateString();
    const paymethod = 'cash payment'
    const addressInfo = { name, address, pincode, phoneNumber }
    const orderInfo = {
      cartItems,
      totalAmount,
      addressInfo,
      email: JSON.parse(localStorage.getItem('currentUser')).user.email,
      userId: JSON.parse(localStorage.getItem('currentUser')).user.uid,
      payday,
      paymethod,
    }

    try {
      setLoading(true)
      await addDoc(collection(fireDB, 'orders'), orderInfo)
      toast.success('Order Placed Successfully')
      setLoading(false)
      handleClose()
      deleteAllCart()
    } catch (error) {
      setLoading(false)
      toast.error('Order Failed')
    }
  }

  const payPaypal = async () => {
    localStorage.setItem('isPaypalSuccess', false)
    const payday = new Date().toLocaleDateString();
    const paymethod = 'paypal payment'
    const addressInfo = { name, address, pincode, phoneNumber }
    const orderInfo = {
      cartItems,
      totalAmount,
      addressInfo,
      email: JSON.parse(localStorage.getItem('currentUser')).user.email,
      userId: JSON.parse(localStorage.getItem('currentUser')).user.uid,
      payday,
      paymethod,
    }
    const payInfor = {
      orderInfo,
      totalAmount,
    }
    setPaypalInfor(payInfor)
  }

  const updateOrder = async () => {
    try {
      await addDoc(
        collection(fireDB, 'orders'),
        PaypalInfor.orderInfo
      )
      localStorage.setItem('isPaypalSuccess', false)
      handleClose()
      deleteAllCart()
    } catch (error) { }
  }

  return (
    <Layout loading={loading}>
      <div className='container'>
        <h1 className='shopping-cart'>Shopping Cart</h1>
        <div className='cart'>
          <div className='products'>
            {cartItems.map((item) => {
              return (
                <div className='product'>
                  <img src={item.imageURL} alt='' />
                  <div className='product-info'>
                    <h3 className='product-name'>{item.name}</h3>
                    <h2 className='product-cart-price'>{item.price} USD</h2>
                    <p
                      className='product-remove'
                      onClick={() => {
                        deleteFromCart(item)
                      }}
                    >
                      <i className='fa fa-trash' aria-hidden='true'></i>
                      <span className='remove'>Remove</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='cart-total'>
            <p>
              <span>Total Price</span>
              <span>{totalAmount} USD</span>
            </p>
            <p>
              <span>Number of Items</span>
              <span>{cartItems.length}</span>
            </p>
            <button className='gradient_bg pay-button' onClick={handleShow}>
              Place Order
            </button>
          </div>
        </div>
      </div>
      {/* Payment Process Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <div>
            <input
              type='text'
              className='form-control'
              placeholder='name'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <textarea
              type='text'
              className='form-control'
              placeholder='address'
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
              }}
            />
            <input
              type='number'
              className='form-control'
              placeholder='pincode'
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value)
              }}
            />
            <input
              type='number'
              className='form-control'
              placeholder='phonenumber'
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value)
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className='modal-footer'>
          <button
            className='btn-payment gradient_bg'
            variant='primary'
            onClick={placeOrder}
          >
            Cash Payment
          </button>

          <div className='App'>
            {checkout ? (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>PayPal Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <PayPal data={PaypalInfor} />
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
            ) : (
              <button
                className='btn-payment gradient_bg'
                onClick={() => {
                  setCheckOut(true)
                  payPaypal()
                }}
              >
                {' '}
                PayPal Payment{' '}
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default CartPage
