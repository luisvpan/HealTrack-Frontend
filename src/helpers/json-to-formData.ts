export default function jsonToFormData(
  jsonObject: any,
  formData = new FormData(),
  parentKey = ""
) {
  for (let key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
      const value = jsonObject[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof Array) {
        value.forEach((item, index) => {
          jsonToFormData(item, formData, `${formKey}[${index}]`);
        });
      } else if (value instanceof Object && !(value instanceof File)) {
        jsonToFormData(value, formData, formKey);
      } else {
        formData.append(formKey, value);
      }
    }
  }
  return formData;
}
