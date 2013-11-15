<?php
namespace Subject;

return array(
	'controllers' => array(
		'invokables' => array(
			'Subject\Controller\Subject' => 'Subject\Controller\SubjectController',
		),
	),
	'router' => array(
		'routes' => array(
			'subject' => array(
				'type'    => 'literal',
				'options' => array(
					'route'    => '/subject',
					'defaults' => array(
						'controller' => 'Subject\Controller\Subject',
						'action'     => 'list',
					),
				),
				'may_terminate' => true,
				'child_routes' => array(
					'view' => array(
						'type' => 'segment',
						'options' => array(
							'route' => '/view/:subject_id',
							'constraints' => array(
								'subject_id' => '[0-9]+',
							),
						),
					),
					'create' => array(
						'type' => 'segment',
						'options' => array(
							'route' => '/create',
						),
					),
					'opinion' => array(
						'type' => 'segment',
						'options' => array(
							'route' => '/opinion/:type/:id',
							'constraints' => array(
								'type' => '[a-zA-Z0-9]+',
								'id' => '[0-9]+',
							),
						),
					),
					'review' => array(
						'type' => 'segment',
						'options' => array(
							'route' => '/review',
						),
						'may_terminate' => true,
						'child_routes' => array(
							'view' => array(
								'type' => 'segment',
								'options' => array(
									'route' => '/view/:id',
									'constraints' => array(
										'id' => '[0-9]+',
									),
								),
							),
							'create' => array(
								'type' => 'segment',
								'options' => array(
									'route' => '/create',
								),
							),
						),
					),
					'group' => array(
						'type' => 'segment',
						'options' => array(
							'route' => '/group/:group_id/:subject_id',
							'constraints' => array(
								'group_id' => '[0-9]+',
								'subject_id' => '[0-9]+',
							),
						),
					),
				),
			),
		),
	),
    'view_manager' => array(
        'template_map' => array(
		'error/404' => __DIR__ . '/../view/error/404.phtml',
	),
        'template_path_stack' => array(
            'subject' => __DIR__ . '/../view',
        ),
	'strategies' => array(
		'ViewJsonStrategy',
        ),
	'not_found_template' => 'error/404',
    ),
	/*'view_helpers' => array(
		'factories' => array(
		),
		'invokables' => array(
			//'getFleetManifestHTML' => 'Fleet\View\Helper\FleetManifestView',
			'getFleetBuildHTML' => 'Fleet\View\Helper\FleetBuildView',
			'getFleetBuildDetailHTML' => 'Fleet\View\Helper\FleetBuildDetailView',
			'getFleetUICookieJS' => 'Fleet\View\Helper\FleetUICookieJS',
		),
	),*/
);