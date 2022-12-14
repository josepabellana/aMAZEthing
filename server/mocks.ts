import { IUser, IGame } from "./models/types";
const mockGame :IGame = {
    amountMinions:7,
    result:"win",
    goldAmount:200,
    opponentID:"string",
    towersTaken:2,
    winner:true,
    startedAt: new Date(),
    finishedAt: new Date(),
    duration: new Date(),
}
const mockUser : IUser = {
    username: "test1",
    //password = Test1234$
    email: "test@gmail.com",
    id: "auth0|63827a04603962ab67a6e6e0",
    uid:"1",
    sortingPath:1,
    pathFindPath:2,
    totalGold:300,
    games: [mockGame],
    overallWins: {
        wins:1,
        losses:2,
        draws:0
    },
};
