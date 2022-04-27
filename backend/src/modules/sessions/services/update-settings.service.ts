import settingsRepository from "../repositories/settings.repository";

interface UpdateSettings {
  email: string;
  password: string;
  apiUrl: string;
  streamUrl: string;
  accessKey: string;
  secretKey: string;
}

interface SettingsResponse {
  error?: string;
  status: number;
  user?: any;
}

const UpdateSettingsService =  async (settings:UpdateSettings, id:number): Promise<SettingsResponse> => {
  await settingsRepository.update(id, {
    email: settings.email,
    password: settings.password,
    apiUrl: settings.apiUrl,
    streamUrl: settings.streamUrl,
    accessKey: settings.accessKey,
    secretKey: settings.secretKey,
  });

  return {
    status: 200,
    user: settings
  }
}

export default UpdateSettingsService