import ButtonCustom from "components/ButtonCustom";
import InputCustom from "components/InputCustom";
import { Model, Param, ParamValue } from "models/customElement/product/Model";
import React, { useState } from "react";

interface Props {
  params: Param[];
  model: Model;
}

export default function ParamEditorFunction({ params, model }: Props) {
  // Состояние для хранения текущей модели
  const [currentModel, setCurrentModel] = useState<Model>(model);

  // Инициализация состояния с текущими значениями параметров
  const [paramValues, setParamValues] = useState<ParamValue[]>(
    params.map((param) => {
      const existingValue = model.paramValues.find(
        (pv) => pv.paramId === param.id
      );
      return {
        paramId: param.id,
        value: existingValue?.value || "",
      };
    })
  );

  // Обработчик изменения значений параметров
  const handleInputChange = (paramId: number, value: string) => {
    setParamValues((prevState) =>
      prevState.map((pv) => (pv.paramId === paramId ? { ...pv, value } : pv))
    );
  };

  // Метод для получения актуальной модели
  const getModel = (): Model => ({
    paramValues,
    colors: model.colors,
  });

  // Обработчик кнопки "Получить модель"
  const handleGetModel = () => {
    const updatedModel = getModel();
    setCurrentModel(updatedModel);
  };

  return (
    <div>
      {params.map((param) => (
        <InputCustom
          key={param.id}
          label={param.name}
          type={param.type}
          value={paramValues.find((pv) => pv.paramId === param.id)?.value || ""}
          onChange={(e) => handleInputChange(param.id, e.target.value)}
        />
      ))}
      <ButtonCustom onClick={handleGetModel}>Получить модель</ButtonCustom>

      {/* Отображение текущей модели */}
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <h3>Текущая модель:</h3>
        <pre>{JSON.stringify(currentModel, null, 2)}</pre>
      </div>
    </div>
  );
}
