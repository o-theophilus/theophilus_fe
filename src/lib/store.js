import { writable } from 'svelte/store';

export const showHeader = writable(true);
export const openMobileMenu = writable(false);
export const isMobile = writable(true);
