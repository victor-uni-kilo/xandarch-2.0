import "../styles/globals.scss";
import type { AppProps } from "next/app";
// import { UserProvider } from "@auth0/nextjs-auth0";
import { wrapper } from "store";
import { Provider } from "react-redux";
import Layout from "../components/Layout/Layout";
import { FC } from "react";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
