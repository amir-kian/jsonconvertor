import { MyPlaceholder } from "./MyPlaceholder.model";

export class Formula {
      Index: number;
      Value: string;
      Name :string;
      Placeholders: MyPlaceholder[] = [];

    constructor(
      Index: number = 0,
      Value: string = "",
      Name:string="",

    ) {
      this.Index = Index;
      this.Value = Value;
      this.Name=Name

    }
  }
  
  