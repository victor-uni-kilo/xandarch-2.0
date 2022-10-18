import { ProjectFormContext } from "pages/dashboard/projects/new";
import { FC, useContext } from "react";
import { languageEnum } from "types";

interface IProjectTextFieldsProps {
  language: languageEnum;
}

const ProjectTextFields: FC<IProjectTextFieldsProps> = ({ language }) => {
  const [formState, setFormState] = useContext<any>(ProjectFormContext);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setFormState({ ...formState, [key]: { ...formState[key], [language]: value } });
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
