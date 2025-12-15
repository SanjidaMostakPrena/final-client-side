import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const bookNames = [
  "Learn JavaScript",
  "Mastering React",
  "CSS Secrets",
  "Node.js Guide",
  "Python for Beginners",
  "Data Structures in C",
  "Advanced Algorithms",
  "Java Programming Masterclass",
  "C++ for Competitive Programming",
  "Linux Command Line Essentials",
  "Artificial Intelligence Basics",
  "Machine Learning with Python",
  "Database Design Fundamentals",
  "Cloud Computing Concepts",
  "Cybersecurity Essentials",
  "Software Engineering Principles",
  "Computer Networks Explained",
  "Operating Systems in Depth"
];

const BooksCarousel = () => {
  return (
    <div className="py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Our Computer & Programming Books Collection</h2>
      <Swiper
        loop={true}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
      >
        {bookNames.map((name, idx) => (
          <SwiperSlide key={idx} className="flex justify-center items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold text-center">{name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="py-20 px-5 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-4">Fast & Reliable</h3>
            <p>We ensure quick and dependable delivery of your books right to your doorstep.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-4">Trusted Collection</h3>
            <p>We offer verified and up-to-date books for computer science and programming enthusiasts.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-4">Enhance Your Skills</h3>
            <p>Our curated collection helps you learn new programming languages and computer technologies efficiently.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BooksCarousel;
