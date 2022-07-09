import React from 'react';
import { LocaleProvider } from './Providers/LocaleProvider';
import Menu from './Menu';

import en from './locales/en.json';
import pt_br from './locales/pt_br.json';

export default function App() {
  return (
    <LocaleProvider data={{ en, pt_br }}>
      <Menu />
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </LocaleProvider>
  );
}
