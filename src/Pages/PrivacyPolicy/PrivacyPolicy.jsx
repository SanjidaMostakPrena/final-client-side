// import React from "react";

// const PrivacyPolicy = () => {
//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

//         {/* ===== Header ===== */}
//         <header className="text-center mb-14 sm:mb-20">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">
//             Privacy Policy
//           </h1>
//           <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
//             Last updated: January 2026
//           </p>
//         </header>

//         {/* ===== Content ===== */}
//         <section className="space-y-10 sm:space-y-14">

//           {/* Section */}
//           {[
//             {
//               title: "Introduction",
//               content:
//                 "BookCourier values your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard information when you use our platform.",
//             },
//             {
//               title: "Information We Collect",
//               content: (
//                 <ul className="list-disc pl-5 space-y-2">
//                   <li>Name, email address, and phone number</li>
//                   <li>Delivery address and order details</li>
//                   <li>Login and authentication information</li>
//                   <li>Usage data for platform improvement</li>
//                 </ul>
//               ),
//             },
//             {
//               title: "How We Use Your Information",
//               content:
//                 "We use your information to process book orders, ensure timely delivery, provide customer support, improve services, and maintain platform security.",
//             },
//             {
//               title: "Data Sharing",
//               content:
//                 "BookCourier does not sell personal information. Data is shared only with trusted partners strictly for order fulfillment and essential operations.",
//             },
//             {
//               title: "Data Security",
//               content:
//                 "We use industry-standard security practices to protect your information against unauthorized access, loss, or misuse.",
//             },
//             {
//               title: "Cookies & Tracking",
//               content:
//                 "Cookies help enhance your experience and analyze traffic. You may manage cookie preferences through your browser settings.",
//             },
//             {
//               title: "Your Rights",
//               content:
//                 "You can access, update, or request deletion of your personal data by contacting our support team.",
//             },
//             {
//               title: "Policy Updates",
//               content:
//                 "This Privacy Policy may be updated periodically. Changes will be reflected on this page with an updated date.",
//             },
//             {
//               title: "Contact Us",
//               content: (
//                 <p>
//                   For any privacy-related concerns, contact us at: <br />
//                   <span className="font-medium text-indigo-700 dark:text-indigo-400">
//                     support@bookcourier.com
//                   </span>
//                 </p>
//               ),
//             },
//           ].map((section, index) => (
//             <div key={index}>
//               <h2 className="text-xl sm:text-2xl font-semibold text-indigo-900 dark:text-indigo-200 mb-3">
//                 {index + 1}. {section.title}
//               </h2>
//               <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
//                 {section.content}
//               </div>
//             </div>
//           ))}

//         </section>
//       </div>
//     </div>
//   );
// };

// export default PrivacyPolicy;
import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Introduction",
      content:
        "BookCourier values your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard information when you use our platform.",
    },
    {
      title: "Information We Collect",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Name, email address, and phone number</li>
          <li>Delivery address and order details</li>
          <li>Login and authentication information</li>
          <li>Usage data for platform improvement</li>
        </ul>
      ),
    },
    {
      title: "How We Use Your Information",
      content:
        "We use your information to process book orders, ensure timely delivery, provide customer support, improve services, and maintain platform security.",
    },
    {
      title: "Data Sharing",
      content:
        "BookCourier does not sell personal information. Data is shared only with trusted partners strictly for order fulfillment and essential operations.",
    },
    {
      title: "Data Security",
      content:
        "We use industry-standard security practices to protect your information against unauthorized access, loss, or misuse.",
    },
    {
      title: "Cookies & Tracking",
      content:
        "Cookies help enhance your experience and analyze traffic. You may manage cookie preferences through your browser settings.",
    },
    {
      title: "Your Rights",
      content:
        "You can access, update, or request deletion of your personal data by contacting our support team.",
    },
    {
      title: "Policy Updates",
      content:
        "This Privacy Policy may be updated periodically. Changes will be reflected on this page with an updated date.",
    },
    {
      title: "Contact Us",
      content: (
        <p>
          For any privacy-related concerns, contact us at: <br />
          <span className="font-medium text-indigo-700 dark:text-indigo-400">
            support@bookcourier.com
          </span>
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-white dark:bg-gray-950 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* ===== Header ===== */}
        <motion.header
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Last updated: January 2026
          </p>
        </motion.header>

        {/* ===== Content ===== */}
        <section className="space-y-10 sm:space-y-14">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-indigo-50 via-white to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-indigo-900 dark:text-indigo-200 mb-3">
                {index + 1}. {section.title}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {section.content}
              </div>
            </motion.div>
          ))}
        </section>
      </div>

      {/* ===== Fixed Contact Button ===== */}
      
    </div>
  );
};

export default PrivacyPolicy;
