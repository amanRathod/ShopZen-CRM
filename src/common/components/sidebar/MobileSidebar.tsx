import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import React, { Fragment } from "react";
import Sidebar from "@components/sidebar";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
};

const MobileSideBar: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 flex md:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex flex-col flex-1 w-full max-w-xs">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 pt-2">
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-transparent"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>

            <Sidebar className={clsx("flex-1 overflow-y-auto max-w-full")} />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileSideBar;
