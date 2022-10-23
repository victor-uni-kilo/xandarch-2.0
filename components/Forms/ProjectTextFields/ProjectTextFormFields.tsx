import { PageLayoutContext } from "@components/Layout/Layout";
import { Context, FC, useContext } from "react";
import { FormContext, localeEnum } from "types";

interface IProjectTextFieldsProps {
  context: Context<FormContext>; // not versatile enough
  language: localeEnum;
}

const ProjectTextFields: FC<IProjectTextFieldsProps> = ({ context, language }) => {
  const [contextState, setContextState] = useContext<any>(context);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setContextState({
      ...contextState,
      [key]: { ...contextState[key], [language]: value },
    });
  };

  return (
    <>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" onChange={event => handleInput(event)} />

      <label htmlFor="caption">Caption:</label>
      <textarea name="caption" onChange={event => handleInput(event)} />

      <label htmlFor="description">Description:</label>
      <textarea name="description" onChange={event => handleInput(event)} />
    </>
  );
};

export default ProjectTextFields;
