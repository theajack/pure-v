import {_throw, isBrowser, mapJson, addStyle} from './util';
import {lang, validErrorTip, validRegExp} from './v-config';
import {TLang, Json, IReg, TRule, TValidText, IPureV} from './type';
import {validJson, validText} from './tool';
import {validForm} from './form';


if (isBrowser) {
    addStyle('[pv-res=fail]{color:#fa4545!important}[pv-res=fail]::-webkit-input-placeholder{color:#fa4545!important}[pv-res=fail]::-moz-placeholder{color:#fa4545!important}[pv-res=fail]:-moz-placeholder{color:#fa4545!important}[pv-res=fail]:-ms-input-placeholder{color:#fa4545!important}');
}

export const PureV: IPureV = ((
    text: TValidText | Json<TValidText> | HTMLElement,
    rule?: TRule | Json<TRule>
) => {
    if (typeof text === 'object' && typeof rule === 'object') {
        return validJson(text as Json, rule);
    } else {
        if (typeof rule === 'undefined') {
            if (isBrowser) {
                return validForm(text as string | HTMLElement);
            }
        } else {
            return validText(text as TValidText, rule as TRule);
        }
    }
}) as IPureV;

PureV.useToast = false;

PureV.toast = function (tip: string) {
    if (isBrowser) {
        alert ? alert(tip) : '';
    } else {
        console ? console.log(tip) : '';
    }
};

PureV.tip = function (rule: TRule | Json<TRule>, tip?: string) {
    mapJson(rule, tip, (rule, tip) => {
        validErrorTip[lang.get()][rule] = tip as string;
    });
};

PureV.reg = function (rule: string | Json<IReg>, reg?: IReg) {
    mapJson(rule, reg, (rule, reg) => {
        validRegExp[rule] = reg;
    });
};

PureV.lang = function (_lang: TLang) {
    if (_lang !== 'CN' && _lang !== 'EN') {
        _throw('Language can only be set to CN or EN');
    }
    lang.set(_lang);
};

export default PureV;
