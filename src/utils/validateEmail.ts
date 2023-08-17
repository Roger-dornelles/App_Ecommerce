const ValidateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = regex.test(email);

  if (!isEmailValid) {
    return false;
  }

  return true;
};

export default ValidateEmail;
