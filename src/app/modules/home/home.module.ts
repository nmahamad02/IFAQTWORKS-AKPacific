import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule, MatSnackBarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { CarouselComponent } from './carousel/carousel.component';

export const homeRoutes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
];

@NgModule({
  declarations: [
    DashboardComponent, 
    AccountComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDividerModule,
    MatPaginatorModule,
    PdfViewerModule,
    MatDatepickerModule,
    MatSortModule,
    MatButtonModule,
    MatTabsModule,
    RouterModule.forChild(homeRoutes),
  ],
  exports: [
    CarouselComponent
  ],
  providers: [
    ThemeService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class HomeModule { }
