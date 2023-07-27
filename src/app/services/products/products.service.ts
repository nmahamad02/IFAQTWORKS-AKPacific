import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'http://15.185.46.105:5045/api';
 
  constructor(private http: HttpClient) { }

  getProductList(year: string) { 
    return this.http.get(this.url + '/products/' + year)
  }

  getProduct(pcode: string, year: string) { 
    return this.http.get(this.url + '/product/' + pcode + '/' + year)
  }  
  
  getLocationWiseProduct(pcode: string, year: string) { 
    return this.http.get(this.url + '/product/location/stock/' + pcode + '/' + year)
  }  
  
  checkLocationWiseProduct(pcode: string, year: string, locid: string) { 
    return this.http.get(this.url + '/product/location/stock/' + pcode + '/' + locid + '/' + year)
  }

  postProduct(pcode: string, description: string, subCatId: string, costPrice: string, retailPrice: string, barcode: string, manufacturerId: string, reorder: string, supplierId: string, qoh: string, year: string, dealerPrice: string, remarks: string, qoo: string, brand: string, model: string, dealer: string, desc4: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      pcode: pcode,
      description: description, 
      subCatId: subCatId,
      costPrice: costPrice,
      retailPrice: retailPrice,
      barcode: barcode,
      manufacturerId: manufacturerId,
      reorder: reorder,
      supplierId: supplierId,
      qoh: qoh, 
      year: year,
      dealerPrice: dealerPrice,
      remarks: remarks,
      qoo: qoo,
      brand: brand,
      model: model,
      dealer: dealer,
      desc4: desc4
    }

    this.http.post(this.url + '/product/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateProduct(pcode: string, description: string, subCatId: string, costPrice: string, retailPrice: string, barcode: string, manufacturerId: string, reorder: string, supplierId: string, qoh: string, year: string, dealerPrice: string, remarks: string, qoo: string, brand: string, model: string, dealer: string, desc4: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      pcode: pcode,
      description: description, 
      subCatId: subCatId,
      costPrice: costPrice,
      retailPrice: retailPrice,
      barcode: barcode,
      manufacturerId: manufacturerId,
      reorder: reorder,
      supplierId: supplierId,
      qoh: qoh, 
      year: year,
      dealerPrice: dealerPrice,
      remarks: remarks,
      qoo: qoo,
      brand: brand,
      model: model,
      dealer: dealer,
      desc4: desc4
    }


    this.http.post(this.url + '/product/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postProductLocations(pcode: string, locid: string, opeQty: string, year: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      pcode: pcode,
      locid: locid, 
      opeQty: opeQty,
      year: year
    }

    this.http.post(this.url + '/product/locations/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateProductLocations(pcode: string, locid: string, opeQty: string, year: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      pcode: pcode,
      locid: locid, 
      opeQty: opeQty,
      year: year
    }

    this.http.post(this.url + '/product/locations/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  getProductDocuments(pcode: string, type: string) { 
    return this.http.get(this.url + '/product/documents/' + pcode + '/' + type)
  }  

  postProductDocuments(pcode: string, documentname: string, documenttype: string, filetype: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      pcode: pcode,
      documentname: documentname, 
      documenttype: documenttype,
      filetype: filetype
    }

    this.http.post(this.url + '/product/documents/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  deleteProductDocument(pcode: string, type: string) { 
    return this.http.get(this.url + '/product/documents/delete/' + pcode + '/' + type)
  }
}

