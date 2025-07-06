import { useState } from 'react';
import { IntlProvider } from 'react-intl';

import { messages } from '@/features/i18n/messages';

import { I18nContext } from './I18nContext';
import type { Locales } from './I18nContext';

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const LOCALE_STORAGE_KEY = 'intl-key';

  const getInitialLocale = (): Locales => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locales;
    return stored ?? 'en';
  };

  const [locale, setLocale] = useState<Locales>(() => getInitialLocale());

  const handleLocale = (locale: Locales) => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    setLocale(locale);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleLocale }}>
      <IntlProvider
        messages={messages[locale] ?? messages['en']}
        defaultLocale="en"
        locale={locale}
      >
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  );
};
