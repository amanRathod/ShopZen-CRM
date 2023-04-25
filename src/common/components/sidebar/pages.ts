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
     key: "home",
     name: "Home",
     href: "/",
     Icon: HomeIcon,
   },
   {
    key: "category",
    name: "Category",
    href: "/category",
   },
    {
      key: "contact",
      name: "Contact",
      href: "/contact",
    }
 ];