export interface Planet {
  icon: string;
  title: string;
  subtitle: string;
}

const planets: Planet[] = [
  {
    icon: "🌑",
    title: "Mercúrio",
    subtitle: "O planeta mais próximo do Sol e também o menor do nosso sistema.",
  },
  {
    icon: "🌕",
    title: "Vênus",
    subtitle: "Conhecido por sua atmosfera densa e temperaturas elevadas.",
  },
  {
    icon: "🌍",
    title: "Terra",
    subtitle: "Onde vivemos, com água líquida e atmosfera propícia à vida.",
  },
  {
    icon: "🔴",
    title: "Marte",
    subtitle: 'Conhecido como o "planeta vermelho" devido à sua superfície avermelhada.',
  },
  {
    icon: "🪐",
    title: "Júpiter",
    subtitle: "O maior planeta do sistema, um gigante gasoso com uma grande mancha vermelha.",
  },
  {
    icon: "🪐",
    title: "Saturno",
    subtitle: "Famoso pelos seus anéis visíveis, também é um gigante gasoso.",
  },
  {
    icon: "🔵",
    title: "Urano",
    subtitle: "Gigante gasoso com anéis fracos e inclinação incomum do eixo.",
  },
  {
    icon: "🔵",
    title: "Netuno",
    subtitle: "O planeta mais distante do Sol, com ventos fortes e anéis tênues.",
  },
];

export default planets;
