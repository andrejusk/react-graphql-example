import React from "react";

import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";

export const UserProfile = React.memo(({ name, login, avatarUrl }) => (
  <div className="User-profile">
    <img src={{ uri: avatarUrl }} alt={`${name}'s profile`} />
    <p>
      {name} (<code>@{login}</code>)
    </p>
  </div>
));

const UserProfileFragment = graphql`
  fragment userProfile_user on User {
    name
    login
    avatarUrl
  }
`;

const UserProfileContainer = ({ user }) => {
  const data = useFragment(UserProfileFragment, user);
  return <UserProfile {...data} />;
};

export default UserProfileContainer;
