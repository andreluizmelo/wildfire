import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { BaseService } from '../base.service';

@Injectable()
export class TestService extends BaseService {
    private readonly testURL : string = this.baseURL + "/" 
    
    constructor(http: HttpService) {
        super(http, 'api');
    }

    test(successAction:(data) => void, errorAction:(data) => void){
        console.log("entrei no teste")
        let observable = this.http.get( this.testURL)
        this.subscriptions.push(observable.subscribe((data) =>{
            console.log("sucesso")
            successAction(data)
        }, (error) =>{
            console.log("errou")
            errorAction(error)
        }))
    }
}