<?php
namespace Subject\Model;

//use Base\Model\BaseTable;

class SubjectCollection {
	private $subjects = array();

	public function fetchSubjects($sm, $filter = array()) {
		$subjectResults = $sm->get('Subject\Model\SubjectTable')->fetchSubjects($filter);
		foreach($subjectResults as $item) {
			$this->subjects[] = $item;
		}
		return $this->subjects;
	}
}
