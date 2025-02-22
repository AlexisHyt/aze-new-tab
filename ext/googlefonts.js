/*
 * Copyright 2016 Small Batch, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
/* Web Font Loader v1.6.26 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){// Input 0
  function $goog$bindNative_$$($fn$$, $selfObj$$1$$, $var_args$$32$$) {
    return $fn$$.call.apply($fn$$.bind, arguments);
  }
  function $goog$bindJs_$$($fn$$1$$, $selfObj$$2$$, $var_args$$33$$) {
    if (!$fn$$1$$) {
      throw Error();
    }
    if (2 < arguments.length) {
      var $boundArgs$$ = Array.prototype.slice.call(arguments, 2);
      return function() {
        var $newArgs$$ = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply($newArgs$$, $boundArgs$$);
        return $fn$$1$$.apply($selfObj$$2$$, $newArgs$$);
      };
    }
    return function() {
      return $fn$$1$$.apply($selfObj$$2$$, arguments);
    };
  }
  function $goog$bind$$($fn$$2$$, $selfObj$$3$$, $var_args$$34$$) {
    $goog$bind$$ = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? $goog$bindNative_$$ : $goog$bindJs_$$;
    return $goog$bind$$.apply(null, arguments);
  }
  var $goog$now$$ = Date.now || function() {
    return +new Date;
  };
// Input 1
  function $webfont$DomHelper$$($mainWindow$$, $opt_loadWindow$$) {
    this.$c$ = $mainWindow$$;
    this.$loadWindow_$ = $opt_loadWindow$$ || $mainWindow$$;
    this.$a$ = this.$loadWindow_$.document;
  }
  var $webfont$DomHelper$CAN_WAIT_STYLESHEET$$ = !!window.FontFace;
  function $JSCompiler_StaticMethods_webfont_DomHelper_prototype$createElement$$($JSCompiler_StaticMethods_webfont_DomHelper_prototype$createElement$self$$, $domElement_elem$$1$$, $opt_attr$$, $opt_innerHtml$$) {
    $domElement_elem$$1$$ = $JSCompiler_StaticMethods_webfont_DomHelper_prototype$createElement$self$$.$a$.createElement($domElement_elem$$1$$);
    if ($opt_attr$$) {
      for (var $attr$$ in $opt_attr$$) {
        $opt_attr$$.hasOwnProperty($attr$$) && ("style" == $attr$$ ? $domElement_elem$$1$$.style.cssText = $opt_attr$$[$attr$$] : $domElement_elem$$1$$.setAttribute($attr$$, $opt_attr$$[$attr$$]));
      }
    }
    $opt_innerHtml$$ && $domElement_elem$$1$$.appendChild($JSCompiler_StaticMethods_webfont_DomHelper_prototype$createElement$self$$.$a$.createTextNode($opt_innerHtml$$));
    return $domElement_elem$$1$$;
  }
  function $JSCompiler_StaticMethods_insertInto$$($JSCompiler_StaticMethods_insertInto$self_t$$, $tagName$$2$$, $e$$6$$) {
    $JSCompiler_StaticMethods_insertInto$self_t$$ = $JSCompiler_StaticMethods_insertInto$self_t$$.$a$.getElementsByTagName($tagName$$2$$)[0];
    $JSCompiler_StaticMethods_insertInto$self_t$$ || ($JSCompiler_StaticMethods_insertInto$self_t$$ = document.documentElement);
    $JSCompiler_StaticMethods_insertInto$self_t$$.insertBefore($e$$6$$, $JSCompiler_StaticMethods_insertInto$self_t$$.lastChild);
  }
  function $JSCompiler_StaticMethods_removeElement$$($node$$2$$) {
    $node$$2$$.parentNode && $node$$2$$.parentNode.removeChild($node$$2$$);
  }
  function $JSCompiler_StaticMethods_updateClassName$$($e$$9$$, $add_opt_add_remainingClasses$$, $opt_remove_remove$$) {
    $add_opt_add_remainingClasses$$ = $add_opt_add_remainingClasses$$ || [];
    $opt_remove_remove$$ = $opt_remove_remove$$ || [];
    for (var $classes$$ = $e$$9$$.className.split(/\s+/), $i$$12$$ = 0;$i$$12$$ < $add_opt_add_remainingClasses$$.length;$i$$12$$ += 1) {
      for (var $found$$ = !1, $j$$1$$ = 0;$j$$1$$ < $classes$$.length;$j$$1$$ += 1) {
        if ($add_opt_add_remainingClasses$$[$i$$12$$] === $classes$$[$j$$1$$]) {
          $found$$ = !0;
          break;
        }
      }
      $found$$ || $classes$$.push($add_opt_add_remainingClasses$$[$i$$12$$]);
    }
    $add_opt_add_remainingClasses$$ = [];
    for ($i$$12$$ = 0;$i$$12$$ < $classes$$.length;$i$$12$$ += 1) {
      $found$$ = !1;
      for ($j$$1$$ = 0;$j$$1$$ < $opt_remove_remove$$.length;$j$$1$$ += 1) {
        if ($classes$$[$i$$12$$] === $opt_remove_remove$$[$j$$1$$]) {
          $found$$ = !0;
          break;
        }
      }
      $found$$ || $add_opt_add_remainingClasses$$.push($classes$$[$i$$12$$]);
    }
    $e$$9$$.className = $add_opt_add_remainingClasses$$.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
  }
  function $JSCompiler_StaticMethods_hasClassName$$($e$$10$$, $name$$75$$) {
    for (var $classes$$1$$ = $e$$10$$.className.split(/\s+/), $i$$13$$ = 0, $len$$ = $classes$$1$$.length;$i$$13$$ < $len$$;$i$$13$$++) {
      if ($classes$$1$$[$i$$13$$] == $name$$75$$) {
        return !0;
      }
    }
    return !1;
  }
  function $JSCompiler_StaticMethods_getProtocol$$($JSCompiler_StaticMethods_getProtocol$self$$) {
    if ("string" === typeof $JSCompiler_StaticMethods_getProtocol$self$$.$f$) {
      return $JSCompiler_StaticMethods_getProtocol$self$$.$f$;
    }
    var $protocol$$1$$ = $JSCompiler_StaticMethods_getProtocol$self$$.$loadWindow_$.location.protocol;
    "about:" == $protocol$$1$$ && ($protocol$$1$$ = $JSCompiler_StaticMethods_getProtocol$self$$.$c$.location.protocol);
    return "https:" == $protocol$$1$$ ? "https:" : "http:";
  }
  function $JSCompiler_StaticMethods_getHostName$$($JSCompiler_StaticMethods_getHostName$self$$) {
    return $JSCompiler_StaticMethods_getHostName$self$$.$loadWindow_$.location.hostname || $JSCompiler_StaticMethods_getHostName$self$$.$c$.location.hostname;
  }
  function $JSCompiler_StaticMethods_loadStylesheet$$($JSCompiler_StaticMethods_loadStylesheet$self$$, $href_link$$, $opt_callback$$6$$) {
    function $mayInvokeCallback$$() {
      $callback$$53$$ && $eventFired$$ && $asyncResolved$$ && ($callback$$53$$($callbackArg$$), $callback$$53$$ = null);
    }
    $href_link$$ = $JSCompiler_StaticMethods_webfont_DomHelper_prototype$createElement$$($JSCompiler_StaticMethods_loadStylesheet$self$$, "link", {rel:"stylesheet", href:$href_link$$, media:"all"});
    var $eventFired$$ = !1, $asyncResolved$$ = !0, $callbackArg$$ = null, $callback$$53$$ = $opt_callback$$6$$ || null;
    $webfont$DomHelper$CAN_WAIT_STYLESHEET$$ ? ($href_link$$.onload = function $$href_link$$$onload$() {
      $eventFired$$ = !0;
      $mayInvokeCallback$$();
    }, $href_link$$.onerror = function $$href_link$$$onerror$() {
      $eventFired$$ = !0;
      $callbackArg$$ = Error("Stylesheet failed to load");
      $mayInvokeCallback$$();
    }) : setTimeout(function() {
      $eventFired$$ = !0;
      $mayInvokeCallback$$();
    }, 0);
    $JSCompiler_StaticMethods_insertInto$$($JSCompiler_StaticMethods_loadStylesheet$self$$, "head", $href_link$$);
  }
  function $JSCompiler_StaticMethods_loadScript$$($JSCompiler_StaticMethods_loadScript$self$$, $src$$11$$, $opt_callback$$7$$, $opt_timeout$$) {
    var $head$$ = $JSCompiler_StaticMethods_loadScript$self$$.$a$.getElementsByTagName("head")[0];
    if ($head$$) {
      var $script$$3$$ = $JSCompiler_StaticMethods_webfont_DomHelper_prototype$createElement$$($JSCompiler_StaticMethods_loadScript$self$$, "script", {src:$src$$11$$}), $done$$ = !1;
      $script$$3$$.onload = $script$$3$$.onreadystatechange = function $$script$$3$$$onreadystatechange$() {
        $done$$ || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || ($done$$ = !0, $opt_callback$$7$$ && $opt_callback$$7$$(null), $script$$3$$.onload = $script$$3$$.onreadystatechange = null, "HEAD" == $script$$3$$.parentNode.tagName && $head$$.removeChild($script$$3$$));
      };
      $head$$.appendChild($script$$3$$);
      setTimeout(function() {
        $done$$ || ($done$$ = !0, $opt_callback$$7$$ && $opt_callback$$7$$(Error("Script load timeout")));
      }, $opt_timeout$$ || 5E3);
      return $script$$3$$;
    }
    return null;
  }
  ;
// Input 2
  function $webfont$StyleSheetWaiter$$() {
    this.$c$ = 0;
    this.$a$ = null;
  }
  function $JSCompiler_StaticMethods_startWaitingLoad$$($JSCompiler_StaticMethods_startWaitingLoad$self$$) {
    $JSCompiler_StaticMethods_startWaitingLoad$self$$.$c$++;
    return function() {
      $JSCompiler_StaticMethods_startWaitingLoad$self$$.$c$--;
      $JSCompiler_StaticMethods_fireIfReady_$$($JSCompiler_StaticMethods_startWaitingLoad$self$$);
    };
  }
  function $JSCompiler_StaticMethods_waitWhileNeededThen$$($JSCompiler_StaticMethods_waitWhileNeededThen$self$$, $fn$$5$$) {
    $JSCompiler_StaticMethods_waitWhileNeededThen$self$$.$a$ = $fn$$5$$;
    $JSCompiler_StaticMethods_fireIfReady_$$($JSCompiler_StaticMethods_waitWhileNeededThen$self$$);
  }
  function $JSCompiler_StaticMethods_fireIfReady_$$($JSCompiler_StaticMethods_fireIfReady_$self$$) {
    0 == $JSCompiler_StaticMethods_fireIfReady_$self$$.$c$ && $JSCompiler_StaticMethods_fireIfReady_$self$$.$a$ && ($JSCompiler_StaticMethods_fireIfReady_$self$$.$a$(), $JSCompiler_StaticMethods_fireIfReady_$self$$.$a$ = null);
  }
  ;
// Input 3
  function $webfont$CssClassName$$($opt_joinChar$$) {
    this.$c$ = $opt_joinChar$$ || "-";
  }
  $webfont$CssClassName$$.prototype.$a$ = function $$webfont$CssClassName$$$$$a$$($var_args$$38$$) {
    for (var $parts$$3$$ = [], $i$$16$$ = 0;$i$$16$$ < arguments.length;$i$$16$$++) {
      $parts$$3$$.push(arguments[$i$$16$$].replace(/[\W_]+/g, "").toLowerCase());
    }
    return $parts$$3$$.join(this.$c$);
  };
// Input 4
  function $webfont$Font$$($name$$77$$, $opt_variation$$) {
    this.$a$ = $name$$77$$;
    this.$f$ = 4;
    this.$c$ = "n";
    var $match$$1$$ = ($opt_variation$$ || "n4").match(/^([nio])([1-9])$/i);
    $match$$1$$ && (this.$c$ = $match$$1$$[1], this.$f$ = parseInt($match$$1$$[2], 10));
  }
  function $JSCompiler_StaticMethods_toCssString$$($JSCompiler_StaticMethods_toCssString$self$$) {
    return $JSCompiler_StaticMethods_getCssStyle$$($JSCompiler_StaticMethods_toCssString$self$$) + " " + ($JSCompiler_StaticMethods_toCssString$self$$.$f$ + "00") + " 300px " + $JSCompiler_StaticMethods_quote_$$($JSCompiler_StaticMethods_toCssString$self$$.$a$);
  }
  function $JSCompiler_StaticMethods_quote_$$($name$$78_split$$) {
    var $quoted$$ = [];
    $name$$78_split$$ = $name$$78_split$$.split(/,\s*/);
    for (var $i$$17$$ = 0;$i$$17$$ < $name$$78_split$$.length;$i$$17$$++) {
      var $part$$2$$ = $name$$78_split$$[$i$$17$$].replace(/['"]/g, "");
      -1 != $part$$2$$.indexOf(" ") || /^\d/.test($part$$2$$) ? $quoted$$.push("'" + $part$$2$$ + "'") : $quoted$$.push($part$$2$$);
    }
    return $quoted$$.join(",");
  }
  function $JSCompiler_StaticMethods_getVariation$$($JSCompiler_StaticMethods_getVariation$self$$) {
    return $JSCompiler_StaticMethods_getVariation$self$$.$c$ + $JSCompiler_StaticMethods_getVariation$self$$.$f$;
  }
  function $JSCompiler_StaticMethods_getCssStyle$$($JSCompiler_StaticMethods_getCssStyle$self$$) {
    var $style$$ = "normal";
    "o" === $JSCompiler_StaticMethods_getCssStyle$self$$.$c$ ? $style$$ = "oblique" : "i" === $JSCompiler_StaticMethods_getCssStyle$self$$.$c$ && ($style$$ = "italic");
    return $style$$;
  }
  function $webfont$Font$parseCssVariation$$($css$$1$$) {
    var $weight$$ = 4, $style$$1$$ = "n", $m$$ = null;
    $css$$1$$ && (($m$$ = $css$$1$$.match(/(normal|oblique|italic)/i)) && $m$$[1] && ($style$$1$$ = $m$$[1].substr(0, 1).toLowerCase()), ($m$$ = $css$$1$$.match(/([1-9]00|normal|bold)/i)) && $m$$[1] && (/bold/i.test($m$$[1]) ? $weight$$ = 7 : /[1-9]00/.test($m$$[1]) && ($weight$$ = parseInt($m$$[1].substr(0, 1), 10))));
    return $style$$1$$ + $weight$$;
  }
  ;
// Input 5
  function $webfont$EventDispatcher$$($domHelper$$, $config$$2$$) {
    this.$a$ = $domHelper$$;
    this.$f$ = $domHelper$$.$loadWindow_$.document.documentElement;
    this.$h$ = $config$$2$$;
    this.$c$ = new $webfont$CssClassName$$("-");
    this.$j$ = !1 !== $config$$2$$.events;
    this.$g$ = !1 !== $config$$2$$.classes;
  }
  function $JSCompiler_StaticMethods_dispatchLoading$$($JSCompiler_StaticMethods_dispatchLoading$self$$) {
    $JSCompiler_StaticMethods_dispatchLoading$self$$.$g$ && $JSCompiler_StaticMethods_updateClassName$$($JSCompiler_StaticMethods_dispatchLoading$self$$.$f$, [$JSCompiler_StaticMethods_dispatchLoading$self$$.$c$.$a$("wf", "loading")]);
    $JSCompiler_StaticMethods_dispatch_$$($JSCompiler_StaticMethods_dispatchLoading$self$$, "loading");
  }
  function $JSCompiler_StaticMethods_dispatchInactive$$($JSCompiler_StaticMethods_dispatchInactive$self$$) {
    if ($JSCompiler_StaticMethods_dispatchInactive$self$$.$g$) {
      var $hasActive$$ = $JSCompiler_StaticMethods_hasClassName$$($JSCompiler_StaticMethods_dispatchInactive$self$$.$f$, $JSCompiler_StaticMethods_dispatchInactive$self$$.$c$.$a$("wf", "active")), $add$$2$$ = [], $remove$$2$$ = [$JSCompiler_StaticMethods_dispatchInactive$self$$.$c$.$a$("wf", "loading")];
      $hasActive$$ || $add$$2$$.push($JSCompiler_StaticMethods_dispatchInactive$self$$.$c$.$a$("wf", "inactive"));
      $JSCompiler_StaticMethods_updateClassName$$($JSCompiler_StaticMethods_dispatchInactive$self$$.$f$, $add$$2$$, $remove$$2$$);
    }
    $JSCompiler_StaticMethods_dispatch_$$($JSCompiler_StaticMethods_dispatchInactive$self$$, "inactive");
  }
  function $JSCompiler_StaticMethods_dispatch_$$($JSCompiler_StaticMethods_dispatch_$self$$, $event$$, $opt_font$$) {
    if ($JSCompiler_StaticMethods_dispatch_$self$$.$j$ && $JSCompiler_StaticMethods_dispatch_$self$$.$h$[$event$$]) {
      if ($opt_font$$) {
        $JSCompiler_StaticMethods_dispatch_$self$$.$h$[$event$$]($opt_font$$.$a$, $JSCompiler_StaticMethods_getVariation$$($opt_font$$));
      } else {
        $JSCompiler_StaticMethods_dispatch_$self$$.$h$[$event$$]();
      }
    }
  }
  ;
// Input 6
// Input 7
  function $webfont$FontModuleLoader$$() {
    this.$a$ = {};
  }
  function $JSCompiler_StaticMethods_getModules$$($JSCompiler_StaticMethods_getModules$self$$, $configuration$$2$$, $domHelper$$1$$) {
    var $modules$$ = [], $key$$23$$;
    for ($key$$23$$ in $configuration$$2$$) {
      if ($configuration$$2$$.hasOwnProperty($key$$23$$)) {
        var $moduleFactory$$ = $JSCompiler_StaticMethods_getModules$self$$.$a$[$key$$23$$];
        $moduleFactory$$ && $modules$$.push($moduleFactory$$($configuration$$2$$[$key$$23$$], $domHelper$$1$$));
      }
    }
    return $modules$$;
  }
  ;
// Input 8
  function $webfont$FontRuler$$($domHelper$$2$$, $fontTestString$$) {
    this.$a$ = $domHelper$$2$$;
    this.$f$ = $fontTestString$$;
    this.$c$ = $JSCompiler_StaticMethods_webfont_DomHelper_prototype$createElement$$(this.$a$, "span", {"aria-hidden":"true"}, this.$f$);
  }
  function $JSCompiler_StaticMethods_insert$$($JSCompiler_StaticMethods_insert$self$$) {
    $JSCompiler_StaticMethods_insertInto$$($JSCompiler_StaticMethods_insert$self$$.$a$, "body", $JSCompiler_StaticMethods_insert$self$$.$c$);
  }
  function $JSCompiler_StaticMethods_computeStyleString_$$($font$$7$$) {
    return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + $JSCompiler_StaticMethods_quote_$$($font$$7$$.$a$) + ";" + ("font-style:" + $JSCompiler_StaticMethods_getCssStyle$$($font$$7$$) + ";font-weight:" + ($font$$7$$.$f$ + "00") + ";");
  }
  ;
// Input 9
  function $webfont$NativeFontWatchRunner$$($activeCallback$$, $inactiveCallback$$, $domHelper$$3$$, $font$$8$$, $opt_timeout$$1$$, $opt_fontTestString$$) {
    this.$g$ = $activeCallback$$;
    this.$j$ = $inactiveCallback$$;
    this.$c$ = $font$$8$$;
    this.$a$ = $domHelper$$3$$;
    this.$f$ = $opt_timeout$$1$$ || 3E3;
    this.$h$ = $opt_fontTestString$$ || void 0;
  }
  $webfont$NativeFontWatchRunner$$.prototype.start = function $$webfont$NativeFontWatchRunner$$$$start$() {
    var $doc$$5$$ = this.$a$.$loadWindow_$.document, $that$$1$$ = this, $start$$6$$ = $goog$now$$(), $loader$$ = new Promise(function($resolve$$, $reject$$) {
      function $check$$() {
        $goog$now$$() - $start$$6$$ >= $that$$1$$.$f$ ? $reject$$() : $doc$$5$$.fonts.load($JSCompiler_StaticMethods_toCssString$$($that$$1$$.$c$), $that$$1$$.$h$).then(function($fonts$$) {
          1 <= $fonts$$.length ? $resolve$$() : setTimeout($check$$, 25);
        }, function() {
          $reject$$();
        });
      }
      $check$$();
    }), $timer$$ = new Promise(function($resolve$$1$$, $reject$$1$$) {
      setTimeout($reject$$1$$, $that$$1$$.$f$);
    });
    Promise.race([$timer$$, $loader$$]).then(function() {
      $that$$1$$.$g$($that$$1$$.$c$);
    }, function() {
      $that$$1$$.$j$($that$$1$$.$c$);
    });
  };
// Input 10
  function $webfont$FontWatchRunner$$($activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$, $inactiveCallback$$1$$, $domHelper$$4$$, $font$$9$$, $opt_timeout$$2$$, $opt_metricCompatibleFonts$$, $opt_fontTestString$$1$$) {
    this.$u$ = $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$;
    this.$w$ = $inactiveCallback$$1$$;
    this.$a$ = $domHelper$$4$$;
    this.$c$ = $font$$9$$;
    this.$o$ = $opt_fontTestString$$1$$ || "BESbswy";
    this.$f$ = {};
    this.$A$ = $opt_timeout$$2$$ || 3E3;
    this.$s$ = $opt_metricCompatibleFonts$$ || null;
    this.$m$ = this.$j$ = this.$h$ = this.$g$ = null;
    this.$g$ = new $webfont$FontRuler$$(this.$a$, this.$o$);
    this.$h$ = new $webfont$FontRuler$$(this.$a$, this.$o$);
    this.$j$ = new $webfont$FontRuler$$(this.$a$, this.$o$);
    this.$m$ = new $webfont$FontRuler$$(this.$a$, this.$o$);
    $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$ = new $webfont$Font$$(this.$c$.$a$ + ",serif", $JSCompiler_StaticMethods_getVariation$$(this.$c$));
    $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$ = $JSCompiler_StaticMethods_computeStyleString_$$($activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$);
    this.$g$.$c$.style.cssText = $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$;
    $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$ = new $webfont$Font$$(this.$c$.$a$ + ",sans-serif", $JSCompiler_StaticMethods_getVariation$$(this.$c$));
    $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$ = $JSCompiler_StaticMethods_computeStyleString_$$($activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$);
    this.$h$.$c$.style.cssText = $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$;
    $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$ = new $webfont$Font$$("serif", $JSCompiler_StaticMethods_getVariation$$(this.$c$));
    $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$ = $JSCompiler_StaticMethods_computeStyleString_$$($activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$);
    this.$j$.$c$.style.cssText = $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$;
    $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$ = new $webfont$Font$$("sans-serif", $JSCompiler_StaticMethods_getVariation$$(this.$c$));
    $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$ = $JSCompiler_StaticMethods_computeStyleString_$$($activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$);
    this.$m$.$c$.style.cssText = $activeCallback$$1_font$$inline_70_font$$inline_73_font$$inline_76_font$$inline_79_styleString$$inline_113_styleString$$inline_116_styleString$$inline_119_styleString$$inline_122$$;
    $JSCompiler_StaticMethods_insert$$(this.$g$);
    $JSCompiler_StaticMethods_insert$$(this.$h$);
    $JSCompiler_StaticMethods_insert$$(this.$j$);
    $JSCompiler_StaticMethods_insert$$(this.$m$);
  }
  var $webfont$FontWatchRunner$LastResortFonts$$ = {$SERIF$:"serif", $SANS_SERIF$:"sans-serif"}, $webfont$FontWatchRunner$HAS_WEBKIT_FALLBACK_BUG$$ = null;
  function $webfont$FontWatchRunner$hasWebKitFallbackBug$$() {
    if (null === $webfont$FontWatchRunner$HAS_WEBKIT_FALLBACK_BUG$$) {
      var $match$$2$$ = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
      $webfont$FontWatchRunner$HAS_WEBKIT_FALLBACK_BUG$$ = !!$match$$2$$ && (536 > parseInt($match$$2$$[1], 10) || 536 === parseInt($match$$2$$[1], 10) && 11 >= parseInt($match$$2$$[2], 10));
    }
    return $webfont$FontWatchRunner$HAS_WEBKIT_FALLBACK_BUG$$;
  }
  $webfont$FontWatchRunner$$.prototype.start = function $$webfont$FontWatchRunner$$$$start$() {
    this.$f$.serif = this.$j$.$c$.offsetWidth;
    this.$f$["sans-serif"] = this.$m$.$c$.offsetWidth;
    this.$v$ = $goog$now$$();
    $JSCompiler_StaticMethods_check_$$(this);
  };
  function $JSCompiler_StaticMethods_widthsMatchLastResortWidths_$$($JSCompiler_StaticMethods_widthsMatchLastResortWidths_$self$$, $a$$2$$, $b$$1$$) {
    for (var $font$$10$$ in $webfont$FontWatchRunner$LastResortFonts$$) {
      if ($webfont$FontWatchRunner$LastResortFonts$$.hasOwnProperty($font$$10$$) && $a$$2$$ === $JSCompiler_StaticMethods_widthsMatchLastResortWidths_$self$$.$f$[$webfont$FontWatchRunner$LastResortFonts$$[$font$$10$$]] && $b$$1$$ === $JSCompiler_StaticMethods_widthsMatchLastResortWidths_$self$$.$f$[$webfont$FontWatchRunner$LastResortFonts$$[$font$$10$$]]) {
        return !0;
      }
    }
    return !1;
  }
  function $JSCompiler_StaticMethods_check_$$($JSCompiler_StaticMethods_check_$self$$) {
    var $widthA$$ = $JSCompiler_StaticMethods_check_$self$$.$g$.$c$.offsetWidth, $widthB$$ = $JSCompiler_StaticMethods_check_$self$$.$h$.$c$.offsetWidth, $JSCompiler_temp$$4$$;
    ($JSCompiler_temp$$4$$ = $widthA$$ === $JSCompiler_StaticMethods_check_$self$$.$f$.serif && $widthB$$ === $JSCompiler_StaticMethods_check_$self$$.$f$["sans-serif"]) || ($JSCompiler_temp$$4$$ = $webfont$FontWatchRunner$hasWebKitFallbackBug$$() && $JSCompiler_StaticMethods_widthsMatchLastResortWidths_$$($JSCompiler_StaticMethods_check_$self$$, $widthA$$, $widthB$$));
    $JSCompiler_temp$$4$$ ? $goog$now$$() - $JSCompiler_StaticMethods_check_$self$$.$v$ >= $JSCompiler_StaticMethods_check_$self$$.$A$ ? $webfont$FontWatchRunner$hasWebKitFallbackBug$$() && $JSCompiler_StaticMethods_widthsMatchLastResortWidths_$$($JSCompiler_StaticMethods_check_$self$$, $widthA$$, $widthB$$) && (null === $JSCompiler_StaticMethods_check_$self$$.$s$ || $JSCompiler_StaticMethods_check_$self$$.$s$.hasOwnProperty($JSCompiler_StaticMethods_check_$self$$.$c$.$a$)) ? $JSCompiler_StaticMethods_finish_$$($JSCompiler_StaticMethods_check_$self$$,
      $JSCompiler_StaticMethods_check_$self$$.$u$) : $JSCompiler_StaticMethods_finish_$$($JSCompiler_StaticMethods_check_$self$$, $JSCompiler_StaticMethods_check_$self$$.$w$) : $JSCompiler_StaticMethods_asyncCheck_$$($JSCompiler_StaticMethods_check_$self$$) : $JSCompiler_StaticMethods_finish_$$($JSCompiler_StaticMethods_check_$self$$, $JSCompiler_StaticMethods_check_$self$$.$u$);
  }
  function $JSCompiler_StaticMethods_asyncCheck_$$($JSCompiler_StaticMethods_asyncCheck_$self$$) {
    setTimeout($goog$bind$$(function() {
      $JSCompiler_StaticMethods_check_$$(this);
    }, $JSCompiler_StaticMethods_asyncCheck_$self$$), 50);
  }
  function $JSCompiler_StaticMethods_finish_$$($JSCompiler_StaticMethods_finish_$self$$, $callback$$56$$) {
    setTimeout($goog$bind$$(function() {
      $JSCompiler_StaticMethods_removeElement$$(this.$g$.$c$);
      $JSCompiler_StaticMethods_removeElement$$(this.$h$.$c$);
      $JSCompiler_StaticMethods_removeElement$$(this.$j$.$c$);
      $JSCompiler_StaticMethods_removeElement$$(this.$m$.$c$);
      $callback$$56$$(this.$c$);
    }, $JSCompiler_StaticMethods_finish_$self$$), 0);
  }
  ;
// Input 11
  function $webfont$FontWatcher$$($domHelper$$5$$, $eventDispatcher$$, $opt_timeout$$3$$) {
    this.$a$ = $domHelper$$5$$;
    this.$c$ = $eventDispatcher$$;
    this.$f$ = 0;
    this.$m$ = this.$j$ = !1;
    this.$o$ = $opt_timeout$$3$$;
  }
  var $webfont$FontWatcher$SHOULD_USE_NATIVE_LOADER$$ = null;
  $webfont$FontWatcher$$.prototype.$g$ = function $$webfont$FontWatcher$$$$$g$$($font$$12$$) {
    var $JSCompiler_StaticMethods_dispatchFontActive$self$$inline_27$$ = this.$c$;
    $JSCompiler_StaticMethods_dispatchFontActive$self$$inline_27$$.$g$ && $JSCompiler_StaticMethods_updateClassName$$($JSCompiler_StaticMethods_dispatchFontActive$self$$inline_27$$.$f$, [$JSCompiler_StaticMethods_dispatchFontActive$self$$inline_27$$.$c$.$a$("wf", $font$$12$$.$a$, $JSCompiler_StaticMethods_getVariation$$($font$$12$$).toString(), "active")], [$JSCompiler_StaticMethods_dispatchFontActive$self$$inline_27$$.$c$.$a$("wf", $font$$12$$.$a$, $JSCompiler_StaticMethods_getVariation$$($font$$12$$).toString(),
      "loading"), $JSCompiler_StaticMethods_dispatchFontActive$self$$inline_27$$.$c$.$a$("wf", $font$$12$$.$a$, $JSCompiler_StaticMethods_getVariation$$($font$$12$$).toString(), "inactive")]);
    $JSCompiler_StaticMethods_dispatch_$$($JSCompiler_StaticMethods_dispatchFontActive$self$$inline_27$$, "fontactive", $font$$12$$);
    this.$m$ = !0;
    $JSCompiler_StaticMethods_decreaseCurrentlyWatched_$$(this);
  };
  $webfont$FontWatcher$$.prototype.$h$ = function $$webfont$FontWatcher$$$$$h$$($font$$13$$) {
    var $JSCompiler_StaticMethods_dispatchFontInactive$self$$inline_30$$ = this.$c$;
    if ($JSCompiler_StaticMethods_dispatchFontInactive$self$$inline_30$$.$g$) {
      var $hasFontActive$$inline_32$$ = $JSCompiler_StaticMethods_hasClassName$$($JSCompiler_StaticMethods_dispatchFontInactive$self$$inline_30$$.$f$, $JSCompiler_StaticMethods_dispatchFontInactive$self$$inline_30$$.$c$.$a$("wf", $font$$13$$.$a$, $JSCompiler_StaticMethods_getVariation$$($font$$13$$).toString(), "active")), $add$$inline_33$$ = [], $remove$$inline_34$$ = [$JSCompiler_StaticMethods_dispatchFontInactive$self$$inline_30$$.$c$.$a$("wf", $font$$13$$.$a$, $JSCompiler_StaticMethods_getVariation$$($font$$13$$).toString(),
        "loading")];
      $hasFontActive$$inline_32$$ || $add$$inline_33$$.push($JSCompiler_StaticMethods_dispatchFontInactive$self$$inline_30$$.$c$.$a$("wf", $font$$13$$.$a$, $JSCompiler_StaticMethods_getVariation$$($font$$13$$).toString(), "inactive"));
      $JSCompiler_StaticMethods_updateClassName$$($JSCompiler_StaticMethods_dispatchFontInactive$self$$inline_30$$.$f$, $add$$inline_33$$, $remove$$inline_34$$);
    }
    $JSCompiler_StaticMethods_dispatch_$$($JSCompiler_StaticMethods_dispatchFontInactive$self$$inline_30$$, "fontinactive", $font$$13$$);
    $JSCompiler_StaticMethods_decreaseCurrentlyWatched_$$(this);
  };
  function $JSCompiler_StaticMethods_decreaseCurrentlyWatched_$$($JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$) {
    0 == --$JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$.$f$ && $JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$.$j$ && ($JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$.$m$ ? ($JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$ = $JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$.$c$,
    $JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$.$g$ && $JSCompiler_StaticMethods_updateClassName$$($JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$.$f$, [$JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$.$c$.$a$("wf", "active")], [$JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$.$c$.$a$("wf",
      "loading"), $JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$.$c$.$a$("wf", "inactive")]), $JSCompiler_StaticMethods_dispatch_$$($JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$, "active")) : $JSCompiler_StaticMethods_dispatchInactive$$($JSCompiler_StaticMethods_decreaseCurrentlyWatched_$self_JSCompiler_StaticMethods_dispatchActive$self$$inline_36$$.$c$));
  }
  ;
// Input 12
  function $webfont$WebFont$$($mainWindow$$1$$) {
    this.$j$ = $mainWindow$$1$$;
    this.$c$ = new $webfont$FontModuleLoader$$;
    this.$h$ = 0;
    this.$f$ = this.$g$ = !0;
  }
  $webfont$WebFont$$.prototype.load = function $$webfont$WebFont$$$$load$($configuration$$3$$) {
    this.$a$ = new $webfont$DomHelper$$(this.$j$, $configuration$$3$$.context || this.$j$);
    this.$g$ = !1 !== $configuration$$3$$.events;
    this.$f$ = !1 !== $configuration$$3$$.classes;
    $JSCompiler_StaticMethods_load_$$(this, new $webfont$EventDispatcher$$(this.$a$, $configuration$$3$$), $configuration$$3$$);
  };
  function $JSCompiler_StaticMethods_onModuleReady_$$($JSCompiler_StaticMethods_onModuleReady_$self$$, $fontWatcher$$, $fonts$$2$$, $opt_fontTestStrings$$, $opt_metricCompatibleFonts$$1$$) {
    var $allModulesLoaded$$ = 0 == --$JSCompiler_StaticMethods_onModuleReady_$self$$.$h$;
    ($JSCompiler_StaticMethods_onModuleReady_$self$$.$f$ || $JSCompiler_StaticMethods_onModuleReady_$self$$.$g$) && setTimeout(function() {
      var $metricCompatibleFonts$$inline_45$$ = $opt_metricCompatibleFonts$$1$$ || null, $testStrings$$inline_47$$ = $opt_fontTestStrings$$ || null || {};
      if (0 === $fonts$$2$$.length && $allModulesLoaded$$) {
        $JSCompiler_StaticMethods_dispatchInactive$$($fontWatcher$$.$c$);
      } else {
        $fontWatcher$$.$f$ += $fonts$$2$$.length;
        $allModulesLoaded$$ && ($fontWatcher$$.$j$ = $allModulesLoaded$$);
        var $i$$inline_48$$, $fontWatchRunners$$inline_49$$ = [];
        for ($i$$inline_48$$ = 0;$i$$inline_48$$ < $fonts$$2$$.length;$i$$inline_48$$++) {
          var $font$$inline_50$$ = $fonts$$2$$[$i$$inline_48$$], $testString$$inline_51$$ = $testStrings$$inline_47$$[$font$$inline_50$$.$a$], $JSCompiler_StaticMethods_dispatchFontLoading$self$$inline_81_fontWatchRunner$$inline_52$$ = $fontWatcher$$.$c$, $font$$inline_82_match$$inline_84$$ = $font$$inline_50$$;
          $JSCompiler_StaticMethods_dispatchFontLoading$self$$inline_81_fontWatchRunner$$inline_52$$.$g$ && $JSCompiler_StaticMethods_updateClassName$$($JSCompiler_StaticMethods_dispatchFontLoading$self$$inline_81_fontWatchRunner$$inline_52$$.$f$, [$JSCompiler_StaticMethods_dispatchFontLoading$self$$inline_81_fontWatchRunner$$inline_52$$.$c$.$a$("wf", $font$$inline_82_match$$inline_84$$.$a$, $JSCompiler_StaticMethods_getVariation$$($font$$inline_82_match$$inline_84$$).toString(), "loading")]);
          $JSCompiler_StaticMethods_dispatch_$$($JSCompiler_StaticMethods_dispatchFontLoading$self$$inline_81_fontWatchRunner$$inline_52$$, "fontloading", $font$$inline_82_match$$inline_84$$);
          $JSCompiler_StaticMethods_dispatchFontLoading$self$$inline_81_fontWatchRunner$$inline_52$$ = null;
          null === $webfont$FontWatcher$SHOULD_USE_NATIVE_LOADER$$ && ($webfont$FontWatcher$SHOULD_USE_NATIVE_LOADER$$ = window.FontFace ? ($font$$inline_82_match$$inline_84$$ = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent)) ? 42 < parseInt($font$$inline_82_match$$inline_84$$[1], 10) : !0 : !1);
          $webfont$FontWatcher$SHOULD_USE_NATIVE_LOADER$$ ? $JSCompiler_StaticMethods_dispatchFontLoading$self$$inline_81_fontWatchRunner$$inline_52$$ = new $webfont$NativeFontWatchRunner$$($goog$bind$$($fontWatcher$$.$g$, $fontWatcher$$), $goog$bind$$($fontWatcher$$.$h$, $fontWatcher$$), $fontWatcher$$.$a$, $font$$inline_50$$, $fontWatcher$$.$o$, $testString$$inline_51$$) : $JSCompiler_StaticMethods_dispatchFontLoading$self$$inline_81_fontWatchRunner$$inline_52$$ = new $webfont$FontWatchRunner$$($goog$bind$$($fontWatcher$$.$g$,
            $fontWatcher$$), $goog$bind$$($fontWatcher$$.$h$, $fontWatcher$$), $fontWatcher$$.$a$, $font$$inline_50$$, $fontWatcher$$.$o$, $metricCompatibleFonts$$inline_45$$, $testString$$inline_51$$);
          $fontWatchRunners$$inline_49$$.push($JSCompiler_StaticMethods_dispatchFontLoading$self$$inline_81_fontWatchRunner$$inline_52$$);
        }
        for ($i$$inline_48$$ = 0;$i$$inline_48$$ < $fontWatchRunners$$inline_49$$.length;$i$$inline_48$$++) {
          $fontWatchRunners$$inline_49$$[$i$$inline_48$$].start();
        }
      }
    }, 0);
  }
  function $JSCompiler_StaticMethods_load_$$($JSCompiler_StaticMethods_load_$self$$, $eventDispatcher$$3_i$$19$$, $configuration$$4_len$$1$$) {
    var $modules$$1$$ = [], $timeout$$ = $configuration$$4_len$$1$$.timeout;
    $JSCompiler_StaticMethods_dispatchLoading$$($eventDispatcher$$3_i$$19$$);
    var $modules$$1$$ = $JSCompiler_StaticMethods_getModules$$($JSCompiler_StaticMethods_load_$self$$.$c$, $configuration$$4_len$$1$$, $JSCompiler_StaticMethods_load_$self$$.$a$), $fontWatcher$$1$$ = new $webfont$FontWatcher$$($JSCompiler_StaticMethods_load_$self$$.$a$, $eventDispatcher$$3_i$$19$$, $timeout$$);
    $JSCompiler_StaticMethods_load_$self$$.$h$ = $modules$$1$$.length;
    $eventDispatcher$$3_i$$19$$ = 0;
    for ($configuration$$4_len$$1$$ = $modules$$1$$.length;$eventDispatcher$$3_i$$19$$ < $configuration$$4_len$$1$$;$eventDispatcher$$3_i$$19$$++) {
      $modules$$1$$[$eventDispatcher$$3_i$$19$$].load(function($fonts$$3$$, $opt_fontTestStrings$$1$$, $opt_metricCompatibleFonts$$2$$) {
        $JSCompiler_StaticMethods_onModuleReady_$$($JSCompiler_StaticMethods_load_$self$$, $fontWatcher$$1$$, $fonts$$3$$, $opt_fontTestStrings$$1$$, $opt_metricCompatibleFonts$$2$$);
      });
    }
  }
  ;
// Input 13
  function $webfont$modules$Monotype$$($domHelper$$6$$, $configuration$$5$$) {
    this.$a$ = $domHelper$$6$$;
    this.$c$ = $configuration$$5$$;
  }
  function $JSCompiler_StaticMethods_webfont_modules_Monotype_prototype$getScriptSrc$$($JSCompiler_StaticMethods_webfont_modules_Monotype_prototype$getScriptSrc$self_api$$, $projectId$$, $version$$7$$) {
    var $p$$ = $JSCompiler_StaticMethods_getProtocol$$($JSCompiler_StaticMethods_webfont_modules_Monotype_prototype$getScriptSrc$self_api$$.$a$);
    $JSCompiler_StaticMethods_webfont_modules_Monotype_prototype$getScriptSrc$self_api$$ = ($JSCompiler_StaticMethods_webfont_modules_Monotype_prototype$getScriptSrc$self_api$$.$c$.api || "fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/, "");
    return $p$$ + "//" + $JSCompiler_StaticMethods_webfont_modules_Monotype_prototype$getScriptSrc$self_api$$ + "/" + $projectId$$ + ".js" + ($version$$7$$ ? "?v=" + $version$$7$$ : "");
  }
  $webfont$modules$Monotype$$.prototype.load = function $$webfont$modules$Monotype$$$$load$($onReady$$1$$) {
    function $checkAndLoadIfDownloaded$$() {
      if ($loadWindow$$["__mti_fntLst" + $projectId$$1$$]) {
        var $mti_fnts$$ = $loadWindow$$["__mti_fntLst" + $projectId$$1$$](), $fonts$$4$$ = [], $fntVariation$$;
        if ($mti_fnts$$) {
          for (var $i$$20$$ = 0;$i$$20$$ < $mti_fnts$$.length;$i$$20$$++) {
            var $fnt$$ = $mti_fnts$$[$i$$20$$].fontfamily;
            void 0 != $mti_fnts$$[$i$$20$$].fontStyle && void 0 != $mti_fnts$$[$i$$20$$].fontWeight ? ($fntVariation$$ = $mti_fnts$$[$i$$20$$].fontStyle + $mti_fnts$$[$i$$20$$].fontWeight, $fonts$$4$$.push(new $webfont$Font$$($fnt$$, $fntVariation$$))) : $fonts$$4$$.push(new $webfont$Font$$($fnt$$));
          }
        }
        $onReady$$1$$($fonts$$4$$);
      } else {
        setTimeout(function() {
          $checkAndLoadIfDownloaded$$();
        }, 50);
      }
    }
    var $self$$3$$ = this, $projectId$$1$$ = $self$$3$$.$c$.projectId, $version$$8$$ = $self$$3$$.$c$.version;
    if ($projectId$$1$$) {
      var $loadWindow$$ = $self$$3$$.$a$.$loadWindow_$;
      $JSCompiler_StaticMethods_loadScript$$(this.$a$, $JSCompiler_StaticMethods_webfont_modules_Monotype_prototype$getScriptSrc$$($self$$3$$, $projectId$$1$$, $version$$8$$), function($err$$) {
        $err$$ ? $onReady$$1$$([]) : ($loadWindow$$["__MonotypeConfiguration__" + $projectId$$1$$] = function $$loadWindow$$$__MonotypeConfiguration__$$projectId$$1$$$() {
          return $self$$3$$.$c$;
        }, $checkAndLoadIfDownloaded$$());
      }).id = "__MonotypeAPIScript__" + $projectId$$1$$;
    } else {
      $onReady$$1$$([]);
    }
  };
// Input 14
  function $webfont$modules$Custom$$($domHelper$$7$$, $configuration$$6$$) {
    this.$a$ = $domHelper$$7$$;
    this.$c$ = $configuration$$6$$;
  }
  $webfont$modules$Custom$$.prototype.load = function $$webfont$modules$Custom$$$$load$($onReady$$2$$) {
    var $i$$21$$, $len$$2$$, $components$$1_urls$$ = this.$c$.urls || [], $familiesConfiguration$$ = this.$c$.families || [], $fontTestStrings$$1$$ = this.$c$.testStrings || {}, $waiter$$ = new $webfont$StyleSheetWaiter$$;
    $i$$21$$ = 0;
    for ($len$$2$$ = $components$$1_urls$$.length;$i$$21$$ < $len$$2$$;$i$$21$$++) {
      $JSCompiler_StaticMethods_loadStylesheet$$(this.$a$, $components$$1_urls$$[$i$$21$$], $JSCompiler_StaticMethods_startWaitingLoad$$($waiter$$));
    }
    var $fonts$$5$$ = [];
    $i$$21$$ = 0;
    for ($len$$2$$ = $familiesConfiguration$$.length;$i$$21$$ < $len$$2$$;$i$$21$$++) {
      if ($components$$1_urls$$ = $familiesConfiguration$$[$i$$21$$].split(":"), $components$$1_urls$$[1]) {
        for (var $variations$$ = $components$$1_urls$$[1].split(","), $j$$2$$ = 0;$j$$2$$ < $variations$$.length;$j$$2$$ += 1) {
          $fonts$$5$$.push(new $webfont$Font$$($components$$1_urls$$[0], $variations$$[$j$$2$$]));
        }
      } else {
        $fonts$$5$$.push(new $webfont$Font$$($components$$1_urls$$[0]));
      }
    }
    $JSCompiler_StaticMethods_waitWhileNeededThen$$($waiter$$, function() {
      $onReady$$2$$($fonts$$5$$, $fontTestStrings$$1$$);
    });
  };
// Input 15
  function $webfont$modules$google$FontApiUrlBuilder$$($apiUrl$$, $protocol$$3$$, $text$$10$$) {
    $apiUrl$$ ? this.$a$ = $apiUrl$$ : this.$a$ = $protocol$$3$$ + $webfont$modules$google$FontApiUrlBuilder$DEFAULT_API_URL$$;
    this.$c$ = [];
    this.$f$ = [];
    this.$g$ = $text$$10$$ || "";
  }
  var $webfont$modules$google$FontApiUrlBuilder$DEFAULT_API_URL$$ = "//fonts.googleapis.com/css";
  function $JSCompiler_StaticMethods_parseFontFamilies_$$($JSCompiler_StaticMethods_parseFontFamilies_$self$$, $fontFamilies$$1$$) {
    for (var $length$$16$$ = $fontFamilies$$1$$.length, $i$$22$$ = 0;$i$$22$$ < $length$$16$$;$i$$22$$++) {
      var $elements$$ = $fontFamilies$$1$$[$i$$22$$].split(":");
      3 == $elements$$.length && $JSCompiler_StaticMethods_parseFontFamilies_$self$$.$f$.push($elements$$.pop());
      var $joinCharacter$$ = "";
      2 == $elements$$.length && "" != $elements$$[1] && ($joinCharacter$$ = ":");
      $JSCompiler_StaticMethods_parseFontFamilies_$self$$.$c$.push($elements$$.join($joinCharacter$$));
    }
  }
  function $JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$$($JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$self$$) {
    if (0 == $JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$self$$.$c$.length) {
      throw Error("No fonts to load!");
    }
    if (-1 != $JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$self$$.$a$.indexOf("kit=")) {
      return $JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$self$$.$a$;
    }
    for (var $length$$17_url$$16$$ = $JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$self$$.$c$.length, $sb$$ = [], $i$$23$$ = 0;$i$$23$$ < $length$$17_url$$16$$;$i$$23$$++) {
      $sb$$.push($JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$self$$.$c$[$i$$23$$].replace(/ /g, "+"));
    }
    $length$$17_url$$16$$ = $JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$self$$.$a$ + "?family=" + $sb$$.join("%7C");
    0 < $JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$self$$.$f$.length && ($length$$17_url$$16$$ += "&subset=" + $JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$self$$.$f$.join(","));
    0 < $JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$self$$.$g$.length && ($length$$17_url$$16$$ += "&text=" + encodeURIComponent($JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$self$$.$g$));
    return $length$$17_url$$16$$;
  }
  ;
// Input 16
  function $webfont$modules$google$FontApiParser$$($fontFamilies$$2$$) {
    this.$f$ = $fontFamilies$$2$$;
    this.$c$ = [];
    this.$a$ = {};
  }
  var $webfont$modules$google$FontApiParser$INT_FONTS$$ = {latin:"BESbswy", "latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f", cyrillic:"\u0439\u044f\u0416", greek:"\u03b1\u03b2\u03a3", khmer:"\u1780\u1781\u1782", Hanuman:"\u1780\u1781\u1782"}, $webfont$modules$google$FontApiParser$WEIGHTS$$ = {thin:"1", extralight:"2", "extra-light":"2", ultralight:"2", "ultra-light":"2", light:"3", regular:"4", book:"4", medium:"5", "semi-bold":"6", semibold:"6", "demi-bold":"6", demibold:"6", bold:"7", "extra-bold":"8",
    extrabold:"8", "ultra-bold":"8", ultrabold:"8", black:"9", heavy:"9", l:"3", r:"4", b:"7"}, $webfont$modules$google$FontApiParser$STYLES$$ = {i:"i", italic:"i", n:"n", normal:"n"}, $webfont$modules$google$FontApiParser$VARIATION_MATCH$$ = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
  function $JSCompiler_StaticMethods_webfont_modules_google_FontApiParser_prototype$parse$$($JSCompiler_StaticMethods_webfont_modules_google_FontApiParser_prototype$parse$self$$) {
    for (var $length$$18$$ = $JSCompiler_StaticMethods_webfont_modules_google_FontApiParser_prototype$parse$self$$.$f$.length, $i$$24$$ = 0;$i$$24$$ < $length$$18$$;$i$$24$$++) {
      var $elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$ = $JSCompiler_StaticMethods_webfont_modules_google_FontApiParser_prototype$parse$self$$.$f$[$i$$24$$].split(":"), $fontFamily$$1$$ = $elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$[0].replace(/\+/g, " "), $variations$$1$$ = ["n4"];
      if (2 <= $elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$.length) {
        var $finalSubsets$$inline_63_finalVariations$$inline_56_fvds$$;
        var $providedVariations$$inline_57_variations$$inline_55$$ = $elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$[1];
        $finalSubsets$$inline_63_finalVariations$$inline_56_fvds$$ = [];
        if ($providedVariations$$inline_57_variations$$inline_55$$) {
          for (var $providedVariations$$inline_57_variations$$inline_55$$ = $providedVariations$$inline_57_variations$$inline_55$$.split(","), $length$$inline_58$$ = $providedVariations$$inline_57_variations$$inline_55$$.length, $i$$inline_59$$ = 0;$i$$inline_59$$ < $length$$inline_58$$;$i$$inline_59$$++) {
            var $JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$;
            $JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$ = $providedVariations$$inline_57_variations$$inline_55$$[$i$$inline_59$$];
            if ($JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$.match(/^[\w-]+$/)) {
              var $JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$ = $webfont$modules$google$FontApiParser$VARIATION_MATCH$$.exec($JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$.toLowerCase());
              if (null == $JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$) {
                $JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$ = "";
              } else {
                $JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$ = $JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$[2];
                $JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$ = null == $JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$ || "" == $JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$ ? "n" : $webfont$modules$google$FontApiParser$STYLES$$[$JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$];
                $JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$ = $JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$[1];
                if (null == $JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$ || "" == $JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$) {
                  $JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$ = "4";
                } else {
                  var $weight$$inline_127$$ = $webfont$modules$google$FontApiParser$WEIGHTS$$[$JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$], $JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$ = $weight$$inline_127$$ ? $weight$$inline_127$$ : isNaN($JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$) ? "4" : $JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$.substr(0, 1)
                }
                $JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$ = [$JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$, $JSCompiler_inline_result$$108_groups$$inline_87_parsedWeight$$inline_126$$].join("");
              }
            } else {
              $JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$ = "";
            }
            $JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$ && $finalSubsets$$inline_63_finalVariations$$inline_56_fvds$$.push($JSCompiler_inline_result$$107_JSCompiler_temp$$106_fvd$$inline_60_parsedStyle$$inline_124_variation$$inline_86$$);
          }
        }
        0 < $finalSubsets$$inline_63_finalVariations$$inline_56_fvds$$.length && ($variations$$1$$ = $finalSubsets$$inline_63_finalVariations$$inline_56_fvds$$);
        3 == $elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$.length && ($elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$ = $elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$[2], $finalSubsets$$inline_63_finalVariations$$inline_56_fvds$$ = [], $elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$ = $elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$ ?
          $elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$.split(",") : $finalSubsets$$inline_63_finalVariations$$inline_56_fvds$$, 0 < $elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$.length && ($elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$ = $webfont$modules$google$FontApiParser$INT_FONTS$$[$elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$[0]]) && ($JSCompiler_StaticMethods_webfont_modules_google_FontApiParser_prototype$parse$self$$.$a$[$fontFamily$$1$$] =
          $elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$));
      }
      $JSCompiler_StaticMethods_webfont_modules_google_FontApiParser_prototype$parse$self$$.$a$[$fontFamily$$1$$] || ($elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$ = $webfont$modules$google$FontApiParser$INT_FONTS$$[$fontFamily$$1$$]) && ($JSCompiler_StaticMethods_webfont_modules_google_FontApiParser_prototype$parse$self$$.$a$[$fontFamily$$1$$] = $elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$);
      for ($elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$ = 0;$elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$ < $variations$$1$$.length;$elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$ += 1) {
        $JSCompiler_StaticMethods_webfont_modules_google_FontApiParser_prototype$parse$self$$.$c$.push(new $webfont$Font$$($fontFamily$$1$$, $variations$$1$$[$elements$$1_fontTestString$$1_hanumanTestString_j$$3_subsets_subsets$$inline_62$$]));
      }
    }
  }
  ;
// Input 17
  function $webfont$modules$google$GoogleFontApi$$($domHelper$$8$$, $configuration$$7$$) {
    this.$a$ = $domHelper$$8$$;
    this.$c$ = $configuration$$7$$;
  }
  var $webfont$modules$google$GoogleFontApi$METRICS_COMPATIBLE_FONTS$$ = {Arimo:!0, Cousine:!0, Tinos:!0};
  $webfont$modules$google$GoogleFontApi$$.prototype.load = function $$webfont$modules$google$GoogleFontApi$$$$load$($onReady$$3$$) {
    var $waiter$$1$$ = new $webfont$StyleSheetWaiter$$, $domHelper$$9$$ = this.$a$, $fontApiUrlBuilder$$ = new $webfont$modules$google$FontApiUrlBuilder$$(this.$c$.api, $JSCompiler_StaticMethods_getProtocol$$($domHelper$$9$$), this.$c$.text), $fontFamilies$$3$$ = this.$c$.families;
    $JSCompiler_StaticMethods_parseFontFamilies_$$($fontApiUrlBuilder$$, $fontFamilies$$3$$);
    var $fontApiParser$$ = new $webfont$modules$google$FontApiParser$$($fontFamilies$$3$$);
    $JSCompiler_StaticMethods_webfont_modules_google_FontApiParser_prototype$parse$$($fontApiParser$$);
    $JSCompiler_StaticMethods_loadStylesheet$$($domHelper$$9$$, $JSCompiler_StaticMethods_webfont_modules_google_FontApiUrlBuilder_prototype$build$$($fontApiUrlBuilder$$), $JSCompiler_StaticMethods_startWaitingLoad$$($waiter$$1$$));
    $JSCompiler_StaticMethods_waitWhileNeededThen$$($waiter$$1$$, function() {
      $onReady$$3$$($fontApiParser$$.$c$, $fontApiParser$$.$a$, $webfont$modules$google$GoogleFontApi$METRICS_COMPATIBLE_FONTS$$);
    });
  };
// Input 18
  function $webfont$modules$Typekit$$($domHelper$$10$$, $configuration$$8$$) {
    this.$a$ = $domHelper$$10$$;
    this.$c$ = $configuration$$8$$;
  }
  $webfont$modules$Typekit$$.prototype.load = function $$webfont$modules$Typekit$$$$load$($onReady$$4$$) {
    var $kitId$$1$$ = this.$c$.id, $loadWindow$$1$$ = this.$a$.$loadWindow_$;
    $kitId$$1$$ ? $JSCompiler_StaticMethods_loadScript$$(this.$a$, (this.$c$.api || "https://use.typekit.net") + "/" + $kitId$$1$$ + ".js", function($err$$1_fn$$6$$) {
      if ($err$$1_fn$$6$$) {
        $onReady$$4$$([]);
      } else {
        if ($loadWindow$$1$$.Typekit && $loadWindow$$1$$.Typekit.config && $loadWindow$$1$$.Typekit.config.fn) {
          $err$$1_fn$$6$$ = $loadWindow$$1$$.Typekit.config.fn;
          for (var $fonts$$6$$ = [], $i$$26$$ = 0;$i$$26$$ < $err$$1_fn$$6$$.length;$i$$26$$ += 2) {
            for (var $font$$14$$ = $err$$1_fn$$6$$[$i$$26$$], $variations$$3$$ = $err$$1_fn$$6$$[$i$$26$$ + 1], $j$$4$$ = 0;$j$$4$$ < $variations$$3$$.length;$j$$4$$++) {
              $fonts$$6$$.push(new $webfont$Font$$($font$$14$$, $variations$$3$$[$j$$4$$]));
            }
          }
          try {
            $loadWindow$$1$$.Typekit.load({events:!1, classes:!1, async:!0});
          } catch ($e$$13$$) {
          }
          $onReady$$4$$($fonts$$6$$);
        }
      }
    }, 2E3) : $onReady$$4$$([]);
  };
// Input 19
  function $webfont$modules$Fontdeck$$($domHelper$$11$$, $configuration$$10$$) {
    this.$a$ = $domHelper$$11$$;
    this.$f$ = $configuration$$10$$;
    this.$c$ = [];
  }
  $webfont$modules$Fontdeck$$.prototype.load = function $$webfont$modules$Fontdeck$$$$load$($onReady$$5$$) {
    var $projectId$$3$$ = this.$f$.id, $loadWindow$$2$$ = this.$a$.$loadWindow_$, $self$$4$$ = this;
    $projectId$$3$$ ? ($loadWindow$$2$$.__webfontfontdeckmodule__ || ($loadWindow$$2$$.__webfontfontdeckmodule__ = {}), $loadWindow$$2$$.__webfontfontdeckmodule__[$projectId$$3$$] = function $$loadWindow$$2$$$__webfontfontdeckmodule__$$projectId$$3$$$($fontdeckSupports$$, $data$$31$$) {
      for (var $i$$27$$ = 0, $j$$5$$ = $data$$31$$.fonts.length;$i$$27$$ < $j$$5$$;++$i$$27$$) {
        var $font$$15$$ = $data$$31$$.fonts[$i$$27$$];
        $self$$4$$.$c$.push(new $webfont$Font$$($font$$15$$.name, $webfont$Font$parseCssVariation$$("font-weight:" + $font$$15$$.weight + ";font-style:" + $font$$15$$.style)));
      }
      $onReady$$5$$($self$$4$$.$c$);
    }, $JSCompiler_StaticMethods_loadScript$$(this.$a$, $JSCompiler_StaticMethods_getProtocol$$(this.$a$) + (this.$f$.api || "//f.fontdeck.com/s/css/js/") + $JSCompiler_StaticMethods_getHostName$$(this.$a$) + "/" + $projectId$$3$$ + ".js", function($err$$2$$) {
      $err$$2$$ && $onReady$$5$$([]);
    })) : $onReady$$5$$([]);
  };
// Input 20
  var $webFontLoader$$ = new $webfont$WebFont$$(window);
  $webFontLoader$$.$c$.$a$.custom = function $$webFontLoader$$$$c$$$a$$custom$($configuration$$11$$, $domHelper$$12$$) {
    return new $webfont$modules$Custom$$($domHelper$$12$$, $configuration$$11$$);
  };
  $webFontLoader$$.$c$.$a$.fontdeck = function $$webFontLoader$$$$c$$$a$$fontdeck$($configuration$$12$$, $domHelper$$13$$) {
    return new $webfont$modules$Fontdeck$$($domHelper$$13$$, $configuration$$12$$);
  };
  $webFontLoader$$.$c$.$a$.monotype = function $$webFontLoader$$$$c$$$a$$monotype$($configuration$$13$$, $domHelper$$14$$) {
    return new $webfont$modules$Monotype$$($domHelper$$14$$, $configuration$$13$$);
  };
  $webFontLoader$$.$c$.$a$.typekit = function $$webFontLoader$$$$c$$$a$$typekit$($configuration$$14$$, $domHelper$$15$$) {
    return new $webfont$modules$Typekit$$($domHelper$$15$$, $configuration$$14$$);
  };
  $webFontLoader$$.$c$.$a$.google = function $$webFontLoader$$$$c$$$a$$google$($configuration$$15$$, $domHelper$$16$$) {
    return new $webfont$modules$google$GoogleFontApi$$($domHelper$$16$$, $configuration$$15$$);
  };
  var $exports$$ = {load:$goog$bind$$($webFontLoader$$.load, $webFontLoader$$)};
  "function" === typeof define && define.amd ? define(function() {
    return $exports$$;
  }) : "undefined" !== typeof module && module.exports ? module.exports = $exports$$ : (window.WebFont = $exports$$, window.WebFontConfig && $webFontLoader$$.load(window.WebFontConfig));
}());
