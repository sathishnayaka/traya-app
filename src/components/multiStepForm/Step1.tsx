import React from 'react';
import { useFormContext } from 'react-hook-form';
export const Step1 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <><div>
          <h2>Personal Information</h2>
      </div><div className="form-step">
              <div>
                  <input className="form-input" placeholder="Enter your name" {...register('name')} />
                  {errors.name && <p style={{ color: 'red' }} className="error">{errors.name.message as string}</p>}
              </div>
              <div>
                  <input className="form-input" placeholder="Phone" {...register('phone')} maxLength={10} minLength={10} />
                  {errors.phone && <p className="error">{errors.phone.message as string}</p>}
              </div>
              <div>
                  <input className="form-input" placeholder="Email" {...register('email')} />
                  {errors.email && <p className="error">{errors.email.message as string}</p>}
              </div>
          </div></>
  );
};
