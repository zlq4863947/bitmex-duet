const opn = require('opn');
const path = require('path');

opn(`file://${path.resolve('./')}/coverage/lcov-report/index.html`);
process.exit();
