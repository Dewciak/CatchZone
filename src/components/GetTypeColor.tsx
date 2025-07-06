function getTypeColor(type: string): string {
  switch (type) {
    case "normal":
      return "hsl(30, 30%, 85%)";
    case "fire":
      return "hsl(15, 100%, 80%)";
    case "water":
      return "hsl(200, 100%, 85%)";
    case "grass":
      return "hsl(120, 60%, 80%)";
    case "electric":
      return "hsl(50, 100%, 80%)";
    case "ice":
      return "hsl(190, 80%, 90%)";
    case "fighting":
      return "hsl(0, 60%, 75%)";
    case "poison":
      return "hsl(290, 60%, 80%)";
    case "ground":
      return "hsl(35, 50%, 75%)";
    case "flying":
      return "hsl(210, 60%, 85%)";
    case "psychic":
      return "hsl(320, 60%, 85%)";
    case "bug":
      return "hsl(90, 60%, 75%)";
    case "rock":
      return "hsl(40, 30%, 75%)";
    case "ghost":
      return "hsl(250, 40%, 80%)";
    case "dragon":
      return "hsl(270, 80%, 75%)";
    case "dark":
      return "hsl(220, 20%, 60%)";
    case "steel":
      return "hsl(210, 10%, 75%)";
    case "fairy":
      return "hsl(330, 70%, 85%)";
    default:
      return "hsl(0, 0%, 100%)";
  }
}

export default getTypeColor;
