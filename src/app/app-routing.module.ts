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

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'shipments', component: ShipmentsComponent, canActivate: [AuthGuard]},
  {path: 'shipments/create_shipment', component: CreateShipmentComponent, canActivate: [AuthGuard]},
  {path: 'dispatches', component: DispatchesComponent, canActivate: [AuthGuard]},
  {path: 'dispatches/create_dispatch', component: CreateDispatchComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
