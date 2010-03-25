/*jslint plusplus: false */
/*global load: false, doh: false, parse: false */

"use strict";

//Load the file to test.
load("../parse.js");

doh.register(
    "parse", 
    [
        function require(t) {
            var good1 = "require(['one', 'two'], function(){});",
                bad1 = "require([foo, 'me'], function() {});";

            t.is('require(["one","two"],function(){});', parse("good1", good1));
            t.is(null, parse("bad1", bad1));
        },

        function requireDef(t) {
            var good1 = "require.def('one', ['two', 'three'], function(){});",
                bad1 = "require.def('one', [foo, 'me'], function() {});";

            t.is('require.def("one",["two","three"],function(){});', parse("good1", good1));
            t.is(null, parse("bad1", bad1));
        },

        function requireModify(t) {
            var good1 = "require.modify('one', 'one-mod', ['two', 'three'], function(){});",
                bad1 = "require.modify('one', 'one-mod', [foo, 'me'], function() {});";

            t.is('require.modify("one","one-mod",["two","three"],function(){});', parse("good1", good1));
            t.is(null, parse("bad1", bad1));   
        },
        
        function hasRequirePlugin(t) {
            var good1 = "var require; function(){ require = function(){}; require.plugin = function(){};}",
                bad1 = "var require; function(){ require.plugin(); }";

            t.is(true, parse.definesRequirePlugin("good1", good1));
            t.is(false, parse.definesRequirePlugin("bad1", bad1));   

        }
    ]
);
doh.run();