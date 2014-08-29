/*!
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

/* global $: true */
;(function($) {
  'use strict';

  function hexToRgb(hex, opacity) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
  }
  // Main Blazer function, controll all options for the app here
  // function Blazur() {
  //   // google analytics key
  //   this._gaKey = '';
  //   this._contactEmail = 'work@blazurlabs.com';
  //   this._team = [];
  //   this._examples = [];
  // }

  // var blazur = new Blazur();
  $(document).ready(function() {
    var icon = $('.logo.ripple');
    var header = $('header');

    icon.on('click', function() {
      header.velocity('scroll', {duration: 1200, easing: 'srping'})
             .velocity({opacity: 1});
    });
    var colorHash = {
      'LI': 'd500f9',
      'DIV': 'aa00ff',
      default: '000000'
    };

    var links = $('.nav-link');
    var linksHash = {
      '#services': -50,
      '#contact': -70
    };
    links.on('click', function() {
      var link = $(this);
      var id = '#' + link.text().toLowerCase();
      var section = $(id);
      // section.css('opacity', 0.6);
      section.velocity('scroll', {duration: 1200, easing: 'srping', offset: linksHash[id]})
             .velocity({opacity: 1});

    });

    var ripples = $('.ripple');

    ripples.on('click', function(e) {
      var element = $(this);
      var type = element[0].tagName;
      var color = colorHash[type] || colorHash.default;

      function clean() {
        element.find('svg').remove();
      }

      function calcWidth() {
        return Math.sqrt(Math.pow(element.outerWidth(), 2) + Math.pow(element.outerHeight(), 2)).toFixed(2);
      }

      var x = e.pageX;
      var y = e.pageY;
      var clickY = y - element.offset().top;
      var clickX = x - element.offset().left;
      clean();

      var setX = parseInt(clickX);
      var setY = parseInt(clickY);

      element.append('<svg style="position: absolute;"><circle cx="'+setX+'" cy="'+setY+'" r="'+0+'"></circle></svg>');

      var circle = element.find('circle');
      circle.css({fill: hexToRgb(color, 0.3)});
      circle.velocity({r: calcWidth()}, 'easeOutSine', 500)
            .velocity('fadeOut', {duration: 500, complete: clean});
    });
  });

}($));
