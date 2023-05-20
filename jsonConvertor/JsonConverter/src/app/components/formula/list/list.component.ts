import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service'
import { Router } from '@angular/router';

declare function filterTable($event:any): any;

@Component({
  selector: 'formula-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
//لیست تمام آیتم های جدول فرمول
  formulas: any;
 tableId!: string;
 filterColumn: number | undefined;
 placeholder: string = "Filter";

  filterValue: string = "";
  sortDirection = 'asc';
  sortColumn:string = '';



  constructor(private _apiService: ApiService,private router: Router) { }
  ngOnInit(): void {

    this.GetAll();

  }
  
  sort(column: string) {
    debugger;
    if (this.sortColumn === column) {
      // If the clicked column is already the current sort column, toggle the sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If the clicked column is a new sort column, set it as the current sort column and reset the sort direction to 'asc'
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  
    // Create a copy of the data before sorting
    const sortedData = [...this.formulas];
  
    // Sort the data based on the current sort column and direction
    sortedData.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  
    // Assign the sorted data back to the original array
    this.formulas = sortedData;
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

  LogicalDeleteFormula(FormulaId: number) {
    debugger;
    if (confirm('Are you sure you want to delete this item?')) {

      this._apiService.LogicalDeleteFormula(FormulaId).subscribe(
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
  filterTable($event:any){
    const value = $event.target.value;

    filterTable(value);
  }


  
  

    



  }



