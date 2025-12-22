
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        console.log("Logged In:", result.user);
        toast.success(`Welcome back ${result.user.email}`);
        navigate("/"); // Navigate to home
      })
      .catch((error) => {
        console.error("Firebase Error:", error.message);
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;

        const adminEmails = ["admin1@gmail.com"];
        const role = adminEmails.includes(user.email) ? "admin" : "user";

        const userData = {
          name: user.displayName || "Google User",
          email: user.email,
          uid: user.uid,
          role,
          loginMethod: "google",
          createdAt: new Date(),
        };

        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("MongoDB Response:", data);
            toast.success(`Welcome ${user.displayName || user.email}!`);
            navigate("/"); // Navigate to home
          })
          .catch((err) => {
            console.error("MongoDB Save Error:", err);
            toast.error("Failed to save user data!");
          });
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-100 via-teal-50 to-white p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg border border-teal-200">
        <h2 className="text-4xl font-extrabold text-teal-900 mb-1">Welcome Back</h2>
        <p className="text-teal-700 mb-8">Login with bookcourier</p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-teal-700">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full h-12 border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-100 rounded-lg"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-teal-700">Password</span>
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input input-bordered w-full h-12 border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-100 rounded-lg"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">Password is required</p>
            )}
          </div>

          <div className="pt-2 text-right">
            <a
              href="/forgot-password"
              className="text-sm text-teal-600 hover:text-teal-800 font-medium"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full h-12 text-white font-semibold rounded-xl bg-teal-500 hover:bg-teal-600 transition-colors mt-6 shadow-md"
          >
            Login
          </button>
        </form>

        <div className="flex flex-col items-center mt-6">
          <p className="text-sm text-teal-700">
            Don't have an account?
            <a
              href="/register"
              className="ml-1 font-semibold text-teal-600 hover:underline"
            >
              Register
            </a>
          </p>

          <div className="divider text-teal-300 my-4">Or</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn w-full text-base border-teal-300 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-xl flex items-center justify-center"
          >
            <FcGoogle className="text-xl mr-2" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
