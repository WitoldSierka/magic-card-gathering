import React, { useState } from "react";
import HttpsService from "./HttpsService";
import RenderCard from "./RenderCard";
import CardTemplate from "./CardTemplate";

const FindCards: React.FC<{onAddCardToDeck: any}> = (props) => {

  const emptyCard: CardTemplate = {imageUrl: '', multiverseid: 0, originalText: 'test_case: empty'};

  const [foundCard, setFoundCard] = useState<CardTemplate>(emptyCard);
  const [specifiedIdValue, setSpecifiedIdValue] = useState('');

  async function randomCard() {
    for (let i = 0; i < 10; i++) {
      try {
        const randomNumber = Math.floor(Math.random() * 399999) + 1;
        const myPromise = await HttpsService.getCardById(randomNumber);
        const outputCard = myPromise.card;
        if (outputCard) {
          console.log("we have a card", outputCard);
          setFoundCard(outputCard);
          console.log(foundCard, foundCard.imageUrl);
          break;
        }
      } catch (error) {
        console.log('error');
        /*return (
          <div>no card found yet, choose one of the search options or try again!</div>
        );*/
      }
    }
  }

  async function specifiedIdCard(event: any) {
    event.preventDefault();
    console.log(specifiedIdValue);
    try {
      const myPromise = await HttpsService.getCardById(parseInt(specifiedIdValue));
      setFoundCard(myPromise.card);
      setSpecifiedIdValue('');
    } catch (error) {
      console.log('no card with such id');
    }
  }

  const handleNumbersOnly = (event: any) => {
    const output = event.target.value.replace(/\D/g, '');
    setSpecifiedIdValue(output);
  }

  function addCardToDeck() {
    //console.log(foundCard.originalText);
    props.onAddCardToDeck(foundCard);

  }

  return (
    <div>
      <button onClick={randomCard}>Random card</button>
      <button onClick={addCardToDeck}>Add found card to your deck</button>
      <form onSubmit={specifiedIdCard}>
        <label>Find a card with a specific 'multiverse id'</label>
        <input 
          type="text"
          placeholder="write your cards id here"
          value={specifiedIdValue}
          onChange={handleNumbersOnly}
        />
      </form>
      <RenderCard card={foundCard} nameOfClass='found-card' />
    </div>
  )
}

export default FindCards;