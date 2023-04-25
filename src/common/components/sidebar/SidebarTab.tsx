import ConditionalWrapper from "@components/ConditionalWrapper";
import LinkedItem from "@elements/LinkedItem";
import { Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
// import { useAuth } from "@lib/auth";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useState } from "react";

import type { Page } from "./pages";

type Props = {
  className?: string;
} & Page;

const SidebarTab: React.FC<Props> = ({
  className,
  Icon,
  name,
  href,
  items = [],
}) => {
  const router = useRouter();

//   const { user } = useAuth();
  const hasItems = items.length > 0;

  const currentRoute = router.pathname;
  const isCurrentRoute = currentRoute === href;

  const hasVisibleItems = !!items.find((item) => item.href === currentRoute);

  const [itemsVisible, setItemsVisible] = useState(hasVisibleItems);


  return (
    <div className="my-1.5">
      <div className="relative">
        <div
          className={clsx(
            "absolute inset-y-0 w-1 h-full rounded-tr rounded-br",
            isCurrentRoute && "bg-success-500"
          )}
        />

        <ConditionalWrapper
          condition={!!href}
          wrapper={(children) => (
            <LinkedItem href={href!}>{children}</LinkedItem>
          )}
        >
          <div
            onClick={
              hasItems ? () => setItemsVisible(!itemsVisible) : undefined
            }
            className={clsx(
              "flex items-center p-3 pl-4 font-bold text-gray-500 hover:bg-primary-200 hover:text-secondary-600 flex-1 transition-all text-md cursor-pointer select-none",
              isCurrentRoute && "text-secondary-600",
              className
            )}
          >
            {Icon && <Icon className="w-5 h-5 mr-2" />}

            <div className="flex-1">{name}</div>

            {hasItems && (
              <ChevronRightIcon
                className={clsx(
                  "w-4 h-4 transition-transform ease-in-out",
                  itemsVisible && "rotate-90"
                )}
              />
            )}
          </div>
        </ConditionalWrapper>
      </div>

      {hasItems && (
        <Transition
          show={itemsVisible}
          enter="transition-all"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-all"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="py-1 mx-4 rounded-md bg-secondary-500">
            {items.map((item: any) => (
              // eslint-disable-next-line react/jsx-key
              <SidebarTab {...item} className="text-primary-800" />
            ))}
          </div>
        </Transition>
      )}
    </div>
  )
};

export default SidebarTab;