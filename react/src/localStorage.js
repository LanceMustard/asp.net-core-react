export const loadUser = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser == null) {
      return undefined
    }
    return JSON.parse(serializedUser)
  } catch (err) {
    return undefined
  }
}

export const saveUser = (user) => {
  try {
    const serializedUser = JSON.stringify(user)
    localStorage.setItem('user', serializedUser)
  } catch (err) {
    console.error(err)
  }
}