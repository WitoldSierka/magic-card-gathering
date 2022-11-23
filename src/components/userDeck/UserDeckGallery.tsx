import React, {useState} from "react";
import './UserDeckGallery.css';
//import HttpsService from "./HttpsService";
import CardTemplate from "../CardTemplate";
import CardsFilter from "../generic/CardsFilter";
import RenderCard from "../generic/RenderCard"

const UserDeckGallery: React.FC<{arrayOfCards: CardTemplate[], onSaveDeck:any }> = (props) => {
  const [filteredMana, setFilteredMana] = useState("0");

  function saveDeck() {
    props.onSaveDeck();
  }

  const filterChangeHandler = (selectedMana: string) => {
    setFilteredMana(selectedMana);
  }

  const filteredCards = props.arrayOfCards.filter((card: CardTemplate) => {
    if (filteredMana === "none") return true;
    let cardsMana = 0;
    if (card.manaCost !== undefined) {
      if (!Number.isNaN(card.manaCost[1])) {
        cardsMana = Number(card.manaCost[1]);
      }
    }
    return cardsMana <= Number(filteredMana);
  });

  if (props.arrayOfCards.length === 0) {
    return (
      <div className="empty-user-deck">You have no cards in your deck</div>
    );
  } else {
    return (
      <div>
        <h3>This is your deck</h3>
        <CardsFilter selected={filteredMana} onChangeFilter={filterChangeHandler}/>
        <div className="user-deck-gallery">
          {filteredCards.map((card: CardTemplate) => <RenderCard card={card} nameOfClass="card-in-gallery" key={Math.random()}/>)}
        </div>
        <button onClick={saveDeck} >Save your deck for later</button>
      </div>
      
    );
  }

}

export default UserDeckGallery;