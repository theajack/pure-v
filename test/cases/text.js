module.exports = {
    name: '测试验证文本',
    test ({purev}) {
        return {
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
    },
    expect: {
        notnull: [false, true],
        date: [false, true, false],
        email: [true, false],
        number: [true, true, false, false, true, false, true],
        idcard: [true, true, false],
        length: [true, false, true],
        url: [true, true, false],
        decimal: [true, true, false, true],
        lengthOfAny: [true, true, false],
        phone: [true, false, false],
        letterStart: [true, true, true, false],
        range: [false, true, true, false],
        express: [true, false, false],
        withNull: [true, false, true]
    },
};