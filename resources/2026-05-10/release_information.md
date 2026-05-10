# Release Information (Week of 2026-05-10)

This report summarizes new releases from tracked AI development tools published within the last 7 days (cutoff: 2026-05-03).

---

## 1. google-gemini/gemini-cli — v0.41.2 (2026-05-06)

The v0.41.x release line dropped this week, with v0.41.0 (2026-05-05) carrying the major feature work and v0.41.1/v0.41.2 cherry-pick patches that followed within 24 hours.

### Key Features (v0.41.0)

- **Real-time voice mode (feat(voice))**: New voice interaction mode that supports both cloud and local backends, enabling spoken interaction with Gemini CLI sessions.
- **Gemma 4 model support (experimental)**: Added experimental support for the Gemma 4 family, expanding the local-model story.
- **Auto-memory scratchpad persistence**: Skill extraction now retains an auto-memory scratchpad across sessions for better long-running task continuity.
- **Secure `.env` loading + workspace trust enforcement in headless mode**: When running headlessly, `.env` files load through a hardened path and untrusted workspaces are blocked, reducing supply-chain and credential leak risk in CI environments.
- **Enhanced shell command validation + core tools allowlist**: New allowlist in core tightens shell-execution safety; combined with the YOLO-mode "fail closed" fix, restricted-rule misparses no longer silently allow commands.
- **New `ContextManager` and `AgentChatHistory`**: Refactored context management wired in for upcoming long-context features.
- **Boolean/number casting for env vars in `settings.json`**: `settings.json` env entries are now type-cast, so `PORT: "8080"` can be consumed as a number.
- **Manual session UUID CLI arg**: Lets external orchestrators pin a deterministic session ID for a Gemini CLI run.

### Practical Impact for Developers

- Headless/CI users gain stricter trust enforcement; expect `.env` and untrusted-workspace prompts to fail closed instead of warning. Add `FatalUntrustedWorkspaceError`-aware trust configuration to your CI.
- Voice mode opens up a new interaction surface — useful for accessibility and pair-programming flows; check `gemini --help` for the new flags after upgrade.
- The Gemma 4 wiring is experimental; treat as preview for local inference experiments.

### v0.41.1 / v0.41.2 (Patches)

- v0.41.1 (2026-05-05): cherry-pick fix to v0.41.0.
- v0.41.2 (2026-05-06): additional cherry-pick fix on top of v0.41.1. No new feature surface.

### Links

- Repository: https://github.com/google-gemini/gemini-cli
- Release (latest): https://github.com/google-gemini/gemini-cli/releases/tag/v0.41.2
- Release (feature): https://github.com/google-gemini/gemini-cli/releases/tag/v0.41.0

---

## 2. anthropics/claude-code — CHANGELOG updated 2026-05-09 (latest entry: 2.1.138)

`CHANGELOG.md` was last modified on 2026-05-09. The most recent versioned entry is **2.1.138** (internal fixes only), but the substantive changes landed in **2.1.136** and **2.1.133** within the 7-day window.

### Highlights (2.1.136)

A large maintenance release focused on stability, MCP reliability, and UI polish. Notable items:

- **`settings.autoMode.hard_deny`**: New auto-mode classifier rule that **blocks unconditionally** — overrides user intent and any allow exceptions. Use this when you want a guarantee that a tool/path is never invoked, regardless of how the model phrases the request.
  ```jsonc
  // .claude/settings.json
  {
    "autoMode": {
      "hard_deny": ["Bash(rm -rf *)", "Edit(/etc/**)"]
    }
  }
  ```
- **`CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL`**: Re-enables the session-quality survey for enterprises capturing responses through OpenTelemetry, after it was disabled by default.
- **MCP OAuth refresh-token race fix**: When multiple remote MCP servers refresh concurrently, they no longer overwrite each other's tokens — users with several remote MCP servers should stop seeing daily re-authentication.
- **Login loop fix**: A concurrent credential write race that overwrote freshly-rotated OAuth tokens and forced re-login is resolved.
- **MCP servers no longer silently disappear after `/clear`** in the VS Code extension, JetBrains plugin, and Agent SDK when configured via `.mcp.json`, plugins, or claude.ai connectors.
- **Plan-mode write blocking fix**: Plan mode now correctly blocks file writes even when a matching `Edit(...)` allow rule exists, so plan-mode invariants are no longer leaked through allow rules.
- **`--resume` / `--continue`**: Now finds sessions when project paths contain underscores; also fixes session loading when a tool error truncation split an emoji (`no low surrogate in string`).
- **WSL2 image paste**: Falls back to PowerShell when xclip/wl-paste cannot read clipboard image data.
- **Renderer/UX fixes**: Bash output color positions, ReasonML diff "undefined" artifacts, `@`-mention picker scaling beyond 100 entries, mid-input slash-command autocomplete after an initial slash command, plus several dialog-consistency improvements.

### Highlights (2.1.133)

Adds infrastructure-tier features that are likely the biggest weekly impact for teams:

- **`worktree.baseRef` setting (`fresh` | `head`)**: Controls whether `--worktree`, `EnterWorktree`, and agent-isolation worktrees branch from `origin/<default>` (`fresh`, the new default) or local `HEAD`. **Behavior change**: `EnterWorktree` was branching from local `HEAD` since 2.1.128; setting reverts the default to `fresh`. Set `worktree.baseRef: "head"` to keep unpushed commits in new worktrees.
  ```jsonc
  // .claude/settings.json
  {
    "worktree": { "baseRef": "head" }
  }
  ```
- **`sandbox.bwrapPath` / `sandbox.socatPath` (Linux/WSL)**: Specify custom bubblewrap and socat binary locations — useful when these tools are installed outside the default `PATH`.
- **`parentSettingsBehavior` admin key (`'first-wins' | 'merge'`)**: Allows admins to opt SDK `managedSettings` (the parent tier) into the policy merge, giving more flexible managed-settings layering.
- **Effort level in hooks**: Hooks now receive the active effort level via the `effort.level` JSON input field and the `$CLAUDE_EFFORT` environment variable. Bash tool commands can also read `$CLAUDE_EFFORT`. This enables hooks like:
  ```bash
  # .claude/hooks/pre-bash.sh
  if [ "$CLAUDE_EFFORT" = "high" ]; then
    echo "Running with extra validation..."
  fi
  ```
- **Subagents now discover skills correctly** via the Skill tool (project, user, and plugin skills) — a key fix for skill-based workflows.
- **Refresh-token race fix #2**: Parallel sessions no longer dead-end at 401 when a refresh-token race wipes shared credentials.

### Practical Impact for Developers

- Teams running multiple remote MCP servers or many concurrent Claude Code sessions should upgrade to clear repeated re-auth and 401 issues.
- The `worktree.baseRef` default flip will surprise users who relied on local `HEAD` baselines since 2.1.128 — set the value explicitly if you have unpushed work in worktrees.
- Hooks and Bash subprocesses can now branch on effort, enabling cost/safety differentiation per session.

### Links

- Repository: https://github.com/anthropics/claude-code
- CHANGELOG: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

---

## 3. cursor — Version 3.3 (2026-05-04 through 2026-05-07)

Cursor shipped a multi-stage 3.3 release across the week.

### May 4, 2026 — Model controls, spend management, and usage analytics

- **Granular model access controls** for enterprise admins.
- **Soft spending limits** with automated alerts at 50%, 80%, and 100% thresholds.
- **Filterable usage analytics** by user and product surface (clients, Cloud Agents, automations, Bugbot, Security Review).

### May 6, 2026 — Context Usage Breakdown

- New visibility into how the agent consumes context across **rules, skills, MCPs, and subagents** — helps identify what is bloating prompts and what to trim.

### May 7, 2026 — PR Review, Build Plan in Parallel, and Split PRs

- **Redesigned PR experience** with dedicated tabs for reviews, commits, and changes.
- **"Build in Parallel"** uses async subagents to run independent tasks concurrently.
- **Split PRs**: organize changes into separate PRs based on logical groupings.
- New `/multitask` command, finer Explore-subagent control, improved undo/redo, and MCP connection reliability fixes.

### Links

- Website: https://cursor.sh
- Changelog: https://cursor.sh/changelog (redirects to https://cursor.com/changelog)

---

## 4. microsoft/vscode — 1.119.0 (2026-05-06)

Per the request rules, only AI / GitHub Copilot related changes are summarized.

### Agent Experience

- **Browser Integration**: Agents can discover and request access to integrated browser tabs. Users explicitly attach tabs via context picker or drag-and-drop. When an agent tries to open a new tab on the same domain as an unshared tab, the user is prompted to grant or deny access.
- **VS Code Agents (Insiders preview)**: Redesigned repository picker for new sessions, improved sub-session lifecycle, web-client mobile improvements, rotating progress messages and animations, and a `sessions.developerJoy.enabled` easter egg.
- **OpenTelemetry tracing for agents**: Sessions emit OTel traces using GenAI semantic conventions, capturing model usage, token consumption (with cache breakdowns), latency, and nested tool calls. Works with **Copilot Chat, local agent, Copilot CLI, and Claude agent**. Subagent invocations are auto-parented to the calling agent's `execute_tool` span — substantially better observability for multi-agent debugging.

### Chat Experience

- **Model details on responses**: Copilot CLI and Claude agent responses now show the model name and cost multiplier; "auto" model selection displays the resolved model. Badge appears live without reload.
- **Background lightweight todo agent**: A separate cheap model maintains the todo list for multi-step tasks, reducing main-model token usage. Disabled by default — enable with:
  ```json
  "github.copilot.chat.agent.backgroundTodoAgent.enabled": true
  ```
- **Usage-based billing UI prep**: Internal UI changes prepare for GitHub Copilot's June 1 transition to usage-based billing.

### Trust and Security

- **`allowNetwork` mode for `chat.agent.sandbox.enabled`**: New value that removes network blocking while keeping filesystem restrictions in place — useful for tasks that need outbound calls but should not write outside the sandbox.
- **Reduced approval prompts**: Writes to the OS temporary folder are auto-approved when "Allow All Commands in Session" is active.

### Links

- Repository: https://github.com/microsoft/vscode
- Release: https://github.com/microsoft/vscode/releases/tag/1.119.0
- Release notes: https://code.visualstudio.com/updates/v1_119

---

## 5. kiro — Multiple updates (2026-05-06 to 2026-05-07)

### May 7, 2026 — Claude Opus 4.7 with Adaptive Thinking

- The latest Claude model now ships in Kiro with **adaptive thinking**, which automatically scales reasoning depth based on task complexity.
- Available for **Pro, Pro+, and Power** subscribers in both IDE and CLI.
- Requires **IDE 0.11.133+** and **CLI 2.2.0+**.

### May 7, 2026 — Kiro Web (Preview)

- New web interface at **app.kiro.dev** with collaborative and autonomous agent modes.
- Coordinate a single change across multiple repos in one session.
- Manage pull requests directly from GitHub issues by adding the `kiro` label.

### May 6, 2026 — IDE 0.12.155

- **Parallel task execution**: Run independent tasks concurrently for up to **4x speedup**.
- **Quick Plan**: Skip approval gates when the scope is already known.
- **Analyze Requirements**: Catch logical inconsistencies before implementation begins.

### Links

- Website: https://kiro.dev
- Changelog: https://kiro.dev/changelog/

---

## 6. openai/codex — v0.130.0 (2026-05-08)

The latest stable Rust release (`rust-v0.130.0`) shipped on 2026-05-08, with v0.131.0-alpha builds rolling out the next day.

### New Features

- **`codex remote-control`**: New top-level command providing a simpler entrypoint for starting a headless, remotely controllable app-server. (#21424)
- **Plugin details + sharing**: Plugin details now show bundled hooks; plugin sharing exposes link metadata plus discoverability controls. (#21447, #21495, #21637)
- **Thread pagination**: App-server clients can page large threads with `unloaded`, `summary`, or `full` turn-item views. (#21566) — important for long-conversation UIs.
- **AWS console-login auth for Bedrock**: Bedrock auth can now use credentials from `aws login` profiles. (#21623)
- **`view_image` multi-environment support**: Resolves files through the selected environment for multi-environment sessions. (#21143)

### Notable Bug Fixes

- Live app-server threads now pick up config changes without a restart. (#21187)
- Turn diffs stay accurate across `apply_patch` operations, including partial failures that still mutated files. (#21180, #21518)
- Thread summaries, renames, resume, and fork paths are routed through `ThreadStore`, including threads without local rollout paths. (#21264-21266)
- Remote compaction now emits `response.processed` for v2 streams; omits `service_tier` on API-key compact requests. (#21642, #21676)
- Windows sandbox setup grants sandbox users access to the desktop runtime binary cache. (#21564)

### Practical Impact for Developers

- `codex remote-control` is the cleaner option for orchestrating Codex from external automation — replacing more verbose app-server setup.
- Bedrock users on AWS SSO/console-login profiles can now plug Codex directly into their existing auth without baking long-lived keys.
- Anyone hitting "lost diffs after apply_patch failure" or "thread doesn't pick up config" issues should upgrade.

### Links

- Repository: https://github.com/openai/codex
- Release: https://github.com/openai/codex/releases/tag/rust-v0.130.0

---

## 7. github/copilot-cli — v1.0.44 (2026-05-08)

### Key Changes

- **Slash commands mid-input + multi-skill invocation**: Slash commands can now appear anywhere in the prompt, not just at the start, and multiple skills can be invoked in a single message.
- **`userPromptSubmitted` hooks can short-circuit the LLM**: Hooks can now handle requests directly and return a response without making a model call — useful for caching, deterministic responses, or pre-validation.
- **`prerelease` argument for updates**: `copilot update` and `/update` accept an optional `prerelease` argument to fetch the latest prerelease build.
- **Path completion in `/add-dir`**: No longer flickers or gets intercepted by `@` and `#` pickers.
- **Faster `/user list` and `/user switch`** for multi-account users.
- **Shell-command (`!` prefix) reliability**: Works correctly with all shell configurations; shell aliases and rc-file settings are respected.
- **Quota display fix**: Free users see remaining usage instead of always showing 100% used.
- **Tool permissions persist after `/clear`** when granted in autopilot mode.
- **Effort level applies correctly** when switching models via `/model` picker.
- **Ctrl+C during a permission prompt** no longer hangs the CLI.
- **Sub-agent model resolution**: Timeline now shows the resolved model for rubber-duck sub-agents (e.g. `Rubber-duck(claude-opus-4.7)`).
- **Robustness**: Invalid URL entries in `settings.json` no longer crash startup; they're skipped with a warning.

### Practical Impact for Developers

- The `userPromptSubmitted` hook short-circuit is a real workflow improvement — you can now intercept prompts in CI hooks and return canned responses without burning tokens.
- Multi-skill-per-message and mid-input slash commands make composed prompts (e.g., `Refactor /lint then /test the result`) ergonomic.

### Links

- Repository: https://github.com/github/copilot-cli
- Release: https://github.com/github/copilot-cli/releases/tag/v1.0.44

---
