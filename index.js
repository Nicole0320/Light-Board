var degree = 0;
var backDeg = 180;
var visible = 'front';

$('.flip-container').on('click', function(e){
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
});

$('#text').on('click',function(e){
    e.stopPropagation();
    $(this).css('contenteditable','');
});