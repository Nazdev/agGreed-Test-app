import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponseModel } from '../models/youtube-api/search/search-response.model';

@Injectable()
export class YoutubeApiService {

  private YOUTUBE_TOKEN = 'AIzaSyCJPJrvmKBqB1rmn9bLzMrIh8ZKKx14rnU';

  constructor(public http: HttpClient ) {}

  public getData(): Observable<SearchResponseModel> {
    return this.http.get<any>( `https://www.googleapis.com/youtube/v3/search?key=${this.YOUTUBE_TOKEN}&maxResults=50&type=video&part=snippet&q=john`);
  }
}
