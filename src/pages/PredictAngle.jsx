import React, { useEffect, useState } from 'react';

const PredictAngle = () => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const savedAngle = parseFloat(localStorage.getItem('angle') || '0');

    const simulatedCurrentAngle = 30.2; // 예시 현재 각도
    setCurrentAngle(simulatedCurrentAngle);

    if (Math.abs(savedAngle - simulatedCurrentAngle) > 15) {
      setFeedback('⚠️ 거북목 자세입니다!');
    } else {
      setFeedback('🟢 자세가 양호합니다.');
    }

  }, []);

  return (
    <div>
      <p>현재 각도: {currentAngle}°</p>
      <p>{feedback}</p>
    </div>
  );
};

export default PredictAngle;
