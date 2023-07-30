import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from 'src/app/services/finance/finance.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { QuotationsService } from 'src/app/services/quotations/quotations.service';

@Component({
  selector: 'app-quotations-details',
  templateUrl: './quotations-details.component.html',
  styleUrls: ['./quotations-details.component.scss']
})
export class QuotationsDetailsComponent implements OnInit {

  uC = JSON.parse(localStorage.getItem('userid'));
  
  @ViewChild('priceLookUpDialog', { static: false }) priceLookUpDialog!: TemplateRef<any>;
  @ViewChild('custLookupDialog', { static: false }) custLookupDialog!: TemplateRef<any>;
  @ViewChild('prodLookupDialog', { static: false }) prodLookupDialog!: TemplateRef<any>;
  @ViewChild('prodDetailsDialog', { static: false }) prodDetailsDialog!: TemplateRef<any>;

  utc = new Date();
  mCurDate = this.formatDate(this.utc);
  mCYear = new Date().getFullYear();

  public quotForm: FormGroup;
  public valueForm: FormGroup;

  prodDetails: any;
  public slides = [];

  custArr: any[] = [];
  prodArr: any[] = [];
  taxArr: any[] = [];

  selectedRowIndex: any = 0;
  productIndex: any = 0;

  custDisplayedColumns: string[] = ["PCODE", "CUST_NAME", "TAX_1_NO"];
  custDataSource = new MatTableDataSource(this.custArr);  
  
  prodDisplayedColumns: string[] = ["PCODE", "DESCRIPTION", "RETAILPRICE", "BARCODE"];
  prodDataSource = new MatTableDataSource(this.prodArr);

  mQtnTotal = 0;
  mQtnVAT = 0;
  mQtnDisc = 0;
  mQtnGTotal = 0;

  docQtnNo: any;

  constructor(private dialog: MatDialog, private quotationService: QuotationsService, private route: ActivatedRoute, private financeService: FinanceService, private productService: ProductsService) { 
    this.quotForm = new FormGroup({
      quotNo: new FormControl('', [ Validators.required]),
      quotDate: new FormControl('', [ Validators.required]),
      quotExpDate: new FormControl('', [ Validators.required]),
      pcode: new FormControl('', [ Validators.required]),
      custName: new FormControl('', [ Validators.required]),
      quotStatus: new FormControl('', [ Validators.required]),
      subject: new FormControl('', [ Validators.required]),
      remarks: new FormControl('', [ Validators.required]),
      description: new FormControl('', [ Validators.required]),
      custPhone1: new FormControl('', [ Validators.required]),
      custPhone2: new FormControl('', [ Validators.required]),
      custEmail: new FormControl('', [ Validators.required]),
      custAdd1: new FormControl('', [ Validators.required]),
      custAdd2: new FormControl('', [ Validators.required]),
      custAdd3: new FormControl('', [ Validators.required]),
      contactId: new FormControl('', [ Validators.required]),
      itemArr: new FormArray([])
    });
    this.valueForm = new FormGroup({
      index: new FormControl('', [ Validators.required]),
      prodCode: new FormControl('', [ Validators.required]),
      prodDesc: new FormControl('', [ Validators.required]),
      quantity: new FormControl('', [ Validators.required]),
      unitPrice: new FormControl('', [ Validators.required]),
      value: new FormControl('', [ Validators.required]),
      discPercentage: new FormControl('', [ Validators.required]),
      discount: new FormControl('', [ Validators.required]),
      amount: new FormControl('', [ Validators.required]),
      vatCategory: new FormControl('', [ Validators.required]),
      vatAmount: new FormControl('', [ Validators.required]),
      netValue: new FormControl('', [ Validators.required]),
    });
    
  }

  ngOnInit() {
    if (this.route.snapshot.params.id === 'new') {
      this.newForm()
    } else {
      this.getData(this.route.snapshot.params.id)
    }
    this.financeService.getTaxCategory().subscribe((res: any) => {
      this.taxArr = res.recordset
    }, (err: any) => {
      console.log(err)
    })
  }

  newForm() {
    this.quotationService.getQuotNoFromDoc(String(this.mCYear)).subscribe((res: any) => {
      this.docQtnNo = res.recordset[0].FIELD_VALUE_NM + 1;
      this.quotForm = new FormGroup({
        quotNo: new FormControl(this.docQtnNo, [ Validators.required]),
        quotDate: new FormControl(this.mCurDate, [ Validators.required]),
        quotExpDate: new FormControl('', [ Validators.required]),
        pcode: new FormControl('', [ Validators.required]),
        custName: new FormControl('', [ Validators.required]),
        quotStatus: new FormControl('O', [ Validators.required]),
        subject: new FormControl('', [ Validators.required]),
        remarks: new FormControl('', [ Validators.required]),
        description: new FormControl('', [ Validators.required]),
        custPhone1: new FormControl('', [ Validators.required]),
        custPhone2: new FormControl('', [ Validators.required]),
        custEmail: new FormControl('', [ Validators.required]),
        custAdd1: new FormControl('', [ Validators.required]),
        custAdd2: new FormControl('', [ Validators.required]),
        custAdd3: new FormControl('', [ Validators.required]),
        contactId: new FormControl('', [ Validators.required]),
        itemArr: new FormArray([])
      });
      this.valueForm = new FormGroup({
        index: new FormControl('', [ Validators.required]),
        prodCode: new FormControl('', [ Validators.required]),
        prodDesc: new FormControl('', [ Validators.required]),
        quantity: new FormControl('', [ Validators.required]),
        unitPrice: new FormControl('', [ Validators.required]),
        value: new FormControl('', [ Validators.required]),
        discPercentage: new FormControl('', [ Validators.required]),
        discount: new FormControl('', [ Validators.required]),
        amount: new FormControl('', [ Validators.required]),
        vatCategory: new FormControl('', [ Validators.required]),
        vatAmount: new FormControl('', [ Validators.required]),
        netValue: new FormControl('', [ Validators.required]),
      });
    })
  }

  getData(quotNo: string) {
    this.quotationService.getQuotationMaster(quotNo).subscribe((res: any) => {
      console.log(res)
      this.quotForm.patchValue({
        quotNo: res.recordset[0].QUOTNO,
        quotDate: this.formatDate(res.recordset[0].QUOTDATE),
        quotExpDate: this.formatDate(res.recordset[0].EXPIRY_DATE),
        pcode: res.recordset[0].PCODE,
        custName: res.recordset[0].CUST_NAME,
        quotStatus: res.recordset[0].STATUS,
        subject: res.recordset[0].SUBJECT,
        remarks: res.recordset[0].REMARKS,
        description: res.recordset[0].DESC1,
        custPhone1: res.recordset[0].CUST_PHONE1,
        custEmail: res.recordset[0].QUOTNO,
        custAdd1: res.recordset[0].CUST_ADD1,
        custAdd2: res.recordset[0].CUST_ADD2,
        custAdd3: res.recordset[0].CUST_ADD3,
        contactId: res.recordset[0].PARTY_ID,
      })
      this.mQtnTotal = Number(res.recordset[0].TOTAL);
      this.mQtnDisc = Number(res.recordset[0].DISCOUNT);
      this.mQtnVAT = Number(res.recordset[0].TAX_1_AMT);
      this.mQtnGTotal = Number(res.recordset[0].GTOTAL);
      this.quotationService.getQuotationDetails(quotNo).subscribe((resp: any) => {
        console.log(resp)
        for(let i=0; i< resp.recordset.length;i++){
          const prodGrid = new FormGroup({
            prodCode: new FormControl(resp.recordset[i].ITCODE, [ Validators.required]),
            prodDesc: new FormControl(resp.recordset[i].DESCRIPTION, [ Validators.required]),
            prodUnit: new FormControl(resp.recordset[i].DESC1, [ Validators.required]),
            prodQty: new FormControl(resp.recordset[i].TOTQTY, [ Validators.required]),
            unitPrice: new FormControl(resp.recordset[i].PRICE, [ Validators.required]),
            value: new FormControl(Number(resp.recordset[i].TOTQTY)*Number(resp.recordset[i].PRICE), [ Validators.required]),
            discPercentage: new FormControl(resp.recordset[i].DISPER, [ Validators.required]),
            discount: new FormControl(resp.recordset[i].DISAMT, [ Validators.required]),
            vatCategory: new FormControl(resp.recordset[i].TAX_CATEGORY_ID, [ Validators.required]),
            vatAmount: new FormControl(resp.recordset[i].TAX_1_AMT, [ Validators.required]),
            netValue: new FormControl(resp.recordset[i].AMOUNT, [ Validators.required]),
          });
          this.prodItem.push(prodGrid);
        }
      })
    })
  }

  submitForm() {
    const data = this.quotForm.value;
    console.log(data)
    this.quotationService.getQuotationMaster(data.quotNo).subscribe((res: any) => {
      if(res.recordset.length === 0) {
        this.quotationService.postQuotationMaster(data.quotNo, data.quotDate, data.quotStatus, this.formatDate(data.quotExpDate), data.pcode, data.contactId, data.custName, data.custAdd1, data.custAdd2, data.custAdd3, data.custPhone1, String(this.mQtnTotal), String(this.mQtnDisc), String(this.mQtnVAT), String(this.mQtnGTotal), String(this.mCYear), this.uC)
        for(let i=0; i<data.itemArr.length; i++) {
          this.quotationService.postQuotationDetails(data.quotNo,data.itemArr[i].prodDesc,data.itemArr[i].prodQty,data.itemArr[i].prodCode,data.itemArr[i].unitPrice,data.itemArr[i].netValue,data.itemArr[i].discPercentage,data.itemArr[i].discount,data.itemArr[i].vatAmount,this.uC,String(this.mCYear))
        }
      } else {
        this.quotationService.updateQuotationMaster(data.quotNo, data.quotDate, data.quotStatus, this.formatDate(data.quotExpDate), data.pcode, data.contactId, data.custName, data.custAdd1, data.custAdd2, data.custAdd3, data.custPhone1, String(this.mQtnTotal), String(this.mQtnDisc), String(this.mQtnVAT), String(this.mQtnGTotal))
        this.quotationService.deleteQuotationDetails(data.quotNo).subscribe((res: any) => {
          for(let i=0; i<data.itemArr.length; i++) {
            this.quotationService.postQuotationDetails(data.quotNo,data.itemArr[i].prodDesc,data.itemArr[i].prodQty,data.itemArr[i].prodCode,data.itemArr[i].unitPrice,data.itemArr[i].netValue,data.itemArr[i].discPercentage,data.itemArr[i].discount,data.itemArr[i].vatAmount,this.uC,String(this.mCYear))
          }
        }, (err: any) => {
          for(let i=0; i<data.itemArr.length; i++) {
            this.quotationService.postQuotationDetails(data.quotNo,data.itemArr[i].prodDesc,data.itemArr[i].prodQty,data.itemArr[i].prodCode,data.itemArr[i].unitPrice,data.itemArr[i].netValue,data.itemArr[i].discPercentage,data.itemArr[i].discount,data.itemArr[i].vatAmount,this.uC,String(this.mCYear))
          }
        })
      }
    }, (err: any) => {
      this.quotationService.postQuotationMaster(data.quotNo, data.quotDate, data.quotStatus, this.formatDate(data.quotExpDate), data.pcode, data.contactId, data.custName, data.custAdd1, data.custAdd2, data.custAdd3, data.custPhone1, String(this.mQtnTotal), String(this.mQtnDisc), String(this.mQtnVAT), String(this.mQtnGTotal), String(this.mCYear), this.uC)
        for(let i=0; i<data.itemArr.length; i++) {
          this.quotationService.postQuotationDetails(data.quotNo,data.itemArr[i].prodDesc,data.itemArr[i].prodQty,data.itemArr[i].prodCode,data.itemArr[i].unitPrice,data.itemArr[i].netValue,data.itemArr[i].discPercentage,data.itemArr[i].discount,data.itemArr[i].vatAmount,this.uC,String(this.mCYear))
        }
    })
  }

  refreshForm() {

  }

  lookupPriceDialog(index: number) {
    const data = this.quotForm.value
    console.log(data)
    console.log(this.prodItem.at(index).value)
    let dialogRef = this.dialog.open(this.priceLookUpDialog);
    var value: any
    if(this.prodItem.at(index).value.value === '') {
      value = Number(this.prodItem.at(index).value.prodQty) * Number(this.prodItem.at(index).value.unitPrice)
    } else {
      value = this.prodItem.at(index).value.value
    }
    this.valueForm = new FormGroup({
      index: new FormControl(index, [ Validators.required]),
      prodCode: new FormControl(this.prodItem.at(index).value.prodCode, [ Validators.required]),
      prodDesc: new FormControl(this.prodItem.at(index).value.prodDesc, [ Validators.required]),
      quantity: new FormControl(this.prodItem.at(index).value.prodQty, [ Validators.required]),
      unitPrice: new FormControl(this.prodItem.at(index).value.unitPrice, [ Validators.required]),
      value: new FormControl(value, [ Validators.required]),
      discPercentage: new FormControl(this.prodItem.at(index).value.discPercentage, [ Validators.required]),
      discount: new FormControl(this.prodItem.at(index).value.discount, [ Validators.required]),
      amount: new FormControl(this.prodItem.at(index).value.amount, [ Validators.required]),
      vatCategory: new FormControl(this.prodItem.at(index).value.vatCategory, [ Validators.required]),
      vatAmount: new FormControl(this.prodItem.at(index).value.vatAmount, [ Validators.required]),
      netValue: new FormControl(this.prodItem.at(index).value.netValue, [ Validators.required]),
    });
  }

  lookupCustomerDetails(code: string) {
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

  lookupProductDetails(code: string, index: number) {
    this.selectedRowIndex = 0;
    this.productIndex = index;
    let dialogRef = this.dialog.open(this.prodLookupDialog);
    this.productService.searchProduct(code).subscribe((res: any) => {
      console.log(res)
      this.prodArr = res.recordset;
      this.prodDataSource = new MatTableDataSource(this.prodArr);
    }, (err: any) => {
      console.log(err)
    })
  }

  getProductDetails(index: number) {
    this.prodDetails = {}
    this.slides = []
    this.productService.getProduct(this.prodItem.at(index).value.prodCode, String(this.mCYear)).subscribe((res: any) => {
      console.log(res.recordset[0])
      this.prodDetails = res.recordset[0]
      this.productService.getProductDocuments(this.prodItem.at(index).value.prodCode,'IMG').subscribe((respo: any) => {
        if(respo.recordset.length === 0) {
          var img = { src: "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/imgNaN.png" }
          this.slides.push(img);
        } else {
          for(let i=0; i<respo.recordset.length; i++) {
            const docUrl = "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/" + respo.recordset[i].DOCUMENTNAME
            var img = { src: docUrl }
            this.slides.push(img)
          }
          console.log(this.slides)
        }
      }, (err: any) => {
        var img = { src: "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/imgNaN.png" }
        this.slides.push(img);
      })
    })
    let dialogRef = this.dialog.open(this.prodDetailsDialog);
  }

  calcDiscount(){
    const data = this.valueForm.value;
    var discount = (Number(data.value) * Number(data.discPercentage))/100
    var gross = Number(data.value) - discount
    var taxAmount = (gross * 5)/100
    var netValue = gross + taxAmount
    this.mQtnTotal += Number(data.value);
    this.mQtnDisc += discount;
    this.mQtnVAT += taxAmount ;
    this.mQtnGTotal += netValue;
    this.valueForm.patchValue({
      discount: discount,
      amount: gross,
      vatAmount: taxAmount,
      netValue: netValue
    })
  }

  calibrateTotal() {
    this.mQtnTotal = 0;
    this.mQtnDisc = 0;
    this.mQtnVAT = 0;
    this.mQtnGTotal = 0;
    const data = this.quotForm.value;
    for(let i=0; i<data.itemArr.length; i++) {
      this.mQtnTotal += data.itemArr[i].value;
      this.mQtnDisc += data.itemArr[i].discount;
      this.mQtnVAT += data.itemArr[i].vatAmount ;
      this.mQtnGTotal += data.itemArr[i].netValue;
    }
  }

  /*calcTax(event: any){
    console.log(event)
    const data = this.valueForm.value;
    var gross = Number(data.value) - Number(data.discount)
    var taxVal = (gross * Number(data.vatCategory))/100
    this.valueForm.patchValue({
      vatAmount: taxVal
    })
  }*/

  selectCustomer(event: any) {
    this.quotForm.patchValue({
      pcode: event.PCODE,
      custName: event.CUST_NAME,
      custPhone1: event.PHONE1,
      custPhone2: event.PHONE2,
      custEmail: event.EMAIL,
      custAdd1: event.ADD1,
      custAdd2: event.ADD2,
      custAdd3: event.ADD3,
      contactId: event.CONTACT,
    })
    let dialogRef = this.dialog.closeAll();
  }

  selectProduct(event: any) {
    const rowData: any = {
      prodCode: event.PCODE,
      prodDesc: event.DESCRIPTION,
      unitPrice: event.RETAILPRICE,
    }
    this.prodItem.at(this.productIndex).patchValue(rowData);
    let dialogRef = this.dialog.closeAll();
  }

  highlight(type: string, index: number){
    console.log(index);
    if (type === "cust") {
      if(index >= 0 && index <= this.custArr.length - 1)
      this.selectedRowIndex = index;
    } else if (type === "prod") {
      if(index >= 0 && index <= this.prodArr.length - 1)
      this.selectedRowIndex = index;
    }
  }

  arrowUpEvent(type: string, index: number){
   this.highlight(type, --index);
  }

  arrowDownEvent(type: string, index: number){
    this.highlight(type, ++index);
  }

  submitPrice() {
    const data = this.valueForm.value;
    const rowData: any = {
      prodQty: data.quantity,
      unitPrice: data.unitPrice,
      value: data.value,
      discPercentage: data.discPercentage,
      discount: data.discount,
      amount: data.amount,
      vatCategory: data.vatCategory,
      vatAmount: data.vatAmount,
      netValue: data.netValue,
    }
    this.prodItem.at(data.index).patchValue(rowData);
    let dialogRef = this.dialog.closeAll();
  }

  deleteProductItem(index: number) {
    if(this.prodItem.length === 1){
    } else {
      this.prodItem.removeAt(index);
    }
    this.calibrateTotal()
  }

  addProductItem() {
    const prodGrid = new FormGroup({
      prodCode: new FormControl('', [ Validators.required]),
      prodDesc: new FormControl('', [ Validators.required]),
      prodUnit: new FormControl('', [ Validators.required]),
      prodQty: new FormControl('', [ Validators.required]),
      unitPrice: new FormControl('', [ Validators.required]),
      value: new FormControl('', [ Validators.required]),
      discPercentage: new FormControl('', [ Validators.required]),
      discount: new FormControl('', [ Validators.required]),
      vatCategory: new FormControl('', [ Validators.required]),
      vatAmount: new FormControl('', [ Validators.required]),
      netValue: new FormControl('', [ Validators.required]),
    });
    this.prodItem.push(prodGrid);
  }

  get prodItem(): FormArray {
    return this.quotForm.get('itemArr') as FormArray
  }

  formatDate(date: any) {
    var d = new Date(date), day = '' + d.getDate(), month = '' + (d.getMonth() + 1), year = d.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    } 
    if (month.length < 2) {
      month = '0' + month;
    }
    return [day, month, year].join('-');
  }

}
