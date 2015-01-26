(function() {
    'use strict';

    window.game = {};

    /**
     * Simple JavaScript Inheritance for ECMAScript 5.1 based on John Resig's code.
     * Inspired by base2 and Prototype.
     * @license MIT
     * @see http://ejohn.org/blog/simple-javascript-inheritance/
     * @see http://stackoverflow.com/questions/15050816/is-john-resigs-javascript-inheritance-snippet-deprecated
     */
    var testFn = /xyz/.test(function() {
        var xyz;
        return xyz;
    }) ? /\bparent\b/ : /.*/;

    // The base Class implementation (does nothing)
    window.game.Class = function() {};

    // Create a new Class that inherits from this class
    window.game.Class.extend = function(props) {
        var parent = this.prototype;

        // Instantiate a base class (but only create the instance, don't run the init constructor)
        var proto = Object.create(parent);

        var makeFn = function(name, fn) {
            return function() {
                var tmp = this.parent;

                // Add a new .parent() method that is the same method but on the super-class
                this.parent = parent[name];

                // The method only need to be bound temporarily, so we remove it when we're done executing
                var ret = fn.apply(this, arguments);
                this.parent = tmp;

                return ret;
            };
        };

        // Copy the properties over onto the new prototype
        for(var name in props) {
            // Check if we're overwriting an existing function
            proto[name] = (
                typeof props[name] === 'function' &&
                typeof parent[name] === 'function' &&
                testFn.test(props[name])
            ) ?
                makeFn(name, props[name]) :
                proto[name] = props[name];
        }

        // The new constructor
        var Class =
            typeof proto.init === 'function' ?
                proto.hasOwnProperty('init') ?
                    proto.init :
                function SubClass() { parent.init.apply(this, arguments); } :
            function EmptyClass() {};

        // Populate our constructed prototype object
        Class.prototype = proto;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = window.game.Class.extend;

        return Class;
    };
})();
