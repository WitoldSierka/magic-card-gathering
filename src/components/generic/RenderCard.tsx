import CardTemplate from "../CardTemplate";

const FoundCard: React.FC<{card: CardTemplate, nameOfClass: string}> = (props) => {
    return (
        <div className={`${props.nameOfClass}-${props.card.multiverseid}`}>
          <img src={`${props.card.imageUrl}`} title={props.card.originalText} alt="oops card eaten"/>
        </div>
    );
}

export default FoundCard;