// src/pages/InitAngle.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InitAngle = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initialAngle = 42.7; // 실제 측정 전 예시 값
    localStorage.setItem('angle', initialAngle.toString());
    console.log('✅ 초기 각도 저장됨:', initialAngle);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>초기 각도가 설정되었습니다.</h2>
      <button
        onClick={() => navigate('/predict-angle')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        실시간 자세 예측 시작
      </button>
    </div>
  );
};

export default InitAngle;
