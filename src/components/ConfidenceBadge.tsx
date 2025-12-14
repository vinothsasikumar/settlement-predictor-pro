import { getConfidenceLevel, ConfidenceLevel } from '@/types/prediction';

interface ConfidenceBadgeProps {
  confidence: number;
}

const badgeStyles: Record<ConfidenceLevel, string> = {
  high: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-destructive/10 text-destructive border-destructive/20',
};

const labelMap: Record<ConfidenceLevel, string> = {
  high: 'High Confidence',
  medium: 'Medium Confidence',
  low: 'Low Confidence',
};

const ConfidenceBadge = ({ confidence }: ConfidenceBadgeProps) => {
  const level = getConfidenceLevel(confidence);

  return (
    <div className={`
      inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold
      border ${badgeStyles[level]}
    `}>
      <span className={`
        w-2 h-2 rounded-full animate-pulse-slow
        ${level === 'high' ? 'bg-success' : level === 'medium' ? 'bg-warning' : 'bg-destructive'}
      `} />
      <span>{confidence.toFixed(1)}%</span>
      <span className="text-xs opacity-75">({labelMap[level]})</span>
    </div>
  );
};

export default ConfidenceBadge;
