import { BookOpenIcon, DeviceMobileIcon, FilterIcon, HomeIcon } from "@heroicons/react/outline";

type SubPage = {
  id?: number;
  key: string;
  name: string;
  href?: string;
  Icon?: React.FC<React.ComponentProps<"svg">>;
  items?: SubPage[];
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
        id: 1,
        key: "books",
        name: "Books",
        href: "/category/books?search=1",
        Icon: BookOpenIcon,
      },
      {
        id: 2,
        key: "electronics",
        name: "ELECTRONICS",
        href: "/category/electronics?search=2",
        Icon: DeviceMobileIcon
      },
      {
        id: 3,
        key: "clothing",
        name: "CLOTHING",
        href: "/category/clothing?search=3",
      },
      {
        id: 4,
        key: "active-wear",
        name: "ACTIVEWEAR",
        href: "/category/active-wear?search=4",
      },
      {
        id: 5,
        key: "grocery",
        name: "GROCERY",
        href: "/category/grocery?search=5",
        items: [
          {
            key: "fruits",
            name: "Fruits",
            href: "/category/grocery/fruits",
          },
        ],
      },
    ],
  },
  {
    key: "about",
    name: "About",
    href: "/about",
  }
];