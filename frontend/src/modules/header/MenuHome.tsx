import React from "react";
import Link from "antd/es/typography/Link";

export default function MenuHome() {
  const navBarContent = (
    <div
      className="collapse navbar-collapse justify-content-between"
      id="navbarSupportedContent"
    >
      <ul className="navbar-nav ml-auto navbar-right d-flex gap-1">
        <li className="nav-item">
          <Link
            href="/function"
            className="btn btn-success border-0 rounded px-2 py-2 shadow-sm mx-2 text-white fw-semibold transition-all hover:bg-opacity-80"
          >
            Функциональный компонент
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        {navBarContent}
      </div>
    </nav>
  );
}
