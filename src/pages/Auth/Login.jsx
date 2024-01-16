import Button from "@/components/Button";
import { login } from "@/services/authService";
import { getCurrentUser, logout } from "../../services/authService";
import useAuth from "../../hooks/useAuth";


const Login = () => {
  const { dispatch } = useAuth()

  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(state.email, state.password)
      .then(async () => {
        const user = await getCurrentUser()
        dispatch({ type: 'SIGN_IN', isAuthenticated: true, user })

        console.log('Login Success')
        // TO DO : Redirect to Home
        // console.log(getCurrentUser())
      })
      .catch(error => {
        console.error('Login error:', error.message);
        // TO DO : Show error to user
      })
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm items-center">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          LOGIN
        </h2>
        <div className="text-center">Please log in to enjoy all features</div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={state.email}
                onChange={handleInputChange}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Input email"
                required
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                value={state.password}
                onChange={handleInputChange}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Input password"
                minLength={6}
                required
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 leading-6"
              />
            </div>
            <div className="text-sm text-right">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full text-white" btnStyle="primary">
              Sign in
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
