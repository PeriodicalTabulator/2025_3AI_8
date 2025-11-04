export interface User {
    uid:string;
    userName:string;
    idNumber:string;
    firstName:string;
    lastName:string;
    email:string;
    wallet:number;
    blackJackPlayed:number;
    beancanPlayed:number;
    slotsPlayed:number;
    admin?: boolean;
}
