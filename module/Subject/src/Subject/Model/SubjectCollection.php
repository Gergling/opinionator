<?php
namespace Subject\Model;

//use Base\Model\BaseTable;

class SubjectCollection {
	private $subjects;

	/*public function __construct($sm) {
		$this->sm = $sm;
	}*/

	public function fetchSubjects($sm) {
		$this->subjects = $sm->get('Subject\Model\SubjectTable')->fetchSubjects();
		return $this->subjects;
	}
}
