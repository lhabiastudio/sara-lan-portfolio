# Sara Lan Portfolio — Project Bible

## 1. What this is
One sentence describing what we're building and for whom.

## 2. Active phase
- Phase: BUILD
- Phase started: 2026-05-10
- Source of truth: `lhabia.json`

## 3. Stack
- Frontend: (fill in)
- Backend: (fill in)
- Hosting: (fill in)
- Auth: (fill in)

## 4. Hard rules (no exceptions)
1. No HEX colors — use design tokens via CSS variables.
2. No `any` in TypeScript.
3. `pnpm check` must pass before any commit.

## 5. Design tokens
Path: `.phase/design/design-system.json` (after DESIGN phase locked)
Loading: imported as CSS variables in `src/styles/tokens.css`.

## 6. Definition of Done (every commit)
- `pnpm tsc --noEmit` passes
- `pnpm lint` passes
- `pnpm test` passes (if tests exist)
- Manual smoke test on the visible feature

## 7. Architecture decisions worth knowing
- (fill in as decisions are made)

## 8. What NEVER to touch
- (fill in protected files/paths)

## 9. Phase guidance
See `system/playbooks/playbook-build-implement.md` for current phase SOP.
