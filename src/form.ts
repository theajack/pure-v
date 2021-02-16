import {IFormValidResult, IDomValidResult} from './type';
import {validText} from './tool';
import PureV from '.';

const FORM = 'pv-form';
const NAME = 'pv-name';
const RULE = 'pv-rule';
const ATTR = 'pv-attr';
const RES = 'pv-res';

export const ATTR_VALUE = {
    VALUE: 'value',
    TEXT: 'text',
    HTML: 'html',
    SRC: 'src',
    HREF: 'href',
};

function getDomValue (input: HTMLElement) {
    const attr = input.getAttribute(ATTR) || 'value';
    switch (attr) {
        case ATTR_VALUE.VALUE:
            return (input as HTMLElement & {value: string}).value;
        case ATTR_VALUE.TEXT:
            return input.innerText;
        case ATTR_VALUE.HTML:
            return input.innerHTML;
        case ATTR_VALUE.SRC:
            return input.getAttribute('src');
        case ATTR_VALUE.HREF:
            return input.getAttribute('href');
    }
    return '';
}

export function validForm (name: string | HTMLElement): IFormValidResult {
    const dom: HTMLElement | null = (name instanceof HTMLElement) ? name :
        (document.querySelector('[' + FORM + '=' + name + ']') || document.querySelector(name));
    const result: IFormValidResult = {
        pass: true,
        message: '',
        results: {},
    };
    if (dom === null) {
        result.pass = false;
        return result;
    }
    const list = dom.hasAttribute(RULE) ? [dom] : dom.querySelectorAll(`[${RULE}]`);

    for (let i = 0; i < list.length; i++) {
        const input = list[i] as HTMLElement & {
            _hasAttach: boolean;
            _pv_np: boolean;
        };
        const rule = input.getAttribute(RULE) || '';
        const key = input.getAttribute(NAME) || i.toString();
        const text = getDomValue(input) || '';

        const singleResult = validText(text, rule, input) as IDomValidResult;
        singleResult.dom = input;
        singleResult.name = key;
        result.results[key] = singleResult;
        if (!singleResult.pass) {
            if (input._hasAttach !== true) {
                input.addEventListener('click', () => {
                    input.setAttribute(RES, 'none');
                    if (input._pv_np) {
                        input.removeAttribute('placeholder');
                    }
                }, false);
            }
            input.setAttribute(RES, 'fail');
            if (input.getAttribute('placeholder') === null) {
                input._pv_np = true;
                input.setAttribute('placeholder', singleResult.message);
            }
            if (result.pass) {
                result.pass = false;
                if (PureV.useToast && PureV.toast) {
                    PureV.toast(singleResult.message);
                }
            }
        }
    }
    return result;
}