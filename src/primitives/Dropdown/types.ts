import SuggestInterface from "types/SuggestInterface";

export interface DropdownElementInterface extends SuggestInterface {
  level?: number;
  index?: number;
  marginTop?: number;
  data?: any;
  children?: DropdownElementInterface[];
}
