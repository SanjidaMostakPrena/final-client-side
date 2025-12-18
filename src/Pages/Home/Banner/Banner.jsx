// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// import bannerimg1 from "../../../assets/banner/banner1.jpg";
// import bannerimg2 from "../../../assets/banner/banner2.webp";
// import bannerimg3 from "../../../assets/banner/banner3.avif";

// const Banner = () => {
//   const slides = [
//     {
//       id: 1,
//       image: bannerimg1,
//       title: "Discover Your Next Favorite Book",
//       description:
//         "Explore thousands of books delivered to your doorstep with BookCourier.",
//       buttonText: "Browse All Books",
//       buttonLink: "/books",
//     },
//     {
//       id: 2,
//       image: bannerimg2,
//       title: "Fast & Reliable Delivery",
//       description:
//         "Get books delivered in record time across all major cities.",
//       buttonText: "See Coverage",
//       buttonLink: "/coverage",
//     },
//     {
//       id: 3,
//       image: bannerimg3,
//       title: "Curated Collections Just for You",
//       description:
//         "Handpicked selections from top authors and trending books.",
//       buttonText: "Explore Collections",
//       buttonLink: "/books",
//     },
//   ];

//   return (
//     <div className="relative">
//       <Carousel
//         autoPlay={true}
//         infiniteLoop={true}
//         showThumbs={false}
//         showStatus={false}
//         interval={5000}
//         transitionTime={800}
//       >
//         {slides.map((slide) => (
//           <div key={slide.id} className="relative h-[80vh]">
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-[80vh] object-cover brightness-75"
//             />

//             {/* Overlay Text */}
//             <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start px-10 md:px-20 text-white">
//               <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
//                 {slide.title}
//               </h2>
//               <p className="text-lg md:text-2xl mb-6 drop-shadow-md max-w-xl">
//                 {slide.description}
//               </p>
//               <a
//                 href={slide.buttonLink}
//                 className="bg-amber-400 text-blue-900 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-amber-500 transition duration-300"
//               >
//                 {slide.buttonText}
//               </a>
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default Banner;
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerimg1 from "../../../assets/banner/banner1.jpg";
import bannerimg2 from "../../../assets/banner/banner2.webp";
import bannerimg3 from "../../../assets/banner/banner3.avif";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: bannerimg1,
      title: "Discover Your Next Favorite Book",
      description:
        "Explore thousands of books delivered to your doorstep with BookCourier.",
      buttonText: "Browse All Books",
      buttonLink: "/books",
    },
    {
      id: 2,
      image: bannerimg2,
      title: "Fast & Reliable Delivery",
      description:
        "Get books delivered in record time across all major cities.",
      buttonText: "See Coverage",
      buttonLink: "/coverage",
    },
    {
      id: 3,
      image: bannerimg3,
      title: "Curated Collections Just for You",
      description:
        "Handpicked selections from top authors and trending books.",
      buttonText: "Explore Collections",
      buttonLink: "/books",
    },
  ];

  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={800}
        swipeable
        emulateTouch
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[80vh]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[80vh] object-cover brightness-75"
            />

            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>

            {/* Overlay Text */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start px-6 md:px-20 text-white animate-fadeIn">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl mb-6 drop-shadow-md max-w-xl leading-relaxed">
                {slide.description}
              </p>
              <a
                href={slide.buttonLink}
                className="bg-gradient-to-r from-teal-400 via-amber-400 to-teal-500 text-blue-900 font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 hover:brightness-110 transition-transform duration-300"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
