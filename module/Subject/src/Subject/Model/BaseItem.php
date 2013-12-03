<?php
namespace Subject\Model;

class BaseItem
{
	public $id;
	public function exchangeArray($data) {
		foreach($this->getArrayCopy() as $name => $junk) {
			$this->$name = (isset($data[$name])) ? $data[$name] : null;
		}
	}
	public function getArrayCopy() {
		return get_object_vars($this);
	}
	public function setID($id) {$this->id = $id;}
	public function getID() {return $this->id;}
}
