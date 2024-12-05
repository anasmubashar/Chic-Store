import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: 'Leopard Courier Services',
  location: 'Islamabad',
  profilePicture: '/placeholder.svg',
  email: 'leopard@gmail.com',
  phoneNumber: '+923000000000',
  address: 'G9/1 Islamabad post office',
  courierBuses: 10,
  courierDrivers: 10,
  citiesServiced: ['Islamabad', 'Karachi', 'Gilgit'],
  availableCities: ['Karachi', 'Islamabad', 'Bolan', 'Sakhar', 'Quetta']
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload }
    },
    addCity: (state, action) => {
      if (!state.citiesServiced.includes(action.payload)) {
        state.citiesServiced.push(action.payload)
      }
    },
    removeCity: (state, action) => {
      state.citiesServiced = state.citiesServiced.filter(city => city !== action.payload)
    },
    updateProfilePicture: (state, action) => {
      state.profilePicture = action.payload
    }
  }
})

export const { updateProfile, addCity, removeCity, updateProfilePicture } = profileSlice.actions
export default profileSlice.reducer

