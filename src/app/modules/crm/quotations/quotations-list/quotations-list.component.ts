import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing.service';
import { FinanceService } from 'src/app/services/finance/finance.service';
import { QuotationsService } from 'src/app/services/quotations/quotations.service';

@Component({
  selector: 'app-quotations-list',
  templateUrl: './quotations-list.component.html',
  styleUrls: ['./quotations-list.component.scss']
})
export class QuotationsListComponent implements OnInit {
  columns: any[];
  columnQuotationDefs: any[];
  columnQuotation: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  currentYear = new Date().getFullYear()
  searchValue: any;
  quotlist: any[] = [];
  
  quotlistDataSource = new MatTableDataSource(this.quotlist);  

  constructor(private quotService: QuotationsService, private snackbar: MatSnackBar, private dataSharing: DataSharingService, private router: Router){
    this.columnQuotation = ["QUOTNO", "QUOTDATE", "PCODE", "CUST_NAME", "STATUS", "EXPIRY_DATE", "Actions"];
  }

  ngOnInit() {
    this.quotService.getQuotationList().subscribe((res: any) => {
      this.quotlist = res.recordset;
      this.quotlistDataSource = new MatTableDataSource(this.quotlist);
      this.quotlistDataSource.sort = this.sort;
      this.quotlistDataSource.paginator = this.paginator;
    }, (error: any) => {
      console.log(error);
    });

  }

  quickQuotSearch() {
    this.quotlistDataSource.filter = this.searchValue.trim().toLowerCase();
  }

  public gotoQuotDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

}
