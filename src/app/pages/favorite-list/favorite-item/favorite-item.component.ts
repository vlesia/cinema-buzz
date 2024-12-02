import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrl: './favorite-item.component.scss',
})
export class FavoriteItemComponent {
  @Input() movie!: Movie;
  @Output() onRemove = new EventEmitter<void>();
  @Output() imageClick = new EventEmitter<number>();

  removeFavorite(): void {
    this.onRemove.emit();
  }

  onImageClick(movieId: number): void {
    this.imageClick.emit(movieId);
  }
}
