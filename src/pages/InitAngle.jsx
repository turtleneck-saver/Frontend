import React, { useEffect } from 'react';

const InitAngle = () => {
  useEffect(() => {
    const initialAngle = 42.7; // 예시 값
    localStorage.setItem('angle', initialAngle.toString());
    console.log('✅ 초기 각도 저장됨:', initialAngle);
  }, []);

  return <div>초기 각도를 설정했습니다.</div>;
};

export default InitAngle;

