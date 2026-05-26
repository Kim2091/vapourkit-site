const rawBase = import.meta.env.BASE_URL;
export const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
