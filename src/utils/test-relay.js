import React from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { MockPayloadGenerator } from "relay-test-utils";

export const RelayTestWrapper = ({ environment, children }) => (
  <RelayEnvironmentProvider environment={environment}>
    <React.Suspense>{children}</React.Suspense>
  </RelayEnvironmentProvider>
);

export const mockEnvironmentResolver = (environment, resolver) => {
  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation, resolver)
  );
};

export const queueEnvironmentResolver = (environment, resolver) => {
  environment.mock.queueOperationResolver((operation) =>
    MockPayloadGenerator.generate(operation, resolver)
  );
};
