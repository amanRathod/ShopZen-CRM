import PortalPage from "@layouts/page/PortalPage";
import { NextPage } from "next";

const asPortalPage =
  <T extends object>(title?: string) =>
  (Component: NextPage<T>): NextPage<T> => {
    const WrappedComponent = (props: T) => (
      <PortalPage title={title}>
        <Component {...props} />
      </PortalPage>
    );

    return WrappedComponent;
  };

export default asPortalPage;