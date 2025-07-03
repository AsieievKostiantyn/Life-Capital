import { createContext } from 'react';

import { LOCALES } from '../locales';

export type Locales = (typeof LOCALES)[keyof typeof LOCALES];

interface I18nContextType {
  locale: Locales;
  setLocale: (locale: Locales) => void;
}

export const I18nContext = createContext<I18nContextType | undefined>(
  undefined
);
