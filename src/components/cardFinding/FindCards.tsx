import React, { useState } from "react";
import HttpsService from "../HttpsService";
import RenderCard from "../generic/RenderCard";
import Checkbox from "../generic/Checkbox";
import CardTemplate from "../CardTemplate";
import Config from "../Config";
import "./FindCards.css";

const FindCards: React.FC<{onAddCardToDeck: any, onAddManyCardsToDeck: any}> = (props) => {

  const emptyCard: CardTemplate = {imageUrl: '', multiverseid: '0', originalText: 'test_case: empty'};

  const [foundCard, setFoundCard] = useState<CardTemplate>(emptyCard);
  const [foundManyCards, setFoundManyCards] = useState<CardTemplate[]>([]);
  const [specifiedIdValue, setSpecifiedIdValue] = useState('');
  const [chosenColors, setChosenColors] = useState<string[]>([]);
  const [chosenTypes, setChosenTypes] = useState<string[]>([]);
  const [manyCardsToAddToDeck, setManyCardsToAddToDeck] = useState<CardTemplate[]>([]);
  const [cardSelectingPhase, setCardSelectingPhase] = useState<boolean>(false);

  //const testJSX = <div>testtest12234</div>
  const filteredManyCards: CardTemplate[] = removeDuplicateCards(foundManyCards);

  function removeDuplicateCards(arr: CardTemplate[]) {
    let uniqueCards: CardTemplate[] = []
    let uniqueIds: Set<string> = new Set();
    arr.filter(el => el.hasOwnProperty('imageUrl')).forEach((card: CardTemplate) => {
      if (!uniqueIds.has(card.multiverseid)) {
        uniqueCards.push(card);
        uniqueIds.add(card.multiverseid);
      }
    })
    return uniqueCards;
  }

  async function randomCard() {
    for (let i = 0; i < 10; i++) {
      try {
        const randomNumber = Math.floor(Math.random() * 399999) + 1;
        if (Config.invalidCardIds.includes(randomNumber)) {
          console.log('number invalid, trying again');
          continue;
        }
        const myPromise = await HttpsService.getCardById(randomNumber);
        const outputCard = myPromise.card;
        if (outputCard) {
          console.log("we have a card", outputCard);
          setFoundCard(outputCard);
          console.log(foundCard, foundCard.imageUrl);
          break;
        }
      } catch (error: any) {
        //console.log(error.status, error.error);
      }
    }
  }

  async function specifiedIdCard(event: any) {
    event.preventDefault();
    //console.log(specifiedIdValue);
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

  function addManyCardsToDeck() {
    console.log(manyCardsToAddToDeck);
    props.onAddManyCardsToDeck(manyCardsToAddToDeck);
    cancelCardSelecting();
  }

  async function specifiedTypeAndOrColors() {
    try {
      console.log(chosenColors, chosenTypes);
      const myPromise = await HttpsService.findCardsByTypeAndColors(chosenTypes, chosenColors);
      setFoundManyCards(myPromise.cards);
      //console.log(foundManyCards);
    } catch (error) {

    }
  }

  const colorCheckboxHandler = (checkboxMessage: {whatValue: string, status: boolean}) => {
    let colorIdentity = "";
    for (const element of Config.cardColors) {
      if (element.name === checkboxMessage.whatValue) {
        colorIdentity = element.Identity;
        break;
      }
    }

    if (checkboxMessage.status) {
      setChosenColors((prevColors) => {
        return [colorIdentity, ...prevColors];
      });
    } else {
      setChosenColors((prevColors) => {
        const colorIndex = prevColors.findIndex(x => x === colorIdentity);
        prevColors.splice(colorIndex, 1);
        return prevColors;
      });
    }
  }

  const typeCheckboxHandler = (checkboxMessage: {whatValue: string, status: boolean}) => {
    const typeToHandle = checkboxMessage.whatValue;
    if (checkboxMessage.status) {
      setChosenTypes((prevTypes) => {
        return [typeToHandle, ...prevTypes];
      });
    } else {
      setChosenTypes((prevTypes) => {
        const typeIndex = prevTypes.findIndex(x => x === typeToHandle);
        prevTypes.splice(typeIndex, 1);
        return prevTypes;
      });
    }
  }

  const cardToAddSelector = (cardData: {status: boolean, cardObj: CardTemplate}) => {
    if (cardSelectingPhase) {
      //console.log(cardData)
      if (cardData.status) {
        setManyCardsToAddToDeck(prevCards => [cardData.cardObj, ...prevCards]);
      } else {
        setManyCardsToAddToDeck(prevCards => {
          const cardIndex = prevCards.findIndex((x: CardTemplate) => x.multiverseid === cardData.cardObj.multiverseid);
          if (cardIndex >= 0) {
            prevCards.splice(cardIndex, 1);
            return prevCards;
          } else {
            return prevCards;
          }
        })
      }
    }
  }

  const cancelCardSelecting = () => {
    console.log("CANCEL");
    setCardSelectingPhase(false);
    setManyCardsToAddToDeck([]);
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
      {foundCard.originalText === 'test_case: empty' ? (
        <h6>No card found yet. Use the find options to search for cards or try again.</h6>
      ) : (
        <RenderCard card={foundCard} nameOfClass='found-card' isSelectable={false} />
      )}
      <div className="find-colors-and-types-container">
        <h5>Find cards that match a type or colors of your choosing:</h5>
        <div className="color-option-field">
          {Config.cardColors.map((color) => <Checkbox label={color.name} designation={"color"} 
          onCheckboxManager={colorCheckboxHandler} key={color.name} />)}
        </div>
        <div className="type-option-field">
          {Config.possibleTypes.map((type) => <Checkbox label={type} designation={"type"} 
          onCheckboxManager={typeCheckboxHandler} key={type} />)}
        </div>
        <button 
          className="find-colors-and-types-button" 
          onClick={specifiedTypeAndOrColors} 
        >
        Find cards by colors and types
        </button>
      </div>
      {cardSelectingPhase ? (
        <div>
          <p>You have selected {manyCardsToAddToDeck.length} {manyCardsToAddToDeck.length === 1? `card`: "cards"}</p>
          <button onClick={addManyCardsToDeck}>Add selected cards to your deck</button>
          <button onClick={cancelCardSelecting}>Cancel</button>
          <button onClick={() => console.log(manyCardsToAddToDeck)}>TEST SELECTED CARDS</button>
        </div>
      ) : (
        <button onClick={() => setCardSelectingPhase(true)}>Click here to start adding cards to your deck</button>
      )}
      <div className="multiple-found-cards-container">
        {filteredManyCards.length > 0 &&
          filteredManyCards.map((card, index) => (
            <RenderCard 
              onSelected={cardToAddSelector}
              key={index}
              card={card}
              nameOfClass="card-in-multiple-found-cards"
              isSelectable={cardSelectingPhase}
            /> 
          ))}
      </div>
    </div>
  )
}

export default FindCards;