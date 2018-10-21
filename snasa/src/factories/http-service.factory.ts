import { XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from '../core/http.service';

function httpServiceFactory(backend: XHRBackend, options: RequestOptions) {
  return new HttpService(backend, options);
}

export { httpServiceFactory };
