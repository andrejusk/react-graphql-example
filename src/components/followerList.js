/* eslint-disable relay/unused-fields */
import React from "react";

import { Box } from "@primer/react";
import { usePaginationFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import UserProfile from "./userProfile";

const FollowerList = ({ user }) => {
  const { data } = usePaginationFragment(
    graphql`
      fragment followerList_followers on User
      @refetchable(queryName: "followerList_query") {
        followers(after: $cursor, first: $count)
          @connection(key: "followerList_followers") {
          edges {
            node {
              ...userProfile_user
            }
          }
        }
      }
    `,
    user
  );

  return (
    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      {data.followers.edges
        .map((edge) => edge.node)
        .map((user) => (
          <UserProfile key={user.login} user={user} />
        ))}
    </Box>
  );
};

export default FollowerList;
