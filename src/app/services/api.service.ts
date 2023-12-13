import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

const API_HOST=environment.apiHost;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as const
  };
  token!: string;

  constructor(private http: HttpClient) { }

  static extractData(res: HttpEvent<any>) {
    const body = res;
    return body || { };
  }

  static handleError(error: Error) {
    alert(error.message);
  }

  setAuthToken(token:string) {
    this.httpOptions.headers=this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    this.token = token;
  }

  get(endpoint:string): Promise<any> {
    const url = `${API_HOST}${endpoint}`;
    const req = this.http.get(url, this.httpOptions).pipe(map(ApiService.extractData));
    return req.toPromise()
              .catch((e) => {
                ApiService.handleError(e);
                throw e;
              });
  }

  post(endpoint:string, data:any):Promise<any>{
    const url = `${API_HOST}${endpoint}`;
    return this.http.post<HttpEvent<any>>(url, data, this.httpOptions)
              .toPromise()
              .catch((e)=>{
                ApiService.handleError(e);
                throw e;
              });
  }

  delete(endpoint:string):Promise<any>{
    const url = `${API_HOST}${endpoint}`;
    return this.http.delete<HttpEvent<any>>(url, this.httpOptions)
              .toPromise()
              .catch((e)=>{
                ApiService.handleError(e);
                throw e;
              });
  }

  update(endpoint:string):Promise<any>{
    const url = `${API_HOST}${endpoint}`;
    return this.http.put<HttpEvent<any>>(url, this.httpOptions)
              .toPromise()
              .catch((e)=>{
                ApiService.handleError(e);
                throw e;
              });
  }

}
