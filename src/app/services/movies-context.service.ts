import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class MoviesContextService {
  private currentContext: string = 'home';
  private currentPage: number = 1;

  setContext(context: string): void {
    this.currentContext = context;
  }

  getContext(): string {
    return this.currentContext;
  }

  setPage(page: number): void {
    this.currentPage = page;
  }

  getPage(): number {
    return this.currentPage;
  }
}
