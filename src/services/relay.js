import React from "react";

import Relay from "react-relay";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

import { graphqlJsonFetchFactory } from "./graphql";
import useAuthn from "../hooks/useAuthn";

export const relayEnvironmentFactory = (token) =>
  new Environment({
    network: Network.create(graphqlJsonFetchFactory(token)),
    store: new Store(new RecordSource()),
  });

export const RelayProvider = (props) => {
  const { token } = useAuthn();
  const environment = relayEnvironmentFactory(token);
  return (
    <Relay.RelayEnvironmentProvider environment={environment} {...props} />
  );
};

export default RelayProvider;
