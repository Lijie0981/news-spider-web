import spider163 from './163';
import debug from 'debug';
const log = debug('spider:server');

export const server = function () {
    log('server1');
    spider163.server();
}