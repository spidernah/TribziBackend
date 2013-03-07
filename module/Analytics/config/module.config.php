<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Analytics\Controller\Analytics' => 'Analytics\Controller\AnalyticsController',
        ),
    ),

    'router' => array(
        'routes' => array(
            'analytics' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/analytics[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Analytics\Controller\Analytics',
                        'action'     => 'index',
                    ),
                ),
            ),
        ),
    ),

    'view_manager' => array(

        'template_map' => array(
            'analytics/analytics/index' =>  __DIR__ .'/../view/analytics/analytics/index.phtml',
            ),
        'template_path_stack' => array(
            'user' => __DIR__ . '/../view',
        ),
    ),
);