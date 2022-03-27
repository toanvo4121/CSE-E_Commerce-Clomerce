import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
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
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3" style={{ marginTop: '100px' }}
      >
        <Tab eventKey="products" title="Products">
          <div className="d-flex justify-content-between">
            <h3>Products List</h3>
            <button onClick={addHandler}>Add Product</button>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                return (
                  <tr>
                    <td>
                      <img src={item.imageURL} height="80" width="80" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                      <FaTrash
                        color="red"
                        size={20}
                        onClick={() => {
                          deleteProduct(item);
                        }}
                      />

                      <FaEdit
                        onClick={() => editHandler(item)}
                        color="blue"
                        size={20}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
              <table className="table mt-3 order">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img src={item.imageURL} height="80" width="80" />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
        </Tab>
        <Tab eventKey="contact" title="Contact">
          <h1>Users</h1>
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default Adminpage;
