import React, { Component } from "react";
import ButtonCustom from "components/ButtonCustom";
import InputCustom from "components/InputCustom";
import { Model, Param, ParamValue } from "models/customElement/product/Model";

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
  currentModel: Model;
}

class ParamEditorClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Инициализация состояния
    this.state = {
      paramValues: props.params.map((param) => {
        const existingValue = props.model.paramValues.find(
          (pv) => pv.paramId === param.id
        );
        return {
          paramId: param.id,
          value: existingValue?.value || "",
        };
      }),
      currentModel: props.model,
    };
  }

  // Метод для обновления значения параметра
  handleInputChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((pv) =>
        pv.paramId === paramId ? { ...pv, value } : pv
      ),
    }));
  };

  // Метод для получения актуальной модели
  getModel = (): Model => ({
    paramValues: this.state.paramValues,
    colors: this.props.model.colors,
  });

  // Обработчик кнопки "Получить модель"
  handleGetModel = () => {
    const updatedModel = this.getModel();
    this.setState({ currentModel: updatedModel });
  };

  render() {
    const { params } = this.props;
    const { paramValues, currentModel } = this.state;

    return (
      <div>
        {/* Вывод полей ввода для каждого параметра */}
        {params.map((param) => (
          <InputCustom
            key={param.id}
            label={param.name}
            type="text" // Тип всегда 'string', поэтому используем 'text'
            value={
              paramValues.find((pv) => pv.paramId === param.id)?.value || ""
            }
            onChange={(e) => this.handleInputChange(param.id, e.target.value)}
          />
        ))}

        {/* Кнопка для получения модели */}
        <ButtonCustom onClick={this.handleGetModel}>
          Получить модель
        </ButtonCustom>

        {/* Отображение текущей модели */}
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <h3>Текущая модель:</h3>
          <pre>{JSON.stringify(currentModel, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default ParamEditorClass;
