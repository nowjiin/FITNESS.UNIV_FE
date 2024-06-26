/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_SERVER_URL: string;
    REACT_APP_GOOGLE_LOGIN_URL: string;
    REACT_APP_NAVER_LOGIN_URL: string;
    REACT_APP_FRONT_URL: string;
    REACT_APP_GOOGLE_CLIENT_ID: string;
    REACT_APP_GOOGLE_REDIRECT_URI: string;
    REACT_APP_NAVER_REDIRECT_URI: string;
  }
}
