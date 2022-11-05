import { makeRequest } from "./apiService";

export function logIn() {
  return makeRequest("/login", {
    method: "GET",
  });
}

export function searchTrack(payload) {
  return makeRequest("/searchTrack", {
    method: "POST",
    data: payload,
  });
}

export function getAccessToken() {
  return makeRequest("/getAccessToken", {
    method: "GET",
  });
}
