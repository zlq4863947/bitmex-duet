import { Robot } from '../robot';

(async function bootstrap() {
  const app = new Robot();
  await app.start();
})();
