import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrl: './custom-pagination.component.scss',
})
export class CustomPaginationComponent implements OnInit {
  isSmallScreen: boolean = false;

  @Input() maxSize: number = 1;
  @Input() itemsPerPage: number = 20;
  @Input() totalItems: number = 1160;
  @Input() currentPage: number = 1;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageBoundsCorrection = new EventEmitter<number>();

  ngOnInit(): void {
    this.updateScreenSize();
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.updateScreenSize();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): { value: number; label: string }[] {
    if (this.isSmallScreen) {
      return [{ value: this.currentPage, label: this.currentPage.toString() }];
    }

    const pages = [];
    const startPage = Math.max(1, this.currentPage - this.maxSize);
    const endPage = Math.min(this.totalPages, this.currentPage + this.maxSize);

    for (let i = startPage; i <= endPage; i++) {
      pages.push({ value: i, label: i.toString() });
    }

    if (startPage > 1) {
      pages.unshift({ value: startPage - 1, label: '...' });
    }
    if (endPage < this.totalPages) {
      pages.push({ value: endPage + 1, label: '...' });
    }
    return pages;
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  previous(): void {
    if (!this.isFirstPage()) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  next(): void {
    if (!this.isLastPage()) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  setCurrent(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }

  goToFirst(): void {
    if (!this.isFirstPage()) {
      this.currentPage = 1;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToLast(): void {
    if (!this.isLastPage()) {
      this.currentPage = this.totalPages;
      this.pageChange.emit(this.currentPage);
    }
  }

  private updateScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 576;
  }
}
