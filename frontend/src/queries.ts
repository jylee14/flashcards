import { gql } from "@apollo/client";

export const GET_PUBLIC_DECKS = gql`
  query{
    allDecks{
      name
      cards{
        id
        term
        definition
      }
    }
  }
`