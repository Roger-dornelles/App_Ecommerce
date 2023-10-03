export const ValidateName = (name: string) => {
  let regex = /^[A-zÀ-ú '´]+$/;

  let isValid = name.match(regex);

  if (isValid == null) {
    return false;
  } else {
    return true;
  }
};
