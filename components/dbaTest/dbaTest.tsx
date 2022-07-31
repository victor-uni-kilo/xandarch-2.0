import { GetServerSideProps } from "next";
import { FC } from "react";
import { connectToDatabase } from "../../services/mongo-connection";

export const getServerSideProps: GetServerSideProps = async context => {
  await connectToDatabase();
  try {
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

interface IDBTestProps {
  isConnected: boolean;
}

const DBTest: FC<IDBTestProps> = ({ isConnected }) => {
  return (
    <>
      {isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="subtitle">
          You are NOT connected to MongoDB. Check the <code>README.md</code> for instructions.
        </h2>
      )}
    </>
  );
};

export default DBTest;
