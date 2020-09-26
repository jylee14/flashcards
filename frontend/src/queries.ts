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