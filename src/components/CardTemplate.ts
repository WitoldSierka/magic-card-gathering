class CardTemplate {
  artist?: string;
  cmc?: number;
  id?: string;
  imageUrl: string;
  layout?: string;
  legalities?: {format: string, legality: string}[];
  manaCost?: string;
  /*"{3}"*/
  multiverseid: number;
  name?: string;
  number?: number;
  originalText: string;
  originalType?: string;
  printings?: string[];
  rarity?: string;
  rulings?: {date: string, text: string}[];
  set?: string;
  setName?: string;
  text?: string;
  type?: string;
  types?: string[];

  constructor(card: {artist: string,
    cmc: number,
    id: string,
    imageUrl: string,
    layout: string,
    legalities: {format: string, legality: string}[],
    manaCost: string,
    multiverseid: number,
    name: string,
    number: number,
    originalText: string,
    originalType: string,
    printings: string[],
    rarity: string,
    rulings: {date: string, text: string}[],
    set: string,
    setName: string,
    text: string,
    type: string,
    types: string[]
  }) {
    this.artist = card.artist;
    this.cmc = card.cmc;
    this.id = card.id;
    this.imageUrl = card.imageUrl;
    this.layout = card.layout;
    this.legalities = card.legalities;
    this.manaCost = card.manaCost;
    this.multiverseid = card.multiverseid;
    this.name = card.name;
    this.number = card.number;
    this.originalText = card.originalText;
    this.originalType = card.originalType;
    this.printings = card.printings;
    this.rarity = card.rarity;
    this.rulings = card.rulings;
    this.set = card.set;
    this.setName = card.setName;
    this.text = card.text;
    this.type = card.type;
    this.types = card.types;
  }
}

export default CardTemplate;