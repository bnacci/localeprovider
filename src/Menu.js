import React from 'react';
import { withLocale } from './Providers/LocaleProvider';

const Menu = ({ locale: { lng, setLocale }, t }) => {
  const attempts = 0;

  return (
    <ul>
      <li>
        <a href="#0">Link #1</a>
      </li>
      <li>
        <a href="#0">Locale {lng}</a>
      </li>
      <br />
      <button onClick={() => setLocale('en')}>Change locale to English</button>
      <button onClick={() => setLocale('pt-BR')}>
        Change locale to Português
      </button>

      <p>{t('attempts', attempts, { attempts })}</p>
      <p>{t('hello_world')}</p>
      <p>{t('auth.login')}</p>
    </ul>
  );
};

export default withLocale(Menu);
