// src/pages/PredictAngle.jsx
import React, { useEffect, useState } from 'react';

const PredictAngle = () => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const savedAngle = parseFloat(localStorage.getItem('angle') || '0');
    const simulatedCurrentAngle = 30.2; // 예시: 실시간 측정값
    setCurrentAngle(simulatedCurrentAngle);

    const angleDiff = Math.abs(savedAngle - simulatedCurrentAngle);

    if (angleDiff > 25) {
      setFeedback('🔴 위험! 즉시 자세를 교정하세요.');
    } else if (angleDiff > 15) {
      setFeedback('🟡 주의! 거북목 자세입니다.');
    } else {
      setFeedback('🟢 정상적인 자세입니다.');
    }

    console.log(`초기 각도: ${savedAngle}, 현재 각도: ${simulatedCurrentAngle}`);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>실시간 자세 예측</h2>
      <p>현재 측정 각도: <strong>{currentAngle}도</strong></p>
      <p style={{ fontSize: '18px', marginTop: '20px' }}>{feedback}</p>
    </div>
  );
};

export default PredictAngle;
