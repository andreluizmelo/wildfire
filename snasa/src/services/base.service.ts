import { HttpService } from "../core/http.service";
import { RequestOptions, Headers } from "@angular/http";
import { ISubscription } from "rxjs/Subscription";
import { Injectable } from "@angular/core";

@Injectable()
export class BaseService {
    public readonly serverURL: string = "https://randomuser.me/";
    protected readonly baseURL: string = this.serverURL + this.controller;
    public subscriptions: ISubscription[] = [];
    protected options : RequestOptions;

    constructor(protected http: HttpService, private readonly controller: string) { 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;');

        this.options = new RequestOptions({ headers: headers });
    }

    unsubscribeAll() {
        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions.length = 0;
    }
}