import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photo.service';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { IonicModule } from '@ionic/angular'; // Import du module Ionic
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule,CommonModule, RouterModule] // Assurez-vous que IonicModule est importé ici

})
export class PhotoPage  {
  selectedFiles?: FileList;
  currentFiles: File[] = [];
  progressInfos: { value: number, fileName: string }[] = [];
  message = '';

  fileInfos?: Observable<any>;

  constructor(private photoService: PhotoService
    ,private router:Router,
  ) {}
  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    this.currentFiles = Array.from(this.selectedFiles || []);
    this.progressInfos = this.currentFiles.map(file => ({ value: 0, fileName: file.name }));
  }

  upload(): void {
    this.message = '';

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const files: FileList = this.selectedFiles;

      Array.from(files).forEach((file, index) => {
        this.uploadFile(file, index);
      });
    }
  }

  uploadFile(file: File, index: number): void {
    if (!file) return;
  
    this.photoService.upload(file).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Update progress info for the current file
          this.progressInfos[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          // Success message and refresh the file list
          this.message = 'Upload successful.';
          this.fileInfos = this.photoService.getFiles();  // Refresh file list
        }
      },
      error: (err: any) => {
        // Reset progress and show error message
        this.progressInfos[index].value = 0;
        this.message = `Could not upload the file ${file.name}`;
      }
    });
  }
  
  openDeleteModal(fileName: string): void {
    // Afficher une boîte de dialogue de confirmation
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer le fichier ${fileName}?`);
  
    if (confirmDelete) {
      this.deleteFile(fileName);
    }
  }
  
  deleteFile(fileName: string): void {
    this.photoService.deleteFile(fileName).subscribe({
      next: (response) => {
        this.message = response;
        this.fileInfos = this.photoService.getFiles();
      },
      error: (err) => {
        console.log(err);
        this.message = 'Could not delete the file!';
      }
    });
  }
  

  ngOnInit(): void {
    this.fileInfos = this.photoService.getFiles();

  }
 
 
  


    getEditPhotoUrl(id: number): string {
      return `/editPhoto/${id}`;
    }

  redirectToCreatePhoto() {
    this.router.navigate(['/createPhoto']);
  }



// Inject Router in the component constructor


navigateToEditPhoto(photoId: number): void {
    this.router.navigate(['/editPhoto', photoId]);
}

}