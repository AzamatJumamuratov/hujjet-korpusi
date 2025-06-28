import axios from "./axios";

export const fetchLoginInfo = async (body) => {
  const response = await axios.post("/auth/login/", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const fetchRegisterInfo = async (data) => {
  const response = await axios.post("/auth/register/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const fetchLogoutInfo = async () => {
  const response = await axios.post("/auth/logout/");
  return response.data;
};
