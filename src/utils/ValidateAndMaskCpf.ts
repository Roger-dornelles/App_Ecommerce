const ValidateAndMaskCpf = (cpf: string) => {
  const cpfIsValid = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
  if (!cpfIsValid.test(cpf)) {
    let formattedCpf = cpf.replace(
      /^(\d{3})\D*(\d{3})\D*(\d{3})\D*(\d{2})$/g,
      '$1.$2.$3-$4',
    );
    return formattedCpf.toString();
  }
};

export default ValidateAndMaskCpf;
