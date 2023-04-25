import asPortalPage from "@hoc/asPortalPage";
import { NextPage } from "next";

const Home: NextPage = () => {
  return <>Hello this is your Dashboard</>;
};

export default asPortalPage("Home Page")(Home);
