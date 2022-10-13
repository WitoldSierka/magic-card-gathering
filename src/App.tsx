import React from 'react';
import './App.css';
import HttpsService from './components/HttpsService';
import UserDeckGallery from './components/UserDeckGallery';

import {
  createBrowserRouter,
  Link,
  BrowserRouter,
  RouterProvider,
  Routes,
  Route
} from "react-router-dom";

function App() {

  let mockCards = [
    {
      multiverseid: 386616,
      imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=386616&type=card"
    },
    {
      multiverseid: 409741,
      imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409741&type=card"
    },
    {
      multiverseid: 111111,
      imageUrl: ""
    }
  ]

  async function myFunction() {
    const card = await HttpsService.getCardById(386616);
    console.log(card);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="navMenu">
          <Link to={"/"} >Strona główna</Link>
          <Link to={"/about"} >O nas </Link>
          <Link to={"/card/123456"} >Karta 123456 </Link>
          <Link to={"/userDeck/gallery"} >Your Cards</Link>
        </div>
          <button onClick={myFunction}>click me</button>
          <h2>Tu będzie menu</h2>
          <Routes>
            <Route path='/' element={<div>Hello world!</div>} />
            <Route path='/about' element={<div>O nas</div>} />
            <Route path='/card/:cardI' element={<div>Nazwa karty</div>} />
            <Route path='/userDeck/gallery' element={<UserDeckGallery arrayOfCards={mockCards}/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
