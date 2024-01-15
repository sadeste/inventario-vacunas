import { FormInputLabel, Input, Group } from "./form-input.styles";

const FormInput = ({ label, className, ...otherProps }) => {
  return (
    <Group className={className}>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
