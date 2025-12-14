import { useState } from 'react';
import { InputType, PredictionResponse } from '@/types/prediction';
import { predictAmount, parseCurrencyInput } from '@/services/predictionService';
import InputTypeToggle from './InputTypeToggle';
import AmountInput from './AmountInput';
import PredictionResult from './PredictionResult';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PredictorForm = () => {
  const [inputType, setInputType] = useState<InputType>('idr');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const validateInput = (): boolean => {
    const numAmount = parseCurrencyInput(amount);
    
    if (!amount.trim()) {
      setError('Please enter an amount');
      return false;
    }
    
    if (numAmount <= 0) {
      setError('Amount must be greater than 0');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInput()) return;
    
    setIsLoading(true);
    setResult(null);
    
    try {
      const numAmount = parseCurrencyInput(amount);
      const prediction = await predictAmount({
        inputType,
        amount: numAmount,
      });
      
      setResult(prediction);
      toast({
        title: 'Prediction Complete',
        description: 'Your settlement amount has been predicted successfully.',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      toast({
        title: 'Prediction Failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAmount('');
    setResult(null);
    setError('');
    setInputType('idr');
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Type Toggle */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Select Input Type
          </label>
          <InputTypeToggle
            value={inputType}
            onChange={(type) => {
              setInputType(type);
              setError('');
            }}
            disabled={isLoading}
          />
        </div>

        {/* Amount Input */}
        <AmountInput
          value={amount}
          onChange={(val) => {
            setAmount(val);
            if (error) setError('');
          }}
          inputType={inputType}
          disabled={isLoading}
          error={error}
        />

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isLoading || !amount.trim()}
            className="flex-1 py-6 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Predict Settlement
              </>
            )}
          </Button>
          
          {(result || amount) && (
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isLoading}
              className="px-4 py-6"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          )}
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="animate-fade-in text-center py-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/5 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <span className="text-sm font-medium text-primary ml-2">
              Running AI prediction model...
            </span>
          </div>
        </div>
      )}

      {/* Result */}
      {result && !isLoading && (
        <PredictionResult result={result} />
      )}
    </div>
  );
};

export default PredictorForm;
