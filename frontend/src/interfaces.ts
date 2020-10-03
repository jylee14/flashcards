import { LazyQueryResult } from "@apollo/client";

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

export interface UserPageProps {
  notify(msg: string, isError?: boolean): void;
  loadedDecks: LazyQueryResult<any, any>; // eslint-disable-line
}
