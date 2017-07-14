/**
  Fires off actions to the reducers, informing the reducer of changes to be made
**/

export const addURL = (id, title, time) => {
  return {
    type: 'ADD_URL',
    payload: {
      id: id,
      title: title,
      time: time
    }
  }
}

export const addTime = title => {
  return {
    type: "ADD_TIME",
    payload: {
      title: title,
    }
  }
}


// EventsFeed actions

export const updateUserAuthenticationStatus = (status) => {
  return {
    type: "UPDATE_USER_AUTHENTICATION_STATUS",
    payload: status
  }
}

export const getCalendarEventsSuccess = (payload) => {
  return {
    type: "GET_CALENDAR_EVENTS_SUCCESS",
    payload
  }
}

export const getCalendarEventsFailure = (payload) => {
  return {
    type: "GET_CALENDAR_EVENTS_FAILURE",
    payload
  }
}

export const getCalendarEvents = () => {
  return {
    type: "GET_CALENDAR_EVENTS",
    async: true
  }
}

// appState actions
export const changeWallpaper = () => {
  // Get the next image
  return {
    type: "CHANGE_WALLPAPER"
  }
}

export const preloadWallpaper = () => {
  return {
    type: "PRELOAD_WALLPAPER",
    async: true,
  }
}

export const preloadWallpaperSuccess = (newWallpaperId) => {
  return {
    type: "PRELOAD_WALLPAPER_SUCCESS",
    payload: newWallpaperId,
  }
}
