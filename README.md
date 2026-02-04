# uniplex-mcp-manage

Uniplex Management MCP Server — manage issuers, passports, and gates directly from Claude.

## Quick Start

### 1. Get an API Key

Generate an API key from your [Uniplex Dashboard](https://uniplex.ai/settings/api-keys).

### 2. Add to Claude Desktop

Edit your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "uniplex": {
      "command": "npx",
      "args": ["uniplex-mcp-manage"],
      "env": {
        "UNIPLEX_API_KEY": "sk_live_xxxxxxxx"
      }
    }
  }
}
```

### 3. Start Using

Restart Claude Desktop and try:

- "Show me my Uniplex account info"
- "List all my issuers"
- "Create a new issuer called acme-prod"
- "Issue a passport for my research agent with read access to flights:search"
- "Revoke passport pp_abc123"

## Available Tools

### Account
| Tool | Description |
|------|-------------|
| `whoami` | Get current account info |

### Issuers
| Tool | Description |
|------|-------------|
| `list_issuers` | List all your issuers |
| `create_issuer` | Create a new issuer |
| `get_issuer` | Get issuer details |

### Passports
| Tool | Description |
|------|-------------|
| `list_passports` | List passports with filters |
| `create_passport` | Issue a new passport |
| `get_passport` | Get passport details |
| `revoke_passport` | Revoke a passport |

### Gates
| Tool | Description |
|------|-------------|
| `list_gates` | List all gates |
| `create_gate` | Create a new gate |
| `get_gate` | Get gate details including catalog |
| `update_gate_catalog` | Update gate permissions |
| `check_gate` | Test passport against gate |

### Attestations
| Tool | Description |
|------|-------------|
| `list_attestations` | Query attestation history |
| `get_attestation` | Get attestation details |

## Local Development

For local testing against a development dashboard:

```json
{
  "mcpServers": {
    "uniplex": {
      "command": "npx",
      "args": ["uniplex-mcp-manage"],
      "env": {
        "UNIPLEX_API_URL": "http://localhost:3000",
        "UNIPLEX_API_KEY": "sk_test_xxxxxxxx"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `UNIPLEX_API_KEY` | Yes | — | Your Uniplex API key |
| `UNIPLEX_API_URL` | No | `https://api.uniplex.ai` | API base URL |

## License

MIT — Standard Logic Co.

---

*Standard Logic Co. — Building the trust infrastructure for AI agents*
