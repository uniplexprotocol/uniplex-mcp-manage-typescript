/**
 * Tool registry - exports all available tools
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ApiClient } from '../api-client.js';
import { tools as gatesTools, handlers as gatesHandlers } from './gates.js';
import { tools as passportsTools, handlers as passportsHandlers } from './passports.js';
import { tools as attestationsTools, handlers as attestationsHandlers } from './attestations.js';

export const allTools: Tool[] = [
  ...gatesTools,
  ...passportsTools,
  ...attestationsTools,
];

const allHandlers: Record<string, (api: ApiClient, args: Record<string, unknown>) => Promise<unknown>> = {
  ...gatesHandlers,
  ...passportsHandlers,
  ...attestationsHandlers,
};

export async function handleToolCall(
  api: ApiClient,
  name: string,
  args: Record<string, unknown>
): Promise<unknown> {
  const handler = allHandlers[name];
  if (!handler) {
    throw new Error(`Unknown tool: ${name}`);
  }
  return handler(api, args);
}
