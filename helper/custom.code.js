window.jsboxCode = {
    lib: 'https://cdn.jsdelivr.net/npm/pure-v/purev.min.js',
    lang: 'html',
    code: /* html*/`<div pv-form='form'>
    <div class='jx-block'>
        name: <input class='jx-input' type="text" pv-rule='notnull'>
    </div>
    <div class='jx-block'>
        birthday: <input class='jx-input' type="text" pv-rule='date'>
    </div>
    <button class='jx-button' onclick='valid()'>validate Form</button>
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
        console.log(purev('form'));
    }
</script>`,
};
