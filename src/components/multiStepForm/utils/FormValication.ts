export const validatePersonal = (data: any) => {
  const errors: any = {};
  if (!data.name || data.name.length < 2) errors.name = 'Name is required';
  if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) errors.email = 'Invalid email';
  if (!data.phone || !/^\d{10}$/.test(data.phone)) errors.phone = 'Phone number must be 10 digits';
  return errors;
};

export const validateAddress = (data: any) => {
  const errors: any = {};
  if (!data.country) errors.country = 'Country is required';
  if (!data.city) errors.city = 'City is required';
  if (!data.zip || data.zip.length < 4) errors.zip = 'Zip code is required';
  return errors;
};

export const validatePayment = (data: any) => {
  const errors: any = {};
  if (!data.cardNumber || data.cardNumber.length !== 16) errors.cardNumber = 'Card number must be 16 digits';
  if (!data.expiry) errors.expiry = 'Expiry is required';
  if (!data.cvv || data.cvv.length !== 3) errors.cvv = 'CVV must be 3 digits';
  return errors;
};