import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  columns: any[];
  columnProductDefs: any[];
  columnProduct: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  currentYear = new Date().getFullYear()
  searchValue: any;
  productlist: any[] = [];
  
  productlistDataSource = new MatTableDataSource(this.productlist);  

  constructor(private productService: ProductsService, private snackbar: MatSnackBar, private dataSharing: DataSharingService, private router: Router){
    this.columnProduct = ["PCODE", "DESCRIPTION", "BARCODE", "Actions"];
  }

  ngOnInit() {
    this.productService.getProductList(String(this.currentYear)).subscribe((res: any) => {
      this.productlist = res.recordset;
      this.productlistDataSource = new MatTableDataSource(this.productlist);
      this.productlistDataSource.sort = this.sort;
      this.productlistDataSource.paginator = this.paginator;
    }, (error: any) => {
      console.log(error);
    });

  }

  quickproductSearch() {
    this.productlistDataSource.filter = this.searchValue.trim().toLowerCase();
  }

  public gotoProductDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

}
