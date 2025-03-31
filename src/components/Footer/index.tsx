import '@styles/components/Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <div className="footer__contact">
            <a href="tel:+74993916669" className="footer__phone">+7 499 391-66-69</a>
          </div>
          <div className="footer__contact">
            <a href="mailto:mail@greensight.ru" className="footer__email">mail@greensight.ru</a>
          </div>
        </div>
        <div className="footer__right">
          <div className="footer__address">
            322A, 2nd Floor, Zelenograd, Moscow, Russia
          </div>
          <div className="footer__directions">
            <a href="#" className="footer__directions-link">Directions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;