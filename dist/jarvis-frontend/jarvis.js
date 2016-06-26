'use strict';

var compileProvider = void 0,
    controllerProvider = void 0,
    filterProvider = void 0,
    provide = void 0,
    stateProvider = void 0;

// create  application module and store references to the compileProvider, controllerProvider, filterProvider, and provider
var Jarvis = angular.module('Jarvis', ['ui.router', 'uiRouterStyles', 'mgcrea.ngStrap'], function ($compileProvider, $controllerProvider, $filterProvider, $provide, $stateProvider) {
    compileProvider = $compileProvider;
    controllerProvider = $controllerProvider;
    filterProvider = $filterProvider;
    provide = $provide;
    stateProvider = $stateProvider;
});

var lazyAngular = {
    registerFactoryProvider: function registerFactoryProvider(factory) {
        provide.service.apply(null, factory);
    },
    registerFilterProvider: function registerFilterProvider(filter) {
        filterProvider.register.apply(null, filter);
    },
    registerDirective: function registerDirective(directive) {
        compileProvider.directive.apply(null, directive);
    },
    registerController: function registerController(controller) {
        controllerProvider.register.apply(null, controller);
    }
};

Jarvis.factory("lazyAngular", function () {
    return lazyAngular;
});