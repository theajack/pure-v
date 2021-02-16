import purev from '../src/index';
import {IPureV} from '../src/type';

declare global {
    interface Window{
        purev: IPureV
    }
}

window.purev = purev;