import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const initializeUser = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('BlogLoggedinUser', JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export default userSlice.reducer