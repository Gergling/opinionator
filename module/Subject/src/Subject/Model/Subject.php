<?php
namespace Subject\Model;

//use Base\Model\BaseTable;

class Subject extends BaseTableClassExtension {
	public $id, $label, $description;
	public $sum, $total, $ratio;

	public function calculateRatio() {
		$r = 0;
		if ($this->total) {
			$r = $this->sum/$this->total;
		}
		$this->ratio = $r;
	}
}
