<?php

namespace Analytics\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class AnalyticsController extends  AbstractActionController
{
    public function indexAction()
    {
        return new ViewModel(array());
    }
}
