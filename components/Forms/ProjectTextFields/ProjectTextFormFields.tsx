import { ProjectFormContext } from "pages/dashboard/projects/new";
import { FC, useContext, useState } from "react";

interface IProjectTextFieldsProps {
  formStateNode: string;
}

const ProjectTextFields: FC<IProjectTextFieldsProps> = ({ formStateNode }) => {
  const [formState, setFormState] = useContext<any>(ProjectFormContext);

  console.log("ChildState", formState);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setFormState({ ...formState, [formStateNode]: { [key]: value } });
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
