import settingsRepository from "../repositories/settings.repository";

interface SettingsResponse {
  error?: string;
  status: number;
  user?: any;
}

const SettingsService =  async ({id}:{id:number}): Promise<SettingsResponse> => {
  const user = await settingsRepository.getById(id);
  if(!user){
    return { error: '401 Unauthorized', status: 401 };
  }
  return {
    status: 200,
    user,
  };
}

export default SettingsService;