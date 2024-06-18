import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../components/common/Logo";
import "./RoleSelect.scss";

function RoleSelectPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      //url로 쳐서 접속 했을경우
      console.error("토큰이 없음 url로 접속한거.");
      alert("다시 로그인 해주세요!");
      navigate("/");
    }
  }, [location, navigate]);

  const selectedRole = async (role: string) => {
    try {
      // JWT 토큰을 로컬 스토리지에서 가져오기
      const accessToken = localStorage.getItem("accessToken");

      //post 요청
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/role",
        { role },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Response:", response.data);
      if (role === "ROLE_MENTOR") {
        navigate("/mentor");
      } else if (role === "ROLE_MENTEE") {
        navigate("/mentee");
      }
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        // 토큰이 만료된 경우 리프레시 토큰으로 갱신 시도
        try {
          const refreshToken = localStorage.getItem("refreshToken"); // 로컬 스토리지에서 다시 가져옴
          const refreshResponse = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "/api/refresh-token",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          const newAccessToken = refreshResponse.data.token;
          localStorage.setItem("accessToken", newAccessToken);

          // 갱신된 토큰으로 다시 역할 요청 보내기
          const retryResponse = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "/api/role",
            { role },
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          console.log("Response after token refresh:", retryResponse.data);
        } catch (refreshError: unknown) {
          if (axios.isAxiosError(refreshError)) {
            console.error("Error refreshing token:", refreshError);
            alert("다시 로그인 해주세요!");
            navigate("/"); // 메인 페이지로 리다이렉트
          } else {
            alert("다시 로그인 해주세요!");
            console.error("Error refreshing token:", refreshError);
          }
        }
      } else {
        console.error("Error sending role to backend:", error);
      }
    }
  };

  return (
    <div className="role-select-page container text-center mt-5">
      <div className="mb-4">
        <Logo />
      </div>
      <h2>회원가입</h2>
      <div className="card mx-auto mt-4 p-4" style={{ maxWidth: "600px" }}>
        <div className="progress mb-3" style={{ height: "10px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: "10%" }}
            aria-valuenow={10}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
        <h3>어떤 유형으로 가입하시겠습니까?</h3>
        <p>가입하실 유형을 선택해주세요.</p>
        <div className="list-group">
          <button
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-1"
            onClick={() => selectedRole("ROLE_MENTOR")}
          >
            <div>
              <h5>트레이너</h5>
              <p>
                수강생을 찾고 있어요.
                <br />
                *1분만에 간편하게 가입하기
              </p>
            </div>
            <img
              src="../../img/undraw_personal_trainer_re_cnua.svg"
              alt="트레이너 아이콘"
              className="img-fluid icon"
            />
          </button>
          <button
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mt-1"
            onClick={() => selectedRole("ROLE_MENTEE")}
          >
            <div>
              <h5>수강생</h5>
              <p>
                트레이너를 찾고 있어요.
                <br />
                *1분만에 간편하게 가입하기
              </p>
            </div>
            <img
              src="../../img/undraw_energizer_re_vhjv.svg"
              alt="수강생 아이콘"
              className="img-fluid icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelectPage;
