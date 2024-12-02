import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  selectedText: string = 'My Account';

  private router = inject(Router);

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/account':
            this.selectedText = 'My Account';
            break;
          case '/':
            this.selectedText = 'Home';
            break;
          case '/favorite':
            this.selectedText = 'My favorite';
            break;
          default:
            this.selectedText = 'My Account';
        }
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  updateText(text: string): void {
    this.selectedText = text;
  }
}
