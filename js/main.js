var GAME_LAST_TIME = 30000,
    GAME_BEFORE_SHAKE_TIME = 3000;

function setRecord(num) {
    var str = num + '',
        arr = str.split('');

    var htmlStr = '';

    arr.forEach(function(item) {
        htmlStr += ('<i class="iconfont icon-' + item + '"></i>')
    });

    var records = document.querySelectorAll('.record');
    records.forEach(function(item) {
        item.innerHTML = htmlStr;
    });
}

var total = 0;
var shake = new ShakeListener(),
    clocker = new Clocker({
    time: GAME_LAST_TIME,
    handler: function() {
        shake.destroy();
        showScene('record');

        //在此加入结算接口
        //在此加入是否可继续游戏接口
        //如果继续游戏，则调用play
    },
    second: function(remain) {
        document.querySelector('#time-remain').innerHTML = remain;
    }
});

shake.onShake = function() {
    total ++;

    setRecord(total);

    window.navigator.vibrate(200)
};

function play() {
    total = 0;
    setRecord(total);
    shake.begin();
    clocker.start();
}

function start(cb) {
    var timeBeforePlay = GAME_BEFORE_SHAKE_TIME;

    showScene('start');
    document.querySelector('#start-discount').innerHTML = (timeBeforePlay / 1000);

    var beginTime = new Clocker({
        time: timeBeforePlay,
        handler: function() {
            showScene('play');
            play();
        },
        second: function(time) {
            var str = !time ? '晃动!' : time;
            document.querySelector('#start-discount').innerHTML = str;
        }
    });

    beginTime.start();
};

function showScene(name) {
    var scenes = document.querySelectorAll('div[id^="scene-"]');

    scenes.forEach(function(item) {
        if(new RegExp(name).test(item.id)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        };
    });
}

function checkCanUse() {
    $.get('', function(data) {
        if(data) {
            document.querySelector('btn-restart').style.display = 'block';
            document.querySelector('btn-start').style.display = 'block';
        } else {
            document.querySelector('btn-restart').style.display = 'none';
            document.querySelector('btn-start').style.display = 'none';
        };
    })
}
