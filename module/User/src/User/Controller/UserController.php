<?php

namespace User\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Adapter\DbTable as AuthAdapter;
use Zend\Authentication\Result as Result;
use User\Form\LoginForm;

class UserController extends AbstractActionController
{
    public function indexAction()
    {
        $auth = new AuthenticationService();

        $identity = null;
        if ($auth->hasIdentity()) {
            // Identity exists; get it
            $identity = $auth->getIdentity();
        }

        return array(
            'identity' => $identity,
        );
    }

    public function loginAction()
    {
        $form = new LoginForm();

        $request = $this->getRequest();
        if ($request->isPost()) {
            // get post data
            $post = $request->getPost();

            // get the db adapter
            $sm = $this->getServiceLocator();
            $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');

            // create auth adapter
            $authAdapter = new AuthAdapter($dbAdapter);

            // configure auth adapter
            $authAdapter->setTableName('user')
                ->setIdentityColumn('username')
                ->setCredentialColumn('password');

            // pass authentication information to auth adapter
            $authAdapter->setIdentity($post->get('username'))
                ->setCredential(md5($post->get('password')));

            // create auth service and set adapter
            // auth services provides storage after authenticate
            $authService = new AuthenticationService();
            $authService->setAdapter($authAdapter);

            // authenticate
            $result = $authService->authenticate();

            // check if authentication was successful
            // if authentication was successful, user information is stored automatically by adapter
            if ($result->isValid()) {
                // redirect to user index page
                return $this->redirect()->toRoute('user');
            } else {
                switch ($result->getCode()) {
                    case Result::FAILURE_IDENTITY_NOT_FOUND:
                        /** do stuff for nonexistent identity * */
                        break;

                    case Result::FAILURE_CREDENTIAL_INVALID:
                        /** do stuff for invalid credential * */
                        break;

                    case Result::SUCCESS:
                        /** do stuff for successful authentication * */
                        break;

                    default:
                        /** do stuff for other failure * */
                        break;
                }
            }
        }

        return array('form' => $form);
    }

    public function logoutAction()
    {
        $auth = new AuthenticationService();
        $auth->clearIdentity();

        return $this->redirect()->toRoute('user');
    }
}