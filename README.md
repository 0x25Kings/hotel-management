# Room Reservation Frontend
React + Vite + Tailwind v4 + React Router. All data comes from `src/services/*` (mock now, swap for REST/GraphQL later; base URL in `VITE_API_URL`, see `services/api.js`).
Run: `npm i && npm run dev`. Demo login: any email/password; an email containing "admin" gets the ADMIN role.
Frontend role checks are UX only; the backend must enforce real authorization, availability, payment approval and stock.
