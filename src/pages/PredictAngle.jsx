import React, { useEffect, useState } from 'react';

const PredictAngle = () => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const savedAngle = parseFloat(localStorage.getItem('angle') || '0');
    const simulatedCurrentAngle = 30.2; // 예시 현재 각도
    setCurrentAngle(simulatedCurrentAngle);

    const angleDiff = Math.abs(savedAngle - simulatedCurrentAngle);

    if (angleDiff > 25) {
      setFeedback('🔴 위험! 즉시 자세를 교정하세요.');
    } else if (angleDiff > 15) {
      setFeedback('🟡 주의! 거북목 자세입니다.');
    } else {
      setFeedback('🟢 정상 자세입니다.');
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📐 예측된 현재 각도: {currentAngle}°</h2>
      <h3>{feedback}</h3>
    </div>
  );
}
