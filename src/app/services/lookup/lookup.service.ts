import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Salesman } from '../../models/salesman';
import { Manufacturer } from '../../models/manufacturer';
import { Category } from '../../models/category';
import { Brand } from '../../models/brand';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private serviceUrl = 'https://dummyjson.com/users'
  private url = 'http://15.185.46.105:5045/api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.serviceUrl).pipe<User[]>(map((data: any) => data.users));
  }

  updateUser(user: User) {
    return this.http.patch<User>(`${this.serviceUrl}/${user.id}`, user);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.serviceUrl}/add`, user);
  }

  getSalesman(){
    return this.http.get(this.url + '/lookup/salesman').pipe<Salesman[]>(map((data: any) => data.recordset));
  }

  getSalesmenDetails(code:string){
    return this.http.get(this.url + '/lookup/salesman/check/' + code)
  }

  postSalesman(salesmanId: number, salesmanCode: string, salesmanName: string, mobile: string, emailId: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      salesmanId: salesmanId,
      salesmanCode: salesmanCode,
      salesmanName: salesmanName, 
      mobile: mobile,
      emailId: emailId,
    }

    this.http.post(this.url + '/lookup/salesman/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateSalesman(salesmanCode: string, salesmanName: string, mobile: string, emailId: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      salesmanCode: salesmanCode,
      salesmanName: salesmanName, 
      mobile: mobile,
      emailId: emailId,
      
    }

    this.http.post(this.url + '/lookup/salesman/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  getManufacturer(){
    return this.http.get(this.url + '/lookup/manufacturer').pipe<Manufacturer[]>(map((data: any) => data.recordset));
  }

  getManufacturerDetails(code:string){
    return this.http.get(this.url + '/lookup/manufacturer/check/' + code)
  }

  postManufacturer(manufacturerId: number, manufacturerCode: string, manufacturerName: string, mobile: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      manufacturerId: manufacturerId,
      manufacturerCode: manufacturerCode,
      manufacturerName: manufacturerName, 
      mobile: mobile,
    }

    this.http.post(this.url + '/lookup/manufacturer/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateManufacturer(manufacturerId: number, manufacturerCode: string, manufacturerName: string, mobile: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      manufacturerId: manufacturerId,
      manufacturerCode: manufacturerCode,
      manufacturerName: manufacturerName, 
      mobile: mobile,
    }

    this.http.post(this.url + '/lookup/manufacturer/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }


  getCategory(){
    return this.http.get(this.url + '/lookup/category').pipe<Category[]>(map((data: any) => data.recordset));
  }

  getCategoryDetails(code:string){
    return this.http.get(this.url + '/lookup/category/check/' + code)
  }

  postCategory(categoryId: string, categoryCode: string, categoryName: string, categoryDetails: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      categoryId: categoryId,
      categoryCode: categoryCode,
      categoryName: categoryName, 
      categoryDetails: categoryDetails,
    }

    this.http.post(this.url + '/lookup/category/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateCategory(categoryId: string, categoryCode: string, categoryName: string, categoryDetails: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      categoryId: categoryId,
      categoryCode: categoryCode,
      categoryName: categoryName, 
      categoryDetails: categoryDetails,
    }

    this.http.post(this.url + '/lookup/category/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  getBrand(){
    return this.http.get(this.url + '/lookup/brand').pipe<Brand[]>(map((data: any) => data.recordset));
  }

  getBrandDetails(code:string){
    return this.http.get(this.url + '/lookup/brand/check/' + code)
  }

  postBrand(brandId: number, brandCode: string, brandName: string, manufacturerCd: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      brandId: brandId,
      brandCode: brandCode,
      brandName: brandName, 
      manufacturerCd: manufacturerCd,
    }

    this.http.post(this.url + '/lookup/brand/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateBrand(brandId: number, brandCode: string, brandName: string, manufacturerCd: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      brandId: brandId,
      brandCode: brandCode,
      brandName: brandName, 
      manufacturerCd: manufacturerCd,
    }

    this.http.post(this.url + '/lookup/brand/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  getSubcategory(){
    return this.http.get(this.url + '/lookup/subcategory').pipe<Brand[]>(map((data: any) => data.recordset));
  }

  getSubcategoryDetails(code:string){
    return this.http.get(this.url + '/lookup/subcategory/check/' + code)
  }  
  
  getSubcategoryDetailsFromCategory(code:string){
    return this.http.get(this.url + '/lookup/subcategory/category/' + code)
  }

  postSubcategory(subcategoryId: string, subcategoryCode: string, subcategoryName: string, subcategoryDetails: string, categoryId: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      subcategoryId: subcategoryId,
      subcategoryCode: subcategoryCode,
      subcategoryName: subcategoryName, 
      subcategoryDetails: subcategoryDetails,
      categoryId: categoryId
    }

    this.http.post(this.url + '/lookup/subcategory/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateSubcategory(subcategoryId: string, subcategoryCode: string, subcategoryName: string, subcategoryDetails: string, categoryId: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      subcategoryId: subcategoryId,
      subcategoryCode: subcategoryCode,
      subcategoryName: subcategoryName, 
      subcategoryDetails: subcategoryDetails,
      categoryId: categoryId
    }
    this.http.post(this.url + '/lookup/subcategory/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  getLocation(){
    return this.http.get(this.url + '/lookup/location').pipe<Brand[]>(map((data: any) => data.recordset));
  }

  getLocationDetails(code:string){
    return this.http.get(this.url + '/lookup/location/check/' + code)
  }

  postLocation(locationId: string, locationName: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      locationId: locationId,
      locationName: locationName,
    }

    this.http.post(this.url + '/lookup/location/new', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateLocation(locationId: string, locationName: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      locationId: locationId,
      locationName: locationName,
    }

    this.http.post(this.url + '/lookup/location/update', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }


}
