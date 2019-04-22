import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router"

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Desktop } from './desktop.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/desktops/";

@Injectable({ providedIn: 'root'})
export class DesktopService {
    private desktops: Desktop[] = [];
    private desktopsUpdated = new Subject<Desktop[]>();

    constructor(private http: HttpClient, private router: Router) { }

    addDesktop(name: string) {
        const desktop: Desktop = { id: null, name: name };
        this.http
        .post<{ message: string, desktopId: string }>(BACKEND_URL, desktop)
        .subscribe((responseData) => {
            const desktopId = responseData.desktopId;
            desktop.id = desktopId;
            this.desktops.push(desktop);
            this.desktopsUpdated.next([...this.desktops]);
            console.log(responseData)
        });
    }
    
    getDesktops() {
        this.http
          .get<{ message: string, desktops: any }>(
            BACKEND_URL
          )
          .pipe(
            map((data) => {
              return data.desktops.map(data => {
                return {
                  name: data.name,
                  id: data._id,
                  creator: data.creator
                }
              });
            }))
          .subscribe((transformedtasks) => {
            console.log(transformedtasks);
            this.desktops = transformedtasks;
            this.desktopsUpdated.next([...this.desktops]);
          });
      }

      getDesktopUpdateListener() {
        return this.desktopsUpdated.asObservable();
      }

      onDelete(desktopId: string) {
        this.http.delete(BACKEND_URL + desktopId)
          .subscribe(() => {
            const updatedesktops = this.desktops.filter(desktop => desktop.id !== desktopId);
            this.desktops = updatedesktops;
            this.desktopsUpdated.next([...this.desktops]);
          })
      }
}