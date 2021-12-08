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
<h3>🚀 轻量级、可扩展的纯粹的js验证插件</h3>

**[English](https://github.com/theajack/pure-v/blob/master/README.md) | [在线使用](https://theajack.gitee.io/jsbox/?github=theajack.pure-v) | [更新日志](https://github.com/theajack/pure-v/blob/master/helper/version.md) | [反馈错误/缺漏](https://github.com/theajack/pure-v/issues/new) | [Gitee](https://gitee.com/theajack/pure-v)**

---

### 1. 特性

1. typescript 编写
2. 多端支持
3. 自定义验证规则、错误提示
4. 支持dom元素绑定
5. 体积小巧，简单易用

### 2. 快速使用

#### 2.1 npm 安装

```
npm i pure-v
```

```js
import purev from 'pure-v';

purev('2020-01-01', 'date');
```

#### 2.2 cdn


```html
<script src="https://cdn.jsdelivr.net/npm/pure-v/purev.min.js"></script>
<script>
    purev('2020-01-01', 'date');
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

#### 3.1 验证文本

```js
purev('2020-01-02', 'date')
```


#### 3.2 验证json

```js
purev({
    name: 'theajack',
    birthday: '1994-01-01',
    email: 'me@theajack.com',
    intro: ''
}, {
    name: 'notnull',
    birthday: 'date',
    email: 'email',
    intro: 'notnull'
});
```


#### 3.3 绑定DOM

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

支持使用 pv-form 属性，css选择器，或dom元素

当元素有 pv-rule 属性时，则只验证当前元素，否则验证该元素所有含有 pv-rule 属性的子元素

有以下属性

1. pv-form 待验证的表单
2. pv-rule  验证规则
3. pv-name 给验证内容起一个名称
4. pv-attr 用于获取验证的文本，默认值为 value, 可选值有 value, text, html, src, href
5. pv-res 当验证失败时，验证dom元素 会带有 pv-res=fail

### 4. 自定义规则

```js
purev.reg('custom', /^\d{3,4}$/);
purev.reg('customFn', (v) => {
    return v === 'purev' || v === 'PUREV';
});

purev('123', 'custom').pass,
purev('aaa', 'custom').pass,
purev('12345', 'custom').pass,
purev('purev', 'customFn').pass,
purev('PUREV', 'customFn').pass,
purev('xxxxx', 'custom').pass,
```

### 5. 自定义错误提示

```js
purev.tip('date', '自定义日期提示');
purev('xxx', 'date').message;
```

### 6. 成功和失败监听

```js
purev.onOnePass = (result) => {
    // ...
};
purev.onOneFail = (result) => {
    // ...
};
```

onOnePass 和 onOneFail 为单例模式，如需设置请直接覆盖这两个属性

### 7 使用实例

```js
const result = {
    notnull: [
        purev('', 'notnull').pass,
        purev('xx', 'notnull').pass,
    ],
    date: [
        purev('xx', 'date').pass,
        purev('2020-01-02', 'date').pass,
        purev('2020-13-02', 'date').pass,
    ],
    email: [
        purev('theajack@qq.com', 'email').pass,
        purev('xx', 'email').pass,
    ],
    number: [
        purev('1', 'number').pass,
        purev('12', 'number').pass,
        purev('12.3a', 'number').pass,
        purev('a12.3', 'number').pass,
        purev('123', 'number[3]').pass,
        purev('1234', 'number[3]').pass,
        purev('12345', 'number[3,6]').pass,
    ],
    idcard: [
        purev('340827111111111111', 'idcard').pass,
        purev('34082711111111111X', 'idcard').pass,
        purev('3408271111111111111', 'idcard').pass,
    ],
    length: [
        purev('123456', 'length[6]').pass,
        purev('1234你好', 'length[6]').pass,
        purev('1234567', 'length[6,9]').pass,
    ],
    url: [
        purev('https://www.baidu.com', 'url').pass,
        purev('http://www.baidu.com', 'url').pass,
        purev('xxxx', 'url').pass,
    ],
    decimal: [
        purev('1.1', 'decimal').pass,
        purev('0.1', 'decimal').pass,
        purev('0.1a', 'decimal').pass,
        purev('11', 'decimal').pass,
    ],
    lengthOfAny: [
        purev('123456', 'lengthOfAny[6]').pass,
        purev('1234你好', 'lengthOfAny[6]').pass,
        purev('12345你好', 'lengthOfAny[6]').pass,
    ],
    phone: [
        purev('11111111111', 'phone').pass,
        purev('1234', 'phone').pass,
        purev('22222222222', 'phone').pass,
    ],
    letterStart: [
        purev('a12', 'letterStart').pass,
        purev('a121', 'letterStart[4]').pass,
        purev('a121', 'letterStart[3, 5]').pass,
        purev('a1212a', 'letterStart[3, 5]').pass,
    ],
    range: [
        purev('99', 'range[100, 200]').pass,
        purev('123', 'range[100, 200]').pass,
        purev('200', 'range[100, 200]').pass,
        purev('201', 'range[100, 200]').pass,
    ],
    express: [
        purev('123', 'express[^\\d{3,4}$]').pass,
        purev('aaa', 'express[^\\d{3,4}$]').pass,
        purev('12345', 'express[^\\d{3,4}$]').pass,
    ],
    withNull: [
        purev('11111111111', 'phone').pass,
        purev('', 'phone').pass,
        purev('', 'phone null').pass,
    ]
};
```

```js
purev({
    name: 'theajack',
    birthday: '1994-01-01',
    email: 'me@theajack.com',
    intro: ''
}, {
    name: 'notnull',
    birthday: 'date',
    email: 'email',
    intro: 'notnull'
})
```

```js
purev.reg('custom', /^\d{3,4}$/);
purev.reg('customFn', (v) => {
    return v === 'purev' || v === 'PUREV';
});
```

### 8 ts 接口

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