module.exports = {
    name: '测试验证json',
    test ({purev}) {
        return purev({
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
    },
    expect: {
        'pass': false,
        'message': '',
        'results': {
            'name': {'pass': true, 'message': '', 'text': 'theajack', 'name': 'name'},
            'birthday': {'pass': true, 'message': '', 'text': '1994-01-01', 'name': 'birthday'},
            'email': {'pass': true, 'message': '', 'text': 'me@theajack.com', 'name': 'email'},
            'intro': {'pass': false, 'message': 'required', 'text': '', 'name': 'intro'}
        }
    },
};