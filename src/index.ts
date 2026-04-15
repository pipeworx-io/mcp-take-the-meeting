interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * take-the-meeting MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Evaluate whether a meeting is worth attending based on its parameters. Heavily w
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'take_the_meeting_evaluate',
    description: 'Evaluate whether a meeting is worth attending based on its parameters. Heavily weighted toward no. Returns time cost analysis, productivity impact, email viability score, and a polite decline template.',
    inputSchema: {
      type: 'object' as const,
      properties: {"duration": {"type": "number", "description": "Meeting duration in minutes"}, "attendee_count": {"type": "number", "description": "Number of attendees"}, "has_agenda": {"type": "boolean", "description": "Whether the meeting has an agenda"}, "recurring": {"type": "boolean", "description": "Whether this is a recurring meeting"}, "could_be_email": {"type": "boolean", "description": "Whether this meeting could be an email"}},
      required: [],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('take-the-meeting API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'take_the_meeting_evaluate':
      return callApi('https://api.stupidapis.com/take-the-meeting/evaluate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
