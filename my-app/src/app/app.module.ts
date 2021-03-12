import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StockComponent } from './stock/stock.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from './material.module';
import { ListComponent } from './list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockDataService } from './stock-data.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponentDialog as NavbarComponentDialog } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    NavbarComponent,
    ListComponent,
    DashboardComponent,
    NavbarComponentDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule
  ],
  providers: [StockDataService],
  bootstrap: [AppComponent],
  entryComponents: [NavbarComponentDialog]
})
export class AppModule { }
