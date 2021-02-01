import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { DispatchesComponent } from './components/dispatches/dispatches.component';
import { UsersComponent } from './components/users/users.component';
import { ReportsComponent } from './components/reports/reports.component';
import { CreateDispatchComponent } from './components/dispatches/create-dispatch/create-dispatch.component';
import { CreateShipmentComponent } from './components/shipments/create-shipment/create-shipment.component';
import { CloseDispatchComponent } from './components/dispatches/close-dispatch/close-dispatch.component';
import { ProductsComponent } from './components/products/products.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { HistoryDispatchesComponent } from './components/dispatches/history-dispatches/history-dispatches.component';
import { HistoryShipmentComponent } from './components/shipments/history-shipment/history-shipment.component';
import { HistoryProductComponent } from './components/products/history-product/history-product.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'shipments', component: ShipmentsComponent, canActivate: [AuthGuard]},
  {path: 'shipments/history', component: HistoryShipmentComponent, canActivate: [AuthGuard]},
  {path: 'shipments/create_shipment', component: CreateShipmentComponent, canActivate: [AuthGuard]},
  {path: 'dispatches', component: DispatchesComponent, canActivate: [AuthGuard]},
  {path: 'dispatches/history', component: HistoryDispatchesComponent, canActivate: [AuthGuard]},
  {path: 'dispatches/close/:id', component: CloseDispatchComponent, canActivate: [AuthGuard]},
  {path: 'dispatches/create_dispatch', component: CreateDispatchComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  {path: 'products/:id', component: EditProductComponent, canActivate: [AuthGuard]},
  {path: 'products/history/:id', component: HistoryProductComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
