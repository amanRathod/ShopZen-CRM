import { GiftIcon } from "@heroicons/react/outline";
import { BookOpenIcon, DeviceMobileIcon, FilterIcon, HomeIcon, PresentationChartBarIcon, TruckIcon } from "@heroicons/react/outline";

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
        name: "Electronics",
        href: "/category/electronics?search=2",
        Icon: DeviceMobileIcon
      },
      {
        id: 3,
        key: "clothing",
        name: "Clothing",
        href: "/category/clothing?search=3",
        Icon: GiftIcon,
      },
      {
        id: 4,
        key: "active-wear",
        name: "Active Wear",
        href: "/category/active-wear?search=4",
        Icon: PresentationChartBarIcon,
      },
      {
        id: 5,
        key: "grocery",
        name: "Grocery",
        href: "/category/grocery?search=5",
        Icon: TruckIcon,
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