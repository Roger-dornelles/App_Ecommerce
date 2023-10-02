export const MaskDate = (data: string) => {
  const regex = /^(0[1-9]|1[0-2])(\/)((2[3-9]|4[0-9])$)/;

  regex.test(data);

  data = data.replace(/\D/g, '');
  data = data.replace(/(\d{2})(\d{2})/, '$1/$2');
  return data;
};
