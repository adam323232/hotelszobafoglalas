import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Hogyan tudok szállást foglalni?",
      answer:
        "A főoldalon  lévő keresőmező, illetve naptár segítségével kényelmesen kereshet szállásokat a kívánt helyszín és dátumok megadásával, majd a 'Részletek' gombal minden tudnivalót és képet láthat a szállásrol.",
    },
    {
      question: "Biztonságos az online szállásfoglalás?",
      answer:
        "Igen, munkatársaink személyesen győződtek meg arról hogy az ön adatait ne lehessen ellopni. Így ",
    },
    {
      question:
        "Mi történik, ha a foglalás után megváltoznak a terveim? Hogyan mondhatom le a foglalásomat?",
      answer:
        "Minden szállás részleteinél jelen vannak az elérhetési adatai a szállodának, telefonon és e-mailben egyaránt le lehet mondani perceken belül.",
    },

    {
      question: "Kapok visszaigazolást a foglalásról?",
      answer: "Igen, e-mailen keresztül értesítik a sikeres foglalásrol.",
    },
    {
      question: "Mi a teendő, ha a szállás nem felel meg az elvárásaimnak?",
      answer:
        "Mindent megteszünk hogy a partnereink akik az oldalunkon hírdethetnek szabványnak megfelelően működtetik a szállásait. Amennyiben ezt nem így tapasztalja kérjük hogy lépjen kapcsolatba velünk a főoldalon látható kapcsolatainkon keresztül.",
    },
    {
      question:
        "Milyen szabályok vonatkoznak háziállatokkal történő szállásfoglalásra?",
      answer:
        "Nálunk a háziállatok is vendégek, de kérjük, foglaláskor jelezze, ha velük érkezik. Kisállatbarát szobáinkban kényelmes fekhelyek és tálkák is várják őket. Egy egyszeri takarítási díjat számolunk fel, és kérjük, hogy kedvenceik felügyelet alatt legyenek a közös terekben. Bármilyen egyéb kérdés esetén forduljon hozzánk bizalommal!",
    },
    {
      question: "Milyen extra szolgáltatásaink vannak?",
      answer:
        "Az alábbi oldalon részletes ismertetőt olvashat az extra szolgáltatásainkról.",
      linkCim: "/extrak",
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
                <p>
                  {faq.answer}{" "}
                  {faq.linkCim ? <Link to={faq.linkCim}>Extrák</Link> : null}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
