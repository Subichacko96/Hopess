import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/pages/Home";
import Blog from "./views/pages/BolgList";
import BlogDetail from "./views/pages/BlogDetails";
import Footer from "./components/Footer/Footer";
import NavbarData from "./components/Header/NavbarData"

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          
          <NavbarData/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/detail" element={<BlogDetail />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
