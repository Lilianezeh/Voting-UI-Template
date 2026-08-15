# HackathonAfrica 3.0 Voting System

A simple, client-side voting UI for electing a Head of House, built with TypeScript and Tailwind CSS.

## Features

- Select your name from a list of registered voters
- Cast a vote for one of several nominated candidates
- Confirmation modal before a vote is recorded
- Prevents a voter from voting more than once
- Live vote count and leading-candidate highlight
- Winner (or tie) detection once voting is complete

## Tech Stack

- **TypeScript** — application logic, compiled with `tsc`
- **Tailwind CSS v4** — styling, compiled via `@tailwindcss/cli`
- Vanilla DOM APIs — no frontend framework

## Project Structure

src/
index.html # markup + Tailwind classes
input.css # Tailwind entry point
output.css # compiled CSS (generated)
types.ts # shared TypeScript interfaces
logic.ts # pure voting logic (no DOM access)
main.ts # DOM wiring, event handlers, rendering
dist/ # compiled JS output (generated, gitignored)

## Setup

```bash
bun create
```

## Build

Compile CSS:
```bash
bun run build:css
```

Compile TypeScript:
```bash
bun run build:ts
```

Or watch both during development in separate terminals:
```bash
bun run watch:css
bun run build:ts
```

## Running Locally

Open `src/index.html` with a local server (e.g. the VS Code "Live Server" extension) after building CSS and TypeScript. Opening the file directly (`file://`) will not work correctly since it's an ES module.

## How Voting Works

1. Select your name from **Select Your Name**.
2. Select a nominated candidate under **Cast Your Vote**.
3. Click **Record Vote** — a confirmation dialog appears.
4. Confirm to cast your vote, or cancel to go back.
5. Vote counts and the current leader update live under **Voter Count**.
