
/* 
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */


import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import { createStore } from "redux";
import eduIDApp from "./store";

const language = navigator.languages
                   ? navigator.languages[0]
                   : (navigator.language || navigator.userLanguage);

const lang_code = language.substring(0,2);
const locale = require('react-intl/locale-data/' + lang_code);
const messages = require('../i18n/l10n/' + lang_code)

addLocaleData(locale);

let store = createStore(eduIDApp);

const init_app = function (component, target) {
  let app = ( <Provider store={store}>
                <IntlProvider locale={ lang_code } messages={ messages }>
                  {component}
                </IntlProvider>
              </Provider> );

  ReactDOM.render(app, target);
};

export default init_app;
