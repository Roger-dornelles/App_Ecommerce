const ValidatePassword = (password: string) => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{9,}$/;

  const isPasswordValid = regex.test(password);

  if (!isPasswordValid) {
    return false;
  }

  return true;
};

export default ValidatePassword;
