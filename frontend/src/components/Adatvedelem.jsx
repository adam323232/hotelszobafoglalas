import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Adatvédelmi Nyilatkozat</h1>

      <p>
        Üdvözöljük weboldalunk adatvédelmi nyilatkozatán! Az Ön adatainak
        védelme számunkra kiemelten fontos. Ez az adatvédelmi nyilatkozat
        tisztázza, hogy milyen személyes adatokat gyűjtünk, hogyan használjuk
        fel azokat, és milyen jogai vannak Önnek az adatai kezelésével
        kapcsolatban.
      </p>

      <section>
        <h2>1. Milyen adatokat gyűjtünk?</h2>
        <p>Weboldalunk használata során az alábbi adatokat gyűjthetjük:</p>
        <ul>
          <li>
            <strong>Kapcsolattartási adatok:</strong> E-mail cím, név,
            telefonszám, ha kapcsolatba lép velünk.
          </li>
          <li>
            <strong>Használati adatok:</strong> Az oldal látogatottsága,
            kattintási adatok, IP címek, böngésző típusok.
          </li>
          <li>
            <strong>Cookie-k:</strong> Az oldal működésének javítása érdekében
            használunk cookie-kat.
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Hogyan használjuk fel az Ön adatait?</h2>
        <p>Az Ön által megadott adatokat az alábbi célokra használjuk fel:</p>
        <ul>
          <li>
            <strong>Szolgáltatásaink nyújtása:</strong> Kapcsolatba léphetünk
            Önnel ügyfélszolgálati kérdésekben.
          </li>
          <li>
            <strong>Weboldal fejlesztése:</strong> Az Ön használati adataink
            segítenek javítani weboldalunkat és felhasználói élményét.
          </li>
          <li>
            <strong>Marketing célok:</strong> Ha engedélyezi, értesítéseket
            küldhetünk Önnek termékeinkről vagy szolgáltatásainkról.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Hogyan védjük az Ön adatait?</h2>
        <p>
          Az Ön adatainak biztonsága rendkívül fontos számunkra. Az alábbi
          intézkedéseket alkalmazzuk:
        </p>
        <ul>
          <li>
            <strong>Titkosítás:</strong> Az Ön adatainak védelme érdekében
            titkosítást használunk a kommunikáció során.
          </li>
          <li>
            <strong>Hozzáférési korlátozás:</strong> Csak azok a munkatársak
            férhetnek hozzá az adatokhoz, akiknek szükségük van rá a feladatuk
            elvégzéséhez.
          </li>
          <li>
            <strong>Rendszeres biztonsági mentések:</strong> Rendszeresen
            végzünk biztonsági mentéseket az adatok megőrzésére.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Milyen jogai vannak Önnek?</h2>
        <p>
          Az Ön személyes adatai felett teljes mértékben rendelkezik. Az alábbi
          jogokkal élhet:
        </p>
        <ul>
          <li>
            <strong>Hozzáférés joga:</strong> Bármikor kérheti, hogy
            tájékoztassuk az Ön adatainak felhasználásáról.
          </li>
          <li>
            <strong>Helyesbítés joga:</strong> Ha úgy érzi, hogy személyes
            adatai nem pontosak, kérheti azok módosítását.
          </li>
          <li>
            <strong>Törlés joga:</strong> Kérheti, hogy töröljük adatait, ha
            azok már nem szükségesek számunkra.
          </li>
          <li>
            <strong>Adatkezelés korlátozása:</strong> Korlátozhatja az adatok
            feldolgozását bizonyos körülmények között.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Hogyan léphet velünk kapcsolatba?</h2>
        <p>
          Ha bármilyen kérdése van az adatvédelmi irányelveinkkel kapcsolatban,
          vagy szeretne élni a jogaival, kérjük, lépjen velünk kapcsolatba az
          alábbi elérhetőségek egyikén:
        </p>
        <ul>
          <li>
            <strong>E-mail:</strong> privacy@weboldal.hu
          </li>
          <li>
            <strong>Telefon:</strong> +36 1 234 5678
          </li>
        </ul>
      </section>

      <footer>
        <p>© 2025 Weboldal neve. Minden jog fenntartva.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
