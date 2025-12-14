import { PredictionResponse } from '@/types/prediction';
import { formatCurrency } from '@/services/predictionService';
import ConfidenceBadge from './ConfidenceBadge';
import { TrendingUp, ArrowRight, Info } from 'lucide-react';

interface PredictionResultProps {
  result: PredictionResponse;
}

const PredictionResult = ({ result }: PredictionResultProps) => {
  const inputLabel = result.inputType === 'idr' ? 'IDR Amount' : 'Negotiation Amount';

  return (
    <div className="animate-scale-in">
      {/* Result Card */}
      <div className="gradient-card rounded-2xl p-1 shadow-glow">
        <div className="bg-card/95 backdrop-blur-sm rounded-xl p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Prediction Result
              </h3>
              <p className="text-sm text-muted-foreground">
                AI-powered settlement estimate
              </p>
            </div>
          </div>

          {/* Main Result */}
          <div className="space-y-4">
            {/* Input Summary */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">{inputLabel}</p>
                <p className="text-lg font-semibold text-foreground">
                  {formatCurrency(result.inputAmount)}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Predicted Settlement</p>
                <p className="text-2xl font-display font-bold text-primary">
                  {formatCurrency(result.predictedAmount)}
                </p>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Model Confidence
              </span>
              <ConfidenceBadge confidence={result.confidence} />
            </div>
          </div>

          {/* Metadata */}
          {result.metadata && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Prediction Details
                </span>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <pre className="text-xs text-muted-foreground font-mono overflow-x-auto">
                  {JSON.stringify(result.metadata, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
