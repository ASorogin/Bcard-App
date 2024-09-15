import EditableContent from '../components/EditableContent';

const About = () => {
  return (
    <div className="container mt-5">
      <EditableContent id="about-company-name" defaultContent="BCard Solutions" type="heading" />
      
      <div className="row mb-5">
        <div className="col-md-6">
          <h2>About Us</h2>
          <EditableContent 
            id="about-description" 
            defaultContent="BCard Solutions is a leading provider of digital business card services. We help professionals and businesses create, manage, and share their contact information in a modern, efficient way." 
          />
          <h3>Our Mission</h3>
          <EditableContent 
            id="about-mission" 
            defaultContent="Our mission is to revolutionize networking by providing easy-to-use, customizable digital business cards that make a lasting impression." 
          />
        </div>
        <div className="col-md-6">
          <img
            src="/src/assets/ourTeam.jpeg"
            alt="Our Team"
            className="img-fluid rounded"
          />
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-4">
          <h3>Our Services</h3>
          <EditableContent 
            id="about-services" 
            defaultContent="
              • Custom digital business cards
              • Card management platform
              • Analytics and insights
              • Integration with CRM systems
            " 
          />
        </div>
        <div className="col-md-4">
          <h3>Why Choose Us</h3>
          <EditableContent 
            id="about-why-choose" 
            defaultContent="
              • User-friendly interface
              • Customizable designs
              • Secure data handling
              • Excellent customer support
            " 
          />
        </div>
        <div className="col-md-4">
          <h3>Contact Us</h3>
          <EditableContent 
            id="about-contact" 
            defaultContent="
              Email: info@bcardsolutions.com
              Phone: (123) 456-7890
              Address: 123 Business St, Tech City, TC 12345
            " 
          />
        </div>
      </div>
    </div>
  );
};

export default About;