import localize from '#utils/localize.js';

export default function i18nInit() {
  game.i18n!.translations.USER["GM"] = "Doomsayer";
  game.i18n!.translations.GM = "Doomsayer";

  const prelocalizedKeys = CONFIG.BLOOD_AND_DOOM.PRELOCALIZED_KEYS;

  prelocalizedKeys.forEach((configProperty) => {
    const target: Map<string, string> = foundry.utils.getProperty(CONFIG.BLOOD_AND_DOOM, configProperty);

    target.forEach((localizationString, key) => {
      if (typeof localizationString === 'string') {
        target.set(key, localize(localizationString));
      }
    });
  });
}
