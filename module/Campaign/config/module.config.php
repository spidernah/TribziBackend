<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Campaign\Controller\Campaign' => 'Campaign\Controller\CampaignController',
        ),
    ),

    'router' => array(
        'routes' => array(
            'campaign' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/campaign[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'campaign\Controller\Campaign',
                        'action'     => 'page1',
                    ),
                ),
            ),
        ),
    ),

    'view_manager' => array(

        'template_map' => array(
            'campaign/campaign/page1' =>  __DIR__ .'/../view/campaign/campaign/page1.phtml',
            'campaign/campaign/page2' =>  __DIR__ .'/../view/campaign/campaign/page2.phtml',
            'campaign/campaign/page3' =>  __DIR__ .'/../view/campaign/campaign/page3.phtml',
            'campaign/campaign/page4' =>  __DIR__ .'/../view/campaign/campaign/page4.phtml',
            ),
        'template_path_stack' => array(
            'campaign' => __DIR__ . '/../view',
        ),
    ),
);