/**
 * Constraint and template tools
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ApiClient } from '../api-client.js';

export const tools: Tool[] = [
  {
    name: 'get_constraints',
    description: 'Get constraints for a passport.',
    inputSchema: {
      type: 'object',
      required: ['passport_id'],
      properties: {
        passport_id: { type: 'string', description: 'The passport ID' },
      },
    },
  },
  {
    name: 'set_constraints',
    description: 'Set constraints on a passport.',
    inputSchema: {
      type: 'object',
      required: ['passport_id', 'constraints'],
      properties: {
        passport_id: { type: 'string', description: 'The passport ID' },
        constraints: {
          type: 'object',
          description: 'Constraint map (e.g., { "read": { "core:rate:max_per_minute": 100 } })',
        },
      },
    },
  },
  {
    name: 'list_constraint_types',
    description: 'List available constraint type definitions.',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Filter by category (e.g., "cost", "rate")' },
      },
    },
  },
  {
    name: 'list_constraint_templates',
    description: 'List system and user constraint templates.',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Filter by category' },
      },
    },
  },
  {
    name: 'apply_constraint_template',
    description: 'Apply a constraint template to a passport.',
    inputSchema: {
      type: 'object',
      required: ['passport_id', 'template_slug'],
      properties: {
        passport_id: { type: 'string', description: 'The passport ID' },
        template_slug: { type: 'string', description: 'Template slug to apply (e.g., "conservative-agent")' },
      },
    },
  },
  {
    name: 'create_constraint_template',
    description: 'Create a user constraint template.',
    inputSchema: {
      type: 'object',
      required: ['slug', 'name', 'constraints'],
      properties: {
        slug: { type: 'string', description: 'Unique slug identifier' },
        name: { type: 'string', description: 'Human-readable name' },
        description: { type: 'string', description: 'Optional description' },
        category: { type: 'string', description: 'Optional category' },
        constraints: { type: 'object', description: 'Constraint definitions' },
      },
    },
  },
];

export const handlers: Record<string, (api: ApiClient, args: Record<string, unknown>) => Promise<unknown>> = {
  get_constraints: async (api, args) => {
    const { passport_id } = args as { passport_id: string };
    return api.get(`/api/passports/${passport_id}/constraints`);
  },

  set_constraints: async (api, args) => {
    const { passport_id, constraints } = args as { passport_id: string; constraints: unknown };
    return api.put(`/api/passports/${passport_id}/constraints`, constraints);
  },

  list_constraint_types: async (api, args) => {
    const { category } = args as { category?: string };
    return api.get('/api/constraints/types', { category });
  },

  list_constraint_templates: async (api, args) => {
    const { category } = args as { category?: string };
    return api.get('/api/constraint-templates', { category });
  },

  apply_constraint_template: async (api, args) => {
    const { passport_id, template_slug } = args as { passport_id: string; template_slug: string };
    return api.post(`/api/passports/${passport_id}/constraints`, { template_slug });
  },

  create_constraint_template: async (api, args) => {
    return api.post('/api/constraint-templates', args);
  },
};
