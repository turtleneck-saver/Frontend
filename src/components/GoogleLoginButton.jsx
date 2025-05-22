import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const backendValidateTokenUrl =
    "http://127.0.0.1:8000/api/google/validate_token/";
  const GOOGLE_CLIENT_ID_CLIENT_SIDE =
    "235310330925-m7hmtbipvf03i085obskko131l84ske7.apps.googleusercontent.com";
  const handleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const res = await fetch(backendValidateTokenUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ access_token: idToken }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server response error: ", res.status, errorData);
        alert(
          `토큰 검증 요청 중 오류 발생: ${res.status} - ${
            errorData.detail || res.statusText
          }`
        );
        return;
      }

      const data = await res.json();
      console.log(
        "Server response from validate_google_token endpoint: ",
        data
      );

      if (data.valid) {
        alert(
          "Google 토큰 백엔드 전송 및 임시 검증 완료! (실제 로그인 처리 로직 필요)"
        );
      } else {
        alert("백엔드에서 토큰 검증 실패 응답을 받았습니다.");
      }
    } catch (error) {
      console.error("Fetch request failed: ", error);
      alert("네트워크 오류 발생. 서버 연결을 확인해주세요.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID_CLIENT_SIDE}>
      <div>
        <h2>Google 로그인</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log("Login Failed (ID Token Flow)");
            alert("Google 로그인 실패!");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
