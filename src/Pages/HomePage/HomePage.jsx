
import React from "react";
import BooksCarousel from "../Home/Brands/Brands";
import Coverage from "../Home/Reviews/Coverage/Coverage";

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-14 py-14
      bg-white dark:bg-gray-900
      text-gray-900 dark:text-gray-200
      transition-colors duration-500 ease-in-out
    ">

      {/* FEATURES */}
      <section className="py-20 px-6 md:px-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Our Features
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: "🚚", title: "Fast Delivery", text: "Get books delivered within 24-48 hours safely to your doorstep." },
            { icon: "📚", title: "Wide Selection", text: "Thousands of books across genres, curated from trusted libraries." },
            { icon: "💡", title: "Knowledge Growth", text: "Boost learning, explore classics, and discover new interests." },
          ].map((f, i) => (
            <div
              key={i}
              className="
                p-6 bg-white dark:bg-gray-700 
                rounded-2xl shadow 
                hover:shadow-2xl hover:-translate-y-1
                transition-all duration-500
              "
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-6 md:px-24 transition-colors duration-500">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Book Categories
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Fiction", "Non-Fiction", "Children", "Sci-Fi", 
            "Biographies", "Tech", "History", "Poetry"
          ].map((cat, idx) => (
            <div
              key={idx}
              className="
                bg-gradient-to-br from-indigo-100 to-teal-50
                dark:from-gray-700 dark:to-gray-600
                rounded-xl p-6 text-center cursor-pointer
                hover:scale-105
                transition-all duration-500
              "
            >
              <h3 className="font-semibold text-lg text-indigo-900 dark:text-indigo-200">
                {cat}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 text-center transition-colors duration-500">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          Why Choose BookCourier?
        </h2>

        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[
            { value: "64+", label: "Districts Covered", color: "text-teal-500" },
            { value: "2000+", label: "Books Delivered", color: "text-indigo-500" },
            { value: "150+", label: "Trusted Libraries", color: "text-teal-500" },
            { value: "98%", label: "Customer Satisfaction", color: "text-indigo-500" },
          ].map((s, i) => (
            <div key={i} className="transition-transform duration-500 hover:scale-105">
              <p className={`text-5xl md:text-6xl font-bold ${s.color}`}>{s.value}</p>
              <p className="mt-2 text-lg">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 md:px-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Testimonials
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Ayesha", text: "Fast delivery and amazing collection!" },
            { name: "Rafiq", text: "Highly reliable. Books arrived in perfect condition." },
            { name: "Sadia", text: "Love the easy search and coverage map." },
          ].map((t, i) => (
            <div
              key={i}
              className="
                bg-white dark:bg-gray-700 p-6 rounded-2xl shadow
                hover:shadow-2xl hover:-translate-y-1
                transition-all duration-500
              "
            >
              <p className="text-gray-700 dark:text-gray-300">"{t.text}"</p>
              <p className="mt-4 font-semibold">- {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 md:px-24 transition-colors duration-500">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            { q: "How fast is the delivery?", a: "Typically within 24-48 hours across all districts." },
            { q: "Can I return a book?", a: "Yes, within 7 days if the book is in original condition." },
            { q: "Do you cover all districts?", a: "Yes! We have coverage in all 64 districts of Bangladesh." },
          ].map((faq, i) => (
            <div
              key={i}
              className="p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl shadow transition-colors duration-500"
            >
              <h3 className="font-semibold text-lg">{faq.q}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 px-6 md:px-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-center rounded-2xl mx-6 md:mx-24 transition-colors duration-500">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe for Updates</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Get notified about new books, offers, and events.
        </p>

        <form className="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-3 rounded-xl flex-1
              bg-white dark:bg-gray-700
              text-gray-900 dark:text-gray-200
              placeholder-gray-500 dark:placeholder-gray-400
              transition-colors duration-500
            "
          />

          <button
            className="mt-auto inline-block w-full sm:w-auto
              bg-gradient-to-r from-teal-400 to-indigo-500
              dark:from-teal-500 dark:to-indigo-600
              hover:from-indigo-500 hover:to-teal-400
              dark:hover:from-indigo-600 dark:hover:to-teal-500
              text-white px-6 py-3 rounded-xl font-semibold
              transition-all duration-500
            "
          >
            Subscribe
          </button>
        </form>
      </section>

     
    </div>
  );
};

export default HomePage;
