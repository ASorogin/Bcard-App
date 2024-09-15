import { useTheme } from '../hooks/UseTheme';

const Footer = () => {
  const { darkMode } = useTheme();

  const footerClass = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  const linkClass = darkMode ? 'text-light' : 'text-dark';

  return (
    <footer className={`${footerClass} text-center text-lg-start mt-4`}>
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">BCard</h5>
            <p>
              Manage your business cards with ease. Create, edit, and share your professional information effortlessly.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className={linkClass}>FAQ</a>
              </li>
              <li>
                <a href="https://gifdb.com/images/high/friends-joey-lol-tj7s5zqavb6p7k7e.gif" className={linkClass}>Support</a>
              </li>
              <li>
                <a href="https://www.shutterstock.com/shutterstock/photos/1516329536/display_1500/stock-photo-photo-of-young-african-woman-hand-with-no-text-1516329536.jpg" className={linkClass}>Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Contact</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.google.com" className={linkClass}>Email</a>
              </li>
              <li>
                <a href="https://web.whatsapp.com" className={linkClass}>Phone</a>
              </li>
              <li>
                <a href="https://www.google.com/maps/place/תל+אביב-יפו%E2%80%AD/@32.0879248,34.8384455,13z/data=!3m1!4b1!4m6!3m5!1s0x151d4ca6193b7c1f:0xc1fb72a2c0963f90!8m2!3d32.0852999!4d34.7817676!16zL20vMDdxenY?entry=" className={linkClass}>Address</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}}>
        © 2023 BCard: 
        <a className={linkClass} href="https://bcard.com/"> bcard.com</a>
      </div>
    </footer>
  );
};

export default Footer;