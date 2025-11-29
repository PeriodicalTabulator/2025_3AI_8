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
     lifetimeCoins?: number;
  blackjackWins?: number;
  loginStreak?: number;
  lastLoginDate?: string;
  achievements?: {
    slotSpinner?: boolean;
    blackjackPro?: boolean;
    beanCanCollector?: boolean;
    highRoller?: boolean;
    dailyPlayer?: boolean;
};
}
