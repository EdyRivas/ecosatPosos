import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-water-measure',
  templateUrl: './water-measure.component.html',
  styleUrls: ['./water-measure.component.scss']
})
export class WaterMeasureComponent {
  @Input() idN: string
  constructor() { }

  bomba:string;
  level:string;
  measure:string;
  ngOnInit(): void {
    this.bomba = this.idN+'-bomba'
    this.level = this.idN+'-level'
    this.measure = this.idN+'-measure'
  }
  ngAfterViewInit(){
    let bomba = document.getElementById(this.bomba) as HTMLElement;
    let a = getComputedStyle(bomba)
    this.size = parseInt(a.height);
  }
  
  size: number;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let bomba = document.getElementById(this.bomba) as HTMLElement;
    bomba.style.height = '';
    let a = window.getComputedStyle(bomba)
    this.size = parseInt(a.height)
  }

  clickEnergy = false;
  clickFlash = false;
  changeEnergy(id:string){
    if (!this.clickFlash) {
      this.animateOn(id)
      this.clickFlash = true;
      this.encendido = true;
      this.levelGo()
      this.motorOn()
    }else{ 
      this.animateOff(id)
      this.clickFlash = false;
      this.encendido = false;
      this.levelGo()
      this.motorOn()
    }
  }
  encendido = false;
  motorOn(){      
    if(this.encendido )
      this.decrease()
    else 
    this.grow()
  }
  decrease() {
    let bomba = document.getElementById(this.bomba) as HTMLElement;
    if(this.encendido ){
      bomba.style.height= (bomba.offsetHeight -1)+ 'px';
      if(bomba.offsetHeight == 20)
        return
      setTimeout(() => {
        this.motorOn()
      },75 );
    }
    else{
      return 
    }
  }
  grow(){
    let measure = document.getElementById(this.measure) as HTMLElement;
    let bomba = document.getElementById(this.bomba) as HTMLElement;
    if(!this.encendido ){
      bomba.style.height= (bomba.offsetHeight +1)+ 'px';
      if(bomba.offsetHeight >= this.size)
        return
      setTimeout(() => {
        this.motorOn()
      },97 );
    }
    else{
      return 
    }
  }

  levelGo(){
    if(this.encendido )
      this.decreaseLevel()
    else 
      this.growLevel()
  }
  decreaseLevel(){
    let level = document.getElementById(this.level) as HTMLElement;
    let measure = document.getElementById(this.measure) as HTMLElement;
    if(this.encendido ){
      
      level.style.height= (level.offsetHeight -1)+ 'px';
      if(this.size == 282){
        let percentage:any = ((parseInt(level.style.height)*100)/282)
        percentage = parseInt(percentage) + '%';
        measure.innerHTML = percentage
        if(level.offsetHeight == 195)
          level.style.backgroundColor = '#d5dc77';
        else if(level.offsetHeight == 130)
          level.style.backgroundColor = '#eaa856';
        else if(level.offsetHeight == 65)
          level.style.backgroundColor = '#ca5e68';
      }else{
        let percentage:any = ((parseInt(level.style.height)*100)/198)
        percentage = parseInt(percentage) + '%';
        measure.innerHTML = percentage
        if(level.offsetHeight == 147)
          level.style.backgroundColor = '#d5dc77';
        else if(level.offsetHeight == 98)
          level.style.backgroundColor = '#eaa856';
        else if(level.offsetHeight == 49)
          level.style.backgroundColor = '#ca5e68';
      }
      if(level.offsetHeight == 0)
        return
      setTimeout(() => {
        this.levelGo()
      },70 );
    }
    else{
      return 
    }
  }
  growLevel(){
    if(!this.encendido ){
      let level = document.getElementById(this.level) as HTMLElement;
      let measure = document.getElementById(this.measure) as HTMLElement;
      level.style.height= (level.offsetHeight +1)+ 'px';
      if(this.size == 282){
        let percentage:any = ((parseInt(level.style.height)*100)/260)
        percentage = parseInt(percentage) + '%';
        measure.innerHTML = percentage;
        if(level.offsetHeight == 65)
          level.style.backgroundColor = '#ca5e68'; 
        else if(level.offsetHeight == 130)
          level.style.backgroundColor = '#eaa856';
        else if(level.offsetHeight == 195)
          level.style.backgroundColor = '#d5dc77';
        else if(level.offsetHeight >= 200)
          level.style.backgroundColor = '';
        if(level.offsetHeight >= 260)
            return
        }else{
          let percentage:any = ((parseInt(level.style.height)*100)/196)
          percentage = parseInt(percentage) + '%';
          measure.innerHTML = percentage
          if(level.offsetHeight == 49)
            level.style.backgroundColor = '#ca5e68';
          else if(level.offsetHeight == 98)
            level.style.backgroundColor = '#eaa856';
          else if(level.offsetHeight == 147)
            level.style.backgroundColor = '#d5dc77';
          else if(level.offsetHeight >= 150)
            level.style.backgroundColor = '';
          if(level.offsetHeight >= 196)
            return
        }
      setTimeout(() => {
        this.levelGo()
      },96 );
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
