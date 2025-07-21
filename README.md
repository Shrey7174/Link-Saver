# Link Saver + Auto-Summary Web App

A full-stack productivity tool to save, manage, and auto-summarize bookmarks using Supabase, Next.js, TailwindCSS, and Jina AI.

## Live Demo

- Live Link: https://cerulean-crepe-ac4161.netlify.app
- GitHub Repo: https://github.com/Shrey7174/Link-Saver

## Screenshots

> Add 2-3 PNG images in `/screenshots` folder and link them here:



## Tech Stack

| Layer        | Technology Used               |
|--------------|-------------------------------|
| Frontend     | Next.js, TailwindCSS          |
| Backend/Auth | Supabase (PostgreSQL + Auth)  |
| AI Summary   | Jina AI                       |
| DnD          | @hello-pangea/dnd             |
| Hosting      | Netlify                       |

## Features

- User authentication (Supabase)
- Save bookmarks with title, favicon, and summary
- Auto-generate summaries with Jina AI
- Add tags to bookmarks
- Filter/search by tags
- Drag-and-drop reorder
- Fully responsive design with dark mode

## Screenshots

> These images are located inside the `/images/` directory.

### Signup & Login

| Signup                             | Login                              |
|-----------------------------------|------------------------------------|
| ![](./images/signup.png)          | ![](./images/login.png)            |

### 🏠 Dashboard (Bookmarks & Tag Filter)

| Light Mode                         | Dark Mode                          |
|-----------------------------------|------------------------------------|
| ![](./images/dashboard_lightmode.png) | ![](./images/Dashboard.png)        |




## Project Structure

/pages → App routes (Next.js)
/components → Reusable components
/lib → Supabase and utility functions
/styles → Tailwind styling


## Setup Instructions

1. Clone the repo:

git clone https://github.com/Shrey7174/Link-Saver.git
cd link-saver-app


2. Install dependencies:

npm install


3. Add environment variables:

Create a `.env.local` file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_JINA_API_KEY=your_jina_api_key


4. Run locally:

npm run dev


## Tests

- Component tests using @testing-library/react
- Bookmark utility test cases
- Sample unit tests included

## What I'd Do Next

- Add social login (Google, GitHub)
- Export/import bookmark list
- Add preview card (image, site info)
- Improve AI summary fallback with OpenAI
- Enable team/workspace-based sharing

## Time Spent

- Total: ~11 hours
  - Supabase integration: 1h
  - Link CRUD + Summary: 2h
  - UI, DnD, Filters: 3h
  - Testing & Cleanup: 3h
  - Deployment + Docs: 2h
