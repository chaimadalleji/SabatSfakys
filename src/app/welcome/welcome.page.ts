import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // ✅ Import obligatoire
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, IonicModule], // ✅ Ajout de IonicModule ici
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
  constructor(private router: Router) {}

  selectAccount(role: string) {
    this.router.navigate(['/login'], { queryParams: { role } });
  }
}
