import React from "react";
import './UserDeckGallery.css';
//import HttpsService from "./HttpsService";
import CardTemplate from "./CardTemplate";
import RenderCard from "./RenderCard"

const UserDeckGallery: React.FC<{arrayOfCards: CardTemplate[]}> = (props) => {

  if (props.arrayOfCards.length === 0) {
    return (
      <div className="empty-user-deck">You have no cards in your deck</div>
    );
  } else {
    /*const renderCardImage = (singleCard: CardTemplate) => {
      return (
        <div key={`card ${singleCard.multiverseid}`}>
          <img src={`${singleCard.imageUrl}`} title={singleCard.originalText} alt="oops no card here" />
        </div>
      )
    }*/

    return (
      <div>
        <h3>This is your deck</h3>
        <div className="user-deck-gallery">
          {props.arrayOfCards.map((card: CardTemplate) => <RenderCard card={card} nameOfClass="card-in-gallery" />)}
        </div>
      </div>
      
    );
  }

}

export default UserDeckGallery;