
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { FcGoogle } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, signInWithGoogle } = useAuth();

  const saveUserToDB = (user) => {
    // Send user data to MongoDB
    fetch("https://bookcourier.vercel.app", { // Change port if needed
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => console.log("MongoDB Response:", data))
      .catch(err => console.error("MongoDB Save Error:", err));
  };

  const handleRegistration = (data) => {
    registerUser(data.email, data.password)
      .then((result) => {
        console.log("User Created:", result.user);

        // Prepare user data for MongoDB
        const user = {
          name: data.name,
          email: result.user.email,
          uid: result.user.uid,
          role: "user",
          loginMethod: "email",
          createdAt: new Date()
        };

        saveUserToDB(user);

        alert(`Welcome ${data.name}! Registration successful.`);
      })
      .catch((error) => {
        console.error("Firebase Error:", error.message);
        alert(error.message);
      });
  };

  const handleGoogleRegister = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("Google User:", result.user);

        const user = {
          name: result.user.displayName || "Google User",
          email: result.user.email,
          uid: result.user.uid,
          role: "user",
          loginMethod: "google",
          createdAt: new Date()
        };

        saveUserToDB(user);

        alert(`Welcome ${result.user.displayName || result.user.email}!`);
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
        alert(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md p-6">

        {/* Headings */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-1">Create an Account</h2>
        <p className="text-gray-600 mb-8">Register with ZapShift</p>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16 text-gray-400">
            <FaUserCircle className="w-full h-full" />
            <span className="absolute bottom-0 right-0 p-1 rounded-full bg-lime-400 border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full h-12"
              placeholder="Name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">Name is required</p>}
          </div>

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
            {errors.email && <p className="text-sm text-red-500 mt-1">Email is required</p>}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
              })}
              className="input input-bordered w-full h-12"
              placeholder="Password"
            />
            {errors.password?.type === "required" && <p className="text-sm text-red-500 mt-1">Password is required</p>}
            {errors.password?.type === "minLength" && <p className="text-sm text-red-500 mt-1">Password must be at least 6 characters</p>}
            {errors.password?.type === "pattern" && <p className="text-sm text-red-500 mt-1">Password must contain both uppercase and lowercase letters</p>}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full h-12 text-gray-800 font-semibold rounded-lg bg-[#b5e879] hover:bg-[#a9db71] transition-colors mt-6"
          >
            Register
          </button>

        </form>

        {/* Login Link & Google */}
        <div className="flex flex-col items-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?
            <a href="/login" className="ml-1 font-semibold text-lime-600 hover:underline">Login</a>
          </p>

          <div className="divider text-gray-400 my-4">Or</div>

          {/* Google Register Button */}
          <button
            onClick={handleGoogleRegister}
            className="btn w-full text-base border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
          >
            <FcGoogle className="text-xl mr-2" />
            Register with Google
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;



















// import React from 'react';
// import { useForm } from 'react-hook-form';
// import useAuth from '../../../Hooks/useAuth';
// import { FcGoogle } from "react-icons/fc";

// const Register = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const { registerUser, signInWithGoogle } = useAuth();

//   const adminEmails = ["admin1@gmail.com"];

//   const saveUserToDB = async (user) => {
//     const res = await fetch("https://bookcourier.vercel.app", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user)
//     });
//     return res.json();
//   };

//   const handleRegistration = (data) => {
//     registerUser(data.email, data.password)
//       .then(async result => {
//         const user = {
//           name: data.name,
//           email: result.user.email,
//           uid: result.user.uid,
//           role: adminEmails.includes(result.user.email) ? "admin" : "user",
//           loginMethod: "email",
//           createdAt: new Date()
//         };
//         await saveUserToDB(user);
//         alert(`Welcome ${data.name}!`);
//       })
//       .catch(err => alert(err.message));
//   };

//   const handleGoogleRegister = () => {
//     signInWithGoogle()
//       .then(async result => {
//         const user = result.user;
//         const role = adminEmails.includes(user.email) ? "admin" : "user";
//         await saveUserToDB({
//           name: user.displayName || "Google User",
//           email: user.email,
//           uid: user.uid,
//           role,
//           loginMethod: "google",
//           createdAt: new Date()
//         });
//         alert(`Welcome ${user.displayName || user.email}!`);
//       })
//       .catch(err => alert(err.message));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white p-4">
//       <div className="w-full max-w-md p-6">
//         <h2 className="text-4xl font-extrabold mb-1">Create an Account</h2>
//         <p className="text-gray-600 mb-8">Register with ZapShift</p>

//         <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
//           <input type="text" placeholder="Name" {...register("name", { required: true })} className="input input-bordered w-full h-12"/>
//           {errors.name && <p className="text-red-500">Name is required</p>}

//           <input type="email" placeholder="Email" {...register("email", { required: true })} className="input input-bordered w-full h-12"/>
//           {errors.email && <p className="text-red-500">Email is required</p>}

//           <input type="password" placeholder="Password" {...register("password", { required: true, minLength:6 })} className="input input-bordered w-full h-12"/>
//           {errors.password && <p className="text-red-500">Password is required (6+ chars)</p>}

//           <button type="submit" className="w-full h-12 bg-[#b5e879] rounded-lg mt-4">Register</button>
//         </form>

//         <div className="divider my-4">Or</div>

//         <button onClick={handleGoogleRegister} className="btn w-full border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100">
//           <FcGoogle className="mr-2" /> Register with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Register;
