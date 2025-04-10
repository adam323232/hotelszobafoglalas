import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs"; // bcryptjs importálása
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Succes";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [succes, setsuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibles, setPasswordVisibles] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");

  const togglePasswordVisibility = () => {
    const cursorPosition = document.activeElement.selectionStart;
    setPasswordVisible((prev) => !prev);
    setTimeout(
      () =>
        document.activeElement.setSelectionRange(
          cursorPosition,
          cursorPosition
        ),
      0
    );
  };
  const togglePasswordVisibilitys = () => {
    const cursorPosition = document.activeElement.selectionStart;
    setPasswordVisibles((prev) => !prev);
    setTimeout(
      () =>
        document.activeElement.setSelectionRange(
          cursorPosition,
          cursorPosition
        ),
      0
    );
  };

  async function register() {
    let valid = true;
  
    // Ellenőrzés minden mezőre
    if (!name) {
      setNameError("A név mező kitöltése kötelező!");
      valid = false;
    } else {
      setNameError("");
    }
  
    // Email ellenőrzés
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!email) {
      setEmailError("Az email mező kitöltése kötelező!");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Az email címnek @gmail.com végződésűnek kell lennie!");
      valid = false;
    } else {
      setEmailError("");
    }
  
    // Jelszó ellenőrzés
    if (!password) {
      setPasswordError("A jelszó mező kitöltése kötelező!");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("A jelszónak legalább 6 karakter hosszúnak kell lennie!");
      valid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("A jelszónak tartalmaznia kell legalább egy szimbólumot!");
      valid = false;
    } else {
      setPasswordError("");
    }
  
    if (!cpassword) {
      setCpasswordError("A jelszó megerősítése mező kitöltése kötelező!");
      valid = false;
    } else if (password !== cpassword) {
      setCpasswordError("A jelszavak nem egyeznek!");
      valid = false;
    } else {
      setCpasswordError("");
    }
  
    if (!valid) {
      return; // Ha bármelyik mező hibás, ne folytassa a regisztrációt
    }
  
    try {
      // Jelszó hash-elése bcryptjs segítségével
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = {
        name,
        email,
        password: hashedPassword, // A hash-elt jelszót küldjük el
      };
  
      setLoading(true);
      setError(null); // Reset error state before making the request
  
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setLoading(false);
        setsuccess(true);
        window.location.href = "/login";
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Hiba történt a regisztráció során.");
        setLoading(false);
      }
  
      setname("");
      setemail("");
      setpassword("");
      setcpassword("");
    } catch (error) {
      console.log(error);
      setError("Hiba történt a regisztráció során.");
      setLoading(false);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error message="Nem létezik ilyen felhasználó" />}

      <div className="row registerdiv justify-content-center mt-5">
        <div className="col-md-3 bsdiv mt-5 bs">
          {succes && <Success message="Sikeres regisztráció" />}

          <div>
            <h2 className="bh2">Regisztráció</h2>

            <input
              type="text"
              className="form-control"
              placeholder="Név"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
                setNameError(""); // Hibaüzenet törlése gépeléskor
              }}
            />
            {nameError && <small className="text-danger">{nameError}</small>}

            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
                setEmailError(""); // Hibaüzenet törlése gépeléskor
              }}
            />
            {emailError && <small className="text-danger">{emailError}</small>}

            <div className="input-container">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                placeholder="Jelszó"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                  setPasswordError(""); // Hibaüzenet törlése gépeléskor
                }}
              />
              <button
                className="toggle-password"
                onClick={togglePasswordVisibility}
                onMouseDown={(e) => e.preventDefault()}
                tabIndex="-1"
                aria-label="Jelszó megjelenítése/elrejtése"
              >
                {passwordVisible ? "🙈" : "👁️"}
              </button>
            </div>
            {passwordError && (
              <small className="text-danger">{passwordError}</small>
            )}

            <div className="input-container mt-2">
              <input
                type={passwordVisibles ? "text" : "password"}
                className="form-control"
                placeholder="Jelszó megerősítése"
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                  setCpasswordError(""); // Hibaüzenet törlése gépeléskor
                }}
              />
              <button
                className="toggle-password"
                onClick={togglePasswordVisibilitys}
                onMouseDown={(e) => e.preventDefault()}
                tabIndex="-1"
                aria-label="Jelszó megjelenítése/elrejtése"
              >
                {passwordVisibles ? "🙈" : "👁️"}
              </button>
            </div>
            {cpasswordError && (
              <small className="text-danger">{cpasswordError}</small>
            )}

            <br />
            <div className="registerbtn">
              <button
                className="btn btn-primary w-100"
                onClick={register}
                style={{
                  textAlign: "center !important",
                }}
              >
                Regisztráció{" "}
              </button>
            </div>
            <p className="p" style={{ textAlign: "center" }}>
              Ha már be vagy jelentkezve akkor: <br />
              <Link to="/login">Belepés</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
