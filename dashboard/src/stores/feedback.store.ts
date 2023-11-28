import { writable } from 'svelte/store';
import type { Project } from './interfaces/project';
import type { Feedback } from './interfaces/feedback';

export const feedbacks = writable<Feedback[]>([]);