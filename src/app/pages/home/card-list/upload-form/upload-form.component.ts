import { Component, OnInit, EventEmitter, Output, Input,ViewChild } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CardListComponent } from '../../card-list/card-list.component';

import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2'

import { CardService } from 'src/app/services/card.service';


@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  @Output() uploadDetails : EventEmitter<any> = new EventEmitter<any>();
  card:any[]=[];
  uploadForm!: FormGroup;
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
    private dialogRef: MatDialogRef<UploadFormComponent>,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log(this._cs.getCardDetails());
    this.card = Object.values(this._cs.getCardDetails());
   
    this.uploadForm = this._fb.group({
      id: [this.card[0],],
      name: [this.card[1], [Validators.required, Validators.minLength(3)]],
      owner: [this.card[2],[Validators.required]],
      price: [this.card[3],[Validators.required]],
      isSale: [this.card[4],[Validators.required]],
      fileSource: ['']
    });

  }

   createCard(){

      this.checkFile();

      if(this.uploadForm.valid){
    
        this.uploadDetails.emit(this.uploadForm.value);

        this.dialogRef.close();

      Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })

  }

   
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
                    this.uploadForm.patchValue({fileSource: reader.result });
             
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
  this.isFilesource =  this.uploadForm.get('fileSource')?.value == 'undefined' ? false : true
}





}