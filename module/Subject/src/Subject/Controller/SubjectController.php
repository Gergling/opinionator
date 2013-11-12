<?php
namespace Subject\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Subject\Model;
//use Build\Model;


// This requires an action to create new fleets, which must be done by transferring ships from old fleets.
// Such ships must have certain properties, such as light particle collection for maintenance.

class SubjectController extends AbstractActionController
{
	protected $fleetTable, $fleetBuildTable, $buildTable;

	// By default, list all fleets
	public function indexAction() {
		$user_id = $this->getAuthUserId();
		echo $user_id;
		if ($user_id > 0) {
			// User is logged in
			$fleet_id = (int) $this->params()->fromRoute('fleet_id', 0);
			if ($fleet_id) {
				// Fleet id is specified, so go to fleet overview
				return $this->forward()->dispatch('Fleet\Controller\Fleet', array(
					'fleet_id' => $fleet_id, 
					'action' => 'overview'
				));
			} else {
				return new ViewModel(array(
					'fleets' => $this->getFleetTable()->fetchForPlayer(1),
				));
			}
		} else {
			// Forward to login action
			//return $this->forward()->dispatch('zfcuser', array('action' => 'authenticate'));
			return $this->dispatchAuthentication();
		}
	}

	// Overview of specific fleet
	public function overviewAction() {
		$user_id = $this->getAuthUserId();
		if ($user_id) {
			$fleet_id = (int) $this->params()->fromRoute('fleet_id', 0);
			if ($this->isFleetOwner($fleet_id, $user_id)) {
				$fleet = $this->getFleetTable()->fetchFleet($fleet_id);
				return new ViewModel(array('fleet' => $fleet));
			} else {
				$this->getResponse()->setStatusCode(404);
				return;
			}
		} else {
			return $this->dispatchAuthentication();
		}
	}

	// HTML fragment, shows all builds in fleet
	public function manifestAction() {
		$user_id = $this->getAuthUserId();
		if ($user_id) {
			$fleet_id = (int) $this->params()->fromRoute('fleet_id', 0);
			if ($this->isFleetOwner($fleet_id, $user_id)) {
				$fleet = $this->getFleetTable()->fetchFleet($fleet_id);
				// Shows 'pure' html output.
				$build_id = (int) $this->params()->fromRoute('build_id', 0);
				$viewModel = null;
				if ($build_id) {
					// If there is a build id, re-route to manifest row.
					$viewModel = $this->forward()->dispatch('Fleet\Controller\Fleet', array(
						'fleet_id' => $fleet_id, 
						'action' => 'manifestRow',
						'build_id' => $build_id,
					));
				} else {
					$fleetbuilds = $this->getFleetBuildTable()->fetchFleetBuilds($fleet_id);
					$builds = array();
					foreach($fleetbuilds as $fb) {
						$builds[$fb->build_id] = new \stdClass();
						$builds[$fb->build_id]->fleetbuild = $fb;
						$builds[$fb->build_id]->build = $this->getBuildTable()->fetchBuild($fb->build_id);
					}
					$viewModel = new ViewModel(array('fleet' => $fleet, 'fleetbuilds' => $builds));
				}
				$viewModel->setTerminal(true);
				return $viewModel;
			} else {
				// May be worth custom-building the 404... or finding a more generic way to do that... not sure how, still.
				$this->getResponse()->setStatusCode(404);
				$this->getResponse()->setTerminal(true);
				return;
			}
		} else {
			// TODO: Return plain API 403 error
			$dispatch = $this->dispatchAuthentication();
			return $dispatch;
		}
	}

	// This row is specific to the selected fleet AND a specific build. The quantity comes with it.
	public function manifestRowAction() {
		$user_id = $this->getAuthUserId();
		if ($user_id) {
			$fleet_id = (int) $this->params()->fromRoute('fleet_id', 0);
			if ($this->isFleetOwner($fleet_id, $user_id)) {
				$fleet = $this->getFleetTable()->fetchFleet($fleet_id);
				// Shows 'pure' html output.
				$build_id = (int) $this->params()->fromRoute('build_id', 0);
				$fleetbuild = $this->getFleetBuildTable()->fetchFleetBuild($fleet_id, $build_id);
				// Need to get fleet build object for this fleet id/build id.
				$viewModel = new ViewModel(array(
					'build' => $this->getBuildTable()->fetchBuild($build_id), 
					'fleetbuild' => $fleetbuild,
				));
				$viewModel->setTerminal(true);
				return $viewModel;
			} else {
				// May be worth custom-building the 404... or finding a more generic way to do that... not sure how, still.
				$this->getResponse()->setStatusCode(404);
				$this->getResponse()->setTerminal(true);
				return;
			}
		} else {
			// Could probably make a plain 403, which will not include a login screen, since this is basically an API request.
			// TODO: Return plain API 403 error
			$dispatch = $this->dispatchAuthentication();
			//$dispatch->setTerminal(true); // No idea if this will work.
			// Try: $this->getResponse()->setTerminal(true);
			return $dispatch;
		}
	}

	public function accessdeniedAction() {
		// Return raw page which says you cannot access whatever is being requested. Might be worth putting in application module?
		// Or appending to zfcuser? I don't know what options are available there.
	}

	private function getAuthUserId() {
		if ($this->zfcUserAuthentication()->hasIdentity()) {
			return $this->zfcUserAuthentication()->getIdentity()->getId();
		} else {
			return 0; // No logged in user.
		}
	}
	private function isFleetOwner($fleet_id, $user_id) {
		return $this->getFleetTable()->fetchIsFleetOwner($fleet_id, $user_id);
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
	public function getFleetBuildTable() {
		if (!$this->fleetBuildTable) {
			$sm = $this->getServiceLocator();
			$this->fleetBuildTable = $sm->get('Fleet\Model\FleetBuildTable');
		}
		return $this->fleetBuildTable;
	}
	public function getBuildTable() {
		if (!$this->buildTable) {
			$sm = $this->getServiceLocator();
			$this->buildTable = $sm->get('Build\Model\BuildTable');
		}
		return $this->buildTable;
	}
}