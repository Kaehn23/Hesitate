import { useRouter } from 'next/router';
import en from '@locales/en/common.json';
import fr from '@locales/fr/common.json';

const messages: Record<string, Record<string, any>> = { en, fr };

export function useTranslation() {
  const { locale, defaultLocale } = useRouter();
  const localeKey = locale || defaultLocale || 'en';
  const t = (path: string): string => {
    const keys = path.split('.');
    let msg: any = messages[localeKey];
    for (const key of keys) {
      msg = msg?.[key];
      if (msg == null) return path;  // fallback to key
    }
    return msg;
  };
  return { t, locale: localeKey };
}
