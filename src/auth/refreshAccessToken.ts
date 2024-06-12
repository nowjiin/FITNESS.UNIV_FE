import axios from "axios";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/refresh-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  const { token: newAccessToken } = response.data;
  localStorage.setItem("accessToken", newAccessToken);
  return newAccessToken;
};