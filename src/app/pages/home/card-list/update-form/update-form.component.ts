import { Component, OnInit, EventEmitter, Output,ViewChild } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CardListComponent } from '../../card-list/card-list.component';
import Swal from 'sweetalert2'

import { CardService } from 'src/app/services/card.service';


@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {
  @ViewChild(CardListComponent) cardList !:CardListComponent; 
  @Output() updateDetails : EventEmitter<any> = new EventEmitter<any>();
  card:any;
  updateForm!: FormGroup;
  id!: string;
  folder!: string;
  filename!:string;
  imgType!:string;
  isFilesource!: boolean;
  isUploading: boolean = false;
  shortLink: string = "";
  
  categories: any[] = [
    {value: true, viewValue: 'For Sale'},
    {value: false, viewValue: 'Sold'},
  ];

  constructor(
   
    private _cs: CardService,
    private _fb: FormBuilder,  
    private dialogRef: MatDialogRef<UpdateFormComponent>) { }

  
  ngOnInit(): void {


    this.card = Object.values(this._cs.getCardDetails());

    this.updateForm = this._fb.group({
      id: [this.card[0],],
      name: [this.card[1], [Validators.required, Validators.minLength(3)]],
      owner: [this.card[2],[Validators.required]],
      price: [this.card[3],[Validators.required]],
      isSale: [this.card[4],[Validators.required]],
      fileSource: ['']
    });

  }

   updateCard(){

    this.checkFile();

      if(this.updateForm.valid){

    this.updateDetails.emit(this.updateForm.value);

    this.dialogRef.close();

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
 
  }

  this._cs.uploadData$.next(this.updateForm.value)
   
}


onFileChange(event:any) {

  const reader = new FileReader();
    if(event.target.files && event.target.files.length) {

      const file: File  = event.target.files[0];
      reader.readAsDataURL(file);
      this.isUploading = !this.isUploading;
  
      this._cs.uploadImage(file).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {
                  this.updateForm.patchValue({fileSource: reader.result });
         
                  this.isUploading = false; // Flag variable 
              }
          }
      );
  }
}

getImage(){
  return this._cs.ImgLink(this.folder,this.filename,this.imgType);
}

checkFile(){
  this.isFilesource =  this.updateForm.get('fileSource')?.value == 'undefined' ? false : true
}





}