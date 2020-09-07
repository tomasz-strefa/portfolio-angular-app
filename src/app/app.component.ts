import { Component } from '@angular/core';
import { MovieService } from './model/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Katalog filmów';

  users: any = [];
  movies: any = [];
  counterMovies: any = {};

  constructor(public movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
    this.countMovies();
  }

  // Movies list
  loadMovies() {
    return this.movieService.getMovies().subscribe((data: {}) => {
      this.movies = data;
    });
  }

  // Delete movie
  deleteMovie(movieId: number) {
    this.movieService.deleteMovie(movieId).subscribe((data: {}) => {
      this.loadMovies();
      this.countMovies();
    });
  }

  // Count movies  
  countMovies() {
    this.movieService.countMovies().subscribe((data: {}) => {
      this.counterMovies = data;
    });
  }

}
