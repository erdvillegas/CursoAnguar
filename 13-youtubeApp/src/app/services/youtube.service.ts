import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse, Item } from '../models/youtube.models';
import { map, pluck, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeURL = 'https://youtube.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyDR9JnwJHiRJG8Qo-CF2loR9KifQNT8OII';
  private channelID = 'UCuaPTYj15JSkETGnEseaFFg';
  private playlistId = 'PLCKuOXG0bPi2GD3Bq55ysZfQJz2k-LiEz';
  private nextpagetoken = '';


  constructor(private http: HttpClient) { }

  getVideos() {
    const url = `${this.youtubeURL}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playlistId)
      .set('key', this.apikey);

    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'http://127.0.0.1:4200/');

    return this.http.get<YoutubeResponse>(url, { params }).pipe(
      map(resp => {
        this.nextpagetoken = resp.nextPageToken;
        return resp.items;
      }),
      map(items => items.map(video => video.snippet))
    );
  }
}
