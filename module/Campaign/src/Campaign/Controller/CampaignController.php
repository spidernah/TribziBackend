<?php

namespace Campaign\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Campaign\Form;

class CampaignController extends AbstractActionController
{
    public function page1Action()
    {
//        $request = $this->getRequest();
//        if ($request->isPost())
//        {
//            $post = $request->getPost();
//            if (isset($post['submit']))
//            {
//                return $this->redirect()->toRoute('campaign', array(
//                    'controller' => 'campaign',
//                    'action'     => 'page2'
//                ));
//            }
//        }

        $form = new \Campaign\Form\CampaignPage1Form();
//        $form->get('submit')->setValue('to page 2');

        return new ViewModel(array('form' => $form));
    }

    public function page2Action()
    {
        echo '=page2=';

        return new ViewModel(array());
    }

    public function page3Action()
    {
        echo '=page3=';

        return new ViewModel(array());
    }

    public function page4Action()
    {
        echo '=page4=';

        return new ViewModel(array());
    }
}
