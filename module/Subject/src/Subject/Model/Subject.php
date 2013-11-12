<?php
namespace Fleet\Model;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\Common\Collections\ArrayCollection;

use Player\Model\Player;

// To be converted to mongo object.

/** @ODM\Document(collection="fleet") */
class Fleet
{
	/** @ODM\Id */
	private $id;

	/*** @return the $id */
	public function getId() {return $this->id;}

	/*** @param field_type $id */
	public function setId($id) {$this->id = $id;}


	/** @ODM\Field(type="string") */
	private $name;

	/*** @return the $name */
	public function getName() {return $this->name;}

	/*** @param field_type $name */
	public function setName($name) {$this->name = $name;}

	/** @ODM\ReferenceOne(targetDocument="Player\Model\Player", inversedBy="fleets") */
	private $player;

	/*** @return the $player */
	public function getPlayer() {return $this->player;}

	/*** @param field_type $player */
	public function setPlayer(Player $player) {$this->player = $player;}

	/** @ODM\ReferenceMany(targetDocument="Fleet\Model\FleetBuild", mappedBy="fleet") */
	private $fleetbuilds;

	/*** @return the $fleetbuilds */
	public function getFleetBuilds() {return $this->fleetbuilds;}

	/*** @param field_type $fleets */
	public function addFleetBuild(FleetBuild $fleetbuild) {
		$this->fleetbuilds->add($fleetbuild);
		$fleet->setFleet($this);
	}

	public function __construct() {
		$this->fleetbuilds = new ArrayCollection();
	}

	/*private $sm, $fleetbuilds;

	public function __construct($sm) {
		$this->sm = $sm;
	}

	public function exchangeArray($data) {
		$this->id     = (isset($data['id'])) ? $data['id'] : null;
		$this->name = (isset($data['name'])) ? $data['name'] : null;
	}
	public function getArrayCopy() {
		return get_object_vars($this);
	}
	public function getFleetBuilds() {
		if (!$this->fleetbuilds) {
			$this->fleetbuilds = $this->sm->get('Fleet\Model\FleetBuildTable')->fetchFleetBuilds($this->id);
		}
		return $this->fleetbuilds;
	}*/
}