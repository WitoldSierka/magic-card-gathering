import React from "react";
import './UserDeckGallery.css';

const UserDeckGallery: React.FC<{arrayOfCards: {}[]}> = (props) => {

  if (props.arrayOfCards.length === 0) {
    return (
      <div className="empty-user-deck">You have no cards in your deck</div>
    );
  } else {

    const renderImage = (singleCard: {multiverseid: number, imageUrl: string}) => {
      return (
        <div key={`card ${singleCard.multiverseid}`}>
          <img src={`${singleCard.imageUrl}`} alt="card" />
        </div>
      )
    }

    return (
      <div>
        <h3>This is your deck</h3>
        <div className="user-deck-gallery">
          {Object.values(props.arrayOfCards).map((card: any) => renderImage(card))}
        </div>
      </div>
      
    );
  }

}

export default UserDeckGallery;