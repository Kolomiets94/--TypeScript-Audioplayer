# TypeScript Audioplayer

**Live Demo:** https://kolomiets94.github.io/--TypeScript-Audioplayer/

A full-stack educational audio player built with React, TypeScript and Express. The project demonstrates audio playback, client-side state management, JWT authentication and a small REST API.

## Features

- Custom HTML5 Audio player
- Play / pause, seek and ±10 second controls
- Volume control
- Track search
- Favorites with backend persistence per authenticated user
- Registration and login with JWT authentication
- Password hashing with bcrypt
- User profile with editable name and avatar preview
- Responsive interface for desktop and mobile
- REST API powered by Express

## Tech stack

### Frontend
- React 18
- TypeScript
- Redux Toolkit
- React Redux
- Axios
- SCSS Modules
- HTML5 Audio API

### Backend
- Node.js
- Express
- JSON Web Token
- bcrypt
- CORS
- Morgan
- JSON file persistence for demo data

## Technical highlights

The player logic is separated into reusable hooks and Redux state. `useAudio` manages the browser Audio API, playback state, progress, seeking and volume.

Authentication is handled by the Express API. New passwords are stored as bcrypt hashes, successful registration and login return a JWT, and protected requests send the token through the Authorization header.

Favorites are stored per authenticated user. The UI uses an optimistic update and rolls the change back if the API request fails.

## Project structure

```text
.
├── audio-player/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── data/
│       ├── hooks/
│       ├── services/
│       ├── store/
│       ├── styles/
│       ├── types/
│       └── utils/
└── express-backend/
    ├── server.js
    └── package.json
```

## Run locally

### Backend

```bash
cd express-backend
npm install
npm run dev
```

The API runs at `http://localhost:8000`.

For local development you can optionally set a JWT secret:

```bash
JWT_SECRET=your-secret npm run dev
```

### Frontend

Open another terminal:

```bash
cd audio-player
npm install
npm start
```

The React application runs at `http://localhost:3000`.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/register` | Create an account and return a JWT |
| POST | `/api/login` | Sign in and return a JWT |
| GET | `/api/tracks` | Get tracks (protected) |
| GET | `/api/favorites` | Get current user's favorites |
| POST | `/api/favorites` | Add a track to favorites |
| DELETE | `/api/favorites` | Remove a track from favorites |

## Notes

This is a portfolio/educational project. The backend intentionally uses JSON files instead of a production database. For production use, secrets should be configured through environment variables and persistent storage should be moved to a database.

## Author

**Alexander Kolomiets** — Junior Frontend Developer (React / TypeScript)

- GitHub: https://github.com/Kolomiets94
- Email: Kolomiets94@yandex.ru
- Telegram: @Kolomiets94
