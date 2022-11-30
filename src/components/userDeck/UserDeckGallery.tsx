import React, { useState, useEffect } from "react";
import './UserDeckGallery.css';
//import HttpsService from "./HttpsService";
import CardTemplate from "../CardTemplate";
import CardsFilter from "../generic/CardsFilter";
import ManaCostChart from "./ManaCostChart";
import RenderCard from "../generic/RenderCard"

const UserDeckGallery: React.FC<{arrayOfCards: CardTemplate[], onSaveDeck:any, onDeleteCardsFromDeck: any }> = (props) => {
  const [filteredMana, setFilteredMana] = useState("none");
  const [cardDeletionPhase, setCardDeletionPhase] = useState(false);
  const [cursor, setCursor] = useState("auto");

  useEffect(() => {
    if (cardDeletionPhase) {
      setCursor("crosshair");
    } else {
      setCursor("auto");
    }
  }, [cardDeletionPhase])

  const deleteCardsFromDeck = (index: any) => {
    if (cardDeletionPhase) {
      let tempArr = [...props.arrayOfCards];
      tempArr.splice(index, 1);
      props.onDeleteCardsFromDeck(tempArr);
    }
  }

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
      cardsMana += card.manaCost.length / 3;
      if (!Number.isNaN(Number(card.manaCost[1]))) {
        cardsMana += Number(card.manaCost[1]) - 1;
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
      <div className="user-deck" style={{cursor: cursor}}>
        <h1>This is your deck</h1>
        <CardsFilter selected={filteredMana} onChangeFilter={filterChangeHandler}/>
        <div className="user-deck-gallery">
          {filteredCards.map((card: CardTemplate, index: number) => {
            return (
              <div key={index} onClick={() => deleteCardsFromDeck(index)}>
                <RenderCard card={card} nameOfClass="card-in-gallery" isSelectable={false}/>
              </div>
            )
          })}
        </div>
        <button onClick={saveDeck} >Save your deck for later</button>
        {cardDeletionPhase? (
          <button onClick={() => setCardDeletionPhase(false)}>Cancel removing cards</button>
        ) : (
          <button onClick={() => setCardDeletionPhase(true)}>Remove cards from your deck</button>
        )}
        <ManaCostChart arrayOfCards={filteredCards}/>
      </div>
    );
  }

}

export default UserDeckGallery;