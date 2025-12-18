import React from "react";
import { FaBookOpen, FaTruck, FaUsers, FaMapMarkedAlt } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-blue-50 min-h-screen">

      {/* ===== Hero Section ===== */}
      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-6">
          About <span className="text-teal-600">BookCourier</span>
        </h1>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          BookCourier is a modern online book delivery platform that connects readers
          with trusted libraries and delivers books safely to their doorstep.
        </p>
      </section>

      {/* ===== Mission & Vision ===== */}
      <section className="py-16 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to make books easily accessible for everyone.
              We aim to support learning, knowledge sharing, and reading culture
              by providing fast, reliable, and affordable book delivery services.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where books reach every corner effortlessly.
              BookCourier wants to become the most trusted platform for book delivery
              across cities and communities.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Why We Exist ===== */}
      <section className="py-16 bg-white px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-12">
          Why BookCourier?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 bg-gradient-to-br from-indigo-100 to-teal-50 text-center">
            <FaBookOpen className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wide Book Collection</h3>
            <p className="text-gray-600">
              Access books from multiple libraries and categories in one place.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 bg-gradient-to-br from-indigo-100 to-teal-50 text-center">
            <FaTruck className="text-4xl text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable delivery ensuring books arrive safely.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 bg-gradient-to-br from-indigo-100 to-teal-50 text-center">
            <FaUsers className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trusted Libraries</h3>
            <p className="text-gray-600">
              Verified librarians manage books to ensure authenticity.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 bg-gradient-to-br from-indigo-100 to-teal-50 text-center">
            <FaMapMarkedAlt className="text-4xl text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
            <p className="text-gray-600">
              Delivery available across multiple cities and regions.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Closing Section ===== */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-6">
          Read More. Learn More. Anywhere.
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          BookCourier is not just a delivery service — it’s a bridge between
          knowledge and readers. Join us and experience a smarter way to get books.
        </p>
      </section>

    </div>
  );
};

export default AboutUs;
