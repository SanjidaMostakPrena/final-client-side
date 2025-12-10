import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const { userName, review: testimonial, user_photoURL } = review;

  return (
    // Outer container: Card with shadow and accent
    <div className="card w-96 bg-white shadow-lg border-t-4 border-primary/70 rounded-lg transition-transform hover:scale-105 duration-300">
      
      {/* Card Body */}
      <div className="card-body p-6">
        
        {/* Quote Icon and Content */}
        <div className="flex items-start mb-4">
          <FaQuoteLeft className="text-3xl text-primary opacity-70 mr-3 mt-1" />
          <p className="text-gray-700 text-base">
            {testimonial}
          </p>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>
        
        {/* Author/Signature Section */}
        <div className="flex items-center mt-2">
          {/* Avatar/Image */}
          <div className="avatar mr-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
              <img src={user_photoURL} alt={`${userName} avatar`} className="object-cover w-full h-full"/>
            </div>
          </div>
          
          {/* Author Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{userName}</h3>
            <p className="text-sm text-gray-500">BookCourier User</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ReviewCard;
