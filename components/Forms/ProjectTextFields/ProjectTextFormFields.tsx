import { Context, FC, useContext } from "react";
import { FormContext, languageEnum } from "types";

interface IProjectTextFieldsProps {
  language: languageEnum;
  context: Context<FormContext>; // not versatile enough
}

const ProjectTextFields: FC<IProjectTextFieldsProps> = ({ language, context }) => {
  const [contextState, setContextState] = useContext<any>(context);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setContextState({ ...contextState, [key]: { ...contextState[key], [language]: value } });
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
