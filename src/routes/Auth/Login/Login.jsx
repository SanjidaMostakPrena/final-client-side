
import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, signInWithGoogle } = useAuth();

  const handleLogin = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        console.log("Logged In:", result.user);
        alert(`Welcome back ${result.user.email}`);
        // Redirect logic here
      })
      .catch((error) => {
        console.error("Firebase Error:", error.message);
        alert(error.message);
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
          createdAt: new Date()
        };


        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
        })
          .then(res => res.json())
          .then(data => {
            console.log("MongoDB Response:", data);
            alert(`Welcome ${user.displayName || user.email}!`);

          })
          .catch(err => {
            console.error("MongoDB Save Error:", err);
            alert("Failed to save user data!");
          });

      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
        alert(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md p-6">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-1">Welcome Back</h2>
        <p className="text-gray-600 mb-8">Login with ZapShift</p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full h-12"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">Password</span>
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input input-bordered w-full h-12"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">Password is required</p>
            )}
          </div>

          <div className="pt-2">
            <a href="/forgot-password" className="text-sm text-gray-600 hover:text-lime-600">
              Forget Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full h-12 text-gray-800 font-semibold rounded-lg bg-[#b5e879] hover:bg-[#a9db71] transition-colors mt-6"
          >
            Login
          </button>
        </form>

        <div className="flex flex-col items-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have any account?
            <a href="/register" className="ml-1 font-semibold text-lime-600 hover:underline">
              Register
            </a>
          </p>

          <div className="divider text-gray-400 my-4">Or</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn w-full text-base border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
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
