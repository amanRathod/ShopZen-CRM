import { ReactElement } from "react";
import { NextPageWithLayout } from "@appTypes/.";
import PortalPage from "@layouts/page/PortalPage";

const asPortalPage =
  <T extends object>(title?: string) =>
  (Component: NextPageWithLayout<T>): NextPageWithLayout<T> => {
    Component.getLayout = function getLayout(page: ReactElement) {
      return <PortalPage title={title}>{page}</PortalPage>;
    };

    return Component;
  };

export default asPortalPage;