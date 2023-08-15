import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../storage.service';
import { filter, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  count = 0;
  storageService = inject(StorageService);
  ngOnInit(): void {
    this.storageService.store$
      .pipe(
        switchMap((store) => store.get('count')),
        filter((count: number) => !!count)
      )
      .subscribe((count) => {
        this.count = count;
      });
  }
  onClick() {
    this.storageService.store$.pipe(take(1)).subscribe((store) => {
      store.set('count', ++this.count);
    });
  }
}
