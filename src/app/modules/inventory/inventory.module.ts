import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { RouterModule } from '@angular/router';
import { LookupComponent } from './lookup/lookup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDatepickerModule, MatTableModule, MatButtonModule, MatCardModule, MatSelectModule, MatPaginatorModule, MatDividerModule, MatSortModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HomeModule } from '../home/home.module';

export const inventoryRoutes = [
  {
    path: 'product-list',
    component: ProductsListComponent
  },
  {
    path: 'product/details/:id',
    component: ProductsDetailsComponent
  },
  {
    path: 'lookup',
    component: LookupComponent
  },
];

@NgModule({
  declarations: [
    ProductsListComponent, 
    ProductsDetailsComponent, 
    LookupComponent
  ],
  imports: [
    HomeModule,
    MatIconModule,
    CommonModule,
    ChartsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSortModule,
    FormsModule,
    PdfViewerModule,
    ReactiveFormsModule,
    RouterModule.forChild(inventoryRoutes)
  ]
})
export class InventoryModule { }
