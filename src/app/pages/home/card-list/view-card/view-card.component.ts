import { Component, OnInit,Output,EventEmitter,ViewChild } from '@angular/core';
import { CardListComponent } from '../card-list.component';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/model/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateFormComponent } from '../update-form/update-form.component';
@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent implements OnInit {
  @Output() updateDetails : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _cs: CardService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ViewCardComponent>) { }
  card:any;
  
  ngOnInit(): void {
    this.card = this._cs.getCardDetails();

  }

  openUpdateForm() {
    
    this.dialogRef.close();
    let dialogRef = this.dialog.open(UpdateFormComponent);
    dialogRef.componentInstance["updateDetails"].subscribe(event=> {
   

      this._cs.updateCard(event).subscribe((res)=>{
        console.log("Card updated: ", res);
      });
  
    })
    
 
  }

  

}
