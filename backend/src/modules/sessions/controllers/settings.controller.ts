import express from 'express';
import SettingsService from '../services/settings.service';
import UpdateSettingsService from '../services/update-settings.service';

const SettingsController = {
  async index (_req: express.Request, res: express.Response) {
    const { id } = res.locals.user;
  try{
    const data = await SettingsService({ id });

    if(data.error) {
      return res.status(data.status).json({
        data: {},
        message: data.error,
        timestamp: new Date().toISOString(),
      });
    }

    return res.status(200).json({
      data:{
        user:{
          email: data.user?.email,
          apiUrl: data.user?.apiUrl,
          accessKey: data.user?.accessKey,
          secretKey: data.user?.secretKey,
        }
      },
      message: 'Success',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    throw new Error(error);
  }
  },
  async update (req: express.Request, res: express.Response) {
    const { id } = res.locals.user;
    const { email, password, apiUrl, accessKey, secretKey } = req.body;
    try{
      const data = await UpdateSettingsService({
        email, password, apiUrl, accessKey, secretKey,
      }, id);

      if(data.error) {
        return res.status(data.status).json({
          data: {},
          message: data.error,
          timestamp: new Date().toISOString(),
        });
      }

      return res.status(200).json({
        data:{
          user:{
            email: data.user?.email,
            apiUrl: data.user?.apiUrl,
            accessKey: data.user?.accessKey,
            secretKey: data.user?.secretKey,
          }
        },
        message: 'Success',
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default SettingsController;