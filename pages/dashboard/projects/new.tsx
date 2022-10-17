import type { NextPage } from "next";
import { server } from "../../../utils/apiConfig";
import { useState, createContext, Context } from "react";
import styles from "@styles/NewProject.module.scss";
import ProjectTextFields from "@components/Forms/ProjectTextFields/ProjectTextFormFields";
import { IProjectForm, ICategories } from "types";
import CategoryPicker from "@components/CategoryPicker/CategoryPicker";

const initFormState: IProjectForm = {
  projectTextEN: {
    title: "Temporary",
    caption: "",
    description: "",
  },
  projectTextSR: {
    title: "",
    caption: "",
    description: "",
  },
  area: null,
  projectDate: null,
  completionDate: null,
  categories: {
    byService: [],
    byType: [],
    byStatus: [],
  },
};
// GET DAY.JS DATEPICKER
// export const ProjectFormContext = createContext([{}, () => {}]);
export const ProjectFormContext: any = createContext(null);

const NewProject: NextPage<any> = ({ allCategories }) => {
  console.log("categories", allCategories);

  const [formState, setFormState] = useState(initFormState); //useModel

  console.log("FORMState", formState);
  console.log("ProjectFormContext", ProjectFormContext);

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

  console.log(typeof formState.projectDate);
  console.log(formState.projectDate);
  return (
    <div className={styles.pageContent}>
      <h1 className={styles.color}>Hello from NewProject</h1>
      <div>
        <ProjectFormContext.Provider value={[formState, setFormState]}>
          <form action="/upload" method="POST" encType="multipart/form-data">
            <h2>English</h2>
            <ProjectTextFields formStateNode="projectTextEN" />
            <h2>Serbian</h2>
            <ProjectTextFields formStateNode="projectTextSR" />
            <p>{formState.projectTextEN.title}</p>
            <p>{formState.projectTextSR.title}</p>

            <h2>CommonFields</h2>

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

            <p>{formState.projectDate?.toLocaleDateString("en-US")}</p>

            <div>
              <label htmlFor="completionDate">Completion Date:</label>
              <input type="date" name="completionDate" onChange={event => handleInput(event)} />
            </div>

            <p>{formState.completionDate?.toLocaleDateString("en-US")}</p>

            <h2>Categories</h2>
            <CategoryPicker allCategories={allCategories} />

            <div>
              <label htmlFor="file">Image Upload:</label>
              <input type="file" name="file" id="file" />
            </div>

            <input type="submit" value="Submit" id="file" />
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
