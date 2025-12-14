export type InputType = 'idr' | 'negotiation';

export interface PredictionRequest {
  inputType: InputType;
  amount: number;
}

export interface PredictionResponse {
  predictedAmount: number;
  confidence: number;
  inputAmount: number;
  inputType: InputType;
  metadata?: {
    modelVersion: string;
    timestamp: string;
    [key: string]: unknown;
  };
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export const getConfidenceLevel = (confidence: number): ConfidenceLevel => {
  if (confidence >= 90) return 'high';
  if (confidence >= 70) return 'medium';
  return 'low';
};
