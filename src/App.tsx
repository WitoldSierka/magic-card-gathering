import React from 'react';
import './App.css';

import {
  createBrowserRouter,
  Link,
  BrowserRouter,
  RouterProvider,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div className="navMenu">
        <Link to={"/"} >Strona główna</Link>
          <Link to={"/about"} >O nas </Link>
          <Link to={"/card/123456"} >Karta 123456 </Link>
        </div>
          <h2>Tu będzie menu</h2>
          <Routes>
            <Route path='/' element={<div>Hello world!</div>} />
            <Route path='/about' element={<div>O nas</div>} />
            <Route path='/card/:cardI' element={<div>Nazwa karty</div>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
