import React from "react";

import { Box, Button, Heading } from "@primer/react";
import { usePreloadedQuery, useQueryLoader } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import Loader from "../components/loader";
import UserProfile from "../components/userProfile";
import FollowerList from "../components/followerList";
import FollowerAvatarList from "../components/followerAvatarList";

const MainPageQuery = graphql`
  query mainPageQuery {
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
  }
`;

const UserContainer = ({ queryRef }) => {
  const data = usePreloadedQuery(MainPageQuery, queryRef);
  const { viewer: user } = data;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Heading sx={{ fontSize: "20px" }}>Hello, {user.name}!</Heading>
      <UserProfile user={user} />
      <FollowerAvatarList followers={user.followers} />
    </Box>
  );
};

const MainPageExtendedQuery = graphql`
  query mainPageExtendedQuery {
    # <FollowerList /> component
    viewer {
      followers {
        ...followerList_followers
      }
    }
  }
`;

const FollowersContainer = ({ queryRef }) => {
  const data = usePreloadedQuery(MainPageExtendedQuery, queryRef);
  const { followers } = data.viewer;

  return <FollowerList followers={followers} />;
};

const MainPage = () => {
  const [queryRef, load, dispose] = useQueryLoader(MainPageQuery);
  const [extendedRef, loadExtended, disposeExtended] = useQueryLoader(
    MainPageExtendedQuery
  );
  const [extended, setExtended] = React.useState(false);
  React.useEffect(() => {
    load({});
    extended && loadExtended({});
    return () => {
      dispose();
      disposeExtended();
    };
  }, [load, dispose, extended, loadExtended, disposeExtended]);
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
                <Heading sx={{fontSize: '16px'}}>Follower list</Heading>
                <Button onClick={toggle}>{extended ? "Hide" : "Show"}</Button>
              </Box>
              <Box>
                {extendedRef && (
                  <React.Suspense fallback={<Loader />}>
                    <FollowersContainer queryRef={extendedRef} />
                  </React.Suspense>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </React.Suspense>
    </>
  );
};

export default MainPage;
