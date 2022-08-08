import { Injectable} from '@angular/core';    
import {InMemoryDbService} from 'angular-in-memory-web-api'
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{


  constructor() { }
  createDb(){

   let  cards =  [
    {  id:  1,  name:  'Charizard', owner: 'Noah', price: 2500, isSale: true },
    {  id:  2,  name:  'Blastoise', owner: 'Mark', price: 2000, isSale: true },
    {  id:  3,  name:  'Venasaur', owner: 'Playto', price: 1500, isSale: true },
    {  id:  4,  name:  'MewTwo', owner: 'Baman', price: 99999, isSale: false},
    
   ];

   return {cards};

  }


}