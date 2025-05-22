import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "../components/GoogleLoginButton"; // 아래에서 만들 컴포넌트

function Login() {
  const googleClientId =
    "235310330925-m7hmtbipvf03i085obskko131l84ske7.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div>
        <h1>My React App</h1>
        <GoogleLoginButton />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
