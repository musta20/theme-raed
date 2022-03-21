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
            quantityInput: '#product-quantity',
            totalPrice   : '#total-price',
            beforePrice  : '#before-price',
        });

        //Toggale share menu
        app.onClick('.btn--share', ({target: btn}) => {
            let showShareMenu = !btn.classList.contains('opened');

            app.toggleElementClassIf(btn, 'opened', 'closed', () => showShareMenu)
                .toggleElementClassIf(btn.querySelector('i'), 'sicon-cancel', 'sicon-share-alt', () => showShareMenu)
                .toggleElementClassIf(btn.nextElementSibling, 'h-auto', 'h-0 opacity-0', () => showShareMenu);

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
        //Workaround to fire data-on-change="product::get.price"
        let qunatityChanged = () => salla.document.event.fireEvent(app.quantityInput, 'change', {'bubbles': true});

        app.onClick('#btn-increase', () => app.quantityInput.value++ && qunatityChanged());
        app.onClick('#btn-decrease', () => app.quantityInput.value <= 1 || (app.quantityInput.value-- && qunatityChanged()));

        app.onClick('#btn-show-more', e => app.all('#more-content', div => {
            e.target.classList.add('is-expanded');
            div.style = `max-height:${div.scrollHeight}px`;
        }) || e.target.remove());

        salla.product.event.onPriceUpdated(res => {

            app.totalPrice.innerText = res.data.after;

            app.anime('#total-price', {scale: [0.88, 1]});

            if (res.data.before) {
                app.beforePrice.style.display = 'inline';
                app.beforePrice.innerText = res.data.before;
                return;
            }

            app.beforePrice && (app.beforePrice.style.display = 'none')
        });
    }

    initSliders() {
        let mini = new Slider('.mini', {
            slidesPerView        : 4,
            centeredSlides       : true,
            centeredSlidesBounds : true,
            freeMode             : false,
            watchSlidesProgress  : true,
            watchSlidesVisibility: true,
            watchOverflow        : true,
        });
        let main = new Slider('.details-slider', {
            slidesPerView : 1,
            centeredSlides: true,
            spaceBetween  : 30,
            thumbs        : {swiper: mini.getSlider()},
        });

        //when clicking product option form type image, move slider to same image
        app.onClick('.go-to-slide', e => main.slideTo(app.element(`[data-img-id*="${e.target.dataset.imgId}"]`).dataset.slidIndex, 0));


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
