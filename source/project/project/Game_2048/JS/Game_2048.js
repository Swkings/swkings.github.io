function Grid() {
    let width = document.body.clientWidth;
    let height = window.innerHeight;
    let size = width < height ? width : height;
    if (size <= 400) {
        size -= 20;
    } else {
        size = size * 0.6;
    }
    $('.main').css({
        'width': size + 'px',
        'height': size + 'px',
        'marginTop': (height - size) / 4 + 'px'
    });

    $('.grade').css({
        'width': size * 0.75 + 'px',
        'marginTop': (height - size) / 4 + 'px'
    });
    let h = $('.main').offset().top;
    $('.msg').css({
        'width': size + 'px',
        'height': size + 'px',
        'top': h + 'px',
        'left': (width - size) / 2 + 'px'
    });
    let grid = $('#main>div');
    size = (size - 2) / 4;
    for (let i = 0; i < 16; i++) {
        $(grid[i]).css({
            'width': size + 'px',
            'height': size + 'px'
        });
    }
}

function Game_2048() {
    this.f = 0;
    this.score = 0;
    this.add = false;
    this.cards = new Array(4);
    for (let i = 0; i < 4; i++) {
        this.cards[i] = new Array(4);
    }
    let key = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            this.cards[i][j] = key;
            key++;
        }
    }
    this.color = {
        0: '#e6ecc8',
        2: '#e4c4a5',
        4: '#eece8c',
        8: '#f3b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3c',
        128: '#edce71',
        256: '#eccb61',
        512: '#edc750',
        1024: '#edc631',
        2048: '#edc12f',
    }
    this.direction = {
        38: 0, // Up
        39: 1, // Right
        40: 2, // Down
        37: 3, // Left
        75: 0, // Vim up
        76: 1, // Vim right
        74: 2, // Vim down
        72: 3, // Vim left
        87: 0, // W
        68: 1, // D
        83: 2, // S
        65: 3 // A
    };
    // this.parames = {
    //     downX: 0,
    //     downY: 0,
    //     upX: 0,
    //     upY: 0,
    //     distanceX: 0,
    //     distanceY: 0
    // };

    this.addKeyEvent()
    this.addTouchEvent();
    this.addMouseEvent();



}


Game_2048.prototype.init = function() {
    $('#score').html(0);
    for (let i = 0; i < 16; i++) {
        $($('#main>div')[i]).html(null);
    }
    //初始化两个格子
    this.createCell();
    this.createCell();


}
Game_2048.prototype.getGrid = function(key) {
    return $($('#main>div')[key]).html();
}
Game_2048.prototype.setGrid = function(key, value) {
    $($('#main>div')[key]).html(value);
}
Game_2048.prototype.left = function() {
    let cards = this.cards;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = j + 1; k < 4; k++) {
                if (this.getGrid(cards[i][k]) > 0) {
                    if (this.getGrid(cards[i][j]) <= 0) {
                        this.setGrid(cards[i][j], this.getGrid(cards[i][k]));
                        this.setGrid(cards[i][k], null);
                        j--;
                        this.add = true;
                    } else if (this.getGrid(cards[i][k]) == this.getGrid(cards[i][j])) {
                        this.setGrid(cards[i][j], this.getGrid(cards[i][k]) * 2);
                        this.setGrid(cards[i][k], null);
                        this.score += this.getGrid(cards[i][j]) / 1;
                        this.add = true;
                    }
                    break;
                }
            }
        }
    }
    this.sum(this.score);
    return true;
}
Game_2048.prototype.right = function() {
    let cards = this.cards;
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            for (let k = j - 1; k >= 0; k--) {
                if (this.getGrid(cards[i][k]) > 0) {
                    if (this.getGrid(cards[i][j]) <= 0) {
                        this.setGrid(cards[i][j], this.getGrid(cards[i][k]));
                        this.setGrid(cards[i][k], null);
                        j++;
                        this.add = true;
                    } else if (this.getGrid(cards[i][k]) == this.getGrid(cards[i][j])) {
                        this.setGrid(cards[i][j], this.getGrid(cards[i][k]) * 2);
                        this.setGrid(cards[i][k], null);
                        this.score += this.getGrid(cards[i][j]) / 1;
                        this.add = true;
                    }
                    break;
                }
            }
        }
    }
    this.sum(this.score);
    return true;
}

//up 与 left 相同
Game_2048.prototype.up = function() {
    let cards = this.cards;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = j + 1; k < 4; k++) {
                if (this.getGrid(cards[k][i]) > 0) {
                    if (this.getGrid(cards[j][i]) <= 0) {
                        this.setGrid(cards[j][i], this.getGrid(cards[k][i]));
                        this.setGrid(cards[k][i], null);
                        j--;
                        this.add = true;
                        console.log(i);
                    } else if (this.getGrid(cards[k][i]) == this.getGrid(cards[j][i])) {
                        this.setGrid(cards[j][i], this.getGrid(cards[k][i]) * 2);
                        this.setGrid(cards[k][i], null);
                        this.add = true;
                        this.score += this.getGrid(cards[j][i]) / 1;
                    }
                    break;
                }
            }
        }
    }
    this.sum(this.score);
    return true;
}

//down 与 right 相同
Game_2048.prototype.down = function() {
    let cards = this.cards;
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            for (let k = j - 1; k >= 0; k--) {
                if (this.getGrid(cards[k][i]) > 0) {
                    if (this.getGrid(cards[j][i]) <= 0) {
                        this.setGrid(cards[j][i], this.getGrid(cards[k][i]));
                        this.setGrid(cards[k][i], null);
                        j++;
                        this.add = true;
                    } else if (this.getGrid(cards[k][i]) == this.getGrid(cards[j][i])) {
                        this.setGrid(cards[j][i], this.getGrid(cards[k][i]) * 2);
                        this.setGrid(cards[k][i], null);
                        this.add = true;
                        this.score += this.getGrid(cards[j][i]) / 1;
                        console.log(this.score);
                    }
                    break;
                }
            }
        }
    }
    this.sum(this.score);
    return true;
}
Game_2048.prototype.createCell = function() {
        let emptyCell = new Array();
        let self = this;
        for (let i = 0; i < 16; i++) {
            if (this.getGrid(i) <= 0) {
                emptyCell.push(i);
            }
        }
        let len = emptyCell.length;
        let randomNum = Math.floor(Math.random() * len);
        let num = Math.random() > 0.25 ? 2 : 4;
        this.setGrid(emptyCell[randomNum], num);
        for (let i = 0; i < 16; i++) {
            $($('#main>div')[i]).removeClass().addClass('n' + this.getGrid(i));
        }
    }
    //计分
Game_2048.prototype.sum = function(score) {
    $('#score').html(score);
}

//判输
Game_2048.prototype.Lose = function() {
    let self = this;
    self.createCell();
    let flag;
    let cards = this.cards;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            flag = this.getGrid(cards[i][j]);
            if (flag <= 0) {
                return false;
            }
            //相邻有相同的即未输
            if (i < 3 && this.getGrid(cards[i + 1][j]) == flag) {
                return false;
            }
            if (j < 3 && this.getGrid(cards[i][j + 1]) == flag) {
                return false;
            }
        }
    }

    $('.msg').css({
        'display': 'flex',
    });
    $('#restart').on('click', function() {
        self.init();
        $('.msg').css({
            'display': 'none',
        });
    });
    // this.init();
    return true;
}
Game_2048.prototype.addKeyEvent = function() {
        var self = this;
        document.onkeydown = function(event) {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            let keyCode = e.keyCode;
            let map = self.direction;

            switch (map[keyCode]) {
                case 0:
                    self.add = false;
                    self.up()
                    self.Lose();
                    break;

                case 1:
                    self.add = false;
                    self.right()
                    self.Lose();
                    break;

                case 2:
                    self.add = false;
                    self.down();
                    self.Lose();
                    break;

                case 3:
                    self.add = false;
                    self.left();
                    self.Lose();
                    break;
            }
        }

    }
    /*
            可以停止事件的传播
            用事件对象的 (w3c标准)ev.stopPropagation(); 
             IE8以下 ev.cancelBubble = true;

            以表单为例，点击“onsubmit”时，检查是否填写完全
            不完全则阻止提交
            即取消原有效果   
            ev.preventDefault();
            ev.returnValue = false; IE取消事件           
            */
Game_2048.prototype.addMouseEvent = function() {
    let self = this;
    let downX, down, upX, upY, distanceX, distanceY;
    $(document).mousedown(function(dev) {
        self.f = 0;
        dev.preventDefault();
        dev.stopPropagation();
        dev.cancelBubble = true;
        dev.returnValue = false;

        downX = dev.clientX || dev.pageX;
        downY = dev.clientY || dev.pageY;
        // $('#score').text(downX + ' ' + downY);
        setTimeout(() => {
            self.f = 0;
        }, 500);

    });
    $(document).mouseup(function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
        e.returnValue = false;
        upX = e.pageX;
        upY = e.pageY;
        distanceX = Math.floor(upX - downX);
        distanceY = Math.floor(upY - downY);
        // $('#score').text(downX + ' ' + downY + ' ' + upX + ' ' + upY);
        console.log('aaa');
        self.f++;
        if (self.f == 1 && Math.abs(distanceX) > 5 && Math.abs(distanceY) > 5) {
            if (Math.abs(distanceX) > Math.abs(distanceY)) {
                if (distanceX > 10) {
                    self.right();
                    self.Lose();
                } else {
                    self.left();
                    self.Lose();
                }
            } else if (Math.abs(distanceX) < Math.abs(distanceY)) {
                if (distanceY > 10) {
                    self.down();
                    self.Lose();
                } else {
                    self.up();
                    self.Lose();
                }
            }
        }
        setTimeout(() => {
            self.f = 0;
        }, 500);
    });


}
Game_2048.prototype.addTouchEvent = function() {
    let self = this;
    let downX, down, upX, upY, distanceX, distanceY;
    $(document).bind('touchstart', function(sev) {
        // sev.preventDefault();
        // sev.stopPropagation();
        // sev.cancelBubble = true;
        // sev.returnValue = false;
        downX = sev.originalEvent.touches[0].pageX;
        downY = sev.originalEvent.touches[0].pageY;

        //$('#score').text(downX + ' ' + downY);
        setTimeout(() => {
            self.f = 0;
        }, 500);
    });
    $(document).bind('touchend', function(e) {
        // e.preventDefault();
        // e.stopPropagation();
        // e.cancelBubble = true;
        // e.returnValue = false;
        // console.log(sev.originalEvent.touches[0]);
        upX = e.originalEvent.changedTouches[0].pageX;
        upY = e.originalEvent.changedTouches[0].pageY;

        //$('#score').text(downX + ' ' + downY + ' ' + upX + ' ' + upY);
        distanceX = Math.floor(upX - downX);
        distanceY = Math.floor(upY - downY);
        //$('#hidinput').html(distanceX + '' + distanceY);
        self.f++;
        console.log(self.f);
        if (self.f == 1 && Math.abs(distanceX) > 5 && Math.abs(distanceY) > 5) {
            if ((Math.abs(distanceX) > Math.abs(distanceY))) {
                if (distanceX > 0) {
                    self.right();
                    self.Lose();
                } else {
                    self.left();
                    self.Lose();
                }
            } else if ((Math.abs(distanceX) < Math.abs(distanceY))) {
                if (distanceY > 0) {
                    self.down();
                    self.Lose();
                } else {
                    self.up();
                    self.Lose();
                }
            }
        }
        setTimeout(() => {
            self.f = 0;
        }, 500);
    });

}
$(function() {
    Grid();
    window.onresize = function() {
        Grid();
    }
    var Game = new Game_2048();
    Game.init();
    $('#reset').on('click', function() {
        Game.init();
    });

});