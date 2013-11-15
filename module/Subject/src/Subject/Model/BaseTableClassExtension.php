<?php
namespace Subject\Model;

class BaseTableClassExtension
{
	/*public function __construct($sm) {
		$this->sm = $sm;
	}*/
	public function exchangeArray($data) {
		foreach($this->getArrayCopy() as $name => $junk) {
			$this->$name = (isset($data[$name])) ? $data[$name] : null;
		}
	}
	public function getArrayCopy() {
		return get_object_vars($this);
	}
}
