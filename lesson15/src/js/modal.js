//modal
export function modal() {
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        rip = document.querySelectorAll('.description-btn'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';

    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';

    });
    rip.forEach((item) => {
        item.addEventListener('click', function () {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            close.classList.remove('more-splash');
            document.body.style.overflow = 'hidden';

        });
    });
}
