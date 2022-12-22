import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  fullScreen(){
    let fullS = document.getElementById('fullS') as HTMLElement;
    let noFull = document.getElementById('noFull') as HTMLElement;
    fullS.style.scale = '0'
    setTimeout(() => {
      fullS.style.display = 'none';
      setTimeout(() => {
        noFull.style.scale ='0';
        noFull.style.display = 'block';
        setTimeout(() => {
          noFull.style.scale ='1';
          setTimeout(() => {
            document.documentElement.requestFullscreen()
          }, 100);
        }, 200);
      }, 100);
    }, 200);
  }
  noFullScreen(){
    let fullS = document.getElementById('fullS') as HTMLElement;
    let noFull = document.getElementById('noFull') as HTMLElement;
    noFull.style.scale = '0'
    setTimeout(() => {
      noFull.style.display = 'none';
      setTimeout(() => {
        fullS.style.scale ='0';
        fullS.style.display = 'block';
        setTimeout(() => {
          fullS.style.scale ='1';
          setTimeout(() => {
            document.exitFullscreen();
          }, 100);
        }, 200);
      }, 100);
    }, 200);
  }
}
