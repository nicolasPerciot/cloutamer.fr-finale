<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

include_once(__DIR__.'/../Common/conf.php');

class RootController extends AbstractController
{

    // private function initRender($view, $data){
    //     if(!isset($_SESSION['screenSize'])){
            
    //     }
    // }

    #[Route('/', name: 'home')]
    public function index(): Response
    {
        // $locale = $request->getPreferredLanguage(['fr', 'en']);

        $features               = json_decode(file_get_contents(PATH_FEATURES_JSON), true);

        // $featuresTranslated     = $this->translate($translator, $features, $locale);

        return $this->render('index.html.twig', array('features' => $features));
    }

    private function translate($translator, $array, $locale)
    {
        $arrayTranslated = [];
        foreach ($array as $key => $value) {
            if(!is_array($value)){
                $arrayTranslated[$key] = $translator->trans($value, [], null, $locale);
            }
            else{
                $arrayTranslated[$key] = $this->translate($translator, $value, $locale);
            }
        }
    }


    private function getImagesPortfolio($path){
        $images = array();
        foreach (glob($path."*") as $image) {
            if(is_file($image)){
                array_push($images, $this->getImgPath($image));
            }
        }
        return $images;
    }

    private function getImgPath($path){
        $explodePath        = explode("/", $path);

        unset($explodePath[0]);
        unset($explodePath[1]);

        $newPath         = implode("/", $explodePath);
        return $newPath;
    }
}
