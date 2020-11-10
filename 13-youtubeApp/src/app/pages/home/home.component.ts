import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Video } from '../../models/youtube.models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: Video[] = [];

  constructor(private youtubeServices: YoutubeService) { }

  ngOnInit(): void {
    this.youtubeServices.getVideos().subscribe(resp => this.videos.push(...resp));
  }

}