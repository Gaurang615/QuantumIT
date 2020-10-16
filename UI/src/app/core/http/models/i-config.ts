import { Type } from '@angular/core';
import { RegisteredEndpoint } from './i-rest-service-provider';

/**
 * Configurable module
 */
export interface IModuleConfigValues {
  /**
   * Set model Id
   * @param id
   */
  setModelId(id: number);
}

/**
 * Generic Configurable model with API endpoints
 */
export interface IConfigurableModel<ConfigValues extends IModuleConfigValues, T> {
  endPoints: RegisteredEndpoint<ConfigValues>;
  model: Type<T>;
}

export interface IConfigurableModule<ConfigValues extends IModuleConfigValues> {
  supportedModels: { [index: string]: IConfigurableModel<ConfigValues, any>};
}
