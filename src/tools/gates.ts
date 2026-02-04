/**
 * Gate management tools - matches Uniplex Dashboard API
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ApiClient } from '../api-client.js';

export const tools: Tool[] = [
  {
    name: 'list_gates',
    description: 'List all gates you own. Gates are permission enforcement points that protect your tools.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_gate',
    description: 'Get details for a specific gate.',
    inputSchema: {
      type: 'object',
      required: ['gate_id'],
      properties: {
        gate_id: {
          type: 'string',
          description: 'The full gate ID (e.g., "gate_acme-travel")',
        },
      },
    },
  },
  {
    name: 'create_gate',
    description: 'Create a new gate. A gate defines what permissions exist and enforces access control for your tools.',
    inputSchema: {
      type: 'object',
      required: ['name', 'gate_id', 'profile'],
      properties: {
        name: {
          type: 'string',
          description: 'Human-readable name for the gate (e.g., "Acme Travel API")',
        },
        gate_id: {
          type: 'string',
          description: 'Unique identifier suffix. Will be prefixed with "gate_". Use lowercase, numbers, hyphens, underscores (e.g., "acme-travel")',
        },
        description: {
          type: 'string',
          description: 'Optional description of what this gate protects',
        },
        profile: {
          type: 'string',
          enum: ['L1', 'L2', 'L3'],
          description: 'Trust profile: L1 (dev/test), L2 (production), L3 (financial, requires proof-of-possession)',
        },
        allow_self_issued: {
          type: 'boolean',
          description: 'For L1 only: allow self-issued passports (default: false)',
        },
      },
    },
  },
  {
    name: 'update_gate',
    description: 'Update settings for an existing gate.',
    inputSchema: {
      type: 'object',
      required: ['gate_id'],
      properties: {
        gate_id: {
          type: 'string',
          description: 'The full gate ID (e.g., "gate_acme-travel")',
        },
        name: {
          type: 'string',
          description: 'New name for the gate',
        },
        description: {
          type: 'string',
          description: 'New description',
        },
        profile: {
          type: 'string',
          enum: ['L1', 'L2', 'L3'],
          description: 'New trust profile',
        },
        allow_self_issued: {
          type: 'boolean',
          description: 'Allow self-issued passports (L1 only)',
        },
      },
    },
  },
  {
    name: 'delete_gate',
    description: 'Delete (archive) a gate. This will deactivate all signing keys.',
    inputSchema: {
      type: 'object',
      required: ['gate_id'],
      properties: {
        gate_id: {
          type: 'string',
          description: 'The full gate ID to delete',
        },
      },
    },
  },
  {
    name: 'get_catalog',
    description: 'Get the active permission catalog for a gate.',
    inputSchema: {
      type: 'object',
      required: ['gate_id'],
      properties: {
        gate_id: {
          type: 'string',
          description: 'The full gate ID (e.g., "gate_acme-travel")',
        },
      },
    },
  },
  {
    name: 'create_catalog',
    description: 'Create or update the permission catalog for a gate. Defines what permissions agents can request.',
    inputSchema: {
      type: 'object',
      required: ['gate_id', 'version', 'catalog_name', 'permissions'],
      properties: {
        gate_id: {
          type: 'string',
          description: 'The full gate ID',
        },
        version: {
          type: 'string',
          description: 'Semver version (e.g., "1.0.0")',
        },
        catalog_name: {
          type: 'string',
          description: 'Human-readable name',
        },
        description: {
          type: 'string',
          description: 'Optional description',
        },
        permissions: {
          type: 'array',
          description: 'Permission definitions',
          items: {
            type: 'object',
            required: ['permission_key', 'display_name', 'description', 'risk_level', 'min_trust_level'],
            properties: {
              permission_key: { type: 'string' },
              display_name: { type: 'string' },
              description: { type: 'string' },
              risk_level: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
              min_trust_level: { type: 'number', enum: [1, 2, 3] },
              constraints: { type: 'object' },
            },
          },
        },
        is_active: {
          type: 'boolean',
          description: 'Whether this catalog is active (default: true)',
        },
      },
    },
  },
];

export const handlers: Record<string, (api: ApiClient, args: Record<string, unknown>) => Promise<unknown>> = {
  list_gates: async (api: ApiClient) => {
    return api.get('/api/gates');
  },

  get_gate: async (api: ApiClient, args: Record<string, unknown>) => {
    const { gate_id } = args as { gate_id: string };
    return api.get(`/api/gates/${gate_id}`);
  },

  create_gate: async (api: ApiClient, args: Record<string, unknown>) => {
    const { name, gate_id, description, profile, allow_self_issued } = args as {
      name: string;
      gate_id: string;
      description?: string;
      profile: string;
      allow_self_issued?: boolean;
    };
    return api.post('/api/gates', { name, gate_id, description, profile, allow_self_issued });
  },

  update_gate: async (api: ApiClient, args: Record<string, unknown>) => {
    const { gate_id, ...updates } = args as { gate_id: string } & Record<string, unknown>;
    return api.patch(`/api/gates/${gate_id}`, updates);
  },

  delete_gate: async (api: ApiClient, args: Record<string, unknown>) => {
    const { gate_id } = args as { gate_id: string };
    return api.delete(`/api/gates/${gate_id}`);
  },

  get_catalog: async (api: ApiClient, args: Record<string, unknown>) => {
    const { gate_id } = args as { gate_id: string };
    return api.get(`/api/gates/${gate_id}/catalog`);
  },

  create_catalog: async (api: ApiClient, args: Record<string, unknown>) => {
    const { gate_id, ...body } = args as { gate_id: string } & Record<string, unknown>;
    return api.post(`/api/gates/${gate_id}/catalog`, body);
  },
};
