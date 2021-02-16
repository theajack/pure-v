import {TLang, Json, IReg} from './type';


let _lang: TLang = 'EN';

export const lang = {
    get: () => _lang,
    set: (v: TLang) => (_lang = v)
};

export const validRegExp: Json<IReg> = {
    'null': /^\S{0}$/,
    'date': /^(([12]\d{3}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|3(0|1))))$/,
    'email': /^((\w*@\w*\.[A-Za-z.]+(\.)?[A-Za-z]+))$/,
    'decimal': /^-?[1-9]\d*.\d*|0.\d*[1-9]\d*$/,
    'idcard': /^(\d{17}(X|\d))$/,
    'url': /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/,
    'phone': /^([1]\d{10})$/,
};

export const validErrorTip: {
    CN: Json<string>;
    EN: Json<string>;
} = {
    CN: {
        null: '可以为空',
        notnull: '必填',
        date: '格式为XXXX-XX-XX',
        email: '格式为XXX@XX.XX',
        number: '须为纯数字',
        idcard: '17位数字加一位数字或X',
        length: '输入长度为', // 只支持数字字母
        url: '请输入正确的网址',
        decimal: '请正确的小数',
        lengthOfAny: '输入长度为', // 支持任意字符
        phone: '须为11位纯数字',
        letterStart: '字母开头且长度为',
        range: '数字不在范围内',
        express: '自定义错误'
    }, EN: {
        null: 'can be empty',
        notnull: 'required',
        date: 'The format is XXXX-XX-XX',
        email: 'The format is XXX@XX.XX',
        number: 'must be a pure number',
        idcard: '17 digits plus one digit or X',
        length: 'Enter the length is',
        url: 'Please enter the correct URL',
        decimal: 'Please correct the decimal',
        lengthOfAny: 'Input length is',
        phone: 'It must be 11 digits',
        letterStart: 'The beginning of the letter and the length is ',
        range: 'The number is not in range',
        express: 'Custom Error'
    }
};