import { 
    httpServer, 
    httpServerInit, 
    SERVICE_PORT, 
    NODE_ENV
} from "./libs/service.init";
import chalk from 'chalk'

(async () => {
    await httpServerInit();
    httpServer.listen(SERVICE_PORT, () => {
        console.log(
            `-----------------------------------------
            \n${chalk.black.bgGreenBright(`🚀 QRCGen-API is Up and Running\n`
            )}\nMode: ${chalk.blueBright(
              `${NODE_ENV}`
            )}\nURL: ${chalk.blueBright(
              `http://localhost:${SERVICE_PORT}`
            )}\nTime: ${chalk.blueBright(
                `${new Date(Date.now())}`
            )}\n\n-----------------------------------------`
          );
    });
})()