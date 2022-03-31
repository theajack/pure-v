window.jsboxCode = {
    lib: 'https://cdn.jsdelivr.net/npm/pure-v/purev.min.js',
    lang: 'html',
    code: /* html*/`<div pv-form='form'>
    name:<input type="text" pv-rule='notnull'><br><br>
    birthday:<input type="text" pv-rule='date'><br><br>
    <button onclick='valid()'>validate Form</button>
</div>
<script>
    console.log(purev('2020-01-01','date'));
    console.log(purev({
        name:'theajack',
        birthday: '1994-01-01',
        email:'me@theajack.com',
        intro:'Programmer'
    }, {
        name:'notnull',
        birthday:'date',
        email:'email',
        intro:'notnull'
    }));
    function valid (){
        purev('form');
    }
</script>`,
};
