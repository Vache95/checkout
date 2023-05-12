

// card input text uppercase----------------------------------------------------------------------------------------------------------
export const CardNameValues = (e: React.MouseEvent<HTMLElement>) => {
  const target = e.target as HTMLInputElement;
  return target.value.toUpperCase().replace(/[^\sA-Z]/g, "");
};

// card input number----------------------------------------------------------------------------------------------------------
export const InputNumber = (e: React.FormEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  return target.value.replace(/[^0-9]/g, "");
};

// card number----------------------------------------------------------------------------------------------------------
export const DefaultRegex = (event: React.MouseEvent<HTMLElement>) => {
  const target = event.target as HTMLInputElement;
  return target.value
    .replace(/[^\d]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
    .substring(0, 19);
};

// card data----------------------------------------------------------------------------------------------------------
export const CustomMask = (event: React.MouseEvent<HTMLElement>) => {
  const target = event.target as HTMLInputElement;
  const Value: any = target.value.replace(/\D/g, "").match(/(\d{0,2})(\d{0,2})/);
  return (target.value = !Value[2] ? Value[1] : `${Value[1]} / ${Value[2]}`);
};
