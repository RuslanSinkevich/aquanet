import { LiteralUnion } from "utils/Helpers";

// Пропсы для кастомного инпута
interface InputCustomProps {
  /** Текущее значение параметра */
  value: string;
  /** Обработчик изменения значения */
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  /** Лейбл для отображения названия параметра */
  label?: string;
  /** Тип поля ввода */
  type?: LiteralUnion<"text" | "number" | "select" | "string", string>;
  /** Флаг обязательности поля */
  required?: boolean;
  /** Флаг неактивного состояния */
  disabled?: boolean;
  /** Подсказка в поле ввода */
  placeholder?: string;
  /** Стили для контейнера */
  containerStyle?: React.CSSProperties;
  /** Стили для поля ввода */
  inputStyle?: React.CSSProperties;
}

export default function InputCustom({
  value,
  onChange,
  label,
  type = "text",
  required = false,
  disabled = false,
  placeholder = "",
  containerStyle = {},
  inputStyle = {},
}: InputCustomProps) {
  return (
    <div style={{ marginBottom: "16px", ...containerStyle }}>
      {label && (
        <label style={{ display: "block", marginBottom: "4px" }}>
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        disabled={disabled}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          ...inputStyle,
        }}
      />
    </div>
  );
}
