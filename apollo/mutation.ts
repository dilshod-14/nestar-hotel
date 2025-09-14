import { gql } from '@apollo/client';

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: ReviewInput!) {
    createReview(input: $input) {
      _id
      rating
      propertyId
      memberId
      createdAt
    }
  }
`;
