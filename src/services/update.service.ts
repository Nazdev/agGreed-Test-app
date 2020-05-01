import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class UpdateService {
  private notify = new Subject<any>();
  public notifyObservable$ = this.notify.asObservable();

  constructor() { }

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
}

// this.updateService.notifyObservable$
//   .subscribe((res) => {
//     if (res.hasOwnProperty('option') && (res.option === 'EventName')) {
//      .....
//     }
//   });

// this.notifyService.notifyOther({option: 'EventName', value: data});
