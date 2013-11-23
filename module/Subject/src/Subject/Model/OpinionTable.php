<?php
namespace Subject\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\Sql\Sql;
use Zend\Db\Sql\Expression;

class OpinionTable
{
    protected $tableGateway;

	public function __construct(TableGateway $tableGateway)
	{
		$this->tableGateway = $tableGateway;
	}

	public function fetchOpinion($user_id, $item_id, $type = "subject") {
		$sql = new Sql($this->tableGateway->getAdapter());
		$select = $sql->select();
		$select->where(array(
			"user_id" => $user_id,
			"item_id" => $item_id,
			"type" => $type,
		));
		//print_r(get_class_methods($this->tableGateway));
		//die();
		$select->from($this->tableGateway->getTable());

		$statement = $sql->prepareStatementForSqlObject($select);
		//echo'<pre>';print_r($statement);echo'</pre>';
		//die();
		$response = $statement->execute();
		foreach($response as $opinion) {
			return $opinion;
		}
		$opinion = new Opinion();
		$opinion->user_id = $user_id;
		$opinion->type = $type;
		$opinion->item_id = $item_id;
		$opinion->rating = 0;
		return $opinion;
	}
	public function save(Opinion $opinion) {
		$fields = $opinion->getArrayCopy();
		//unset($fields["rating"]);
		//echo implode(", ", $fields)."\n";
		$qry = "
			INSERT INTO subject_opinion 
			(`".implode("`, `", array_keys($fields))."`)
			VALUES ('".implode("', '", $fields)."')
			ON DUPLICATE KEY UPDATE rating=VALUES(rating)
		";
		$statement = $this->tableGateway->getAdapter()->query($qry);
		//print_r($qry);
		//die();
		return $statement->execute();
	}
}