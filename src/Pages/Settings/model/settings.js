import axios from "@/shared/api/axios";

// POST-запрос на /auth/register/
export const fetchChangeAccount = async (data) => {
  const response = await axios.post("/auth/change/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
