import React from "react";

import { Avatar, AvatarStack, Box, Text } from "@primer/react";
import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";

const MAX_AVATARS = 5;
export const UserAvatarList = React.memo(({ avatarList, children }) => (
  <Box
    sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}
  >
    <Text sx={{ fontSize: "14px", fontWeight: 600 }}>
      {avatarList.length > MAX_AVATARS ? `${MAX_AVATARS}+` : avatarList.length}
      {children && ` ${children}`}
    </Text>
    <AvatarStack>
      {avatarList.slice(0, MAX_AVATARS).map(({ avatarUrl }, idx) => (
        <Avatar key={idx} src={avatarUrl} />
      ))}
    </AvatarStack>
  </Box>
));

const UserAvatarListFragment = graphql`
  fragment userAvatarList_avatars on UserConnection {
    nodes {
      avatarUrl
    }
  }
`;

const UserAvatarListContainer = ({ users }) => {
  const data = useFragment(UserAvatarListFragment, users);
  return <UserAvatarList avatarList={data.nodes} />;
};

export default UserAvatarListContainer;
