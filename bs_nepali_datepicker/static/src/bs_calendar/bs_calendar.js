// Bikram Sambat month lengths cannot be computed, only looked up. These rows
// come from the tables of bikram-sambat 1.8.1 (Apache-2.0, medic/bikram-sambat)
// and nepali-date-converter 3.4.2 (MIT, subeshb1/Nepali-Date), which agree on
// every month of their common range 2000-2090 BS.
export const BS_MIN_YEAR = 1970;
const MONTH_LENGTHS = [
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1970
    [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], // 1971
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1972
    [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 1973
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1974
    [31, 31, 32, 32, 30, 31, 30, 29, 30, 29, 30, 30], // 1975
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1976
    [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 1977
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1978
    [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1979
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1980
    [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 1981
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1982
    [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1983
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1984
    [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 1985
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1986
    [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1987
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1988
    [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 1989
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1990
    [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1991
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 1992
    [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 1993
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1994
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 1995
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 1996
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1997
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1998
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1999
    [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2000
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2001
    [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2002
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2003
    [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2004
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2005
    [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2006
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2007
    [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2008
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2009
    [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2010
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2011
    [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2012
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2013
    [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2014
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2015
    [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2016
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2017
    [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2018
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2019
    [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2020
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2021
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2022
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2023
    [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2024
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2025
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2026
    [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2027
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2028
    [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], // 2029
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2030
    [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2031
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2032
    [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2033
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2034
    [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2035
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2036
    [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2037
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2038
    [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2039
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2040
    [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2041
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2042
    [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2043
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2044
    [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2045
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2046
    [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2047
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2048
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2049
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2050
    [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2051
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2052
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2053
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2054
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2055
    [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], // 2056
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2057
    [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2058
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2059
    [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2060
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2061
    [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31], // 2062
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2063
    [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2064
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2065
    [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2066
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2067
    [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2068
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2069
    [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2070
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2071
    [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2072
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2073
    [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2074
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2075
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2076
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2077
    [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2078
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2079
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2080
    [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2081
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2082
    [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2083
    [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30], // 2084
    [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30], // 2085
    [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2086
    [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30], // 2087
    [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30], // 2088
    [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2089
    [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2090
];
export const BS_MAX_YEAR = BS_MIN_YEAR + MONTH_LENGTHS.length - 1;

// 1970-01-01 BS
const EPOCH_DAY = Date.UTC(1913, 3, 13) / 86400000;

const YEAR_START_OFFSETS = [0];
for (const months of MONTH_LENGTHS) {
    YEAR_START_OFFSETS.push(YEAR_START_OFFSETS.at(-1) + months.reduce((a, b) => a + b, 0));
}

export const BS_MONTH_NAMES = {
    en: [
        "Baisakh",
        "Jestha",
        "Asar",
        "Shrawan",
        "Bhadra",
        "Asoj",
        "Kartik",
        "Mangsir",
        "Poush",
        "Magh",
        "Falgun",
        "Chaitra",
    ],
    ne: [
        "बैशाख",
        "जेठ",
        "असार",
        "साउन",
        "भदौ",
        "असोज",
        "कार्तिक",
        "मंसिर",
        "पुस",
        "माघ",
        "फागुन",
        "चैत",
    ],
};

/**
 * @param {number} year BS year
 * @param {number} month BS month, 1-12
 * @returns {number} 0 when the year is out of the supported range
 */
export function daysInBsMonth(year, month) {
    return MONTH_LENGTHS[year - BS_MIN_YEAR]?.[month - 1] ?? 0;
}

/**
 * @param {{ year: number, month: number, day: number }} gregorian
 * @returns {{ year: number, month: number, day: number } | null} null when out of range
 */
export function toBs({ year, month, day }) {
    let offset = Date.UTC(year, month - 1, day) / 86400000 - EPOCH_DAY;
    if (offset < 0 || offset >= YEAR_START_OFFSETS.at(-1)) {
        return null;
    }
    let yearIndex = 0;
    while (YEAR_START_OFFSETS[yearIndex + 1] <= offset) {
        yearIndex++;
    }
    offset -= YEAR_START_OFFSETS[yearIndex];
    const months = MONTH_LENGTHS[yearIndex];
    let monthIndex = 0;
    while (offset >= months[monthIndex]) {
        offset -= months[monthIndex];
        monthIndex++;
    }
    return { year: BS_MIN_YEAR + yearIndex, month: monthIndex + 1, day: offset + 1 };
}

/**
 * @param {number} year BS year
 * @param {number} month BS month, 1-12
 * @param {number} day BS day of month
 * @returns {{ year: number, month: number, day: number } | null} null when invalid
 */
export function fromBs(year, month, day) {
    if (month < 1 || month > 12 || day < 1 || day > daysInBsMonth(year, month)) {
        return null;
    }
    const yearIndex = year - BS_MIN_YEAR;
    let offset = YEAR_START_OFFSETS[yearIndex] + day - 1;
    for (let m = 0; m < month - 1; m++) {
        offset += MONTH_LENGTHS[yearIndex][m];
    }
    const date = new Date((EPOCH_DAY + offset) * 86400000);
    return {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
    };
}

//-----------------------------------------------------------------------------
// Luxon helpers: a DateTime always holds the Gregorian date, BS is only shown
//-----------------------------------------------------------------------------

/**
 * @param {luxon.DateTime} dateTime
 */
export function getBsDate(dateTime) {
    return dateTime.isValid ? toBs(dateTime) : null;
}

/**
 * Returns the start of the given BS day, in the zone and locale of `reference`.
 *
 * @param {luxon.DateTime} reference
 * @returns {luxon.DateTime | null}
 */
export function dateTimeFromBs(reference, year, month, day) {
    const gregorian = fromBs(year, month, day);
    return gregorian && reference.set(gregorian).startOf("day");
}

function isNepaliLocale(dateTime) {
    return /^ne\b/i.test(dateTime.locale || "");
}

// BS months have no standard abbreviations: short styles use the full name too.
export function getBsMonthName(dateTime, month) {
    return BS_MONTH_NAMES[isNepaliLocale(dateTime) ? "ne" : "en"][month - 1];
}

const luxonDigits = new Map();

/**
 * Digits that luxon's `toFormat` writes for `dateTime`: it does not always use
 * the numbering system of the locale, unlike `Intl`.
 */
function getLuxonDigits({ locale, numberingSystem }) {
    const key = `${locale}|${numberingSystem}`;
    if (!luxonDigits.has(key)) {
        const options = { zone: "utc", locale, numberingSystem };
        luxonDigits.set(
            key,
            Array.from({ length: 10 }, (_, hour) =>
                luxon.DateTime.fromObject({ hour }, options).toFormat("H")
            )
        );
    }
    return luxonDigits.get(key);
}

/**
 * Writes a number with the digits the given luxon method would use for
 * `dateTime`, so that BS parts match the Gregorian parts around them.
 *
 * @param {luxon.DateTime} dateTime
 * @param {number} value
 * @param {number} [minimumIntegerDigits=1]
 * @param {"toFormat" | "toLocaleString"} [method="toFormat"]
 */
export function formatBsNumber(dateTime, value, minimumIntegerDigits = 1, method = "toFormat") {
    if (method === "toLocaleString") {
        return new Intl.NumberFormat(dateTime.locale || undefined, {
            minimumIntegerDigits,
            useGrouping: false,
            numberingSystem: dateTime.numberingSystem || undefined,
        }).format(value);
    }
    const digits = getLuxonDigits(dateTime);
    return String(value)
        .padStart(minimumIntegerDigits, "0")
        .replace(/\d/g, (digit) => digits[digit]);
}

const DEVANAGARI_DIGITS = /[०-९]/g;

function toLatinDigits(text) {
    return text.replace(DEVANAGARI_DIGITS, (digit) => String(digit.charCodeAt(0) - 0x0966));
}

//-----------------------------------------------------------------------------
// Luxon format strings
//-----------------------------------------------------------------------------

/**
 * Splits a luxon format into literal and token parts, the way luxon reads it.
 *
 * @param {string} format
 * @returns {{ literal: boolean, value: string }[]}
 */
function tokenize(format) {
    const parts = [];
    let i = 0;
    while (i < format.length) {
        if (format[i] === "'") {
            let end = i + 1;
            let value = "";
            while (end < format.length) {
                if (format[end] === "'") {
                    if (format[end + 1] === "'") {
                        value += "'";
                        end += 2;
                        continue;
                    }
                    break;
                }
                value += format[end++];
            }
            parts.push({ literal: true, value: i + 1 === end ? "'" : value });
            i = end + 1;
        } else {
            let end = i;
            while (format[end] === format[i]) {
                end++;
            }
            const value = format.slice(i, end);
            parts.push({ literal: !/[a-z]/i.test(value), value });
            i = end;
        }
    }
    return parts;
}

const quote = (text) => `'${text.replaceAll("'", "''")}'`;

/**
 * Formats `dateTime` with a luxon format, its date tokens (year, month, day of
 * month) being written in Bikram Sambat. Other tokens keep their luxon meaning.
 *
 * @param {luxon.DateTime} dateTime
 * @param {string} format
 * @param {Object} [options] luxon `toFormat` options
 * @returns {string | null} null when the date is out of the supported range
 */
export function formatBs(dateTime, format, options) {
    const bs = getBsDate(dateTime);
    if (!bs) {
        return null;
    }
    const bsFormat = tokenize(format)
        .map(({ literal, value }) => {
            if (literal) {
                return quote(value);
            }
            const { length } = value;
            switch (value[0]) {
                case "y":
                    return quote(
                        length === 2
                            ? formatBsNumber(dateTime, bs.year % 100, 2)
                            : formatBsNumber(dateTime, bs.year, length)
                    );
                case "M":
                case "L":
                    if (length >= 3) {
                        return quote(getBsMonthName(dateTime, bs.month));
                    }
                    return quote(formatBsNumber(dateTime, bs.month, length));
                case "d":
                    return quote(formatBsNumber(dateTime, bs.day, length));
                case "D":
                    return quote(
                        formatBsDateText(dateTime, bs, length === 1 ? "numeric" : "short", "toFormat")
                    );
                default:
                    return value;
            }
        })
        .join("");
    return dateTime.toFormat(bsFormat, options);
}

/**
 * @param {luxon.DateTime} dateTime
 * @param {{ year: number, month: number, day: number }} bs
 * @param {"numeric" | "2-digit" | "short" | "long" | "narrow"} monthStyle
 * @param {"toFormat" | "toLocaleString"} method the luxon method whose digits to use
 * @param {boolean} [withYear=true]
 */
function formatBsDateText(dateTime, bs, monthStyle, method, withYear = true) {
    const number = (value, digits = 1) => formatBsNumber(dateTime, value, digits, method);
    const year = number(bs.year);
    if (monthStyle === "numeric" || monthStyle === "2-digit") {
        const monthDay = `${number(bs.month, 2)}/${number(bs.day, 2)}`;
        return withYear ? `${year}/${monthDay}` : monthDay;
    }
    const month = getBsMonthName(dateTime, bs.month);
    const day = number(bs.day);
    if (isNepaliLocale(dateTime)) {
        return withYear ? `${year} ${month} ${day}` : `${month} ${day}`;
    }
    return withYear ? `${month} ${day}, ${year}` : `${month} ${day}`;
}

const TIME_OPTION_KEYS = [
    "hour",
    "minute",
    "second",
    "fractionalSecondDigits",
    "hour12",
    "hourCycle",
    "dayPeriod",
    "timeZoneName",
];

/**
 * Bikram Sambat counterpart of luxon's `toLocaleString`, for the formats that
 * show a day of month. The year is shown when asked for, or when it is not the
 * current BS year (callers drop the year based on the Gregorian one).
 *
 * @param {luxon.DateTime} dateTime
 * @param {Intl.DateTimeFormatOptions} formatOptions
 * @param {Object} [options] luxon `toLocaleString` options
 * @returns {string | null} null when the date is out of the supported range
 */
export function toBsLocaleString(dateTime, formatOptions, options) {
    const bs = getBsDate(dateTime);
    if (!bs) {
        return null;
    }
    const todayBs = getBsDate(dateTime.constructor.local());
    const withYear = Boolean(formatOptions.year) || bs.year !== todayBs?.year;
    const parts = [];
    if (formatOptions.weekday) {
        parts.push(dateTime.toLocaleString({ weekday: formatOptions.weekday }, options));
    }
    parts.push(formatBsDateText(dateTime, bs, formatOptions.month, "toLocaleString", withYear));
    const timeOptions = {};
    for (const key of TIME_OPTION_KEYS) {
        if (key in formatOptions) {
            timeOptions[key] = formatOptions[key];
        }
    }
    if (timeOptions.hour || timeOptions.minute || timeOptions.second) {
        parts.push(dateTime.toLocaleString(timeOptions, options));
    }
    return parts.join(", ");
}

/**
 * Parses a text written in Bikram Sambat with a luxon format: the day comes from
 * the year, month and day tokens of the format, in their order, and the time from
 * what follows, read with the time tokens of the format. Like Odoo's parser it is
 * lenient: separators may differ, padding may be omitted, the year may be omitted
 * (current BS year) or written on two digits (20xx), and digits may be compact
 * ("20820810").
 *
 * @param {string} text
 * @param {string} format
 * @param {Object} [options] luxon `fromFormat` options
 * @returns {luxon.DateTime | null} null when the text is not a valid BS date
 */
export function parseBs(text, format, options = {}) {
    const { DateTime } = luxon;
    const parts = tokenize(format);
    const order = [];
    let lastDatePart = -1;
    parts.forEach(({ literal, value }, index) => {
        const unit = !literal && { y: "y", M: "M", L: "M", d: "d" }[value[0]];
        if (unit) {
            order.push(unit);
            lastDatePart = index;
        }
    });
    if (order.length !== 3) {
        return null;
    }
    const timeParts = parts.slice(lastDatePart + 1);
    const firstTimeToken = timeParts.findIndex(({ literal }) => !literal);
    const timeFormat =
        firstTimeToken < 0
            ? ""
            : timeParts
                  .slice(firstTimeToken)
                  .map(({ literal, value }) => (literal ? quote(value) : value))
                  .join("");

    const latin = toLatinDigits(text.trim());
    const groups = [...latin.matchAll(/\d+/g)];
    if (!groups.length) {
        return null;
    }
    const values = {};
    let consumed;
    const [first] = groups;
    if (first[0].length === 8 || first[0].length === 6) {
        const yearLength = first[0].length - 4;
        let cursor = 0;
        for (const unit of order) {
            const length = unit === "y" ? yearLength : 2;
            values[unit] = Number(first[0].slice(cursor, cursor + length));
            cursor += length;
        }
        if (yearLength === 2) {
            values.y += 2000;
        }
        consumed = 1;
    } else {
        const dayOrder = groups.length >= 3 ? order : order.filter((unit) => unit !== "y");
        if (groups.length < dayOrder.length) {
            return null;
        }
        dayOrder.forEach((unit, i) => {
            values[unit] = Number(groups[i][0]);
        });
        if (!("y" in values)) {
            values.y = getBsDate(DateTime.local())?.year;
        } else if (groups[dayOrder.indexOf("y")][0].length <= 2) {
            values.y += 2000;
        }
        consumed = dayOrder.length;
    }
    const gregorian = fromBs(values.y, values.M, values.d);
    if (!gregorian) {
        return null;
    }

    const lastGroup = groups[consumed - 1];
    const rest = latin.slice(lastGroup.index + lastGroup[0].length).replace(/^[\s,T]+/, "");
    let time = { hour: 0, minute: 0, second: 0 };
    if (rest) {
        if (!timeFormat) {
            return null;
        }
        const timeOptions = { locale: options.locale, numberingSystem: "latn" };
        const candidates = [timeFormat, timeFormat.replace(/[:.]ss/, ""), "H:mm:ss", "H:mm", "H"];
        const parsed = candidates
            .map((candidate) => DateTime.fromFormat(rest, candidate, timeOptions))
            .find((result) => result.isValid);
        if (!parsed) {
            return null;
        }
        time = { hour: parsed.hour, minute: parsed.minute, second: parsed.second };
    }
    const result = DateTime.fromObject(
        { ...gregorian, ...time },
        {
            zone: options.zone,
            locale: options.locale,
            numberingSystem: options.numberingSystem,
        }
    );
    return result.isValid ? result : null;
}
