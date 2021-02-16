import {_throw, has, isUd} from './util';
import {validErrorTip, lang, validRegExp} from './v-config';
import PureV from './index';
import {TRule, TValidText, IReg, IRange, ITextValidResult, Json, IJsonValidResult} from './type';

export function validJson (
    json: Json<TValidText>,
    rules: Json<TRule>
): IJsonValidResult {
    const result: IJsonValidResult = {
        pass: true,
        message: '',
        results: {}
    };
    for (const k in json) {
        let singleResult: ITextValidResult;
        if (k in rules) {
            singleResult = validText(json[k], rules[k]);
            singleResult.name = k;
        } else {
            singleResult = {
                pass: false,
                name: k,
                text: json[k],
                message: `属性 ${k} 不在验证规则中`
            };
        }
        if (!singleResult.pass) {
            result.pass = false;
        }
        result.results[k] = singleResult;
    }
    return result;
}

export function ruleToIntRange (rule: TRule, start: number) {
    const range = rule.substring(start, rule.length - 1).split(',').map(i => parseInt(i));
    return {
        start: range[0],
        end: range[1] || range[0]
    };
}

export function validText (
    text: string, rule: TRule, input?: HTMLElement
): ITextValidResult {
    const result: ITextValidResult = {
        pass: true,
        message: '',
        text,
    };
    let value : boolean | string = '';
    if (rule.indexOf('lengthOfAny') !== -1) {
        const range = ruleToIntRange(rule, 12);
        const f = 'lengthOfAny';
        if (text.length >= range.start && text.length <= range.end) {
            value = true;
        } else {
            value = _getValidText(f, range);
        }
    } else {
        value = _checkValue(rule, text);
    }
    if (value === true) {
        if (PureV.onOnePass) {
            PureV.onOnePass(result, input);
        }
    } else {
        result.pass = false;
        result.message = value;
        if (PureV.onOneFail) {
            PureV.onOneFail(result, input);
        }
    }
    return result;
};


function _checkValue (rule: TRule, text: TValidText) {
    if (rule.indexOf('notnull') !== -1) {
        if (text.length === 0) {
            return _getValueText('notnull');
        }
    } else if (rule.indexOf('null') !== -1) {
        const rules = rule.split(' ');
        const mainRule = (rules[0] === 'null') ? rules[1] : rules[0];
        if (mainRule === '' || isUd(mainRule)) {
            _throw('null 关键字不能单独使用');
        }
        if (mainRule.indexOf('range') !== -1) {
            const d = _testRange(rule, text);
            if (d !== true && text !== '') {
                return d;
            }
        }
        if (!testReg(text, _getRegExp(mainRule)) && text !== '') {
            return _getValueText(mainRule);
        }
    } else {
        if (rule.indexOf('range') !== -1) {
            const d = _testRange(rule, text);
            if (d !== true) {
                return d;
            }
        } else {
            if (!testReg(text, _getRegExp(rule))) {
                return _getValueText(rule);
            }
        }
    }
    return true;
};
function _testRange (rule: TRule, text: string) {
    const range = ruleToIntRange(rule, 6);
    rule = 'number';
    if (testReg(text, _getRegExp(rule))) {
        const textInt = parseInt(text);
        if (textInt < range.start || textInt > range.end) {
            return _getValidText('range', range);
        }
    } else {
        return _getValidText('number');
    }
    return true;
};

export function testReg (text: TValidText, reg: IReg) {
    if (typeof reg === 'function') {
        return reg(text);
    } else {
        return reg.test(text);
    }
}

// 根据规则 获取 验证提示文字
function _getValueText (rule: TRule): string {
    let index = 0;
    if (rule.indexOf('range') !== -1) {
        index = 6;
    } else {
        if (rule.indexOf('letterStart') !== -1) {
            index = 12;
        } else if (rule.indexOf('length') !== -1) {
            index = 7;
        } else if (has(rule, 'number') && rule !== 'number') {
            index = 7;
        }
    }
    if (index !== 0) {
        const range = ruleToIntRange(rule, index);
        return _getValidText(rule.substring(0, index - 1), range);
    } else {
        return _getValidText(rule);
    }
};

// 根据规则 获取 验证提示文字
function _getValidText (rule: TRule, range?: IRange): string {
    const _lang = lang.get();
    if (!range) {
        if (has(rule, 'express')) {
            return validErrorTip[_lang].express;
        }
        return validErrorTip[_lang][rule];
    } else {
        const middleText = (has(rule, 'number')) ?
            (_lang === 'CN' ? ' 且长度为' : ' and length is') : '';
        if (range.start === range.end) {
            return `${validErrorTip[_lang][rule]}${middleText}${range.start}`;
        }
        return `${validErrorTip[_lang][rule]}${middleText}[${range.start},${range.end}]`;
    }
};

// 根据规则获取正则表达式
function _getRegExp (rule: TRule): IReg {
    let min = -1;
    let max = -1;
    let regStr = '';
    const setMinAndMax = (start: number) => {
        const e = rule.substring(start, rule.length - 1).split(',');
        if (typeof e[1] === 'undefined') { e[1] = e[0]; }
        min = parseInt(e[0]);
        max = parseInt(e[1]);
    };
    if (rule.indexOf('length') !== -1) {
        setMinAndMax(7);
        rule = 'length';
    } else if (rule.indexOf('letterStart') !== -1) {
        setMinAndMax(12);
        rule = 'letterStart';
    } else if (has(rule, 'number') && rule !== 'number') {
        setMinAndMax(7);
        rule = 'number';
    } else if (has(rule, 'express')) {
        regStr = rule.substring(8, rule.length - 1);
        rule = 'express';
    }
    if (rule in validRegExp) {
        return validRegExp[rule];
    }
    switch (rule) {
        case 'number':
            return (min >= 0) ? new RegExp(`^-?(\\d{${min},${max}})$`) : /^-?(\d+)$/;
        case 'letterStart':
            return (min >= 0) ?
                new RegExp(`^([a-zA-Z]([a-zA-Z\\d]){${min - 1},${max - 1}})$`) :
                /^-?([a-zA-Z][a-zA-Z\d]+)$/;
        case 'length': return new RegExp(`^(([a-zA-Z\\d]){${min},${max}})$`);
        case 'express': return new RegExp(regStr);
        default: return new RegExp('');
    }
};