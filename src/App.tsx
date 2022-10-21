import React, { useState } from 'react';
import './App.css';
import HttpsService from './components/HttpsService';
import UserDeckGallery from './components/UserDeckGallery';
import FindCards from './components/FindCards';
import CardTemplate from './components/CardTemplate';

import {
  createBrowserRouter,
  Link,
  BrowserRouter,
  RouterProvider,
  Routes,
  Route
} from "react-router-dom";


function App() {

  let mockCards: CardTemplate[] = [
    {
      multiverseid: 386616,
      imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=386616&type=card",
      originalText: "supercool card"
    },
    {
      multiverseid: 409741,
      imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409741&type=card",
      originalText: "supercool card"
    },
    {
      multiverseid: 111111,
      imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=2&type=card",
      originalText: "supercool card"
    }
  ];

  const [userCardsDeck, setUserCardsDeck] = useState<CardTemplate[]>(() => {
    const savedDeck  = JSON.parse(localStorage.getItem("magic card gathering user deck") || "") as CardTemplate[];
    return savedDeck || [];
  });

  async function myFunction() {
    const card = await HttpsService.getCardById(2);
    console.log(card);
  };

  const cardAddingHandler = (cardToAddToDeck: CardTemplate) => {
    console.log(cardToAddToDeck.originalText);
    if (cardToAddToDeck.originalText !== 'test_case: empty') {
      const updatedDeck: CardTemplate[] = [...userCardsDeck, cardToAddToDeck];
      setUserCardsDeck(updatedDeck);
    }
  };

  const deckSavingHandler = () => {
    console.log('user wants to save deck');
    localStorage.setItem("magic card gathering user deck", JSON.stringify(userCardsDeck));
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="navMenu">
          <Link to={"/"} >Strona główna</Link>
          <Link to={"/about"} >O nas </Link>
          <Link to={"/card/123456"} >Karta 123456 </Link>
          <Link to={"/userDeck/gallery"} >Your Cards</Link>
          <Link to={"/findCards"} >Find Cards </Link>
        </div>
          <button onClick={myFunction}>click me</button>
          <h2>Tu będzie menu</h2>
          <Routes>
            <Route path='/' element={<div>Hello world!</div>} />
            <Route path='/about' element={<div>O nas</div>} />
            <Route path='/card/:cardI' element={<div>Nazwa karty</div>} />
            <Route path='/userDeck/gallery' element={<UserDeckGallery arrayOfCards={userCardsDeck} onSaveDeck={deckSavingHandler} />} />
            <Route path='/findCards' element={<FindCards onAddCardToDeck={cardAddingHandler} />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
