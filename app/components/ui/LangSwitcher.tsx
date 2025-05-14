"use client";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locales = ['fr', 'en','JP'];
  const activeLocale = pathname.split('/')[1] || 'fr';

  return (
    <div>
      {locales.map((loc) => (
        <Link
          key={loc}
          href={`/${loc}${pathname}`}
          className={loc === activeLocale ? 'underline' : ''}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
