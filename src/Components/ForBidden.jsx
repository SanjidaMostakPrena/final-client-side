import React from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react"; // if you use lucide-react, optional

const ForBidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-4">
            <div className="backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center border border-white/20 animate-fade-in">
                
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-6 shadow-xl backdrop-blur-2xl border border-red-500/30">
                        <Lock size={40} />
                    </div>
                </div>

                {/* Error Code */}
                <h1 className="text-6xl font-extrabold text-white drop-shadow-lg tracking-widest">
                    403
                </h1>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-red-300 mt-4">
                    Access Forbidden
                </h2>

                {/* Description */}
                <p className="text-gray-300 mt-3 leading-relaxed">
                    You don’t have permission to access this page.  
                    If you think this is a mistake, please contact the administrator.
                </p>

                {/* Button */}
                <Link
                    to="/"
                    className="mt-8 inline-block px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full shadow-lg transform hover:scale-[1.03] transition-all duration-200"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default ForBidden;
