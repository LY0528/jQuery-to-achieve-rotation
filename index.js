$(function() {
  var index = 0;
  var timer = null;
  //li标签的宽度
  var li_width = $('#ul_img>li').outerWidth();
  //li标签的个数
  var length = $('#ul_img>li').length;
  //事件放在pageTurn对象中
  var pageTurn = {
      next: function() {
        index++
        if (index === length) {
          index = 0
        }
        moving(index)
      },
      pre: function() {
        index--
        if (index < 0) {
          index = length - 1;
        }
        moving(index)
      },
      squ: function() {
        $('#square>li').on('click', function() {
          index = $(this).index()
          moving(index)
        })
      }
    }
    //鼠标移入的时候让翻页按钮显示出来
  mouseEvent('mousemove', 'block');
  //鼠标离开的时候让翻页按钮隐藏
  mouseEvent('mouseleave', 'none');
  //点击next按钮 让图片翻到下一张
  $('#next').on('click', function() {
      pageTurn.next()
    })
    //点击pre按钮 让图片翻到上一张
  $('#pre').on('click', function() {
      pageTurn.pre()
    })
    //点击数字显示相应的图片
  pageTurn.squ()
    //自动轮播
  timer = setInterval(function() {
      pageTurn.next()
    }, 1000)
    //封装moving
  function moving(index) {
    $('#ul_img').animate({ 'left': '-' + index * li_width + 'px' }, 'fast')
    $('#square>li:eq(' + index + ')').addClass('current').siblings().removeClass('current')
  }
  //封装鼠标事件
  function mouseEvent(event, attr) {
    $('#box').on(event, function() {
      $('.btn').css('display', attr);
      if (event === 'mousemove') {
        clearInterval(timer)
      } else if (event === 'mouseleave') {
        timer = setInterval(function() {
          pageTurn.next()
        }, 1000)
      }
    })
  }
})
