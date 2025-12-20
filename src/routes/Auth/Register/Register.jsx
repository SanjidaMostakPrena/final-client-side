


















// import React from 'react';
// import { useForm } from 'react-hook-form';
// import useAuth from '../../../Hooks/useAuth';
// import { FcGoogle } from "react-icons/fc";

// const Register = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const { registerUser, signInWithGoogle } = useAuth();

//   const adminEmails = ["admin1@gmail.com"];

//   const saveUserToDB = async (user) => {
//   const res = await fetch("http://localhost:5000/users", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user)
//   });
//   return res.json();
// };


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
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const adminEmails = ["admin1@gmail.com"];

  const saveUserToDB = async (user) => {
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    return res.json();
  };

  const handleRegistration = (data) => {
    registerUser(data.email, data.password)
      .then(async result => {
        const user = {
          name: data.name,
          email: result.user.email,
          uid: result.user.uid,
          role: adminEmails.includes(result.user.email) ? "admin" : "user",
          loginMethod: "email",
          createdAt: new Date()
        };
        await saveUserToDB(user);
        toast.success(`Welcome ${data.name}!`);
        navigate("/"); // Navigate to home
      })
      .catch(err => toast.error(err.message));
  };

  const handleGoogleRegister = () => {
    signInWithGoogle()
      .then(async result => {
        const user = result.user;
        const role = adminEmails.includes(user.email) ? "admin" : "user";
        await saveUserToDB({
          name: user.displayName || "Google User",
          email: user.email,
          uid: user.uid,
          role,
          loginMethod: "google",
          createdAt: new Date()
        });
        toast.success(`Welcome ${user.displayName || user.email}!`);
        navigate("/"); // Navigate to home
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-100 via-teal-50 to-white p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg border border-teal-200">
        <h2 className="text-4xl font-extrabold text-teal-900 mb-1">Create an Account</h2>
        <p className="text-teal-700 mb-8">Register with bookcurier</p>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            className="input input-bordered w-full h-12 border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-100 rounded-lg"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="input input-bordered w-full h-12 border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-100 rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength:6 })}
            className="input input-bordered w-full h-12 border-teal-300 focus:border-teal-500 focus:ring focus:ring-teal-100 rounded-lg"
          />
          {errors.password && <p className="text-red-500 text-sm">Password is required (6+ chars)</p>}

          <button
            type="submit"
            className="w-full h-12 text-white font-semibold rounded-xl bg-teal-500 hover:bg-teal-600 transition-colors mt-4 shadow-md"
          >
            Register
          </button>
        </form>

        <div className="divider text-teal-300 my-4">Or</div>

        <button
          onClick={handleGoogleRegister}
          className="btn w-full text-base border-teal-300 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-xl flex items-center justify-center"
        >
          <FcGoogle className="mr-2 text-xl" /> Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
