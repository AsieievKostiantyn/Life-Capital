import type { CardTypes } from '@/shared/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CardsRow<T = any> = {
  id: string;
  type: CardTypes;
  data: T;
};

export type ExpenseCard = {
  id: string;
  amountOfExpenses: number;
  description: string;
};
