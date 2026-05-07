# MCP Servers in GitHub Copilot

MCP (Model Context Protocol) is an open standard that allows Copilot (and other AI assistants) to connect to external tools, data sources, and services. MCP servers extend what the agent can do beyond the local filesystem — enabling browser automation, web search, GitHub API access, database queries, and more.

---

## What MCP Is

MCP defines a standard client–server protocol. VS Code acts as the MCP client; each MCP server is a separate process (or remote endpoint) that exposes a set of **tools** the agent can call. When you configure an MCP server, its tools become available in Copilot Agent mode just like built-in tools.
too
```
VS Code Copilot (MCP Client)
        │
        ├── @playwright/mcp         → Browser automation
        ├── mcp-server-github       → GitHub API (issues, PRs, repos)
        ├── mcp-server-fetch        → Fetch web pages
        └── mcp-server-brave-search → Web search
```

MCP tools appear in the Agent mode tools list and can be referenced in prompt files using `tools: [<server-name>/*]`.

---

## Configuration in VS Code

MCP servers are configured in VS Code's `settings.json` (user or workspace level):

```json
{
  "mcp": {
    "servers": {
      "playwright": {
        "command": "npx",
        "args": ["@playwright/mcp@latest"],
        "type": "stdio"
      },
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "type": "stdio",
        "env": {
          "GITHUB_PERSONAL_ACCESS_TOKEN": "${env:GITHUB_TOKEN}"
        }
      },
      "fetch": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-fetch"],
        "type": "stdio"
      },
      "brave-search": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-brave-search"],
        "type": "stdio",
        "env": {
          "BRAVE_API_KEY": "${env:BRAVE_API_KEY}"
        }
      }
    }
  }
}
```

> **Security note:** Never hardcode API keys or tokens in `settings.json`. Reference environment variables using `${env:VARIABLE_NAME}`. Store secrets in your system's environment or a `.env` file that is listed in `.gitignore`.

For workspace-scoped MCP config, use `.github/mcp.json` instead of `settings.json`.

---

## Built-in / Out-of-the-Box MCP in VS Code Copilot

VS Code ships with a small set of tools that are always available without additional MCP server configuration:

| Built-in Tool | Description |
|---------------|-------------|
| `workspace` | Read files, search symbols, grep across the workspace |
| `createFile` | Create new files in the workspace |
| `readFile` | Read any file by path |
| `terminalLastCommand` | Read the output of the last terminal command |
| `editFile` | Modify existing files |
| `runInTerminal` | Execute shell commands |
| `search` | Full-text search across the workspace |

These are always available in Agent mode. No installation or configuration needed.

---

## Recommended MCP Servers

### `@playwright/mcp` — Browser Automation

**Install:** `npm install -D @playwright/mcp`
**Use for:** Testing UI in the browser, taking screenshots, automating form fills, verifying visual output of your frontend.

Particularly useful for:
- Capturing screenshots of your portfolio site across breakpoints
- Automated visual regression testing
- Verifying Astro SSG output in a real browser

```json
"playwright": {
  "command": "npx",
  "args": ["@playwright/mcp@latest"],
  "type": "stdio"
}
```

---

### `@modelcontextprotocol/server-github` — GitHub Integration

**Install:** `npx -y @modelcontextprotocol/server-github`
**Requires:** `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable
**Use for:** Reading and creating issues, reviewing PRs, listing repository contents, fetching commit history — all from within Copilot Agent mode.

Particularly useful for:
- AI-driven code review workflows
- Generating changelogs from commit history
- Creating issues from TODO comments in code

---

### `@modelcontextprotocol/server-fetch` — Web Content Fetching

**Install:** `npx -y @modelcontextprotocol/server-fetch`
**Use for:** Fetching real-time documentation, reading changelogs, checking API reference pages during development.

Particularly useful for:
- Checking the Astro docs for a specific API while coding
- Reading TailwindCSS v4 changelog
- Fetching a dependency's README during library evaluation

---

### `@modelcontextprotocol/server-brave-search` — Web Search

**Install:** `npx -y @modelcontextprotocol/server-brave-search`
**Requires:** Brave Search API key (free tier available at `search.brave.com/search/api`)
**Use for:** Searching the web from within Copilot Agent mode — great for finding solutions, checking compatibility, or discovering libraries.

---

### `@modelcontextprotocol/server-filesystem` — Advanced File Operations

**Install:** `npx -y @modelcontextprotocol/server-filesystem`
**Use for:** Operations beyond VS Code's built-in file tools — listing directories with permissions, recursive searches, watching for file changes.

---

### `mcp-server-sqlite` — Database Exploration

**Install:** `npx -y @modelcontextprotocol/server-sqlite`
**Use for:** Querying local SQLite databases from within Copilot. Useful if you prototype data-driven features locally.

---

## Summary: Server Recommendations by Use Case

| Use Case | Recommended MCP Server |
|----------|------------------------|
| Frontend visual testing | `@playwright/mcp` |
| Reading live documentation | `@modelcontextprotocol/server-fetch` |
| GitHub issues, PRs, commits | `@modelcontextprotocol/server-github` |
| Web search during development | `@modelcontextprotocol/server-brave-search` |
| Advanced file system operations | `@modelcontextprotocol/server-filesystem` |
| Local SQLite / data prototyping | `@modelcontextprotocol/server-sqlite` |
| AI development (Hugging Face models, etc.) | Hugging Face MCP (community, search npm) |

---

## Using MCP Tools in Prompt Files

Reference MCP server tools in `.prompt.md` frontmatter:

```yaml
---
agent: "agent"
tools: [workspace, playwright/*, github/*]
---
Take a screenshot of https://localhost:4321 and save it to `screenshots/home.png`.
```

---

## Security Considerations

- **Principle of least privilege**: Only enable MCP servers you actively use. Each server increases the attack surface.
- **No hardcoded secrets**: Always use `${env:VAR_NAME}` for API keys and tokens.
- **Review tool calls**: In Agent mode, VS Code shows every MCP tool call before execution. Review them.
- **Untrusted servers**: Only use MCP servers from trusted sources (official `@modelcontextprotocol` packages or well-maintained community packages). A malicious MCP server can exfiltrate data.
- **Workspace vs. user scope**: Secrets in workspace `.github/mcp.json` may be committed accidentally. Prefer user `settings.json` for secrets.

---

## Further Reading

- [Model Context Protocol — Official Docs](https://modelcontextprotocol.io/)
- [VS Code Docs: MCP Servers](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
- [MCP Server Registry (npm)](https://www.npmjs.com/search?q=%40modelcontextprotocol)
- [Playwright MCP](https://playwright.dev/docs/mcp)
