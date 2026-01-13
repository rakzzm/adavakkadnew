import Link from 'next/link';

export default function About() {
  return (
    <>
      {/* Hero Section (Moved from Home) */}
      <section className="hero" id="about-hero">
        <div className="hero-video-container">
          <video autoPlay muted loop playsInline className="hero-video">
            <source src="/VIdeo/Clothing_Store_Video_Generation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <h1>Welcome to Advakkad Collections</h1>
          <p>
            Discover the finest collection of traditional and modern clothing for every occasion. 
            Experience quality, style, and elegance.
          </p>
          <div className="hero-buttons">
            <Link href="/products">
              <button className="btn btn-primary">Shop Now</button>
            </Link>
            <Link href="/contact">
              <button className="btn btn-secondary">Contact Us</button>
            </Link>
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Advakkad Collections</h2>
          <p className="section-subtitle">
            Your trusted destination for quality clothing and fashion
          </p>
        </div>

        {/* About Us Story */}
        <div className="card mb-3">
          <h3>Our Story</h3>
          <p>
            Advakkad Collections has been a cornerstone of the local fashion community, 
            bringing quality clothing and exceptional service to our valued customers. 
            We pride ourselves on offering a diverse range of apparel that caters to 
            every member of the family.
          </p>
          <p>
            From traditional wear to contemporary fashion, our carefully curated 
            collections reflect our commitment to quality, style, and affordability. 
            We believe that everyone deserves to look and feel their best, and our 
            extensive selection ensures that you&apos;ll find the perfect outfit for any occasion.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-2">
          <div className="card">
            <h3>Our Mission</h3>
            <p>
              To provide our customers with high-quality clothing that combines 
              style, comfort, and value. We strive to make fashion accessible to 
              everyone while maintaining the highest standards of quality and 
              customer service.
            </p>
            <p>
              We are committed to understanding our customers&apos; needs and delivering 
              clothing solutions that enhance their wardrobe and boost their confidence.
            </p>
          </div>

          <div className="card">
            <h3>Our Vision</h3>
            <p>
              To be the most trusted and preferred clothing destination in our 
              community, known for our exceptional quality, diverse collections, 
              and outstanding customer experience.
            </p>
            <p>
              We envision expanding our offerings to include the latest fashion 
              trends while staying true to our roots of providing traditional 
              and festive wear that celebrates our cultural heritage.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="card mt-3">
          <h3 className="text-center">Why Choose Advakkad Collections?</h3>
          <div className="grid grid-3 mt-2">
            <div>
              <h4 className="text-gradient">✓ Quality Assured</h4>
              <p>
                Every piece in our collection is carefully selected to ensure 
                the highest quality fabrics and craftsmanship.
              </p>
            </div>
            <div>
              <h4 className="text-gradient">✓ Wide Selection</h4>
              <p>
                From men&apos;s and women&apos;s wear to kids&apos; clothing and festive 
                collections, we have something for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-gradient">✓ Customer First</h4>
              <p>
                Your satisfaction is our priority. We provide personalized 
                service and expert styling advice.
              </p>
            </div>
            <div>
              <h4 className="text-gradient">✓ Affordable Pricing</h4>
              <p>
                Quality fashion shouldn&apos;t break the bank. We offer competitive 
                prices on all our collections.
              </p>
            </div>
            <div>
              <h4 className="text-gradient">✓ Traditional & Modern</h4>
              <p>
                Perfect blend of traditional ethnic wear and contemporary fashion 
                to suit every occasion.
              </p>
            </div>
            <div>
              <h4 className="text-gradient">✓ Trusted Service</h4>
              <p>
                Years of experience serving our community with integrity, 
                honesty, and dedication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
