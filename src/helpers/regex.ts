import { VALIDATION_MESSAGES } from '~/constans/validationMessages';

// Только русские буквы, пробелы и тире
export const ONLY_RU_LETTERS_SPACES_AND_DASHES = /^[А-ЯЁ\s-]+$/i;
// Только русские буквы, пробелы и запятые
export const ONLY_RU_LETTERS_SPACES_AND_COMMAS = /^[А-ЯЁ\s,]+$/i;
// Только русские буквы, пробелы, тире, слеши и цифры
export const ONLY_RU_LETTERS_SPACES_DASHES_AND_NUMBERS = /^[А-ЯЁ\s-/\d]+$/i;
// Только русские буквы, пробелы, тире, слеши, запятые и цифры
export const ONLY_RU_LETTERS_SPACES_DASHES_COMMAS_AND_NUMBERS = /^[А-ЯЁ\s,-/\d]+$/i;
// Только русские буквы, пробелы, тире и скобки
export const ONLY_RU_LETTERS_SPACES_DASHES_AND_BRACKETS = /^[А-ЯЁ\s-()]+$/i;
// Только русские буквы и тире
export const ONLY_RU_LETTERS_AND_DASHES = /^[А-ЯЁ-]+$/i;
// Только цифры
export const ONLY_NUMBERS = /^\d+$/;
// Только цифры и точки
export const ONLY_NUMBERS_AND_DOTS = /^\d+(\.\d+)*$/;
// Только латиница, минимум одна заглавная, одна строчная, одна цифра и один символ. Длина от 8 до 128 символов
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`~{|}])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`~{|}]{8,128}$/i;
// РФ номер телефона +7 ... ... .. ..
export const RU_PHONE_REGEX = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
// RU формат даты
export const RU_DATE_REGEX = /\d{2}.\d{2}.\d{4}/g;
// US формат даты
export const US_DATE_REGEX = /\d{4}-\d{2}-\d{2}/g;
// Обрезка HTML
export const STRIPE_HTML = /(<([^>]+)>)/ig;
// Проверка наличия в строке ссылки
export const DETECT_URL = /(https?:\/\/[^\s]+)/g;

export const REGEX_MESSAGES = {
    ONLY_RU_LETTERS_SPACES_AND_DASHES: 'Только кириллица, пробелы и тире',
    ONLY_RU_LETTERS_SPACES_AND_COMMAS: 'Только кириллица, пробелы и запятые',
    ONLY_RU_LETTERS_SPACES_DASHES_AND_NUMBERS: 'Только кириллица, пробелы, тире, слеши и цифры',
    ONLY_RU_LETTERS_SPACES_DASHES_COMMAS_AND_NUMBERS: 'Только кириллица, пробелы, тире, слеши, запятые и цифры',
    ONLY_RU_LETTERS_SPACES_DASHES_AND_BRACKETS: 'Только кириллица, пробелы, тире и скобки',
    ONLY_RU_LETTERS_AND_DASHES: 'Только кириллица и тире',
    ONLY_NUMBERS: VALIDATION_MESSAGES.ONLY_NUMBERS,
    ONLY_NUMBERS_AND_DOTS: VALIDATION_MESSAGES.ONLY_NUMBERS_AND_DOTS,
    PASSWORD_REGEX: 'Только латиница, минимум одна заглавная, одна строчная, одна цифра и один символ. Длина от 8 до 128 символов',
    RU_PHONE_REGEX: VALIDATION_MESSAGES.PHONE_INCORRECT,
    RU_DATE_REGEX: VALIDATION_MESSAGES.DATE_INCORRECT
};
