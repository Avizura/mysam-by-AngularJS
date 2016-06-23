let compileProvider,
        controllerProvider,
        filterProvider,
        provide,
        stateProvider;

// create  application module and store references to the compileProvider, controllerProvider, filterProvider, and provider
let Jarvis = angular.module('Jarvis', ['ui.router', 'uiRouterStyles', 'mgcrea.ngStrap'], ($compileProvider, $controllerProvider, $filterProvider, $provide, $stateProvider) => {
    compileProvider = $compileProvider;
    controllerProvider = $controllerProvider;
    filterProvider = $filterProvider;
    provide = $provide;
    stateProvider = $stateProvider;
});

let lazyAngular = {
          registerFactoryProvider: function(factory) {
              provide.service.apply(null, factory);
          },
          registerFilterProvider: function(filter) {
              filterProvider.register.apply(null, filter);
          },
          registerDirective  : function (directive) {
              compileProvider.directive.apply(null, directive);
          },
          registerController : function (controller) {
              controllerProvider.register.apply(null, controller);
          }
      };

  Jarvis.factory("lazyAngular", function () {
      return lazyAngular ;
  });
