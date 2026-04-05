import Kapsule from 'kapsule';

export default Kapsule({
    init(el) {
      el.nextElementSibling && el.parentNode.appendChild(el);
    }
});