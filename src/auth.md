
## 🔐 인증 (Authentication) 시스템 설명

이 프로젝트는 사용자의 인증 상태를 관리하고 안전하게 API 통신을 하기 위해 강력한 인증 시스템을 구축했어! `src/context/AuthContext.js` (예시 경로) 파일에 정의된 `AuthProvider`와 `useAuth` 훅이 이 역할을 담당하고 있지! 💪

### 🚀 주요 역할

이 인증 시스템은 다음과 같은 핵심 기능들을 제공해!

1.  **사용자 인증 상태 관리**: 현재 사용자가 로그인되어 있는지 (`isAuthorized`) 아닌지 상태를 알려줘.
2.  **사용자 정보 저장**: 로그인된 사용자의 기본 정보 (`user`)를 저장해서 언제든지 쉽게 접근할 수 있게 해줘.
3.  **로그인 처리**: 일반 로그인과 구글 로그인을 모두 처리하고, 성공 시 토큰을 저장해!
4.  **로그아웃 처리**: 저장된 토큰 정보들을 지우고 사용자 상태를 로그아웃으로 변경해!
5.  **토큰 유효성 검사 및 갱신**: 저장된 액세스 토큰이 유효한지 확인하고, 만료되었다면 리프레시 토큰을 사용해서 자동으로 새 토큰을 받아와!
6.  **구글 토큰 검증**: 구글 로그인을 통해 받은 토큰의 유효성을 백엔드에서 안전하게 확인해!
7.  **주기적인 토큰 상태 확인**: 일정 시간마다 토큰 상태를 확인해서 사용자가 로그아웃되지 않도록 유지해줘!

### 🏠 `AuthProvider` 컴포넌트

`AuthProvider`는 네 React 앱의 가장 상위(예: `App.js`)에 감싸서 사용해야 하는 컴포넌트야!

```jsx
// App.js (예시)

import React from 'react';
import { AuthProvider } from './context/AuthContext'; // AuthProvider 가져오기
import AppRoutes from './routes'; // 네 앱의 라우팅 컴포넌트

function App() {
  return (
    // 앱 전체를 AuthProvider로 감싸줘!
    <AuthProvider>
      <AppRoutes /> {/* 이 안에 있는 모든 컴포넌트에서 인증 상태를 사용할 수 있게 돼! */}
    </AuthProvider>
  );
}

export default App;
```

`AuthProvider`는 React의 Context API를 사용해서 `isAuthorized`, `user`, `login`, `logout`, `refreshToken` 같은 중요한 값들을 **하위에 있는 모든 컴포넌트**에서 뿅! 하고 꺼내 쓸 수 있게 해줘! ✨

이 컴포넌트가 마운트될 때 (`useEffect` 부분) 자동으로 `checkAuth` 함수를 실행해서 현재 토큰 상태를 확인하고, 5분마다 한 번씩 토큰 유효성을 다시 검사해서 필요하면 갱신하는 로직이 들어있어! ⏰

### 🎣 `useAuth` 커스텀 훅

`useAuth`는 네가 만든 `AuthProvider`에서 제공하는 값들을 **쉽고 편하게** 꺼내 쓸 수 있게 해주는 고마운 커스텀 훅이야! 네 앱의 어떤 컴포넌트에서든 `useAuth()`만 호출하면 현재 로그인 상태, 사용자 정보, 로그인/로그아웃 함수 등을 바로 사용할 수 있어!

```jsx
// SomeComponent.js (예시)

import React from 'react';
import { useAuth } from '../context/AuthContext'; // useAuth 훅 가져오기

function SomeComponent() {
  // ✨ useAuth 훅으로 인증 상태와 함수들을 가져와서 바로 사용! ✨
  const { isAuthorized, user, logout } = useAuth();

  if (isAuthorized) {
    return (
      <div>
        <p>환영해요, {user.username}! 😊</p> {/* 로그인된 사용자 정보 표시 */}
        <button onClick={logout}>로그아웃</button> {/* 로그아웃 기능 사용 */}
      </div>
    );
  } else {
    return (
      <div>
        <p>로그인이 필요합니다. 🥺</p>
        {/* 로그인 버튼이나 링크 등 */}
      </div>
    );
  }
}

export default SomeComponent;
```

`useAuth` 훅을 사용하면 컴포넌트들이 복잡한 인증 로직을 직접 알 필요 없이, 그냥 `isAuthorized` 값 보고 로그인 상태인지 아닌지만 판단해서 화면을 보여주면 돼! 코드도 훨씬 깔끔해지겠지? 😊

### ✨ 토큰 관리 및 자동 갱신 플로우

우리가 만든 `api` 인터셉터와 이 `AuthProvider`가 함께 작동하면서 토큰 관리를 효율적으로 처리해줘!

1.  **로그인**: 사용자가 로그인하면 `login` 함수가 호출되고, 성공적으로 토큰을 받으면 `localStorage`에 `ACCESS_TOKEN`과 `REFRESH_TOKEN`을 저장해!
2.  **API 요청**: 네 앱에서 `api.get()`, `api.post()` 등으로 서버에 요청을 보낼 때마다, 아까 만든 `request` 인터셉터가 `localStorage`에서 `ACCESS_TOKEN`을 꺼내서 요청 헤더에 자동으로 붙여줘! [5], [8]
3.  **토큰 만료 (401 에러 발생)**: 만약 액세스 토큰이 만료돼서 서버에서 401 에러가 오면, 우리가 만든 `response` 인터셉터가 이걸 딱! 가로채서 `localStorage`의 `REFRESH_TOKEN`을 사용해 서버의 토큰 갱신 API (`/api/token/refresh/`)에 새 액세스 토큰을 요청해! [10]
4.  **토큰 갱신 성공**: 새 액세스 토큰을 받으면, `response` 인터셉터는 `localStorage`의 `ACCESS_TOKEN`을 새 토큰으로 업데이트하고! 처음에 실패했던 API 요청을 **새 토큰으로 다시 보내줘!** ✨ (사용자는 에러가 났었는지 거의 눈치채지 못하게 돼!)
5.  **주기적 확인**: `AuthProvider`의 `useEffect` 안에서 설정된 `setInterval`에 의해 5분마다 `checkAuth`가 실행돼서 현재 액세스 토큰이 만료 예정인지 확인하고, 필요하면 미리 `refreshToken` 함수를 호출해서 토큰을 갱신해줘! [1]
