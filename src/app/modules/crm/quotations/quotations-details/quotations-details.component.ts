import { Component, ElementRef, Inject, LOCALE_ID, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from 'src/app/services/finance/finance.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { QuotationsService } from 'src/app/services/quotations/quotations.service';
import html2canvas from 'html2canvas';
import * as converter from 'number-to-words';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable';
import { formatNumber } from '@angular/common';
import { toBase64String } from '@angular/compiler/src/output/source_map';

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

  @ViewChild('prodTable', {static: false}) prodTable: ElementRef;

  utc = new Date();
  mCurDate = this.formatDate(this.utc);
  mCMonth = new Date().getMonth();
  mCYear = new Date().getFullYear();
  forwardDate = new Date(new Date().setDate(this.utc.getDate() + 30));
  nNewDate = this.formatDate(this.forwardDate)

  public quotForm: FormGroup;
  public valueForm: FormGroup;

  prodDetails: any;
  custDetails: any;
  prodDetailsArr: any = [];
  public slides = [];

  custArr: any[] = [];
  prodArr: any[] = [];
  taxArr: any[] = [];
  unitArr: any[] = [];

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
  mQtnNumToWords = '';

  docQtnNo: any;

  constructor(private dialog: MatDialog, private quotationService: QuotationsService, private route: ActivatedRoute, private financeService: FinanceService, private productService: ProductsService,private _snackBar: MatSnackBar, @Inject(LOCALE_ID) public locale: string) { 
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
      boqNo: new FormControl('', [ Validators.required]),
      prodCode: new FormControl('', [ Validators.required]),
      prodUnit: new FormControl('', [ Validators.required]),
      prodDesc: new FormControl('', [ Validators.required]),
      quantity: new FormControl('', [ Validators.required]),
      unitPrice: new FormControl('', [ Validators.required]),
      value: new FormControl('', [ Validators.required]),
      discPercentage: new FormControl('', [ Validators.required]),
      discount: new FormControl('', [ Validators.required]),
      amount: new FormControl('', [ Validators.required]),
      vatCategory: new FormControl('', [ Validators.required]),
      vatPer: new FormControl('', [ Validators.required]),
      vatAmount: new FormControl('', [ Validators.required]),
      netValue: new FormControl('', [ Validators.required]),
      remarks: new FormControl('', [ Validators.required]),
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
    this.financeService.getUnit().subscribe((res: any) => {
      this.unitArr = res.recordset
    }, (err: any) => {
      console.log(err)
    })
  }

  newForm() {
    this.mQtnTotal = 0;
    this.mQtnDisc = 0;
    this.mQtnVAT = 0;
    this.mQtnGTotal = 0;
    this.quotationService.getQuotNoFromDoc(String(this.mCYear)).subscribe((res: any) => {
      this.docQtnNo = res.recordset[0].FIELD_VALUE_NM + 1;
      var newQtnNo = 'AKPI-' + this.docQtnNo + '-' + String(this.mCMonth) + String(this.mCYear)
      this.quotForm = new FormGroup({
        quotNo: new FormControl(newQtnNo, [ Validators.required]),
        quotDate: new FormControl(this.mCurDate, [ Validators.required]),
        quotExpDate: new FormControl(this.forwardDate, [ Validators.required]),
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
        boqNo: new FormControl('', [ Validators.required]),
        prodCode: new FormControl('', [ Validators.required]),
        prodUnit: new FormControl('', [ Validators.required]),
        prodDesc: new FormControl('', [ Validators.required]),
        quantity: new FormControl('', [ Validators.required]),
        unitPrice: new FormControl('', [ Validators.required]),
        value: new FormControl('', [ Validators.required]),
        discPercentage: new FormControl(0, [ Validators.required]),
        discount: new FormControl('', [ Validators.required]),
        amount: new FormControl('', [ Validators.required]),
        vatCategory: new FormControl('', [ Validators.required]),
        vatPer: new FormControl('', [ Validators.required]),
        vatAmount: new FormControl('', [ Validators.required]),
        netValue: new FormControl('', [ Validators.required]),
        remarks: new FormControl('', [ Validators.required]),
      });
    })
  }

  getData(quotNo: string) {
    this.quotationService.getQuotationMaster(quotNo).subscribe((res: any) => {
      console.log(res)
      this.financeService.getCustomerDetailFromPcode(String(this.mCYear),res.recordset[0].PCODE).subscribe((resp: any) => {
        console.log(res)
        this.quotForm = new FormGroup({
          quotNo: new FormControl(res.recordset[0].QUOTNO, [ Validators.required]),
          quotDate: new FormControl(this.formatDate(res.recordset[0].QUOTDATE), [ Validators.required]),
          quotExpDate: new FormControl(res.recordset[0].EXPIRY_DATE, [ Validators.required]),
          pcode: new FormControl(resp.recordset[0].PCODE, [ Validators.required]),
          custName: new FormControl(resp.recordset[0].CUST_NAME, [ Validators.required]),
          quotStatus: new FormControl(res.recordset[0].STATUS, [ Validators.required]),
          subject: new FormControl(res.recordset[0].SUBJECT, [ Validators.required]),
          remarks: new FormControl(res.recordset[0].REMARKS, [ Validators.required]),
          description: new FormControl(res.recordset[0].DESC1, [ Validators.required]),
          custPhone1: new FormControl(resp.recordset[0].PHONE1, [ Validators.required]),
          custPhone2: new FormControl(resp.recordset[0].PHONE2, [ Validators.required]),
          custEmail: new FormControl(resp.recordset[0].EMAIL, [ Validators.required]),
          custAdd1: new FormControl(resp.recordset[0].ADD1, [ Validators.required]),
          custAdd2: new FormControl(resp.recordset[0].ADD2, [ Validators.required]),
          custAdd3: new FormControl(resp.recordset[0].ADD3, [ Validators.required]),
          contactId: new FormControl(resp.recordset[0].CONTACT, [ Validators.required]),
          itemArr: new FormArray([])
        });
        this.mQtnTotal = Number(res.recordset[0].TOTAL);
        this.mQtnDisc = Number(res.recordset[0].DISCOUNT);
        this.mQtnVAT = Number(res.recordset[0].TAX_1_AMT);
        this.mQtnGTotal = Number(res.recordset[0].GTOTAL);
        this.mQtnNumToWords = converter.toWords(res.recordset[0].GTOTAL);
        this.quotationService.getQuotationDetails(quotNo).subscribe((resp: any) => {
          console.log(resp)
          for(let i=0; i< resp.recordset.length;i++){
            const prodGrid = new FormGroup({
              boqNo: new FormControl(resp.recordset[i].JOB_NO, [ Validators.required]),
              prodCode: new FormControl(resp.recordset[i].ITCODE, [ Validators.required]),
              prodDesc: new FormControl(resp.recordset[i].DESCRIPTION, [ Validators.required]),
              prodUnit: new FormControl(resp.recordset[i].UNITTYPE, [ Validators.required]),
              prodQty: new FormControl(resp.recordset[i].TOTQTY, [ Validators.required]),
              unitPrice: new FormControl(resp.recordset[i].PRICE, [ Validators.required]),
              value: new FormControl(Number(resp.recordset[i].TOTQTY)*Number(resp.recordset[i].PRICE), [ Validators.required]),
              discPercentage: new FormControl(resp.recordset[i].DISPER, [ Validators.required]),
              discount: new FormControl(resp.recordset[i].DISAMT, [ Validators.required]),
              vatCategory: new FormControl(resp.recordset[i].TAX_CATEGORY_ID, [ Validators.required]),
              vatPer: new FormControl(resp.recordset[i].TAX_1_PER, [ Validators.required]),
              vatAmount: new FormControl(resp.recordset[i].TAX_1_AMT, [ Validators.required]),
              netValue: new FormControl(resp.recordset[i].AMOUNT, [ Validators.required]),
              remarks: new FormControl(resp.recordset[i].DESC1, [ Validators.required]),
            });
            this.prodItem.push(prodGrid);
            this.productService.getProductDocuments(resp.recordset[i].ITCODE,'IMG').subscribe((respo: any) => {
              const prodDet = {
                index: i,
                boqNo: resp.recordset[i].JOB_NO,
                prodCode: resp.recordset[i].ITCODE,
                prodDesc: resp.recordset[i].DESCRIPTION,
                prodImg: respo.recordset[0].DOCUMENTNAME,
                prodQty: resp.recordset[i].TOTQTY,
                prodUnit: resp.recordset[i].UNITTYPE,
                unitPrice: resp.recordset[i].PRICE,
                netValue: resp.recordset[i].AMOUNT
              }
              this.prodDetailsArr.push(prodDet)
            })
          }
        })
      })
      this.financeService.getPartyDetailFromPCODE(res.recordset[0].PCODE).subscribe((res: any) => {
        this.custDetails = res.recordset[0]
        console.log(this.custDetails)
      })
    })
  }

  submitForm() {
    const data = this.quotForm.value;
    console.log(data.quotNo)
    this.quotationService.getQuotationMaster(data.quotNo).subscribe((res: any) => {
      if(res.recordset.length === 0) {
        this.quotationService.postQuotationMaster(data.quotNo, this.formatDate(data.quotDate),data.quotStatus,this.formatDate(data.quotExpDate),data.pcode,data.contactId,data.custName,data.custAdd1, data.custAdd2, data.custAdd3,data.custPhone1, String(this.mQtnTotal), String(this.mQtnDisc),String(this.mQtnVAT), String(this.mQtnGTotal),data.subject, data.description, data.remarks,String(this.mCYear),this.uC)
        for(let i=0; i<data.itemArr.length; i++) {
          this.quotationService.postQuotationDetails(data.quotNo,data.itemArr[i].prodDesc,data.itemArr[i].remarks,data.itemArr[i].prodQty,data.itemArr[i].prodCode,data.itemArr[i].unitPrice,data.itemArr[i].netValue,data.itemArr[i].discPercentage,data.itemArr[i].discount,data.itemArr[i].vatCategory,data.itemArr[i].vatPer,data.itemArr[i].vatAmount,data.itemArr[i].prodUnit,data.itemArr[i].boqNo,this.uC,String(this.mCYear))
        }
        this.quotationService.updateQuotDocNo(this.docQtnNo,String(this.mCYear))
      } else {
        this.quotationService.updateQuotationMaster(data.quotNo,data.quotStatus,this.formatDate(data.quotExpDate),data.pcode,data.contactId,data.custName,data.custAdd1, data.custAdd2, data.custAdd3,data.custPhone1, String(this.mQtnTotal), String(this.mQtnDisc),String(this.mQtnVAT), String(this.mQtnGTotal),data.subject, data.description, data.remarks)
        this.quotationService.deleteQuotationDetails(data.quotNo).subscribe((res: any) => {
          for(let i=0; i<data.itemArr.length; i++) {
            this.quotationService.postQuotationDetails(data.quotNo,data.itemArr[i].prodDesc,data.itemArr[i].remarks,data.itemArr[i].prodQty,data.itemArr[i].prodCode,data.itemArr[i].unitPrice,data.itemArr[i].netValue,data.itemArr[i].discPercentage,data.itemArr[i].discount,data.itemArr[i].vatCategory,data.itemArr[i].vatPer,data.itemArr[i].vatAmount,data.itemArr[i].prodUnit,data.itemArr[i].boqNo,this.uC,String(this.mCYear))          
          }
        }, (err: any) => {
          console.log(err)
        })
      }
    }, (err: any) => {
      console.log(data.quotNo)
      this.quotationService.postQuotationMaster(data.quotNo, this.formatDate(data.quotDate),data.quotStatus,this.formatDate(data.quotExpDate),data.pcode,data.contactId,data.custName,data.custAdd1, data.custAdd2, data.custAdd3,data.custPhone1, String(this.mQtnTotal), String(this.mQtnDisc),String(this.mQtnVAT), String(this.mQtnGTotal),data.subject, data.description, data.remarks,String(this.mCYear),this.uC)
      for(let i=0; i<data.itemArr.length; i++) {
          this.quotationService.postQuotationDetails(data.quotNo,data.itemArr[i].prodDesc,data.itemArr[i].remarks,data.itemArr[i].prodQty,data.itemArr[i].prodCode,data.itemArr[i].unitPrice,data.itemArr[i].netValue,data.itemArr[i].discPercentage,data.itemArr[i].discount,data.itemArr[i].vatCategory,data.itemArr[i].vatPer,data.itemArr[i].vatAmount,data.itemArr[i].prodUnit,data.itemArr[i].boqNo,this.uC,String(this.mCYear))        
        }
        this.quotationService.updateQuotDocNo(this.docQtnNo,String(this.mCYear))
    })
    console.log(data)
    this._snackBar.open("Data Successfully Updated!", "OK");
  }

  refreshForm() {

  }

  public savePDF(): void {  
    console.log(this.prodDetailsArr)
    const data = this.quotForm.value;
    var doc = new jsPDF("portrait", "px", "a4");
    doc.setFontSize(16)
    doc.setFont('Helvetica','bold');
    doc.text('QUOTATION',10,87);
    doc.setFontSize(12);
    doc.text(`Ref: ${data.quotNo}`,330,86);
    doc.line(5, 92, 440, 92); 
    doc.text(`Date: ${data.quotDate}`,10,103);
    doc.line(5, 75, 5, 109); 
    doc.line(305, 75, 305, 109); 
    doc.line(440, 75, 440, 109); 
    doc.text(`VAT No: 100339666800003`,310,103);
    doc.line(5, 109, 440, 109);
    doc.text(`M/s. ${data.custName},`,10,120);
    doc.setFont('Helvetica','normal');
    doc.text(`${data.custAdd1}`,10,130);
    doc.text(`${data.custAdd2}, ${data.custAdd3}`,10,140);
    doc.text(`${data.custPhone1}, ${data.custPhone2}`,10,150);
    doc.text(`${data.custEmail}`,10,160);
    doc.text(`Dear ${this.custDetails.NAME},`,10,175);
    doc.text(`Thank you for your valuable enquiry, please find below our discounted price for the following products.`,10,185);
    //doc.line(5, 190, 440, 190);
    doc.setFont('Helvetica','bold');
    doc.text(`PROJECT:                              ${data.subject}`,10,205);
    //doc.line(5, 205, 440, 205);
    autoTable(doc, { 
      html: '#prodTable',
      startY: 210,    
      bodyStyles: {
        minCellHeight: 75
      },                
      theme: 'plain',
      tableLineColor: [105, 105, 105],
      tableLineWidth: 0.15,
      rowPageBreak: 'avoid',
      showFoot: 'lastPage',
      margin: {
        left: 5,
        right: 7,
        bottom: 26,
        top: 75
      },
      willDrawCell: function(data) {
        doc.setDrawColor(105, 105, 105); // set the border color
        doc.setLineWidth(0.15); // set the border with
        // draw bottom border
        doc.line(data.cell.x,data.cell.y + data.cell.height,data.cell.x + data.cell.width,data.cell.y + data.cell.height);
        // draw top border
        doc.line(data.cell.x + data.cell.width,data.cell.y,data.cell.x,data.cell.y);
        // draw left border
        // doc.line(data.cell.x,data.cell.y + data.cell.height,data.cell.x,data.cell.y);
        // draw right border
        // doc.line(data.cell.x + data.cell.width,data.cell.y,data.cell.x + data.cell.width,data.cell.y + data.cell.height);
      },
      didDrawCell: function(data) {
        if (data.column.index === 4 && data.cell.section === 'body') {
          var td = data.cell.raw as HTMLTableCellElement;
          console.log(td)
          
          var image = new Image();
          image = td.getElementsByTagName('img')[0];
          var dimV = data.cell.height - data.cell.padding('vertical');
          var dimH = data.cell.width - data.cell.padding('horizontal');
          var textPos = data.cell.getTextPos();

          image.setAttribute('crossOrigin', 'anonymous');

          function getBase64Image(img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/jpeg");
            return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
          }

          image.onload = function(){
            var dataURI = getBase64Image(image);
            console.log(dataURI)
            return dataURI;
          }
        
          doc.addImage(image.src, 'jpeg', textPos.x,  textPos.y, dimH, dimV);  
        }
      },
      columnStyles: {
       // 0: {halign: 'right', cellWidth: 5,},
      //  1: {halign: 'left', cellWidth: 15,},
      //  2: {halign: 'right', cellWidth: 15,},
      //  3: {halign: 'right', cellWidth: 100,},
        4: {cellWidth: 100,},
      //  5: {halign: 'right', cellWidth: 50,},
      //  6: {halign: 'right', cellWidth: 50,},
      //  7: {halign: 'right', cellWidth: 50,}
      },
    })
    doc.addPage()
    doc.setFont('Helvetica','bold');
    doc.text('Note:',10,85);
    doc.setLineWidth(0.5)
    doc.line(5, 90, 440, 90); 
    doc.setFont('Helvetica','normal');
    doc.text(`1.     Please note that the quantities we have considered in our Quotation are based on the BOQ that \n        was received from your site office.`,15,105);
    doc.text(`2.     Prices are valid for above mentioned quantity. Prices may vary with any changes in the quantity.`,15,130);
    doc.text(`3.     All the products quoted are based on sea shipment. If you require shipment through air, actual \n        air freight charges will be applicable.`,15,145);
    doc.line(5, 165, 440, 165); 
    doc.setFont('Helvetica','bold');
    doc.text('Terms & Conditions:',10,175);
    doc.line(5, 180, 440, 180); 
    doc.setFont('Helvetica','normal');
    doc.text(`Validity`,10,195);
    doc.text(`Availabity`,10,210);
    doc.text(`Payment`,10,225);
    doc.text(`Delivery`,10,240);
    doc.text(`: ${data.quotExpDate}`,100,195);
    doc.text(`: To be determined at the time of confirmation of the order.`,100,210);
    doc.text(`: ${data.remarks}`,100,225);
    doc.text(`: ${data.description}`,100,240);
    doc.line(5, 250, 440, 250); 
    doc.text(`We hope that the above price is competitive to you. We look forward to receive a valuable order from you.`,10,275);
    doc.text(`Best Regards,`,10,290);
 
    doc.text(`For,`,10,355);
    doc.setFont('Helvetica','bold');
    doc.text(`AK PACIFIC International Gen. Trading LLC`,10,370);
    doc.text(`Mansoor Ahmed`,10,380);
    doc.setFont('Helvetica','normal');
    doc.text(`International Business Development Manager`,10,390);
    doc.text(`Mob.No: 00971 56 164 1335/055 412 1234`,10,400);
    
    
    doc = this.addWaterMark(doc);
    //doc.save(`${data.quotNo}.pdf`);  
    var string = doc.output('datauri');
    var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  } 

  addWaterMark(doc) {
    var totalPages = doc.internal.getNumberOfPages();
  
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setLineWidth(0.15)
      //doc.roundedRect(5, 5, 435, 600, 0, 0);
      var img = new Image()
      img.src = 'assets/pics/favicon.png';
      doc.addImage(img, 'png', 6, 6, 69, 69);
      doc.setFontSize(16)
      doc.setFont('Helvetica','bold');
      doc.setTextColor(255,0,0);
      doc.text('AK',80,20);
      doc.setTextColor(0,0,0);
      doc.text('PACIFIC INTERNATIONAL GEN. TRADING LLC',100,20);
      doc.setFontSize(13)
      doc.setFont('Helvetica','normal');
      doc.text('Post Box: 51389, DUBAI, United Arab Emirates',120,32);
      doc.text('Tel: +971 4 386 3815 / Fax: +971 4 397 7814',120,44);
      doc.setTextColor(0,0,255);
      doc.setDrawColor(0,0,255);
      doc.setLineWidth(0.5)
      doc.text('www.ak-pacific.com',180,56);
      doc.line(180, 58, 267, 58); 
      doc.setTextColor(0,0,0);
      doc.setDrawColor(0,0,0);
      doc.setFont('Helvetica','bold');
      doc.text('A subsidiary of       Group',165,70);
      doc.setTextColor(255,0,0);
      doc.text('AK',238,70);
      doc.line(5, 75, 440, 75); 
      doc.setFont('Helvetica','normal');
      doc.setTextColor(0,0,0);
      doc.text(`Page ${i} of ${totalPages}`,390,615);
    }
  
    return doc;
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
      boqNo: new FormControl(this.prodItem.at(index).value.boqNo, [ Validators.required]),
      prodCode: new FormControl(this.prodItem.at(index).value.prodCode, [ Validators.required]),
      prodDesc: new FormControl(this.prodItem.at(index).value.prodDesc, [ Validators.required]),
      quantity: new FormControl(this.prodItem.at(index).value.prodQty, [ Validators.required]),
      unitPrice: new FormControl(this.prodItem.at(index).value.unitPrice, [ Validators.required]),
      value: new FormControl(value, [ Validators.required]),
      discPercentage: new FormControl(this.prodItem.at(index).value.discPercentage, [ Validators.required]),
      discount: new FormControl(this.prodItem.at(index).value.discount, [ Validators.required]),
      amount: new FormControl(this.prodItem.at(index).value.amount, [ Validators.required]),
      vatCategory: new FormControl(this.prodItem.at(index).value.vatCategory, [ Validators.required]),
      vatPer: new FormControl(this.prodItem.at(index).value.vatPer, [ Validators.required]),
      vatAmount: new FormControl(this.prodItem.at(index).value.vatAmount, [ Validators.required]),
      netValue: new FormControl(this.prodItem.at(index).value.netValue, [ Validators.required]),
      remarks: new FormControl(this.prodItem.at(index).value.remarks, [ Validators.required]),
    });
    this.calcPrice()
    this.calcDiscount()
    this.calcTax(this.taxArr[0])
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
    this.valueForm.patchValue({
      discount: discount,
      amount: gross
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

  calcPrice() {
    const data = this.valueForm.value;
    var value = Number(data.quantity) * Number(data.unitPrice)
    this.valueForm.patchValue({
      value: value
    })
    this.calcDiscount()
    this.calcTax(this.taxArr[0])
  }

  calcTax(event: any){
    const data = this.valueForm.value;
    var taxVal = (Number(data.amount) * Number(event.TAX_1_PERC))/100
    var netValue = Number(data.amount) + taxVal
    console.log(taxVal)
    this.valueForm.patchValue({
      vatCategory: event.TAX_CATEGORY_ID,
      vatPer: event.TAX_1_PERC,
      vatAmount: taxVal,
      netValue: netValue
    })
  }

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
      boqNo: data.boqNo,
      prodQty: data.quantity,
      unitPrice: data.unitPrice,
      value: data.value,
      discPercentage: data.discPercentage,
      discount: data.discount,
      amount: data.amount,
      vatCategory: data.vatCategory,
      vatPer: data.vatPer,
      vatAmount: data.vatAmount,
      netValue: data.netValue,
      remarks: data.remarks,
    }
    this.prodItem.at(data.index).patchValue(rowData);
    this.calibrateTotal();
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
      boqNo: new FormControl('', [ Validators.required]),
      prodCode: new FormControl('', [ Validators.required]),
      prodDesc: new FormControl('', [ Validators.required]),
      prodUnit: new FormControl('', [ Validators.required]),
      prodQty: new FormControl('', [ Validators.required]),
      unitPrice: new FormControl('', [ Validators.required]),
      value: new FormControl('', [ Validators.required]),
      discPercentage: new FormControl('0', [ Validators.required]),
      discount: new FormControl('', [ Validators.required]),
      vatCategory: new FormControl('', [ Validators.required]),
      vatPer: new FormControl('', [ Validators.required]),
      vatAmount: new FormControl('', [ Validators.required]),
      netValue: new FormControl('', [ Validators.required]),
      remarks: new FormControl('', [ Validators.required]),
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
