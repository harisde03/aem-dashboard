import { Injectable, OnDestroy } from '@angular/core';
import { DbDocument } from '../models/db-document';
import PouchDB from 'pouchdb';
import { catchError, from, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService implements OnDestroy {
  private readonly DB_NAME = 'aem-dashboard-db';
  private db: PouchDB.Database<DbDocument>;

  constructor() {
    this.db = new PouchDB(this.DB_NAME);
  }

  saveDocument<T extends DbDocument>(doc: T): Observable<T> {
    return from(this.db.put(doc)).pipe(
      map(response => ({ ...doc, _rev: response.rev }))
    );
  }

  getDocument<T extends DbDocument>(id: string): Observable<T | null> {
    return from(this.db.get<T>(id)).pipe(
      catchError(err => {
        if (err.status === 404) return of(null);
        return throwError(() => err);
      }),
    );
  }

  ngOnDestroy(): void {
    this.db.close();
  }
}
