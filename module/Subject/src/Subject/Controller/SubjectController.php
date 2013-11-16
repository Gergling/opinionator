<?php
namespace Subject\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;
use Subject\Model\SubjectCollection;
//use Build\Model;


// This requires an action to create new fleets, which must be done by transferring ships from old fleets.
// Such ships must have certain properties, such as light particle collection for maintenance.

class SubjectController extends AbstractActionController
{
	protected $fleetTable, $fleetBuildTable, $buildTable;

	// By default, list all subjects
	public function listAction() {
		$sm = $this->getServiceLocator();
		$subjects = new SubjectCollection();
		$searchParams = array(); // get this from POST arguments.
		return new JsonModel(array(
			"subjects" => $subjects->fetchSubjects($sm, $searchParams),
			"page" => "Express the current page and the number of pages to maximise convenience. Most of that data will be required on this request anyway.",
		));
	}


	private function dispatchAuthentication() {
		$this->getRequest()->getQuery()->set('redirect', $this->getRequest()->getRequestUri());
		return $this->forward()->dispatch('zfcuser', array('action' => 'login'));
	}
	public function getFleetTable() {
		if (!$this->fleetTable) {
			$sm = $this->getServiceLocator();
			$this->fleetTable = $sm->get('Fleet\Model\FleetTable');
			//$this->fleetTable->setDocumentManager($sm->get('doctrine.documentmanager.odm_default'));
		}
		return $this->fleetTable;
	}
}