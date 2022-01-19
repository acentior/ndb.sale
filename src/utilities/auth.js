import decode from "jwt-decode";

let inMemoryAuthTokenDefault = {
  authToken: null,
  authExpiration: null,
}

let inMemoryAuthToken = inMemoryAuthTokenDefault

// Local Storage Key
export const LOGGED_OUT_KEY = `LOGGED_OUT_TIME`
export const ACCESS_TOKEN = `ACCESS_TOKEN`
export const USER_DATA = `USER_DATA`

// Helper
export const isBrowser = typeof window !== `undefined`

// TODO: Check if these work as expected
export const isTokenExpired = authToken => {
  return authToken ? (Date.now() - decode(authToken).exp * 1000 > 0) : true
}

export const isLoggedOut = () => {
  const loggedOutTime = getLoggedOutTime()
  return loggedOutTime && loggedOutTime <= Date.now()
}


// Methods

export const logout = (callback) => {
  inMemoryAuthToken = inMemoryAuthTokenDefault
  localStorage.removeItem(ACCESS_TOKEN)
  setLoggedOutTime()

  if (callback) {
    callback()
  }
}


// Setter

export const setAuthToken = (authToken) => {
  if (!isBrowser) return
  if (!authToken) {
    return
  }
  localStorage.setItem(ACCESS_TOKEN, authToken)
  inMemoryAuthToken = { authToken, authExpiration: decode(authToken).exp }
}

export const setLoggedOutTime = () => {
  if (!isBrowser) return
  localStorage.setItem(LOGGED_OUT_KEY, JSON.stringify(Date.now()))
}

const checkInMemoryAuthToken = () => {
  if (inMemoryAuthToken === inMemoryAuthTokenDefault) {
    const authToken = localStorage.getItem(ACCESS_TOKEN)
    if (!authToken) return
    inMemoryAuthToken = { authToken, authExpiration: decode(authToken).exp }
  }
}

// Getter

export const getEmailfromTempToken = (tempToken) => decode(tempToken).sub

export const getInMemoryAuthToken = () => {
  if (!isBrowser) return null
  checkInMemoryAuthToken()
  return inMemoryAuthToken.authToken
}

export const getAuthTokenExpiration = () => {
  if (!isBrowser) return null
  checkInMemoryAuthToken()
  return inMemoryAuthToken.authExpiration
}

export const getLoggedOutTime = () => {
  if (!isBrowser) return null
  return JSON.parse(localStorage.getItem(LOGGED_OUT_KEY))
}
