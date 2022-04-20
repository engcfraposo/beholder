import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Menu from '../../components/Menu';
import { useAuth } from '../../contexts/auth';
import { useError } from '../../contexts/error';
import Symbols from './Symbols';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { errorSettings } = useError();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user.email,
      newPassword: '',
      confirmPassword: '',
      apiUrl: user.apiUrl,
      streamUrl: '',
      accessKey: user.accessKey,
      secretKey: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email'),
      newPassword: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .max(20, 'Must be at most 20 characters'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
      apiUrl: Yup.string()
        .url('Invalid url'),
      accessKey: Yup.string(),
      secretKey: Yup.string(),
    }),
    onSubmit: async values => {
      console.log(values);
      updateUser({
        email: values.email?values.email:null,
        password: values.newPassword?values.newPassword:null,
        apiUrl: values.apiUrl?values.apiUrl:null,
        accessKey: values.accessKey?values.accessKey:null,
        secretKey: values.secretKey?values.secretKey:null,
      });
    }
  });
    return (
      <React.Fragment>
      <Menu />
      <main className="content">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
              <div className="d-block mb-4 mb-md-0">
                  <h1 className="h4">Settings</h1>
              </div>
          </div>
          <div className="row">
              <div className="col-12">
                  <div className="card card-body border-0 shadow mb-4">
                      <form onSubmit={formik.handleSubmit}>
                          <h2 className="h5 mb-4">General Info</h2>
                          <div className="row">
                              <div className="col-md-6 mb-3">
                                  <div className="form-group">
                                      <label htmlFor="email">Email</label>
                                      <input 
                                        className="form-control" 
                                        id="email" 
                                        type="email" 
                                        placeholder="name@company.com" 
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                      />
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-md-6 mb-3">
                                  <div>
                                      <label htmlFor="newPassword">New Password</label>
                                      <input 
                                        className="form-control" 
                                        id="newPassword" 
                                        type="password" 
                                        placeholder="Enter your new password" 
                                        value={formik.values.newPassword}
                                        onChange={formik.handleChange}
                                      />
                                  </div>
                              </div>
                              <div className="col-md-6 mb-3">
                                  <div>
                                      <label htmlFor="confirmPassword">Confirm Password</label>
                                      <input  
                                        className="form-control" 
                                        id="confirmPassword" 
                                        type="password" 
                                        placeholder="Your new password again" 
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                      />
                                  </div>
                              </div>
                          </div>
                          <h2 className="h5 mb-4">Exchange Info</h2>
                          <div className="row">
                              <div className="col-sm-12 mb-3">
                                  <div className="form-group">
                                      <label htmlFor="email">Api URL</label>
                                      <input 
                                        className="form-control" 
                                        id="apiUrl" 
                                        type="text" 
                                        placeholder="Your Api URL" 
                                        value={formik.values.apiUrl}
                                        onChange={formik.handleChange}
                                      />
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-sm-12 mb-3">
                                  <div className="form-group">
                                      <label htmlFor="streamUrl">Stream URL</label>
                                      <input 
                                        className="form-control" 
                                        id="streamUrl" 
                                        type="text" 
                                        placeholder="Your stream URL" 
                                        value={formik.values.streamUrl}
                                        onChange={formik.handleChange}
                                      />
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-sm-12 mb-3">
                                  <div className="form-group">
                                      <label htmlFor="email">Access Key</label>
                                      <input 
                                        className="form-control" 
                                        id="accessKey" 
                                        type="text" 
                                        placeholder="Your access key" 
                                        value={formik.values.accessKey}
                                        onChange={formik.handleChange}
                                      />
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-sm-12 mb-3">
                                  <div className="form-group">
                                      <label htmlFor="email">Secret Key</label>
                                      <input 
                                        className="form-control" 
                                        id="secretKey" 
                                        type="password" 
                                        placeholder="Your secret key" 
                                        value={formik.values.secretKey}
                                        onChange={formik.handleChange}
                                      />
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                  <div className="col-sm-3">
                                      <button className="btn btn-gray-800 mt-2 animate-up-2" type="submit">Save all</button>
                                  </div>
                                  {
                                      errorSettings
                                          ? <div className="alert alert-danger mt-2 col-9 py-2">{errorSettings}</div>
                                          : <React.Fragment></React.Fragment>
                                  }
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          <Symbols />
      </main>
      
  </React.Fragment>
    );
}

export default Settings;