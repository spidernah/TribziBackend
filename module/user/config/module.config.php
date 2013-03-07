<?php
echo 'dirr '.__DIR__;
return array(
    'controllers' => array(
        'invokables' => array(
            'User\Controller\User' => 'User\Controller\UserController',
        ),
    ),

    'router' => array(
        'routes' => array(
            'user' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/user[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'user\Controller\User',
                        'action'     => 'Index',
                    ),
                ),
            ),
        ),
    ),

    'view_manager' => array(
//        'template_map' => array(
//            'user/user/index' => 'var/www/html/TribziBackend/module/user/view/user/user/index.phtml'
//            ),
        'template_map' => array(
            'user/user/Index' =>  __DIR__ .'/../view/user/user/Index.phtml',
            'user/user/login' =>  __DIR__ .'/../view/user/user/login.phtml',
            ),
        'template_path_stack' => array(
            'user' => __DIR__ . '/../view',
        ),
    ),
);