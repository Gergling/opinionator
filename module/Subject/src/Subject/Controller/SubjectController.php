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

	// By default, list all subjects
	public function listAction() {
		$sm = $this->getServiceLocator();
		$subjects = new SubjectCollection();
		$searchParams = array(); // get this from POST arguments.
		$searchParams["order"] = explode(":", $this->params()->fromQuery('orderString', 'label ASC'));
		//echo $this->params()->fromRoute('subject_id', 0);
		//echo'<pre>';print_r($searchParams["order"]);echo'</pre>';
		//echo'<pre>';print_r(array_keys(get_object_vars($this)));echo'</pre>';
		//print_r($_REQUEST);
		return new JsonModel(array(
			"subjects" => $subjects->fetchSubjects($sm, $searchParams),
			"page" => "Express the current page and the number of pages to maximise convenience. Most of that data will be required on this request anyway.",
			"request" => $_REQUEST,
			"orderString" => $this->params()->fromQuery('orderString', 'label ASC'),
			"get" => $_GET,
			"order" => $searchParams["order"],
		));
	}
	public function iconSmallAction() {
		echo"answer me";
		return new ViewModel(array(
			'stuff' => "stuuuuuuuuuuff",
		));
	}
	public function generateRandomOpinionsAction() {
		$totalOpinions = $this->getRequest()->getParam('number');
		if (!$totalOpinions) {$totalOpinions = 10;}
		$messageLines = array();
		echo "?: Generating {$totalOpinions} random opinions.\n";
		// Need to get list of subject ids.
		// Then add several opinions with a value of 1 or -1.
		// Randomly generate a user_id of maybe 8 letters. Overwrite opinions of the same ids.
		// Randomly select an item_id.
		return implode("\n", $messageLines)."\n";
	}
}
