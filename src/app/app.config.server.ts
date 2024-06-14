import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { UserService } from './user.service';




const serverConfig: ApplicationConfig = {

  providers: [
    provideServerRendering(),
    UserService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
