/* eslint-disable relay/unused-fields */
import React from "react";

import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { UserAvatarList } from "./userAvatarList";

const FollowerAvatarListFragment = graphql`
  fragment followerAvatarList_avatars on FollowerConnection {
    nodes {
      avatarUrl
    }
  }
`;

const FollowerAvatarListContainer = ({ followers }) => {
  const data = useFragment(FollowerAvatarListFragment, followers);
  return <UserAvatarList avatarList={data.nodes}>follower(s)</UserAvatarList>;
};

export default FollowerAvatarListContainer;
