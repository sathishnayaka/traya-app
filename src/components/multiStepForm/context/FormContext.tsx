import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormStepContextProps {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
}

const FormStepContext = createContext<FormStepContextProps | undefined>(undefined);

export const useFormStep = () => {
  const context = useContext(FormStepContext);
  if (!context) throw new Error('useFormStep must be used within a FormStepProvider');
  return context;
};

export const FormStepProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  return (
    <FormStepContext.Provider value={{ step, nextStep, prevStep, setStep }}>
      {children}
    </FormStepContext.Provider>
  );
}