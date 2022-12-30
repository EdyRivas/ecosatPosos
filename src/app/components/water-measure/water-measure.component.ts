import { Component, HostListener, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SocketIOService } from 'src/app/socket-io.service';

@Component({
  selector: 'app-water-measure',
  templateUrl: './water-measure.component.html',
  styleUrls: ['./water-measure.component.scss']
})
export class WaterMeasureComponent {
  @Input() idN: string;
  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(private socketIoService: SocketIOService) { }

  bomba:string;
  level:string;
  measure:string;
  water:string;
  depth: string;
  pressure: string;
  ngOnInit(): void {
    this.bomba = this.idN+'-bomba'
    this.level = this.idN+'-level'
    this.measure = this.idN+'-measure'
    this.water = this.idN+'-water'
    this.depth= this.idN+'-depth'
    this.pressure= this.idN+'-pressure'
    this.subscribeToSocketIoServer();
  }

  ngAfterViewInit(){
    let bomba = document.getElementById(this.bomba) as HTMLElement;
    let a = getComputedStyle(bomba)
    this.size = parseInt(a.height);

    setTimeout(() => {
      this.deg(this.pressure);
      
    }, 200);
  }

  size: number;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let bomba = document.getElementById(this.bomba) as HTMLElement;
    let level = document.getElementById(this.level) as HTMLElement;
    bomba.style.height = '';
    level.style.height = '';
    let a = window.getComputedStyle(bomba)
    this.size = parseInt(a.height)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  subscribeToSocketIoServer() {
    this.socketIoService.onDataFromServer()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log('socket', JSON.parse(data));
        let a = JSON.parse(data)
        this.waterLevel(a.distanceInMeters)
        this.levelBar(a.distanceInMeters)
        this.changeEnergy(a.statusPump)
      });
  }
  waterLevel(mesure){
    let bomba = document.getElementById(this.bomba) as HTMLElement;
    let measure = document.getElementById(this.measure) as HTMLElement;
    let percentageFake:any = (((parseInt(mesure)*100)/500)-10) ;
    let percentage:any = ((parseInt(mesure)*100)/500);
    if(percentageFake < 0)
      percentageFake=percentageFake + 10;
    if(percentageFake < 0)
      percentageFake=0;
    if(percentage< 0)
      percentageFake=0;
    bomba.style.maxHeight = percentageFake + '%';
    measure.innerHTML = percentage + '%'
  }
  levelBar(mesure){
    let level = document.getElementById(this.level) as HTMLElement;
    let depth = document.getElementById(this.depth) as HTMLElement;
    depth.innerHTML = parseInt(mesure).toFixed(2) + 'm';
    let percentageFake:any = (((parseInt(mesure)*100)/500)-10) ;
    if(percentageFake < 0)
      percentageFake=percentageFake + 10;
    if(percentageFake < 0)
      percentageFake=0;
    level.style.maxHeight = percentageFake + '%';
  }
  clickEnergy = false;
  clickFlash = false;
  changeEnergy(id){
    if (!this.clickFlash) {
      this.animateOn(this.idN)
      this.clickFlash = true;
      this.encendido = true;
      // this.levelGo()
      // this.motorOn()
    }else{ 
      this.animateOff(this.idN)
      this.clickFlash = false;
      this.encendido = false;
      // this.levelGo()
      // this.motorOn()
    } 
  }

//#region auto
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
//#endregion
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
  //#region pressure
  clsPrev = '';
delCls(id:string){
  let speed = document.getElementById(id) as HTMLElement;
  if (this.clsPrev != ''){
    speed.classList.remove(this.clsPrev);
    this.clsPrev = '';
  }
 else return;
}
  deg(id:string):any{
    let aux = document.getElementById(id+'aux') as HTMLElement;
    let speed = document.getElementById(id) as HTMLElement;
    let text = document.getElementById(id+'text') as HTMLElement;
    let deg = Math.random() * 100;
    this.delCls(id)
  
    if(deg >=0 && deg <= 5 ){
      speed.classList.add('d_0')
      this.clsPrev = 'd_0'
    }
    else if(deg >5 && deg <= 10){
      speed.classList.add('d_10')
      this.clsPrev = 'd_10'
    }
    else if(deg >10 && deg <=20){
      speed.classList.add('d_20')
      this.clsPrev = 'd_20'
    }
    else if(deg >20 && deg <=30){
      speed.classList.add('d_30')
      this.clsPrev = 'd_30'
    }
    else if(deg >30 && deg <=40){
      speed.classList.add('d_20')
      this.clsPrev = 'd_40'
    }
    else if(deg >40 && deg <=50){
      speed.classList.add('d_50')
      this.clsPrev = 'd_50'
    }
    else if(deg >50 && deg <=60){
      speed.classList.add('d_60')
      this.clsPrev = 'd_60'
    }
    else if(deg >60 && deg <=70){
      speed.classList.add('d_70')
      this.clsPrev = 'd_70'
    }
    else if(deg >70 && deg <=80){
      speed.classList.add('d_80')
      this.clsPrev = 'd_80'
    }
    else if(deg >80 && deg <=90){
      speed.classList.add('d_90')
      this.clsPrev = 'd_90'
    }
    else if(deg >90 && deg <=100){
      speed.classList.add('d_100')
      this.clsPrev = 'd_100'
    }
    // else if(deg >100 && deg <=110){
    //   speed.classList.add('d_110')
    //   this.clsPrev = 'd_110'
    // }
    text.innerHTML= deg.toString().split('.')[0]
    
  aux.click();
  }
  auxDeg(id:string){
    setTimeout(() => {
      this.deg(id)
    }, 7000);
  }
  //#endregion
}
