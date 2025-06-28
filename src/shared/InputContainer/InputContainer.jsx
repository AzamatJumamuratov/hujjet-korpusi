import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputContainer = ({
  labelFor = "",
  labelText = "",
  id,
  name,
  type = "text",
  placeholder = "",
  register,
  validation,
  error,
  additionalContainerClass = "",
}) => {
  return (
    <div>
      <div
        className={`flex gap-2 ${additionalContainerClass} max-[420px]:flex-col`}
      >
        <Label htmlFor={labelFor} className={"whitespace-nowrap"}>
          {labelText}
        </Label>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          {...(register ? register(name, validation) : {})}
          className={error ? "border-red-500" : ""}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputContainer;
