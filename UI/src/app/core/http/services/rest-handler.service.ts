import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConfigurableModel, IModuleConfigValues } from '../models/i-config';
import { RestHandles } from '../models/i-rest-service-provider';
import { cloneDeep } from 'lodash';


export interface IRestHandlerService<IModuleConfigValues, Model> {
  /**
   * Configure rest service and map API endpoints
   * @param variables Module variables
   */
  configureForUse(variables: IModuleConfigValues): void;
  /**
   * Get All
   */
  getAll(): Observable<Model[]>;
  /**
   * Create (POST)
   * @param entity
   */
  create(entity: Model): Observable<Model>;
  /**
   * Update (PUT)
   * @param entity
   */
  update(entity: Model): Observable<Model>;
  /**
   * Delete (DELETE)
   */
  delete(): Observable<Model>;
}

/**
 * Generic rest handler service.
 * Can be configured through module variables. This service should be injected through a module so it can be singleton to that module.
 */
export class RestHandlerService<configureVariables extends IModuleConfigValues, Model>
  implements IRestHandlerService<configureVariables, Model> {
  private baseUrl = 'https://localhost:44325/api/';
  protected currentVariables: configureVariables;
  private urls: RestHandles;
  constructor(private http: HttpClient, private configurator?: IConfigurableModel<configureVariables, Model>) {
  }


   configureForUse(variables: configureVariables): void {
     // Copy module variables
    this.currentVariables = cloneDeep(variables);
    if (this.configurator !== undefined) {
      // Build endpoints through delegate
      // Create, Update, delete and fetch (getAll)
      const handles: RestHandles = {
        create: this.configurator.endPoints.create !== undefined ?
          this.configurator.endPoints.create(variables, this.baseUrl) : undefined,
        update: this.configurator.endPoints.update !== undefined ?
          this.configurator.endPoints.update(variables, this.baseUrl) : undefined,
        delete: this.configurator.endPoints.delete !== undefined ?
          this.configurator.endPoints.delete(variables, this.baseUrl) : undefined,
        getAll: this.configurator.endPoints.getAll(variables, this.baseUrl),
      };
      // API endpoints
      this.urls = handles;
      return;
    }
    throw new Error(`${this.configurator.model.name} is not configured for restful services`);
  }
  // Get all
  public getAll(): Observable<Model[]> {
    return this.http.get<Model[]>(this.urls.getAll);
  }
  // Add
  public create(entity: Model): Observable<Model> {
    return this.http.post<Model>(this.urls.create, entity);
  }

  // Add
  public update(entity: Model): Observable<Model> {
    return this.http.put<Model>(this.urls.update, entity);
  }

  public delete(): Observable<Model> {
    return this.http.delete<Model>(this.urls.delete);
  }
}
