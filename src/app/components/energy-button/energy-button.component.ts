import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-energy-button',
  templateUrl: './energy-button.component.html',
  styleUrls: ['./energy-button.component.scss']
})
export class EnergyButtonComponent {
  @Input() idN: string
  constructor() { }

  ngOnInit(): void {
    // this.idN = this.idN
    // this.aux(this.idN)
  }
  theme:boolean = false;

  changeTheme(){
    return this.theme = !this.theme; 
  }
  clickEnergy = false;
  clickFlash = false;
  changeEnergy(id:string){
    let button = document.getElementById(id) as HTMLElement;
    let aux = document.getElementById(id+'auxBtn');
    let flashIcon = document.getElementById(id+'flashIcon') as HTMLElement;
    let inner = document.getElementById(id+'inner') as HTMLElement;
    //flash btn
    if (!this.clickFlash) {
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
      // }

      this.clickFlash = true;
    }else{
      
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
      this.clickFlash = false;
    }
    // aux.click()
  }
  aux( id:string){
    setTimeout(() => {
      this.changeEnergy(id)
    }, 7000);
  }
}
