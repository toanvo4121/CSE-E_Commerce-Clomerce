import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import fireDB from '../fireConfig'
import { fireproducts } from '../firecommerce-products'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import slide from '../assets/slide.png'
import Logo from '../assets/clomerce-slide-white.png'
import { Mem1, Mem2, Mem3, Mem4, Mem5 } from '../assets'

const Homepage = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cartReducer)
  const [products, setProducts] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [filterType, setFilterType] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    getData()
  }, [])

  function addProductsData() {
    fireproducts.map(async (product) => {
      try {
        await addDoc(collection(fireDB, 'products'), product)
      } catch (error) {
        console.log(error)
      }
    })
  }
  async function getData() {
    try {
      setLoading(true)
      const users = await getDocs(collection(fireDB, 'products'))
      const productsArray = []
      users.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const obj = { id: doc.id, ...doc.data() }
        productsArray.push(obj)
        setLoading(false)
      })
      //   console.log("test");
      setProducts(productsArray)
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
      <div className='slide'>
        <img src={slide} alt='' />
        <div className='slide-blur'></div>
        <div className='on-top'>
          <img src={Logo} alt='' />
          <h2>
            Normal clothes make you a princess.
            <br />
            CloMerce make you be a queen.
          </h2>
          <h1>Best Localbrand in your area</h1>
        </div>
      </div>

      <div className='my-content gradient_bg'>
        <h2 className='heading'> Our team </h2>
        <p className='sub-heading'>Industrious people</p>
        <div className='team-container'>
          <div className='card card1'>
            <div className='imgBx'>
              <img src={Mem1} alt='' className='img-about' />
            </div>
            <div className='card-content'>
              <h3>Nguyễn Đình Hiếu</h3>
              <p>MSSV: 1913341</p>
            </div>
          </div>
          <div className='card card2'>
            <div className='imgBx'>
              <img src={Mem2} alt='' className='img-about' />
            </div>
            <div className='card-content'>
              <h2>Nguyễn Hải Linh</h2>
              <p>MSSV: 1913944</p>
            </div>
          </div>
          <div className='card card3'>
            <div className='imgBx'>
              <img src={Mem3} alt='' className='img-about' />
            </div>
            <div className='card-content'>
              <h2>Võ Minh Toàn</h2>
              <p>MSSV: 1915570</p>
            </div>
          </div>
          <div className='card card4'>
            <div className='imgBx'>
              <img src={Mem4} alt='' className='img-about' />
            </div>
            <div className='card-content'>
              <h2>Đặng Hùng Cường</h2>
              <p>MSSV: 1912817</p>
            </div>
          </div>
          <div className='card card5'>
            <div className='imgBx'>
              <img src={Mem5} alt='' className='img-about' />
            </div>
            <div className='card-content'>
              <h2>Nguyễn Tư Phong</h2>
              <p></p>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='show-product'>
          <div className='my-content1 qq'>
            <h2 className='heading'> Product </h2>
            <p className='sub-heading'>Choose what you want</p>
          </div>

          <div className='my-search-bar'>
            <input
              type='text'
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value)
              }}
              placeholder='search items'
            />
            <select
              name=''
              id=''
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value)
              }}
            >
              <option value=''>All</option>
              <option value='shirt'>Shirts</option>
              <option value='pant'>Pants</option>
              <option value='hat'>Hats</option>
            </select>
          </div>

          <div className='card-body'>
            <div className='container-card'>
              {products
                .filter((obj) => obj.name.toLowerCase().includes(searchKey))
                .filter((obj) =>
                  obj.category.toLowerCase().includes(filterType)
                )
                .map((product) => {
                  return (
                    <div className='card'>
                      <div className='imgBx2'>
                        <img src={product.imageURL} alt='' />
                      </div>

                      <div className='content-card'>
                        <div className='productName'>
                          <h3>{product.name}</h3>
                        </div>
                        <div className='price-rating'>
                          <h2>{product.price} USD</h2>
                          <div className='rating'>
                            <i className='fa fa-star' aria-hidden='true'></i>
                            <i className='fa fa-star' aria-hidden='true'></i>
                            <i className='fa fa-star' aria-hidden='true'></i>
                            <i className='fa fa-star' aria-hidden='true'></i>
                            <i className='fa fa-star' aria-hidden='true'></i>
                          </div>
                        </div>
                      </div>

                      <ul className='action'>
                        <li>
                          <i
                            className='fa fa-shopping-cart'
                            aria-hidden='true'
                            onClick={() => {
                              addToCart(product)
                            }}
                          ></i>
                          <span>Add to cart</span>
                        </li>
                        <li>
                          <i
                            className='fa fa-eye'
                            aria-hidden='true'
                            onClick={() => {
                              navigate(`/productinfo/${product.id}`)
                            }}
                          ></i>
                          <span>View details</span>
                        </li>
                      </ul>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage
