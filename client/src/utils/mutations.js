import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, age: $Int, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($taskText: String!) {
    addTask(taskText: $taskText) {
      _id
      taskText
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`;

export const ADD_AWARD = gql`
  mutation addAward($id: ID!) {
    addAward(awardId: $id) {
      _id
      username
      awardCount
      awards {
        _id
        username
      }
    }
  }
`;

export const REMOVE_AWARD = gql`
  mutation removeAward($id: ID!) {
    removeAward(id: $id) {
      _id
      username
      awards {
        _id
        username
      }
    }
  }
`;


export const ADD_REACTION = gql`
  mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
    addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;