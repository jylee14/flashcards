import { LazyQueryResult } from "@apollo/client";

export interface GreetingBannerProps {
  username: string | null;
  logout(): void;
}

export interface User {
  username: string | null;
  token: string | null;
}

export interface Card {
  id: string;
  term: string;
  definition: string;
}

export interface UserPageProps {
  notify(msg: string, isError?: boolean): void;
  loadedDecks: LazyQueryResult<any, any>;
}

export interface NewDeckFormProps {
  notify(msg: string, isError?: boolean): void;
  show: boolean;
  closeModal(): void;
}