import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from 'src/app/services/finance/finance.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  @ViewChild('custLookupDialog', { static: false }) custLookupDialog!: TemplateRef<any>;
  custArr: any[] = [];
  selectedRowIndex: any = 0;

  currentYear = new Date().getFullYear()

  custDisplayedColumns: string[] = ["PCODE", "CUST_NAME", "TAX_1_NO"];
  custDataSource = new MatTableDataSource(this.custArr);

  public contactForm: FormGroup;

  constructor(private financeService: FinanceService, private route: ActivatedRoute, private dialog: MatDialog, private _snackBar: MatSnackBar) { 
    this.contactForm = new FormGroup({
      pcode: new FormControl('', [ Validators.required]),
      custName: new FormControl('', [ Validators.required]),
      custCR: new FormControl('', [ Validators.required]),
      custStatus: new FormControl('', [ Validators.required]),
      custTaxNo: new FormControl('', [ Validators.required]),
      custPhone1: new FormControl('', [ Validators.required]),
      custPhone2: new FormControl('', [ Validators.required]),
      custEmail: new FormControl('', [ Validators.required]),
      custAdd1: new FormControl('', [ Validators.required]),
      custAdd2: new FormControl('', [ Validators.required]),
      custAdd3: new FormControl('', [ Validators.required]),
      contactId: new FormControl('', [ Validators.required]),
      contactPerson: new FormControl('', [ Validators.required]),
      contactPhone1: new FormControl('', [ Validators.required]),
      contactPhone2: new FormControl('', [ Validators.required]),
      contactEmail: new FormControl('', [ Validators.required]),
      contactAddress1: new FormControl('', [ Validators.required]),
      contactAddress2: new FormControl('', [ Validators.required]),
      contactAddress3: new FormControl('', [ Validators.required]),
      cType: new FormControl('', [ Validators.required]),      
    });
  }

  ngOnInit() {
    if (this.route.snapshot.params.id === 'new') {
      this.newForm()
    } else {
      this.getData(this.route.snapshot.params.id)
    }
  }

  getData(partyid: string) {
    this.refreshForm()
    this.financeService.getPartyDetailFromPartyId(partyid).subscribe((res: any) => {
      console.log(res)
      this.financeService.getCustomerDetailFromPcode(String(this.currentYear),res.recordset[0].PCODE).subscribe((resp: any) => {
        console.log(resp)
        this.contactForm.patchValue({
          pcode: res.recordset[0].PCODE,
          custName: resp.recordset[0].CUST_NAME,
          custCR: resp.recordset[0].CR_CPR,
          custStatus: resp.recordset[0].STATUS,
          custTaxNo: resp.recordset[0].TAX_1_NO,
          custPhone1: resp.recordset[0].PHONE1,
          custPhone2: resp.recordset[0].PHONE2,
          custEmail: resp.recordset[0].EMAIL,
          custAdd1: resp.recordset[0].ADD1,
          custAdd2: resp.recordset[0].ADD2,
          custAdd3: resp.recordset[0].ADD3,
          contactId: res.recordset[0].PARTY_ID,
          contactPerson: res.recordset[0].NAME,
          contactPhone1: res.recordset[0].PHONE1,
          contactPhone2: res.recordset[0].PHONE2,
          contactEmail: res.recordset[0].EMAIL_ID,
          contactAddress1: res.recordset[0].ADD1,
          contactAddress2: res.recordset[0].ADD2,
          contactAddress3: res.recordset[0].ADD3,
          cType: res.recordset[0].TYPE,

        });
      }, (err: any) =>{
        console.log(err)
        this.contactForm.patchValue({
          pcode: res.recordset[0].PCODE,          
          contactId: res.recordset[0].PARTY_ID,
          contactPerson: res.recordset[0].NAME,
          contactPhone1: res.recordset[0].PHONE1,
          contactPhone2: res.recordset[0].PHONE2,
          contactEmail: res.recordset[0].EMAIL_ID,
          contactAddress1: res.recordset[0].ADD1,
          contactAddress2: res.recordset[0].ADD2,
          contactAddress3: res.recordset[0].ADD3,
          cType: res.recordset[0].TYPE,
        });
      })
    }, (err: any) => {
      this.newForm()
    })
  }

  newForm() {
    this.financeService.getMaxParty().subscribe((resp: any) => {
      console.log(resp)
      const partyid = Number(resp.recordset[0].COUNT)+1
      this.contactForm = new FormGroup({
        pcode: new FormControl('', [ Validators.required]),
        custName: new FormControl('', [ Validators.required]),
        custCR: new FormControl('', [ Validators.required]),
        custStatus: new FormControl('', [ Validators.required]),
        custTaxNo: new FormControl('', [ Validators.required]),
        custPhone1: new FormControl('', [ Validators.required]),
        custPhone2: new FormControl('', [ Validators.required]),
        custEmail: new FormControl('', [ Validators.required]),
        custAdd1: new FormControl('', [ Validators.required]),
        custAdd2: new FormControl('', [ Validators.required]),
        custAdd3: new FormControl('', [ Validators.required]),
        contactId: new FormControl(String(partyid), [ Validators.required]),
        contactPerson: new FormControl('', [ Validators.required]),
        contactPhone1: new FormControl('', [ Validators.required]),
        contactPhone2: new FormControl('', [ Validators.required]),
        contactEmail: new FormControl('', [ Validators.required]),
        contactAddress1: new FormControl('', [ Validators.required]),
        contactAddress2: new FormControl('', [ Validators.required]),
        contactAddress3: new FormControl('', [ Validators.required]),
        cType: new FormControl('', [ Validators.required]),      
      });
    })
  }  
  
  submitForm() {
    const data = this.contactForm.value
    this.financeService.getPartyDetailFromPartyId(data.contactId).subscribe((res: any) => {
      console.log(res)
      this.financeService.updateContact(data.contactId,data.contactPerson,data.cType,data.contactAddress1,data.contactAddress2,data.contactAddress3,data.contactPhone1,data.contactPhone2,data.contactEmail,data.pcode)
      this._snackBar.open("Data Successfully Updated!", "OK");
      this.getData(data.contactId);
    }, (err: any) => {
      console.log(err)
      this.financeService.postContact(data.contactId,data.contactPerson,data.cType,data.contactAddress1,data.contactAddress2,data.contactAddress3,data.contactPhone1,data.contactPhone2,data.contactEmail,data.pcode)
      this._snackBar.open("Data Successfully Inserted!", "OK");
      this.getData(data.contactId);
    })
  }  
  
  refreshForm() {
    this.contactForm = new FormGroup({
      pcode: new FormControl('', [ Validators.required]),
      custName: new FormControl('', [ Validators.required]),
      custCR: new FormControl('', [ Validators.required]),
      custStatus: new FormControl('', [ Validators.required]),
      custTaxNo: new FormControl('', [ Validators.required]),
      custPhone1: new FormControl('', [ Validators.required]),
      custPhone2: new FormControl('', [ Validators.required]),
      custEmail: new FormControl('', [ Validators.required]),
      custAdd1: new FormControl('', [ Validators.required]),
      custAdd2: new FormControl('', [ Validators.required]),
      custAdd3: new FormControl('', [ Validators.required]),
      contactId: new FormControl('', [ Validators.required]),
      contactPerson: new FormControl('', [ Validators.required]),
      contactPhone1: new FormControl('', [ Validators.required]),
      contactPhone2: new FormControl('', [ Validators.required]),
      contactEmail: new FormControl('', [ Validators.required]),
      contactAddress1: new FormControl('', [ Validators.required]),
      contactAddress2: new FormControl('', [ Validators.required]),
      contactAddress3: new FormControl('', [ Validators.required]),
      cType: new FormControl('', [ Validators.required]),      
    });
  }

  getCustomerDetails(code: string) {
    this.selectedRowIndex = 0;
    let dialogRef = this.dialog.open(this.custLookupDialog);
    this.financeService.searchCustomer(code).subscribe((res: any) => {
      console.log(res)
      this.custArr = res.recordset;
      this.custDataSource = new MatTableDataSource(this.custArr);
    }, (err: any) => {
      console.log(err)
    })
  }

  onViewCellClicked(event: any) {
    this.contactForm.patchValue({
      pcode: event.PCODE,
      custName: event.CUST_NAME,
      custCR: event.CR_CPR,
      custStatus: event.STATUS,
      custTaxNo: event.TAX_1_NO,
      custPhone1: event.PHONE1,
      custPhone2: event.PHONE2,
      custEmail: event.EMAIL,
      custAdd1: event.ADD1,
      custAdd2: event.ADD2,
      custAdd3: event.ADD3,
      cType: event.TYPE,
    })
    let dialogRef = this.dialog.closeAll();
  }


  highlight(index: number){
    console.log(index);
      if(index >= 0 && index <= this.custArr.length - 1)
      this.selectedRowIndex = index;
  }

  arrowUpEvent(index: number){
   this.highlight(--index);
  }

  arrowDownEvent(index: number){
    this.highlight(++index);
  }
}
