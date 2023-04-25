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
      <div className={clsx("flex w-56 flex-col fixed inset-y-0 border border-primary-500 backdrop-brightness-200 backdrop-blur-3xl", className)}>
        <div className="flex flex-col flex-1 min-h-0 bg-primary-50">
          <div className="flex-shrink-0 p-4">
            <img
              className="w-auto h-8 scale-150 translate-x-4"
              src="https://res.cloudinary.com/di9zvktdc/image/upload/v1682324777/ShopZen/logo-transparent-svg_hfrjof.svg"
              alt="CRM Logo"
            />
          </div>

          <Divider />

          <div className="flex-1">
            {pages.map((page) => (
              // eslint-disable-next-line react/jsx-key
              <SidebarTab {...page} />
            ))}
          </div>

          <Divider />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
