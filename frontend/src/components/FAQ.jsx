import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Mi az a React?",
      answer:
        "A React egy JavaScript könyvtár, amit UI komponensek építésére használnak.",
    },
    {
      question: "Hogyan telepíthetem a React-et?",
      answer:
        "A React-et a `npx create-react-app` parancs segítségével telepítheted, vagy a Node.js és npm segítségével.",
    },
    {
      question: "Mi az a JSX?",
      answer:
        "A JSX egy szintaktikai kiterjesztés a JavaScript-ben, amely lehetővé teszi HTML struktúrák írását JavaScript-ben.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Gyakran Ismételt Kérdések (FAQ)</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <h3>{faq.question}</h3>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
