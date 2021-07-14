import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DraggableDialogService {

  public zIndexSource = new BehaviorSubject<number>(5);
  previouszIndex = this.zIndexSource.asObservable();

  constructor() { }

  changezIndex(zIndex: number) {
    this.zIndexSource.next(zIndex);
  }
}
