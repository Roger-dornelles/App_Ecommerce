const useValidateName = (name: string) => {
  if (name) {
    let regex = /^[a-záàâãéèêíïóôõöúçñ]+$/i;

    let isNameValidate = name
      .trim()
      .split(/ +/)
      .every(parte => regex.test(parte));
    return isNameValidate;
  }
};

export default useValidateName;
