import React from "react";

import {
  Box,
  Button,
  Flash,
  FormControl,
  Heading,
  Link,
  Text,
  TextInput,
} from "@primer/react";

import API_CONSTANTS from "../constants/api";
import useAuthn from "../hooks/useAuthn";

const { TOKEN_URL } = API_CONSTANTS;

const LoginPage = () => {
  const { setToken, tokenState } = useAuthn();
  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      const token = e.target[0].value;
      setToken(token);
    },
    [setToken]
  );
  return (
    <>
      <Heading>Login</Heading>
      <form onSubmit={onSubmit}>
        <Box sx={{ my: 3 }}>
          {tokenState === "error" && (
            <Flash variant="danger">
              <Text>Failed to validate token, try again later</Text>
            </Flash>
          )}
          {tokenState === "invalid" && (
            <Flash variant="danger">
              <Text>Invalid token</Text>
            </Flash>
          )}
        </Box>
        <FormControl sx={{ width: "100%" }}>
          <FormControl.Label>Personal Access Token</FormControl.Label>
          <TextInput
            placeholder="ghp_****************"
            type="password"
            sx={{ width: "100%" }}
          />
        </FormControl>
        <Button
          disabled={tokenState === "pending"}
          sx={{ width: "100%", my: 3 }}
        >
          Submit
        </Button>
        <Text>
          <span>Please generate a "legacy" PAT </span>
          <Link href={TOKEN_URL}>here.</Link>
        </Text>
      </form>
    </>
  );
};

export default LoginPage;
