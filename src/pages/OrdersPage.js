import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
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
                  <h2 className='payday'>Day: {order.payday}</h2>
                  <hr />
                  {order.cartItems.map((item) => {
                    return (
                      <div className='product'>
                        <img src={item.imageURL} alt='' />
                        <div className='product-info'>
                          <h3 className='product-name'>{item.name}</h3>
                          <h2 className='product-cart-price'>
                            {item.price} USD
                          </h2>
                        </div>
                      </div>
                    )
                  })}
                  <hr />
                  <h2 className='order-price'>
                    Total price: {order.totalAmount} USD
                  </h2>
                </div>
              )
            })}
        </div>
      </div>
    </Layout>
  )
}

export default OrdersPage
