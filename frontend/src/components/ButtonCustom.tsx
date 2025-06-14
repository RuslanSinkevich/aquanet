import React, { useState } from "react";
import { LiteralUnion } from "utils/Helpers";

// Типы для ButtonCustomProps
interface IButtonCustomProps {
  /** Текст внутри кнопки */
  children: React.ReactNode;
  /** Обработчик клика */
  onClick?: () => void;
  /** Размер кнопки */
  size?: LiteralUnion<"small" | "normal" | "large", string>;
  /** Флаг неактивного состояния */
  disabled?: boolean;
  /** Стили для кнопки */
  style?: React.CSSProperties;
  /** Дополнительный класс для кнопки */
  className?: string;
  /** Тип кнопки */
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  /** Флаг опасности */
  danger?: boolean;
  /** Флаг загрузки */
  loading?: boolean;
  /** Флаг блока */
  block?: boolean;
  /** HTML-тип кнопки */
  htmlType?: 'button' | 'submit' | 'reset';
}

// Вспомогательные функции для определения стилей
function getSizePadding(size: string): string {
  switch (size) {
    case "small":
      return "6px 12px";
    case "normal":
      return "8px 16px";
    case "large":
      return "10px 20px";
    default:
      return "8px 16px"; // Значение по умолчанию
  }
}

function getSizeFontSize(size: string): string {
  switch (size) {
    case "small":
      return "12px";
    case "normal":
      return "14px";
    case "large":
      return "16px";
    default:
      return "14px"; // Значение по умолчанию
  }
}

export default function ButtonCustom({
  children,
  onClick,
  size = "normal",
  disabled = false,
  style = {},
  className,
}: IButtonCustomProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Определяем базовые стили
  const buttonStyles: React.CSSProperties = {
    padding: getSizePadding(size),
    fontSize: getSizeFontSize(size),
    border: "none",
    borderRadius: "4px",
    backgroundColor: disabled ? "#ccc" : isHovered ? "#0056b3" : "#007bff", // Изменяем цвет при hover
    color: "#fff",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color 0.3s ease", // Добавляем плавный переход
    ...style,
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={buttonStyles}
      onMouseEnter={() => !disabled && setIsHovered(true)} // При наведении
      onMouseLeave={() => setIsHovered(false)} // При убирании курсора
      className={className} // Добавляем переданный класс
    >
      {children}
    </button>
  );
}
