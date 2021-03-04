import { NgModule } from '@angular/core';


import {MatButtonModule } from '@angular/material/button';
import {MatMenuModule } from '@angular/material/menu';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule } from '@angular/material/icon';
import {MatCardModule } from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule
  ]
})
export class MaterialModule {}