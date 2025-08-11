import { toast } from "react-toastify";

const toastConfig = {
  position: "top-right" as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  limit: 1,
  style: {
    width: "18rem",
    padding: "1.2rem",
    margin: "1rem",
    borderRadius: "0.5rem",
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9rem",
    fontWeight: "500",
    boxShadow: "0 0.2rem 0.8rem rgba(0, 0, 0, 0.25)",
  },
};

export const showError = (errorMessage: string) => {
  toast.error(errorMessage, toastConfig);
};

export const showSuccess = (successMessage: string) => {
  toast.success(successMessage, toastConfig);
};

export const showWarning = (warningMessage: string) => {
  toast.warning(warningMessage, toastConfig);
};

export const showInfo = (infoMessage: string) => {
  toast.info(infoMessage, toastConfig);
};
