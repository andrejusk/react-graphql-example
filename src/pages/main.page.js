import React from "react";

import { Box, Button, Heading, Text } from "@primer/react";
import { usePreloadedQuery, useQueryLoader } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import Loader from "../components/loader";
import UserProfile from "../components/userProfile";
import FollowerList from "../components/followerList";
import FollowerAvatarList from "../components/followerAvatarList";

const MainPageQuery = graphql`
  query mainPageQuery($extended: Boolean!) {
    viewer {
      # UserContainer <Heading />
      name

      # <UserProfile /> component
      ...userProfile_user

      # <FollowerAvatarList /> component
      followers(first: 7) {
        ...followerAvatarList_avatars
      }
    }

    # <FollowerList /> component
    followersExtended: viewer @include(if: $extended) {
      followers {
        ...followerList_followers
      }
    }
  }
`;

const UserContainer = ({ queryRef }) => {
  const data = usePreloadedQuery(MainPageQuery, queryRef);
  const { viewer: user } = data;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Heading sx={{ fontSize: "20px" }}>Hello, {user.name}!</Heading>
      <UserProfile user={user} />
      <FollowerAvatarList followers={user.followers} />
    </Box>
  );
};

const FollowersContainer = ({ queryRef }) => {
  const data = usePreloadedQuery(MainPageQuery, queryRef);
  if (!data.followersExtended) return null;
  const { followers } = data.followersExtended;

  return (
    <Box>
      <FollowerList followers={followers} />
    </Box>
  );
};

const MainPage = () => {
  const [queryRef, load, dispose] = useQueryLoader(MainPageQuery);
  const [extended, setExtended] = React.useState(false);
  React.useEffect(() => {
    load({ extended });
    return dispose;
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
                <Text>Expand follower list</Text>
                <Button onClick={toggle}>{extended ? "Hide" : "Show"}</Button>
              </Box>
              {extended && (
                <React.Suspense fallback={<Loader />}>
                  <FollowersContainer queryRef={queryRef} />
                </React.Suspense>
              )}
            </Box>
          </Box>
        )}
      </React.Suspense>
    </>
  );
};

export default MainPage;
