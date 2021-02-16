module.exports = {
    name: '测试验证onOnePass',
    test ({purev}) {
        const result = [];

        purev.onOnePass = (data) => {
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

        purev.onOnePass = null;

        return result;
    },
    expect: [{
        'pass': true,
        'message': '',
        'text': '2020-01-02'
    }, {
        'pass': true,
        'message': '',
        'text': 'theajack',
        'name': 'name'
    }, {
        'pass': true,
        'message': '',
        'text': '1994-01-01',
        'name': 'birthday'
    }, {
        'pass': true,
        'message': '',
        'text': 'me@theajack.com',
        'name': 'email'
    }],
};