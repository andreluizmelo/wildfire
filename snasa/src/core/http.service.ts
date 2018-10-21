import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response, Headers, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class HttpService extends Http {
//   public token: string;
//   apiUrl = 'http://example.com/api/';

  constructor(backend: XHRBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  post(url: string, element?: any, options?: RequestOptionsArgs): Observable<any> {
    //this.showLoader();
    return super.post(url, element, this.requestOptions(options))
      .map(this.extractData)
      .catch(this.handleErrorObservable)
      .finally(() => {
        this.onEnd();
      });
  } 

  get(url: string, options?: RequestOptionsArgs, blockTela: boolean = true): Observable<any> {
    //if(blockTela) this.showLoader();
    return super.get(url, this.requestOptions(options))
      .map(this.extractData)
      .catch(this.handleErrorObservable)
      .finally(() => {
        this.onEnd();
      });

  }

  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json')
    return options;
  }

  // private onCatch(error: any, caught: Observable<any>): Observable<any> {
  //   return Observable.throw(error);
  // }

  // private onSuccess(res: Response): void {
  //   console.log('Request successful');
  // }

  // private onError(res: Response): void {
  //   console.log('Error, status code: ' + res.status);
  // }

  private onEnd(): void {
      //TODO 
  }

  protected extractData(res: Response) {
    try {
      let body = res.json();
      return body;
    } catch (e) {
      console.log(e);
      return Observable.throw('Falha de comunicação!');
    }
  }

  protected handleErrorObservable(error: Response | any) {
    return Observable.throw(error.message || error);
  }
}