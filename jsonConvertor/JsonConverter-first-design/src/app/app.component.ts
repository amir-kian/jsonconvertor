import { Component } from '@angular/core';
import { Formula } from './Models/Formula.model';
import { MyPlaceholder } from './Models/MyPlaceholder.model';
import { ApiService } from './services/api.service';
declare function OpenTextModal(): any;
declare function OpenPlaceholderModal(): any;
declare function CloseTextModal(): any;
declare function CloseAllActiveModals(): any;
declare function callSelect2(): any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'JsonConverter';
  selectFormulaIndex: number = 0;
  FormullaArr: Formula[] = [];
  FormullaName: string = "";
  FormulaErroMessage: string = "";
  vocherTypeIdSelectData: any;
  accountHeadSelectData: any;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    debugger;
    this._apiService.GetAllCodeVoucherGroup().subscribe(res => {
      this.vocherTypeIdSelectData = res;
      console.log('vocherTypeIdSelectData:',this.vocherTypeIdSelectData);

    });
    this._apiService.GetAllAccountHeads().subscribe(res => {
      this.accountHeadSelectData = res;
      console.log('accountHeadSelectData:',this.accountHeadSelectData);

    });
    callSelect2();

  }

  createFormulaItem() {
    debugger;
    if (this.FormullaName) {
      if (this.FormullaArr.find((obj) => { return obj.Name == this.FormullaName; })) {
        this.FormulaErroMessage = "نام فرمول نباید تکراری باشد";
        return;
      }

      let createdFormula = '<input type="text" class="form-control">';
      this.FormullaArr.push(new Formula(this.FormullaArr.length, "", this.FormullaName));
      this.FormulaErroMessage = "";
    }
    else {
      this.FormulaErroMessage = "نام فرمول را باید وارد کنید";
    }
  }
  removeFormulaItem(index: any) {
    debugger;
    delete this.FormullaArr[index];
    console.log('this.FormullaArr', this.FormullaArr);
    this.FormullaArr = this.FormullaArr.filter(item => item.Index !== index);

    //removeInput(index);

  }


  OpenAddTextModal(index: number) {
    debugger;
    this.selectFormulaIndex = index;
    OpenTextModal();
  }
  OpenAddPlaceHolderModal(index: number) {
    debugger;
    this.selectFormulaIndex = index;
    OpenPlaceholderModal();
  }
  InsertTextToFormula(form: any) {
    debugger;
    this.FormullaArr[this.selectFormulaIndex].Value += form.text;
    console.log('this.FormullaArr', this.FormullaArr);
    CloseAllActiveModals();
  }
  InsertPlaceHolderToFormula(form: any) {
    debugger;
    this.FormullaArr[this.selectFormulaIndex].Placeholders.push(new MyPlaceholder(this.FormullaArr[this.selectFormulaIndex].Placeholders.length, form.text));
    console.log('this.FormullaArr', this.FormullaArr);
    this.FormullaArr[this.selectFormulaIndex].Value += "[]";
    CloseAllActiveModals();


  }
}//end component
