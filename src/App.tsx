import React, { useState } from 'react';
import './App.css';
//import HttpsService from './components/HttpsService';
import UserDeckGallery from './components/userDeck/UserDeckGallery';
import FindCards from './components/cardFinding/FindCards';
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

  const [userCardsDeck, setUserCardsDeck] = useState<CardTemplate[]>(/*() => {
    const savedDeck  = JSON.parse(localStorage.getItem("magic card gathering user deck") || "") as CardTemplate[];
    return savedDeck || [];
  }*/ [] );

  const cardAddingHandler = (cardToAddToDeck: CardTemplate | CardTemplate[]) => {
    if (Array.isArray(cardToAddToDeck)) {
      const newDeck: CardTemplate[] = userCardsDeck.concat(cardToAddToDeck);
      setUserCardsDeck(newDeck);
    } else {
      if (cardToAddToDeck.originalText !== 'test_case: empty') {
        const updatedDeck: CardTemplate[] = [...userCardsDeck, cardToAddToDeck];
        setUserCardsDeck(updatedDeck);
      }
    }
    
  };

  const cardRemovingHandler = (newDeck: CardTemplate[]) => {
    setUserCardsDeck(newDeck)
  }

  const deckSavingHandler = () => {
    console.log('user wants to save deck');
    localStorage.setItem("magic card gathering user deck", JSON.stringify(userCardsDeck));
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="nav-menu">
          <Link to={"/"} >Strona główna</Link>
          <Link to={"/card/123456"} >Karta 123456 </Link>
          <Link to={"/userDeck/gallery"} >Your Cards</Link>
          <Link to={"/findCards"} >Find Cards </Link>
        </div>
          <Routes>
            <Route path='/' element={<div>Hello world!</div>} />
            <Route path='/card/:cardI' element={<div>Nazwa karty</div>} />
            <Route path='/userDeck/gallery' element={<UserDeckGallery arrayOfCards={userCardsDeck} onSaveDeck={deckSavingHandler} onDeleteCardsFromDeck={cardRemovingHandler}/>} />
            <Route path='/findCards' element={<FindCards onAddCardToDeck={cardAddingHandler} onAddManyCardsToDeck={cardAddingHandler} />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
