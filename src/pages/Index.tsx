import PredictorForm from '@/components/PredictorForm';
import { TrendingUp, Shield, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                IDR Predictor
              </h1>
              <p className="text-xs text-muted-foreground">
                AI-Powered Settlement Analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-10 animate-fade-in">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Predict Final Settlement Amounts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your Initial Demand Request or Negotiation amount to receive 
            an AI-powered prediction with confidence scoring.
          </p>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: Zap,
              title: 'Instant Analysis',
              description: 'Get predictions in seconds using advanced ML models',
            },
            {
              icon: Shield,
              title: 'Confidence Scoring',
              description: 'Each prediction includes reliability assessment',
            },
            {
              icon: TrendingUp,
              title: 'Accurate Estimates',
              description: 'Based on historical settlement data patterns',
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* Predictor Card */}
        <section className="bg-card rounded-2xl border border-border shadow-lg p-6 md:p-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <PredictorForm />
        </section>

        {/* Footer Note */}
        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Currently using <span className="font-medium text-primary">Mock API</span> for predictions.
            <br />
            Connect to Vertex AI for production-grade analysis.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
