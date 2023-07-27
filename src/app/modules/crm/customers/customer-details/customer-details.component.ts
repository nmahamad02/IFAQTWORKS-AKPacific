import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from 'src/app/services/finance/finance.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  currentYear = new Date().getFullYear()

  public custForm: FormGroup;

  constructor(private financeService: FinanceService, private route: ActivatedRoute,  private _snackBar: MatSnackBar) { 
    this.custForm = new FormGroup({
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
    });
  }

  ngOnInit() {
    if (this.route.snapshot.params.id === 'new') {
      this.newForm()
    } else {
      this.getData(this.route.snapshot.params.id)
    }
  }

  getData(pcode: string) {
    this.refreshForm()
    this.financeService.getCustomerDetailFromPcode(String(this.currentYear), pcode).subscribe((res: any) => {
      console.log(res)
      this.financeService.getPartyDetailFromPCODE(pcode).subscribe((resp: any) => {
        console.log(resp)
        this.custForm.patchValue({
          pcode: res.recordset[0].PCODE,
          custName: res.recordset[0].CUST_NAME,
          custCR: res.recordset[0].CR_CPR,
          custStatus: res.recordset[0].STATUS,
          custTaxNo: res.recordset[0].TAX_1_NO,
          custPhone1: res.recordset[0].PHONE1,
          custPhone2: res.recordset[0].PHONE2,
          custEmail: res.recordset[0].EMAIL,
          custAdd1: res.recordset[0].ADD1,
          custAdd2: res.recordset[0].ADD2,
          custAdd3: res.recordset[0].ADD3,
          contactId: resp.recordset[0].PARTY_ID,
          contactPerson: resp.recordset[0].NAME,
          contactPhone1: resp.recordset[0].PHONE1,
          contactPhone2: resp.recordset[0].PHONE2,
          contactEmail: resp.recordset[0].EMAIL_ID,
          contactAddress1: resp.recordset[0].ADD1,
          contactAddress2: resp.recordset[0].ADD2,
          contactAddress3: resp.recordset[0].ADD3,
        });
      }, (err: any) =>{
        console.log(err)
        this.custForm.patchValue({
          pcode: res.recordset[0].PCODE,
          custName: res.recordset[0].CUST_NAME,
          custCR: res.recordset[0].CR_CPR,
          custStatus: res.recordset[0].STATUS,
          custTaxNo: res.recordset[0].TAX_1_NO,
          custPhone1: res.recordset[0].PHONE1,
          custPhone2: res.recordset[0].PHONE2,
          custEmail: res.recordset[0].EMAIL,
          custAdd1: res.recordset[0].ADD1,
          custAdd2: res.recordset[0].ADD2,
          custAdd3: res.recordset[0].ADD3,
        });
      })
    })
  }

  newForm() {
    this.financeService.getCustomerCount().subscribe((res: any) => {
      console.log(res)
      this.financeService.getMaxParty().subscribe((resp: any) => {
        console.log(resp)
        const pcode = 'A201-000'+res.recordset[0].COUNT
        const partyid = Number(resp.recordset[0].COUNT)+1
        this.custForm = new FormGroup({
          pcode: new FormControl(pcode, [ Validators.required]),
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
        });
      })
    })
  }  
  
  submitForm() {
    const data = this.custForm.value
    this.financeService.getCustomerDetailFromPcode(String(this.currentYear), data.pcode).subscribe((res: any) => {
      console.log(res)
      this.financeService.updateOPBAL(data.pcode,data.custName,data.custCR,'C',data.custAdd1,data.custAdd2,data.custAdd3,data.custPhone1,data.custPhone2,data.custEmail,data.custStatus,String(this.currentYear),data.custTaxNo)
    }, (err: any) => {
      console.log(err)
      this.financeService.postOPBAL(data.pcode,data.custName,data.custCR,'C',data.custAdd1,data.custAdd2,data.custAdd3,data.custPhone1,data.custPhone2,data.custEmail,data.custStatus,String(this.currentYear),data.custTaxNo)
    })
    this.financeService.getPartyDetailFromPartyId(data.contactId).subscribe((res: any) => {
      console.log(res)
      this.financeService.updateContact(data.contactId,data.contactPerson,'C',data.contactAddress1,data.contactAddress2,data.contactAddress3,data.contactPhone1,data.contactPhone2,data.contactEmail,data.pcode)
    }, (err: any) => {
      console.log(err)
      this.financeService.postContact(data.contactId,data.contactPerson,'C',data.contactAddress1,data.contactAddress2,data.contactAddress3,data.contactPhone1,data.contactPhone2,data.contactEmail,data.pcode)
    })
    this._snackBar.open("Data Successfully Updated!", "OK");
    this.getData(data.pcode);
  }  

  copyToContact() {
    const data = this.custForm.value;
    this.custForm.patchValue({
      contactPerson: data.custName,
      contactPhone1: data.custPhone1,
      contactPhone2: data.custPhone2,
      contactEmail: data.custEmail,
      contactAddress1: data.custAdd1,
      contactAddress2: data.custAdd2,
      contactAddress3: data.custAdd3,
    });
  }
  
  refreshForm() {
    this.custForm = new FormGroup({
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
    });
  }

}
