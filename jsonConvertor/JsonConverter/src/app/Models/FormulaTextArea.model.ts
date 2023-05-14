import { FormulaTextAreaValue } from "./FormulaTextAreaValue";

export class FormulaTextArea {
      Property: string;
      Value: FormulaTextAreaValue;

    constructor(
      Property: string = "",
      Value: FormulaTextAreaValue ,


    ) {
      this.Property = Property;
      this.Value = Value;

    }
  }
  
  