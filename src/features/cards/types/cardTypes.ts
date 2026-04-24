import type { BusinessInvestment, Investment } from '@/features/investments';
import type { PlayerLegendCardRow } from '@/features/player-legend/types';

import { CARD_TYPES } from '../constants/constants';

export type CardsRow =
  | ExpenseCardRow
  | DemandCardRow
  | EventCardRow
  | PlayerLegendCardRow
  | InvestmentCardRow
  | BigInvestmentCardRow;

export type ExpenseCardRow = {
  id: string;
  type: (typeof CARD_TYPES)['EXPENSE'] | (typeof CARD_TYPES)['BIG_EXPENSE'];
  data: ExpenseCardData;
};
type ExpenseCardData = {
  id: string;
  amountOfExpenses: number;
  description: string;
};

export type DemandCardRow = {
  id: string;
  type: (typeof CARD_TYPES)['DEMAND'];
  data: DemandCardData;
};
type DemandCardData = {
  id: string;
  title: string;
  codes: string[];
  description: string;
};

export type EventCardRow = {
  id: string;
  type: (typeof CARD_TYPES)['EVENT'];
  data: EventCardData;
};
type EventCardData = { id: string; title: string; description: string };

export type InvestmentCardRow = {
  id: string;
  type: (typeof CARD_TYPES)['INVESTMENT'];
  data: Investment;
};

export type BigInvestmentCardRow = {
  id: string;
  type: (typeof CARD_TYPES)['BIG_INVESTMENT'];
  data: BusinessInvestment;
};
