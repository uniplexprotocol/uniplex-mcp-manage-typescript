/**
 * Passport management tools
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ApiClient } from '../api-client.js';

export const tools: Tool[] = [
  {
    name: 'list_passports',
    description: 'List all active passports for a gate.',
    inputSchema: {
      type: 'object',
      required: ['gate_id'],
      properties: {
        gate_id: {
          type: 'string',
          description: 'The gate ID to list passports for',
        },
      },
    },
  },
  {
    name: 'get_passport',
    description: 'Get details for a specific passport.',
    inputSchema: {
      type: 'object',
      required: ['gate_id', 'passport_id'],
      properties: {
        gate_id: {
          type: 'string',
          description: 'The gate ID',
        },
        passport_id: {
          type: 'string',
          description: 'The passport ID',
        },
      },
    },
  },
  {
    name: 'issue_passport',
    description: 'Issue a new passport to an agent. The passport grants the agent specific permissions for this gate.',
    inputSchema: {
      type: 'object',
      required: ['gate_id', 'agent_id', 'permissions'],
      properties: {
        gate_id: {
          type: 'string',
          description: 'The gate ID to issue passport for',
        },
        agent_id: {
          type: 'string',
          description: 'Identifier for the agent receiving the passport (e.g., "agent_claude-123")',
        },
        permissions: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of permission keys to grant (e.g., ["flights:search", "flights:book"])',
        },
        constraints: {
          type: 'object',
          description: 'Optional constraints (e.g., { "core:cost:max": 100000 })',
        },
        expires_in_seconds: {
          type: 'number',
          description: 'How long until passport expires (default: 3600 = 1 hour)',
        },
        metadata: {
          type: 'object',
          description: 'Optional metadata to attach to the passport',
        },
      },
    },
  },
  {
    name: 'revoke_passport',
    description: 'Revoke a passport immediately. The agent will no longer be able to use it.',
    inputSchema: {
      type: 'object',
      required: ['gate_id', 'passport_id'],
      properties: {
        gate_id: {
          type: 'string',
          description: 'The gate ID',
        },
        passport_id: {
          type: 'string',
          description: 'The passport ID to revoke',
        },
      },
    },
  },
];

export const handlers: Record<string, (api: ApiClient, args: Record<string, unknown>) => Promise<unknown>> = {
  list_passports: async (api: ApiClient, args: Record<string, unknown>) => {
    const { gate_id } = args as { gate_id: string };
    return api.get(`/api/gates/${gate_id}/passports`);
  },

  get_passport: async (api: ApiClient, args: Record<string, unknown>) => {
    const { gate_id, passport_id } = args as { gate_id: string; passport_id: string };
    return api.get(`/api/gates/${gate_id}/passports/${passport_id}`);
  },

  issue_passport: async (api: ApiClient, args: Record<string, unknown>) => {
    const { gate_id, ...body } = args as { gate_id: string } & Record<string, unknown>;
    return api.post(`/api/gates/${gate_id}/passports`, body);
  },

  revoke_passport: async (api: ApiClient, args: Record<string, unknown>) => {
    const { gate_id, passport_id } = args as { gate_id: string; passport_id: string };
    return api.delete(`/api/gates/${gate_id}/passports/${passport_id}`);
  },
};
