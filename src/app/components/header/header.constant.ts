import { LANGUAGE } from '@app/constants';
import { ILangDropdownOption, IHeaderNavButton } from './header.interfaces';

export const NavButtons: IHeaderNavButton[] = [
    { label: 'news' },
    { label: 'schedule' },
    { label: 'about' },
    { label: 'contact' }
];

export const LanguageOptions: ILangDropdownOption[] = [
    { label: LANGUAGE.EN.toUpperCase(), value: LANGUAGE.EN },
    { label: LANGUAGE.DE.toUpperCase(), value: LANGUAGE.DE },
    { label: LANGUAGE.UA.toUpperCase(), value: LANGUAGE.UA }
];
