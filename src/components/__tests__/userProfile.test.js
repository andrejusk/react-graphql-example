import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen, waitFor } from "@testing-library/react";
import { useLazyLoadQuery } from "react-relay";
import { createMockEnvironment } from "relay-test-utils";
import graphql from "babel-plugin-relay/macro";

import {
  RelayTestWrapper,
  mockEnvironmentResolver,
} from "../../utils/test-relay";
import { default as UserProfileFragment, UserProfile } from "../userProfile";

const testLogin = "test";
const testAvatarUrl = "https://avatars.githubusercontent.com/u/1234567?v=4";

describe("UserProfile", () => {
  test("render", () => {
    render(<UserProfile avatarUrl={testAvatarUrl} login={testLogin} />);

    const avatar = screen.getByTestId("avatar");
    expect(avatar).toHaveAttribute("src", testAvatarUrl);

    const text = screen.getByTestId("login");
    expect(text).toHaveTextContent(testLogin);
  });
});

const MockUserResolver = {
  User() {
    return {
      login: testLogin,
      avatarUrl: testAvatarUrl,
    };
  },
};

describe("UserProfileFragment", () => {
  const UserProfileContainer = () => {
    const data = useLazyLoadQuery(
      graphql`
        query userProfileContainerQuery @relay_test_operation {
          testUser: viewer {
            ...userProfile_user
          }
        }
      `,
      {}
    );
    return <UserProfileFragment user={data.testUser} />;
  };

  test("render", async () => {
    const environment = createMockEnvironment();
    render(
      <RelayTestWrapper environment={environment}>
        <UserProfileContainer />
      </RelayTestWrapper>
    );
    act(() => {
      mockEnvironmentResolver(environment, MockUserResolver);
    });
    await waitFor(() => {
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveAttribute("src", testAvatarUrl);
    });
    await waitFor(() => {
      const text = screen.getByTestId("login");
      expect(text).toHaveTextContent(testLogin);
    });
  });
});
