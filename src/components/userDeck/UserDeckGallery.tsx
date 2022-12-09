import React, { useState, useEffect } from "react";
import './UserDeckGallery.css';
//import HttpsService from "./HttpsService";
import CardTemplate from "../CardTemplate";
import CardsFilter from "../generic/CardsFilter";
import ManaCostChart from "./ManaCostChart";
import RenderCard from "../generic/RenderCard"
import SortCards from "../generic/SortCards";

const UserDeckGallery: React.FC<{arrayOfCards: CardTemplate[], onSaveDeck:any, onDeleteCardsFromDeck: any }> = (props) => {
  const [filteredMana, setFilteredMana] = useState("none");
  const [cardDeletionPhase, setCardDeletionPhase] = useState(false);
  const [cursor, setCursor] = useState("auto");
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    if (cardDeletionPhase) {
      setCursor("crosshair");
    } else {
      setCursor("auto");
    }
  }, [cardDeletionPhase])

  function sortHandler(whatSort: string) {
    setSort(whatSort);
  }

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

  function cardSortandFilter(arrOfCards: CardTemplate[]) {
    let tempArr = arrOfCards.filter((card) => {
      if (filteredMana === "none") return true;
      return card.cmc! <= Number(filteredMana);
    });
    switch (sort) {
      case "mana-cost-inc":
        return tempArr.sort((a, b) => a.cmc! - b.cmc!);
      case "mana-cost-dec":
        return tempArr.sort((a, b) => b.cmc! - a.cmc!);
      case "nameAZ":
        return tempArr.sort((a, b) => a.name!.localeCompare(b.name!));
      case "nameZA":
        return tempArr.sort((a, b) => b.name!.localeCompare(a.name!));
      case "typeAZ":
        return tempArr.sort((a, b) => a.type!.localeCompare(b.type!));
      case "typeZA":
        return tempArr.sort((a, b) => b.type!.localeCompare(a.type!));
      default:
        return tempArr;
    }
  }

  const readyToRenderCards = cardSortandFilter(props.arrayOfCards);

  if (props.arrayOfCards.length === 0) {
    return (
      <div className="empty-user-deck">You have no cards in your deck</div>
    );
  } else {
    return (
      <div className="user-deck" style={{cursor: cursor}}>
        <h1>This is your deck</h1>
        <CardsFilter selected={filteredMana} onChangeFilter={filterChangeHandler}/>
        <SortCards onSelectedSorting={sortHandler} />
        <div className="user-deck-gallery">
          {readyToRenderCards.map((card: CardTemplate, index: number) => {
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
        <ManaCostChart arrayOfCards={readyToRenderCards}/>
      </div>
    );
  }

}

export default UserDeckGallery;