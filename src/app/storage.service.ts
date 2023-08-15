import { Injectable, inject } from '@angular/core';
import { from, shareReplay } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage = inject(Storage);
  store$ = from(
    (async () => {
      await this.storage.defineDriver(CordovaSQLiteDriver);
      return this.storage.create();
    })()
  ).pipe(shareReplay(1));
}
