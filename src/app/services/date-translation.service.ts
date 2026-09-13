import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const WEEKDAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const MONTH_KEYS = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];

@Injectable({
    providedIn: 'root'
})
export class DateTranslationService {
    constructor(private translate: TranslateService) {}

    getWeekday(date: Date): string {
        const key = WEEKDAY_KEYS[date.getDay()];
        return this.translate.instant(`weekdays.${key}`);
    }

    getMonth(date: Date): string {
        const key = MONTH_KEYS[date.getMonth()];
        return this.translate.instant(`months.${key}`);
    }

    getMonthGenitive(date: Date): string {
        const key = MONTH_KEYS[date.getMonth()];
        return this.translate.instant(`months_genitive.${key}`);
    }

    private formatTime(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // "January 19, Sunday 11:00" / "19 січня, неділя 11:00"
    formatFull(date: Date): string {
        return this.translate.instant('date_format_full', {
            month: this.getMonth(date),
            monthGenitive: this.getMonthGenitive(date),
            day: date.getDate(),
            weekday: this.getWeekday(date),
            time: this.formatTime(date)
        });
    }
}
