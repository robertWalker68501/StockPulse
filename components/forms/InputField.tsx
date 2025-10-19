import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const InputField = ({
  name,
  label,
  placeholder,
  type = 'text',
  register,
  error,
  validation,
  disabled,
  value,
}: FormInputProps) => {
  return (
    <div className='space-y-2'>
      <Label
        htmlFor={name}
        className='form-label'
      >
        {label}
      </Label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        className={cn('form-input', {
          'cursor-not-allowed opacity-50': disabled,
        })}
        {...register(name, validation)}
      />
      {error && <p className='text-sm text-red-500'>{error.message}</p>}
    </div>
  );
};

export default InputField;
