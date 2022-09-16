import React from "react";

import { Environment, Network, RecordSource, Store } from "relay-runtime";
import Relay from "react-relay";

import useAuthn from "../hooks/useAuthn";
import API_CONSTANTS from "../constants/api";

import UserProfile from "./userProfile";

const { HOST } = API_CONSTANTS;


const relayFetchFactory = (token) => {
  return async (params, variables) => {
    return fetch(`${HOST}/graphql`, {
      method: "POST",
      body: JSON.stringify({
        query: "query { viewer { login } }",
      }),
      headers: [["Authorization", `Bearer ${token}`]],
    });
  };
};

const relayEnvironmentFactory = (token) => {
  return new Environment({
    network: Network.create(relayFetchFactory(token)),
    store: new Store(new RecordSource()),
  });
};

const AuthnPage = () => {
  const { token } = useAuthn();
  const environment = relayEnvironmentFactory(token);
  return (
    <Relay.RelayEnvironmentProvider environment={environment}>
      <UserProfile />
    </Relay.RelayEnvironmentProvider>
  );
};

export default AuthnPage;
