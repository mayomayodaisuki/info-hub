# Weekly Release Information (2026-05-10 to 2026-05-17)

Today's date: 2026-05-17. The following sections summarize new releases in the past 7 days across tracked AI development tools.

---

## 1. google-gemini/gemini-cli — v0.42.0 (2026-05-12)

- Repository: https://github.com/google-gemini/gemini-cli
- Release: https://github.com/google-gemini/gemini-cli/releases/tag/v0.42.0
- Publication date: 2026-05-12 (within the last 7 days)
- Related preview: v0.43.0-preview.0 (2026-05-12)

### Key Changes and New Features

**Voice Mode Enhancements**
- New microphone UI with updated placeholder text for voice mode (#26270)
- Wave animation added for voice mode visual feedback (#26284)
- Voice transcription is now inserted at the cursor position rather than appended (#26287)
- Privacy and compliance UX warning added for the Gemini Live backend (#26454)

**Session & Memory Management**
- New `--delete` flag for the `/exit` command, allowing deletion of the current session on exit (#19332). Example: `/exit --delete`.
- Auto Memory inbox flow added with a canonical-patch contract, providing a proposed-change review pipeline before memory is updated (#26338).
- New `/bug-memory` command, and `/bug` now auto-captures a V8 heap snapshot for memory diagnostics (#25639, #26440).
- Message queueing during compression is now supported (#24071), letting users continue typing while the model is compressing context.

**Configuration**
- New `ignoreLocalEnv` setting plus `--ignore-env` CLI flag to skip loading project-local `.env` files (#26445). Useful when running in CI or sandboxed environments where stray env vars should be ignored.
- Gemma 4 models are now enabled by default via the Gemini API (#26307).
- Default API timeout reduced to 60s with retries enabled for `undici` timeouts (#26191).
- Non-HTTPS proxy URLs are now supported, helping container environments (#26234).

**Agents, Skills & Extensions**
- `delete` is now an alias for `/extensions uninstall` (#25660).
- `/commands list` subcommand added for listing custom commands (#22324).
- "@-mention" support for the Gemini bot was added (#26207).
- Subagents are now aware of active approval modes (#23608).
- Improved `/agents` refresh logging (#26442).
- ACP (Agent Client Protocol) prompt-turn logic was modularized and delegated to `GeminiClient`, with better mode awareness (#26143, #26222, #26332).

**UI / TUI**
- LaTeX-style output is now rendered as Unicode in the TUI (#25802).
- Box edges and settings dialog clipping fixes for terminals with narrow widths (#26148, #26507).
- Refined platform-specific undo/redo and smart bubbling behaviour for WSL (#26202).
- Skill consent dialog clears before reload (#26431); `SkillInboxDialog` now fits and scrolls in alternate buffer (#26455).
- Branch indicator now updates correctly inside sub-directories and worktrees (#26330).

**Reliability & Bugfixes**
- Retry on `ERR_STREAM_PREMATURE_CLOSE` errors (#26519).
- `InvalidStream` events no longer inject a phantom "System: Please continue." message (#26340).
- Tool output cleanup on session deletion is now enforced for legacy files (#26263).
- Auto-update no longer switches to less-stable channels accidentally (#26132).
- Node args are now passed via `NODE_OPTIONS` during relaunch to support single-executable apps (SEA) (#26130).

### Practical Impact

The v0.42.0 release strengthens three pillars: voice interaction (microphone + wave animation, privacy warnings), context management (queued messages during compression, Auto Memory inbox, `/bug-memory` heap snapshots), and ops hardening (timeout/retry tuning, proxy support, env isolation). The new `--ignore-env` flag and `ignoreLocalEnv` setting in particular help teams running Gemini CLI in CI: previously a stray `GOOGLE_CLOUD_PROJECT` in a checked-in `.env` could change behaviour silently.

---

## 2. anthropics/claude-code — CHANGELOG updated 2026-05-15 (versions 2.1.141 / 2.1.142 / 2.1.143)

- Repository: https://github.com/anthropics/claude-code
- CHANGELOG: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
- Last commit on CHANGELOG: 2026-05-15 (within the last 7 days)

### Latest Version: 2.1.143

**Plugin Dependency Enforcement (new)**
- `claude plugin disable` now refuses to disable a plugin when another enabled plugin depends on it, and emits a copy-pasteable "disable-chain" hint listing every plugin that must be disabled first.
- `claude plugin enable` automatically force-enables transitive dependencies.
- The `/plugin` marketplace browse pane and `claude plugin details` now show projected context cost (per-turn and per-invocation token estimates), letting users gauge a plugin's footprint before installing.

**`worktree.bgIsolation` Setting (new)**
- New `"none"` value for `worktree.bgIsolation` lets background sessions edit the working copy directly without going through `EnterWorktree`. Intended for repos where worktrees are impractical (e.g., monorepos with hooks, repos with submodule constraints).
- Example settings.json:
  ```json
  {
    "worktree": { "bgIsolation": "none" }
  }
  ```

**PowerShell Tool Hardening**
- The PowerShell tool now passes `-ExecutionPolicy Bypass` automatically.
- Opt out with `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1`.
- PowerShell tool is now enabled by default on Windows for Bedrock, Vertex, and Foundry users. Opt out with `CLAUDE_CODE_USE_POWERSHELL_TOOL=0`.

**Background Session Improvements**
- Model and effort level set by the user are preserved when a background session wakes from idle.
- `claude --bg --dangerously-skip-permissions` now persists across `retire→wake`.
- `/bg` and `←`-detach now preserve `--mcp-config`, `--settings`, `--add-dir`, `--plugin-dir`, `--strict-mcp-config`, `--fallback-model`, and `--allow-dangerously-skip-permissions`.
- Worktree cleanup no longer falls back to `rm -rf` when `git worktree remove` fails (prevents accidental loss of gitignored or in-progress files).
- Daemon now detects macOS clock jumps after sleep/wake so background sessions don't disappear.

**`claude agents` Dashboard Flags**
- `claude agents` now accepts `--add-dir`, `--settings`, `--mcp-config`, `--plugin-dir`, `--permission-mode`, `--model`, `--effort`, and `--dangerously-skip-permissions`. These configure both the dashboard and any session dispatched from it.

**Stop-hook Safeguard**
- Stop hooks that block repeatedly will now terminate the turn with a warning after 8 consecutive blocks. Override via `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`.

### Version 2.1.142 Highlights

- Fast mode now uses Opus 4.7 by default (previously Opus 4.6). Pin to 4.6 with `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1`.
- Plugins with a root-level `SKILL.md` and no `skills/` subdirectory are now surfaced as a skill.
- The `/plugin` details pane and `claude plugin details` now show LSP servers a plugin provides.
- `MCP_TOOL_TIMEOUT` is now respected for remote HTTP and SSE MCP servers (previously capped at 60 seconds regardless of the configured value).
- Reactive compaction's first summarize attempt now seeds from the original request's overflow size, avoiding a wasted near-full-context retry.

### Version 2.1.141 Highlights

- New `terminalSequence` field on hook JSON output, so hooks can emit desktop notifications, window titles, and bells without a controlling terminal.
- `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` env var to clone GitHub plugin sources over HTTPS (useful in environments without a GitHub SSH key).
- `ANTHROPIC_WORKSPACE_ID` env var for workload identity federation — scopes the minted token to a specific workspace when the federation rule covers more than one.
- `claude agents --cwd <path>` to scope the session list to a directory.
- Rewind menu adds "Summarize up to here" to compress earlier context while keeping recent turns intact.
- `/feedback` can now include recent sessions (last 24 hours or 7 days).

### Practical Impact

This week's Claude Code releases sharpen the plugin ecosystem (dependency enforcement, context-cost visibility, SKILL.md auto-detection) and dramatically harden background agents — particularly the `claude agents` dashboard, which now propagates all the same flags as the foreground CLI and survives macOS sleep/wake cycles cleanly. The default switch to Opus 4.7 for Fast Mode and the new `worktree.bgIsolation: "none"` escape hatch are the most impactful for daily users: faster small-turn responses and an unblocked path for repos where git worktrees aren't viable.

---

## 3. cursor — v3.4 (2026-05-13) and prior week entries

- Website: https://cursor.com
- Changelog: https://cursor.com/changelog
- Latest release: 2026-05-13 (within the last 7 days)

### Key Changes (May 10–13, 2026)

**v3.4 — "Development environments for cloud agents" (2026-05-13)**
- Multi-repo environments let a single cloud agent work across multiple repositories in one configuration.
- Enhanced Dockerfile-based environment configuration with build secrets for secure access to private registries.
- Layer caching improvements deliver up to 70% faster builds on cache hits.
- Agent-guided environment setup with credential validation and configuration checks.
- Environment version history with rollback and comprehensive audit logging.

**Cursor in Microsoft Teams (2026-05-11)**
- Mention `@Cursor` in Teams channels to delegate tasks to cloud agents or retrieve information.
- Automatic repository and model selection based on conversation context.

**Bugbot Effort Levels (2026-05-11)**
- Three new PR-review configurations: Default (optimized for speed), High (thorough analysis, reportedly "0.95 bugs per run"), and Custom (natural-language rules).

---

## 4. microsoft/vscode — 1.120.0 (2026-05-13)

- Repository: https://github.com/microsoft/vscode
- Release: https://github.com/microsoft/vscode/releases/tag/1.120.0
- Publication date: 2026-05-13 (within the last 7 days)
- Release notes: https://code.visualstudio.com/updates/v1_120

### AI / Copilot-related Changes Only

**Agents Window (Stable Preview)**
- The new Agents window enables "agent-driven development" across multiple projects.
- Provides a dedicated space to explore and iterate on agent tasks with persistent preferences, deterministic change interactions, upstream sync, and per-window setting overrides.

**BYOK (Bring-Your-Own-Key) Model Improvements**
- Accurate token usage visibility, showing context-window percentage for BYOK models.
- Configurable thinking effort for reasoning models, exposed via the Chat view's model picker.

**Terminal Command Risk Assessment (Experimental)**
- AI-generated risk badges next to suggested terminal commands.
- Categories: Safe (green), Caution (orange), Review carefully (red), each with an explanatory summary tailored to the specific command.

**Terminal Output Compression (Preview)**
- Reduces context-window consumption by post-processing command output before sending it to the language model.
- Collapses large diff hunks, strips lockfile diffs, and removes installation progress bars.

**Plan Mode Enhancements**
- Inline plan editing for Claude and Copilot CLI agents directly inside VS Code.
- Review and iterate on plans in a unified interface rather than separate editor tabs.

**Copilot CLI Plugin Auto-Discovery**
- Agent plugins installed via GitHub Copilot CLI are automatically detected by VS Code, eliminating duplicate installation steps.

**Custom Editor Diffs (Proposed API)**
- New API for custom editors to render specialized diff UIs.
- Powers Markdown preview diffs and improves diff experiences beyond plain-text comparison.

---

## 5. cline/cline — CLI v3.0.3, v3.83.0, CLI v3.0.4, CLI v3.0.5 (2026-05-13 → 2026-05-16)

- Repository: https://github.com/cline/cline
- Latest release: https://github.com/cline/cline/releases/tag/cli-v3.0.5
- Publication: 2026-05-16 (within the last 7 days)

### CLI v3.0.5 (2026-05-16)
- Plugin-provided tools and slash commands now appear in the CLI settings dialog (hydrated through the sandbox).
- Hydrated plugin tools and config reload options are preserved when toggling settings, so they no longer disappear after a toggle.

### CLI v3.0.4 (2026-05-16)
- Improved light-theme TUI colors so chat, status bar, tool output, and syntax highlighting render with better contrast on light terminals.
- Fixed plugin tools failing in the production npm build by bundling the SDK deps plugins import at runtime.

### CLI v3.0.3 (2026-05-14) — Most significant CLI release this week
- New `--worktree` flag auto-creates a fresh git worktree under `~/.cline/worktrees/` and runs the task there.
  - Composable with `--taskId` and `--continue`, so you can resume an existing task in an isolated worktree to try an alternative approach without disturbing your main checkout.
  - Example: `cline --worktree --continue --taskId <id>`
- Session status is now shown in the CLI history view; status rows refresh in place while the standalone history TUI is open.
- OpenAI-compatible provider restored in the auth flow; stored model metadata is preserved when configuring or migrating OpenAI-compatible providers.
- Fixed macOS screenshots being dropped when pasted into the TUI — paths containing U+202F (narrow no-break space) and other Unicode variants now resolve correctly.
- Bearer token auth accepted for AWS Bedrock; AWS profiles mapped correctly when configuring the Bedrock gateway.
- `--thinking none` now honored for Ollama models that ship with reasoning enabled by default.
- Recovery added for detached hub event errors instead of crashing the session.
- Refined shared system prompt with clearer guidance on tool output formatting, unsupported file reads, long-running shell commands, and final-verification before completion.

### v3.83.0 (VS Code extension, 2026-05-13)
- Fixed:
  - "Searching..." state now shown in the `@`-mention file picker.
  - Improved `@`-mention file search performance.
  - `write_to_file` can now create or overwrite files with empty content.
  - Resolved validation failures for MCP servers that require an object.
  - OpenRouter prompt cache control enabled for Qwen models.
  - Axios and SAP Connectivity dependencies updated.
- Changed:
  - VS Code extension now packages and publishes `README.marketplace.md`.
  - Added telemetry to `@`-mention search to help diagnose local, remote, and multi-root workspace search behavior.

### Practical Impact

The headline is the `--worktree` flag in CLI v3.0.3: it brings safe, parallel "try-this-approach" experimentation to Cline's CLI in the same way Claude Code uses worktrees. Combined with `--continue --taskId`, a developer can fork an in-progress task into an isolated checkout without losing the original conversation state. The 3.0.4 and 3.0.5 follow-ups round out plugin UX (proper hydration of plugin tools in settings) and accessibility (light-theme contrast fixes).

---

## 6. kiro — CLI 2.3.0 (2026-05-12)

- Website: https://kiro.dev
- Changelog: https://kiro.dev/changelog/
- Latest release: 2026-05-12 (within the last 7 days)

### Key Changes (Past 7 Days)

**CLI 2.3.0 (2026-05-12)**
- OAuth client ID support for HTTP-based MCP servers.
- New `KIRO_HOME` environment variable to relocate Kiro's home directory.
- Remappable keybindings in the V2 TUI.
- Agents can now stream output through side channels for improved context management.

(Other recent but >7-days-old entries — Models, Web Preview, IDE 0.12.155 — are excluded as they fall outside the window.)

---

## 7. openai/codex — 0.131.0-alpha.22 (2026-05-15)

- Repository: https://github.com/openai/codex
- Release: https://github.com/openai/codex/releases/tag/rust-v0.131.0-alpha.22
- Publication: 2026-05-15 (within the last 7 days)
- Status: Pre-release (alpha)

### Key Changes

This is a routine alpha release in the `rust-v0.131.0-alpha.*` series. The release notes themselves are minimal ("Release 0.131.0-alpha.22"), but the cadence (alpha.16 through alpha.22 all within the past 7 days) indicates an active iteration cycle in the Rust-based Codex CLI.

Notable build artifacts confirm continued multi-platform support:
- Native binaries for macOS arm64/x64, Linux musl arm64/x64, and Windows arm64/x64.
- npm packages (`codex-npm-*-0.131.0-alpha.22.tgz`) for all platforms.
- Python wheels (`openai_codex_cli_bin-0.131.0a22-*`).
- SDK npm package (`codex-sdk-npm-0.131.0-alpha.22.tgz`).
- Companion tools: `codex-app-server`, `codex-command-runner`, `codex-responses-api-proxy`, `codex-windows-sandbox-setup`, `codex-zsh`.
- Sigstore signatures for Linux musl artifacts (supply-chain verification).

Because the release notes are sparse, users tracking specific behavioural changes should diff against the previous alpha (`rust-v0.131.0-alpha.21`) for individual commits.

---

## 8. github/copilot-cli — v1.0.48 (stable) and v1.0.49-0 / v1.0.49-1 (pre-release)

- Repository: https://github.com/github/copilot-cli
- Latest stable: https://github.com/github/copilot-cli/releases/tag/v1.0.48
- Latest pre-release: https://github.com/github/copilot-cli/releases/tag/v1.0.49-1
- Publication: 2026-05-14 (stable), 2026-05-15 (pre-releases)

### v1.0.48 (Stable, 2026-05-14)
- Model picker displays actual token prices instead of dot indicators for token-based billing users.
- Instruction files with unquoted glob patterns in `applyTo` frontmatter (e.g. `applyTo: **/*.ts`) are now applied correctly.
- Input text with CJK characters or emoji renders without blank gaps between lines.
- `/context` shows correct token limits for all models (previously always showed 128k).
- Auto-disables the built-in `github-mcp-server` in Azure DevOps-only workspaces when running in prompt/headless mode, matching interactive-mode behavior.
- Terminal cursor positions correctly on the input field instead of on decorative elements (e.g. the selected tab).
- ACP clients receive updated config options when the active model is changed.
- `/ask` dialog no longer prompts for follow-up replies it cannot receive.
- Skill content injected to the model no longer includes YAML frontmatter metadata.

### v1.0.49-0 / v1.0.49-1 (Pre-release, 2026-05-15)

**Added**
- Experimental: `/mcp search` command to search and install MCP servers from the registry.
- Experimental: Tool search with deferred loading for MCP and external tools.
- "None" reasoning-effort option added to the reasoning-effort picker.
- `COPILOT_PLUGIN_DIR_ONLY` env var to disable automatic plugin discovery — enables deterministic plugin sets when using `--plugin-dir`.

**Improved**
- Memory permission prompts now name who can see a stored memory: user scope or the specific `owner/repo` for repository scope. Timeline entries also show the scope (`(for user)` / `(shared with repository collaborators)`).
- Reduced PowerShell syntax errors on Windows by avoiding `&&` chaining instructions when using legacy PowerShell 5.x.
- Prompt mode (`-p`) automatically loads workspace MCP sources when the current folder is already trusted.

**Fixed**
- Copying text from the scroll view joins soft-wrapped lines without extra newlines or indentation.
- Cursor positioning in input fields works correctly with wide characters (CJK, emoji).
- Hooks (`preToolUse`, `postToolUse`, `subagentStart`, `subagentStop`) now fire correctly for sub-agent tool calls.
- Plugins loaded via `--plugin-dir` now correctly register their agents as available `task(agent_type=...)` subagents in prompt mode.
- Memory storage correctly limits available scopes when no repository context is present.
- `--plugin-dir` and `--additional-mcp-config` now work in `--server` / `--headless` mode.
- Content-filtered model responses now display an explanation instead of a blank assistant turn.
- PromptFrame UI now renders inside tmux when the outer terminal is ghostty, WezTerm, or kitty (detected via `tmux list-clients`).
- MCP OAuth token lookups are correctly scoped to the active session.

### Practical Impact

v1.0.48 cleans up several long-standing UX papercuts (correct token-limit reporting in `/context`, working glob patterns in instruction file frontmatter, real prices in the model picker). The v1.0.49 pre-release line is more interesting for workflow developers: the experimental `/mcp search` command makes MCP-server discovery first-class inside Copilot CLI, and `COPILOT_PLUGIN_DIR_ONLY` is the deterministic-plugin-set knob CI environments have been missing. Sub-agent hook firing fixes also unblock developers building multi-agent pipelines on top of Copilot CLI.

---
