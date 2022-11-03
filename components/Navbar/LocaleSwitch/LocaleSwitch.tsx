import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./LocaleSwitch.module.scss";

const LocaleSwitch = () => {
  const { locales, locale, pathname, query, asPath } = useRouter();
  const nonActiveLocals = locales?.filter(l => l !== locale);

  return (
    <>
      {nonActiveLocals &&
        nonActiveLocals.map(locale => {
          return (
            <div key={locale} className={styles.switchContainer}>
              <Link href={{ pathname, query }} as={asPath} locale={locale}>
                <a>{locale}</a>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default LocaleSwitch;
