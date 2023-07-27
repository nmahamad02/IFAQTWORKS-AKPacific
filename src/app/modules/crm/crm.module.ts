import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { QuotationsListComponent } from './quotations/quotations-list/quotations-list.component';
import { QuotationsDetailsComponent } from './quotations/quotations-details/quotations-details.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule, MatDatepickerModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule, MatSnackBarModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';

export const crmRoutes = [
  {
    path: 'customer-list',
    component: CustomerListComponent
  },
  {
    path: 'customer/details/:id',
    component: CustomerDetailsComponent
  },
  {
    path: 'contact-list',
    component: ContactListComponent
  },
  {
    path: 'contact/details/:id',
    component: ContactDetailsComponent
  },
  {
    path: 'quotation-list',
    component: QuotationsListComponent
  },
  {
    path: 'quotation/details/:id',
    component: QuotationsDetailsComponent
  },
];

@NgModule({
  declarations: [
    CustomerListComponent, 
    CustomerDetailsComponent, 
    QuotationsListComponent, 
    QuotationsDetailsComponent, 
    ContactListComponent, 
    ContactDetailsComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    ChartsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSortModule,
    FormsModule,
    PdfViewerModule,
    ReactiveFormsModule,
    RouterModule.forChild(crmRoutes)
  ]
})
export class CrmModule { }
