export enum BUTTON_TYPE {
  submit = "submit",
  reset = "reset",
  button = "button",
}

export type buttonType = `${BUTTON_TYPE}`;

export enum BASIC_BUTTON_VARIANT {
  text = "buttonText",
  contained = "buttonContained",
  outlined = "buttonOutlined",
}

export type buttonVariant = `${BASIC_BUTTON_VARIANT}`;
