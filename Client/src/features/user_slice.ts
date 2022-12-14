import { createSlice, PayloadAction} from '@reduxjs/toolkit'
interface UserState{ //shape of the state inside inside of the slice
    email: string | undefined,
    username: string,
    games:any,
    overallWins:{
        wins:number,
        losses:number,
        draws:number
    },
    totalGold: number,
    pathLessons:boolean[],
    sortLessons:boolean[],
}

const initialState: UserState = {
    email: 'bruce@lee.com',
    username: 'Bruce',
    games: [],
    overallWins:{ wins:0, losses:0, draws:0},
    totalGold: 0,
    pathLessons:[false, false, false, false],
    sortLessons:[false, false, false, false, false, false],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        refreshData(state, action: PayloadAction<UserState>){
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.games = action.payload.games;
            state.overallWins = action.payload.overallWins;
            state.sortLessons = action.payload.sortLessons;
            state.pathLessons = action.payload.pathLessons;
            state.totalGold = action.payload.totalGold;
        },
        refreshUsername(state,action:PayloadAction<UserState>){
            state.username = action.payload.username;
        },
        refreshSortingPath(state, action: PayloadAction<UserState>){
            state.sortLessons = action.payload.sortLessons
        },
        refreshPathLessons(state, action: PayloadAction<UserState>){
            state.pathLessons = action.payload.pathLessons
        }
    }
})

export const { refreshData, refreshUsername, refreshSortingPath, refreshPathLessons } = userSlice.actions;
export default userSlice.reducer;