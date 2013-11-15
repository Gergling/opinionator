<?php
namespace Subject\Model;

class OpinionCollection {
	private $opinions;

	public function fetchSubjectOpinions($sm, $subjectId) {
		$this->opinions = $sm->get('Subject\Model\OpinionTable')->fetchSubjectOpinions($subjectId);
		return $this->opinions;
	}
}
