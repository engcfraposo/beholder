import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import settingsRepository from "../repositories/settings.repository";

interface Session {
  email: string;
  password: string;
}

interface SessionResponse {
  error?: string;
  status: number;
  token_type?: string;
  token?: string;
  user?: {id: number};
}

const SessionService = async ({email, password}:Session): Promise<SessionResponse> => {
    if(!email || !password) {
      return { error: '401 Unauthorized', status: 401 };
    }

    const user = await settingsRepository.getByEmail(email)
 
    if(!user){
      return { error: '401 Unauthorized', status: 401 };
    }
    const isValid = bcrypt.compareSync(password, user.password);
    
    if(!isValid) {
      return { error: '401 Unauthorized', status: 401 };
    }

    const token = jwt.sign(
      {id:user.id}, 
      process.env.JWT_SECRET as string, 
      { expiresIn: parseInt(process.env.JWT_EXPIRES_IN as string) }
    );

    return {
      status: 201,
      token_type: "Bearer",
      token,
      user: {id: user.id}
    };
}

export default SessionService;