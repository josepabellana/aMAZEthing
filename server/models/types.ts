export interface IGame{
    amountMinions:number;
    result:string;
    goldAmount:number;
    opponentID:string;
    towersTaken:number;
    winner:boolean;
    startedAt:Date;
    finishedAt:Date;
    duration:Date;
}

export interface IUser{
    id:string;
    uid:string;
    email:string;
    username:string;
    sortingPath:number;
    pathFindPath:number;
    totalGold:number;
    games: IGame[];
    overallWins: {
        wins:number;
        losses:number;
        draws:number;
    };
}