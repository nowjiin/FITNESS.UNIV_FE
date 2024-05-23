import React from 'react';
import axios from 'axios';

import './RoleSelect.scss';

function RoleSelectPage() {
  const selectedRole = async (role: string) => {
      try {
        const response = await axios.post('http://localhost:8080/api/role', { role });
        console.log('Response:', response.data);
        // 성공적으로 보낸 후 추가 로직을 여기에 추가할 수 있습니다.
      } catch (error) {
        console.error('Error sending role to backend:', error);
      }
    };


  return (
    <div className="role-select-page container text-center mt-5">
      <div className="mb-4">
        <button className="btn btn-info">Logo</button>
      </div>
      <h2>회원가입</h2>
      <div className="card mx-auto mt-4 p-4" style={{ maxWidth: '600px' }}>
        <div className="progress mb-3" style={{ height: '10px' }}>
          <div className="progress-bar" role="progressbar" style={{ width: '10%' }} aria-valuenow={10} aria-valuemin={0} aria-valuemax={100}></div>
        </div>
        <h3>어떤 유형으로 가입하시겠습니까?</h3>
        <p>가입하실 유형을 선택해주세요.</p>
        <div className="list-group">
          <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          onClick={() => selectedRole('ROLE_MENTOR')}>
            <div>
              <h5>트레이너</h5>
              <p>수강생을 찾고 있어요.<br />*1분만에 간편하게 가입하기</p>
            </div>
            <img src="trainer-icon.png" alt="트레이너 아이콘" className="img-fluid icon" />
          </button>
          <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mt-2"
          onClick={() => selectedRole('ROLE_MENTEE')}>
            <div>
              <h5>수강생</h5>
              <p>트레이너를 찾고 있어요.<br />*1분만에 간편하게 가입하기</p>
            </div>
            <img src="student-icon.png" alt="수강생 아이콘" className="img-fluid icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelectPage;
