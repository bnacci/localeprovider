import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Context = React.createContext();

function trans_choice(key, replace = {}, count = 1) {
  let translation = key
    .split('.')
    .reduce((t, i) => t[i] || null, window.translations)
    .split('|');

  translation = count > 1 ? translation[1] : translation[0];

  for (var placeholder in replace) {
    translation = translation.replace(`:${placeholder}`, replace[placeholder]);
  }

  return translation;
}

// create Context.Provider : the value prop is our toolbox
export const LocaleProvider = ({ locale, children, data }) => {
  const [appLocale, setAppLocale] = useState(
    Cookies.get('appLocale') || (locale ? locale : navigator.language)
  );

  const setLocale = (lng) => {
    setAppLocale(lng);
    Cookies.set('appLocale', lng, { expires: 365 });
  };

  const t = (key, count, replace = {}) => {
    const translations = data[appLocale.replace('-', '_').toLowerCase()];

    function trans() {
      let translation = key
        .split('.')
        .reduce((t, i) => t[i] || null, translations);

      for (var placeholder in replace) {
        translation = translation.replace(
          `:${placeholder}`,
          replace[placeholder]
        );
      }

      return translation;
    }

    function trans_choice() {
      let translation = key
        .split('.')
        .reduce((t, i) => t[i] || null, translations)
        .split('|');

      translation =
        count <= 0
          ? translation[0]
          : count > 1
          ? translation[2]
          : translation[1];

      for (var placeholder in replace) {
        translation = translation.replace(
          `:${placeholder}`,
          replace[placeholder]
        );
      }

      return translation;
    }

    return count <= 0 ? trans_choice() : count ? trans_choice() : trans();
  };

  return (
    <Context.Provider
      value={{
        locale: appLocale,
        setLocale,
        t,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// a higher order component to save us the hassle of calling Context.Consumer
export function withLocale(Component) {
  return function LocalizedComponent(props) {
    return (
      <Context.Consumer>
        {(context) => {
          const locale = {
            lng: context.locale,
            setLocale: context.setLocale,
          };

          return <Component {...props} locale={locale} t={context.t} />;
        }}
      </Context.Consumer>
    );
  };
}
