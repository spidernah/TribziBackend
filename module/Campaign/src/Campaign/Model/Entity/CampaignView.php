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

    public function getLeaderIncentiveType() {
        return $this->_leaderIncentiveType;
    }

    public function setLeaderIncentiveType($val) {
        $this->_leaderIncentiveType = $val;
        return $this;
    }

    public function getLeaderIncentiveAction() {
        return $this->_leaderIncentiveAction;
    }

    public function setLeaderIncentiveAction($val) {
        $this->_leaderIncentiveAction = $val;
        return $this;
    }

    public function getLeaderShowAsPercent() {
        return $this->_leaderShowAsPercent;
    }

    public function setLeaderShowAsPercent($val) {
        $this->_leaderShowAsPercent = $val;
        return $this;
    }

    public function getLeaderShowAsAmount() {
        return $this->_leaderShowAsAmount;
    }

    public function setLeaderShowAsAmount($val) {
        $this->_leaderShowAsAmount = $val;
        return $this;
    }

    public function getLeaderMaxValue() {
        return $this->_leaderMaxValue;
    }

    public function setLeaderMaxValue($val) {
        $this->_leaderMaxValue = $val;
        return $this;
    }

    public function getLeaderMinValue() {
        return $this->_leaderMinValue;
    }

    public function setLeaderMinValue($val) {
        $this->_leaderMinValue = $val;
        return $this;
    }

    public function getLeaderCouponBase() {
        return $this->_leaderCouponBase;
    }

    public function setLeaderCouponBase($val) {
        $this->_leaderCouponBase = $val;
        return $this;
    }

    public function getFriendIncentiveType() {
        return $this->_friendIncentiveType;
    }

    public function setFriendIncentiveType($val) {
        $this->_friendIncentiveType = $val;
        return $this;
    }

    public function getFriendIncentiveAction() {
        return $this->_friendIncentiveAction;
    }

    public function setFriendIncentiveAction($val) {
        $this->_friendIncentiveAction = $val;
        return $this;
    }

    public function getFriendExpiresDays() {
        return $this->_friendExpiresDays;
    }

    public function setFriendExpiresDays($val) {
        $this->_friendExpiresDays = $val;
        return $this;
    }

    public function getFriendMaxValue() {
        return $this->_friendMaxValue;
    }

    public function setFriendMaxValue($val) {
        $this->_friendMaxValue = $val;
        return $this;
    }

    public function getFriendMinValue() {
        return $this->_friendMinValue;
    }

    public function setFriendMinValue($val) {
        $this->_friendMinValue = $val;
        return $this;
    }

    public function getFriendCouponBase() {
        return $this->_friendCouponBase;
    }

    public function setFriendCouponBase($val) {
        $this->_friendCouponBase = $val;
        return $this;
    }


}
