import React from "react";

import { Avatar, Box, Text } from "@primer/react";
import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";

export const UserProfile = React.memo(({ login, avatarUrl }) => (
  <Box
    sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}
  >
    <Avatar square src={avatarUrl} />
    <Text sx={{ fontSize: "14px", fontWeight: 600 }}>{login}</Text>
  </Box>
));

const UserProfileFragment = graphql`
  fragment userProfile_user on User {
    login
    avatarUrl
  }
`;

const UserProfileContainer = ({ user }) => {
  const data = useFragment(UserProfileFragment, user);
  return <UserProfile {...data} />;
};

export default UserProfileContainer;
