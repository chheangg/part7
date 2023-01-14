import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  error: false
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const content = action.payload
      console.log(content)
      return {
        message: content.message,
        error: content.error,
      }
    }
  }
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer