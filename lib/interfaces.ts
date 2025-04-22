export type CreditCardProps = {
  id: string;
  balance: number;
  cardHolder: string;
  valid: string;
  cardNumber: string;
  type: string;
};

export type IWeeklyData = {
  name: string;
  deposit: number;
  withdraw: number;
};

export type IBalanceData = {
  name: string;
  value: number;
  color: string;
};

export type ITransaction = {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: string;
  source: string;
};

export type IPerson = {
  name: string;
  title: string;
  image: string;
};

export type IExpense = {
  name: string;
  value: number;
  color: string;
};

export type ProfileFormValues = {
  profileImage: string;
  name: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth: Date | null;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
};

export type DatePickerProps = {
  htmlFor: string;
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
};
