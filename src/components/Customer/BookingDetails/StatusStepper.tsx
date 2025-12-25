
import React from 'react';
import { motion } from 'framer-motion';
import { Clock4, CheckCircle2 } from 'lucide-react';

interface StatusStepperProps {
  statusSteps: {
    label: string;
    date: string;
    completed: boolean;
    current?: boolean;
  }[];
}

const StatusStepper: React.FC<StatusStepperProps> = ({ statusSteps }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-[2rem] p-6 shadow-sm border border-border/50"
    >
      <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
        <Clock4 size={20} className="text-primary" />
        Booking Status
      </h3>
      
      <div className="relative flex justify-between items-start max-w-2xl mx-auto py-2">
        {/* Horizontal Line Background */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-secondary -z-0 mx-8 md:mx-12" />
        
        {statusSteps.map((step, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
            <div 
              className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all duration-500 shadow-sm ${
                step.completed 
                ? 'bg-primary border-primary/20 text-white' 
                : step.current 
                ? 'bg-white border-primary text-primary animate-pulse' 
                : 'bg-white border-secondary text-muted-foreground'
              }`}
            >
              {step.completed ? <CheckCircle2 size={14} /> : idx + 1}
            </div>
            <div className="text-center">
              <p className={`text-[10px] font-bold uppercase tracking-tighter ${step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.label}
              </p>
              <p className="text-[8px] text-muted-foreground font-medium">{step.date}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatusStepper;
