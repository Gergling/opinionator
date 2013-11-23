<?php

namespace Subject\Model;

class BaseCollection implements \IteratorAggregate {
	private $items = array();
	private $index = array();
	/*function populate($items, $class) {
		foreach($items as $obj) {
			$item = new $class();
			$item->set($obj->guid, $obj->name);
			//$this->items[$item->getID()] = $item;
			$this->add($item);
		}
	}*/
	public function getIterator() {
		return new \ArrayIterator( $this->items );
	}
	public function get($id) {
		if (isset($this->items[$id])) {
			return $this->items[$id];
		} else {
			throw new NoSuchItemException("No item in collection for '{$id}'.");
		}
	}
	/*public function getByName($name) {
		if (isset($this->index[$name])) {
			return $this->index[$name];
		} else {
			return array();
		}
	}*/
	public function add($item, $idFunction = "getID", $indexes = array()) {
		$id = $item->$idFunction();
		$this->items[$id] = &$item;
		foreach($indexes as $indexFieldName => $indexFunctionName) {
			$indexValue = $item->$indexFunctionName();
			if (!isset($this->index[$indexFieldName])) {
				$this->index[$indexFieldName] = array();
			}
			if (!isset($this->index[$indexFieldName][$indexValue])) {
				$this->index[$indexFieldName][$indexValue] = array();
			}
			$this->index[$indexFieldName][$indexValue][] = &$item;
		}
	}
	public function getBy($indexName, $value = null) {
		if ($value===null) {
			return $this->index[$indexName];
		} else {
			return $this->index[$indexName][$value];
		}
	}
	public function printTree($depth = 0, $showId = false) {
		foreach($this as $item) {
			$item->printLeaf($depth, $showId);
		}
	}
	public function getPureArray() {
		$ret = array();
		foreach($this as &$item) {
			$ret[] = &$item;
		}
		return $ret;
	}
}

class NoSuchItemException extends \Exception {}

?>
