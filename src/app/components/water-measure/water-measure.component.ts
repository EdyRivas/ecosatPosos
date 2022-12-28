import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-water-measure',
  templateUrl: './water-measure.component.html',
  styleUrls: ['./water-measure.component.scss']
})
export class WaterMeasureComponent {
  @Input() idN: string
  constructor() { }

  bomba:string

  ngOnInit(): void {
    this.bomba = this.idN+'-bomba'
  }
  
  clickEnergy = false;
  clickFlash = false;
  changeEnergy(id:string){
    if (!this.clickFlash) {
      this.animateOn(id)
      this.clickFlash = true;
      this.encendido = true;
      this.motorOn()
    }else{ 
      this.animateOff(id)
      this.clickFlash = false;
      this.encendido = false;
      this.motorOn()
    }
  }
  encendido = false;
  motorOn(){      
    if(this.encendido )
      this.move()
    else 
    this.grow()
  }

  move() {
    let bomba = document.getElementById(this.bomba) as HTMLElement;
    if(this.encendido ){
      bomba.style.height= (bomba.offsetHeight -1)+ 'px';
      if(bomba.offsetHeight == 0)
        return
      setTimeout(() => {
        this.motorOn()
      },70 );
    }
    else{
      return 
    }
  }

  grow(){
    let bomba = document.getElementById(this.bomba) as HTMLElement;
    if(!this.encendido ){
      bomba.style.height= (bomba.offsetHeight +1)+ 'px';
      if(bomba.offsetHeight >= 282)
        return
      setTimeout(() => {
        this.motorOn()
      },100 );
    }
    else{
      return 
    }
  }
  animateOn(id:string){
    let button = document.getElementById(id) as HTMLElement;
    let flashIcon = document.getElementById(id+'flashIcon') as HTMLElement;
    let inner = document.getElementById(id+'inner') as HTMLElement;
    button.style.animation ='';
    setTimeout(() => {
      button.style.animation ='click .5s normal';
    }, 10);

      button.style.backgroundColor = "rgb(41 169 105)";
      button.style.borderColor = 'rgb(7 109 59)';
      
      flashIcon.style.color='#f3ff6c';
      flashIcon.classList.add('orb2');
      inner.style.textShadow = '0px 0px 1px #fff, 0 0 0 #000, 0px 0px 1px #fff';
      inner.classList.add('light');
  }
  animateOff(id :string){
    let button = document.getElementById(id) as HTMLElement;
    let flashIcon = document.getElementById(id+'flashIcon') as HTMLElement;
    let inner = document.getElementById(id+'inner') as HTMLElement;
    button.style.animation ='';
    setTimeout(() => {
      button.style.animation ='click .6s normal';
    }, 10);
    button.style.backgroundColor = '';
    button.style.borderColor = ''
    flashIcon.style.color ='';
    flashIcon.classList.remove('orb');
    flashIcon.classList.remove('orb2');
    inner.style.textShadow = 'none';
    inner.classList.remove('light');
  }
}
