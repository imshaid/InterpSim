import toast from "react-hot-toast";

export const showSuccess = (msg) =>
  toast.success(msg, {
    style: {
      background: "#333333",
      color: "#f9fafb",
    },
  });

export const showError = (msg) =>
  toast.error(msg, {
    style: {
      background: "#333333",
      color: "#f9fafb",
    },
  });

export const showInfo = (msg) =>
  toast(msg, {
    style: {
      background: "#333333",
      color: "#f9fafb",
    },
  });
