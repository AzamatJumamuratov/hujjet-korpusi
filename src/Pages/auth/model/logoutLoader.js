import { fetchLogoutInfo } from "@/shared/api/auth";
import { redirect } from "react-router";

export default async function logoutLoader() {
  try {
    const data = await fetchLogoutInfo(); // POST-запрос

    localStorage.removeItem("token");
  } catch (error) {
    console.error("Ошибка при logout POST:", error);

    // const message =
    //   error.response?.data?.error ||
    //   error.response?.data?.detail ||
    //   error.message;

    // return { error: message };
  }

  return redirect("/auth/login");
}
