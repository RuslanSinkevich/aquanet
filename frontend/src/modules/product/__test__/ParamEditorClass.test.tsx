import { render, fireEvent, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import ParamEditorClass from "../ParamEditorClass";
import { Model, Param } from "models/customElement/product/Model";
import "@testing-library/jest-dom";

// Мокаем компоненты ButtonCustom и InputCustom
vi.mock("components/ButtonCustom", () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

vi.mock("components/InputCustom", () => ({
  __esModule: true,
  default: ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <input id={label} value={value} onChange={onChange} />
    </div>
  ),
}));

const mockParams: Param[] = [
  { id: 1, name: "Param 1", type: "string" },
  { id: 2, name: "Param 2", type: "string" },
];

const mockModel: Model = {
  paramValues: [
    { paramId: 1, value: "test1" },
    { paramId: 2, value: "test2" },
  ],
  colors: [],
};

describe("ParamEditorClass", () => {
  it("корректно отображает поля ввода", () => {
    render(<ParamEditorClass params={mockParams} model={mockModel} />);

    // Проверяем, что для каждого параметра есть поле ввода
    mockParams.forEach((param) => {
      expect(screen.getByLabelText(param.name)).toBeInTheDocument();
    });
  });

  it("обновляет значения параметров при изменении ввода", async () => {
    render(<ParamEditorClass params={mockParams} model={mockModel} />);

    // Находим и меняем значение первого поля ввода
    const input = screen.getByLabelText("Param 1") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "new value" } });

    // Проверяем, что значение было обновлено
    expect(input.value).toBe("new value");
  });

  it("корректно отображает начальные значения модели в полях ввода", () => {
    render(<ParamEditorClass params={mockParams} model={mockModel} />);

    // Проверяем, что поля ввода отображают начальные значения из модели
    expect((screen.getByLabelText("Param 1") as HTMLInputElement).value).toBe(
      "test1"
    );
    expect((screen.getByLabelText("Param 2") as HTMLInputElement).value).toBe(
      "test2"
    );
  });
});
