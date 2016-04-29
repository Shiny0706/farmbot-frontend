import { AuthToken } from "./auth_actions";

export interface AuthHeaders {
  headers: {
    Authorization: String;
  };
};

export function authHeaders(token: AuthToken): AuthHeaders {
  if (!token.token) {
    // If you ever see this error, it's time to re-shape the auth reducer. RC.
    throw new Error("Token does not have a `token` attribute");
  };
  return {
    headers: {
      Authorization: token.token
    }
  };
}
