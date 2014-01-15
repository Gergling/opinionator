<?php
namespace Subject\Model;

//use Base\Model\BaseTable;

class Subject extends BaseItem {
	public $label, $description;
	public $sum, $total, $ratio;

	public function calculateRatio() {
		$r = 0;
		if ($this->total) {
			$r = $this->sum/$this->total;
		}
		$this->ratio = $r;
	}

	public function getFieldLabels() {
		return array(
			"label" => "Name",
			"description" => "Description",
			"sum" => "Sum",
			"total" => "Total",
			"ratio" => "Ratio",
		);
	}
}
