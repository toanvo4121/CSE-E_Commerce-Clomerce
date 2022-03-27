import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";

const Layout = (props) => {
  return (
    <div>
      {props.loading && <Loader />}
      <Header />
      <div className="content">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
