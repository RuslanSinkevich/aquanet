import React, { useState } from "react";
import Link from "antd/es/typography/Link";
import { Modal } from "antd";
import LoginForm from "modules/auth/LoginForm";

export default function MenuHome() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  href="/"
                  className="btn btn-success border-0 rounded px-2 py-2 shadow-sm text-white fw-semibold transition-all hover:bg-opacity-80"
                >
                  Схема подключения
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  href="#"
                  className="btn btn-link text-white fw-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    showModal();
                  }}
                >
                  Войти
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Modal
        title="Вход"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <LoginForm onSuccess={handleCancel} />
      </Modal>
    </>
  );
}
