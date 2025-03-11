import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // ✅ Import RouterModule
@Component({
  selector: 'app-create-photo',
  templateUrl: './create-photo.page.html',
  styleUrls: ['./create-photo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class CreatePhotoPage {
  selectedFiles?: FileList;
  currentFiles: File[] = [];
  progressInfos: { value: number, fileName: string }[] = [];
  message = '';

  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService,
    private router: Router
  ) { }

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

    this.uploadService.upload(file).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = 'Upload success.';
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      error: (err: any) => {
        this.progressInfos[index].value = 0;
        this.message = 'Could not upload the file ' + file.name;
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
    this.uploadService.deleteFile(fileName).subscribe({
      next: (response) => {
        this.message = response;
        this.fileInfos = this.uploadService.getFiles();
      },
      error: (err) => {
        console.log(err);
        this.message = 'Could not delete the file!';
      }
    });
  }
  

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  cancel() {
    this.router.navigate(["/photo"]);
  }
}
