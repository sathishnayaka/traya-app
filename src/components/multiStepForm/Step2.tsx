import { useFormContext } from "react-hook-form";
import React from "react";
export const Step2 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <><div>
          <h2>Address Details</h2>
      </div><div className="form-step">
              <div>
                  <input
                      placeholder="Country"
                      className="form-input"
                      {...register("country")} />
                  {errors.country?.message && (
                      <p className="error">{errors.country.message as string}</p>
                  )}
              </div>
              <div>
                  <input
                      className="form-input"
                      placeholder="City"
                      {...register("city")} />
                  {errors.city && (
                      <p className="error">{errors.city.message as string}</p>
                  )}
              </div>
              <div>
                  <input
                      placeholder="City"
                      className="form-input"
                      {...register("city")} />
                  {errors.city?.message && (
                      <p className="error">{errors.city.message as string}</p>
                  )}
              </div>
          </div></>
  );
};
