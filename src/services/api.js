// Single place for backend config. Replace the mock services with fetch/GraphQL calls using this.
export const API_URL = import.meta.env.VITE_API_URL
export const wait = v => new Promise(r => setTimeout(() => r(structuredClone(v)), 200))
