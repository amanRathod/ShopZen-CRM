import { FilterIcon, HomeIcon } from "@heroicons/react/outline";

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
    Icon: FilterIcon,
    items: [
      {
        key: "t-shirt",
        name: "T-Shirt",
        href: "/category/t-shirt",
      },
      {
        key: "shirt",
        name: "Shirt",
        href: "/category/shirt",
      },
      {
        key: "pants",
        name: "Pants",
        href: "/category/pants",
      },
      {
        key: "shoes",
        name: "Shoes",
        href: "/category/shoes",
      },
      {
        key: "accessories",
        name: "Accessories",
        href: "/category/accessories",
      },
    ],
   },
    {
      key: "about",
      name: "About",
      href: "/about",
    }
 ];