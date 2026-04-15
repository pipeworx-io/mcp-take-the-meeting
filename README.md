# mcp-take-the-meeting

take-the-meeting MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `take_the_meeting_evaluate` | Evaluate whether a meeting is worth attending based on its parameters. Heavily weighted toward no. Returns time cost analysis, productivity impact, email viability score, and a polite decline template. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "take-the-meeting": {
      "url": "https://gateway.pipeworx.io/take-the-meeting/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use take-the-meeting
```

## License

MIT
