import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // ✅ Import obligatoire
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, IonicModule], // ✅ Ajout de IonicModule ici
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  selectedRole: string = 'client';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedRole = params['role'] || 'client';
    });
  }

  register() {
    console.log(`Inscription en tant que ${this.selectedRole}`);
    if (this.selectedRole === 'client') {
      this.router.navigate(['/home-client']);
    } else {
      alert("Votre compte est en attente de validation par l'admin.");
      this.router.navigate(['/welcome']);
    }
  }
}
