/**
 * Cumulative state tools
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ApiClient } from '../api-client.js';

export const tools: Tool[] = [
  {
    name: 'get_cumulative_state',
    description: 'Get spending and rate limit state for a passport.',
    inputSchema: {
      type: 'object',
      required: ['passport_id'],
      properties: {
        passport_id: { type: 'string', description: 'The passport ID' },
      },
    },
  },
  {
    name: 'reset_cumulative_state',
    description: 'Reset cumulative spending and rate counters for a passport.',
    inputSchema: {
      type: 'object',
      required: ['passport_id'],
      properties: {
        passport_id: { type: 'string', description: 'The passport ID' },
        window_type: { type: 'string', description: 'Window type to reset (e.g., "daily", "hourly")' },
      },
    },
  },
];

export const handlers: Record<string, (api: ApiClient, args: Record<string, unknown>) => Promise<unknown>> = {
  get_cumulative_state: async (api, args) => {
    const { passport_id } = args as { passport_id: string };
    return api.get(`/api/passports/${passport_id}/state`);
  },

  reset_cumulative_state: async (api, args) => {
    const { passport_id, window_type } = args as { passport_id: string; window_type?: string };
    const body: Record<string, unknown> = {};
    if (window_type !== undefined) body.window_type = window_type;
    return api.post(`/api/passports/${passport_id}/state/reset`, body);
  },
};
