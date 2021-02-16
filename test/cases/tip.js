module.exports = {
    name: '测试自定义提示',
    test ({purev}) {
        
        purev.tip('date', '自定义日期提示');

        return purev('xxx', 'date').message;
    },
    expect: '自定义日期提示',
};