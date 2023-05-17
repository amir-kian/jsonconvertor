import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formula } from 'src/app/Models/Formula.model';
import { FormulaTextArea } from 'src/app/Models/FormulaTextArea.model';
import { FormulaTextAreaValue } from 'src/app/Models/FormulaTextAreaValue';
import { FormulaTextAreaValueProperty } from 'src/app/Models/FormulaTextAreaValueProperty';
import { MyPlaceholder } from 'src/app/Models/MyPlaceholder.model';
import { VouchersDetail } from 'src/app/Models/VouchersDetail.model';
import { ApiService } from 'src/app/services/api.service';


declare function OpenTextModal(): any;
declare function OpenPlaceholderModal(): any;
declare function CloseAllActiveModals(): any;
declare function callSelect2(): any;
declare function changeShowFormula(index: any, text: any): any;
declare function ShowResult(jsonString: any): any;
declare function GetPlaceHoderIndex(): any;
declare function beautifyJSON(): any;
declare function GetVoucherTypeId(): any;
declare function GetAccountHeadId(): any;
declare function GetRowDescription(): any;
declare function SelectChange(): any;
declare function GetFormulaIndex(): any;
declare var $:any;

@Component({
  selector: 'formula-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  formulaId: number | undefined;
  formula: any = {
    voucherTypeId: '',
    orderIndex: '',
    SourceVoucherTypeId: '',
    DebitCreditStatus: '',
    AccountHeadId: '',
    RowDescription: '',
    Conditions: '',
    GroupBy: '',
    OwnerRoleId: '',
    CreatedById: '',
    CreatedAt: '',
    ModifiedById: '',
    ModifiedAt: '',
    IsDeleted: '',
    Formula: ''
  };
  Formula:any|undefined="";
  vocherTypeIdSelectData: any;
  accountHeadSelectData: any;
  rowDescriptionSelectData: any;
  selectFormulaIndex: number = 0;
  FormullaArr: Formula[] = [];
  FormullaName: string = "";
  FormulaErroMessage: string = "";
  ForumlaTextAreaList:FormulaTextArea[]=[]
  UpdateFormulaBaseOnTextArea:boolean=false;
  rightPanelStyle: any = {};

  Resultmessage: string="";
  alertClass: string="";

  
  constructor(private _apiService: ApiService,private route: ActivatedRoute,private router: Router) {}


  ngOnInit() {
    callSelect2();
    this._apiService.GetAllCodeVoucherGroup().subscribe(res => {
      this.vocherTypeIdSelectData = res;
      console.log('vocherTypeIdSelectData:', this.vocherTypeIdSelectData);

    });
    this._apiService.GetAllAccountHeads().subscribe(res => {
      this.accountHeadSelectData = res;
      console.log('accountHeadSelectData:', this.accountHeadSelectData);

    });
    this._apiService.GetAllRowDescription().subscribe(res => {
      this.rowDescriptionSelectData = res;
      console.log('rowDescriptionSelectData:', this.rowDescriptionSelectData);

    });
  }
  ngAfterViewInit(): void {
    debugger;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formulaId = parseInt(id, 10);
      this.loadFormula(this.formulaId)
    }
  }

  loadFormula(FormulaId: number) {
    this._apiService.GetFormula(FormulaId).subscribe(
      result => {
        debugger;
        this.formula = result;
        console.log(' this.formula:', this.formula);
        this.ButifyJson();
        this.onFormulaChange(this.formula.formula);

      },
      error => {
        console.error('Error loading formulas', error);
        // Handle the error here, like displaying an error message
      }
    );
  }
  onFormChange($event:any) {
    debugger;
    console.log('event:',$event);
  }
  onFormulaChange($event:any){
    debugger;
    this.FormullaArr=[];
    console.log('event:',$event);
    const data = JSON.parse($event);
const formulaTextAreasList = data.map(item => new FormulaTextArea(item.Property, new FormulaTextAreaValue(item.Value.Text, item.Value.Properties.map(property => new FormulaTextAreaValueProperty(property.Name)))));

// log the result to the console
console.log('formulaTextAreas:',formulaTextAreasList);
formulaTextAreasList.forEach((item, index) => { 
  var MyPlaceholderList: MyPlaceholder[] = [];
  item.Value.Properties.forEach((it, index) => {
    MyPlaceholderList.push(new MyPlaceholder(index, it.Name))
  });
  var formula = new Formula(index, item.Value.Text, item.Property,MyPlaceholderList);
  this.FormullaArr.push(formula)
      });  
      console.log('this.FormullaArr:',this.FormullaArr);
this.UpdateFormulaBaseOnTextArea=true;

  }


  Update(contactForm: any) {
    debugger;
    console.log('contactForm.value:',contactForm.value);
    if (this.formulaId !== undefined) {
      let myVoucher = new VouchersDetail();
      myVoucher.Id = this.formulaId.toString(),
      myVoucher.VoucherTypeId = contactForm.value.VoucherTypeId,
      myVoucher.OrderIndex = contactForm.value.orderIndex,
      myVoucher.SourceVoucherTypeId = contactForm.value.sourceVoucherTypeId,
      myVoucher.DebitCreditStatus = contactForm.value.debitCreditStatus,
      myVoucher.AccountHeadId = contactForm.value.accountHeadId,
      myVoucher.RowDescription = contactForm.value.rowDescription,
      myVoucher.Conditions = contactForm.value.conditions,
      myVoucher.GroupBy = contactForm.value.groupBy,
      myVoucher.OwnerRoleId = contactForm.value.ownerRoleId,
      myVoucher.CreatedById = contactForm.value.createdById,
      myVoucher.CreatedAt = "2022-02-20 13:08:52.1033333",
      myVoucher.ModifiedById = contactForm.value.modifiedById,
      myVoucher.ModifiedAt = "2022-02-20 13:08:52.1033333",
      myVoucher.IsDeleted = false,
      myVoucher.Formula = contactForm.value.Formula
      const formData =myVoucher;
      console.log('formData:',formData);

      this._apiService.UpdateFormula(formData).subscribe(res => {
        debugger;
        console.log('SaveFormData:', res);
        if (res==true) {
          this.alertClass = 'alert alert-success';
          this.Resultmessage = 'Form data saved successfully';
        } else {
          this.alertClass = 'alert alert-danger';
          this.Resultmessage = 'Error saving form data';
        }
  
      });
    }

    }

    GoBackToList() {
      this.router.navigate(['/list']);
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
    removeFormulaItem() {
      debugger;
      delete this.FormullaArr[this.selectFormulaIndex];
      console.log('this.FormullaArr', this.FormullaArr);
      this.FormullaArr = this.FormullaArr.filter(item => item.Index !== this.selectFormulaIndex);
  
      //removeInput(index);
  
    }
    ngAfterViewChecked() {

        this.FormullaArr.forEach((item, index) => {
          changeShowFormula(index, item.Value);
          this.DedicateAndSetFormula(index);
        });
    
    
  }
    detectRightMouseClick($event: any, index: any) {
      $event.preventDefault();
      debugger;
      var index = $event.target.getAttribute('data-index');
      this.selectFormulaIndex = index;
      if ($event.which === 3) {
        this.rightPanelStyle = {
          'display': 'block',
          'position': 'absolute',
          'left.px': $event.clientX,
          'top.px': $event.clientY,
        }
        console.log('this.rightPanelStyle', this.rightPanelStyle);
      }
    }

    InsertPlaceHolderToFormula(form: any) {
      debugger;
     
      var PlaceholderIndex = Number(GetPlaceHoderIndex());
      var FormulaIndex= GetFormulaIndex();
    console.log('this.FormullaArr:',this.FormullaArr);
     // this.FormullaArr[FormulaIndex].Placeholders.push(new MyPlaceholder(PlaceholderIndex, form.text));
  
  this.FormullaArr[FormulaIndex].Placeholders[PlaceholderIndex-1].Name=form.text;
      console.log('this.FormullaArr', this.FormullaArr);
      //this.FormullaArr[this.selectFormulaIndex].Value += "[]";
      CloseAllActiveModals();
      this.UpdateFormulaTextArea();
    }
    UpdateFormulaTextArea(){
      debugger;
      this.ForumlaTextAreaList=[];
  
      this.FormullaArr.forEach((item, index) => {
        var customFormulaTextAreaValuePropertyList: FormulaTextAreaValueProperty[] = [];
  
        item.Placeholders.forEach(element => {  
   var customFormulaTextAreaValueProperty = new FormulaTextAreaValueProperty(element.Name);
   customFormulaTextAreaValuePropertyList.push(customFormulaTextAreaValueProperty);
        });
  
        var formulaTextAreaValueName=$("#showFormula"+index).text();
         var formulaTextAreaValue = new FormulaTextAreaValue(formulaTextAreaValueName, customFormulaTextAreaValuePropertyList);
         var formulaTextArea = new FormulaTextArea(item.Name, formulaTextAreaValue);
  
  
  
       this.ForumlaTextAreaList.push(formulaTextArea);
  
  
      });
       console.log('ForumlaTextAreaList:',this.ForumlaTextAreaList);
  
       const jsonString = JSON.stringify(this.ForumlaTextAreaList);
       this.formula.formula=jsonString;
       this.ButifyJson();
       this.UpdateFormulaBaseOnTextArea=false;
  
    }
    AlterFormula($event: any) {

      debugger;
       var value = ($event.target).value;
       var index = $event.target.getAttribute("data-index");
       changeShowFormula(index, value);
       this.DedicateAndSetFormula(index);
  
  
    }
  ///بدست آوردن و ست کردن جانگهدارهای یک فرمول
  DedicateAndSetFormula(formulaIndex: any) {
    debugger;
    if (this.FormullaArr[formulaIndex].Placeholders.length==0){
    var famulaText = this.FormullaArr[formulaIndex].Value;
    const regex = /\[.+?\]/g;
    const matches = famulaText.match(regex);
    this.FormullaArr[formulaIndex].Placeholders = [];

    if (matches) {
      matches.forEach((item, index) => {
        this.FormullaArr[formulaIndex].Placeholders.push(new MyPlaceholder(index, item));
      });
    }
    console.log('selected formula is:', this.FormullaArr[formulaIndex]);
    //this.onFormChange(null);
    }
    this.UpdateFormulaTextArea();

  }
  InsertTextToFormula(form: any) {
    debugger;
    this.FormullaArr[this.selectFormulaIndex].Value += form.text;
    console.log('this.FormullaArr', this.FormullaArr);
    CloseAllActiveModals();
  }
  closeContextMenu() {
    this.rightPanelStyle = {
      'display': 'none'
    }
  }
    ButifyJson(){
      var ugly = this.formula.formula;
      var obj = JSON.parse(ugly);
      var pretty = JSON.stringify(obj, undefined, 4);
      this.formula.formula = pretty;
    }


}
