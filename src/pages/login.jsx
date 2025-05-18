import styled from "styled-components";
const Style = styled.div``; // <--여기에 css 적용시켜주세요
const Login = () => {
  return (
    <Style>
      <h1>Login Page</h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </Style>
  );
};
export default Login;
