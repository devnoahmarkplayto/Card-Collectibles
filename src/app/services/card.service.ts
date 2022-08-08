import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,Subject } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';
import {Card} from 'src/app/model/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards:any;
  card:object={};
  uploadData$= new Subject();
  public fileLink = "src/assets/image";
  private SERVER_URL: string = "http://localhost:3000/api/";
  constructor(private httpClient: HttpClient) { }


  public setCard(cards:Card){
    this.card = cards;
  }
  public getCard(){return this.cards}


  public setCardDetails(card:Card){
    this.card = card;
  }
  public getCardDetails(){return this.card}

  public resetCardDetails(){
    this.card = {};
  }

  public getAllCards(){ 
    return this.httpClient.get(this.SERVER_URL + 'cards').pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  public getCardById(id:number){
       return this.httpClient.get(`${this.SERVER_URL + 'cards'}/${id}`).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      )
    }
  public createCard(card: Card){
      return this.httpClient.post(`${this.SERVER_URL + 'cards'}`, card).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      )
    }
  

  public deleteCardById(id:number){
      return this.httpClient.delete(`${this.SERVER_URL + 'cards'}/${id}`)
    }
  
  public updateCard(card: {id: number, name:string, owner: string, price: number, isSale: boolean}){
      return this.httpClient.put(`${this.SERVER_URL + 'cards'}/${card.id}`, card).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      )
    }

    public buyCard(card: {id: number,isSale: boolean}){
      return this.httpClient.put(`${this.SERVER_URL + 'cards'}/${card.id}`, card).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      )
    }

    public getSoldCards(){ 
      return this.httpClient.get(this.SERVER_URL + 'cards').pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      )
    }

    public getSaleCards(){ 
      return this.httpClient.get(this.SERVER_URL + 'cards').pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      )
    }

    
  ImgLink(foldername: string, filename: string, type: string){
    return `${this.fileLink}${foldername}/${filename}.${type}`
  }


  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();

    formData.append('image', image);

     return this.httpClient.post(this.fileLink, formData)
}
  

  }
