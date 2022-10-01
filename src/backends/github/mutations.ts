import { gql } from 'graphql-tag';

import * as fragments from './fragments';

// updateRef only works for branches at the moment
export const updateBranch = gql`
  mutation updateRef($input: UpdateRefInput!) {
    updateRef(input: $input) {
      branch: ref {
        ...BranchParts
      }
    }
  }
  ${fragments.branch}
`;
