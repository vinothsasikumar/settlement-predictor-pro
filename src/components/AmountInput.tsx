import { InputType } from '@/types/prediction';
import { DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  inputType: InputType;
  disabled?: boolean;
  error?: string;
}

const AmountInput = ({ value, onChange, inputType, disabled, error }: AmountInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Allow only numbers and decimal point
    if (/^[0-9]*\.?[0-9]*$/.test(newValue) || newValue === '') {
      onChange(newValue);
    }
  };

  const label = inputType === 'idr' 
    ? 'Initial Demand Request Amount' 
    : 'Negotiation Amount';

  const placeholder = inputType === 'idr'
    ? 'Enter IDR amount (e.g., 50000)'
    : 'Enter negotiation amount (e.g., 45000)';

  return (
    <div className="space-y-2">
      <Label htmlFor="amount" className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <DollarSign className="w-5 h-5" />
        </div>
        <Input
          id="amount"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            pl-10 pr-4 py-6 text-lg font-medium bg-card border-2 
            focus:border-primary focus:ring-2 focus:ring-primary/20
            ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : 'border-border'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive font-medium animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default AmountInput;
