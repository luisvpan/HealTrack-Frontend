import { toast } from "react-toastify";

const useErrorToast = () => {
  const errorToast = (message: string) => {
    toast.error(message, {
      position: "top-center",
    });
  };

  return errorToast;
};

export default useErrorToast;
