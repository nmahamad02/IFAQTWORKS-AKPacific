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

  postQuotationMaster(quotno: string, quotdate: string, status: string, expdate: string, pcode: string, party: string, custname: string, add1: string, add2: string, add3: string, phone1: string, total: string, discount: string, vatamt: string, gtotal: string, year: string, createduser: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      quotno: quotno,
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
      year: year,
      createduser: createduser
    }

    this.http.post(this.url + '/quot/master/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateQuotationMaster(quotno: string, quotdate: string, status: string, expdate: string, pcode: string, party: string, custname: string, add1: string, add2: string, add3: string, phone1: string, total: string, discount: string, vatamt: string, gtotal: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      quotno: quotno,
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
      gtotal: gtotal
    }

    this.http.post(this.url + '/quot/master/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postQuotationDetails(quotno: string, desc: string, totqty: string, pcode: string, price: string, amount: string, disper: string, disamt: string, taxamt: string, createduser: string, year: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      quotno: quotno,
      pcode: pcode,
      desc: desc,
      totqty: totqty,
      price: price, 
      amount: amount,
      disper: disper,
      disamt: disamt,
      taxamt: taxamt,
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