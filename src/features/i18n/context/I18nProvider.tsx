import { messages } from '@/features/i18n/messages';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';

import { I18nContext } from './I18nContext';
import type { Locales } from './I18nContext';

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [locale, setLocale] = useState<Locales>('en');

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>
      <IntlProvider messages={messages[locale]} locale={locale}>
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  );
};
