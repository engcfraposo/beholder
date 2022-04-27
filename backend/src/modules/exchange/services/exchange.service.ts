import settingsRepository from '../../sessions/repositories/settings.repository';
import exchange from "../../../utils/exchange";
import crypto from "../../../utils/crypto";


interface ExchangeResponse {
  error?: string;
  status: number;
  balance?: any;
}

const ExchangeService =  async ({id}:{id: string}): Promise<ExchangeResponse> => {
  if(!id) {
    return { error: '401 Unauthorized', status: 401 };
  }  

  const settings = await settingsRepository.getById(parseInt(id));
  if(!settings) {
    return { error: '401 Unauthorized', status: 401 };
  }
  //@ts-ignore
  settings.secretKey = crypto.decrypt(settings.secretKey);
  const { balance } = exchange(settings);

  if(!balance) {
    return { error: '500 Internal Server Error', status: 500 };
  }

  const newBalance = await balance();

  return {
    status: 200,
    balance: newBalance,
  };
}

export default ExchangeService;