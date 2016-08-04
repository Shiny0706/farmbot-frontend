export interface AuthHeaders {
  headers: {
    Authorization: String;
  };
};

export function authHeaders(token: string): AuthHeaders {
  return {
    headers: {
      Authorization: token
    }
  };
}
