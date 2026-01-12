// import React from 'react';
// import 'swiper/css';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';

// const bookNames = [
//   "Alice in Wonderland",
//   "Harry Potter",
//   "Charlie and the Chocolate Factory",
//   "Matilda",
//   "The Jungle Book",
//   "Peter Pan",
//   "The Adventures of Tom Sawyer",
//   "Charlotte's Web",
//   "Treasure Island",
//   "The Call of the Wild",
//   "The Monkey’s Paw",
//   "The Gift of the Magi",
//   "Rikki-Tikki-Tavi",
//   "The Importance of Being Earnest",
//   "Three Men in a Boat"
// ];

// const BooksCarousel = () => {
//   return (
//     <div className="py-24 bg-white text-black">

//       {/* Heading */}
//       <div className="text-center mb-16">
//         <h2 className="text-4xl md:text-5xl font-extrabold text-black">
//           Explore Our Book Collection
//         </h2>
//         <p className="mt-4 text-black max-w-2xl mx-auto">
//            Curated books for learning, reading, and fun.
//         </p>
//       </div>

//       {/* Books Slider */}
//       <Swiper
//         loop
//         slidesPerView={3}
//         centeredSlides
//         spaceBetween={40}
//         grabCursor
//         modules={[Autoplay]}
//         autoplay={{ delay: 1600, disableOnInteraction: false }}
//         className="px-6 md:px-24"
//       >
//         {bookNames.map((name, idx) => (
//           <SwiperSlide key={idx} className="flex justify-center">

//             {/* Book Card */}
//             <div className="relative w-full h-44 rounded-3xl bg-white border border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex items-center justify-center">
              
//               {/* Decorative spine */}
//               <span className="absolute left-0 top-0 h-full w-2 rounded-l-3xl bg-gradient-to-b from-black to-gray-700"></span>

//               <h3 className="text-xl md:text-2xl font-semibold text-black text-center px-6">
//                 {name}
//               </h3>
//             </div>

//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Why Choose Us */}
//       <section className="mt-28 px-6 md:px-24">
//         <h2 className="text-4xl font-bold text-center text-black mb-14">
//           Why Choose BookCourier
//         </h2>

//         <div className="grid md:grid-cols-3 gap-10">
          
//           {/* Card 1 */}
//           <div className="p-8 rounded-3xl bg-white shadow-md hover:shadow-2xl transition duration-500 border border-gray-300 text-center text-black">
//             <div className="text-4xl mb-4">🚚</div>
//             <h3 className="text-2xl font-semibold mb-3">
//               Fast Delivery
//             </h3>
//             <p>
//                Timeless novels and stories that shaped English literature.
//             </p>
//           </div>

//           {/* Card 2 */}
//           <div className="p-8 rounded-3xl bg-white shadow-md hover:shadow-2xl transition duration-500 border border-gray-300 text-center text-black">
//             <div className="text-4xl mb-4">📚</div>
//             <h3 className="text-2xl font-semibold mb-3">
//               Quality Collection
//             </h3>
//             <p>
//               Carefully selected books trusted by students and professionals.
//             </p>
//           </div>

//           {/* Card 3 */}
//           <div className="p-8 rounded-3xl bg-white shadow-md hover:shadow-2xl transition duration-500 border border-gray-300 text-center text-black">
//             <div className="text-4xl mb-4"></div>
//             <h3 className="text-2xl font-semibold mb-3">
//               Skill Growth
//             </h3>
//             <p>
//               Learn faster, build stronger foundations, and grow your tech skills.
//             </p>
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// };

// export default BooksCarousel;
import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const bookNames = [
  "Alice in Wonderland",
  "Harry Potter",
  "Charlie and the Chocolate Factory",
  "Matilda",
  "The Jungle Book",
  "Peter Pan",
  "The Adventures of Tom Sawyer",
  "Charlotte's Web",
  "Treasure Island",
  "The Call of the Wild",
  "The Monkey’s Paw",
  "The Gift of the Magi",
  "Rikki-Tikki-Tavi",
  "The Importance of Being Earnest",
  "Three Men in a Boat"
];

const BooksCarousel = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500 py-14 px-4 md:px-14 max-w-7xl mx-auto">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-900 dark:text-indigo-300">
          Explore Our Book Collection
        </h2>
        <p className="mt-4 text-lg text-indigo-900 dark:text-gray-300 max-w-2xl mx-auto">
          Curated books for learning, reading, and fun.
        </p>
      </div>

      {/* Books Slider */}
      <Swiper
        loop
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        centeredSlides
        spaceBetween={40}
        grabCursor
        modules={[Autoplay]}
        autoplay={{ delay: 1800, disableOnInteraction: false }}
        className="px-4 md:px-0"
      >
        {bookNames.map((name, idx) => (
          <SwiperSlide key={idx} className="flex justify-center">
            {/* Book Card */}
            <div className="relative w-full max-w-xs h-48 rounded-3xl
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              shadow-lg hover:shadow-2xl
              hover:-translate-y-2 transition-transform duration-500
              flex items-center justify-center px-4
            ">
              {/* Decorative Spine */}
              <span className="absolute left-0 top-0 h-full w-2 rounded-l-3xl
                bg-gradient-to-b from-teal-400 to-indigo-500 dark:from-teal-500 dark:to-indigo-600
              "></span>

              <h3 className="text-xl md:text-2xl font-semibold text-indigo-900 dark:text-indigo-200 text-center px-6">
                {name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Why Choose Us */}
      <section className="mt-28">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-indigo-900 dark:text-indigo-300 mb-14">
          Why Choose BookCourier
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Card 1 */}
          <div className="p-8 rounded-3xl
            bg-white dark:bg-gray-800
            shadow-md hover:shadow-2xl transition-all duration-500
            border border-gray-200 dark:border-gray-700
            text-center flex flex-col items-center gap-4
          ">
            <div className="text-4xl">🚚</div>
            <h3 className="text-2xl font-semibold text-indigo-900 dark:text-indigo-200">Fast Delivery</h3>
            <p className="text-indigo-900 dark:text-gray-300 text-lg">
              Timeless novels and stories delivered quickly to your doorstep.
            </p>
            <button className="mt-auto inline-block w-full sm:w-auto
              bg-gradient-to-r from-teal-400 to-indigo-500
              dark:from-teal-500 dark:to-indigo-600
              hover:from-indigo-500 hover:to-teal-400
              dark:hover:from-indigo-600 dark:hover:to-teal-500
              text-white py-2 px-6 rounded-xl font-semibold
              transition-all duration-300
            ">
              Learn More
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl
            bg-white dark:bg-gray-800
            shadow-md hover:shadow-2xl transition-all duration-500
            border border-gray-200 dark:border-gray-700
            text-center flex flex-col items-center gap-4
          ">
            <div className="text-4xl">📚</div>
            <h3 className="text-2xl font-semibold text-indigo-900 dark:text-indigo-200">Quality Collection</h3>
            <p className="text-indigo-900 dark:text-gray-300 text-lg">
              Carefully curated books trusted by students and professionals.
            </p>
            <button className="mt-auto inline-block w-full sm:w-auto
              bg-gradient-to-r from-teal-400 to-indigo-500
              dark:from-teal-500 dark:to-indigo-600
              hover:from-indigo-500 hover:to-teal-400
              dark:hover:from-indigo-600 dark:hover:to-teal-500
              text-white py-2 px-6 rounded-xl font-semibold
              transition-all duration-300
            ">
              Browse Collection
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl
            bg-white dark:bg-gray-800
            shadow-md hover:shadow-2xl transition-all duration-500
            border border-gray-200 dark:border-gray-700
            text-center flex flex-col items-center gap-4
          ">
            <div className="text-4xl">💡</div>
            <h3 className="text-2xl font-semibold text-indigo-900 dark:text-indigo-200">Skill Growth</h3>
            <p className="text-indigo-900 dark:text-gray-300 text-lg">
              Learn faster, build stronger foundations, and grow your skills.
            </p>
            <button className="mt-auto inline-block w-full sm:w-auto
              bg-gradient-to-r from-teal-400 to-indigo-500
              dark:from-teal-500 dark:to-indigo-600
              hover:from-indigo-500 hover:to-teal-400
              dark:hover:from-indigo-600 dark:hover:to-teal-500
              text-white py-2 px-6 rounded-xl font-semibold
              transition-all duration-300
            ">
              Get Started
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default BooksCarousel;
