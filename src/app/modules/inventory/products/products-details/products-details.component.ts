import { Component, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { throttle } from '@swimlane/ngx-charts/release/utils';
import { FORMERR } from 'dns';
import { FinanceService } from 'src/app/services/finance/finance.service';
import { LookupService } from 'src/app/services/lookup/lookup.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  @ViewChild('prodLookupDialog', { static: false }) prodLookupDialog!: TemplateRef<any>;

  currentYear = new Date().getFullYear()

  public prodForm: FormGroup;

  public slides = [];

  locationList: any[] = [];
  categoryList: any[] = [];
  subCategoryList: any[] = [];
  manufacturerList: any[] = [];
  brandList: any[] = [];
  supplierList: any[] = [];
  prodArr: any[] = [];

  selectedRowIndex: any = 0;

  prodDisplayedColumns: string[] = ["PCODE", "DESCRIPTION", "RETAILPRICE", "BARCODE"];
  prodDataSource = new MatTableDataSource(this.prodArr);
  
  constructor(private productService: ProductsService, private route: ActivatedRoute, private lookupService: LookupService, private financeservice: FinanceService, private uploadService: UploadService, private _snackBar: MatSnackBar, private dialog: MatDialog) { 
    this.lookupService.getCategory().subscribe((res: any) => {
      this.categoryList = res;
    })
    this.lookupService.getSubcategory().subscribe((res: any) => {
      this.subCategoryList = res;
    })
    this.lookupService.getLocation().subscribe((res: any) => {
      this.locationList = res;
    })     
    this.lookupService.getManufacturer().subscribe((res: any) => {
      this.manufacturerList = res;
    })     
    this.lookupService.getBrand().subscribe((res: any) => {
      this.brandList = res;
    })    
    this.financeservice.getSupplierList(String(this.currentYear)).subscribe((res: any) => {
      this.supplierList = res.recordset;
    }) 
    this.prodForm = new FormGroup({
      pcode: new FormControl('', [ Validators.required]),
      description: new FormControl('', [ Validators.required]),
      barcode: new FormControl('0000000000', [ Validators.required]),
      costPrice: new FormControl('0.00', [ Validators.required]),
      retailPrice: new FormControl('0.00', [ Validators.required]),
      dealerPrice: new FormControl('0.00', [ Validators.required]),
      categoryId: new FormControl('0', [ Validators.required]),
      subCategoryId: new FormControl('0', [ Validators.required]),
      manufacturerId: new FormControl('0', [ Validators.required]),
      supplierId: new FormControl('0', [ Validators.required]),
      qoh: new FormControl('0', [ Validators.required]),
      qoo: new FormControl('0', [ Validators.required]),
      reQty: new FormControl('0', [ Validators.required]),
      year: new FormControl(String(this.currentYear), [ Validators.required]),
      remarks: new FormControl('', [ Validators.required]),
      brand: new FormControl('0', [ Validators.required]),
      model: new FormControl('0', [ Validators.required]),
      dealer: new FormControl('0', [ Validators.required]),
      locationStock: new FormArray([]),
      documents: new FormArray([]),
      images: new FormArray([]),
    });
  }

  lookupProductDetails(code: string) {
    this.selectedRowIndex = 0;
    let dialogRef = this.dialog.open(this.prodLookupDialog);
    this.productService.searchProduct(code).subscribe((res: any) => {
      console.log(res)
      this.prodArr = res.recordset;
      this.prodDataSource = new MatTableDataSource(this.prodArr);
    }, (err: any) => {
      console.log(err)
    })
  }

  addLocation() {
    const loc = new FormGroup({
      prodLocation: new FormControl('', [Validators.required]),
      prodOpeningQty: new FormControl('', [Validators.required]),
      prodTotalIn: new FormControl('', [Validators.required]),
      prodTotalOut: new FormControl('', [Validators.required]),
      prodCurrentQty: new FormControl('', [Validators.required]),
    });
    this.locStock.push(loc);
  }

  deleteLocation(index: number) {
    if(this.locStock.length === 1){
      console.log(this.locStock)
    } else {
      this.locStock.removeAt(index);
    }
  }

  addDocument() {
    const document = new FormGroup({
      prodDocument: new FormControl('', []),
      prodDocumentSrc: new FormControl('', []),
      prodDocumentSource: new FormControl('', []),
      prodDocumentType: new FormControl('', []),      
      prodDocumentUrl: new FormControl('', [])
    });
    this.documents.push(document)
  }

  deleteDocument(index: number) {
    this.documents.removeAt(index)
  }
  
  addImage() {
    const image = new FormGroup({
      prodImage: new FormControl('', []),
      prodImageSrc: new FormControl('', []),
      prodImageSource: new FormControl('', []),
      prodImageType: new FormControl('', []),      
      prodImageUrl: new FormControl('', [])
    });
    this.images.push(image)
  }

  deleteImage(index: number) {
    this.images.removeAt(index)
  }

  onFileChange(event: any, type: string) {
    var filesList: FileList = event.target.files;
    const reader = new FileReader();
    if(type === "I") {
      if(event.target.files && event.target.files.length) {
        const fileToUpload: any = filesList.item(0);
        const fileNm: string = fileToUpload.name;
        reader.readAsDataURL(fileToUpload);
        reader.onload = () => {
          const docUrl = "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/documents/" + fileNm
            const image = new FormGroup({
              prodImage: new FormControl(fileToUpload, []),
              prodImageSrc: new FormControl(reader.result as String, []),
              prodImageSource: new FormControl(fileNm, []),
              prodImageType: new FormControl('', []),      
              prodImageUrl: new FormControl(docUrl, [])
            });
            this.images.push(image)
        };
        this.clearExtra(type)
        //this.selectedFileToUpload = fileToUpload;
      }
    } else if (type === "D") {
      if(event.target.files && event.target.files.length) {
        const fileToUpload: any = filesList.item(0);
        const fileNm: string = fileToUpload.name;
        reader.readAsDataURL(fileToUpload);
        reader.onload = () => {
          const docUrl = "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/documents/" + fileNm
            const document = new FormGroup({
              prodDocument: new FormControl(fileToUpload, []),
              prodDocumentSrc: new FormControl(reader.result as String, []),
              prodDocumentSource: new FormControl(fileNm, []),
              prodDocumentType: new FormControl('', []),      
              prodDocumentUrl: new FormControl(docUrl, [])
            });
            this.documents.push(document)
        };
        this.clearExtra(type)
        //this.selectedFileToUpload = fileToUpload;
      }
    }

  }

  clearExtra(type: string) {
    if(type === "I") {
      for(let i=0; i<this.images.length; i++){
        if(this.images.at(i).value.prodImage === ""){
          console.log('empty')
          this.deleteImage(i);
        } else {
          console.log(this.images.at(i).value.prodImage)
        }
      }
    } else if (type === "D") {
      for(let i=0; i<this.documents.length; i++){
        if(this.documents.at(i).value.prodDocument === ""){
          console.log('empty')
          this.deleteDocument(i);
        } else {
          console.log(this.documents.at(i).value.prodDocument)
        }
      }
    }
  }

  submitForm() {
    const data = this.prodForm.value;
    console.log(data)
    
    this.productService.getProduct(data.pcode.toUpperCase(),data.year).subscribe((res: any) => {
      if (res.recordset.length == 0) {
        console.log("insert")
        this.productService.postProduct(data.pcode.toUpperCase(), data.description, data.subCategoryId, data.costPrice, data.retailPrice, data.barcode, data.manufacturerId, data.reQty,data.supplierId, data.qoh, data.year, data.dealerPrice, data.remarks, data.qoo, data.brand, data.model, data.dealer, '')
        
        for(let i=0; i<data.locationStock.length;i++) {
          this.productService.postProductLocations(data.pcode.toUpperCase(),data.locationStock[i].prodLocation,data.locationStock[i].prodOpeningQty,data.year)
        }

        for(let i=0; i<data.documents.length; i++) {
          this.uploadService.uploadDoc(data.documents[i].prodDocument)
          this.productService.postProductDocuments(data.pcode.toUpperCase(), data.documents[i].prodDocumentSource,data.documents[i].prodDocumentType,'DOC')
        }

        for(let i=0; i<data.images.length; i++) {
          this.uploadService.uploadImage(data.images[i].prodImage)
          this.productService.postProductDocuments(data.pcode.toUpperCase(), data.images[i].prodImageSource,data.images[i].prodImageType,'IMG')
        }

        this._snackBar.open("Data Successfully Inserted!", "OK");
        //this.refreshForm();
        this.getData(data.pcode);

      } else {
        console.log("update")

        this.productService.updateProduct(data.pcode.toUpperCase(), data.description, data.subCategoryId, data.costPrice, data.retailPrice, data.barcode, data.manufacturerId, data.reQty, data.supplierId, data.qoh, data.year, data.dealerPrice, data.remarks, data.qoo, data.brand, data.model, data.dealer, '')
        for(let i=0; i<data.locationStock.length;i++) {
          this.productService.updateProductLocations(data.pcode.toUpperCase(),data.locationStock[i].prodLocation,data.locationStock[i].prodOpeningQty,data.year)
        }

        this.productService.getProductDocuments(data.pcode,'DOC').subscribe((respo: any) => {
          if (respo.recordset.length === 0) {
            for(let i=0; i<data.documents.length; i++) {
              this.uploadService.uploadDoc(data.documents[i].prodDocument)
              this.productService.postProductDocuments(data.pcode.toUpperCase(), data.documents[i].prodDocumentSource,data.documents[i].prodDocumentType,'DOC')
            }
          } else {
            this.productService.deleteProductDocument(data.pcode,'DOC').subscribe(() => {
              for(let i=0; i<data.documents.length; i++) {
                if(data.documents[i].prodDocument === 'Existing'){
                  this.productService.postProductDocuments(data.pcode.toUpperCase(), data.documents[i].prodDocumentSource,data.documents[i].prodDocumentType,'DOC')
                } else {
                  this.uploadService.uploadDoc(data.documents[i].prodDocument)
                  this.productService.postProductDocuments(data.pcode.toUpperCase(), data.documents[i].prodDocumentSource,data.documents[i].prodDocumentType,'DOC')
                }
              }
            })
          }
        }, (erro: any) => {
          for(let i=0; i<data.documents.length; i++) {
            this.uploadService.uploadDoc(data.documents[i].prodDocument)
            this.productService.postProductDocuments(data.pcode.toUpperCase(), data.documents[i].prodDocumentSource,data.documents[i].prodDocumentType,'DOC')
          }
        })

        this.productService.getProductDocuments(data.pcode,'IMG').subscribe((respo: any) => {
          if (respo.recordset.length === 0) {
            for(let i=0; i<data.images.length; i++) {
              this.uploadService.uploadImage(data.images[i].prodImage)
              this.productService.postProductDocuments(data.pcode.toUpperCase(), data.images[i].prodImageSource,data.images[i].prodImageType,'IMG')
            }
          } else {
            this.productService.deleteProductDocument(data.pcode,'IMG').subscribe(() => {
              for(let i=0; i<data.images.length; i++) {
                if(data.images[i].prodImage == 'Existing') {
                  this.productService.postProductDocuments(data.pcode.toUpperCase(), data.images[i].prodImageSource,data.images[i].prodImageType,'IMG')
                } else {
                  this.uploadService.uploadImage(data.images[i].prodImage)
                  this.productService.postProductDocuments(data.pcode.toUpperCase(), data.images[i].prodImageSource,data.images[i].prodImageType,'IMG')  
                }
              }
            })
          }
        }, (erro: any) => {
          for(let i=0; i<data.images.length; i++) {
            this.uploadService.uploadImage(data.images[i].prodImage)
            this.productService.postProductDocuments(data.pcode.toUpperCase(), data.images[i].prodImageSource,data.images[i].prodImageType,'IMG')
          }
        })
      
        this._snackBar.open("Data Successfully Updated!", "OK");
        //this.refreshForm();        
        this.getData(data.pcode.toUpperCase());

      }
    }, (err: any) => {
      console.log("insert")

      this.productService.postProduct(data.pcode, data.description, data.subCategoryId, data.costPrice, data.retailPrice, data.barcode, data.manufacturerId, data.reQty,data.supplierId, data.qoh, data.year, data.dealerPrice, data.remarks, data.qoo, data.brand, data.model, data.dealer, '')
        
        for(let i=0; i<data.locationStock.length;i++) {
          this.productService.postProductLocations(data.pcode,data.locationStock[i].prodLocation,data.locationStock[i].prodOpeningQty,data.year)
        }

        for(let i=0; i<data.documents.length; i++) {
          this.uploadService.uploadDoc(data.documents[i].prodDocument)
          this.productService.postProductDocuments(data.pcode, data.documents[i].prodDocumentSource,data.documents[i].prodDocumentType,'DOC')
        }

        for(let i=0; i<data.images.length; i++) {
          this.uploadService.uploadImage(data.images[i].prodImage)
          this.productService.postProductDocuments(data.pcode, data.images[i].prodImageSource,data.images[i].prodImageType,'IMG')
        }

        this._snackBar.open("Data Successfully Inserted!", "OK");
        //this.refreshForm();
        this.getData(data.pcode);

    })
    
  }

  ngOnInit() {
    if (this.route.snapshot.params.id === 'new') {
      this.newForm()
    } else {
      this.getData(this.route.snapshot.params.id)
    }
  }

  newForm(){
    this.refreshForm()
    this.slides = []
    var img = { src: "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/imgNaN.png" }
    this.slides.push(img);
    this.prodForm = new FormGroup({
      pcode: new FormControl('', [ Validators.required]),
      description: new FormControl('', [ Validators.required]),
      barcode: new FormControl('0000000000', [ Validators.required]),
      costPrice: new FormControl('0.00', [ Validators.required]),
      retailPrice: new FormControl('0.00', [ Validators.required]),
      dealerPrice: new FormControl('0.00', [ Validators.required]),
      categoryId: new FormControl('0', [ Validators.required]),
      subCategoryId: new FormControl('0', [ Validators.required]),
      manufacturerId: new FormControl('0', [ Validators.required]),
      supplierId: new FormControl('0', [ Validators.required]),
      qoh: new FormControl('0', [ Validators.required]),
      qoo: new FormControl('0', [ Validators.required]),
      reQty: new FormControl('0', [ Validators.required]),
      year: new FormControl(String(this.currentYear), [ Validators.required]),
      remarks: new FormControl('', [ Validators.required]),
      brand: new FormControl('0', [ Validators.required]),
      model: new FormControl('0', [ Validators.required]),
      dealer: new FormControl('0', [ Validators.required]),
      locationStock: new FormArray([]),
      documents: new FormArray([]),
      images: new FormArray([]),
    });
    this.productService.getLocationWiseProduct('NEW',String(this.currentYear)).subscribe((respo: any) => {
      const locStockArr = respo.recordset;
      for(let i=0; i<locStockArr.length; i++) {
        const loc = new FormGroup({
          prodLocation: new FormControl(locStockArr[i].LOCATIONID, [Validators.required]),
          prodOpeningQty: new FormControl(locStockArr[i].OPENING_QTY, [Validators.required]),
          prodTotalIn: new FormControl(locStockArr[i].TOTAL_IN, [Validators.required]),
          prodTotalOut: new FormControl(locStockArr[i].TOTAL_OUT, [Validators.required]),
          prodCurrentQty: new FormControl(locStockArr[i].CURRENT_QTY, [Validators.required]),
        });
        this.locStock.push(loc);
      }
    })
  }

  refreshForm() {
    this.slides = []
    this.prodForm = new FormGroup({
      pcode: new FormControl('', [ Validators.required]),
      description: new FormControl('', [ Validators.required]),
      barcode: new FormControl('0000000000', [ Validators.required]),
      costPrice: new FormControl('0.00', [ Validators.required]),
      retailPrice: new FormControl('0.00', [ Validators.required]),
      dealerPrice: new FormControl('0.00', [ Validators.required]),
      categoryId: new FormControl('0', [ Validators.required]),
      subCategoryId: new FormControl('0', [ Validators.required]),
      manufacturerId: new FormControl('0', [ Validators.required]),
      supplierId: new FormControl('0', [ Validators.required]),
      qoh: new FormControl('0', [ Validators.required]),
      qoo: new FormControl('0', [ Validators.required]),
      reQty: new FormControl('0', [ Validators.required]),
      year: new FormControl(String(this.currentYear), [ Validators.required]),
      remarks: new FormControl('', [ Validators.required]),
      brand: new FormControl('0', [ Validators.required]),
      model: new FormControl('0', [ Validators.required]),
      dealer: new FormControl('0', [ Validators.required]),
      locationStock: new FormArray([]),
      documents: new FormArray([]),
      images: new FormArray([]),
    });
  }

  getData(pcode: string) {
    this.refreshForm()
    this.productService.getProduct(pcode, String(this.currentYear)).subscribe((res: any) => {
      console.log(res)
      this.lookupService.getSubcategoryDetails(res.recordset[0].SUBCATEGORY_ID).subscribe((resp: any) => {
        console.log(resp)
        if(resp.recordset.length === 0) {
          this.prodForm.patchValue({
            pcode: res.recordset[0].PCODE,
            description: res.recordset[0].DESCRIPTION,
            barcode: res.recordset[0].BARCODE,
            costPrice: res.recordset[0].COSTPRICE,
            retailPrice: res.recordset[0].RETAILPRICE,
            dealerPrice: res.recordset[0].DEALERPRICE,
            categoryId: '0',
            subCategoryId: res.recordset[0].SUBCATEGORY_ID,
            manufacturerId: res.recordset[0].MANUFACTURER_ID,
            supplierId: res.recordset[0].SUPPLIER_ID,
            qoh: res.recordset[0].QOH,
            qoo: res.recordset[0].QOO,
            reQty: res.recordset[0].REORDER,
            year: res.recordset[0].YEAR,
            remarks: res.recordset[0].REMARKS,
            brand: res.recordset[0].DESC1,
            model: res.recordset[0].DESC2,
            dealer: res.recordset[0].DESC3,
          });
          this.productService.getLocationWiseProduct(res.recordset[0].PCODE,String(this.currentYear)).subscribe((respo: any) => {
            console.log(respo)
            const locStockArr = respo.recordset;
            for(let i=0; i<locStockArr.length; i++) {
              const loc = new FormGroup({
                prodLocation: new FormControl(locStockArr[i].LOCATIONID, [Validators.required]),
                prodOpeningQty: new FormControl(locStockArr[i].OPENING_QTY, [Validators.required]),
                prodTotalIn: new FormControl(locStockArr[i].TOTAL_IN, [Validators.required]),
                prodTotalOut: new FormControl(locStockArr[i].TOTAL_OUT, [Validators.required]),
                prodCurrentQty: new FormControl(locStockArr[i].CURRENT_QTY, [Validators.required]),
              });
              this.locStock.push(loc);
            }
          })
          this.productService.getProductDocuments(res.recordset[0].PCODE,'DOC').subscribe((respo: any) => {
            console.log(respo)
            for(let i=0; i<respo.recordset.length; i++) {
              const docUrl = "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/documents/" + respo.recordset[i].DOCUMENTNAME
              const document = new FormGroup({
                prodDocument: new FormControl('Existing', []),
                prodDocumentSrc: new FormControl(docUrl, []),
                prodDocumentSource: new FormControl(respo.recordset[i].DOCUMENTNAME, []),
                prodDocumentType: new FormControl(respo.recordset[i].DOCUMENTTYPE, []),      
                prodDocumentUrl: new FormControl(docUrl, [])
              });
              this.documents.push(document)
            }
          })
          this.productService.getProductDocuments(res.recordset[0].PCODE,'IMG').subscribe((respo: any) => {
            console.log(respo)
            if (respo.recordset.length === 0) {
              var img = { src: "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/imgNaN.png" }
              this.slides.push(img);
            } else {
              for(let i=0; i<respo.recordset.length; i++) {
                const docUrl = "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/" + respo.recordset[i].DOCUMENTNAME
                const image = new FormGroup({
                  prodImage: new FormControl('Existing', []),
                  prodImageSrc: new FormControl(docUrl, []),
                  prodImageSource: new FormControl(respo.recordset[i].DOCUMENTNAME, []),
                  prodImageType: new FormControl(respo.recordset[i].DOCUMENTTYPE, []),      
                  prodImageUrl: new FormControl(docUrl, [])
                });
                this.images.push(image)
                var img = { src: docUrl }
                this.slides.push(img)
              }
            }
          }, (err: any) => {
            var img = { src: "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/imgNaN.png" }
            this.slides.push(img);
          })
        } else {
          this.prodForm.patchValue({
            pcode: res.recordset[0].PCODE,
            description: res.recordset[0].DESCRIPTION,
            barcode: res.recordset[0].BARCODE,
            costPrice: res.recordset[0].COSTPRICE,
            retailPrice: res.recordset[0].RETAILPRICE,
            dealerPrice: res.recordset[0].DEALERPRICE,
            categoryId: resp.recordset[0].CATEGORY_ID,
            subCategoryId: res.recordset[0].SUBCATEGORY_ID,
            manufacturerId: res.recordset[0].MANUFACTURER_ID,
            supplierId: res.recordset[0].SUPPLIER_ID,
            qoh: res.recordset[0].QOH,
            qoo: res.recordset[0].QOO,
            reQty: res.recordset[0].REORDER,
            year: res.recordset[0].YEAR,
            remarks: res.recordset[0].REMARKS,
            brand: res.recordset[0].DESC1,
            model: res.recordset[0].DESC2,
            dealer: res.recordset[0].DESC3,
          });
          this.productService.getLocationWiseProduct(res.recordset[0].PCODE,String(this.currentYear)).subscribe((respo: any) => {
            console.log(respo)
            const locStockArr = respo.recordset;
            for(let i=0; i<locStockArr.length; i++) {
              const loc = new FormGroup({
                prodLocation: new FormControl(locStockArr[i].LOCATIONID, [Validators.required]),
                prodOpeningQty: new FormControl(locStockArr[i].OPENING_QTY, [Validators.required]),
                prodTotalIn: new FormControl(locStockArr[i].TOTAL_IN, [Validators.required]),
                prodTotalOut: new FormControl(locStockArr[i].TOTAL_OUT, [Validators.required]),
                prodCurrentQty: new FormControl(locStockArr[i].CURRENT_QTY, [Validators.required]),
              });
              this.locStock.push(loc);
            }
          })
          this.productService.getProductDocuments(res.recordset[0].PCODE,'DOC').subscribe((respo: any) => {
            console.log(respo)
            for(let i=0; i<respo.recordset.length; i++) {
              const docUrl = "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/documents/" + respo.recordset[i].DOCUMENTNAME
              const document = new FormGroup({
                prodDocument: new FormControl('Existing', []),
                prodDocumentSrc: new FormControl(docUrl, []),
                prodDocumentSource: new FormControl(respo.recordset[i].DOCUMENTNAME, []),
                prodDocumentType: new FormControl(respo.recordset[i].DOCUMENTTYPE, []),      
                prodDocumentUrl: new FormControl(docUrl, [])
              });
              this.documents.push(document)
            }
          })
          this.productService.getProductDocuments(res.recordset[0].PCODE,'IMG').subscribe((respo: any) => {
            console.log(respo)
            if (respo.recordset.length === 0) {
              var img = { src: "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/imgNaN.png" }
              this.slides.push(img);
            } else {
              for(let i=0; i<respo.recordset.length; i++) {
                const docUrl = "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/" + respo.recordset[i].DOCUMENTNAME
                const image = new FormGroup({
                  prodImage: new FormControl('Existing', []),
                  prodImageSrc: new FormControl(docUrl, []),
                  prodImageSource: new FormControl(respo.recordset[i].DOCUMENTNAME, []),
                  prodImageType: new FormControl(respo.recordset[i].DOCUMENTTYPE, []),      
                  prodImageUrl: new FormControl(docUrl, [])
                });
                this.images.push(image)
                var img = { src: docUrl }
                this.slides.push(img)
              }
            }
          }, (err: any) => {
            var img = { src: "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/imgNaN.png" }
            this.slides.push(img);
          })
        }
      }, (err: any) => {
        this.prodForm.patchValue({
          pcode: res.recordset[0].PCODE,
          description: res.recordset[0].DESCRIPTION,
          barcode: res.recordset[0].BARCODE,
          costPrice: res.recordset[0].COSTPRICE,
          retailPrice: res.recordset[0].RETAILPRICE,
          dealerPrice: res.recordset[0].DEALERPRICE,
          categoryId: '0',
          subCategoryId: res.recordset[0].SUBCATEGORY_ID,
          manufacturerId: res.recordset[0].MANUFACTURER_ID,
          supplierId: res.recordset[0].SUPPLIER_ID,
          qoh: res.recordset[0].QOH,
          qoo: res.recordset[0].QOO,
          reQty: res.recordset[0].REORDER,
          year: res.recordset[0].YEAR,
          remarks: res.recordset[0].REMARKS,
          brand: res.recordset[0].DESC1,
          model: res.recordset[0].DESC2,
          dealer: res.recordset[0].DESC3,
        });
        this.productService.getLocationWiseProduct(res.recordset[0].PCODE,String(this.currentYear)).subscribe((respo: any) => {
          console.log(respo)
          const locStockArr = respo.recordset;
          for(let i=0; i<locStockArr.length; i++) {
            const loc = new FormGroup({
              prodLocation: new FormControl(locStockArr[i].LOCATIONID, [Validators.required]),
              prodOpeningQty: new FormControl(locStockArr[i].OPENING_QTY, [Validators.required]),
              prodTotalIn: new FormControl(locStockArr[i].TOTAL_IN, [Validators.required]),
              prodTotalOut: new FormControl(locStockArr[i].TOTAL_OUT, [Validators.required]),
              prodCurrentQty: new FormControl(locStockArr[i].CURRENT_QTY, [Validators.required]),
            });
            this.locStock.push(loc);
          }
        })
        this.productService.getProductDocuments(res.recordset[0].PCODE,'DOC').subscribe((respo: any) => {
          console.log(respo)
          for(let i=0; i<respo.recordset.length; i++) {
            const docUrl = "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/documents/" + respo.recordset[i].DOCUMENTNAME
            const document = new FormGroup({
              prodDocument: new FormControl('Existing', []),
              prodDocumentSrc: new FormControl(docUrl, []),
              prodDocumentSource: new FormControl(respo.recordset[i].DOCUMENTNAME, []),
              prodDocumentType: new FormControl(respo.recordset[i].DOCUMENTTYPE, []),      
              prodDocumentUrl: new FormControl(docUrl, [])
            });
            this.documents.push(document)
          }
        })
        this.productService.getProductDocuments(res.recordset[0].PCODE,'IMG').subscribe((respo: any) => {
          console.log(respo)
          if (respo.recordset.length === 0) {
            var img = { src: "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/imgNaN.png" }
            this.slides.push(img);
          } else {
            for(let i=0; i<respo.recordset.length; i++) {
              const docUrl = "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/" + respo.recordset[i].DOCUMENTNAME
              const image = new FormGroup({
                prodImage: new FormControl('Existing', []),
                prodImageSrc: new FormControl(docUrl, []),
                prodImageSource: new FormControl(respo.recordset[i].DOCUMENTNAME, []),
                prodImageType: new FormControl(respo.recordset[i].DOCUMENTTYPE, []),      
                prodImageUrl: new FormControl(docUrl, [])
              });
              this.images.push(image)
              var img = { src: docUrl }
              this.slides.push(img)
            }
          }
        }, (err: any) => {
          var img = { src: "https://ifaqtworks-akpacific.s3.me-south-1.amazonaws.com/images/imgNaN.png" }
          this.slides.push(img);
        })
      })
    })
  }


  selectProduct(prod: any) {
    this.getData(prod.PCODE)
    let dialogRef = this.dialog.closeAll();
  }



  highlight(type: string, index: number){
    console.log(index);
    if (type === "prod") {
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

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  get f(){
    return this.prodForm.controls;
  }

  get locStock(): FormArray {
    return this.prodForm.get('locationStock') as FormArray
  }
  
  get documents(): FormArray {
    return this.prodForm.get('documents') as FormArray
  }
  
  get images(): FormArray {
    return this.prodForm.get('images') as FormArray
  }
}
