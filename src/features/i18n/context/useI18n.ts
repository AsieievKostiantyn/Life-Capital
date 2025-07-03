import { useContext } from 'react';

import { I18nContext } from './I18nContext';

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
