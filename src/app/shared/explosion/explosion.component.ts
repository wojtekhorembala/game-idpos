import { Component, EventEmitter, Output } from '@angular/core';

import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-explosion',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './explosion.component.html',
  styleUrl: './explosion.component.scss'
})
export class ExplosionComponent {

  @Output() public onCompleteAnimation$: EventEmitter<void> = new EventEmitter();

  public options: AnimationOptions = {
    path: '/assets/explosion.json',
    autoplay: true,
    loop: false,
  };
}
