import { Component } from '@angular/core';
import { distinctUntilKeyChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  onInit() {
    onclick = (event) => { 
      alert(event.detail)    
    };
  }
  ngAfterViewInit() {
    document.addEventListener('click', (event) => {
      let detalle = document.getElementById('detalle') as HTMLElement;
      if(!event.composedPath().includes(detalle)){
        if(detalle.classList.contains('show')){
          this.animateSideHide('detalle');
        }
      }
      
    });
  }
  
  change = false;
  changeMap(){
    let mapa = document.getElementById('map') as HTMLElement;
    if(this.change){
      mapa.style.backgroundImage = 'url(./../../../assets/images/backgrounds/map.png)'
      this.change = false;
    }
    else{
      mapa.style.backgroundImage = 'url(./../../../assets/images/backgrounds/map2.png)'
      this.change = true;
    }
  }
  abrirDetalle(){
    this.animateSideShow('detalle')
  }
  animateSideShow(id:string){
    let component = document.getElementById(id) as HTMLElement;
    let element = component.style;
    element.minWidth = 'initial';
    element.width = '0';
    element.display = 'block';
    setTimeout(() => {
      element.width = '' 
      setTimeout(() => {
        
        element.minWidth = '' 
      }, 200);
      component.classList.add('show')
    }, 300);
  }
  animateSideHide(id:string){
    let component = document.getElementById(id) as HTMLElement;
    let element = component.style;
    element.minWidth = 'initial';
    element.width = '0';
    setTimeout(() => {
      element.display = 'none';
      component.classList.remove('show')
    }, 300);
  }
}