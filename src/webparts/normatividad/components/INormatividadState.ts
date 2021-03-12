import { Items } from './Items';  
  
export interface INormatividadState {  
  Items: Items[];  
  search: string;
  validacion : boolean;
}