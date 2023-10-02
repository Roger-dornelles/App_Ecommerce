export const CardMask = (value: string) => {
  value = value.replace(/\D/g, ''); // Permite apenas dígitos
  value = value.replace(/(\d{4})/g, '$1 '); // Coloca um espaço a cada 4 caracteres
  value = value.replace(/\.$/, ''); // Remove o ponto se estiver sobrando
  value = value.substring(0, 19); // Limita o tamanho

  return value;
};
