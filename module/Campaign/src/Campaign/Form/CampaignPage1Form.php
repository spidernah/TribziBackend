<?php

namespace Campaign\Form;

use Zend\Form\Form;

class CampaignPage1Form extends Form
{
    public function __construct($name = null)
    {
        parent::__construct('Campaign builder - Step 1');
        $this->setAttribute('method', 'post');

        $this->add(array(

                       'type' => 'Zend\Form\Element\Radio',
                       'name' => 'CampaignType',
                       'options' => array(
                           'label' => 'Please choose one of the directions',
                           'value_options' => array(
                               '1' => '  Create new campaign',
                               '2' => '  Edit existing',
                           ),
                       ),
                       'attributes' => array(
                           'value' => '1' //set checked to '1'
                       )
                   ));

        $this->add(array(

                       'type' => 'Zend\Form\Element\Select',
                       'name' => 'CampaignId',
                       'options' => array(
                           'label' => 'Please choose a campaign  ',
                           'value_options' => array(
                               '1' => '  Create new campaign',
                               '2' => '  Edit existing',
                           ),
                       ),
                       'attributes' => array(
                           'value' => '1' //set checked to '1'
                       )
                   ));

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
