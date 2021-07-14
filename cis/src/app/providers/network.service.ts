import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable()
export class NetworkService {
    subject = new Subject<any>();

    registerListeners() {
        window.addEventListener('online', () => {
            this.subject.next({ status: 'online' });
            console.log('online');
        });
        window.addEventListener('offline', () => {
            this.subject.next({ status: 'offline' });
            console.log('offline');
        });
    }

    isOnline() { 
        return window.navigator.onLine;
    }

    getStatus(): Observable<any> {
        return this.subject.asObservable();
    }
}
