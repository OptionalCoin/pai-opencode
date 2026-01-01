# Changelog

All notable changes to PAI-OpenCode will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.2] - 2026-01-01

### Added
- Agent Profile System: Switch AI providers with a single command
- 3 ready-to-use profiles: `anthropic`, `openai`, `local` (Ollama)
- `tools/apply-profile.ts` CLI tool for profile switching
- Profile storage in `.opencode/profiles/` directory

### Usage
```bash
# List available profiles
bun tools/apply-profile.ts

# Apply a profile (updates all 7 agent files)
bun tools/apply-profile.ts local      # Switch to Ollama
bun tools/apply-profile.ts openai     # Switch to GPT-4o
bun tools/apply-profile.ts anthropic  # Switch to Claude (default)
```

### Profiles
- `anthropic.yaml` - Claude Haiku 4.5 (intern) + Sonnet 4.5 (others)
- `openai.yaml` - GPT-4o-mini (intern) + GPT-4o (others)
- `local.yaml` - Llama 3.2 + DeepSeek-Coder (engineer)

## [0.4.1] - 2026-01-01

### Added
- Agent UI-Picker Support: Created 7 agent files in `.opencode/agent/` directory
- Agent files now visible in OpenCode's `/agents` UI picker with color coding
- All PAI agents now discoverable through both `@agent-name` syntax and UI

### Fixed
- Agent visibility issue in OpenCode UI picker (agents were functional but invisible)
- Color format: Use hex colors (`#3B82F6`) instead of color names
- Model format: Use `anthropic/claude-haiku-4-5` instead of `haiku`
- Descriptions shortened for UI picker display

### Agents Created
- `intern.md` - Fast parallel research, analysis, verification (Haiku 4.5)
- `engineer.md` - Code implementation, debugging, testing (Sonnet 4.5)
- `architect.md` - System design, PRDs, technical specs (Sonnet 4.5)
- `researcher.md` - Web research, source verification, analysis (Sonnet 4.5)
- `designer.md` - UX/UI design, visual systems, accessibility (Sonnet 4.5)
- `pentester.md` - Security testing, vulnerability assessment (Sonnet 4.5)
- `writer.md` - Content creation, docs, technical writing (Sonnet 4.5)

### Documentation
- Updated CHANGELOG.md with v0.4.0 and v0.4.1 entries
- Updated docs/AGENT-DELEGATION.md with UI picker information
- Removed "Known Limitation" from README.md

## [0.4.0] - 2026-01-01

### Added
- Agent Delegation: Implemented hybrid Task wrapper for PAI agent compatibility
- 7 core PAI agents migrated to OpenCode format
- Task API wrapper with <10ms overhead
- Agent routing and delegation system
- Comprehensive unit tests (19 passing tests)

### Changed
- Agent invocation uses OpenCode's native `@agent-name` syntax
- Task wrapper provides backward compatibility with PAI's Task tool pattern

### Technical
- Task wrapper delegates to OpenCode's native agent system
- Model selection preserved (haiku for interns, sonnet for specialists)
- Agent-specific voice IDs maintained for voice feedback integration

### Testing
- 19 unit tests covering Task wrapper functionality
- All tests passing with <10ms overhead validated

## [0.3.0] - 2026-01-01

### Added
- Skills Translation: Migrated PAI 2.0 skills to OpenCode native format
- OpenCode lazy loading support for 3-tier progressive disclosure
- CORE skill migrated to `.opencode/skill/CORE/`
- CreateSkill migrated to `.opencode/skill/CreateSkill/`
- skill-migrate.ts tool for automated skill migration
- Token reduction validation (≥90% achieved via progressive disclosure)

### Changed
- Skills path from `.claude/skills/` to `.opencode/skill/` (OpenCode native)
- Adopted OpenCode native lazy loading mechanism

### Fixed
- Corrected OpenCode directory naming: `.opencode/skill/` (singular, not plural)
- Removed `.opencode/tool/` directory (OpenCode auto-loads files from this path)
- Moved `skill-migrate.ts` to `tools/` outside `.opencode/` to prevent auto-execution

### Learned
- OpenCode enforces singular naming: `.opencode/skill/` not `.opencode/skills/`
- Files in `.opencode/tool/` are auto-loaded by OpenCode - use for native tools only
- PAI 2.0 and OpenCode SKILL.md formats are 100% identical (no translation needed)

### Documentation
- Added SKILLS-MIGRATION.md guide
- Documented format compatibility (SKILL.md format unchanged)
- Added token reduction report (90%+ reduction validated)

## [0.2.0] - 2026-01-01

### Added
- Vanilla OpenCode installation and configuration
- kai-core-install pack installation
- Git repository initialization
- Basic workspace structure (.opencode/, docs/, vendor/)
- Constitution v3.6.0
- ROADMAP v3.1.0

### Infrastructure
- Established OpenCode workspace at ~/Workspace/github.com/Steffen025/pai-opencode
- Git repository with main branch
- Public repository preparation for Phase 1 (community contributions)

## [0.1.0] - 2026-01-01

### Added
- Initial project conception
- Project plan and research phase
- PAI-OpenCode project structure
- Constitution v3.0.0 draft
- ROADMAP v3.0.0 draft
