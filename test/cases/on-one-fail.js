module.exports = {
    name: '测试验证onOneFail',
    test ({purev}) {
        const result = [];

        purev.onOneFail = (data) => {
            result.push(data);
        };
        purev('2020-01-02', 'date');
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

        purev.onOneFail = null;

        return result;
    },
    expect: [{
        'pass': false,
        'message':
        'required',
        'text': '',
        'name': 'intro'
    }],
};