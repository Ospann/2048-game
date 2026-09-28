# 2048

A modern dark-neon take on the classic 2048 puzzle. Slide tiles, merge equal numbers, reach 2048 — then keep going.

## Features

- Full game logic: merge-once-per-move semantics, 90/10 spawn of 2/4, win and game-over detection
- Smooth CSS animations: tile slides, spawn pop, merge pulse, floating score gains
- Best score and current game persisted in `localStorage` — survives page reload
- Undo last move
- Keyboard (arrows / WASD), touch swipe on mobile

## Stack

React 19 + TypeScript (strict) + Vite. CSS Modules for styling. Linted with oxlint, formatted with oxfmt, tested with Vitest.

## Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm run dev`       | Start dev server         |
| `npm run build`     | Type-check and build     |
| `npm run preview`   | Preview production build |
| `npm run test`      | Run unit tests           |
| `npm run lint`      | Lint with oxlint         |
| `npm run fmt`       | Format with oxfmt        |
| `npm run fmt:check` | Check formatting         |
