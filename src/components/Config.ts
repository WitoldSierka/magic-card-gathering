const Config = {
  apiAddress: 'https://api.magicthegathering.io/v1',
  invalidCardIds: [329729, 261588, 355663, 312784, 257659, 261112, 101714, 99531, 85148, 278049, 100128, 363701, 348549, 126749, 22952, 218217, 218397, 213254, 165945, 24185],
  cardColors: [
    {
      name: "White",
      Identity: "W"
    },
    {
      name: "Blue",
      Identity: "U"
    },
    {
      name: "Black",
      Identity: "B"
    },
    {
      name: "Red",
      Identity: "R"
    },
    {
      name: "Green",
      Identity: "G"
    }
  ],
  possibleTypes: ["Artifact", "Creature", "Enchantment","Land", "Instant", "Sorcery"]
}

export default Config;