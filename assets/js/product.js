import 'lite-youtube-embed';
import BasePage from './base-page';
import Fslightbox from 'fslightbox';
import Slider from './partials/slider'
import ProductOptions from './partials/product-options';

window.fslightbox = Fslightbox;

class Product extends BasePage {
    onReady() {
        this.initSliders();
        new ProductOptions();

        app.watchElements({
            totalPrice : '#total-price',
            beforePrice: '#before-price',
        });

        //Toggale share menu
        app.onClick('.btn--share', ({target: btn}) => {
            let showShareMenu = !btn.classList.contains('opened'),
                shareMenu = document.querySelector('.share-btns-list');

            app.toggleElementClassIf(btn, 'opened', 'closed', () => showShareMenu)
                .toggleElementClassIf(btn.querySelector('i'), 'sicon-cancel', 'sicon-share-alt', () => showShareMenu)
                .toggleElementClassIf(shareMenu, 'h-auto', 'h-0 opacity-0', () => showShareMenu);

            if (!showShareMenu) {
                return;
            }

            (new anime.timeline())
                .add({
                    targets   : '.share-btns-list',
                    translateY: [-50, 0],
                    opacity   : [0, 1],
                    duration  : 300,
                    podding   : '0',
                    easing    : 'easeInOutSine'
                })
                .add({
                    targets   : '.share-btns-list li',
                    translateZ: 0,
                    translateY: [-30, 0],
                    scaleY    : [0, 1],
                    opacity   : [0, 1],
                    duration  : 1200,
                    delay     : anime.stagger(100)
                }, '-=200');
        });
    }

    registerEvents() {
        salla.product.event.onPriceUpdated((res) => {

            app.totalPrice.innerText = salla.money(res.data.price);

            app.anime('#total-price', {scale: [0.88, 1]});

            if (res.data.has_sale_price) {
                app.beforePrice.style.display = 'inline';
                app.beforePrice.innerText = salla.money(res.data.regular_price);
                return;
            }

            app.beforePrice && (app.beforePrice.style.display = 'none')
        });

        app.onClick('#btn-show-more', e => app.all('#more-content', div => {
            e.target.classList.add('is-expanded');
            div.style = `max-height:${div.scrollHeight}px`;
        }) || e.target.remove());
    }

    initSliders() {      
        if(document.querySelectorAll('.details-slider .swiper-slide').length > 1){
          let thumbsSlider = new Slider('.thumbs-slider', {
            freeMode: true,
            watchSlidesProgress: true,
           });

          let mainSlider = new Slider('.details-slider', {
              slidesPerView: 1,
              spaceBetween : 30,
              thumbs: {
                swiper: thumbsSlider.getSlider(),
              },
          });
      
          //when clicking product option form type image, move slider to same image
          app.onClick('.go-to-slide', e => mainSlider.slideTo(app.element(`[data-img-id*="${e.target.dataset.imgId}"]`).dataset.slidIndex, 0));
        }


        /*
          used in:
            1- similar-products.twig
            2- best offer home block (called again in home.js)
            3- product offer products slider/ cats slider / discount slider
        */
        new Slider('.default-slider');
    }
}

Product.intiateWhenReady('Product', ['product.single']);
