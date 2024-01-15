import apiClient from '../../../api';
import {filter, newFeedbacks, votingFeedbacks} from '../../../stores/feedback.store';
import {get} from 'svelte/store';
import {getLocalTimeZone} from '@internationalized/date';

export type ListFeedbackFilters = {
    status: string;
    limit: number;
    offset: number;
    startDate?: Date;
    endDate?: Date;
    term?: string;
}

const buildQuery = (filters: ListFeedbackFilters) => {
    const queryParams = new URLSearchParams({
        status: filters.status,
        limit: filters.limit.toString(),
        offset: filters.offset.toString()
    });

    if (filters.startDate && filters.endDate) {
        queryParams.set('startDate', filters.startDate.toISOString());
        queryParams.set('endDate', filters.endDate.toISOString());
    }

    if (filters.term) {
        queryParams.set('term', filters.term);
    }

    return queryParams.toString();
}

export const listNewFeedback = async (projectId: string, limit: number = 10, offset: number = 0) => {
    if (projectId === '') {
        return;
    }

    const filters: ListFeedbackFilters = {
        status: 'new',
        limit,
        offset,
    }

    if (get(filter).text) {
        filters.term = get(filter).text;
    }

    if (get(filter).rangeDate.start && get(filter).rangeDate.end) {
        filters.startDate = get(filter).rangeDate.start?.toDate(getLocalTimeZone());
        filters.endDate = get(filter).rangeDate.end?.toDate(getLocalTimeZone());
    }

    const response = await apiClient.get(`/feedback/${projectId}?${buildQuery(filters)}`);
    newFeedbacks.set({
        feedbacks: response.data.data.map((f: any) => {
            return {
                ...f,
                createdAt: new Date(f.createdAt),
            }
        }),
        total: response.data.total,
        limit: filters.limit,
        offset: filters.offset,
        projectId,
    })
}

export const listVotingFeedback = async (projectId: string, limit: number = 10, offset: number = 0) => {
    if (projectId === '') {
        return;
    }

    const filters: ListFeedbackFilters = {
        status: 'voting',
        limit,
        offset,
    }

    if (get(filter).text) {
        filters.term = get(filter).text;
    }

    if (get(filter).rangeDate.start && get(filter).rangeDate.end) {
        filters.startDate = get(filter).rangeDate.start?.toDate(getLocalTimeZone());
        filters.endDate = get(filter).rangeDate.end?.toDate(getLocalTimeZone());
    }

    const response = await apiClient.get(`/feedback/${projectId}?${buildQuery(filters)}`);
    votingFeedbacks.set({
        feedbacks: response.data.data.map((f: any) => {
            return {
                ...f,
                createdAt: new Date(f.createdAt),
            }
        }),
        total: response.data.total,
        limit: filters.limit,
        offset: filters.offset,
        projectId,
    })
}