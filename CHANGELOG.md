# Changelog

All notable changes to this registry are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) with the pre-1.0 softening described in `CONTRIBUTING.md`.

Consumers pin to a release by swapping `main` for a tag (e.g. `v0.1.0`) in the registry URL — see `CONTRIBUTING.md`.

## [Unreleased]

## [0.1.2] - 2026-06-03

### Changed

- `tv-config`: bump `tailwind-variants` to `^3.2.0` and pin `tailwind-merge` to `^3.0.0` in `public/r/tv-config.json` (previously `^0.3.1` and unpinned). Tracks the Tailwind Variants 3 line; `tv.config.ts` is unchanged, so consumers reinstalling just pick up the newer transitive deps. No bare-ui API changes.

## [0.1.1] - 2026-05-21

### Changed

- All components: bump pinned `@base-ui/react` range from `^1.4.0` to `^1.5.0` in `public/r/*.json`. No bare-ui API changes; consumers reinstalling get Base UI 1.5.x, which is API-compatible apart from Base UI's own OTP Field rename (`sanitizeValue` → `normalizeValue`) — only consumers who set that prop directly need to update.

## [0.1.0] - 2026-04-19

Initial tagged release.

### Added

- Registry namespace `@bare-ui` served from `public/r/*.json`.
- Components: `accordion`, `alert-dialog`, `autocomplete`, `avatar`, `button`, `checkbox`, `checkbox-group`, `collapsible`, `combobox`, `context-menu`, `dialog`, `drawer`, `field`, `fieldset`, `form`, `input`, `menu`, `menubar`, `meter`, `navigation-menu`, `number-field`, `otp-field`, `popover`, `preview-card`, `progress`, `radio`, `scroll-area`, `select`, `separator`, `slider`, `switch`, `tabs`, `toast`, `toggle`, `toggle-group`, `toolbar`, `tooltip`.
- Shared libs: `tv-config`, `split-variant-props`, `create-style-context`.
- Claude Code skill at `skills/bare-ui/SKILL.md`.

[Unreleased]: https://github.com/ng-hai/bare-ui/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/ng-hai/bare-ui/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/ng-hai/bare-ui/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/ng-hai/bare-ui/releases/tag/v0.1.0
