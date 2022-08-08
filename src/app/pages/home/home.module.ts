import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { CardListComponent } from './card-list/card-list.component';
import { UploadFormComponent } from './card-list/upload-form/upload-form.component';
import { UpdateFormComponent } from './card-list/update-form/update-form.component';
import { ViewCardComponent } from './card-list/view-card/view-card.component';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    HomeComponent,
    CardListComponent,
    UploadFormComponent,
    ViewCardComponent,
    UpdateFormComponent
  ],
  entryComponents: [

    UploadFormComponent
   
  ],
    imports: [
        HomeRoutingModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        Ng2SearchPipeModule
    ]
})
export class HomeModule { }