import { LocalizationPlugin } from "@web/core/l10n/localization_plugin";
import { localization } from "@web/core/l10n/localization";
import { patch } from "@web/core/utils/patch";
import { session } from "@web/session";
import { DateTimeField } from "@web/views/fields/datetime/datetime_field";
import { formatBs, parseBs, toBsLocaleString } from "./bs_calendar";

const { DateTime } = luxon;

// Odoo reads and writes user-facing dates with the formats of `localization`,
// and server values with fixed formats of its own. Tagging the user formats with
// an invisible literal lets luxon tell the two apart: only tagged formats are
// written and read in Bikram Sambat, so stored values stay Gregorian.
export const BS_FORMAT_MARKER = "⁠";
const MARKER_LITERAL = `'${BS_FORMAT_MARKER}'`;
const BS_DATE_FORMAT = `yyyy-MM-dd${MARKER_LITERAL}`;

export function isBsCalendarActive() {
    return session.calendar_system === "bikram_sambat";
}

function isBsFormat(format) {
    return typeof format === "string" && format.includes(BS_FORMAT_MARKER);
}

export function stripBsMarker(format) {
    return format.replaceAll(MARKER_LITERAL, "").replaceAll(BS_FORMAT_MARKER, "");
}

export function applyBsLocalization() {
    const { timeFormat } = localization;
    Object.assign(localization, {
        dateFormat: BS_DATE_FORMAT,
        dateTimeFormat: `${BS_DATE_FORMAT} ${timeFormat}`,
    });
}

patch(DateTime.prototype, {
    toFormat(format, options) {
        if (isBsFormat(format)) {
            const gregorianFormat = stripBsMarker(format);
            return formatBs(this, gregorianFormat, options) ?? super.toFormat(gregorianFormat, options);
        }
        return super.toFormat(format, options);
    },
    toLocaleString(formatOptions = DateTime.DATE_SHORT, options = {}) {
        if (isBsCalendarActive() && formatOptions.day && formatOptions.month) {
            const text = toBsLocaleString(this, formatOptions, options);
            if (text !== null) {
                return text;
            }
        }
        return super.toLocaleString(formatOptions, options);
    },
});

patch(DateTime, {
    fromFormat(text, format, options = {}) {
        if (isBsFormat(format)) {
            return (
                parseBs(String(text), stripBsMarker(format), options) ??
                DateTime.invalid("unparsable", `"${text}" is not a Bikram Sambat date`)
            );
        }
        return super.fromFormat(text, format, options);
    },
});

patch(LocalizationPlugin.prototype, {
    updateTranslations(result) {
        super.updateTranslations(result);
        if (isBsCalendarActive()) {
            applyBsLocalization();
        }
    },
});

patch(DateTimeField.prototype, {
    getPlaceholder(fieldName) {
        const placeholder = super.getPlaceholder(fieldName);
        if (!isBsCalendarActive() || this.props.placeholder || !placeholder) {
            return placeholder;
        }
        return `${stripBsMarker(placeholder)} (BS)`;
    },
});
