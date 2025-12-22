import React from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const booksData = [
  {
    id: 1,
    name: "The Kite Runner",
    author: "Khaled Hosseini",
    bookImage: "https://i.ibb.co/TDHBgzGR/i1.jpg",
    authorImage: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: 2,
    name: "Great Expectations",
    author: "Charles Dickens",
    bookImage: "https://i.ibb.co/mrRY8kqZ/i2.jpg",
    authorImage: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    id: 3,
    name: "Never Let Me Go",
    author: "Kazuo Ishiguro",
    bookImage: "https://i.ibb.co/XrWthqM8/i4.webp",
    authorImage: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    id: 4,
    name: "Wuthering Heights",
    author: "Emily Brontë",
    bookImage: "https://i.ibb.co/HDQCsMKq/i7.jpg",
    authorImage: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const BooksSwiper = () => {
  return (
    <section className="my-24 py-20 bg-white text-black">
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <h3 className="text-4xl md:text-5xl font-bold mb-4 text-black">
          Why Reading These Books Matters
        </h3>
        <p className="text-black text-lg">
           Timeless novels and stories that shaped English literature.
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="px-4">
        <Swiper
          loop={true}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            scale: 0.85,
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
              <div className="group bg-white border border-gray-300 rounded-2xl shadow-lg p-5 text-center text-black hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                
                {/* Book Image */}
                <div className="overflow-hidden rounded-xl mb-4 aspect-[3/4]">
                  <img
                    src={book.bookImage}
                    alt={book.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Book Info */}
                <h3 className="text-xl font-semibold mb-1">{book.name}</h3>
                <p className="text-black text-sm mb-4">{book.author}</p>

                {/* Author */}
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={book.authorImage}
                    alt={book.author}
                    className="w-10 h-10 rounded-full border-2 border-black"
                  />
                  <p className="text-sm text-black font-medium">
                    Author / Reviewer
                  </p>
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
