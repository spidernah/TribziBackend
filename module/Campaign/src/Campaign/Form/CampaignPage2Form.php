<?php

namespace Campaign\Form;

use Zend\Form\Form;

class CampaignPage2Form extends Form
{
    public function __construct($name = null)
    {
        parent::__construct('Campaign builder - Step 2');
        $this->setAttribute('method', 'post');
//place here invisible fields
//place here fields and hints
        $this->add(array(
                       'name' => 'submit',
                       'attributes' => array(
                           'type'  => 'submit',
                           'value' => 'go',
                           'id' => 'submitbutton',
                       ),
                   ));



    }
}
