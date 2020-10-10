export interface User {
  username: string | null;
  token: string | null;
}

export interface Deck {
  id: string;
  name: string;
  description: string | null;
  cards: Card[];
}

export interface Card {
  id: string;
  term: string;
  definition: string;
}
