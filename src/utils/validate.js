export const validateInput = (fullName, email, password, isSignIn) => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

  // Only validate full name for Sign Up
  if (!isSignIn) {
    const isFullNameValid = /^[a-zA-Z\s]+$/.test(fullName)
    if(!isFullNameValid) return "Full Name is not valid"
  }
  
  if(!isEmailValid) return "Email is not valid"
  if(!isPasswordValid) return "Password is not valid"
  return null
}
