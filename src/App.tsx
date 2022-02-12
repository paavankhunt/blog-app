import React from "react";
import {Home, Navbar, AddBlog} from "./components";
import { Routes, Route} from "react-router-dom";

 const App=() =>{
  return (
  <div className="m-0 p-0">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/addblog" element={<AddBlog/>} />
    </Routes>
    </div>
  );
}

export default App;
