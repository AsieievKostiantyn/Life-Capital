import { TABLES } from '../constants/';

export type Tables = (typeof TABLES)[keyof typeof TABLES];
