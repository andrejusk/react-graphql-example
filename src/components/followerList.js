/* eslint-disable relay/unused-fields */
import React from "react";

import { Box } from "@primer/react";
import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { UserProfile } from "./userProfile";

const FollowerListFragment = graphql`
  fragment followerList_followers on FollowerConnection {
    nodes {
      login
      avatarUrl
    }
  }
`;

const FollowerListContainer = ({ followers }) => {
  const data = useFragment(FollowerListFragment, followers);
  return (
    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      {data.nodes.map((user) => (
        <UserProfile key={user.login} {...user} />
      ))}
    </Box>
  );
};

export default FollowerListContainer;
