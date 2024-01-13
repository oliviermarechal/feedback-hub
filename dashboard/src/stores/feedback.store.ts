import { writable } from 'svelte/store';
import type { Feedback } from './interfaces/feedback';
import type { feedbackFilterType } from './interfaces/feedback-filter';

const defaultFilterValue: feedbackFilterType = {
    text: '',
    rangeDate: {
        start: undefined,
        end: undefined
    }
};

export const feedbacks = writable<Feedback[]>([]);
export const filter = writable<feedbackFilterType>(defaultFilterValue);

export const updateFeedback = (feedback: Feedback) => {
    feedbacks.update(feedbacks => {
        const up = [
            ...feedbacks.filter(f => f.id !== feedback.id),
            feedback
        ];

        return up.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    })
}

export const removeFeedback = (id: string) => {
    feedbacks.update(feedabcks => {
        return [
            ...feedabcks.filter(f => f.id !== id)
        ]
    })
}

export const clearFeedbackFilter = () => {
    filter.set({
        text: '',
        rangeDate: {
            start: undefined,
            end: undefined
        }
    })
}