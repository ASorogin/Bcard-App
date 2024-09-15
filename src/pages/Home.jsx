import { Link } from 'react-router-dom';
import EditableContent from '../components/EditableContent';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <EditableContent id="home-title" defaultContent="Welcome to BCard" type="heading" />
            <EditableContent id="home-description" defaultContent="Manage your business cards with ease. Create, edit, and share your professional information effortlessly." />
            <p>
              <Link to="/cards" className="btn btn-primary my-2 me-2">Get Started</Link>
              <Link to="/about" className="btn btn-secondary my-2">Learn More</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Key Features</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <EditableContent id="feature-1-title" defaultContent="Easy Creation" type="heading" />
            <EditableContent id="feature-1-description" defaultContent="Create professional business cards in minutes with our intuitive interface." />
          </div>
          <div className="feature col">
            <EditableContent id="feature-2-title" defaultContent="Smart Management" type="heading" />
            <EditableContent id="feature-2-description" defaultContent="Organize and manage all your business cards in one place." />
          </div>
          <div className="feature col">
            <EditableContent id="feature-3-title" defaultContent="Instant Sharing" type="heading" />
            <EditableContent id="feature-3-description" defaultContent="Share your business card digitally with anyone, anywhere, anytime." />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container px-4 py-5">
        <h2 className="pb-2 border-bottom">What Our Users Say</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="col">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>BCard has revolutionized how I network. Its so easy to use!</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                John Doe, <cite title="Source Title"/>CEO of TechCorp
              </figcaption>
            </figure>
          </div>
          <div className="col">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>I love how I can manage all my contacts in one place.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Jane Smith, <cite title="Source Title" />Freelance Designer
              </figcaption>
            </figure>
          </div>
          <div className="col">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>The digital sharing feature is a game-changer for me!</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Mike Johnson, <cite title="Source Title"/>Sales Manager
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h2 className="fw-light">Ready to Get Started?</h2>
            <p className="lead text-muted">Join thousands of professionals who are already using BCard to manage their business contacts.</p>
            <p>
              <Link to="/signup" className="btn btn-primary my-2">Sign Up Now</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;