import React from "react";
import './UserDeckGallery.css';
//import HttpsService from "./HttpsService";
import CardTemplate from "../CardTemplate";
import RenderCard from "../generic/RenderCard"

const UserDeckGallery: React.FC<{arrayOfCards: CardTemplate[], onSaveDeck:any }> = (props) => {

  function saveDeck() {
    props.onSaveDeck();
  }

  if (props.arrayOfCards.length === 0) {
    return (
      <div className="empty-user-deck">You have no cards in your deck</div>
    );
  } else {
    return (
      <div>
        <h3>This is your deck</h3>
        <div className="user-deck-gallery">
          {props.arrayOfCards.map((card: CardTemplate) => <RenderCard card={card} nameOfClass="card-in-gallery" key={Math.random()}/>)}
        </div>
        <button onClick={saveDeck} >Save your deck for later</button>
      </div>
      
    );
  }

}

export default UserDeckGallery;