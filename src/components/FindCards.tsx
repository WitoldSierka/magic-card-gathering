import React, { useEffect, useState } from "react";
import HttpsService from "./HttpsService";
import RenderCard from "./RenderCard";
import CardTemplate from "./CardTemplate";

const FindCards: React.FC<{}> = (props) => {

  const emptyCard: CardTemplate = {imageUrl: '', multiverseid: 0, originalText: 'test_case: empty'};

  const [foundCard, setFoundCard] = useState<CardTemplate>(emptyCard);

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
        //setFoundCard(emptyCard);
        console.log('error');
        /*return (
          <div>no card found yet, choose one of the search options or try again!</div>
        );*/
      }
    }
    
  }

  function isCardFound(props: any) {
  console.log(foundCard.name);

  }

  return (
    <div>
      <button onClick={randomCard}>Random card</button>
      <button onClick={isCardFound}>Find cards by specific colors</button>
      <form>Find a card with a specific 'multiverse id'</form>
      <RenderCard card={foundCard} nameOfClass='found-card' />
    </div>
  )
}

export default FindCards;


/*
{
        useEffect(() => {
          
        }, [foundCard])
      }

*/