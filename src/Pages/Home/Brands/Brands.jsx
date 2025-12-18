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
    <div className="py-24 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-900">
          Explore Our Book Collection
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
           Curated books for learning, reading, and fun.
        </p>
      </div>

      {/* Books Slider */}
      <Swiper
        loop
        slidesPerView={3}
        centeredSlides
        spaceBetween={40}
        grabCursor
        modules={[Autoplay]}
        autoplay={{ delay: 1600, disableOnInteraction: false }}
        className="px-6 md:px-24"
      >
        {bookNames.map((name, idx) => (
          <SwiperSlide key={idx} className="flex justify-center">

            {/* Book Card */}
            <div className="relative w-full h-44 rounded-3xl bg-white/70 backdrop-blur-md border border-indigo-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex items-center justify-center">
              
              {/* Decorative spine */}
              <span className="absolute left-0 top-0 h-full w-2 rounded-l-3xl bg-gradient-to-b from-indigo-500 to-cyan-400"></span>

              <h3 className="text-xl md:text-2xl font-semibold text-indigo-900 text-center px-6">
                {name}
              </h3>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* Why Choose Us */}
      <section className="mt-28 px-6 md:px-24">
        <h2 className="text-4xl font-bold text-center text-indigo-900 mb-14">
          Why Choose BookCourier
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-white shadow-md hover:shadow-2xl transition duration-500 border border-indigo-100 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-2xl font-semibold text-indigo-900 mb-3">
              Fast Delivery
            </h3>
            <p className="text-slate-600">
               Timeless novels and stories that shaped English literature.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-white shadow-md hover:shadow-2xl transition duration-500 border border-indigo-100 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-indigo-900 mb-3">
              Quality Collection
            </h3>
            <p className="text-slate-600">
              Carefully selected books trusted by students and professionals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-white shadow-md hover:shadow-2xl transition duration-500 border border-indigo-100 text-center">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-2xl font-semibold text-indigo-900 mb-3">
              Skill Growth
            </h3>
            <p className="text-slate-600">
              Learn faster, build stronger foundations, and grow your tech skills.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default BooksCarousel;
