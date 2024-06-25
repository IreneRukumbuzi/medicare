export const emailRules = [
  { required: true, message: 'Please input your email!' },
  { type: 'email', message: 'The input is not a valid email!' },
];

export const passwordRules = [
  { required: true, message: 'Please input your password!' },
  { min: 6, message: 'Password must be at least 6 characters long!' },
  {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one symbol!',
  },
];

export const firstNameRules = [{ required: true, message: 'Please input your first name!' }];

export const lastNameRules = [{ required: true, message: 'Please input your last name!' }];





