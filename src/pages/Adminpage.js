import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import '../stylesheets/products.css'
const Adminpage = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
  });
  const [add, setAdd] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userid = JSON.parse(localStorage.getItem("currentUser")).user.uid;
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const obj = { id: doc.id, ...doc.data() };
        productsArray.push(obj);
        setLoading(false);
      });
      //   console.log(productsArray);
      setProducts(productsArray);
    } catch (error) {
      //   console.log("error", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getOrdersData();
  }, []);
  console.log(userid);
  async function getOrdersData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        ordersArray.push(doc.data());
        setLoading(false);
      });
      console.log(ordersArray);
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };

  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);
      toast.success("Product updated successfully");
      //   getData();
      window.location.reload();
      handleClose();
    } catch (error) {
      toast.error("Product update failed");
      console.log("e1", error);
      setLoading(false);
    }
  };
  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);
      toast.success("Product added successfully");
      //   getData();
      window.location.reload();
      handleClose();
    } catch (error) {
      toast.error("Product add failed");
      console.log("e1", error);
      setLoading(false);
    }
  };
  const addHandler = () => {
    setAdd(true);
    handleShow();
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product deleted succesfully");
      getData();
      setLoading(false);
    } catch (error) {
      toast.error("Product delete failed");
      setLoading(false);
    }
  };

  return (
    <Layout loading={loading}>
      <div className='admin-container'>
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3" style={{ marginTop: '100px' }}
      >
        <Tab eventKey="products" title="Products">
          <div className="d-flex justify-content-between">
            <h3>Products List</h3>
            <p className='product-add'onClick={addHandler} >
                            <i className='fa fa-plus' aria-hidden='true'></i>
                            <span className='remove'>Add Product</span>
                          </p>
          </div>

          <div className='order-transaction3'>
            <hr/>
                <div className='products-admin'>
          {products.map((item) => {
                return (

                  <div className='product'>
                        <img src={item.imageURL} alt='' />
                        <div className='product-info'>
                          <h4 className='product-name'>{item.name}</h4>
                          <h4 className='product-name'>{item.category}</h4>
                          <h3 className='product-cart-price'>
                            {item.price} USD
                          </h3>

                          <p className='product-edit'onClick={() => {editHandler(item)}} >
                            <i className='fa fa-edit' aria-hidden='true'></i>
                            <span className='remove'>Update</span>
                          </p>

                          <p className='product-remove'onClick={() => {deleteProduct(item)}} >
                            <i className='fa fa-trash' aria-hidden='true'></i>
                            <span className='remove'>Remove</span>
                          </p>
                        </div>
                      </div>
                );
              })}
              </div>
              </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add === true ? "Add Product" : "Update Product"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                  value={product.name}
                  onChange={(e) => {
                    setProduct({ ...product, name: e.target.value });
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="image url"
                  value={product.imageURL}
                  onChange={(e) => {
                    setProduct({ ...product, imageURL: e.target.value });
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="price"
                  value={product.price}
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="category"
                  value={product.category}
                  onChange={(e) => {
                    setProduct({ ...product, category: e.target.value });
                  }}
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="description"
                  value={product.description}
                  onChange={(e) => {
                    setProduct({ ...product, description: e.target.value });
                  }}
                />

              </div>
            </Modal.Body>
            <Modal.Footer>
              <button variant="secondary" onClick={handleClose}>
                Close
              </button>
              {add ? (
                <button variant="primary" onClick={addProduct}>
                  Save
                </button>
              ) : (
                <button variant="primary" onClick={updateProduct}>
                  Save
                </button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          {orders.map((order) => {
            return (
              <div className='order-transaction'>
                <hr/>
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
                <p><span style={{fontWeight: 'bold'}}>Customer</span> : {order.addressInfo.name}</p>
                <p><span style={{fontWeight: 'bold'}}>Order day</span>: {order.payday}</p>
                <p><span style={{fontWeight: 'bold'}}>Address</span>: {order.addressInfo.address}</p>
                <p><span style={{fontWeight: 'bold'}}>Phone number</span>: {order.addressInfo.phoneNumber}</p>
                <p><span style={{fontWeight: 'bold'}}>Email</span>: {order.email}</p>
                <p><span style={{fontWeight: 'bold'}}>Payment method</span>: {order.paymethod}</p>

              </div>
              <div className='hr-position'>
                    <hr/>
                  </div>
                <h2 className='order-price'>
                  Total : {order.totalAmount} USD
                </h2>
              </div>
            )
          })}
        </Tab>
      </Tabs>
      </div>
    </Layout>
  );
};

export default Adminpage;
