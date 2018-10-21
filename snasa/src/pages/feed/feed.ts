import { Component, NgModule } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { ReportService } from '../../services/report-service/report-service.service';
import { CreateReportPage } from '../create-report/create-report';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
@NgModule({
  providers: [ReportService]
})
export class FeedPage {
    reportsDaVizinhanca = [];
    loader : Loading;
    carregando: boolean;

    constructor(public navCtrl: NavController, public reportService : ReportService, public loadingCtrl: LoadingController) {
        this.loader = this.loadingCtrl.create({
            content: "Buscando registros...",
            duration: 10000,
            dismissOnPageChange: true
        });
        this.carregando = true;
    }

    ngOnInit(){
        this.carregando = true;
        this.loader.present();
        this.reportService.getReports((data) =>{
            this.reportsDaVizinhanca = data;
            this.reportsDaVizinhanca = [...this.reportsDaVizinhanca];
            this.carregando = false;
            this.loader.dismiss();
        });
    }

    get naoHaReports(): boolean{
        return (this.reportsDaVizinhanca == null || this.reportsDaVizinhanca.length == 0) && !this.carregando;
    }

    iconName(item : any, up: boolean): string{
        if(up){
            if(item.mylike != null && item.mylike > 0)
                return "ios-thumbs-up";
            else
                return "ios-thumbs-up-outline";
        }else{
            if(item.mylike != null && item.mylike < 0)
                return "ios-thumbs-down";
            else
                return "ios-thumbs-down-outline";
        }
    }

    outline(item: any, up: boolean){
        if(up){
            return !(item.mylike != null && item.mylike > 0);
        }else{
            return !(item.mylike != null && item.mylike < 0);
        }
    }

    changeLike(item: any, up: boolean): void{
        if(up){
            if(item.mylike != null && item.mylike > 0)
                item.mylike = 0;
            else
                item.mylike = 1;
        }else{
            if(item.mylike != null && item.mylike < 0)
                item.mylike = 0;
            else
                item.mylike = -1;
        }
    }

    public navegarParaAdicionarReport(event): void {
        //this.appCtrl.getRootNav().push("List")
        this.navCtrl.setRoot(CreateReportPage);
    }
}