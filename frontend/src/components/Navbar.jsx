import React from 'react';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/login';
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a
                    className="navbar-brand"
                    href="/"
                >
                    ReZsoBa Rooms
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span
                        className="navbar-toggler-icon"
                        style={{ color: 'white' }}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >
                    <ul className="navbar-nav mr-5">
                        {user ? (
                            <>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fa fa-user"></i>
                                        {user.user.name}
                                    </button>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                    >
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="/profile"
                                            >
                                                Profil
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={logout}
                                            >
                                                Kijelentkezés
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <li className="nav-item active">
                                    <a
                                        className="nav-link"
                                        href="/register"
                                    >
                                        Regisztráció
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="/login"
                                    >
                                        Belépés
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
