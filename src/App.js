import SignUp from "./components/SignUpForm";
import Login from "./components/LoginForm";

import "./App.css";

function App() {
  return (
    <div className="App">
      <SignUp>SIGN UP</SignUp>
      <h1>Login</h1>
      <Login></Login>
    </div>
  );
}

export default App;
