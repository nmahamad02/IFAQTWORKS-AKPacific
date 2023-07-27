import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing.service';
import { FinanceService } from 'src/app/services/finance/finance.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  columns: any[];
  columnContactDefs: any[];
  columnContact: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  currentYear = new Date().getFullYear()
  searchValue: any;
  contactlist: any[] = [];
  
  contactlistDataSource = new MatTableDataSource(this.contactlist);  

  constructor(private financeservice: FinanceService, private snackbar: MatSnackBar, private dataSharing: DataSharingService, private router: Router){
    this.columnContact = ["PARTY_ID", "NAME", "MOBILE", "EMAIL_ID", "PCODE", "CUST_NAME", "Actions"];
  }

  ngOnInit() {
    this.financeservice.getParty().subscribe((res: any) => {
      console.log(res)
      this.contactlist = res.recordset;
      this.contactlistDataSource = new MatTableDataSource(this.contactlist);
      this.contactlistDataSource.sort = this.sort;
      this.contactlistDataSource.paginator = this.paginator;
    }, (error: any) => {
      console.log(error);
    });

  }

  quickPartySearch() {
    this.contactlistDataSource.filter = this.searchValue.trim().toLowerCase();
  }

  public gotoContactDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

}