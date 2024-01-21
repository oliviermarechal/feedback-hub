import { writable } from 'svelte/store';
import type { Project } from './interfaces/project';

export const projects = writable<Project[]>([]);
export const project = writable<Project | undefined>(undefined);