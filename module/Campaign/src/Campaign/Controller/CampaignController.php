<?php

namespace Campaign\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Campaign\Form;
use Campaign\Model\Entity;

class CampaignController extends AbstractActionController
{
    private function bindObject($form)
    {
        $request = $this->getRequest();
        if ($request->isPost())
        {
            //get data from post fields
            $data = $request->getPost();
            //apply data to form
            $form->setData($data);

        }

        return $form;
    }

    public function page1Action()
    {
        return new ViewModel(array('form' => $this->bindObject(new \Campaign\Form\CampaignPage1Form())));
    }

    public function page2Action()
    {
        return new ViewModel(array('form' => $this->bindObject(new \Campaign\Form\CampaignPage2Form())));
    }

    public function page3Action()
    {
        return new ViewModel(array('form' => $this->bindObject(new \Campaign\Form\CampaignPage3Form())));
    }

    public function page4Action()
    {
        return new ViewModel(array('form' => $this->bindObject(new \Campaign\Form\CampaignPage4Form())));
    }

    public function campaignSaveAction()
    {
        $request = $this->getRequest();
        if ($request->isPost())
        {
            //get data from post fields
            $data = $request->getPost();

            $campaign = new \Campaign\Model\Entity\CampaignView($data);

            $this->buildAndSendCampaignToApi($campaign);
        }

        //deserialize from form fields and save campaign
        return $this->redirect()->toRoute('user');

    }

    private function buildAndSendCampaignToApi($campaign)
    {
        //create catbee campaign object array and send to api(use /catbee/components/client/CatBeeClient.php)
    }
}
