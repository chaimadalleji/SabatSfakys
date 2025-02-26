import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-orders-vendeur',
  templateUrl: './orders-vendeur.page.html',
  styleUrls: ['./orders-vendeur.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OrdersVendeurPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
