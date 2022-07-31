//import connectToDatabase from "../services/mongo-connection";
import { useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/projectHandler");
    const projects = await response.json();
    console.log("Projects:");
    console.log(projects);
    setProjects(projects);
    console.log(projects);
  };

  return (
    <div>
      <h1>Projects</h1>
      <button onClick={fetchData}>Show Data</button>
      {projects.map(item => {
        return (
          <>
            <h1 key={item._id}>{item.title}</h1>
            <p>{item.description}</p>
          </>
        );
      })}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { db } = await connectToDatabase();
//   const data = db.collection("listingsAndReviews").find({}).limit(20).toArray();
//   const dataParsed = JSON.parse(JSON.stringify(data));
//
//   return {
//     props: { projects: dataParsed },
//   };
// }
