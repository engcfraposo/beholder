import Settings  from '../../../models/settings.model';
interface NewSettings{
  email: string;
  password: string;
  apiUrl: string;
  accessKey: string;
  secretKey: string;
}

const getById = async (id: number) => {
  const { dataValues }: any = await Settings.findOne({ where: {id} });
  return dataValues;
}

const getDefaultSettings = async () => {
  const { dataValues }: any = await Settings.findOne();
  return dataValues;
}

const getByEmail = async (email: string) => {
  const { dataValues }: any = await Settings.findOne({ where: {email} });
  return dataValues 
}

const update = async (id: number, newSettings: NewSettings) => {
  const { dataValues }: any = await Settings.update(newSettings, { where: {id} });
  return dataValues;
}

export default{
    getById,
    getDefaultSettings,
    getByEmail,
    update
}
