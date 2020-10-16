import { IModuleConfigValues } from './i-config';

/**
 * Rest Handles
 */
export class RestHandles {
  getAll: string;
  delete: string;
  update: string;
  create: string;
}

/**
 * Delegate to API endpoint to reset service
 */
export type delegateEndPoint<ConfigValues> = (input: ConfigValues, baseUrl: string) => string;

export interface RegisteredEndpoint<ConfigValues extends IModuleConfigValues> {
  create?: delegateEndPoint<ConfigValues>;
  update?: delegateEndPoint<ConfigValues>;
  delete?: delegateEndPoint<ConfigValues>;
  getOne?: delegateEndPoint<ConfigValues>;
  getAll: delegateEndPoint<ConfigValues>;
}
