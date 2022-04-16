interface Session {
  email: string;
  password: string;
}

const SessionService = async ({email, password}:Session) => {
  try {
    if(!email || !password) {
      throw new Error("Invalid email or password");
    }
  
    if(email !== "engcfraposo@gmail.com" || password !== "123456") {
      throw new Error("Invalid email or password");
    }
    
    return {
      token_type: "Bearer",
      token: "some-token",
      user: {email}
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export default SessionService;