



let services_glider     = document.getElementsByClassName('services-glider')[0];
let services_items      = document.getElementsByClassName('services-item');
let services_radios     = document.getElementsByClassName('services-tab-selector');


let timeout;
let sliderIndex = 0;
const covers = [...document.querySelectorAll('.photo-frame')];
let layer_images_first  = document.getElementsByClassName('layer-images-first');
let layer_images_second = document.getElementsByClassName('layer-images-second');
let layer_images_third = document.getElementsByClassName('layer-images-third');

let services_glider_features = 
[
    {
        "left": "0%",
        "background": "linear-gradient(60deg, hsl(202deg 100% 75%), hsl(205deg 100% 64%), hsl(230deg 100% 75%), hsl(270deg 100% 72%))",
        "box-shadow": "0px 0px 8px 0px #02ce85"
    },
    {
        "left": "33%",
        "background": "linear-gradient(70deg, hsl(270deg 100% 72%), #97389b, #c51574)",
        "box-shadow": "0px 0px 8px 0px #c51574"
    },
    {
        "left": "66%",
        "background": "linear-gradient(10deg, #c51574, #CC4033, #CC6633,  #f7ec9c)",
        "box-shadow": "0px 0px 8px 0px #CC6633"
    }

];


init_services(0);

for (let i = 0; i < services_radios.length; i++) {
    services_radios[i].addEventListener('click', function () {
        services_glider.style.left          = services_glider_features[i]["left"];
        services_glider.style.background    = services_glider_features[i]["background"];
        services_glider.style.boxShadow     = services_glider_features[i]["box-shadow"];
        init_services(i);
    });
}

function changeCoverAnimState(state = 0) {
    const st = state === 1 ? 'running' : 'paused';
    covers.forEach(cover => {
        cover.querySelector('.cover').style.width = `${state * 100}%`;
    });
}

function init_services(i) {
    services_glider.style.left          = services_glider_features[i]["left"];
    services_glider.style.background    = services_glider_features[i]["background"];
    services_glider.style.boxShadow     = services_glider_features[i]["box-shadow"];

    changeCoverAnimState(1);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        changeCoverAnimState(0)
    }, 500);

    for (let j = 0; j < services_items.length; j++) {

        // services_items[j].style.opacity       = 0;
        // services_items[j].style.visibility    = 'hidden';
        services_items[j].classList.remove('layer-displayed');
        services_items[j].classList.remove('layer-displayed-exit');

        layer_images_first[j].classList.remove('layer-displayed');
        layer_images_first[j].classList.remove('layer-displayed-exit');

        layer_images_second[j].classList.remove('layer-displayed');
        layer_images_second[j].classList.remove('layer-displayed-exit');

        layer_images_third[j].classList.remove('layer-displayed');
        layer_images_third[j].classList.remove('layer-displayed-exit');

        if (j == i) {
            // services_items[j].style.opacity       = 1;
            // services_items[j].style.visibility    = 'visible';
            services_items[j].classList.add('layer-displayed');

            layer_images_first[j].classList.add('layer-displayed');
            layer_images_second[j].classList.add('layer-displayed');
            layer_images_third[j].classList.add('layer-displayed');
        }
        if (j == sliderIndex) {

            services_items[j].classList.add('layer-displayed-exit');            
            layer_images_first[j].classList.add('layer-displayed-exit');
            layer_images_second[j].classList.add('layer-displayed-exit');
            layer_images_third[j].classList.add('layer-displayed-exit');
        }
        
    }
    sliderIndex = i;
}


let carousels_0_items = document.querySelectorAll('#services-carousel-0 .carousel-item');
let carousels_1_items = document.querySelectorAll('#services-carousel-1 .carousel-item');
let carousels_2_items = document.querySelectorAll('#services-carousel-2 .carousel-item');

carouselInit(carousels_0_items);
carouselInit(carousels_1_items);
carouselInit(carousels_2_items);


function carouselInit(items) {
    items.forEach((el) => {
        const minPerSlide = 3
        let next = el.nextElementSibling
        for (var i=1; i<minPerSlide; i++) {
            if (!next) {
                next = items[0]
            }
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
        }
    });
}