import { HomeIcon } from "@heroicons/react/outline";

 type SubPage = {
   key: string;
   name: string;
   href?: string;
   Icon?: React.FC<React.ComponentProps<"svg">>;
 };

 export type Page = SubPage & {
   items?: SubPage[];
 };

 export const pages: Page[] = [
   {
     key: "dashboard",
     name: "Dashboard",
     href: "/",
     Icon: HomeIcon,
   },
 ];