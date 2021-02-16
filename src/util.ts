import {Json} from './type';

export const isBrowser = ('object' === typeof document && 'undefined' !== typeof document.body);

export function addStyle (styleText: string) {
    const style = document.createElement('style');
    style.innerHTML = styleText;
    document.head.appendChild(style);
}

export function _throw (info: string) {
    throw new Error(info);
}

export function has (a: string, s: string) {
    return a.indexOf(s) !== -1;
}

export function isUd (a: any) {
    return typeof a === 'undefined';
}

export function mapJson (
    name: string | Json,
    value: any,
    func: (key: string, value: any)=>void
) {
    if (typeof name === 'object') {
        for (const k in name) {
            func(k, name[k]);
        }
    } else {
        func(name, value);
    }
}