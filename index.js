var degree = 0;
var backDeg = 180;
var visible = 'front';
var clock;
//16进制编码数组
var hexCodes = ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f'];

//滑动翻转效果
$('.flip-container').on('swiperight', function(e){
    degree += 180;
    $(this).children('.front').css({
        'transform': 'rotateY('+(degree)+'deg)',
        'visibility': visible === 'front'? 'hidden':'visible'
    });
    $(this).children('.back').css({
        'transform': 'rotateY('+(degree+180)+'deg)',
        'visibility': visible === 'back'? 'hidden':'visible'
    });
    visible = visible === 'front'? 'back':'front';
}).on('swipeleft',function(e){
    degree -= 180;
    $(this).children('.front').css({
        'transform': 'rotateY('+(degree)+'deg)',
        'visibility': visible === 'front'? 'hidden':'visible'
    });
    $(this).children('.back').css({
        'transform': 'rotateY('+(degree+180)+'deg)',
        'visibility': visible === 'back'? 'hidden':'visible'
    });
    visible = visible === 'front'? 'back':'front';
});

//初始化
$(window).on('ready',function(){
    let height = document.documentElement.clientHeight;
    $('body').innerHeight(height);
    adjustFontSize();
}).on('shake',function(){
    setColor();
}).on('resize',adjustFontSize);

$('#text').on('keyup',adjustFontSize);

//控制是否摇一摇变色
$('.setting .shake-change-color').on('click',function(){
    $this = $(this)
    if($this.hasClass('open')){
        $this.removeClass('open');
        $(window).off('shake');
    }
    else{
        $this.addClass('open');
        $(window).on('shake',function(){
            setColor();
        })
    }
})

//控制是否打开自动换色
$('.setting .auto-change-color').on('click',function(){
    $this = $(this)
    if($this.hasClass('open')){
        $this.removeClass('open');
        clearInterval(clock);
    }
    else{
        $this.addClass('open');
        clock = setInterval(function(){
            setColor();
        }, 1500)
    }
})

function adjustFontSize(){
    let $this = $('#text');
    console.log($this.html());
    if($this.html() === ''){
        return;
    }
    let windowWidth = $(window).innerWidth();
    let clock = setInterval(function(){
        let fontsize = parseInt($this.css('font-size'));
        if($this.innerWidth()<windowWidth-40){
            $this.css({
                'font-size': fontsize+2+'px',
                'margin-left': -($this.innerWidth()/2),
                'margin-top': -($this.innerHeight()/2),
            });
        }
        else if($this.innerWidth()>windowWidth){
            $this.css({
                'font-size': fontsize-2+'px',
                'margin-left': -($this.innerWidth()/2),
                'margin-top': -($this.innerHeight()/2),
            });
        }
        else{
            clearInterval(clock);
        }
    },5)
}

function setColor(){
    $('.front').css('background-color', getColorCode());
    $('#text').css('color',getColorCode());
}

function getColorCode(){
    let color = '#';
    for(let i=0; i<6; i++){
        color += hexCodes[Math.floor(Math.random()*16)];
    }
    return color;
}