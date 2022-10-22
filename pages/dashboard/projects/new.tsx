import type { NextPage } from "next";
import { server } from "../../../utils/apiConfig";
import { useState, createContext, SetStateAction, Dispatch } from "react";
import { FormContext, IProjectData } from "types";
import ProjectTextFields from "@components/Forms/ProjectTextFields/ProjectTextFormFields";
import CategoryPicker from "@components/CategoryPicker/CategoryPicker";

import styles from "@styles/Page.module.scss";

const initFormState: IProjectData = {
  title: {
    en: "Temporary",
    sr: "",
  },
  caption: {
    en: "",
    sr: "",
  },
  description: {
    en: "",
    sr: "",
  },
  area: null,
  projectDate: null,
  completionDate: null,
  categories: [],
  projectImages: [],
  heroImage: null,
};
// GET DAY.JS DATEPICKER

export const ProjectFormContext = createContext<FormContext>(null);

const NewProject: NextPage<any> = ({ existingCategories }) => {
  const [formState, setFormState] = useState(initFormState); //useModel

  console.log("categories", existingCategories);
  console.log("FORMState", formState);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const type = event.target.type;
    const key = event.target.name;
    let value;
    if (type === "date") {
      value = new Date(event.target.value);
    } else {
      value = event.target.value;
    }
    // VALIDATE DATE
    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log(JSON.stringify(formState));

    const postURL = `${server}/api/db/projects/add`; //Our previously set up route in the backend
    fetch(postURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    }).then(res => {
      console.log(res.json());
    });
  };

  ///FUTURE IMAGE COMPONENT EVENTS

  console.log(typeof formState.projectDate);
  console.log(formState.projectDate);
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.color}>Hello from NewProject</h1>
      <div>
        <ProjectFormContext.Provider value={[formState, setFormState]}>
          <form acceptCharset="UTF-8" method="POST" onSubmit={handleSubmit}>
            <fieldset>
              <legend>English Text</legend>
              <ProjectTextFields language={"en"} context={ProjectFormContext} />
            </fieldset>

            <p>{formState.title.en}</p>

            <fieldset>
              <legend>Serbian Text</legend>
              <ProjectTextFields language={"sr"} context={ProjectFormContext} />
            </fieldset>

            <p>{formState.title.sr}</p>

            <fieldset>
              <legend>Common Data</legend>
              <div>
                <label htmlFor="area">Area:</label>
                <input type="number" name="area" onChange={event => handleInput(event)} />
                <span>
                  m<sup>2</sup>
                </span>
              </div>

              <p>{formState.area}</p>

              <div>
                <label htmlFor="projectDate">Project Date:</label>
                <input type="date" name="projectDate" onChange={event => handleInput(event)} />
              </div>

              <div>
                <label htmlFor="completionDate">Completion Date:</label>
                <input type="date" name="completionDate" onChange={event => handleInput(event)} />
              </div>
            </fieldset>

            <p>{formState.projectDate?.toLocaleDateString("en-US")}</p>
            <p>{formState.completionDate?.toLocaleDateString("en-US")}</p>

            <fieldset>
              <legend>Categories</legend>
              <CategoryPicker existingCategories={existingCategories} />
            </fieldset>

            <fieldset>
              <legend>Images</legend>
            </fieldset>
            <input type="submit" value="Submit" />
          </form>
        </ProjectFormContext.Provider>
      </div>
    </div>
  );
};

export default NewProject;

export async function getServerSideProps() {
  const existingCategories: JSON = await fetch(`${server}/api/db/categories`, {
    method: "GET",
  }).then(response => response.json());

  try {
    return {
      props: {
        existingCategories,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        notFound: true,
      },
    };
  }
}
