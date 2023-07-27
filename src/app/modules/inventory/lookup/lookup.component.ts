import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserColumns } from '../../../models/user';
import { Salesman, SalesmanColumns } from '../../../models/salesman';
import { Manufacturer, ManufacturerColumns } from '../../../models/manufacturer';
import { Category, CategoryColumns } from '../../../models/category';
import { Brand, BrandColumns } from '../../../models/brand';
import { Subcategory, SubcategoryColumns } from '../../../models/subcategory';
import { Location, LocationColumns } from '../../../models/location';

import { LookupService } from 'src/app/services/lookup/lookup.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit {
  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<User>();

  salesmanDisplayedColumns: string[] = SalesmanColumns.map((col) => col.key);
  salesmanColumnsSchema: any = SalesmanColumns;
  salesmanList: any[] = [];
  salesmanDataSource = new MatTableDataSource<Salesman>();
  
  manufacturerDisplayedColumns: string[] = ManufacturerColumns.map((col) => col.key);
  manufacturerColumnsSchema: any = ManufacturerColumns;
  manufacturerList: any[] = [];
  manufacturerDataSource = new MatTableDataSource<Manufacturer>();

  categoryDisplayedColumns: string[] = CategoryColumns.map((col) => col.key);
  categoryColumnsSchema: any = CategoryColumns;
  categoryList: any[] = [];
  categoryDataSource = new MatTableDataSource<Category>();
  
  brandDisplayedColumns: string[] = BrandColumns.map((col) => col.key);
  brandColumnsSchema: any = BrandColumns;
  brandList: any[] = [];
  brandDataSource = new MatTableDataSource<Brand>();
  
  subcategoryDisplayedColumns: string[] = SubcategoryColumns.map((col) => col.key);
  subcategoryColumnsSchema: any = SubcategoryColumns;
  subcategoryList: any[] = [];
  subcategoryDataSource = new MatTableDataSource<Subcategory>();
  
  locationDisplayedColumns: string[] = LocationColumns.map((col) => col.key);
  locationColumnsSchema: any = LocationColumns;
  locationList: any[] = [];
  locationDataSource = new MatTableDataSource<Location>();

  constructor(private lookUpService: LookupService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.lookUpService.getUsers().subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = res;
    });  
    this.lookUpService.getSalesman().subscribe((res: any) => {
      console.log(res);
      this.salesmanList = res
      this.salesmanDataSource.data = res;
    });  
    this.lookUpService.getManufacturer().subscribe((res: any) => {
      console.log(res);
      this.manufacturerList = res
      this.manufacturerDataSource.data = res;
    });   
    this.lookUpService.getCategory().subscribe((res: any) => {
      console.log(res);
      this.categoryList = res
      this.categoryDataSource.data = res;
    });  
    this.lookUpService.getBrand().subscribe((res: any) => {
      console.log(res);
      this.brandList = res
      this.brandDataSource.data = res;
    });   
    this.lookUpService.getSubcategory().subscribe((res: any) => {
      console.log(res);
      this.subcategoryList = res
      this.subcategoryDataSource.data = res;
    });   
    this.lookUpService.getLocation().subscribe((res: any) => {
      console.log(res);
      this.locationList = res
      this.locationDataSource.data = res;
    });   
  }

  //Salesmen Functions
  editSalesmenRow(row: Salesman){
    row.isEdit = !row.isEdit
  }

  submitSalesmenRow(row: Salesman) {
    this.lookUpService.getSalesmenDetails(row.SALESMAN_CD).subscribe((res: any) => {
      console.log(res)
      if(res.recordset.length === 0) {
        this.lookUpService.postSalesman(row.SALESMAN_ID,row.SALESMAN_CD,row.NAME,row.MOBILE,row.EMAIL_ID)
        row.isEdit = !row.isEdit
      } else {
        this.lookUpService.updateSalesman(row.SALESMAN_CD,row.NAME,row.MOBILE,row.EMAIL_ID)
        row.isEdit = !row.isEdit
      }
    }, (err: any) => {
      console.log(err)
      this.lookUpService.updateSalesman(row.SALESMAN_CD,row.NAME,row.MOBILE,row.EMAIL_ID)
      row.isEdit = !row.isEdit
    })
  }

  addSalesmenRow() {
    const newRow: Salesman = {
      SALESMAN_ID: this.salesmanList.length + 1,
      SALESMAN_CD: '',
      NAME: '',
      MOBILE: '',
      EMAIL_ID: '',
      isEdit: true
    };
    this.salesmanDataSource.data = [newRow, ...this.salesmanDataSource.data];
  }

  //Manufacturer Functions
  editManufacturerRow(row: Manufacturer){
    row.isEdit = !row.isEdit
  }

  submitManufacturerRow(row: Manufacturer) {
    this.lookUpService.getManufacturerDetails(row.MANUFACTURER_CD).subscribe((res: any) => {
      console.log(res)
      if(res.recordset.length === 0) {
        this.lookUpService.postManufacturer(row.MANUFACTURER_ID,row.MANUFACTURER_CD,row.MANUFACTURER_NAME,row.PHONE1)
        row.isEdit = !row.isEdit
        this._snackBar.open("Data Successfully Inserted!", "OK");
      } else {
        this.lookUpService.updateManufacturer(row.MANUFACTURER_ID,row.MANUFACTURER_CD,row.MANUFACTURER_NAME,row.PHONE1)
        row.isEdit = !row.isEdit
        this._snackBar.open("Data Successfully Updated!", "OK");
      }
    }, (err: any) => {
      console.log(err)
      this.lookUpService.updateManufacturer(row.MANUFACTURER_ID,row.MANUFACTURER_CD,row.MANUFACTURER_NAME,row.PHONE1)
      row.isEdit = !row.isEdit
      this._snackBar.open("Data Successfully Inserted!", "OK");
    })
  }

  addManufacturerRow() {
    const newRow: Manufacturer = {
      MANUFACTURER_ID: this.manufacturerList.length + 1,
      MANUFACTURER_CD: '',
      MANUFACTURER_NAME: '',
      PHONE1: '',
      isEdit: true
    };
    this.manufacturerDataSource.data = [newRow, ...this.manufacturerDataSource.data];
  }

  //Category Functions
  editCategoryRow(row: Category){
    row.isEdit = !row.isEdit
  }

  submitCategoryRow(row: Category) {
    this.lookUpService.getCategoryDetails(row.CATEGORY_ID).subscribe((res: any) => {
      console.log(res)
      if(res.recordset.length === 0) {
        this.lookUpService.postCategory(row.CATEGORY_ID,row.CATEGORY_CD,row.CATEGORY_NAME,row.CATEGORY_DETAILS)
        row.isEdit = !row.isEdit
        this._snackBar.open("Data Successfully Inserted!", "OK");
      } else {
        this.lookUpService.updateCategory(row.CATEGORY_ID,row.CATEGORY_CD,row.CATEGORY_NAME,row.CATEGORY_DETAILS)
        row.isEdit = !row.isEdit
        this._snackBar.open("Data Successfully Updated!", "OK");
      }
    }, (err: any) => {
      console.log(err)
      this.lookUpService.updateCategory(row.CATEGORY_ID,row.CATEGORY_CD,row.CATEGORY_NAME,row.CATEGORY_DETAILS)
      row.isEdit = !row.isEdit
      this._snackBar.open("Data Successfully Inserted!", "OK");
    })
  }

  addCategoryRow() {
    let newCatID = 'C0' + String(this.categoryList.length + 1)
    const newRow: Category = {
      CATEGORY_ID: newCatID,
      CATEGORY_CD: '',
      CATEGORY_NAME: '',
      CATEGORY_DETAILS: '',
      isEdit: true
    };
    this.categoryDataSource.data = [newRow, ...this.categoryDataSource.data];
  }

  //Brand Functions
  editBrandRow(row: Brand){
    row.isEdit = !row.isEdit
  }

  submitBrandRow(row: Brand) {
    this.lookUpService.getBrandDetails(row.BRAND_CD).subscribe((res: any) => {
      console.log(res)
      if(res.recordset.length === 0) {
        this.lookUpService.postBrand(row.BRAND_ID,row.BRAND_CD,row.BRAND_NAME,row.MANUFACTURER_CD)
        row.isEdit = !row.isEdit
        this._snackBar.open("Data Successfully Inserted!", "OK");
      } else {
        this.lookUpService.updateBrand(row.BRAND_ID,row.BRAND_CD,row.BRAND_NAME,row.MANUFACTURER_CD)
        row.isEdit = !row.isEdit
        this._snackBar.open("Data Successfully Updated!", "OK");
      }
    }, (err: any) => {
      console.log(err)
      this.lookUpService.updateBrand(row.BRAND_ID,row.BRAND_CD,row.BRAND_NAME,row.MANUFACTURER_CD)
      row.isEdit = !row.isEdit
      this._snackBar.open("Data Successfully Inserted!", "OK");
    })
    console.log(row)
  }

  addBrandRow() {
    const newRow: Brand = {
      BRAND_ID: this.brandList.length + 1,
      BRAND_CD: '',
      BRAND_NAME: '',
      MANUFACTURER_CD: '',
      isEdit: true
    };
    this.brandDataSource.data = [newRow, ...this.brandDataSource.data];
  }
  
  //Subcategory Functions
  editSubcategoryRow(row: Subcategory){
    row.isEdit = !row.isEdit
  }

  submitSubcategoryRow(row: Subcategory) {
    this.lookUpService.getSubcategoryDetails(row.SUBCATEGORY_CD).subscribe((res: any) => {
      console.log(res)
      if(res.recordset.length === 0) {
        this.lookUpService.postSubcategory(String(row.SUBCATEGORY_ID),row.SUBCATEGORY_CD,row.SUBCATEGORY_NAME,row.SUBCATEGORY_DESCRIPTION,row.CATEGORY_ID)
        row.isEdit = !row.isEdit
        this._snackBar.open("Data Successfully Inserted!", "OK");
      } else {
        this.lookUpService.updateSubcategory(String(row.SUBCATEGORY_ID),row.SUBCATEGORY_CD,row.SUBCATEGORY_NAME,row.SUBCATEGORY_DESCRIPTION,row.CATEGORY_ID)
        row.isEdit = !row.isEdit
        this._snackBar.open("Data Successfully Updated!", "OK");
      }
    }, (err: any) => {
      console.log(err)
      this.lookUpService.updateSubcategory(String(row.SUBCATEGORY_ID),row.SUBCATEGORY_CD,row.SUBCATEGORY_NAME,row.SUBCATEGORY_DESCRIPTION,row.CATEGORY_ID)
      row.isEdit = !row.isEdit
      this._snackBar.open("Data Successfully Inserted!", "OK");
    })
    console.log(row)
  }

  addSubcategoryRow() {
    const newRow: Subcategory = {
      SUBCATEGORY_ID: this.subcategoryList.length + 1,
      SUBCATEGORY_CD: '',
      SUBCATEGORY_NAME: '',
      SUBCATEGORY_DESCRIPTION: '',
      CATEGORY_ID: '',
      isEdit: true
    };
    this.subcategoryDataSource.data = [newRow, ...this.subcategoryDataSource.data];
  }
  
  //Location Functions
  editLocationRow(row: Location){
    row.isEdit = !row.isEdit
  }

  submitLocationRow(row: Location) {
    this.lookUpService.getLocationDetails(row.LOCATIONID).subscribe((res: any) => {
      console.log(res)
      if(res.recordset.length === 0) {
        this.lookUpService.postLocation(row.LOCATIONID,row.LOCATIONNAME)
        row.isEdit = !row.isEdit
        this._snackBar.open("Data Successfully Inserted!", "OK");
      } else {
        this.lookUpService.updateLocation(row.LOCATIONID,row.LOCATIONNAME)
        row.isEdit = !row.isEdit
        this._snackBar.open("Data Successfully Updated!", "OK");
      }
    }, (err: any) => {
      console.log(err)
      this.lookUpService.updateLocation(row.LOCATIONID,row.LOCATIONNAME)
      row.isEdit = !row.isEdit
      this._snackBar.open("Data Successfully Inserted!", "OK");
    })
    console.log(row)
  }

  addLocationRow() {
    const newRow: Location = {
      LOCATIONID: '',
      LOCATIONNAME: '',
      isEdit: true
    };
    this.locationDataSource.data = [newRow, ...this.locationDataSource.data];
  }
}
