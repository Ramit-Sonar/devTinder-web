import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {

  const [emailId, setEmailId] = useState("ramit@gmail.com");
  const [password, setPassword] = useState("Dikshya@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true
        }
      );
      dispatch(addUser(res.data.data)) //store user data in appStore
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/20 px-4 py-16">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl border border-base-300/50 rounded-3xl">
        <div className="card-body p-6 gap-3">

          <div className="text-center mb-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-content shadow-lg mb-2">
              <span className="text-2xl font-extrabold">d</span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight">
              dev<span className="text-primary">Tinder</span>
            </h2>

            <p className="text-base-content/60 mt-1 text-sm">
              Welcome back! Let's connect.
            </p>
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Email Address</legend>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="you@example.com"
              className="input input-bordered w-full rounded-xl"
              required
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-xl"
              required
            />
          </fieldset>

          <button className="btn btn-primary w-full rounded-xl mt-2" onClick={handleLogin}>
            Login →
          </button>

          <p className="text-center text-sm text-base-content/70 mt-1">
            Don't have an account?{" "}
            <a className="link link-primary font-bold">Sign up</a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;