import { describe, expect, mockDate, test } from "@odoo/hoot";
import {
    clickSave,
    contains,
    defineModels,
    fields,
    models,
    mountView,
    onRpc,
    patchWithCleanup,
    webModels,
} from "@web/../tests/web_test_helpers";
import { localization } from "@web/core/l10n/localization";
import { session } from "@web/session";
import {
    BS_MAX_YEAR,
    BS_MIN_YEAR,
    daysInBsMonth,
    formatBs,
    fromBs,
    parseBs,
    toBs,
    toBsLocaleString,
} from "@nepali_datepicker/bs_calendar/bs_calendar";
import { BS_FORMAT_MARKER } from "@nepali_datepicker/bs_calendar/bs_patches";

const { DateTime } = luxon;

describe("conversion", () => {
    test("known new year days", () => {
        expect(fromBs(2082, 1, 1)).toEqual({ year: 2025, month: 4, day: 14 });
        expect(fromBs(2081, 1, 1)).toEqual({ year: 2024, month: 4, day: 13 });
        expect(fromBs(2080, 1, 1)).toEqual({ year: 2023, month: 4, day: 14 });
        expect(fromBs(2000, 1, 1)).toEqual({ year: 1943, month: 4, day: 14 });
        expect(toBs({ year: 2025, month: 11, day: 26 })).toEqual({ year: 2082, month: 8, day: 10 });
    });

    test("round trip on every day of the supported range", () => {
        let mismatches = 0;
        let previous = null;
        for (let year = BS_MIN_YEAR; year <= BS_MAX_YEAR; year++) {
            for (let month = 1; month <= 12; month++) {
                for (let day = 1; day <= daysInBsMonth(year, month); day++) {
                    const gregorian = fromBs(year, month, day);
                    const current = Date.UTC(gregorian.year, gregorian.month - 1, gregorian.day);
                    const back = toBs(gregorian);
                    if (
                        back.year !== year ||
                        back.month !== month ||
                        back.day !== day ||
                        (previous !== null && current - previous !== 86400000)
                    ) {
                        mismatches++;
                    }
                    previous = current;
                }
            }
        }
        expect(mismatches).toBe(0);
    });

    test("out of range and invalid dates", () => {
        expect(toBs({ year: 1913, month: 4, day: 12 })).toBe(null);
        expect(toBs({ year: 1913, month: 4, day: 13 })).toEqual({ year: 1970, month: 1, day: 1 });
        expect(fromBs(2082, 8, 30)).toBe(null); // Mangsir 2082 has 29 days
        expect(fromBs(2082, 13, 1)).toBe(null);
        expect(fromBs(BS_MAX_YEAR + 1, 1, 1)).toBe(null);
    });
});

describe("formatting", () => {
    test("date tokens are written in BS, the others are kept", () => {
        const date = DateTime.fromISO("2025-11-26T14:05:09", { locale: "en-US" });
        expect(formatBs(date, "yyyy-MM-dd")).toBe("2082-08-10");
        expect(formatBs(date, "d MMMM yyyy, HH:mm:ss")).toBe("10 Mangsir 2082, 14:05:09");
        expect(formatBs(date, "MMM d (EEE) 'yyyy'")).toBe("Mangsir 10 (Wed) yyyy");
    });

    test("Nepali locale uses Nepali month names, and the digits of its numbering system", () => {
        const date = DateTime.fromISO("2025-11-26", { locale: "ne-NP" });
        expect(formatBs(date, "d MMMM yyyy")).toBe("10 मंसिर 2082");
        // BS digits are those luxon writes for the Gregorian parts around them
        const devanagari = date.reconfigure({ numberingSystem: "deva" });
        const time = devanagari.toFormat("HH:mm");
        expect(formatBs(devanagari, "d MMMM HH:mm")).toBe(
            `${devanagari.set({ hour: 10 }).toFormat("HH")} मंसिर ${time}`
        );
        expect(toBsLocaleString(devanagari, { year: "numeric", month: "long", day: "numeric" })).toBe(
            "२०८२ मंसिर १०"
        );
    });

    test("locale strings", () => {
        mockDate("2025-12-01 10:00:00");
        const date = DateTime.fromISO("2025-11-26T14:05:00", { locale: "en-US" });
        expect(toBsLocaleString(date, DateTime.DATE_MED)).toBe("Mangsir 10, 2082");
        expect(toBsLocaleString(date, { month: "short", day: "numeric" })).toBe("Mangsir 10");
        expect(toBsLocaleString(date, { month: "long", day: "numeric", hour: "numeric", minute: "2-digit" })).toBe("Mangsir 10, 2:05 PM");
        // Gregorian year 2025 in both, but Magh 2081 is not the current BS year
        const lastYear = DateTime.fromISO("2025-02-01", { locale: "en-US" });
        expect(toBsLocaleString(lastYear, { month: "short", day: "numeric" })).toBe("Magh 19, 2081");
    });
});

describe("parsing", () => {
    test("lenient BS input", () => {
        const parse = (text, format = "yyyy-MM-dd") => parseBs(text, format)?.toISO({ includeOffset: false });
        expect(parse("2082-08-10")).toBe("2025-11-26T00:00:00.000");
        expect(parse("2082/8/10")).toBe("2025-11-26T00:00:00.000");
        expect(parse("20820810")).toBe("2025-11-26T00:00:00.000");
        expect(parse("82-08-10")).toBe("2025-11-26T00:00:00.000");
        expect(parse("२०८२-०८-१०")).toBe("2025-11-26T00:00:00.000");
        expect(parse("2082-08-10 14:30", "yyyy-MM-dd HH:mm:ss")).toBe("2025-11-26T14:30:00.000");
        expect(parse("2082-08-10 02:30:15 PM", "yyyy-MM-dd hh:mm:ss a")).toBe("2025-11-26T14:30:15.000");
    });

    test("missing year means the current BS year", () => {
        mockDate("2025-12-01 10:00:00");
        expect(parseBs("08-10", "yyyy-MM-dd").toISODate()).toBe("2025-11-26");
    });

    test("rejects what is not a BS date", () => {
        expect(parseBs("2082-08-30", "yyyy-MM-dd")).toBe(null);
        expect(parseBs("+3d", "yyyy-MM-dd")).toBe(null);
        expect(parseBs("today", "yyyy-MM-dd")).toBe(null);
        expect(parseBs("2082-08-10 14:30", "yyyy-MM-dd")).toBe(null);
    });
});

describe("web client", () => {
    class BsRecord extends models.Model {
        _name = "x.bs.record";

        date = fields.Date();

        _records = [{ id: 1, date: "2025-11-26" }];

        _views = {
            form: `<form><field name="date"/></form>`,
            list: `<list><field name="date"/></list>`,
        };
    }

    const { ResCompany, ResPartner, ResUsers } = webModels;
    defineModels([BsRecord, ResCompany, ResPartner, ResUsers]);

    function enableBs() {
        patchWithCleanup(session, { calendar_system: "bikram_sambat" });
        patchWithCleanup(localization, {
            dateFormat: `yyyy-MM-dd'${BS_FORMAT_MARKER}'`,
            dateTimeFormat: `yyyy-MM-dd'${BS_FORMAT_MARKER}' HH:mm:ss`,
        });
    }

    test("Gregorian users keep the Gregorian picker", async () => {
        mockDate("2025-12-01 10:00:00");
        await mountView({ type: "form", resModel: "x.bs.record", resId: 1 });
        await contains(".o_field_date button").click();
        expect(".o_datetime_picker_header").toHaveText(/Nov 2025/);
    });

    test.tags("desktop");
    test("BS users see, pick and type BS dates, Gregorian dates are saved", async () => {
        enableBs();
        mockDate("2025-12-01 10:00:00");
        onRpc("web_save", ({ args }) => {
            expect.step(args[1].date);
        });
        await mountView({ type: "form", resModel: "x.bs.record", resId: 1 });
        expect(".o_field_date button").toHaveText("Mangsir 10");

        await contains(".o_field_date button").click();
        expect(".o_field_date input").toHaveValue("2082-08-10");
        expect(".o_datetime_picker_header").toHaveText(/Mangsir 2082/);
        expect(".o_date_item_cell.o_selected").toHaveText("10");
        // Mangsir 2082 starts on a Monday and has 29 days
        expect(".o_date_item_cell:not(.o_out_of_range)").toHaveCount(29);

        await contains(".o_date_item_cell:not(.o_out_of_range):contains(/^15$/)").click();
        await clickSave();

        await contains(".o_field_date button").click();
        await contains(".o_field_date input").edit("2082-09-01");
        await clickSave();
        expect.verifySteps(["2025-12-01", "2025-12-16"]);
    });

    test.tags("desktop");
    test("BS picker navigates by BS month", async () => {
        enableBs();
        mockDate("2025-12-01 10:00:00");
        await mountView({ type: "form", resModel: "x.bs.record", resId: 1 });
        await contains(".o_field_date button").click();
        await contains(".o_datetime_picker .o_next").click();
        expect(".o_datetime_picker_header").toHaveText(/Poush 2082/);
        await contains(".o_datetime_picker .o_previous").click();
        await contains(".o_datetime_picker .o_previous").click();
        expect(".o_datetime_picker_header").toHaveText(/Kartik 2082/);
    });

    test("list view shows BS dates", async () => {
        enableBs();
        mockDate("2025-12-01 10:00:00");
        await mountView({ type: "list", resModel: "x.bs.record" });
        expect(".o_data_cell").toHaveText("Mangsir 10");
    });
});
