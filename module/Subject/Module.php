<?php
namespace Subject;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\ResultSet\ResultSet;

use Subject\Model\Subject;
use Subject\Model\SubjectTable;

class Module
{
    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\ClassMapAutoloader' => array(
                __DIR__ . '/autoload_classmap.php',
            ),
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }
    public function getServiceConfig()
    {
        return array(
            'factories' => array(
                'Subject\Model\SubjectTable' =>  function($sm) {
                    $tableGateway = $sm->get('SubjectTableGateway');
                    $table = new SubjectTable($tableGateway);
                    return $table;
                },
                'SubjectTableGateway' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    //$resultSetPrototype->setArrayObjectPrototype(new Subject($sm));
                    $resultSetPrototype->setArrayObjectPrototype(new Subject());
                    return new TableGateway('subject', $dbAdapter, null, $resultSetPrototype);
                },
            ),
        );
    }

	public function getViewHelperConfig()
	{
		return array(
			'factories' => array(
				// The sad thing is, that the fleetbuildtable object gets instantiated the first time, then won't be instantiated again. I don't understand why this would be. Presumably I'm not passing the correct object.
				'getFleetManifestHTML' => function($sm) {return new \Fleet\View\Helper\FleetManifestView($sm);},
				//'getFleetBuildHTML' => function($sm) {return new \Fleet\View\Helper\FleetManifestView($sm);},
			),
		);
	}

	public function onBootstrap($e)
	{
		$eventManager        = $e->getApplication()->getEventManager();
		$eventManager->attach(\Zend\Mvc\MvcEvent::EVENT_DISPATCH, array($this, 'preDispatch'), 100);
	}
	public function preDispatch($e)
	{
		//do something
		//echo'faggotry';
		// I established that this function is called.

		// Check if player is logged in.
		// If not, show login screen.
		// If so, continue.
		//echo'<pre>';print_r($e);echo'</pre>';
		/*$app = $e->getApplication();
		$sm = $app->getServiceManager();
		$auth = $sm->get('zfcuser_auth_service');
		//theoretically $e->getTarget() is controller
		echo'<pre>';print_r($auth->getIdentity());echo'</pre>';
		if ($auth->hasIdentity()) {
			//echo $auth->getIdentity()->getEmail();
			echo'<pre>';print_r($auth->getIdentity());echo'</pre>';
		} else {
			echo 'login screen!';
		}*/
	}

}