var degree = 0;
var backDeg = 180;
var visible = 'front';

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

$(window).on('ready',adjustFontSize);

$('#text').on('keyup',adjustFontSize);

function adjustFontSize(){
    let $this = $('#text');
    let windowWidth = $(window).innerWidth();
    console.log($this.innerWidth());
    console.log(windowWidth);
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
}self