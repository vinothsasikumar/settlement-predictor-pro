import { PredictionRequest, PredictionResponse } from '@/types/prediction';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock prediction logic
const generateMockPrediction = (request: PredictionRequest): PredictionResponse => {
  const { amount, inputType } = request;
  
  // Mock calculation: predicted amount is 85-95% of input for IDR, 90-100% for negotiation
  const multiplier = inputType === 'idr' 
    ? 0.85 + Math.random() * 0.10  // 85-95%
    : 0.90 + Math.random() * 0.10; // 90-100%
  
  const predictedAmount = Math.round(amount * multiplier * 100) / 100;
  
  // Mock confidence: higher amounts tend to have higher confidence
  const baseConfidence = 75 + Math.random() * 20;
  const amountBonus = Math.min(amount / 100000, 10); // Up to 10% bonus for higher amounts
  const confidence = Math.min(Math.round((baseConfidence + amountBonus) * 10) / 10, 99.9);
  
  return {
    predictedAmount,
    confidence,
    inputAmount: amount,
    inputType,
    metadata: {
      modelVersion: 'mock-v1.0.0',
      timestamp: new Date().toISOString(),
      processingMode: 'mock',
    },
  };
};

export const predictAmount = async (request: PredictionRequest): Promise<PredictionResponse> => {
  // Validate input
  if (!request.amount || request.amount <= 0) {
    throw new Error('Amount must be greater than 0');
  }
  
  // Simulate network delay (800-1500ms)
  await delay(800 + Math.random() * 700);
  
  // Generate mock prediction
  const prediction = generateMockPrediction(request);
  
  return prediction;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const parseCurrencyInput = (value: string): number => {
  // Remove all non-numeric characters except decimal point
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};
