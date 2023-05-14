import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service'
import { Router } from '@angular/router';



@Component({
  selector: 'formula-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
//لیست تمام آیتم های جدول فرمول
  formulas: any;

  constructor(private _apiService: ApiService,private router: Router) { }
  ngOnInit(): void {

    this.GetAll();

  }

  EditItem(formulaId: number) {
    this.router.navigate(['/edit', formulaId]);
  }
  AddItem(){
    this.router.navigate(['/add']);
  }
  DeleteItem(FormulaId: number) {
    debugger;
    if (confirm('Are you sure you want to delete this item?')) {

      this._apiService.DeleteFormula(FormulaId).subscribe(
        response => {
          console.log('Item deleted successfully', response);
          this.GetAll();
        },
        error => {
          console.error('Error deleting item', error);
        }
      );
    }
  }
  GetAll(){
    this._apiService.GetAllFormula().subscribe(res => {
      this.formulas = res;
      console.log('formulas:', this.formulas);

    });
    
  }
  

    



  }



