import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const solveInterpolation = async (data) => {
  // Show infinite loading toast
  const toastId = toast.loading(
    "Processing... (server may take a few seconds)",
  );

  try {
    const response = await API.post("/solve", data);

    // Replace loading with success
    toast.success("Interpolation complete", {
      id: toastId,
      duration: 3000, // optional (override global)
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);

    // Replace loading with error
    toast.error(error?.response?.data?.detail || "Failed to solve", {
      id: toastId,
      duration: 4000,
    });

    throw error;
  }
};
