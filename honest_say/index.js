const MatriX = {

    "oe": 0,
    "n": 0,
    "z": 0,

    "oK": 1,
    "6": 1,
    "5": 1,

    "ow": 2,
    "-": 2,
    "A": 2,

    "oi": 3,
    "o": 3,
    "i": 3,

    "7e": 4,
    "v": 4,
    "P": 4,

    "7K": 5,
    "4": 5,
    "k": 5,
    "7v": 5,

    "7w": 6,
    "C": 6,
    "s": 6,

    "7i": 7,
    "S": 7,
    "l": 7,

    "Ne": 8,
    "c": 8,
    "F": 8,

    "NK": 9,
    "E": 9,
    "q": 9,

    '*': 'X'
};
window.onload = function() {
    resizeWindow();
    window.onresize = function() {
        resizeWindow();
    }
    info();
    addListen();
}
var info = function() {
    document.getElementById('close').addEventListener('click', function() {
        document.getElementById('igno').style.display = 'none';
    });
}
var resizeWindow = function() {
    var width = document.body.clientWidth;
    var height = window.innerHeight;
    document.getElementById('con').style.width = width + 'px';
    document.getElementById('con').style.height = height + 'px';
    console.log(width, height);
}

var getToken = function() {
    var token = document.getElementById('text1').value;
    document.getElementById('myiframe').src = 'https://ti.qq.com/cgi-node/honest-say/receive/mine?_client_version=0.0.7&_t=1523022244759&token=' + token;
    document.getElementById('myiframe').style.display = 'block';
    document.getElementById('data_text').style.display = 'none';

    document.getElementById('start').style.display = 'none';
    document.getElementById('analyse').style.display = 'block';
    clearRequest();

}
var clearRequest = function() {
    setTimeout(() => {
        var text1 = document.getElementById('text1');
        text1.value = '';
        text1.placeholder = '请将下方请求的数据复制到此处';
    }, 10);
}
var clearAnalyse = function() {
    setTimeout(() => {
        var text1 = document.getElementById('text1');
        text1.value = '';
        text1.placeholder = '请输入XHR中token值';
    }, 10);
}


var addListen = function() {
    var start = document.getElementById('start');
    var analyse = document.getElementById('analyse');
    start.addEventListener('click', getToken);
    analyse.addEventListener('click', Analyse);
}
var QQ = function(input) {
    var has = true;
    var str = '';
    while (input.length > 0) {
        has = MatriX[input.substr(0, 2)];
        if (has) {
            str += has;
            input = input.substr(2);
        } else {
            var temp = MatriX[input.substr(0, 1)];
            if (temp == undefined) {
                temp = '';
            }
            str += temp;
            input = input.substr(1);
        }
    }
    return str;
};

var Analyse = function() {
    var str = document.getElementById('text1');
    var dataList = JSON.parse(str.value).data.list;
    var Qnum = '';
    var topic = '';
    var html = '<table style="border-spacing: 10px"><tbody><tr><th>QQ</th><th>坦白说</th></tr>';
    dataList.forEach(element => {
        Qnum = QQ(element.fromEncodeUin.substr(4));
        topic = element.topicName;
        html += '<tr><td>' + Qnum + '</td><td>' + topic + '</td></tr>';
    });
    html += '</tbody></table>';
    var result = document.getElementById('data_text');
    document.getElementById('myiframe').style.display = 'none';
    result.style.display = 'block';
    result.innerHTML = html;

    document.getElementById('analyse').style.display = 'none';
    document.getElementById('start').style.display = 'block';

    clearAnalyse();
}