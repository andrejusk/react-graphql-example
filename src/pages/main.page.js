import React from "react";

import { graphql, useQueryLoader } from "react-relay";

import UserProfile from "../components/userProfile";
// import UserStats from "../components/userStats";

// import Followers from "../components/followers";
// import Following from "../components/following";

const MainPageQuery = graphql`
  query mainPageQuery {
    user: viewer {
      ...userProfile_user
    }
  }
`;

const MainPage = () => {
  const [ref, load, dispose] = useQueryLoader(MainPageQuery);
  React.useEffect(() => {
    load();
    return dispose;
  }, [load, dispose]);

  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        {ref && <UserProfile user={ref} />}
      </React.Suspense>
    </>
  );
};

export default MainPage;
