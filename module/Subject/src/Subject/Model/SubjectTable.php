<?php
namespace Fleet\Model;

use Zend\Db\TableGateway\TableGateway;

class FleetTable
{
    protected $tableGateway;

    public function __construct(TableGateway $tableGateway)
    {
        $this->tableGateway = $tableGateway;
    }

	public function fetchForPlayer($user_id)
	{
		// TODO: Specify user id for logged in user.
		$resultSet = $this->tableGateway->select(array("user_id" => $user_id));
		//$resultSet = $this->tableGateway->select();
		//echo'<pre>';print_r($resultSet);echo'</pre>';
		return $resultSet;
	}

    public function fetchFleet($id)
    {
        $id  = (int) $id;
        $rowset = $this->tableGateway->select(array('id' => $id));
        $row = $rowset->current();
        if (!$row) {
            throw new \Exception("Could not find row $id");
        }
        return $row;
    }
	public function fetchIsFleetOwner($fleet_id, $user_id) {
		$fleet_id  = (int) $fleet_id;
		$user_id  = (int) $user_id;
		$rowset = $this->tableGateway->select(array('id' => $fleet_id, 'user_id' => $user_id));
		$row = $rowset->current();
		if (!$row) {
			return false;
		}
		return true;

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