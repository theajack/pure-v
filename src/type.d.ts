export type TLang = 'EN' | 'CN';

type TExistType = 'null' | 'notnull' | 'date' | 'email'|
    'number' | 'idcard' | 'length' | 'url' | 'decimal'|
    'lengthOfAny' | 'phone' | 'letterStart' | 'range' | 'express'

export type TValidText = string;

export type TRule = TExistType | string;

export interface IRegFunc {
    (value: TValidText): boolean;
}

export type IReg = RegExp | IRegFunc;

export interface Json<T=any>{
    [prop: string]: T;
}

export interface IBaseValidResult {
    pass: boolean;
    message: string;
    name?: string;
    reg?: RegExp;
    text: string;
}

export interface ITextValidResult extends IBaseValidResult {}

export interface IJsonValidResult {
    pass: boolean;
    message?: string;
    results: {
        [prop in string]: IBaseValidResult;
    }
}

export interface IDomValidResult extends IBaseValidResult {
    dom: HTMLElement
}

export interface IFormValidResult {
    pass: boolean;
    message?: string;
    results: {
        [prop in string]: IDomValidResult;
    }
}

export interface IPureV {
    (text: TValidText, rule: TRule): ITextValidResult;
    (json: Json<TValidText>, rules: Json<TRule>): IJsonValidResult;
    (formName: string | HTMLElement): IFormValidResult;
    useToast: boolean;
    toast(text: string): void;
    tip(rule: string | Json<string>, text: string): void;
    reg(rule: string | Json<IReg>, reg?: IReg): void;
    lang(lang: TLang): void | never;
    onOnePass(option: IBaseValidResult, dom?: HTMLElement): void;
    onOneFail(option: IBaseValidResult, dom?: HTMLElement): void;
}

export interface IRange {
    start: number;
    end: number;
}