<?php
namespace Subject\Model;

class Opinion extends BaseItem {
	public $user_id, $type, $item_id, $rating;
	
	/*public function __construct() {unset($this->id);}
	public function setID($user_id, $type, $item_id) {
		$this->user_id = $user_id;
		$this->type = $type;
		$this->item_id = $item_id;
	}
	public function getID() {return implode("-", array(
		$this->user_id,
		$this->type,
		$this->item_id,
	));}*/
	public function getArrayCopy() {
		$vars = get_object_vars($this);
		unset($vars["id"]);
		return $vars;
	}

	public function rateUp($rateUp) {
		$this->rating = $rateUp?1:-1;
	}
}
