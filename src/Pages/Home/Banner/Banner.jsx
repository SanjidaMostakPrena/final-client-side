
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
//         autoPlay
//         infiniteLoop
//         showThumbs={false}
//         showStatus={false}
//         interval={5000}
//         transitionTime={800}
//         swipeable
//         emulateTouch
//       >
//         {slides.map((slide) => (
//           <div key={slide.id} className="relative h-[80vh]">
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-[80vh] object-cover brightness-75"
//             />

//             {/* Gradient Overlay */}
//             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>

//             {/* Overlay Text */}
//             <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start px-6 md:px-20 text-white animate-fadeIn">
//               <h2 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
//                 {slide.title}
//               </h2>
//               <p className="text-lg md:text-2xl mb-6 drop-shadow-md max-w-xl leading-relaxed">
//                 {slide.description}
//               </p>
//               <a
//                 href={slide.buttonLink}
//                 className="bg-gradient-to-r from-teal-400 via-amber-400 to-teal-500 text-blue-900 font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 hover:brightness-110 transition-transform duration-300"
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
    <section className="relative">
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
          <div key={slide.id} className="relative h-[65vh] flex flex-col justify-center">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[65vh] object-cover brightness-90 dark:brightness-75"
            />

            {/* Overlay Gradient (Dark / Light) */}
            <div className="absolute inset-0
              bg-gradient-to-r
              from-white/40 via-white/10 to-white/40
              dark:from-black/70 dark:via-black/40 dark:to-black/70
            " />

            {/* Hero Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start
              px-4 md:px-24 gap-6 max-w-7xl mx-auto py-14"
            >
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-indigo-900 dark:text-white">
                {slide.title}
              </h2>

              <p className="text-lg md:text-xl text-indigo-900 dark:text-gray-200 max-w-2xl">
                {slide.description}
              </p>

              {/* Gradient Button */}
              <a
                href={slide.buttonLink}
                className="
                  mt-auto inline-block w-full sm:w-auto
                  bg-gradient-to-r from-teal-400 to-indigo-500
                  dark:from-teal-500 dark:to-indigo-600
                  hover:from-indigo-500 hover:to-teal-400
                  dark:hover:from-indigo-600 dark:hover:to-teal-500
                  text-white py-3 px-8 rounded-xl font-semibold
                  shadow-lg
                  transition-all duration-300
                "
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce">
        <span className="text-indigo-900 dark:text-gray-200 text-sm opacity-80">
          Scroll Down
        </span>
      </div>
    </section>
  );
};

export default Banner;
