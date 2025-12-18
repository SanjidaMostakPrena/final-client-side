// import React from 'react';
// import { Link } from 'react-router-dom';

// const Logo = () => {
//     return (
//         <Link to="/">
//             <div className="flex items-end gap-2">
//                 {/* BookCourier logo image from direct link */}
//                 <img 
//                     src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png
// " 
//                     alt="BookCourier Logo" 
//                     className="w-10 h-10 object-contain"
//                 />
//                 <h3 className="text-3xl font-extrabold tracking-wide">
//                     <span className="text-primary">Book</span>
//                     <span className="text-neutral">Courier</span>
//                 </h3>
//             </div>
//         </Link>
//     );
// };

// export default Logo;
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to="/">
            <div className="flex items-center gap-3">
                {/* Logo Image with subtle hover animation */}
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" 
                    alt="BookCourier Logo" 
                    className="w-12 h-12 object-contain transform transition-transform duration-500 hover:scale-110"
                />
                {/* Logo Text with gradient effect */}
                <h3 className="text-3xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-indigo-500 to-blue-600">
                    Book<span className="text-black">Courier</span>
                </h3>
            </div>
        </Link>
    );
};

export default Logo;
