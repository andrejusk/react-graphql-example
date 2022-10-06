import React from "react";

import { Box, Button, Heading } from "@primer/react";
import { usePreloadedQuery, useQueryLoader } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import Loader from "../components/loader";
import UserProfile from "../components/userProfile";
import FollowerList from "../components/followerList";
import FollowerAvatarList from "../components/followerAvatarList";

const MainPageQuery = graphql`
  query mainPageQuery($extended: Boolean!, $count: Int!, $cursor: String) {
    user: viewer {
      name
      ...userProfile_user
      followers(first: 7) {
        ...followerAvatarList_avatars
      }
    }
    extendedUser: viewer @include(if: $extended) {
      ...followerList_followers
    }
  }
`;

const UserContainer = ({ queryRef }) => {
  const data = usePreloadedQuery(MainPageQuery, queryRef);
  const { user } = data;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Heading sx={{ fontSize: "20px" }}>Hello, {user.name}!</Heading>
      <UserProfile user={user} />
      <FollowerAvatarList followers={user.followers} />
    </Box>
  );
};

const FollowersContainer = ({ queryRef }) => {
  const data = usePreloadedQuery(MainPageQuery, queryRef);
  const { extendedUser } = data;

  return extendedUser && <FollowerList user={extendedUser} />;
};

const MainPage = () => {
  const [queryRef, load, dispose] = useQueryLoader(MainPageQuery);
  const [extended, setExtended] = React.useState(false);
  React.useEffect(() => {
    load({ extended, count: 100, cursor: null });
    return () => {
      dispose();
    };
  }, [load, dispose, extended]);
  const toggle = React.useCallback(
    () => setExtended(!extended),
    [extended, setExtended]
  );

  return (
    <>
      <React.Suspense fallback={<Loader />}>
        {queryRef && (
          <Box>
            <UserContainer queryRef={queryRef} />
            <Box sx={{ mt: 5 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <Heading sx={{ fontSize: "16px" }}>Follower list</Heading>
                <Button onClick={toggle}>{extended ? "Hide" : "Show"}</Button>
              </Box>
              <Box>
                <FollowersContainer queryRef={queryRef} />
              </Box>
            </Box>
          </Box>
        )}
      </React.Suspense>
    </>
  );
};

export default MainPage;
