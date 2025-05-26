import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { FormStepProvider, useFormStep } from './context/FormContext';
import { validatePersonal, validateAddress, validatePayment } from './utils/FormValication';
import './form.css';
import { ProgressBar } from './ProgressBar';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import './form.css';
const steps = [Step1, Step2, Step3];
const validators = [validatePersonal, validateAddress, validatePayment];

const MultiStepInner = () => {
  const methods = useForm({ mode: 'onBlur' });
  const { step, nextStep, prevStep } = useFormStep();
  const StepComponent = steps[step];

  const onSubmit = async (data: any) => {
    const errors = validators[step](data);
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([key, message]) => {
        methods.setError(key as any, { type: 'manual', message: message as string });
      });
      return;
    }
    if (step < steps.length - 1) {
      nextStep();
    } else {
      alert('Form submitted successfully!');
    }
  };

  const progress = Math.round(((step) / steps.length) * 100);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="form-container">
        <h1>Mutli Step form</h1>
        <ProgressBar progress={progress} />
        <StepComponent />
        <div className="form-navigation">
          {step > 0 && <button type="button" onClick={prevStep} className="btn-secondary">Back</button>}
          <button type="submit" className="btn-primary">{step === steps.length - 1 ? 'Submit' : 'Next'}</button>
        </div>
      </form>
    </FormProvider>
  );
};

export const MultiStepForm = () => (
  <FormStepProvider>
    <MultiStepInner />
  </FormStepProvider>
);