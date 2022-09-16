import React from "react";
import AuthnContext from "../contexts/AuthnContext";

const useAuthn = () => React.useContext(AuthnContext);

export default useAuthn;
