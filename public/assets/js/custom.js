

    const nav = document.querySelector('nav');
    const navTop = nav.offsetTop;

    function handleScroll() {
        if (window.scrollY > navTop) {
            nav.classList.add('fixed-nav');
            document.body.style.paddingTop = nav.offsetHeight+'px';
        } else {
            nav.classList.remove('fixed-nav');
            document.body.style.paddingTop = 0;
        }
    }

    window.addEventListener('scroll', handleScroll);
    document.getElementById('item');

console.log(123,nav)



