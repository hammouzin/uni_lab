import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConsoleService {
  private readonly baseUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) {}

  getWssUrlByName(node: string, name: string): Observable<{ wssUrl: string }> {
    const url = `${this.baseUrl}/api/console/${encodeURIComponent(node)}/by-name/${encodeURIComponent(name)}`;
    return this.http.get<{ wssUrl: string }>(url);
  }
}
