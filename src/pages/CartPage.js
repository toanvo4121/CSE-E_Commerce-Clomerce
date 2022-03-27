import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import PayPal from '../components/PayPal'
import '../stylesheets/cart.css'

import Layout from '../components/Layout'
import fireDB from '../fireConfig'
import { render } from '@testing-library/react'

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
      temp = temp + parseInt(cartItems.price)
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
    const addressInfo = { name, address, pincode, phoneNumber }
    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem('currentUser')).user.email,
      userId: JSON.parse(localStorage.getItem('currentUser')).user.uid,
    }

    try {
      setLoading(true)
      const result = await addDoc(collection(fireDB, 'orders'), orderInfo)
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
    const addressInfo = { name, address, pincode, phoneNumber }
    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem('currentUser')).user.email,
      userId: JSON.parse(localStorage.getItem('currentUser')).user.uid,
    }
    const payInfor = {
      orderInfo,
      totalAmount,
    }
    setPaypalInfor(payInfor)
  }

  const updateOrder = async () => {
    try {
      const result = await addDoc(
        collection(fireDB, 'orders'),
        PaypalInfor.orderInfo
      )
      localStorage.setItem('isPaypalSuccess', false)
      handleClose()
      deleteAllCart()
    } catch (error) {}
  }

  return (
    <Layout loading={loading}>
      <div style={{ marginTop: '100px' }}></div>
      <table className='table mt-3'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height='80' width='80' />
                </td>
                <td>{item.name}</td>
                <td>{item.price} USD</td>
                <td>
                  <FaTrash
                    onClick={() => {
                      deleteFromCart(item)
                    }}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='d-flex justify-content-end'>
        <h1 className='total-amount'>Total Amount ={totalAmount} USD </h1>
      </div>
      <div className='d-flex justify-content-end mt-3'>
        <button onClick={handleShow}>Place Order</button>
      </div>
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
        <Modal.Footer>
          <button variant='primary' onClick={placeOrder}>
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
