import API_CONSTANTS from "../constants/api";

const { GRAPHQL_API } = API_CONSTANTS;

export const graphqlFetchFactory = (token) => {
  return async (operation, variables) => {
    const { text: query } = operation;
    return fetch(GRAPHQL_API, {
      method: "POST",
      body: JSON.stringify({
        query,
        variables,
      }),
      headers: [
        ["Authorization", `Bearer ${token}`],
        ["Accept", "application/json"],
        ["Content-Type", "application/json"],
      ],
    });
  };
};
