import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule], // Importer les modules nécessaires
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {}
