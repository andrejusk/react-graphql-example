import React from "react";

import { usePreloadedQuery, useQueryLoader } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import UserProfile from "../components/userProfile";
// import UserStats from "../components/userStats";

// import Followers from "../components/followers";
// import Following from "../components/following";

const MainPageQuery = graphql`
  query mainPageQuery {
    viewer {
      ...userProfile_user
    }
  }
`;

const UserContainer = ({ queryRef }) => {
  const data = usePreloadedQuery(MainPageQuery, queryRef);
  return (
    <>
      <UserProfile user={data.viewer} />
    </>
  );
};

const MainPage = () => {
  const [queryRef, load] = useQueryLoader(MainPageQuery);
  React.useEffect(() => {
    load({}, { fetchPolicy: "store-or-network" });
  }, [load]);

  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        {queryRef && <UserContainer queryRef={queryRef} />}
      </React.Suspense>
    </>
  );
};

export default MainPage;
