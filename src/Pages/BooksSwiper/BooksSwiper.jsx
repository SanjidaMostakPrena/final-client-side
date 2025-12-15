import React from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const booksData = 
  [
  {
    "id": 1,
    "name": "Learn JavaScript",
    "description": "Improve your programming skills and logical thinking.",
    "bookImage": "https://i.ibb.co/2t7KZzY/book1.jpg",
    "authorImage": "https://randomuser.me/api/portraits/men/10.jpg"
  },
  {
    "id": 2,
    "name": "Mastering React",
    "description": "Build interactive web apps and enhance problem-solving skills.",
    "bookImage": "https://i.ibb.co/3YJ5f4d/book2.jpg",
    "authorImage": "https://randomuser.me/api/portraits/women/25.jpg"
  },
  {
    "id": 3,
    "name": "Python for Beginners",
    "description": "Learn coding fundamentals and develop analytical thinking.",
    "bookImage": "https://i.ibb.co/4fG9XcV/book3.jpg",
    "authorImage": "https://randomuser.me/api/portraits/men/34.jpg"
  },
  {
    "id": 4,
    "name": "Data Structures in C",
    "description": "Boost your problem-solving and programming knowledge.",
    "bookImage": "https://i.ibb.co/5H8m3fL/book4.jpg",
    "authorImage": "https://randomuser.me/api/portraits/women/12.jpg"
  }
]


const BooksSwiper = () => {
  return (
    <section className="my-24 bg-gray-50 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <h3 className="text-4xl font-bold text-primary mb-4">
          Why Reading These Books is Beneficial
        </h3>
        <p className="text-gray-500 text-lg">
          Explore these books to improve your knowledge, skills, and personal growth.
        </p>
      </div>

      <div className="px-4">
        <Swiper
          loop={true}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: 50,
            depth: 200,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {booksData.map((book) => (
            <SwiperSlide key={book.id}>
              <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-transform hover:scale-105 text-center">
                <img
                  src={book.bookImage}
                  alt={book.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{book.name}</h3>
                <p className="text-gray-600 mb-4">{book.description}</p>
                <div className="flex items-center justify-center">
                  <img
                    src={book.authorImage}
                    alt="author"
                    className="w-10 h-10 rounded-full border border-gray-200 mr-3"
                  />
                  <p className="text-sm text-gray-500">Author/Reviewer</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BooksSwiper;
