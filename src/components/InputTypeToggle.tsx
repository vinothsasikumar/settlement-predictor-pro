import { InputType } from '@/types/prediction';
import { DollarSign, Calculator } from 'lucide-react';

interface InputTypeToggleProps {
  value: InputType;
  onChange: (type: InputType) => void;
  disabled?: boolean;
}

const InputTypeToggle = ({ value, onChange, disabled }: InputTypeToggleProps) => {
  return (
    <div className="flex gap-2 p-1 bg-muted rounded-lg">
      <button
        type="button"
        onClick={() => onChange('idr')}
        disabled={disabled}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200
          ${value === 'idr' 
            ? 'bg-card text-primary shadow-md' 
            : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <DollarSign className="w-4 h-4" />
        <span>IDR Amount</span>
      </button>
      <button
        type="button"
        onClick={() => onChange('negotiation')}
        disabled={disabled}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200
          ${value === 'negotiation' 
            ? 'bg-card text-primary shadow-md' 
            : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <Calculator className="w-4 h-4" />
        <span>Negotiation</span>
      </button>
    </div>
  );
};

export default InputTypeToggle;
