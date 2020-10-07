import { gql } from "@apollo/client";

export const CREATE_NEW_DECK = gql`
  mutation CreateNewDeck($name: String!, $description: String, $isPublic: Boolean!, $cards: [FlashCardData!]!) {
    createDeck(name: $name, description: $description, public: $isPublic, cards: $cards) {
      id
      name
      description
      public
      cards {
        term
        definition
      }
    }
  }
`

export const GET_DECK_BY_ID = gql`
  query GetDeckById($id: String!) {
    getDeck(id: $id) {
      id
      name
      description
      cards {
        id
        term
        definition
      }
    }
  }
`

export const GET_PUBLIC_DECKS = gql`
  query {
    allDecks {
      id
      name
      description
      cards {
        term
        definition
      }
    }
  }
`

export const GET_MY_DECKS = gql`
  query { 
    myDecks {
      id
      name
      description 
      cards {
        term 
        definition
      }
    }
  }
`

export const DELETE_DECK = gql`
  mutation DeleteDeck($id: String!) {
    deleteDeck(id: $id)
  }
`

export const LOGIN = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      value
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password)
  }
`