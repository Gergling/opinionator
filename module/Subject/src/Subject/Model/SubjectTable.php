<?php
namespace Subject\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\Sql\Sql;
use Zend\Db\Sql\Expression;

class SubjectTable
{
    protected $tableGateway;

	public function __construct(TableGateway $tableGateway)
	{
		$this->tableGateway = $tableGateway;
	}

	public function fetchSubjects($filter = array()) {
		$filter = array_merge(array(
			"order" => array("label ASC"),
			"limit" => 5,
			"offset" => 0,
			"where" => array(),
		), $filter);
		$filter["limit"] = min(max($filter["limit"], 1), 100);

		$sql = new Sql($this->tableGateway->getAdapter());
		$select = $sql->select();
		foreach($filter["where"] as $name => $value) {
			$select->where->like($name, $value);
		}
		foreach($filter["order"] as $orderClause) {
			$select->order($orderClause);
		}
		$select->limit($filter["limit"]);
		$select->from('subject');
		$select->offset($filter["offset"]);
		$select->join("subject_opinion", "item_id = id", array(), $select::JOIN_LEFT);
		$select->where("type = 'subject' OR type IS NULL");
		$select->group(array("id"));
		$select->columns(array("id", "label", "description", "rating" => new Expression("SUM(IFNULL(rating, 0))")));

		/*$response = $this->tableGateway->select(function (Select $select) {
			$select->limit(1);
		});*/
		$statement = $sql->prepareStatementForSqlObject($select);
		//echo'<pre>';print_r($statement);echo'</pre>';
		$response = $statement->execute();
		return $response;
	}

    public function saveFleet(Fleet $fleet)
    {
        $data = array(
            'artist' => $fleet->artist,
            'title'  => $fleet->title,
        );

        $id = (int)$fleet->id;
        if ($id == 0) {
            $this->tableGateway->insert($data);
        } else {
            if ($this->getFleet($id)) {
                $this->tableGateway->update($data, array('id' => $id));
            } else {
                throw new \Exception('Form id does not exist');
            }
        }
    }

    public function deleteFleet($id)
    {
        $this->tableGateway->delete(array('id' => $id));
    }
}