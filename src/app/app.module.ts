import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { DispatchesComponent } from './components/dispatches/dispatches.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReportsComponent } from './components/reports/reports.component';
import { CreateDispatchComponent } from './components/dispatches/create-dispatch/create-dispatch.component';
import { CreateShipmentComponent } from './components/shipments/create-shipment/create-shipment.component';
import { ButtonBackComponent } from './components/helpers/button-back/button-back.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS, MatMomentDateModule,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { CloseDispatchComponent } from './components/dispatches/close-dispatch/close-dispatch.component';
import { ProductsComponent } from './components/products/products.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainComponent,
    ShipmentsComponent,
    DispatchesComponent,
    RegisterComponent,
    UsersComponent,
    ReportsComponent,
    CreateDispatchComponent,
    CreateShipmentComponent,
    ButtonBackComponent,
    CloseDispatchComponent,
    ProductsComponent,
    EditProductComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    MatTabsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'ru'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
