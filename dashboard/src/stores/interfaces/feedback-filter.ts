import type {CalendarDate} from '@internationalized/date';

export type feedbackFilterType = {
    text: string;
    rangeDate: {
        start: CalendarDate | undefined;
        end: CalendarDate | undefined;
    };
}