import { IUser } from "../reducers/reducer";



export const selectAuthUser = (state:any):IUser|null => state.auth.user;

export const selectAuthStatus = (state:any) =>{
  const { auth:{status}}=state
  return status;
}