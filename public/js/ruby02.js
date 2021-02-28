/**
 * MOBILE DETECT
 */
(function($) {
  $(document).on('ready', function() {
    var bowser = window.bowser;
    if( !!bowser ) {
      $('html').addClass('os-' + bowser.name);
    }
  });
})(jQuery);











/**
 * CUSTOM SCRIPT
 */
/**
 * RUBY MENU
 */
(function($) {
$(document).on('ready', function() {
  window.navMain = $('.rm01').rubymenu()

  // Dùng để Test
  // window.navMain.pushOn()
})
})(jQuery);







/**
 * SCROLL EVENT
 */
(function($) {
$(document).on('ready', function() {
  var $rubySticky = $('.ruby-sticky');
  var actived = 'sticky-actived';
  var yToActived = 150;
  var chenhlech = 20;

  $rubySticky.each(function() {
    var $sticky = $(this);
    var hSticky = $sticky.outerHeight();

    /** EVENT SCROLL */
    $(window).on('scroll', function() {
      var scrollTop = $(window).scrollTop();

      if (scrollTop >= (hSticky + chenhlech)) {
        $sticky.addClass(actived)
      }
      else {
        $sticky.removeClass(actived)
      }
    })
  })
});











/**
 * FORM ACCEPTANCE
 * Thiết lập nút submit disable khi chưa chọn checkbox-điều kiện
 * 
 * ** Cách thiết lập **
 * Thêm class `.form-require-confirm` vào parent input checkbox cần xác nhận
 */
(function($) {
  $(document).on('ready', function() {
    var $formCF7 = $('.wpcf7-form');
    var $inputConfirm = $('.form-require-confirm input');
    var $inputSubmit = $('.wpcf7-submit, .form-submit a');
    var ToggleSubmitDisable = function() {
      if( $inputConfirm.is(':checked') ) {
        $inputSubmit.removeAttr('disabled');
      }
      else {
        $inputSubmit.attr('disabled', 'disabled');
      }
    };

    // Condition
    if( !($formCF7.length && $inputConfirm.length && $inputSubmit.length) ) return;

    // Event Checkbox Confirm
    $inputConfirm.on('change', function() {
      ToggleSubmitDisable();
    });

    // Initial do first
    ToggleSubmitDisable();
  });
})(jQuery);










/**
 * OWL CAROUSEL
 */
(function($) {
  $(document).on('ready', function() {

    var options = {
      // margin: 20,
      nav: true,
      navText: ['<i class="icon-arrow-back"></i>', '<i class="icon-arrow"></i>'],
      dots: true,
      dotsEach: false,
      responsive: {
        0 : {
          margin: 10
        },
        768 : {
          margin: 20
        }
      }
    };
    $('.owl-carousel').each(function() {
      var $owl = $(this);
      var optsCur = {};
      var dataOptions = $owl.data('carousel');

      // Merch options
      if( !$.isPlainObject(dataOptions) ) {
        dataOptions = {};
      }
      optsCur = $.extend({}, options, dataOptions);
      $owl.owlCarousel(optsCur);
    });


    // SETUP OWL NAVIGATION FULLWIDTH
    var $navFullwidth = $('.nav-fullwidth .owl-nav');
    $navFullwidth.each(function() {
      var $nav = $(this);
      var posOffset, left, timer, widthBody;
      var UpdateLeft = function() {
        posOffset = $nav.offset();
        widthBody = $('body').innerWidth();
        left = Math.ceil(posOffset.left);
        $nav.css({ left: -left, width: widthBody });
      };

      // Cập nhập vị trí Nav mới
      UpdateLeft();
      $(window).on('resize', function() {
        $nav.css({ left: '', width: '' }); // Reset gía trị Left
        clearTimeout(timer);
        timer = setTimeout(UpdateLeft, 200);
      });
    });
  });
})(jQuery);











/**
 * MODAL SLIDE
 */
(function($) {
  $(document).on('ready', function() {
    var $modalCanvas = $('.modal-canvas');
    var current = 'slide-current';
    var $body = $('body');
    var $modalSearchDetail = $('#search-detail');
    var show = 'search-detail-show';
    

    /** MODAL SEARCH DETAIL: AUTOSHOW + EVENTS */
    if( $modalSearchDetail.length ) {
      // Modal Autoshow
      // $modalSearchDetail.modal().show();

      // Modal Events
      $modalSearchDetail.on('show.bs.modal', function(e) {
        $body.addClass(show)
      })
      $modalSearchDetail.on('hide.bs.modal', function(e) {
        $body.removeClass(show)
        
        // Search Detail: loại bỏ hết class curent trên Slide
        var $modalSlides = $modalSearchDetail.find('.modal-slide');
        var $slideHome = $modalSearchDetail.find('.modal-slide.slide-home');

        $modalSlides.removeClass(current)
        $slideHome.addClass(current)
      })
    }


    /** MODAL SLIDE EVENT */
    $modalCanvas.each(function() {
      var $canvas = $(this);
      var $btnGoto = $('[data-modal-slide]');
      var $btnBack = $canvas.find('.btn-back');
      var $modalSlides = $canvas.find('.modal-slide');
      var $slideHome = $canvas.find('.modal-slide.slide-home');

      /** EVENT TRÊN BUTTON GOTO SLIDE */
      $btnGoto.on('click', function(e) {
        var $btn = $(this);
        var modalSlide = $btn.data('modal-slide');
        var $slideTarget = $(modalSlide);

        // Điều kiện để tiếp tục
        if( !$slideTarget.length ) return;

        // Toggle class 'current'
        $modalSlides.removeClass(current);
        $slideTarget.addClass(current);
        return false;
      })


      /** EVENT TRÊN BUTTON BACK */
      $btnBack.on('click', function(e) {
        // Toggle class 'current' --> quay lại "slide-home"
        $modalSlides.removeClass(current);
        $slideHome.addClass(current);
        return false;
      })
    })
  })
})(jQuery);










/**
 * FORM ELEMENT CLONE
 */
(function($) {
  $(document).on('ready', function() {
    var $selectClone = $('[data-select-clone-to]');
    var $checkboxClone = $('[data-checkbox-clone-to]');
    var selected = 'selected';
    var checked = 'checked';
    var hidden = 'hidden';

    /** RENDER SELECT ELEMENTS */
    $selectClone.each(function() {
      var $select = $(this);
      var $options = $select.find('option');
      var target = $select.data('select-clone-to');
      var $cloneTo = $(target);
      var $backTo = $('[data-select-clone-back="%s"]'.replace('%s', target));
      var $ul = $('<ul></ul>');
      var $li = $();

      // Điều kiện tiếp tục thực hiện
      if( !$cloneTo.length ) return;

      // Render đối tượng <li> tương ứng với <option>
      $options.each(function(index) {
        var $option = $(this);
        var optionVal = $option.val();
        var optionText = $option.text();
        var $liClone = $('<li></li>', { "data-value": optionVal, "text": optionText });
        
        // Trường hợp <option> selected
        if ($option.is(':selected')) {
          $liClone.addClass(selected)
        }
        $li = $li.add($liClone)

        // EVENT TAP TRÊN <LI>
        $liClone.on('click', function() {
          $select.val(optionVal)
          $li.removeClass(selected)
          $liClone.addClass(selected)
          
          // Thay đổi text trên $backTo
          if ($backTo.length) {
            $backTo.html(optionText)
          }
        })
      })

      // Chèn vào DOM
      $li.appendTo($ul)
      $ul.appendTo($cloneTo)

      // EVENT CHANGE TRÊN SELECT
      $select.on('change', function() {
        var selectVal = $select.val();
        var $liSelected = $ul.find('[data-value="' + selectVal + '"]');

        // Toggle class trên <li> selected
        $li.removeClass(selected)
        $liSelected.addClass(selected)
      })
    })

    /** RENDER CHECKBOX ELEMENTS */
    $checkboxClone.each(function() {
      var $wrap = $(this);
      var $inputs = $wrap.find('input[type="checkbox"]');
      var target = $wrap.data('checkbox-clone-to');
      var $cloneTo = $(target);
      var $backTo = $( '[data-checkbox-clone-back="%s"]'.replace('%s', target) );
      var $ul = $('<ul></ul>');
      var $li = $();
      var $liBacks = $();

      // Điều kiện tiếp tục thực hiện
      if( !$cloneTo.length ) return;

      // Render đối tượng <li> tương ứng với <input>
      $inputs.each(function(index) {
        var $input = $(this);
        var inputID = $input.prop('id');
        var inputName = $input.prop('name');
        var $label = $wrap.find('label[for="' + inputID + '"]');
        var labelText = $label.length ? $label.text() : '';
        var $liClone = $('<li><a href="#">%s</a></li>'.replace('%s', labelText), { "data-name": inputName });
        var $liBack = $('<li class="hidden"><a class="btn-clear" href="#">X</a><span>%s</span></li>'.replace('%s', labelText));
        var $aClone = $liClone.find('a');
        var $aBack = $liBack.find('a');

        // Trường hợp <input> checked
        if (this.checked) {
          $liClone.addClass(checked)
          $liBack.removeClass(hidden)
        }
        $li = $li.add($liClone)
        $liBacks = $liBacks.add($liBack)
        

        // EVENT TAP TRÊN <A> CLONE
        $aClone.on('click', function(e) {
          if ($liClone.hasClass(checked)) {
            $liClone.removeClass(checked)
            $liBack.addClass(hidden);
          }
          else {
            $liClone.addClass(checked)
            $liBack.removeClass(hidden)
          }
        })

        // EVENT TAP TRÊN <A> BACK
        $aBack.on('click', function(e) {
          $liClone.removeClass(checked)
          $liBack.addClass(hidden)
          return false;
        })
      })

      // Chèn vào DOM
      $li.appendTo($ul);
      $ul.appendTo($cloneTo);
      if ($backTo.length) {
        $liBacks.appendTo($backTo)
      }
    })


    /** SETUP CHECK ACCORDION */
    // var $checkboxAccordion = $('.checkbox-accordion');
    // $checkboxAccordion.each(function() {
    //   var $this = $(this);
    //   var $btnCollapse = $this.find('[data-toggle="collapse"]');
    //   var $liCheckbox = $btnCollapse.closest('li');
      
    //   $btnCollapse.each(function() {
    //     var $btn = $(this);
    //     var $li = $btn.closest('li');

    //     // EVENT TRÊN BUTTON COLLAPSE
    //     $btn.on('click', function() {
    //       if ($btn.attr('aria-expanded')) {
    //         console.log(false);
    //       }
    //       else {
    //         // $liCheckbox.not($li).removeClass(checked)
    //       }
    //     })
    //   })
    // })


    /** SETUP CHECKBOX ITEM FOR <LI> */
    var $checkboxList = $('.checkbox-li');
    $checkboxList.each(function() {
      var $li = $(this);
      var $aLink = $li.find('> a');

      if (!$aLink.length) return;

      // EVENT TAP TRÊN <A> LINK
      $aLink.on('click', function(e) {
        if ($li.hasClass(checked)) {
          $li.removeClass(checked)
        }
        else {
          $li.addClass(checked)
        }
      })
    })


    /** SETUP CHECKBOX ALL */
    var $checkboxAll = $('.checkbox-li-all');
    $checkboxAll.each(function() {
      var $checkParent = $(this);
      var $aParent = $checkParent.find('> a');
      var $checkChild = $checkParent.find('.checkbox-li');

      $aParent.on('click', function() {
        if ($checkParent.hasClass(checked)) {
          $checkChild.removeClass(checked);
        }
      })
    })
  })
})(jQuery);












/**
 * RANGE SLDIER
 */

(function($) {
  var $range = $('input[type="range"]');
  if(!$range.length){
    return;
  }

  $range.css("pointer-events","none");
  $range.css("disabled","disabled");
  $range.rangeslider({

    // Feature detection the default is `true`.
    // Set this to `false` if you want to use
    // the polyfill also in Browsers which support
    // the native <input type="range"> element.
    polyfill: false,

    // Default CSS classes
    rangeClass: 'rangeslider',
    disabledClass: 'rangeslider--disabled',
    horizontalClass: 'rangeslider--horizontal',
    verticalClass: 'rangeslider--vertical',
    fillClass: 'rangeslider__fill',
    handleClass: 'rangeslider__handle',

    onInit : function() {
      this.output = $( '<div class="range-output" />' ).insertAfter( this.$range ).html( this.$element.val() );

      var $ruler = $('<div class="rangeslider__ruler" />');
      $ruler[0].innerHTML = getRulerRange(this.min, this.max, 1);
      this.$range.prepend($ruler);
    },

    // onSlide : function( position, value ) {
    //   this.output.html( value );
    // }
  });


  function getRulerRange(min, max, step) {
    var range = '';
    var i = 0;
    while (i <= max) {
      range += '<span>'+i+'</span>' + ' ';
      i = i + step;
    }
    return range;
  }
})(jQuery);












/**
 * PAGE 6-4
 * CHECKBOX & CHECKED ALL
 */
(function($) {

  var $checkAll = $('.checkbox-wrap .check-all');
  $(document).on('ready', function() {

    var $chilrenCheckbox = $checkAll.data('check-all-for');
    var $checkboxChildren = $($chilrenCheckbox);

    $checkboxChildren.each(function () {
      var $checkbox = $(this);

      $checkbox.on('change',function() {
        var $checkboxWrap = $(this).closest('.checkbox-wrap');

        if( $checkboxWrap.length ) {
          if( $checkboxWrap.hasClass('checked') ) {
            $checkboxWrap.removeClass('checked')
          }
          else {
            $checkboxWrap.addClass("checked");
          }

          // Kiểm tra nếu nút checkall nếu đã check thì sẽ remove checked ra khi có 1 phần tử con tắt checked
          if( $checkAll.find('input').length ) {
            $checkAll.find('input').prop('checked', false);
          }
        }
      });
    });

    if( $checkAll.length ) {
      var $inputCheckAll = $checkAll.find('input');

      if( !$inputCheckAll.length ) return;

      $inputCheckAll.on('change', function (e) {
        var $checkboxWrap = $checkboxChildren.closest('.checkbox-wrap');

        if( this.checked ) {
          $checkboxChildren.prop('checked', true);
          $checkboxWrap.addClass("checked");
        }
        else {
          $checkboxChildren.prop('checked', false);
          $checkboxWrap.removeClass('checked')
        }
      })
    }

  })
})(jQuery);










/**
 * FORM VALIDATION
 */
(function ($) {
$(document).on('ready', function() {
  var $formValidates = $('.form-validate');
  var btnDisabled = 'btn-disabled';

  $formValidates.each(function() {
    var $form = $(this);
    var $inputRequired = $form.find('input:required');
    var $fieldSubmit = $form.find('.field-submit');


    // Kiểm tra lúc ban đầu
    toggleSubmit()

    /** EVENT INPUT CHANGE */
    $inputRequired.on('input', function() {
      toggleSubmit()
    })
    $inputRequired.on('focus', function() {
      toggleSubmit()
    })
    
    /** FUNCTION KIỂM TRA */
    function checkRequired() {
      var isValidCheck = true;
      // Kiểm tra từng input required
      $inputRequired.each(function() {
        var value = $(this).val();

        if ( !!isValidCheck ) {
          if ( /^\s*$/.test(value) ) {
            isValidCheck = false;
          }
        }
      })
      // Tra về kết quả
      return isValidCheck;
    }

    // Toggle class trên Button Submit
    function toggleSubmit() {
      var isValid = checkRequired();
      if ($fieldSubmit.length) {
        var $btn = $fieldSubmit.find('.btn');
        if (isValid) {
          $btn.removeClass(btnDisabled);
        }
        else {
          $btn.addClass(btnDisabled);
        }
      }
    }
  })
}) 
})(jQuery);










/**
 * IMAGE RESPONSIVE
 * + Thay đổi `width` của <img> tag, xuống mobile sẽ có width khác
 * + Hỗ trợ thay đổi kích thước image bắt đàu breakpoint với thuộc tính `data-width-breakpoint()`
 */
(function ($) {
  $(document).on('ready', function() {
    var $widthSP = $('[data-width-sp]');
  
    // Vị trí thay đổi width
    var aBreakpoint = {
      'xs': 578,
      'sm': 767,
      'md': 991,
      'lg': 1199
    };
    var breakpointSizeDefault = 'sm';
    var actived = 'img-res-actived';
  
    $widthSP.each(function() {
      var $img = $(this);
      var widthSP = $img.data('width-sp');
      var widthInit = $img.attr('width');
      var dataBreakpoint = $img.data('width-breakpoint');
      var breakpoint;
      var t;
  
      // Setup <img> width lúc ban đầu
      UpdateWidth()
      $img.addClass(actived)
  
      // Event Window Resize
      $(window).on('resize', function() {
        // clearTimeout(t);
        // t = setTimeout(UpdateWidth, 100)
        UpdateWidth()
      })
  
      // Function thay đổi `width` của <img> tag
      function UpdateWidth() {
  
        // Setup breakpoint
        if (/^(xs|sm|md|lg)$/.test(dataBreakpoint)) {
          breakpoint = aBreakpoint[dataBreakpoint];
        }
        else if ($.isNumeric(dataBreakpoint)) {
          breakpoint = dataBreakpoint;
        }
        else {
          breakpoint = aBreakpoint[breakpointSizeDefault];
        }
  
        // Setup Width
        var wWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if ( wWindow <= breakpoint ) {
          var widhtCur = $img.prop('width');
          if (widhtCur !== widthSP) {
            $img.attr('width', widthSP)
          }
        }
        // Phục hồi thuộc tính `width` của <img> tag
        else {
          if (widthInit === undefined) {
            $img.removeAttr('width')
          }
          else if ( /^\s*$/.test(widthInit) ) {
            $img.attr('width', '')
          }
          else {
            $img.attr('width', widthInit)
          }
        }
      }
    })
  })
  })(jQuery);











/**
 * SETUP SECTION MAIN MIN-HEIGHT
 * Quan trọng thiết lập thuộc tính `min-height` trên ID #main
 * Hỗ trợ resize sẽ tính toán lại thuộc tính `min-height`
 */
(function ($) {
  $(document).on('ready', function() {
    var $main = $('#main');
    var chenhlechPixel = 1;
  
    // Điều kiện thực hiện
    if (!$main.length) return;
  
  
    /** EVENT RESIZE */
    // Kiểm tra lúc ban đầu
    kiemtraHChenhlech()
  
    var timer;
    $(window).resize(function() {
      clearTimeout(timer)
      timer = setTimeout(kiemtraHChenhlech, 200)
    })
    
  
  
    /** FUNCTION */
    function kiemtraHChenhlech() {
  
      // Đầu tiên loại bỏ thuộc tính `min-height` trên ID main
      // Để cho tất cả đối tượng reset lại kích thước
      $main.css('min-height', '')
  
      // Lấy chiều cao đối tượng có ID #main
      // Chiều cao này là chiều cao tối thiểu của ID #main
      setTimeout(function() {
        var mainHeight = Math.floor( $main.outerHeight(true) );
  
        // Tính toán sự chênh lệnh giữa chiều cao toàn bộ HTML với chiều cao trình duyệt
        var hWindow = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var htmlHeight = $('html, body').outerHeight(true);
        var hChenhlech = hWindow - htmlHeight - chenhlechPixel;
  
        // console.log("#1", hWindow, htmlHeight, chenhlechPixel);
        // console.log("#2", mainHeight, hChenhlech);

        // Thiết lập chiều cao tối thiểu cho #main
        // Thêm vào class `main-align-items-center` -> đối tượng center bên trong flexbox
        if (hChenhlech > 1) {
          $main.css('min-height', mainHeight + hChenhlech)
          $main.addClass('main-align-items-center')
        }
      }, 50);
    }
  })
  })(jQuery);











/**
 * SECTION WITH POSITION FIXED WHEN SCROLL
 * Hỗ trợ header khi scroll sẽ ở vị trí fixed
 * Thêm class `scroll-fixed` vào header.
 * Phần Scroll Inner sẽ là element chuyển đổi vị trí `position` chính
 * Thêm class `.scroll-inner` element bên dưới để tính toán vị trí
 * Hỗ trợ element holder để giữ vị trí chiều cao giống header --> hỗ trợ hiệu ứng mượt hơn
 * Thêm elemnt với class `.scroll-holder` để thiết lập holder
 * Thêm data `fixed-bottomin` để trở tới vị trí chỉ định, khi scroll tới ví trí đó thì header sẽ chuyển sang vị trí fixed
 */
(function ($) {
$(document).on('ready', function() {
  var $scrollFixed = $('.scroll-fixed');
  var actived = 'fixed-actived';
  var enabled = 'fixed-enabled';
  var inViewport = 'fixed-in-viewport';
  var hChenhlenh = 10;

  $scrollFixed.each(function() {
    var $fixed = $(this);
    var targetBottomIn = $fixed.data('fixed-bottomin');
    var targetBottomOut = $fixed.data('fixed-bottomout');
    var $targetBottomIn = $(targetBottomIn);
    var $targetBottomOut = $(targetBottomOut);


    // THỰC HIỆN LÚC BAN ĐẦU
    toggleActiveWhenGotoTarget($fixed, 'fixed-bottomin')
    toggleActiveWhenGotoTarget($fixed, 'fixed-bottomout')

    // THIẾT LẬP EVENT SCROLL
    $(document).on('scroll', function(e) {
      toggleActiveWhenGotoTarget($fixed, 'fixed-bottomin')
      toggleActiveWhenGotoTarget($fixed, 'fixed-bottomout')
    })

    // THIẾT LẬP EVENT RESIZE
    var timer2;
    $(window).resize(function() {
      clearTimeout(timer2)
      timer2 = setTimeout(function() {
        toggleActiveWhenGotoTarget($fixed, 'fixed-bottomin')
        toggleActiveWhenGotoTarget($fixed, 'fixed-bottomout')
      }, 200)
    })
    

    /**
     * FUNCTION THIẾT LẬP CHÍNH
     */
    function toggleActiveWhenGotoTarget($fixed, dataTarget) {
      var $inner = $fixed.find('.scroll-inner');
      var $holder = $fixed.find('.scroll-holder');
      var target = $fixed.data(dataTarget);
      var $target = $(target);

      // Điều kiện thực hiện
      if ( !($inner.length && $target.length) ) return
      // Setup chiều cao cho $holder
      $fixed.addClass(enabled)
      $holder.css('min-height', $inner.innerHeight())


      // Tiếp tục thiết lập
      var rectFixed = $fixed[0].getBoundingClientRect();
      var rectTarget = $target[0].getBoundingClientRect();
      var rectInner = $inner[0].getBoundingClientRect();
      var hWin = $(window).height();
      var fixedTopInViewport = Math.round(rectFixed.top - hWin);

      /**
       * CLASS `ACTIVED`
       * Thêm class `actived` vào $scroll khi vượt qua đối tượng $target
       */
      var boundaryToShow;
      if (dataTarget == 'fixed-bottomin') {
        boundaryToShow = Math.round(rectTarget.bottom - hWin);
      }
      else if (dataTarget == 'fixed-bottomout') {
        boundaryToShow = Math.round(rectTarget.bottom);
      }
      
      // So sánh
      if (boundaryToShow < 0) {
        $fixed.addClass(actived)
      }
      else {
        $fixed.removeClass(actived)
      }


      /**
       * PHỤC HỒI VỊ TRÍ
       * Khi $fixed trong Viewport thì phục hồi vị trí
       */
      if (fixedTopInViewport < 0 && rectFixed.bottom > 0) {
        $fixed.addClass(inViewport)
      }
      else {
        $fixed.removeClass(inViewport)
      }

      // Cập nhật lại kích thước của holder
      if ($holder.length) {
        $holder.css('min-height', Math.round(rectInner.height))
      }
    }
    

    /**
     * TARGET BOTTOM IN
     */
    // if ($inner.length && $targetBottomIn.length) {

    //   // Setup chiều cao cho $holder
    //   $holder.css('min-height', $inner.innerHeight())

    //   // Thực hiện lúc ban đầu
    //   ToggleWhenBottomIn()

    //   // Setup Event Scroll
    //   $(document).on('scroll', function(e) {
    //     ToggleWhenBottomIn()
    //   })

    //   function ToggleWhenBottomIn() {
    //     var $target = $targetBottomIn;
    //     var rectFixed = $fixed[0].getBoundingClientRect();
    //     var rectTarget = $target[0].getBoundingClientRect();
    //     var rectInner = $inner[0].getBoundingClientRect();
    //     var hWin = $(window).height();
    //     var boundaryToShow = Math.round(rectTarget.bottom - hWin);
    //     var fixedTopInViewport = Math.round(rectFixed.top - hWin);

        
    //     // Thêm class `actived` vào $scroll khi vượt qua đối tượng $target
    //     if (boundaryToShow < 0) {
    //       $fixed.addClass(actived)
    //     }
    //     else {
    //       $fixed.removeClass(actived)
    //     }

    //     // Khi $fixed trong Viewport thì phục hồi vị trí
    //     if (fixedTopInViewport < 0 && rectFixed.bottom > 0) {
    //       $fixed.addClass(inViewport)
    //     }
    //     else {
    //       $fixed.removeClass(inViewport)
    //     }

    //     // Cập nhật lại kích thước của holder
    //     if ($holder.length) {
    //       $holder.css('min-height', Math.round(rectInner.height))
    //     }
    //   }
    // }


    
    /**
     * TARGET BOTTOM OUT
     */
    // if ($inner.length && $targetBottomOut.length) {

    //   // Setup chiều cao cho $holder
    //   $holder.css('min-height', $inner.innerHeight())

    //   //  Thực hiện lúc ban đầu
    //   ToggleWhenBottomOut()

    //   // Setup Event Scroll
    //   $(document).on('scroll', function(e) {
    //     ToggleWhenBottomOut()
    //   })

    //   function ToggleWhenBottomOut() {
    //     var $target = $targetBottomOut;
    //     var rectFixed = $fixed[0].getBoundingClientRect();
    //     var rectTarget = $target[0].getBoundingClientRect();
    //     var rectInner = $inner[0].getBoundingClientRect();
    //     var hWin = $(window).height();
    //     var boundaryToShow = Math.round(rectTarget.bottom);
    //     var fixedTopInViewport = Math.round(rectFixed.top - hWin);
        
    //     // Thêm class `actived` vào $scroll khi vượt qua đối tượng $target
    //     if (boundaryToShow < 0) {
    //       $fixed.addClass(actived)
    //     }
    //     else {
    //       $fixed.removeClass(actived)
    //     }

    //     // Khi $fixed trong Viewport thì phục hồi vị trí
    //     if (fixedTopInViewport < 0 && rectFixed.bottom > 0) {
    //       $fixed.addClass(inViewport)
    //     }
    //     else {
    //       $fixed.removeClass(inViewport)
    //     }

    //     // Cập nhật lại kích thước của holder
    //     if ($holder.length) {
    //       $holder.css('min-height', Math.round(rectInner.height))
    //     }
    //   }
    // }
  })
})
})(jQuery);











/**
 * VỊ TRÍ CENTER CHO VIDEO MV TOP
 * Thiết lập vị trí center video cho MV
 * Thiết lập kích thước fullscreen cho section, hỗ trợ loại trừ các kích thước header bằng `data-fullscreen-exclude`
 * Hỗ trợ @media responsive(min-width) cho kích thước Background bằng `data-fullscreen-media`
 * Hỗ trợ @media responsive(min-width) cho kích thước Section bằng `data-fullscreen-exclude-media`
 * Khi không có @media thì sẽ thiết lập bình thường
 */
(function ($) {
  var $videoFullscreen = $('.bg-cover');


  $(document).on('ready', function() {
    SectionFullscreen()
    MVHeight()

    var timer;
    $( window ).resize(function() {
      clearTimeout(timer)
      timer = setTimeout(function() {
        SectionFullscreen()
        MVHeight()
      }, 200)
    })
  })

  // Thiết lập lại kích thước khi loaded nội dung
  $(window).on('load', function() {
    if ($videoFullscreen.length) {
      $videoFullscreen.css({ "opacity": 1 })
    }
    
    SectionFullscreen()
    MVHeight()
  })


  /**
   * THIẾT LẬP KÍCH THƯỚC FULLSCREEN CHO SECTION
   */
  function SectionFullscreen() {
    var $exclude = $($videoFullscreen.data('fullscreen-exclude') );
    var dataMedia = $videoFullscreen.data('fullscreen-exclude-media');
    var wWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var hWindow = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var hExclude = 0;

    /**
     * THIẾT LẬP `DATA-MEDIA` RESPONSIVE
     * Phân biệt các trường hợp
     * `thiet_lap`: Thiết lập section full-height
     * `reset`: Reset lại <section> tag
     */
    if (dataMedia != undefined) {
      if (wWindow >= dataMedia) {
        type = "thiet_lap"
      }
      else {
        type = "reset"
      }
    }
    else {
      type = "reset"
    }


    /**
     * THIẾT LẬP KÍCH THƯỚC CHO SECTION
     */
    if (type == 'thiet_lap') {
      // Tính toán chiều cao cần phải loại trừ
      $exclude.each(function(index) {
        var $ex = $(this);
        hExclude += $ex.outerHeight();
      })

      var hSection = Math.round(hWindow - hExclude);
      $videoFullscreen.css('height', hSection)
    }
    else if (type == 'reset') {
      $videoFullscreen.css('height', '')
    }
  }


  /**
   * THIẾT LẬP KÍCH THƯỚC MV
   */
  function MVHeight() {
    var $videos = $videoFullscreen.find('.video');

    /** ĐIỀU KIỆN THỰC HIỆN */
    if (!$videos.length) return;


    /**
     * SETUP VỊ TRÍ VIDEO THEO TỶ LỆ
     * Hỗ trợ thiết lập nhiều videos cùng lúc
     * Lấy kích thước Video bằng bằng PHP trước -> tạo 2 biến `data-width` và `data-height`
     * Nếu tỷ lệ Wrap lớn hơn tỷ lệ Video --> width_video = 100%
     * Nếu tỷ lệ Wrap nhỏ hơn tỷ lệ Video --> height_video = 100%
     */
    $videos.each(function() {
      var $video = $(this);
      var wVideo = $video[0].videoWidth || $video.data('width');
      var hVideo = $video[0].videoHeight || $video.data('height');
      var rateVideo = wVideo / hVideo;
      var rectWrap = $videoFullscreen[0].getBoundingClientRect();
      var rateWrap = rectWrap.width / rectWrap.height;
      var hWrapVideo = $videoFullscreen.outerHeight();
      // var dataMedia = $video.parent().data('fullscreen-media');
      var dataMedia = $videoFullscreen.data('fullscreen-media');
      var wWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var type = false;

      // Điều kiện thực hiện
      // Style css khác với `none`
      if ($video.css("display") == "none") return;


      /**
       * THIẾT LẬP `DATA-MEDIA` RESPONSIVE
       * Phân biệt các trường hợp
       * `thiet_lap`: Thiết lập video full-height
       * `reset`: Reset lại <video> tag
       */
      if (dataMedia != undefined) {
        if (wWindow >= dataMedia) {
          type = "thiet_lap"
        }
        else {
          type = "reset"
        }
      }
      else {
        type = "thiet_lap"
      }



      /**
       * THIẾT LẬP KÍCH THƯỚC CHO VIDEO CHO FULL HEIGHT
       */
      if (type == "thiet_lap") {
        if (rateWrap >= rateVideo) {
          // Thiết lập kích thước video fullheight
          $video.css({
            "width": "100%",
            "height": "auto"
          })

          // Thiết lập vị trí center video
          setTimeout(function() {
            var topVideo = Math.round(($video.outerHeight() - hWrapVideo) / 2);
            $video.css({
              "marginLeft": "",
              "marginTop": -topVideo
            })
          }, 50)
        }
        else {
          // Thiết lập kích thước video fullheight
          $video.css({
            "width": "auto",
            "height": "100%"
          })

          // Thiết lập vị trí center video
          setTimeout(function() {
            var leftVideo = Math.round( ($video.outerWidth() - $(window).width()) / 2 );
            $video.css({
              "marginLeft": -leftVideo,
              "marginTop": ""
            })
          }, 50)
        }
      }
      else if (type == "reset") {
        $video.css({
          "marginLeft": "",
          "marginTop": "",
          "width": "100%",
          "height": "auto"
        })
      }
    })
  }
})(jQuery);










/**
 * HIỆU ỨNG SCROLL TRÊN MAIN VISUAL (SECTION)
 * Trường hợp Section ở vị trí TOP ngay lúc ban đầu
    Lấy thông số qua hàm `getBoundingClientRect()` --> vị trí top/bottom
    So sánh vị trí bottom của Section, nếu vượt quá 0 thì tiến trình được 100%
 */
(function ($) {
$(document).on('ready', function() {
  // return false;

  var $videoFullscreen = $(".bg-parallax");
  var $video = $videoFullscreen.find(".video");
  var go;

  // Điều kiện tiếp tục
  if (!$video.length) return;

  // Setup Tween Animation
  var tween = new RubyTween();
  tween.css($video, { opacity: 1, scale: 1 })
  tween.animate($video, { opacity: 0.1, scale: 1.2 }, {
    duration: 1000
  }, false);
  

  /**
   * EVENT SCROLL
   */
  MVTweenEffect()
  $(window).on('scroll', function() {
    MVTweenEffect()
  })

  // Function
  function MVTweenEffect() {
    var rectWrap = $videoFullscreen[0].getBoundingClientRect();

    // Tính tỉ lệ phần trăm Wrap Video di chuyển so với window
    if (rectWrap.top < 0) {
      if (rectWrap.bottom > 0) {
        go = (-rectWrap.top) / rectWrap.height * 100;
      }
      else {
        go = 100;
      }
    }
    else {
      go = 0;
    }

    // Di chuyển hiệu ứng theo tỉ lệ %
    tween.go(go)
  }
})
})(jQuery);










/**
 * FLEX LINE BREAK
 * Chèn thêm vào trước nó 1 đối tượng --> setup đối tượng mới với width 100%
 */
(function ($) {
$(document).on('ready', function() {
  $(".flex-line-break").each(function() {
    // Chèn vào đối tượng mới đứng trước nó
    var $li = $("<li></li>", { "class": "br-flex" })
    $(this).before($li);
  })

  $(".flex-line-break-sm").each(function() {
    // Chèn vào đối tượng mới đứng trước nó
    var $li = $("<li></li>", { "class": "br-flex-sm" })
    $(this).before($li);
  })

  $(".flex-line-break-md").each(function() {
    // Chèn vào đối tượng mới đứng trước nó
    var $li = $("<li></li>", { "class": "br-flex-md" })
    $(this).before($li);
  })
})
})(jQuery);











/**
 * THÊM HIỆU ỨNG TRÊN TỪNG NỘI DUNG CỦA SINGLE PAGE
 * Setup node element phù hợp với hiệu ứng Scroll Animation bên dưới
 */
// (function ($) {
// $(document).on("ready", function() {
//   var $singleText = $(".section-single .content-txt");
//   var classAnimName = "scroll-fx";
//   var classAnimHolder = "fx-holder";

//   $singleText.each(function() {
//     var $this = $(this);
//     var $items = $this.find("> *");

//     $items.each(function() {
//       var $item = $(this);

//       // Thêm class vào $item
//       // Wrapper đổi tượng $item bằng `div`
//       if (!$item.hasClass(classAnimName)) {
//         $item.addClass(classAnimHolder)
//         $item.wrap("<div class='scroll-fx'></div>")
//       }
//     })
//   })
// })
// })(jQuery);










/**
 * HIỆU ỨNG SECTION ANIMATION KHI SCROLL
 * Scroll từ trên xuống dưới, section di chuyển tới 1/4 window thì bắt đầu xuất hiện
 * Thêm class `.scroll-fx` vào section muốn có hiệu ứng
 * Thêm class `.fx-holder` để chỉ định hiệu ứng xảy ra trên element
 * Mặc định hiệu ứng là `fade`
 * Hỗ trợ hiệu ứng với `data-scroll-fx` trực tiếp trên section
 * Hỗ trợ thời gian delay random với thuộc tính `data-random-delay` trực tiếp trên section
 */
(function ($) {
$(document).on("ready", function() {
  var $animations = $(".scroll-fx");
  var actived = "animation-actived";

  $animations.each(function() {
    var $anim = $(this);
    var $holder = $anim.find('.fx-holder');
    var delayRandom = $anim.data("delay-random") || false;
    var isActived = false;
    var isDelaying = false;

    // Điều kiện thực hiện
    if (!$holder.length) return;
    
    /** EVENT SCROLL */
    scrollCheckAcitved(); 
    $(window).on("scroll", function() {
      scrollCheckAcitved();
    })

    /** FUNCTION CHECK ACTIVED */
    function scrollCheckAcitved() {
      var rectAnim = $anim[0].getBoundingClientRect();
      var hWin = $(window).height();
      var yToStart = Math.round(hWin / 3 * 2); // Vị trí bắt đầu xuất hiện section

      // Chỉ addClass 1 lần cho Section
      // Hỗ trợ random thời gian delay
      // Biến `isDelaying`: đang chờ setTimeout, không thực hiện hàm `scrollActived` nữa
      if (!isActived && !isDelaying) {
        if (rectAnim.top < yToStart) {
          
          if (delayRandom != false) {
            var delay = Math.round(Math.random() * delayRandom);

            isDelaying = true;
            setTimeout(scrollActived, delay);
          }
          else {
            scrollActived()
          }
        }
      }
    }

    function scrollActived() {
      $anim.addClass(actived);
      isActived = true;
    }
  })
})
})(jQuery);












/**
 * SCROLL TO ANCHOR LINK
 * - Hỗ trợ di chuyển lúc ban đầu khi trên đường dẫn HTTP
 * - Hỗ trợ di chuyển tới vị trí cụ thể (Number) và di chuyển tới vị trí của ID/Class Node
 * - Hỗ trợ Header Bar (vị trí fixed) : sẽ trừ đi chiều cao để thấy được trọn vẹn vùng target
 * - Hỗ trợ WPAdmin: sẽ trừ đi chiều cao của id "wpadminbar" nếu nó tồn tại
 * - Hỗ trợ phần chênh lệch với thuộc tính `data-goto-diff()`
 */
$(document).on('ready', function() {
  // return false;
  var $goAnchor = $('[data-goto-anchor]');
  var goDuration = 400;


  // Thiết lập di chuyển Anchor Link lúc ban đầu khi có ID trên đường link http
  setTimeout(thietlapDichuyenAnchorlinkBangHTTP, 200)


  // Thiết lập di chuyển tới Anchor Link trên các Link
  $goAnchor.each(function() {
    var $this = $(this);

    $this.on('click', function(e) {
      e.preventDefault()
      thietlapDichuyentoiAnchorLink($this);
    })
  })


  /**
   * FUNCTION THIẾT LẬP DI CHUYỂN TỚI ANCHOR LINK
   */
  function thietlapDichuyentoiAnchorLink($link, target) {
    var duration = $link.data('goto-duration') || goDuration;
    var diff = $link.data('goto-diff');
    var chenhlech = false;
    var type = false;
    var $target;

    // Thiết lập đối tượng target
    if (target == undefined) {
      target = $link.data('goto-anchor');
    }


    // Hỗ trợ [data-goto-anchor] là Number và ID/Class DOM
    if ($.isNumeric(target)) {
      type = 'vitri';
    }
    else if ( !/^\s*$/.test(target) ) {
      $target = $( target );
      if ($target.length) type = 'idClass';
    }

    // Điều kiện tiếp tục thực hiện
    if (!type) return;


    // Setup phần chêch lệch
    chenhlech = GetChenhLech(diff);
    var chenhlechHeader = GetChenhLechHeader();
    var chenhlechWPAdminbar = GetChenhLechWPAdminbar();

    // Setup phần vị trí cụ thể
    var vitriTarget = false;
    if (type == 'vitri') {
      vitriTarget = target
    }
    else if (type == 'idClass') {
      vitriTarget = $target.offset().top - chenhlechHeader - chenhlechWPAdminbar
    }

    // console.log("#1", $target, $target.offset().top, $target[0].getBoundingClientRect())
    if (vitriTarget !== false) {
      $([document.documentElement, document.body]).animate({
        scrollTop: vitriTarget - chenhlech + 1
      }, {
        duration: duration,

        // Đóng lại Menu khi click và Link
        start: function() {
          if (!!window.navMain) {
            window.navMain.pushOff()
          }
        },

        // Fixed phần chênh lệch không đúng vị trí sau khi di chuyển scrolling
        complete: function() {
          var chenhlechFinal = GetChenhLech(diff);
          if (chenhlechFinal != chenhlech) {

            $([document.documentElement, document.body]).animate({
              scrollTop: vitriTarget - chenhlechFinal + 1
            }, 100)
          }
        }
      })
    }
  }


  /**
   * THIẾT LẬP DI CHUYỂN TỚI ANDCHOR LINK TRÊN HTTP LÚC BAN ĐẦU
   */
  function thietlapDichuyenAnchorlinkBangHTTP() {
    var hrefHash = window.location.hash;
    if (hrefHash != "") {
      var $target = $(hrefHash);

      if ($target.length) {
        thietlapDichuyentoiAnchorLink($target, hrefHash)
      } 
    }
    return false
  }


  // Function setup phần chênh lệnh
  function GetChenhLech(diff) {
    if ($.isNumeric(diff)) {
      return parseInt(diff)
    }
    else if (/^\.|#/.test(diff)) {
      return $(diff).outerHeight();
    }
    return 0;
  }

  // Thiết lập chênh lệch Header Fixed
  // Chỉ thiết lập chênh lệch khi phần Header ở vị trí "fixed"
  function GetChenhLechHeader() {
    var $header = $(".site-branding.scroll-inner");
    var hHeader = $header.outerHeight();
    
    // if ($header.css('position') == 'fixed') {
    if ($header.length) {
      return hHeader;
    }
    return 0;
  }

  // Thiết lập chênh lệch WP AdminBar
  function GetChenhLechWPAdminbar() {
    var $wpAdminBar = $("#wpadminbar");
    var hAdminbar = $wpAdminBar.outerHeight();
    
    // if ($header.css('position') == 'fixed') {
    if ($wpAdminBar.length) {
      return hAdminbar;
    }
    return 0;
  }
})
})(jQuery);











/**
 * RUBYBOX
 */
(function ($) {
  $(document).on('ready', function() {
    var rubybox = $('.rubybox').rubybox({
      'width'       : 1280,
      'height'      : 1,
      'margin'      : [20, 10, 20, 10],
      'isOverClose' : false
    });
  })
})(jQuery);











/**
 * IMAGE LAZYLOAD
 * Thiết lập hình ảnh lazyload, sử dụng plugin `lazyload.js` của tác giả `Andrea Verlicch`
 */
(function ($) {
  $(window).on('load', function() {
    var lazyLoadInstance = new LazyLoad({
      elements_selector: ".lazy"
    });
  })
})(jQuery);










/**
 * FACEBOOK MESSAGER + SHARE
 * Thiết lập facebook messanger load sau khi trang web loaded
 */
(function ($) {
  $(window).on('load', function() {

    /** 
     * FACEBOOK MESSAGER
     */
    setTimeout(insertScriptFacebookMessenger, 1000)
    function insertScriptFacebookMessenger() {
      window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v7.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }


    /**
     * FACEBOOK BUTTON SHARE
     */
    setTimeout(insertScriptFacebookShare, 1000)
    function insertScriptFacebookShare() {
      (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v7.0&appId=2089881564599252&autoLogAppEvents=1';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
  })
})(jQuery);
