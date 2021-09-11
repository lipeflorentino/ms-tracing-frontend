import { REQUEST_UPDATE, REQUEST_RESET } from "../";

export const requestUpdate = (request) => ({
  type: REQUEST_UPDATE,
  payload: request,
});

export const requestReset = () => {
  return {
    type: REQUEST_RESET,
  };
};
