export class Report{
    public id: string;
    public gravidade: number;
    public description: string;
    public type: any;
    public image: string;
    public latitude: number;
    public longitude: number;
    public timestamp?: string = "";
    public username?: string;
    public location?: any;
    public severity?: string;

    constructor() { 
        this.username = 'Cidadão Preocupado';
    };
}