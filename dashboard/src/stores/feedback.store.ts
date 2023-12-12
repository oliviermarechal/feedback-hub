import { writable } from 'svelte/store';
import type { Project } from './interfaces/project';
import type { Feedback } from './interfaces/feedback';

export const feedbacks = writable<Feedback[]>([]);

export const updateFeedback = (feedback: Feedback) => {
    feedbacks.update(feedbacks => {
        const up = [
            ...feedbacks.filter(f => f.id !== feedback.id),
            feedback
        ];

        return up.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    })
}