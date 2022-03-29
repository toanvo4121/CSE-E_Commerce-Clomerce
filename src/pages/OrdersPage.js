import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import fireDB from '../fireConfig'

const OrdersPage = () => {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const userid = JSON.parse(localStorage.getItem('currentUser')).user.uid
  console.log(userid)
  useEffect(() => {
    getData()
  }, [])
  console.log(userid)
  async function getData() {
    try {
      setLoading(true)
      const result = await getDocs(collection(fireDB, 'orders'))
      const ordersArray = []
      result.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        ordersArray.unshift(doc.data())
        setLoading(false)
      })
      console.log(ordersArray)
      setOrders(ordersArray)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <Layout loading={loading}>
      <div className='p-2' style={{ marginTop: '100px' }}>
        <div className='order-table'>
          {orders
            .filter((obj) => obj.userId === userid)
            .map((order) => {
              return (
                <div className='order-transaction'>
                  <hr />
                  <div className='products'>
                    {order.cartItems.map((item) => {
                      return (
                        <div className='product'>
                          <img src={item.imageURL} alt='' />
                          <div className='product-info'>
                            <h4 className='product-name'>{item.name}</h4>
                            <h3 className='product-cart-price'>
                              {item.price} USD
                            </h3>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className='admin-cart-total'>
                    <p><span style={{ fontWeight: 'bold' }}>Customer</span> : {order.addressInfo.name}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Order day</span>: {order.payday}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Address</span>: {order.addressInfo.address}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Phone number</span>: {order.addressInfo.phoneNumber}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Email</span>: {order.email}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Payment method</span>: {order.paymethod}</p>
                  </div>

                  <div className='hr-position'>
                    <hr />
                  </div>

                  <h2 className='order-price'> Total : {order.totalAmount} USD </h2>

                </div>
              )
            })}
        </div>
      </div>
    </Layout>
  )
}

export default OrdersPage
