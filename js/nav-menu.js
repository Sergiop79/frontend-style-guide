(function () {
  'use strict';

  function hasClass(el, name) {
    return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
  }


  var dropDowns = document.querySelectorAll('.menu__dropdown');
  var aDropDowns = Array.prototype.slice.call(dropDowns, 0);

  aDropDowns.forEach(function (element) {
    var button = element.querySelector('a[data-toggle="dropdown"]');
    console.log(button);

    var menu = element.querySelector('.menu-sublist');

    var arrow = element.querySelector('i.icon-arrow');
    console.dir(menu);

    button.onclick = function (event) {
      if (!hasClass(menu, 'show')) {
        menu.classList.add('show');
        menu.classList.remove('hide');
        arrow.classList.add('open');
        arrow.classList.remove('close');
        event.preventDefault();
      } else {
        menu.classList.remove('show');
        menu.classList.add('hide');
        arrow.classList.remove('open');
        arrow.classList.add('close');
        event.preventDefault();
      }
    };

  });

}());
