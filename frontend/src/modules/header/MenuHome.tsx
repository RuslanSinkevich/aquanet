import React, { useState } from "react";
import Link from "antd/es/typography/Link";
import { Button, Modal } from "antd";
import { useAppSelector, useAppDispatch } from "hooks/Redux";
import { logout } from "store/slice/AuthSlice";
import LoginForm from "modules/auth/LoginForm";
import { RegisterForm } from "modules/auth/RegisterForm";
import { UserRole } from "../../common/enums/user-role.enum";

export default function MenuHome() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [isModalLoginForm, setIsModalLoginForm] = useState(false);
  const [isShowRegisterModal, setIsShowRegisterModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const isAdmin = user?.role === UserRole.ADMIN;

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
            <span className="navbar-toggler-icon" />
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
              {!user ? (
                <>
                  <li className="nav-item">
                    <a
                      href="#"
                      className="btn btn-link text-white fw-semibold"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsModalLoginForm(true);
                      }}
                    >
                      Войти
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#"
                      className="btn btn-link text-white fw-semibold"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsShowRegisterModal(true);
                      }}
                    >
                      Регистрация
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item d-flex align-items-center">
                  <span className="text-white fw-semibold me-3">
                    Привет, {user.firstName} {user.lastName}!
                    {isAdmin && (
                      <span className="ms-2 badge bg-danger">Админ</span>
                    )}
                  </span>
                  <Button
                    type="link"
                    className="text-white fw-semibold"
                    onClick={handleLogout}
                  >
                    Выйти
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Модалки для незалогиненных */}
      {!user && (
        <>
          <LoginForm
            setIsShowModal={setIsModalLoginForm}
            isShowModal={isModalLoginForm}
          />
          <Modal
            title="Регистрация"
            open={isShowRegisterModal}
            onCancel={() => setIsShowRegisterModal(false)}
            footer={null}
          >
            <RegisterForm onSuccess={() => setIsShowRegisterModal(false)} />
          </Modal>
        </>
      )}
    </>
  );
}
