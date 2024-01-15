import {get, writable} from 'svelte/store';
import type { Feedback } from './interfaces/feedback';
import type { feedbackFilterType } from './interfaces/feedback-filter';
import {listNewFeedback, listVotingFeedback} from '$lib/actions/feedback/get-list-feedback.action';

const defaultFilterValue: feedbackFilterType = {
    text: '',
    rangeDate: {
        start: undefined,
        end: undefined
    }
};

export const filter = writable<feedbackFilterType>(defaultFilterValue);


export const clearFeedbackFilter = () => {
    filter.set({
        text: '',
        rangeDate: {
            start: undefined,
            end: undefined
        }
    })
}

export const newFeedbacks = writable<{
    feedbacks: Feedback[],
    total: number,
    limit: number,
    offset: number,
    projectId: string,
}>({feedbacks: [], total: 0, limit: 10, offset: 0, projectId: ''})

export const votingFeedbacks = writable<{
    feedbacks: Feedback[],
    total: number,
    limit: number,
    offset: number,
    projectId: string,
}>({feedbacks: [], total: 0, limit: 10, offset: 0, projectId: ''})

export const updateFeedback = (feedback: Feedback) => {
    if (get(newFeedbacks).feedbacks.find(f => f.id === feedback.id)) {
        newFeedbacks.update(feedbackData => {
            return {
                ...feedbackData,
                feedbacks: feedbackData.feedbacks.map(f => f.id === feedback.id ? feedback : f)
            }
        })

    }

    if (get(votingFeedbacks).feedbacks.find(f => f.id === feedback.id)) {
        votingFeedbacks.update(feedbackData => {
            return {
                ...feedbackData,
                feedbacks: feedbackData.feedbacks.map(f => f.id === feedback.id ? feedback : f)
            }
        })

    }
}

filter.subscribe(filter => {
    listNewFeedback(get(newFeedbacks).projectId, get(newFeedbacks).limit, get(newFeedbacks).offset);
    listVotingFeedback(get(votingFeedbacks).projectId, get(votingFeedbacks).limit, get(votingFeedbacks).offset);
});