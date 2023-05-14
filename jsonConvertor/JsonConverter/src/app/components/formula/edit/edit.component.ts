import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VouchersDetail } from 'src/app/Models/VouchersDetail.model';
import { ApiService } from 'src/app/services/api.service';
declare var $:any;
declare function callSelect2(): any;
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
  vocherTypeIdSelectData: any;
  accountHeadSelectData: any;
  rowDescriptionSelectData: any;

  constructor(private _apiService: ApiService,private route: ActivatedRoute) {}


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
        console.log('SaveFormData:', res);
  
      });
    }



    }
    ButifyJson(){
      var ugly = this.formula.formula;
      var obj = JSON.parse(ugly);
      var pretty = JSON.stringify(obj, undefined, 4);
      this.formula.formula = pretty;
    }


}
