import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  GetAllCodeVoucherGroup(){
    return this._http.get('http://localhost:22675/api/CodeVoucherGroups');
  }
  GetAllAccountHeads(){
    return this._http.get('http://localhost:22675/api/AccountHead/GetAllAccountHeads');

  }
}//end class

