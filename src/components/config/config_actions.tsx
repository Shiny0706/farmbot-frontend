
export interface ChangeApiUrl {
  type: "CHANGE_API_URL";
  payload: {
    farmbotApiUrl: string;
  };
};

export function changeApiUrl(url: string): ChangeApiUrl {
  return {
    type: "CHANGE_API_URL",
    payload: {
      farmbotApiUrl: url
    }
  };
};
