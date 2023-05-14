import { FormulaTextAreaValueProperty } from "./FormulaTextAreaValueProperty";

export class FormulaTextAreaValue {
  Text: string;
  Properties: FormulaTextAreaValueProperty[] = [];

  constructor(
    Text: string = "0",
    Properties: FormulaTextAreaValueProperty[] = []

  ) {
    this.Text = Text;
    this.Properties = Properties;

  }
}

