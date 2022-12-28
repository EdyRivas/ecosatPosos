import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-level-water-measure',
  templateUrl: './level-water-measure.component.html',
  styleUrls: ['./level-water-measure.component.scss']
})
export class LevelWaterMeasureComponent {
  @Input() idM: string
  medidor
  ngOnInit(): void {
    this.medidor = this.idM+'-medidor'
  }
}
