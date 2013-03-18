<?php

namespace Campaign\Model\Entity;

class CampaignView
{
    protected $_id;
    protected $_uid;
    protected $_name;
    protected $_limitedByAmount;
    protected $_amountLowBound;
    protected $_campaignFriendLanding;
    protected $_campaignStarts;
    protected $_campaignEnds;
    protected $_leaderRewardType;
    protected $_leaderIncentiveType;
    protected $_leaderIncentiveAction;
    protected $_leaderShowAsPercent;
    protected $_leaderShowAsAmount;
    protected $_leaderMaxValue;
    protected $_leaderMinValue;
    protected $_leaderCouponBase;
    protected $_friendIncentiveType;
    protected $_friendIncentiveAction;
    protected $_friendExpiresDays;
    protected $_friendMaxValue;
    protected $_friendMinValue;
    protected $_friendCouponBase;

    public function __construct(array $options = null)
    {
        if (is_array($options)) {
            $this->setOptions($options);
        }
    }

    public function setOptions(array $options) {
        $methods = get_class_methods($this);
        foreach ($options as $key => $value) {
            $method = 'set' . ucfirst($key);
            if (in_array($method, $methods)) {
                $this->$method($value);
            }
        }
        return $this;
    }

    public function getId() {
        return $this->_id;
    }

    public function setId($id) {
        $this->_id = $id;
        return $this;
    }

    public function getUid() {
        return $this->_id;
    }

    public function setUid($id) {
        $this->_id = $id;
        return $this;
    }

    public function getName() {
        return $this->_name;
    }

    public function setName($val) {
        $this->_name = $val;
        return $this;
    }

    public function getLimitedByAmount() {
        return $this->_limitedByAmount;
    }

    public function setLimitedByAmount($val) {
        $this->_limitedByAmount = $val;
        return $this;
    }

    public function getAmountLowBound() {
        return $this->_amountLowBound;
    }

    public function setAmountLowBound($val) {
        $this->_amountLowBound = $val;
        return $this;
    }

    public function getCampaignFriendLanding() {
        return $this->_campaignFriendLanding;
    }

    public function setCampaignFriendLanding($val) {
        $this->_campaignFriendLanding = $val;
        return $this;
    }

    public function getCampaignStarts() {
        return $this->_campaignStarts;
    }

    public function setCampaignStarts($val) {
        $this->_campaignStarts = $val;
        return $this;
    }

    public function getCampaignEnds() {
        return $this->_campaignEnds;
    }

    public function setCampaignEnds($val) {
        $this->_campaignEnds = $val;
        return $this;
    }

    public function getLeaderRewardType() {
        return $this->_leaderRewardType;
    }

    public function setLeaderRewardType($val) {
        $this->_leaderRewardType = $val;
        return $this;
    }


}
