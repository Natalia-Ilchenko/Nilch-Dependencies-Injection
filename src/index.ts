import { Users } from './services/users';
import { Logger } from './services/logger';

import type { User, ApiConfig } from './types';

import { createIoCContainer } from './ioc';
import IoCContainer from 'ioc-lite';

const ioc = createIoCContainer();


const renderUsers = async () => {
  const usersService = ioc.resolve('users');
  const users = await usersService.getUsers();

  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  const config = (window as any).__CONFIG__;
  delete (window as any).__CONFIG__;

  ioc.register('config', config.api);

  renderUsers();
};

window.onload = (event: Event) => {
  const logger = ioc.resolve('logger');

  logger.info('Page is loaded.');

  app();
};
