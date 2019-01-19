import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  destroy$ = new Subject();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ionViewDidEnter() {
    this.router.navigate(['/device-list']);
  }
}
