import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Movie } from 'src/model/Movie';
import { Counter } from 'src/model/Counter';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // Base url
  baseurl = 'http://localhost:91/api';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // GET
  getMovies(): Observable<Movie> {
    return this.http.get<Movie>(this.baseurl + '/movies');
  }

  // DELETE
  deleteMovie(movieId: number) {
    return this.http.delete<Movie>(this.baseurl + '/movies/' + movieId, this.httpOptions);
  }

  // GET
  countMovies() {
    return this.http.get<Counter>(this.baseurl + '/movies/counter');
  }
  
}
