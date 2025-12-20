// import React from "react";

// const StripepayButton = ({ orderId, amount, bookTitle, userEmail }) => {
//   const handlePayNow = async () => {
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/create-checkout-session`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ orderId, amount, bookTitle, userEmail }),
//     });
//     const data = await res.json();
//     if (data.url) window.location.href = data.url;
//     else alert("Failed to create Stripe session");
//   };

//   return (
//     <button className="btn btn-primary ml-2" onClick={handlePayNow}>
//       Pay Now
//     </button>
//   );
// };

// export default StripepayButton;
