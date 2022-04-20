import { Settings } from "../../../models/settings.model";
import bcrypt from "bcrypt";
import crypto from "../../../utils/crypto";
import SettingsRepository from "../repositories/settings.repository";

interface UpdateSettings {
  email: string;
  password: string;
  apiUrl: string;
  accessKey: string;
  secretKey: string;
}

interface SettingsResponse {
  error?: string;
  status: number;
  user?: Settings;
}

const UpdateSettingsService =  async (settings:UpdateSettings, id:number): Promise<SettingsResponse> => {
  const settingsRepository = new SettingsRepository();
  const user = await settingsRepository.getById(id);
  if(!user){
    return { error: '401 Unauthorized', status: 401 };
  }

  if(settings.email !== user.email){
    user.email = settings.email;
  }

  if(settings.password){
    user.password = bcrypt.hashSync(settings.password, 10);
  }

  if(
    settings.apiUrl &&
    settings.apiUrl !== user.apiUrl
    ){
    user.apiUrl = settings.apiUrl;
  }

  if(
    settings.accessKey &&
    settings.accessKey !== user.accessKey
    ){
    user.accessKey = settings.accessKey;
  }

  if(settings.secretKey){
    user.secretKey = crypto.encrypt(settings.secretKey);
  }

  const newUser = await settingsRepository.update(user);

  if(!newUser){
    return { error: '500 Internal Server Error', status: 500 };
  }

  return {
    status: 200,
    user: newUser,
  };
}

export default UpdateSettingsService;