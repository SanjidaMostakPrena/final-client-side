// import React, { useEffect } from "react";
// import { FaBookOpen, FaTruck, FaUsers, FaMapMarkedAlt } from "react-icons/fa";

// const AboutUs = () => {
  
//   return (
//     <div className="bg-gradient-to-b from-indigo-50 to-blue-50 min-h-screen">

//       {/* ===== Hero Section ===== */}
//       <section className="py-20 text-center px-6">
//         <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-6">
//           About <span className="text-teal-600">BookCourier</span>
//         </h1>
//         <p className="max-w-3xl mx-auto text-gray-600 text-lg">
//           BookCourier is a modern online book delivery platform that connects readers
//           with trusted libraries and delivers books safely to their doorstep.
//         </p>
//       </section>

//       {/* ===== Mission & Vision ===== */}
//       <section className="py-16 px-6 md:px-20">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-3xl font-bold text-indigo-900 mb-4">
//               Our Mission
//             </h2>
//             <p className="text-gray-600 leading-relaxed">
//               Our mission is to make books easily accessible for everyone.
//               We aim to support learning, knowledge sharing, and reading culture
//               by providing fast, reliable, and affordable book delivery services.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-3xl font-bold text-indigo-900 mb-4">
//               Our Vision
//             </h2>
//             <p className="text-gray-600 leading-relaxed">
//               We envision a world where books reach every corner effortlessly.
//               BookCourier wants to become the most trusted platform for book delivery
//               across cities and communities.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ===== Why We Exist ===== */}
//       <section className="py-16 bg-white px-6 md:px-20">
//         <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-12">
//           Why BookCourier?
//         </h2>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           <div className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 bg-gradient-to-br from-indigo-100 to-teal-50 text-center">
//             <FaBookOpen className="text-4xl text-indigo-600 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Wide Book Collection</h3>
//             <p className="text-gray-600">
//               Access books from multiple libraries and categories in one place.
//             </p>
//           </div>

//           <div className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 bg-gradient-to-br from-indigo-100 to-teal-50 text-center">
//             <FaTruck className="text-4xl text-teal-600 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
//             <p className="text-gray-600">
//               Quick and reliable delivery ensuring books arrive safely.
//             </p>
//           </div>

//           <div className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 bg-gradient-to-br from-indigo-100 to-teal-50 text-center">
//             <FaUsers className="text-4xl text-indigo-600 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Trusted Libraries</h3>
//             <p className="text-gray-600">
//               Verified librarians manage books to ensure authenticity.
//             </p>
//           </div>

//           <div className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 bg-gradient-to-br from-indigo-100 to-teal-50 text-center">
//             <FaMapMarkedAlt className="text-4xl text-teal-600 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
//             <p className="text-gray-600">
//               Delivery available across multiple cities and regions.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ===== Closing Section ===== */}
//       <section className="py-20 text-center px-6">
//         <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-6">
//           Read More. Learn More. Anywhere.
//         </h2>
//         <p className="max-w-2xl mx-auto text-gray-600 text-lg">
//           BookCourier is not just a delivery service — it’s a bridge between
//           knowledge and readers. Join us and experience a smarter way to get books.
//         </p>
//       </section>

//     </div>
//   );
// };

// export default AboutUs;
import React from "react";
import { FaBookOpen, FaTruck, FaUsers, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const AboutUs = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen  max-w-7xl mx-auto bg-gradient-to-b from-indigo-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">

      {/* ===== Hero Section ===== */}
      <motion.section
        className="py-20 text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 dark:text-indigo-200 mb-6">
          About <span className="text-teal-600 dark:text-teal-400">BookCourier</span>
        </h1>
        <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
          BookCourier is a modern online book delivery platform that connects readers
          with trusted libraries and delivers books safely to their doorstep.
        </p>
      </motion.section>

      {/* ===== Mission & Vision ===== */}
      <section className="py-16 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              Our mission is to make books easily accessible for everyone.
              We aim to support learning, knowledge sharing, and reading culture
              by providing fast, reliable, and affordable book delivery services.
            </p>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              We envision a world where books reach every corner effortlessly.
              BookCourier wants to become the most trusted platform for book delivery
              across cities and communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Why We Exist ===== */}
      <section className="py-16 px-6 md:px-20 bg-white dark:bg-gray-900 transition-colors duration-500">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 dark:text-indigo-200 mb-12">
          Why BookCourier?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaBookOpen />,
              title: "Wide Book Collection",
              text: "Access books from multiple libraries and categories in one place.",
              color: "text-indigo-600 dark:text-indigo-400",
            },
            {
              icon: <FaTruck />,
              title: "Fast Delivery",
              text: "Quick and reliable delivery ensuring books arrive safely.",
              color: "text-teal-600 dark:text-teal-400",
            },
            {
              icon: <FaUsers />,
              title: "Trusted Libraries",
              text: "Verified librarians manage books to ensure authenticity.",
              color: "text-indigo-600 dark:text-indigo-400",
            },
            {
              icon: <FaMapMarkedAlt />,
              title: "Wide Coverage",
              text: "Delivery available across multiple cities and regions.",
              color: "text-teal-600 dark:text-teal-400",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="
                p-6 rounded-2xl shadow-lg hover:shadow-2xl
                transition duration-500 text-center
                bg-gradient-to-br from-indigo-100 to-teal-50
                dark:from-gray-800 dark:to-gray-700
              "
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className={`text-4xl mx-auto mb-4 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <motion.section
        className="py-20 text-center px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-indigo-200 mb-6">
          Read More. Learn More. Anywhere.
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-8">
          BookCourier is not just a delivery service — it’s a bridge between
          knowledge and readers. Join us and experience a smarter way to get books.
        </p>

        {/* Gradient Button */}
        <a
          href="/books"
          className="mt-auto inline-block w-full sm:w-auto bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-indigo-500 hover:to-teal-400 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 text-lg"
        >
          Explore Books
        </a>
      </motion.section>

    </div>
  );
};

export default AboutUs;
