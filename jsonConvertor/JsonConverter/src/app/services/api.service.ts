import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  GetAllFormula(){
    return this._http.get('http://localhost:22675/api/Furmula/GetAllFormula');
  }
  GetFormula(FormulaId: number){
    return this._http.get<any>(`http://localhost:22675/api/Furmula/GetFormula/${FormulaId}`);
  }

  GetAllCodeVoucherGroup(){
    return this._http.get('http://localhost:22675/api/CodeVoucherGroups');
  }
  GetAllAccountHeads(){
    return this._http.get('http://localhost:22675/api/AccountHead/GetAllAccountHeads');
  }
  GetAllRowDescription(){
    return this._http.get('http://localhost:22675/api/Furmula/GetAllRowDescription');
  }
  SaveFormData(formData: any) {
    return this._http.post<any>('http://localhost:22675/api/Furmula/AddFormula', formData);
  }
  UpdateFormula(formula: any): Observable<boolean> {
    return this._http.put<boolean>('http://localhost:22675/api/Furmula/UpdateFormula', formula);
  }
  DeleteFormula(FormulaId: number) {
    return this._http.delete<boolean>(`http://localhost:22675/api/Furmula/DeleteFormula?FormulaId=${FormulaId}`);
  }

}//end class

