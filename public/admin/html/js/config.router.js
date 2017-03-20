'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams','$templateCache', '$cookieStore',
      function ($rootScope,   $state,   $stateParams, $templateCache, $cookieStore) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
  
          $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams){
        	  
        	  
        	  var currentUser = $cookieStore.get("currentUser");
        	  
        	  
        	  if (toState.authenticate && typeof currentUser === 'undefined') {
              // User isn’t authenticated
              $state.transitionTo("access.signin");
              event.preventDefault(); 
        	  }
          });
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
          var layout = "tpl/app.html";

          $urlRouterProvider.when('','/access/signin');
          $urlRouterProvider.otherwise('/access/404');
          
          $stateProvider
	          .state('access', {
	              url: '/access',
	              template: '<div ui-view class="fade-in-right-big smooth"></div>'
	          })
	          .state('access.signin', {
	              url: '/signin',
	              templateUrl: 'tpl/page_signin.html'
	          })
            .state('access.404', {
                url: '/404',
                templateUrl: 'tpl/page_404.html'
            })          
            .state('access.500', {
                url: '/500',
                templateUrl: 'tpl/page_500.html'
            })          
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: layout
              })
              .state('app.member', {
            	  abstract: true,
                  url: '/member',
                  templateUrl: 'tpl/page_member.html'
              })
	              .state('app.member.list', {
	            	  url : '/list?page&searchText',
	                  templateUrl: 'tpl/page_member_list.html',
	                  authenticate : true
	              })              
	              .state('app.member.detail', {
	                  url: '/detail/:userId',
	                  templateUrl: 'tpl/page_member_detail.html',
	                  authenticate : true
	              })           
	              
              .state('app.contact', {
            	  abstract: true,
                  url: '/contact',
                  templateUrl: 'tpl/page_contact.html'
              })
	              .state('app.contact.list', {
	            	  url : '/list?page&searchText',
	                  templateUrl: 'tpl/page_contact_list.html',
	                  authenticate : true
	              })              
	              .state('app.contact.detail', {
	                  url: '/detail/:contactId',
	                  templateUrl: 'tpl/page_contact_detail.html',
	                  authenticate : true
	              })       
	              
              .state('app.fcContact', {
            	  abstract: true,
                  url: '/fcContact',
                  templateUrl: 'tpl/page_fcContact.html'
              })
	              .state('app.fcContact.list', {
	            	  url : '/list?page&searchText',
	                  templateUrl: 'tpl/page_fcContact_list.html',
	                  authenticate : true
	              })              
	              .state('app.fcContact.detail', {
	                  url: '/detail/:contactId',
	                  templateUrl: 'tpl/page_fcContact_detail.html',
	                  authenticate : true
	              })       
	              
	              
              .state('app.fcRequest', {
            	  abstract: true,
                  url: '/fcRequest',
                  templateUrl: 'tpl/page_fcRequest.html'
              })
	              .state('app.fcRequest.list', {
	            	  url : '/list?page&searchText',
	                  templateUrl: 'tpl/page_fcRequest_list.html',
	                  authenticate : true
	              })              
	              .state('app.fcRequest.detail', {
	                  url: '/detail/:requestId',
	                  templateUrl: 'tpl/page_fcRequest_detail.html',
	                  authenticate : true
	              })       
	              
              .state('app.board', {
            	  abstract: true,
                  url: '/board',
                  templateUrl: 'tpl/page_board.html'
              })
              	.state('app.board.list', {
              		url : '/list?boardId&page&searchText',
              		templateUrl: 'tpl/page_board_list.html'	
              	})
              	.state('app.board.detail', {
              		url: '/detail/:boardSeq',
              		templateUrl: 'tpl/page_board_detail.html',
              	})
              	.state('app.board.write', {
              		url:'/detail?boardId',
              		templateUrl: 'tpl/page_board_detail.html'
              	})
              	
              	
              	
              .state('app.product', {
                  abstract: true,
                  url: '/product',
                  templateUrl: 'tpl/page_product.html'
              })
                .state('app.product.list', {
                    url: '/list?page&searchText&categoryId',
                    templateUrl: 'tpl/page_product_list.html'
                })
                .state('app.product.detail', {
                    url: '/detail/:productId',
                    templateUrl: 'tpl/page_product_detail.html'
                })
                .state('app.product.write', {
                    url: '/detail',
                    templateUrl: 'tpl/page_product_detail.html'
                })
                
              .state('app.category', {
                  abstract: true,
                  url: '/category',
                  templateUrl: 'tpl/page_category.html'
              })
                .state('app.category.list', {
                    url: '/list?page&searchText',
                    templateUrl: 'tpl/page_category_list.html'
                })
                .state('app.category.detail', {
                    url: '/detail/:categoryId',
                    templateUrl: 'tpl/page_category_detail.html'
                })
                .state('app.category.write', {
                    url: '/detail',
                    templateUrl: 'tpl/page_category_detail.html'
                })
                
              .state('app.order', {
                  abstract: true,
                  url: '/order',
                  templateUrl: 'tpl/page_order.html'
              })
                .state('app.order.list', {
                    url: '/list?orderStatus&page&searchText&unread&searchProduct',
                    templateUrl: 'tpl/page_order_list.html'
                })
                .state('app.order.detail', {
                    url: '/detail/:orderId',
                    templateUrl: 'tpl/page_order_detail.html'
                })
              .state('app.orderContact', {
                  abstract: true,
                  url: '/orderContact',
                  templateUrl: 'tpl/page_orderContact.html'
              });
          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        if(JQ_CONFIG[src]){
                          return $ocLazyLoad.load(JQ_CONFIG[src]);
                        }
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            name = module.name;
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }


      }
    ]
  );
