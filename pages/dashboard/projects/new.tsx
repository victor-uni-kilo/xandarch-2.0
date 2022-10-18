import type { NextPage } from "next";
import { server } from "../../../utils/apiConfig";
import { useState, createContext, SetStateAction, Dispatch } from "react";
import styles from "@styles/NewProject.module.scss";
import ProjectTextFields from "@components/Forms/ProjectTextFields/ProjectTextFormFields";
import { IProjectData } from "types";
import CategoryPicker from "@components/CategoryPicker/CategoryPicker";

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
};
// GET DAY.JS DATEPICKER
type FormContext = [IProjectData, Dispatch<SetStateAction<IProjectData>>] | null;

export const ProjectFormContext = createContext<FormContext>(null);

const NewProject: NextPage<any> = ({ allCategories }) => {
  const [formState, setFormState] = useState(initFormState); //useModel

  console.log("categories", allCategories);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

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

  console.log(typeof formState.projectDate);
  console.log(formState.projectDate);
  return (
    <div className={styles.pageContent}>
      <h1 className={styles.color}>Hello from NewProject</h1>
      <div>
        <ProjectFormContext.Provider value={[formState, setFormState]}>
          <form
            acceptCharset="UTF-8"
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend>English Text</legend>
              <ProjectTextFields language={"en"} />
            </fieldset>

            <p>{formState.title.en}</p>

            <fieldset>
              <legend>Serbian Text</legend>
              <ProjectTextFields language={"sr"} />
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
              <CategoryPicker allCategories={allCategories} />
            </fieldset>

            {/* <fieldset>
              <legend>Images</legend>
              <div>
                <label htmlFor="file">Image Upload:</label>
                <input type="file" name="file" onChange={event => handleFileChange(event)} />
              </div>
            </fieldset>`` */}
            <input type="submit" value="Submit" />
          </form>
        </ProjectFormContext.Provider>
      </div>
    </div>
  );
};

export default NewProject;

export async function getServerSideProps() {
  const allCategories: JSON = await fetch(`${server}/api/db/categories`, {
    method: "GET",
  }).then(response => response.json());

  try {
    return {
      props: {
        allCategories,
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
