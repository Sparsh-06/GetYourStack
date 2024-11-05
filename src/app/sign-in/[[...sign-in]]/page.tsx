import { SignIn } from "@clerk/nextjs"

const signIn = () => {
  return (
    <div className="flex items-center justify-center h-screen"><SignIn/></div>
  )
}

export default signIn