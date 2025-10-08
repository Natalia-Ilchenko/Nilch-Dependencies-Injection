import IoCContainer from 'ioc-lite';

import { Logger } from '../services/logger';
import { HTTP } from '../services/http';
import { Users } from '../services/users';
import { ApiConfig } from '../types/index';

export const config: ApiConfig = {
  path: 'http://localhost:8080/api',
  resources: {
    users: '/users',
  }
};

export const createIoCContainer = () =>  {
  const ioc = new IoCContainer();
  // you can register some resources right now below...

  ioc.registerClass('logger', Logger);

  ioc.register('config', config);

  HTTP.$inject = ['logger', 'config'];
  ioc.registerClass('http', HTTP);
  
  Users.$inject = ['config', 'http'];
  ioc.registerClass('users', Users);

  return ioc;
};
