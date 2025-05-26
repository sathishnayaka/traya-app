import { useFormContext } from 'react-hook-form';
import React from 'react';
export const Step3 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <><div>
          <h2>Payment Information</h2>
      </div><div className='form-step'>
              <div>
                  <input placeholder="Card Number" className="form-input" {...register('cardNumber')} />
                  {errors.cardNumber?.message && <p className="error">{errors.cardNumber.message as string}</p>}
              </div>
              <div>
                  <input placeholder="MM/YY" className="form-input" {...register('expiry')} />
                  {errors.expiry?.message && <p className='error'>{errors.expiry.message as string}</p>}
              </div>
              <div>
                  <input className="form-input" placeholder="CVV" {...register('cvv')} />
                  {errors.cvv && <p className="error">{errors.cvv.message as string}</p>}
              </div>
          </div></>
  );
};