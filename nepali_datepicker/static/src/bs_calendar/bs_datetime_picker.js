import { DateTimePicker } from "@web/core/datetime/datetime_picker";
import { isInRange, today } from "@web/core/l10n/dates";
import { localization } from "@web/core/l10n/localization";
import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import {
    BS_MAX_YEAR,
    BS_MIN_YEAR,
    dateTimeFromBs,
    daysInBsMonth,
    getBsDate,
    getBsMonthName,
} from "./bs_calendar";
import { isBsCalendarActive } from "./bs_patches";

const { Info } = luxon;

const DAYS_PER_WEEK = 7;
const WEEKS_PER_MONTH = 6;
const GRID_COUNT = 10;
const GRID_MARGIN = 1;

/**
 * @param {luxon.DateTime} date
 */
function getStartOfWeek(date) {
    const { weekStart } = localization;
    return date.set({ weekday: date.weekday < weekStart ? weekStart - 7 : weekStart });
}

/**
 * @param {luxon.DateTime} date
 * @returns {luxon.DateTime | null} the first day of the BS month of `date`
 */
export function getBsMonthStart(date) {
    const bs = getBsDate(date);
    return bs && dateTimeFromBs(date, bs.year, bs.month, 1);
}

/**
 * First day of a BS year, or an estimate for the years out of the supported
 * range so that the year and decade grids keep their shape (their items are
 * then disabled).
 */
function getBsYearStart(reference, year) {
    return (
        dateTimeFromBs(reference, year, 1, 1) ??
        reference.set({ year: year - 57, month: 4, day: 13 }).startOf("day")
    );
}

function isSupportedBsYear(year) {
    return year >= BS_MIN_YEAR && year <= BS_MAX_YEAR;
}

function toItem({ label, range, isOutOfRange = false, isValid = true, extraClass = "" }) {
    return {
        id: range[0].toISODate(),
        includesToday: isInRange(today(), range),
        isOutOfRange,
        isValid,
        label,
        range,
        extraClass,
    };
}

/**
 * Moves `date` by `count` BS months (or years with `unit` "year"), landing on
 * the first day of the target month. Stays put out of the supported range.
 */
function moveBs(date, count, unit = "month") {
    const bs = getBsDate(date);
    if (!bs) {
        return date;
    }
    let { year, month } = bs;
    if (unit === "year") {
        year += count;
        month = 1;
    } else {
        const index = year * 12 + month - 1 + count;
        year = Math.floor(index / 12);
        month = (index % 12) + 1;
    }
    return dateTimeFromBs(date, year, month, 1) ?? date;
}

/**
 * Bikram Sambat counterparts of the precision levels of the date picker. Items
 * keep Gregorian ranges, only their grouping and labels follow the BS calendar.
 */
const BS_PRECISION_LEVELS = new Map()
    .set("days", {
        mainTitle: _t("Select month"),
        nextTitle: _t("Next month"),
        prevTitle: _t("Previous month"),
        move: (date, direction) => moveBs(date, direction),
        getTitle: (date) => {
            const bs = getBsDate(date);
            return `${getBsMonthName(date, bs.month)} ${bs.year}`;
        },
        getItems: (date, { maxDate, minDate, showWeekNumbers, isDateValid, dayCellClass }) => {
            const bs = getBsDate(date);
            const monthStart = dateTimeFromBs(date, bs.year, bs.month, 1);
            const monthRange = [
                monthStart,
                monthStart.plus({ day: daysInBsMonth(bs.year, bs.month) - 1 }).endOf("day"),
            ];
            const weeks = [];
            let day = getStartOfWeek(monthStart);
            for (let w = 0; w < WEEKS_PER_MONTH; w++) {
                const days = [];
                for (let d = 0; d < DAYS_PER_WEEK; d++) {
                    const range = [day, day.endOf("day")];
                    days.push(
                        toItem({
                            label: String(getBsDate(day)?.day ?? day.day),
                            range,
                            isOutOfRange: !isInRange(day, monthRange),
                            isValid:
                                isInRange(range, [minDate, maxDate]) &&
                                (isDateValid ? isDateValid(day) : true),
                            extraClass: dayCellClass?.(day) || "",
                        })
                    );
                    day = day.plus({ day: 1 });
                }
                weeks.push({ number: days[3].range[0].weekNumber, days });
            }
            const daysOfWeek = weeks[0].days.map(({ range: [weekDay] }) => [
                weekDay.weekdayShort,
                weekDay.weekdayLong,
                Info.weekdays("narrow", { locale: weekDay.locale })[weekDay.weekday - 1],
            ]);
            if (showWeekNumbers) {
                daysOfWeek.unshift(["", _t("Week numbers"), ""]);
            }
            return [{ id: "__month__0", number: bs.month, daysOfWeek, weeks }];
        },
    })
    .set("months", {
        mainTitle: _t("Select year"),
        nextTitle: _t("Next year"),
        prevTitle: _t("Previous year"),
        move: (date, direction) => moveBs(date, direction, "year"),
        getTitle: (date) => String(getBsDate(date).year),
        getItems: (date, { maxDate, minDate }) => {
            const { year } = getBsDate(date);
            return Array.from({ length: 12 }, (_, i) => {
                const start = dateTimeFromBs(date, year, i + 1, 1);
                const range = [
                    start,
                    start.plus({ day: daysInBsMonth(year, i + 1) - 1 }).endOf("day"),
                ];
                return toItem({
                    label: getBsMonthName(date, i + 1),
                    range,
                    isValid: isInRange(range, [minDate, maxDate]),
                });
            });
        },
    })
    .set("years", {
        mainTitle: _t("Select decade"),
        nextTitle: _t("Next decade"),
        prevTitle: _t("Previous decade"),
        move: (date, direction) => moveBs(date, direction * 10, "year"),
        getTitle: (date) => {
            const start = Math.floor(getBsDate(date).year / 10) * 10;
            return `${start - 1} - ${start + 10}`;
        },
        getItems: (date, { maxDate, minDate }) => {
            const start = Math.floor(getBsDate(date).year / 10) * 10;
            return Array.from({ length: GRID_COUNT + 2 * GRID_MARGIN }, (_, index) => {
                const i = index - GRID_MARGIN;
                const year = start + i;
                const range = [
                    getBsYearStart(date, year),
                    getBsYearStart(date, year + 1).minus({ millisecond: 1 }),
                ];
                return toItem({
                    label: String(year),
                    range,
                    isOutOfRange: i < 0 || i >= GRID_COUNT,
                    isValid: isSupportedBsYear(year) && isInRange(range, [minDate, maxDate]),
                });
            });
        },
    })
    .set("decades", {
        mainTitle: _t("Select century"),
        nextTitle: _t("Next century"),
        prevTitle: _t("Previous century"),
        move: (date, direction) => moveBs(date, direction * 100, "year"),
        getTitle: (date) => {
            const start = Math.floor(getBsDate(date).year / 100) * 100;
            return `${start - 10} - ${start + 100}`;
        },
        getItems: (date, { maxDate, minDate }) => {
            const start = Math.floor(getBsDate(date).year / 100) * 100;
            return Array.from({ length: GRID_COUNT + 2 * GRID_MARGIN }, (_, index) => {
                const i = index - GRID_MARGIN;
                const decade = start + i * 10;
                const range = [
                    getBsYearStart(date, decade),
                    getBsYearStart(date, decade + 10).minus({ millisecond: 1 }),
                ];
                return toItem({
                    label: String(decade),
                    range,
                    isOutOfRange: i < 0 || i >= GRID_COUNT,
                    isValid:
                        (isSupportedBsYear(decade) || isSupportedBsYear(decade + 9)) &&
                        isInRange(range, [minDate, maxDate]),
                });
            });
        },
    });

patch(DateTimePicker.prototype, {
    get activePrecisionLevel() {
        if (isBsCalendarActive() && getBsDate(this.state.focusDate)) {
            return BS_PRECISION_LEVELS.get(this.state.precision);
        }
        return super.activePrecisionLevel;
    },

    adjustFocus(values, focusedDateIndex, minDate = this.minDate(), maxDate = this.maxDate()) {
        if (!isBsCalendarActive() || (!this.shouldAdjustFocusDate && this.state.focusDate)) {
            return super.adjustFocus(values, focusedDateIndex, minDate, maxDate);
        }
        const dateToFocus =
            values[focusedDateIndex] || values[focusedDateIndex === 1 ? 0 : 1] || today();
        this.shouldAdjustFocusDate = false;
        this.state.focusDate = this.clamp(
            getBsMonthStart(dateToFocus) ?? dateToFocus.startOf("month"),
            minDate,
            maxDate
        );
    },

    next(ev) {
        const { move } = this.activePrecisionLevel;
        if (!move) {
            return super.next(ev);
        }
        ev.preventDefault();
        this.state.focusDate = this.clamp(move(this.state.focusDate, 1));
    },

    previous(ev) {
        const { move } = this.activePrecisionLevel;
        if (!move) {
            return super.previous(ev);
        }
        ev.preventDefault();
        this.state.focusDate = this.clamp(move(this.state.focusDate, -1));
    },
});
