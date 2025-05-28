import { api } from "./api";

export async function sendFormData(formData) {
  try{
    await api.post("/admin/send", {...formData});
    return true;
  } catch {
    return false;
  }
}

export async function getFormData() {
  try{
    return await api.get("/admin/get/contact-form", { withCredentials: true });
  } catch {
    return false;
  }
}

export async function updateFormData(params) {
  
}