import React, { useEffect } from "react";
import axios from "axios";

const Loading = () => {
  const handleGoogleCallback = async (code: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/oauth2/callback/google`,
        {
          code,
        }
      );

      const data = response.data;
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        if (data.isNewUser) {
          window.location.href = "/signup";
        } else {
          window.location.href = "/";
        }
      } else {
        // handle error
        console.error("Error during Google callback handling:", data);
      }
    } catch (error) {
      console.error("Error during Google callback handling:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      handleGoogleCallback(code);
    } else {
      console.error("No code found in URL");
    }
  }, []);

  return <div>Loading...</div>;
};

export default Loading;
