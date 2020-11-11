import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Video } from '../../models/youtube.models';
import swal from 'sweetalert2';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: Video[] = [];

  constructor(private youtubeServices: YoutubeService) { }

  ngOnInit(): void {
    this.cargarVideos();
  }

  cargarVideos() {
    this.youtubeServices.getVideos().subscribe(resp => this.videos.push(...resp));
  }

  mostrarVideo(video: Video) {
    swal.fire({
      html: `
      <h4>${video.title}</h4>
      <iframe width="100%"
              height="315"
              src="https://www.youtube.com/embed/${video.resourceId}"
              frameborder="0"
              allow="accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture"
              allowfullscreen>
      </iframe>
      `
    });
  }
}
