(function () {
  'use strict';
  var dropDowns = document.querySelectorAll('.menu__dropdown');
  var aDropDowns = Array.prototype.slice.call(dropDowns, 0);
  var menu = document.getElementById('menu');
  var menuClose = document.getElementById('menu-close');
  var menuOpen = document.getElementById('menu-open');

  function hasClass(el, name) {
    return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
  }

  function toggleMenu (event) {
    if (!hasClass(menu, 'hidden')) {
      menu.classList.add('hidden');
      event.preventDefault();
    } else {
      menu.classList.remove('hidden');
    }
  }

  // Toggle the navigation menu
  menuClose.onclick = toggleMenu;
  menuOpen.onclick = toggleMenu;

  // Navigation tree
  aDropDowns.forEach(function (element) {
    var button = element.querySelector('a[data-toggle="dropdown"]');

    var menu = element.querySelector('.menu-sublist');

    var arrow = element.querySelector('i.icon-arrow');

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
