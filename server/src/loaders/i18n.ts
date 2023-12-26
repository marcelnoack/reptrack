import express from 'express';
import i18next from 'i18next';
import i18nextBackend, { FsBackendOptions } from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';

import { defaultLanguage, Language } from '../common/i18n';

export default ({ app }: { app: express.Application }) => {
  i18next
    .use(i18nextBackend)
    .use(i18nextMiddleware.LanguageDetector)
    .init<FsBackendOptions>({
      backend: {
        loadPath: 'locales/{{lng}}/{{ns}}.json'
      },
      fallbackLng: defaultLanguage,
      preload: [Language.en, Language.de],
      saveMissing: true,
      debug: true
    });

  app.use(i18nextMiddleware.handle(i18next));
};
