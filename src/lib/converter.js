export const jsonToFormData = (jsonObj) => {
  const formData = new FormData();
  Object.entries(jsonObj).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

export const formDataToJson = (formData) => {
  const jsonObj = {};
  for (let [key, value] of formData.entries()) {
    jsonObj[key] = value;
  }
  return jsonObj;
};
