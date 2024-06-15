import axios from "axios";

export const getToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const setToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token available");
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const { accessToken: newAccessToken } = response.data;
    setToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

export const handleTokenError = async (error: any, callback: Function) => {
  if (
    axios.isAxiosError(error) &&
    error.response &&
    error.response.status === 401
  ) {
    try {
      const newToken = await refreshAccessToken();
      setToken(newToken);
      await callback(); // Retry the failed request with the new token
    } catch (refreshError) {
      alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
      window.location.href = "/"; // Redirect to login
    }
  } else {
    console.error("Error occurred, 다시 로그인", error);
  }
};
