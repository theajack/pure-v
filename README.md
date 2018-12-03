# purev.js: A lightweight, extensible, pure js validation plugin
## Introduction

###(中文版本请往下翻)

[Purev.js](https://github.com/theajack/purev#readme) is a lightweight, extensible, easy to use, pure js validation plugin.

Purev focuses on validation and can run in a browser environment or a node environment.

Purev can be used to validate DOM elements and forms with instructions, or just to validate data.

### 1.Installation and use

#### 1.1 Introduced using script tags

```
<script src='https://www.theajack.com/lib/purev.min.js'></div>
```

Introducing purev.js with a script tag will generate a `purev object` on the window object.

If the naming is already used, the purev object will be named `$PUREV`

#### 1.2 npm Installation

```
npm i pure-v
```

Quote:

```
var purev = require('pure-v')
//or
import purev from 'pure-v'
```

#### 1.3 Examples

##### 1.3.1 Using instructions in a browser environment

```
<div pv-form='form'>
Name:<input type="text" pv-rule='notnull'><br><br>
Birthday:<input type="text" pv-rule='date'><br><br>
<button onclick='purev("form")'>validate</button>
</div>
```

##### 1.3.2 Verifying a value or a json object

```
var purev = require('pure-v')
//or import purev from 'pure-v'
// Use the script tag to introduce will generate a global purev object

purev('2018-09-09','email')
//result:"The format is XXX@XX.XX"

purev('2018-09-09','date')
//result:true

purev('','null date')
//result:true

purev({
	name: 'theajack',
	birthday: '1994-01-01',
	email: 'me@theajack.com',
	intro:''
},{
	name: 'notnull',
	birthday: 'date',
	email: 'email',
	intro:'notnull'
})
/*
//result:
{
	result:false,
	info:{
		name: true,
		birthday: true,
		email: true,
		intro: 'required'
	}
}
*/
```
##### 1.3.3 Configuration Information Code

```
var purev = require('pure-v')
purev.toast=null //Disable the default prompt method
purev.onOnePass=function(a1,a2){
	console.log(a1,a2)
}
//...
//Please refer to 2.3
```

### 2. Detailed manual

#### 2.1.pv command

When using purev in a browser environment, you can mark dom with an instruction and then verify it with `purev()`

Purev uses `pv-form` to declare a validation container. Call it a pure container.

Use `pv-rule` to declare a pending element and declare validation rules. Call it the pure element.

An element that fails validation will be added a `pv-res` attribute with a value of `fail`

You can use this `[pv-res=fail]` to customize the styles that the validation does not pass.

Here's a simple example:

```
<div pv-form='form'>
	Name:<input type="text" pv-rule='notnull'><br><br>
	Birthday:<input type="text" pv-rule='date'><br><br>
	<button onclick='purev("form")'>validate</button>
</div>
```

Purev() Please refer to 2.2

For the validation rules in purev, please refer to 2.3

For the configuration method in purev, please refer to 2.4.

#### 2.2 purev()

A purev object is a method that takes two or three arguments. There are three main ways to use it.

|-|Parameter|Return value|Remarks|
|:--:|:--:|:--:|:--:|
|2.2.1|ele[,function][,function]|array|Verify a pure container or a pure element<br>(available in the browser environment)|
|2.2.2|json,ruleJson|json|Verify a json object|
|2.2.3|string,rule|string|Verify a value|

##### 2.2.1 Verification of dom with instructions

In this way, the first parameter ele has the following three legal cases:

1. string: the value of a pv-form attribute
2. string: an id attribute value
3. HTMLElement: a dom element

The second parameter is a callback function that passes validation. The third parameter is a callback function that fails validation.

When the dom element obtained by purev contains the pv-rule attribute, purev will only validate this pure element, otherwise the don will be treated as a pure container with or without the pv-form attribute.

When validation is required, purev(ele) is called to verify. Call purev(ele,function(){}) to execute a callback function after the validation has passed.

The return value of this mode is an array indicating the result of the verification failure. If the length of the array is zero, it means that the verification is all passed.

##### 2.2.2 Verifying a json

In this way, both parameters are required, all are json data, and the two parameter keys must be kept one.

The first parameter indicates the information to be verified, and the second parameter is the verification rule.

The return value is also a json object, which contains a result attribute indicating whether the validation passed, and an info attribute indicating the prompt for validation.

##### 2.2.3 Verifying a value

In this way, both parameters are required, all of which are value types. The first parameter is the value to be verified, and the second parameter is the validation rule.

The return value is also a value type. If true, the validation is passed, otherwise a string type error message will be returned.

#### 2.3 List of predefined validation rules

|Name|Implication|Prompt Information|Remarks|
|:--:|:--:|:--:|:--:|
|notnull|Required|required|--|
|null|Allow null|Allow empty|Only this rule can exist with other rules, indicating that null values ​​are allowed|
|date |date format|The format is XXXX-XX-XX|XXXX-XX-XX|
|email|Email|The format is XXX@XX.XX|--|
|idcard|ID number|17 digits plus one digit or X|Chinese ID number format: 17 digits plus one digit or X|
|decimal|小数|Please correct the decimal|--|
|url|link|Please enter the correct URL|--|
|phone|Mobile Number|It must be 11 digits|China Number Format: 11 digits at the beginning of 1 |
|number[]|Number|Must be a pure number|You can use number[a] to qualify a bit number; use number[a,b] to limit the number between a bit and b bit. The following [] also means the same meaning |
|length[]|String of the specified length|The length is in [a,b]|--|
|lengthOfAny[]|The specified length can contain any character (Chinese character) string|The length is in [a,b]|--|
|letterStart[]|A string of letters of the specified length |The beginning of the letter and the length is [a,b]|--|
|range[]|The number of the specified range|The number is not in range [a,b]|--|
|express[exp]|Custom Validation Rule|Custom Error|[exp] represents a valid regular expression|

If you are not satisfied with these verification rules or prompts, you can modify them using the configuration method. For details, please refer to 2.4.

#### 2.3 Configuration Method or Attribute

The following configuration methods are available on purev objects

|Name|Meaning|Parameters|Return Value|Remarks|
|:--:|:--:|:--:|:--:|:--:|
|info|Add or modify the prompt message for validation failure|string,string|--|The first parameter is the validation rule name|
|reg|Add or modify the validated regular expression |string,RegExp|--|The first parameter is the validation rule name|
|lang|Modify the language of the prompt information|string|--|The parameter optional value is only 'EN', 'CN'|

The following configuration properties are available on the purev object

|Name|Meaning|Type|Remarks|
|:--:|:--:|:--:|:--:|
|toast|Set a prompt method for validation failure<br>The default method is alert (under browser environment) or console.log|function|callback parameter of function parameter is the first prompt for verification failure |
|onOnePass|Set a callback function that will be triggered every time the validation is passed |function| Callback parameters When using the directive binding dom, the first argument is the dom element, and the second prompt message |
|onOneFail|Set a callback function that will be triggered every time the validation fails. |function| Same as above |



# purev.js:一款轻量级、可扩展的纯粹的js验证插件
## 介绍

[purev.js](https://github.com/theajack/purev#readme) 是一款轻量级、可扩展、使用简单的纯粹的js验证插件。

purev专注于验证，并且可以运行在浏览器环境或node环境中。

purev可以搭配指令验证DOM元素和表单，也可以只做数据的验证。

### 1.安装使用

#### 1.1 使用script标签引入

```
<script src='https://www.theajack.com/lib/purev.min.js'></div>
```

使用script标签引入 purev.js 会在window对象上生成一个 `purev 对象`。

若是该命名已经被使用，purev 对象会被命名为 `$PUREV`

#### 1.2 npm 安装

```
npm i pure-v
```

引用：

```
var purev = require('pure-v')
//or
import purev from 'pure-v'
```

#### 1.3 示例

##### 1.3.1 配合指令在浏览器环境中使用

```
<div pv-form='form'>
	name:<input type="text" pv-rule='notnull'><br><br>
	birthday:<input type="text" pv-rule='date'><br><br>
	<button onclick='purev("form")'>validate</button>
</div>
```

##### 1.3.2 验证一个值或一个json对象

```
var purev = require('pure-v')
//使用script标签引入会生成一个全局的purev对象

purev('2018-09-09','email')
//result:"The format is XXX@XX.XX"

purev('2018-09-09','date')
//result:true

purev('','null date')
//result:true

purev({
	name:'theajack',
	birthday:'1994-01-01',
	email:'me@theajack.com',
	intro:''
},{
	name:'notnull',
	birthday:'date',
	email:'email',
	intro:'notnull'
})
/*
//result:
{
	result:false,
	info:{
		name: true,
		birthday: true,
		email: true,
		intro: 'required'
	}
}
*/
```

##### 1.3.3 配置信息代码

```
var purev = require('pure-v')
purev.toast=null //禁用默认的提示方法
purev.onOnePass=function(a1,a2){
	console.log(a1,a2)
}
//请参考 2.3
```

### 2.详细使用手册

#### 2.1.pv指令

在浏览器环境中使用purev时，可以通过指令标记dom，然后通过`purev()`来验证

purev使用 `pv-form` 来声明一个验证容器。称其为 pure容器。

使用 `pv-rule` 来声明一个待验证元素并声明验证规则。称其为 pure元素。

验证不通过的元素会被添加一个 `pv-res` 的属性，并且其值为`fail`

您可以使用这个 `[pv-res=fail]` 来自定义验证不通过的样式。

以下是一个简单的例子：

```
<div pv-form='form'>
	name:<input type="text" pv-rule='notnull'><br><br>
	birthday:<input type="text" pv-rule='date'><br><br>
	<button onclick='purev("form")'>validate</button>
</div>
```

purev() 请参考2.2

purev 中的验证规则请参考 2.3

purev 中的配置方法请参考 2.4

#### 2.2 purev()

purev 对象是一个方法，接受两个或三个参数 主要有三种使用方式

|-|参数|返回值|备注|
|:--:|:--:|:--:|:--:|
|2.2.1|ele[,function][,function]|array|验证一个pure容器或者一个pure元素<br>(浏览器环境中可用)|
|2.2.2|json,ruleJson|json|验证一个json对象|
|2.2.3|string,rule|string|验证一个值|

##### 2.2.1 配合指令验证dom

这种方式第一个参数 ele 有以下三种合法情况：

1. string:一个pv-form属性的值
2. string:一个id属性值
3. HTMLElement:一个dom元素

第二个参数是一个验证通过的回调函数。第三个参数是一个验证失败的回调函数。

当purev获取到的dom元素含有 pv-rule 属性时，purev 就会只验证这一个 pure元素，否则不管有没有pv-form属性，这个don都会当作pure容器处理。

需要验证时，调用 purev(ele) 来验证。调用 purev(ele,function(){}) 来在验证全部通过后执行一个回调函数。

该方式返回值是一个数组，表示验证失败的结果，若是数组长度为零，则表明验证全部通过。

##### 2.2.2 验证一个json

这种方式两个参数都是必须的，都是json数据，且两个参数键必须保持一个

第一个参数表示的是待验证的信息，第二个参数是验证的规则

返回值也是一个json对象，它含有一个 result 属性，表示验证是否通过，还有一个info属性，表示验证的提示信息。

##### 2.2.3 验证一个值

这种方式两个参数都是必须的，都是值类型，第一个参数是待验证的值，第二个参数是验证规则

返回值也是一个值类型，如果是 true 表示验证通过，否则会返回一个字符串类型的错误提示信息

#### 2.3 预定义的验证规则列表

|名称|含义|提示信息|备注|
|:--:|:--:|:--:|:--:|
|notnull|必填|required|--|
|null|允许空值|Allow empty|只有该规则可以与其他规则同时存在，表示允许空值|
|date |日期格式|The format is XXXX-XX-XX|XXXX-XX-XX|
|email|邮箱|The format is XXX@XX.XX|--|
|idcard|身份证号|17 digits plus one digit or X|中国身份证号格式：17位数字加一位数字或X|
|decimal|小数|Please correct the decimal|--|
|url|链接|Please enter the correct URL|--|
|phone|手机号码|It must be 11 digits|中国号码格式：1开头的11位数字|
|number[]|数字|Must be a pure number|可以使用 number[a] 来限定必须是a位数字；使用 number[a,b] 来限定数字必须是在a位到b位之间。下面的[]也表示相同的含义|
|length[]|指定长度的字符串|The length is in [a,b]|--|
|lengthOfAny[]|指定长度的可包含任意字符（汉字）字符串|The length is in [a,b]|--|
|letterStart[]|指定长度的字母打头的字符串|The beginning of the letter and the length is [a,b]|--|
|range[]|指定范围的数字|The number is not in range [a,b]|--|
|express[exp]|自定义验证规则|Custom Error|[exp]表示一个合法的正则表达式|

若您对这些验证规则或者提示信息不满意，可以使用配置方法对它们进行修改，详情请见2.4

#### 2.3 配置方法或属性

purev 对象上有以下配置方法

|名称|含义|参数|返回值|备注|
|:--:|:--:|:--:|:--:|:--:|
|info|添加或修改验证失败的提示信息|string,string|--|第一个参数是验证规则名|
|reg|添加或修改验证的正则表达式|string,RegExp|--|第一个参数是验证规则名|
|lang|修改提示信息的语言|string|--|参数可选值只有 'EN','CN'|

purev 对象上有以下配置属性

|名称|含义|类型|备注|
|:--:|:--:|:--:|:--:|
|toast|设置一个验证失败的提示方法<br>默认方法是alert(浏览器环境下)或console.log|function|参数函数的回调参数是第一个验证失败的提示信息|
|onOnePass|设置一个每一次验证通过都会触发的回调函数|function|回调参数当使用指令绑定dom时，第一个参数是dom元素，第二个时提示信息|
|onOneFail|设置一个每一次验证失败都会触发的回调函数|function|同上|

