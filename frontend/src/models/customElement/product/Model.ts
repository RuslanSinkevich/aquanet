export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Color {
  color: string;
}

export interface Param {
  id: number;
  name: string;
  type: string;
}
