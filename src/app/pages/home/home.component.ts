import { Component, OnInit,OnChanges,EventEmitter,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/model/card';
import { CardService } from 'src/app/services/card.service';
import { CardListComponent } from './card-list/card-list.component';
import { UploadFormComponent } from './card-list/upload-form/upload-form.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  @ViewChild(CardListComponent) cardList !:CardListComponent; 
  
  searchText:string='';
  cardDetails!:Card;
  isActivated: boolean = true;
  constructor(
    public dialog: MatDialog,
    private _cs:CardService 
    ) { }

  ngOnInit(): void {
   
  }



  openUploadForm() {
    this._cs.resetCardDetails();
    let dialogRef = this.dialog.open(UploadFormComponent);
    dialogRef.componentInstance["uploadDetails"].subscribe(event=> {
      console.log(event);
      this.cardList.addCard(event);
    })
  }



  onClick(path: string){

    if(path == 'cardlist'){
      this.isActivated = true
    }
  }



}
