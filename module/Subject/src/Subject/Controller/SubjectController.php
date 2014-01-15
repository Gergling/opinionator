<?php
namespace Subject\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;
use Subject\Model\SubjectCollection;
use Subject\Model\Subject;
//use Build\Model;


// This requires an action to create new fleets, which must be done by transferring ships from old fleets.
// Such ships must have certain properties, such as light particle collection for maintenance.

class SubjectController extends AbstractActionController
{

	// By default, list all subjects
	public function listAction() {
		$sm = $this->getServiceLocator();
		$subjectInstance = new Subject();
		$subjects = new SubjectCollection();
		$searchParams = array(); // get this from POST arguments.
		/*$order = explode(":", $this->params()->fromQuery('orderString', 'label ASC'));
		foreach($order as $fieldOrderString) {
			$fieldOrder = explode(" ", $fieldOrderString);
			$searchParams["order"][] = array(
				"name" => 
				"order" => 
			);
		}*/
		$searchParams["order"] = explode(":", $this->params()->fromQuery('orderString', 'label ASC'));
		$searchParams["limit"] = $this->params()->fromQuery('limit', 5);
		$searchParams["offset"] = $this->params()->fromQuery('offset', 0);
		$searchParams["whereString"] = $this->params()->fromQuery('whereString', '');
		//echo $this->params()->fromRoute('subject_id', 0);
		//echo'<pre>';print_r($searchParams["order"]);echo'</pre>';
		//echo'<pre>';print_r(array_keys(get_object_vars($this)));echo'</pre>';
		//print_r($_REQUEST);
		return new JsonModel(array(
			"subjects" => $subjects->fetchSubjects($sm, $searchParams)->getPureArray(),
			"page" => array(
				"current" => 1,
				"total" => 1,
			),
			"searchParams" => $searchParams,
			"columnLabels" => $subjectInstance->getFieldLabels(),
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
		
		$sm = $this->getServiceLocator();
		$opinionTable = $sm->get('Subject\Model\OpinionTable');

		$messageLines = array();

		echo "?: Generating {$totalOpinions} random opinions... ";

		// Need to get list of subject ids.
		$subjects = new SubjectCollection();
		$subjects->fetchSubjects($sm, array("limit" => 100));
		$subjectIds = array();
		foreach($subjects as $subject) {
			$subjectIds[] = $subject->getID();
		}

		// Then add several opinions with a value of 1 or -1.
		for($i=0;$i<$totalOpinions;$i++) {
			$subjectId = $subjectIds[array_rand($subjectIds)];
			$userId = rand(0, 10000);
			$opinion = $opinionTable->fetchOpinion($userId, $subjectId);
			if ($opinion) {
				$opinion->rateUp((rand(0, 1)>0.5));
			} else {
				print_r($opinion);
				die("For some reason there was no opinion object for the rating function to work.\n");
			}
			//print_r($opinion);
			$opinionTable->save($opinion);
		}
		echo "Done.\n";
		return implode("\n", $messageLines)."\n";
	}
}
