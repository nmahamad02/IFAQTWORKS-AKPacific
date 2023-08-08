import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuotationsService {
  private url = 'http://15.185.46.105:5045/api';
 
  constructor(private http: HttpClient) { }

  getQuotationList() { 
    return this.http.get(this.url + '/quotations')
  }  
  
  getQuotNoFromDoc(year: string) { 
    return this.http.get(this.url + '/quot/doc/' + year)
  }
  getQuotationMaster(quotno: string) { 
    return this.http.get(this.url + '/quot/master/' + quotno)
  }  
  
  getQuotationDetails(quotno: string) { 
    return this.http.get(this.url + '/quot/details/' + quotno)
  }

  postQuotationMaster(quotnbr: string, quotdate: string, status: string, expdate: string, pcode: string, party: string, custname: string, add1: string, add2: string, add3: string, phone1: string, total: string, discount: string, vatamt: string, gtotal: string, subject: string, description: string, remarks: string, year: string, createduser: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      quotno: quotnbr,
      quotdate: quotdate, 
      status: status,
      expdate: expdate,
      pcode: pcode,
      party: party,
      custname: custname,
      add1: add1, 
      add2: add2,
      add3: add3,
      phone1: phone1,
      total: total,
      discount: discount,
      vatamt: vatamt,
      gtotal: gtotal, 
      subject: subject,
      description: description,
      remarks: remarks,
      year: year,
      createduser: createduser
    }

    console.log(newTran)

    this.http.post(this.url + '/quot/master/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }


  updateQuotDocNo(value: string, year: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      value: value,
      year: year
    }

    this.http.post(this.url + '/quot/doc/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateQuotationMaster(quotno: string, status: string, expdate: string, pcode: string, party: string, custname: string, add1: string, add2: string, add3: string, phone1: string, total: string, discount: string, vatamt: string, gtotal: string, subject: string, description: string, remarks: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      quotno: quotno,
      status: status,
      expdate: expdate,
      pcode: pcode,
      party: party,
      custname: custname,
      add1: add1, 
      add2: add2,
      add3: add3,
      phone1: phone1,
      total: total,
      discount: discount,
      vatamt: vatamt,
      gtotal: gtotal,
      subject: subject,
      description: description,
      remarks: remarks
    }

    this.http.post(this.url + '/quot/master/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postQuotationDetails(quotno: string, desc: string, remarks: string, totqty: string, pcode: string, price: string, amount: string, disper: string, disamt: string, taxtype: string, taxper: string, taxamt: string, unittype: string, boqno: string, createduser: string, year: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      quotno: quotno,
      pcode: pcode,
      desc: desc,
      remarks: remarks,
      totqty: totqty,
      price: price, 
      amount: amount,
      disper: disper,
      disamt: disamt,
      taxtype: taxtype,
      taxper: taxper,
      taxamt: taxamt,
      unittype: unittype,
      boqno: boqno,
      createduser: createduser,
      year: year
    }

    this.http.post(this.url + '/quot/details/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  deleteQuotationDetails(quotno: string) { 
    return this.http.get(this.url + '/quot/details/delete/' + quotno)
  }
}