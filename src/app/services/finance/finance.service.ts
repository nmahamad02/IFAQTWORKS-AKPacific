import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private url = 'http://15.185.46.105:5045/api';
 
  constructor(private http: HttpClient) { }

  getCustomerList(fyear: string) { 
    return this.http.get(this.url + '/coa/getCustomerAcc/' + fyear)
  }

  getCustomerDetailFromPcode(fyear: string, pcode: string) {
    return this.http.get(this.url + '/coa/getCustomerDetailFromPcode/' + fyear + '/' + pcode)
  }

  getSupplierList(fyear: string) { 
    return this.http.get(this.url + '/coa/getSupplierAcc/' + fyear)
  }

  getSupplierDetailFromPcode(fyear: string, pcode: string) {
    return this.http.get(this.url + '/coa/getSupplierDetailFromPcode/' + fyear + '/' + pcode)
  }

  getCustomerCount(){
    return this.http.get(this.url + '/coa/getCustomerCount')
  }    
  
  searchCustomer(code: string){
    return this.http.get(this.url + '/coa/searchCustomer/' + code)
  }  

  getParty(){
    return this.http.get(this.url + '/coa/getParty')
  }  

  getMaxParty(){
    return this.http.get(this.url + '/coa/getMaxParty')
  } 
  
  getPartyDetailFromPCODE(pcode: string){
    return this.http.get(this.url + '/coa/getPartyDetailFromPCODE/' + pcode)
  }  
  
  getPartyDetailFromPartyId(partyid: string){
    return this.http.get(this.url + '/coa/getPartyDetailFromPartyId/' + partyid)
  }

  postOPBAL(pcode: string, cname: string, cpr: string, type: string, add1: string, add2: string, add3: string, phone1: string, phone2: string, email: string, status: string, year: string, taxNo: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      pcode: pcode,
      name: cname, 
      cpr: cpr,
      type: type,
      add1: add1,
      add2: add2,
      add3: add3,
      phone1: phone1,
      phone2: phone2, 
      email: email,
      status: status,
      year: year,
      taxNo: taxNo
    }

    this.http.post(this.url + '/coa/opbal/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateOPBAL(pcode: string, cname: string, cpr: string, type: string, add1: string, add2: string, add3: string, phone1: string, phone2: string, email: string, status: string, year: string, taxNo: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      pcode: pcode,
      name: cname, 
      cpr: cpr,
      type: type,
      add1: add1,
      add2: add2,
      add3: add3,
      phone1: phone1,
      phone2: phone2, 
      email: email,
      status: status,
      year: year,
      taxNo: taxNo
    }

    this.http.post(this.url + '/coa/opbal/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postContact(partyid: string, name: string, type: string, add1: string, add2: string, add3: string, phone1: string, phone2: string, email: string, pcode: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      pcode: pcode,
      name: name, 
      type: type,
      add1: add1,
      add2: add2,
      add3: add3,
      phone1: phone1,
      phone2: phone2, 
      email: email,
      partyid: partyid,
    }

    this.http.post(this.url + '/coa/contact/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateContact(partyid: string, name: string, type: string, add1: string, add2: string, add3: string, phone1: string, phone2: string, email: string, pcode: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      pcode: pcode,
      name: name, 
      type: type,
      add1: add1,
      add2: add2,
      add3: add3,
      phone1: phone1,
      phone2: phone2, 
      email: email,
      partyid: partyid,
    }

    this.http.post(this.url + '/coa/contact/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  getTaxCategory(){
    return this.http.get(this.url + '/coa/getTaxCategory')
  }  

}

    