<?php
namespace Subject\Model;

//use Base\Model\BaseTable;

class SubjectCollection extends BaseCollection {
	//private $subjects = array();

	public function fetchSubjects($sm, $filter = array()) {
		$subjectResults = $sm->get('Subject\Model\SubjectTable')->fetchSubjects($filter);
		foreach($subjectResults as $itemData) {
			$subject = new Subject();
			$subject->exchangeArray($itemData);
			$subject->calculateRatio();
			$this->add($subject);
		}
		return $this;
	}
	/*public function add(Subject $subject) {
		$this->subjects[] = $subject;
	}*/
}
