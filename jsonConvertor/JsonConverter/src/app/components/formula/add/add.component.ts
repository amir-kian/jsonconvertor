import { Component, OnInit } from '@angular/core';
import { Formula } from '../../../Models/Formula.model';
import { MyPlaceholder } from '../../../Models/MyPlaceholder.model';
import { ApiService } from '../../../services/api.service'
import { NgForm, NgModel, UntypedFormControl ,FormsModule} from '@angular/forms';
import { VouchersDetail } from '../../../Models/VouchersDetail.model';
import { FormulaTextArea } from 'src/app/Models/FormulaTextArea.model';
import { FormulaTextAreaValue } from 'src/app/Models/FormulaTextAreaValue';
import { FormulaTextAreaValueProperty } from 'src/app/Models/FormulaTextAreaValueProperty';
import { Router } from '@angular/router';


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
  selector: 'formula-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {




  title = 'JsonConverter';
  selectFormulaIndex: number = 0;
  FormullaArr: Formula[] = [];
  FormullaName: string = "";
  FormulaErroMessage: string = "";
  vocherTypeIdSelectData: any;
  accountHeadSelectData: any;
  rowDescriptionSelectData: any;
  ForumlaTextAreaList:FormulaTextArea[]=[]
  UpdateFormulaBaseOnTextArea:boolean=false;
  Resultmessage: string="";
  alertClass: string="";



  //add contextmenu
  rightPanelStyle: any = {};
  searchVal: string = '';
  //userList:userObj[];
  isAlert: boolean = false;
  //k result:Observerable<any[]>;
  search: UntypedFormControl = new UntypedFormControl("");
  /*fields*/
  OrderIndex: string | undefined;
  VoucherTypeId: string | undefined;
  SourceVoucherTypeId: string | undefined;
  IsDeleted: boolean | undefined;
  DebitCreditStatus:string | undefined;
  AccountHeadId:string|undefined;
  RowDescription:string|undefined;
  Conditions:string|undefined;
  GroupBy:string|undefined;
  OwnerRoleId:string|undefined;
  CreatedById:string|undefined;
  CreatedAt:string|undefined;
  ModifiedById:string|undefined;
  ModifiedAt:string|undefined;
  selectedVoucherTypeId:string|undefined;
  Formula:any|undefined="";
  FormulaIndex:any|undefined;


  /*End fields*/

  constructor(private _apiService: ApiService,private router: Router) { }



  ngOnInit() {
    debugger;

    $(".select2").on("change", (evt) => {
       
      debugger;
   
      this.VoucherTypeId= $("#VoucherTypeId").val()    ; 
      this.AccountHeadId=    $("#AccountHeadId").val();
      this.RowDescription=    $("#RowDescription").val();
        
   this.onFormChange(evt)
  });

    
 //  SelectChange().then(()=>{alert('sfdsf')});
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
    callSelect2();
    this.closeContextMenu();

  }
  onShow() {
    alert('Show button clicked!');
  }
  
  
  onFormChange($event:any) {
    debugger;
    this.ButifyJson();
    console.log('event:',$event);
    console.log('this.OrderIndex:', this.OrderIndex);
    
    var contactForm = {
      value:{
        Id: "string",
        VoucherTypeId: this.VoucherTypeId,
        OrderIndex: this.OrderIndex,
        SourceVoucherTypeId: this.SourceVoucherTypeId,
        DebitCreditStatus: this.DebitCreditStatus,
        AccountHeadId: this.AccountHeadId,
        RowDescription: this.RowDescription,
        Conditions: this.Conditions,
        GroupBy: this.GroupBy,
        OwnerRoleId: this.OwnerRoleId,
        CreatedById: this.CreatedById,
        CreatedAt: this.CreatedAt,
        ModifiedById: this.ModifiedById,
        ModifiedAt: this.ModifiedAt,
        IsDeleted: this.IsDeleted,
        Formula: this.FormullaArr

      }
    }
//    this.map(contactForm);
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
  ngAfterViewChecked() {
      if(this.UpdateFormulaBaseOnTextArea){
        this.FormullaArr.forEach((item, index) => {
          changeShowFormula(index, item.Value);
          this.DedicateAndSetFormula(index);
        });
      }
    
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

  closeContextMenu() {
    this.rightPanelStyle = {
      'display': 'none'
    }
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


  OpenAddTextModal(index: number) {
    debugger;
    this.selectFormulaIndex = index;
    OpenTextModal();
  }
  OpenAddPlaceHolderModal() {
    debugger;
    this.selectFormulaIndex = this.selectFormulaIndex;
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
     this.Formula=jsonString;
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
  map(contactForm: any) {
    debugger;
    let myVoucher = new VouchersDetail();
    let formullItems: any = [];
    this.FormullaArr.forEach((item, index) => {
      let newFormula = {
        "Property": item.Name,
        "Value": {

          "text": item.Value,
          "Properties": {

            "name": item.Placeholders[index].Name,
          }
        }
      }
      formullItems.push(newFormula);
    });

    myVoucher.Id = contactForm.value.Id,
      myVoucher.VoucherTypeId = contactForm.value.VoucherTypeId,
      myVoucher.OrderIndex = contactForm.value.OrderIndex,
      myVoucher.SourceVoucherTypeId = contactForm.value.SourceVoucherTypeId,
      myVoucher.DebitCreditStatus = contactForm.value.DebitCreditStatus,
      myVoucher.AccountHeadId = contactForm.value.AccountHeadId,
      myVoucher.RowDescription = contactForm.value.RowDescription,
      myVoucher.Conditions = contactForm.value.Conditions,
      myVoucher.GroupBy = contactForm.value.GroupBy,
      myVoucher.OwnerRoleId = contactForm.value.OwnerRoleId,
      myVoucher.CreatedById = contactForm.value.CreatedById,
      myVoucher.CreatedAt = contactForm.value.CreatedAt,
      myVoucher.ModifiedById = contactForm.value.ModifiedById,
      myVoucher.ModifiedAt = contactForm.value.ModifiedAt,
      myVoucher.IsDeleted = contactForm.value.IsDeleted,
      myVoucher.Formula = formullItems

    ShowResult(JSON.stringify(myVoucher));

    beautifyJSON();

  }

  Save(contactForm: any) {
    debugger;
    console.log('contactForm.value:',contactForm.value);
    let myVoucher = new VouchersDetail();
      myVoucher.Id = contactForm.value.Id,
      myVoucher.VoucherTypeId = contactForm.value.VoucherTypeId,
      myVoucher.OrderIndex = contactForm.value.OrderIndex,
      myVoucher.SourceVoucherTypeId = contactForm.value.SourceVoucherTypeId,
      myVoucher.DebitCreditStatus = contactForm.value.DebitCreditStatus,
      myVoucher.AccountHeadId = contactForm.value.AccountHeadId,
      myVoucher.RowDescription = contactForm.value.RowDescription,
      myVoucher.Conditions = contactForm.value.Conditions,
      myVoucher.GroupBy = contactForm.value.GroupBy,
      myVoucher.OwnerRoleId = contactForm.value.OwnerRoleId,
      myVoucher.CreatedById = contactForm.value.CreatedById,
      myVoucher.CreatedAt = "2022-02-20 13:08:52.1033333",
      myVoucher.ModifiedById = contactForm.value.ModifiedById,
      myVoucher.ModifiedAt = "2022-02-20 13:08:52.1033333",
      myVoucher.IsDeleted = false,
      myVoucher.Formula = contactForm.value.Formula

      const formData =myVoucher;
      console.log('formData:',formData);

      this._apiService.SaveFormData(formData).subscribe(res => {
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
    GoBackToList() {
      this.router.navigate(['/list']);
    }
    ButifyJson(){
      try {
        var ugly = this.Formula;
        var obj = JSON.parse(ugly);
        var pretty = JSON.stringify(obj, undefined, 4);
        this.Formula = pretty;
      }
      catch(error) {
        if (error instanceof SyntaxError && error.message.includes('Unexpected end of JSON input')) {
       //   console.error('Error: JSON input is incomplete or empty.');
       console.log('Error: JSON input is incomplete or empty.');
        } else {
          console.log(error);
        }
      }
    }
  


}
