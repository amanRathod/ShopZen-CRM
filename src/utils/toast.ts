import Swal from "sweetalert2";

import { SwalIcon } from "./alert";

type Props = {
  title: string;
  icon?: any;
};

const showToast = ({ title, icon }: Props) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({ icon, title });
};

export const showSuccessToast = (title: string) => {
  showToast({ title, icon: SwalIcon.Success });
};

export const showErrorToast = (title: string) => {
  showToast({ title, icon: SwalIcon.Error });
};

export const showWarningToast = (title: string) => {
  showToast({ title, icon: SwalIcon.Warning });
};

export const showInfoToast = (title: string) => {
  showToast({ title, icon: SwalIcon.Info });
};

export const showQuestionToast = (title: string) => {
  showToast({ title, icon: SwalIcon.Question });
};
