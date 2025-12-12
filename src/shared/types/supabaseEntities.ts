import { CARD_TYPES, TABLES } from '../constants/';

export type Tables = (typeof TABLES)[keyof typeof TABLES];

export type CardTypes = (typeof CARD_TYPES)[keyof typeof CARD_TYPES];
