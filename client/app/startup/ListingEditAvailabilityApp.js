import r from 'r-dom';
import { initialize as initializeI18n } from '../utils/i18n';
import ListingEditAvailability from '../components/sections/ListingEditAvailability/ListingEditAvailability';

export default (props) => {
  const locale = props.i18n.locale;
  const defaultLocale = props.i18n.defaultLocale;

  initializeI18n(locale, defaultLocale, process.env.NODE_ENV);

  return r(ListingEditAvailability, props);
};
