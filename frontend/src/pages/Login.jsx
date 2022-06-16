import debug from "debug";
const log = debug("simon:frontend:Login");
import {useAtom} from 'jotai'
import {userAtom} from '../App';

function Login() {
  const [user, setUser] = useAtom(userAtom);

  const handleSubmit = (event) => {
    event.preventDefault();
    const info = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
    };
    // console.log(info);

    fetch("/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)
    })
      .then((response) => response.json())
      .then((data) => setUser(data.data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" />
        <button>Login</button>
      </fieldset>
    </form>
  );
}

export default Login;
