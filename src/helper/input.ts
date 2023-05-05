export const InputNumber = (e: React.FormEvent<HTMLInputElement>, setValues: React.Dispatch<React.SetStateAction<string>>) => {
  const newValue = e.currentTarget.value.replace(/[^0-9]/g, "");
  setValues(newValue);
};
