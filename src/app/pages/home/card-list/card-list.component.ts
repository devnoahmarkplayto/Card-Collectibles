import {Component, Input, SimpleChanges, OnInit,AfterViewInit} from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import {MatDialog} from "@angular/material/dialog";
import { Card } from 'src/app/model/card';
import { UpdateFormComponent } from './update-form/update-form.component';
import { ViewCardComponent } from './view-card/view-card.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input()searchText!:string;
  @Input() uploadData: any;

  currentCardsToShow:any[]=[];
  isSale:boolean = false;
  isLoaded:boolean = false;
  cards!:any;
  card:any[]=[];
  sold:any[]=[];
  sale:any[]=[];
  isActivated: boolean = true;
  filterBy = 'All';
  errors: any;

  constructor(
    private _cs: CardService,
    public dialog: MatDialog
    ) {}


    ngOnChanges(changes: any): void {

      if(changes.uploadData.currentValue){
        this.getAllCards();
  
      }
      this.getAllCards();
  
  }

  ngOnInit(): void {

    this.getAllCards();
    this._cs.uploadData$.subscribe((data:any) => {
        //RECALL METHOD IF CHANGES HAPPEN IN FORM
        this.getAllCards();
     })
   
  }

  //OPEN UPDATE DIALOG
  openUpdateForm(card:Card) {
   
   
    this._cs.setCardDetails(card);
    
    let dialogRef = this.dialog.open(UpdateFormComponent);
    dialogRef.componentInstance["updateDetails"].subscribe(event=> {
   
      this.updateCard(event);
    })

  }

//RENDERED CARD DATA  
getAllCards() {
  this.filterBy = 'All';
  this._cs.getAllCards().subscribe((res:any)=>{
   
  
    setTimeout(() => {

      this.cards = res;
     }, 500);
    
  })
}

//RETURN VIEW CARD MODAL
getCardById(id:number) {
  this._cs.getCardById(id).subscribe((res:any)=>{
   
    this.card = res;
    this._cs.setCardDetails(res);
  }),(error:any) => {
 
    this.errors = error
}

if (!this.errors) {
//route to new page

setTimeout(() => {

  let dialogRef = this.dialog.open(ViewCardComponent, {
    panelClass: 'view-form'
  });
  
 }, 1000);


}
}


//Get Sold Cards
getSoldCards() {
  this.filterBy = 'Sold';
  this._cs.getSoldCards().subscribe((res:any)=>{
    this.cards =  res;
    this.cards = this.cards.filter((card:any) => card.isSale == false ); 

  })
}
//Get Cards on Sale
getSaleCards() {
  this.filterBy = 'Sale';
  this._cs.getSaleCards().subscribe((res:any)=>{
      
      this.cards =  res;
      this.cards = this.cards.filter((card:any) => card.isSale == true ); 
  })
}

//ADD
addCard(card:any){

  this._cs.createCard(card).subscribe((res)=>{
        console.log("Card created: ", res);
      
  });
  this.getAllCards();
}

//DELETE 
deleteCard(cardId:number){

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result:any) => {
    if (result.isConfirmed) {
      
    this._cs.deleteCardById(cardId).subscribe((res:any)=>{
    console.log("Card deleted: ", res);
})
    this.getAllCards();

      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}

//UPDATE
updateCard(card:Card){

this._cs.updateCard(card).subscribe((res)=>{
  console.log("Card updated: ", res);
});
this.getAllCards();
}  

//BUY
buyCard(card:Card){

  Swal.fire({
    title: 'Are you sure?',
    text: card.name,
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Buy!'
  }).then((result:any) => {
    if (result.isConfirmed) {
      
      card.isSale = false;
      this._cs.updateCard(card).subscribe((res)=>{
        console.log("Card updated: ", res);
      });
      this.getAllCards();
  
      Swal.fire(
        'Sold!',
        'Your card has been Deliver.',
        'success'
      )
    }
  })
}
  


//Filter Data
applyFilter(isSale: boolean,filterBy:string,isClick:boolean) {


    this.filterBy = filterBy;
    this.cards = this.cards.filter((card:any) => card.isSale == isSale );  


}

onPageChange($event:any) {
  this.currentCardsToShow  =  this.cards.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
}


}