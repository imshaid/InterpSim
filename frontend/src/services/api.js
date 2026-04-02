import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const solveInterpolation = async (data) => {
  try {
    const promise = API.post("/solve", data);

    const response = await toast.promise(promise, {
      loading: "Calculating...",
      success: "Interpolation complete",
      error: (err) => err?.response?.data?.detail || "Failed to solve",
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
