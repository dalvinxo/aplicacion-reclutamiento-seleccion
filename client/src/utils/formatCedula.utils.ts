export const formatCedula = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, '');
  if (onlyNumbers.length <= 3) return onlyNumbers;
  if (onlyNumbers.length <= 10)
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
  return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 10)}-${onlyNumbers.slice(10, 11)}`;
};
