import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to="/">
            <div className="flex items-end gap-2">
                {/* BookCourier logo image from direct link */}
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png
" 
                    alt="BookCourier Logo" 
                    className="w-10 h-10 object-contain"
                />
                <h3 className="text-3xl font-extrabold tracking-wide">
                    <span className="text-primary">Book</span>
                    <span className="text-neutral">Courier</span>
                </h3>
            </div>
        </Link>
    );
};

export default Logo;
