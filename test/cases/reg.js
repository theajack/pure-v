module.exports = {
    name: '测试自定义规则',
    test ({purev}) {
        purev.reg('custom', /^\d{3,4}$/);
        purev.reg('customFn', (v) => {
            return v === 'purev' || v === 'PUREV';
        });
        return [
            purev('123', 'custom').pass,
            purev('aaa', 'custom').pass,
            purev('12345', 'custom').pass,
            purev('purev', 'customFn').pass,
            purev('PUREV', 'customFn').pass,
            purev('xxxxx', 'custom').pass,
        ];
    },
    expect: [
        true, false, false,
        true, true, false,
    ],
};