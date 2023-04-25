import Divider from "@elements/Divider";
import clsx from "clsx";
import React from "react";
import { pages } from "./pages";
import SidebarTab from "./SidebarTab";

type Props = {
  className?: string;
};

const Sidebar: React.FC<Props> = ({ className }) => {
  return (
    <>
      <div className={clsx("flex w-64 flex-col fixed inset-y-0 border backdrop-brightness-200 backdrop-blur-3xl", className)}>
        <div className="flex flex-col flex-1 min-h-0 bg-primary-50">
          <div className="flex-shrink-0 p-4">
            <img
              className="w-auto h-8"
              src="https://res.cloudinary.com/di9zvktdc/image/upload/v1682324777/ShopZen/logo-transparent-svg_hfrjof.svg"
              alt="CRM Logo"
            />
          </div>

          <Divider className="!bg-primary-400" />

          <div className="flex-1">
            {pages.map((page) => (
              // eslint-disable-next-line react/jsx-key
              <SidebarTab {...page} />
            ))}
          </div>

          <Divider className="!bg-primary-400" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
