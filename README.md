# [pure-v](https://www.github.com/theajack/pure-v)

<p>
    <a href="https://www.github.com/theajack/pure-v"><img src="https://img.shields.io/github/stars/theajack/pure-v.svg?style=social" alt="star"></a>
    <a href="https://theajack.gitee.io"><img src="https://img.shields.io/badge/author-theajack-blue.svg?style=social" alt="Author"></a>
</p> 

<p>
    <a href="https://www.npmjs.com/package/pure-v"><img src="https://img.shields.io/npm/v/pure-v.svg" alt="Version"></a>
    <a href="https://npmcharts.com/compare/pure-v?minimal=true"><img src="https://img.shields.io/npm/dm/pure-v.svg" alt="Downloads"></a>
    <a href="https://cdn.jsdelivr.net/npm/pure-v/purev.min.js"><img src="https://img.shields.io/bundlephobia/minzip/pure-v.svg" alt="Size"></a>
    <a href="https://github.com/theajack/pure-v/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/pure-v.svg" alt="License"></a>
    <a href="https://github.com/theajack/pure-v/search?l=typescript"><img src="https://img.shields.io/github/languages/top/theajack/pure-v.svg" alt="TopLang"></a>
    <a href="https://github.com/theajack/pure-v/issues"><img src="https://img.shields.io/github/issues-closed/theajack/pure-v.svg" alt="issue"></a>
    <a href="https://github.com/theajack/pure-v/blob/master/test/test-report.txt"><img src="https://img.shields.io/badge/test-passed-44BB44" alt="test"></a>
</p>
<h3>🚀 Lightweight and extensible pure js verification plugin</h3>

**[English](https://github.com/theajack/pure-v/blob/master/README.md) | [Online Use](https://theajack.gitee.io/jsbox?theme=dark&lang=html&lib=https://cdn.jsdelivr.net/npm/pure-v/purev.min.js&code=DwZwxgTglgDgLgAhBMBeARACznGIBcA9IWACYB2AdAFYikCmANlAG4SXn1yHkwC2hGAFcI9ALQtBI+i0p8oVWugB8wQuGjxlAWABQwUqwQwWYgGYB7CH1QByS9ds7dCVwnIBDPvXzAFwxDgATxh6DDh6AA84dGNTCCFGMNtyCzhyRMYnYAAjCFU85zcEHKgIOExSDyDffyFAkLD0COjYkzEEpLsqiOzC3Py9Ytz6uAtyBHGwZjAAazsWD2ZSAAoASidF5Y8IhAAxKz41HNHx5zVDFnONWDgitzBxkAskykYLAHMV4VEWFdsAEwABmBYiBAEYweDbAAaWw9ei2NZrADcQweTxe9Den2+0j+AG90cVXJ5vPhbBV6B5qB45rDiSTSuVKtV8AhbOCAJxcgAsUKhDJcJNc9D4HigjAp3gAAlSaXTZpRHnwhSLXAo4BALBSAAraj4QLzeCC2RkAXxhCCJwpFZJ8KTSGUYWRhjOKzIqVRq8J2iLdtpJYolUtswclavVmu1FNS6UyZsD5uRaMDZiE5DAcCg4wQWygpAQ6xt6uM+P+DlVqItejUNy0QA) | [Update Log](https://github.com/theajack/pure-v/blob/master/helper/version.md) | [Feedback bug/missing](https://github.com/theajack/pure-v/issues/new) | [Gitee](https://gitee.com/theajack/pure-v)**

---

### 1. Features

1. Typescript writing
2. Multi-terminal support
3. Customize validation rules and error prompts
4. Support dom element binding
5. Small size, easy to use

### 2. Quick use

#### 2.1 npm installation

```
npm i pure-v
```

```js
import purev from'pure-v';

purev('2020-01-01','date');
```

#### 2.2 cdn


```html
<script src="https://cdn.jsdelivr.net/npm/pure-v/purev.min.js"></script>
<script>
    purev('2020-01-01','date');
</script>
```

### 3 api

```ts
interface IPureV {
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
```

#### 3.1 Verification text

```js
purev('2020-01-02','date')
```


#### 3.2 Verify json

```js
purev({
    name:'theajack',
    birthday: '1994-01-01',
    email:'me@theajack.com',
    intro:''
}, {
    name:'notnull',
    birthday:'date',
    email:'email',
    intro:'notnull'
});
```


#### 3.3 Binding DOM

```html
<div pv-form='form'>
    name:<input type="text" pv-rule='notnull'><br><br>
    birthday:<input type="text" pv-rule='date'><br><br>
    <button onclick='valid()'>validate</button>
</div>
<script>
    function valid (){
        purev('form');
    }
</script>
```

Support the use of pv-form attributes, css selectors, or dom elements

When the element has the pv-rule attribute, only the current element is verified, otherwise, all child elements that contain the pv-rule attribute are verified

Has the following properties

1. pv-form form to be validated
2. pv-rule validation rules
3. pv-name gives the verification content a name
4. pv-attr is used to obtain the verified text, the default value is value, and the optional values ​​are value, text, html, src, href
5. pv-res When the verification fails, the verification dom element will have pv-res=fail

### 4. Custom rules

```js
purev.reg('custom', /^\d{3,4}$/);
purev.reg('customFn', (v) => {
    return v ==='purev' || v ==='PUREV';
});

purev('123','custom').pass,
purev('aaa','custom').pass,
purev('12345','custom').pass,
purev('purev','customFn').pass,
purev('PUREV','customFn').pass,
purev('xxxxx','custom').pass,
```

### 5. Custom error prompt

```js
purev.tip('date','Custom Date Tip');
purev('xxx','date').message;
```

### 6. Success and failure monitoring

```js
purev.onOnePass = (result) => {
    // ...
};
purev.onOneFail = (result) => {
    // ...
};
```

onOnePass and onOneFail are singleton mode, if you need to set, please directly override these two attributes

### 7 Usage examples

```js
const result = {
    notnull: [
        purev('','notnull').pass,
        purev('xx','notnull').pass,
    ],
    date: [
        purev('xx','date').pass,
        purev('2020-01-02','date').pass,
        purev('2020-13-02','date').pass,
    ],
    email: [
        purev('theajack@qq.com','email').pass,
        purev('xx','email').pass,
    ],
    number: [
        purev('1','number').pass,
        purev('12','number').pass,
        purev('12.3a','number').pass,
        purev('a12.3','number').pass,
        purev('123','number[3]').pass,
        purev('1234','number[3]').pass,
        purev('12345','number[3,6]').pass,
    ],
    idcard: [
        purev('340827111111111111','idcard').pass,
        purev('34082711111111111X','idcard').pass,
        purev('3408271111111111111','idcard').pass,
    ],
    length: [
        purev('123456','length[6]').pass,
        purev('1234你好','length[6]').pass,
        purev('1234567','length[6,9]').pass,
    ],
    url: [
        purev('https://www.baidu.com','url').pass,
        purev('http://www.baidu.com','url').pass,
        purev('xxxx','url').pass,
    ],
    decimal: [
        purev('1.1','decimal').pass,
        purev('0.1','decimal').pass,
        purev('0.1a','decimal').pass,
        purev('11','decimal').pass,
    ],
    lengthOfAny: [
        purev('123456','lengthOfAny[6]').pass,
        purev('1234你好','lengthOfAny[6]').pass,
        purev('12345你好','lengthOfAny[6]').pass,
    ],
    phone: [
        purev('11111111111','phone').pass,
        purev('1234','phone').pass,
        purev('22222222222','phone').pass,
    ],
    letterStart: [
        purev('a12','letterStart').pass,
        purev('a121','letterStart[4]').pass,
        purev('a121','letterStart[3, 5]').pass,
        purev('a1212a','letterStart[3, 5]').pass,
    ],
    range: [
        purev('99','range[100, 200]').pass,
        purev('123','range[100, 200]').pass,
        purev('200','range[100, 200]').pass,
        purev('201','range[100, 200]').pass,
    ],
    express: [
        purev('123','express[^\\d{3,4}$]').pass,
        purev('aaa','express[^\\d{3,4}$]').pass,
        purev('12345','express[^\\d{3,4}$]').pass,
    ],
    withNull: [
        purev('11111111111','phone').pass,
        purev('','phone').pass,
        purev('','phone null').pass,
    ]
};
```

```js
purev({
    name:'theajack',
    birthday: '1994-01-01',
    email:'me@theajack.com',
    intro:''
}, {
    name:'notnull',
    birthday:'date',
    email:'email',
    intro:'notnull'
})
```

```js
purev.reg('custom', /^\d{3,4}$/);
purev.reg('customFn', (v) => {
    return v ==='purev' || v ==='PUREV';
});
```

### 8 ts interface

 1. IPureV
 2. ITextValidResult
 3. IJsonValidResult
 5. IFormValidResult

```ts
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
interface IBaseValidResult {
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

interface IDomValidResult extends IBaseValidResult {
    dom: HTMLElement
}
export interface IFormValidResult {
    pass: boolean;
    message?: string;
    results: {
        [prop in string]: IDomValidResult;
    }
}
```