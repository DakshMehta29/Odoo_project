// Home.jsx
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";
import { useNavigate } from "react-router-dom";
import "../assets/homepage.css";

function Home() {
  const { user, login, signup, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("signup");
  const [showDropdown, setShowDropdown] = useState(false);
  const [toast, setToast] = useState("");
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdown]);

  // Show welcome toast on login
  useEffect(() => {
    if (user && toast === "") {
      setToast(`Welcome back, ${user.name || "User"}!`);
      setTimeout(() => setToast(""), 2500);
    }
  }, [user]);

  // Intercept all CTAs
  const requireAuth = (mode = "signup") => {
    if (!user) {
      setModalMode(mode);
      setModalOpen(true);
      return false;
    }
    return true;
  };

  // Avatar dropdown menu
  const avatar = user?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "U") + "&background=1a2b5a&color=fff&rounded=true&size=48";

  return (
    <div>
      {/* Toast */}
      {toast && <div style={{position:'fixed',top:24,right:24,background:'#1a2b5a',color:'#fff',padding:'12px 24px',borderRadius:12,boxShadow:'0 2px 12px rgba(30,42,69,0.13)',zIndex:2000,fontWeight:600}}>{toast}</div>}
      {/* Auth Modal */}
      <AuthModal
        open={modalOpen}
        mode={modalMode}
        onClose={m => {
          setModalOpen(false);
          if (m && m !== modalMode) setTimeout(() => { setModalMode(m); setModalOpen(true); }, 200);
        }}
        onAuth={modalMode === "signup" ? signup : login}
      />
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span role="img" aria-label="alien">👽</span> Skill Swap
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', position: 'relative' }}>
          <ul className="nav-links" style={{ marginRight: '1.5rem' }}>
            <li onClick={() => navigate('/')}>Home</li>
            <li>About</li>
            <li onClick={() => navigate('/skills')}>Skills</li>
            <li>Contact</li>
          </ul>
          {!user ? (
            <button className="join-btn" onClick={() => { setModalMode("signup"); setModalOpen(true); }}>Join</button>
          ) : (
            <div style={{position:'relative'}} ref={dropdownRef}>
              <img src={avatar} alt="avatar" style={{width:38,height:38,borderRadius:'50%',cursor:'pointer',border:'2px solid #1a2b5a'}} onClick={()=>setShowDropdown(v=>!v)} />
              {showDropdown && (
                <div style={{position:'absolute',top:48,right:0,background:'#fff',borderRadius:12,boxShadow:'0 4px 24px rgba(30,42,69,0.13)',padding:'10px 0',minWidth:170,zIndex:100}}>
                  <div style={{padding:'10px 20px',fontWeight:600,color:'#1a2b5a',cursor:'pointer'}} onClick={()=>{setShowDropdown(false);navigate('/dashboard');}}>Visit Dashboard</div>
                  <div style={{padding:'10px 20px',fontWeight:600,color:'#1a2b5a',cursor:'pointer'}} onClick={()=>{setShowDropdown(false);navigate('/skills');}}>Explore Skills</div>
                  <div style={{padding:'10px 20px',fontWeight:600,color:'#e53e3e',cursor:'pointer'}} onClick={()=>{logout();setShowDropdown(false);}}>Logout</div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Learn Anything</h1>
          <p>Skill Swap is a clean, modern web platform where users can exchange their skills and learn from one another.</p>
          <button className="get-started" onClick={()=>requireAuth("signup")}>Get Started</button>
        </div>
        <div className="hero-image">
          <img src="https://i.ibb.co/GvZP5qkX/Chat-GPT-Image-Jul-12-2025-12-04-13-PM.png" alt="Man with laptop" />
        </div>
      </section>

      {/* Trusted Logos Section */}
      <section className="logos">
        <div className="logo-card">⚙️ Shell</div>
        <div className="logo-card">🏎️ Ferrari</div>
        <div className="logo-card">💻 Microsoft</div>
        <div className="logo-card">🔲 Other</div>
      </section>

      {/* Discover Skills Section */}
      <section className="adjacent-section discover-adjacent">
        <div className="adjacent-inner">
          <div className="adjacent-illustration left-illustration">
            <img src="https://i.ibb.co/rK00RfQ0/Screenshot-2025-07-12-110441.png" alt="Woman using laptop illustration" />
          </div>
          <div className="adjacent-content">
            <h2 className="adjacent-title">Discover Skills</h2>
            <p className="adjacent-subtext">Explore a vast directory of skills, connect with others, and start exchanging your expertise.</p>
            <button className="adjacent-btn" onClick={()=>navigate('/skills')}>Join Now</button>
          </div>
        </div>
      </section>
      {/* Teach a Skill Section */}
      <section className="adjacent-section teach-adjacent">
        <div className="adjacent-inner">
          <div className="adjacent-content">
            <h2 className="adjacent-title">Teach a Skill</h2>
            <p className="adjacent-subtext">Share your unique abilities and help others grow. Whether it's coding, design, language, or a specialized craft.</p>
            <button className="adjacent-btn" onClick={()=>navigate('/request-swap')}>Offer a Swap</button>
          </div>
          <div className="adjacent-illustration right-illustration">
            <img src="https://i.ibb.co/9HvWYTpP/Screenshot-2025-07-12-134613.png" alt="Girl teaching illustration" />
          </div>
        </div>
      </section>
      {/* Find a Swap Section */}
      <section className="find-swap-section">
        <div className="find-swap-inner">
          <div className="find-swap-illustration">
            <img src="https://i.ibb.co/jZsnHdGQ/Screenshot-2025-07-12-110451.png" alt="People exchanging skills illustration" />
          </div>
          <div className="find-swap-content">
            <h2 className="find-swap-title">Find a Swap</h2>
            <p className="find-swap-subtext">Browse available skill matches, send a request, and start learning from real people instantly.</p>
            <button className="find-swap-btn" onClick={()=>requireAuth("signup")}>Browse Swaps</button>
          </div>
        </div>
      </section>
      {/* Feedback and Support Section */}
      <section className="feedback-support-section">
        <h2 className="feedback-support-title">Feedback & Support</h2>
        <div className="feedback-support-cards">
          <div className="feedback-support-card">
            <img className="feedback-support-img" src="https://i.ibb.co/3kQwQ7d/feedback-icon.png" alt="Feedback" />
            <h3 className="feedback-support-card-title">Feedback</h3>
            <p className="feedback-support-card-desc">
              Your feedback is invaluable to us. Share your thoughts, suggestions, and experiences to help us continuously improve the Skill Swap platform.
            </p>
          </div>
          <div className="feedback-support-card">
            <img className="feedback-support-img" src="https://i.ibb.co/6b6QwQ7/skillswap-icon.png" alt="Skill Swap" />
            <h3 className="feedback-support-card-title">Skill Swap</h3>
            <p className="feedback-support-card-desc">
              Connect, exchange, and grow. Skill Swap is your platform for learning and sharing with a vibrant community.
            </p>
          </div>
          <div className="feedback-support-card">
            <img className="feedback-support-img" src="https://i.ibb.co/7b7QwQ7/support-icon.png" alt="Support" />
            <h3 className="feedback-support-card-title">Support</h3>
            <p className="feedback-support-card-desc">
              If you encounter any issues or have questions, our dedicated support team is here to assist you. We’re committed to ensuring a seamless experience.
            </p>
          </div>
        </div>
      </section>
      {/* Explore Skill Swap Section */}
      <section className="explore-section">
        <h2 className="explore-title">Explore Skill Swap</h2>
        <div className="explore-cards">
          <div className="explore-card">
            <div className="explore-icon">
              <img src="https://i.ibb.co/3kQwQ7d/feedback-icon.png" alt="Skill Directory" />
            </div>
            <h3 className="explore-card-title">Skill Directory</h3>
            <p className="explore-card-desc">Browse all available skills, access your dashboard, and manage swap requests.</p>
            <button className="explore-btn" onClick={()=>navigate('/skills')}>View More</button>
          </div>
          <div className="explore-card">
            <div className="explore-icon">
              <img src="https://i.ibb.co/6b6QwQ7/skillswap-icon.png" alt="Learn from Others" />
            </div>
            <h3 className="explore-card-title">Learn from Others</h3>
            <p className="explore-card-desc">Connect with a diverse community of learners and teachers. Start your learning journey now.</p>
            <button className="explore-btn" onClick={()=>requireAuth("signup")}>Start Learning</button>
          </div>
          <div className="explore-card">
            <div className="explore-icon">
              <img src="https://i.ibb.co/7b7QwQ7/support-icon.png" alt="Watch Video" />
            </div>
            <h3 className="explore-card-title">Watch Video</h3>
            <p className="explore-card-desc">Learn how Skill Swap can help you expand your knowledge and share your expertise.</p>
            <button className="explore-btn" onClick={()=>requireAuth("signup")}>Play Now</button>
          </div>
        </div>
      </section>

      {/* Join the Skill Swap Community Section */}
      <section className="community-section">
        <h2 className="community-title">Join the Skill Swap Community</h2>
        <div className="community-cards">
          {/* Featured Members Card */}
          <div className="community-card">
            <div className="community-icon">
              <span role="img" aria-label="members" style={{fontSize: '2.5rem'}}>🧑‍🤝‍🧑</span>
            </div>
            <h3 className="community-card-title">Featured Members</h3>
            <p className="community-card-desc">Meet our most active and inspiring members. Connect, collaborate, and grow together!</p>
            <div className="community-avatars">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Member 1" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Member 2" />
              <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Member 3" />
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Member 4" />
            </div>
            <button className="community-btn" onClick={()=>requireAuth("signup")}>Join Now</button>
          </div>
          {/* Our Partners Card */}
          <div className="community-card">
            <div className="community-icon">
              <span role="img" aria-label="partners" style={{fontSize: '2.5rem'}}>🤝</span>
            </div>
            <h3 className="community-card-title">Our Partners</h3>
            <p className="community-card-desc">We collaborate with leading organizations to bring you the best learning opportunities.</p>
            <div className="community-partners">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png" alt="Apple" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png" alt="Google" />
            </div>
            <button className="community-btn" onClick={()=>requireAuth("signup")}>View Partners</button>
          </div>
          {/* Download Our App Card */}
          <div className="community-card">
            <div className="community-icon">
              <span role="img" aria-label="app" style={{fontSize: '2.5rem'}}>📱</span>
            </div>
            <h3 className="community-card-title">Download Our App</h3>
            <p className="community-card-desc">Access Skill Swap on the go. Available for Android and iOS devices.</p>
            <div className="community-badges">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Android" className="platform-badge" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="iOS" className="platform-badge" />
            </div>
            <button className="community-btn" onClick={()=>requireAuth("signup")}>Download App</button>
          </div>
        </div>
        <div className="community-action">
          <button className="community-action-btn" onClick={()=>navigate('/request-swap')}>Start Swapping</button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-main">
          <div className="footer-col footer-logo-col">
            <div className="footer-logo">👽</div>
            <div className="footer-tagline">Swap knowledge. Grow together.</div>
          </div>
          <div className="footer-col">
            <div className="footer-heading">Resources</div>
            <a href="#" className="footer-link">Blog</a>
            <a href="#" className="footer-link">Help Center</a>
            <a href="#" className="footer-link">Documentation</a>
          </div>
          <div className="footer-col">
            <div className="footer-heading">Company</div>
            <a href="#" className="footer-link">About Us</a>
            <a href="#" className="footer-link">Careers</a>
            <a href="#" className="footer-link">Partners</a>
          </div>
          <div className="footer-col footer-newsletter-col">
            <h2 className="newsletter-title">Subscribe to our Newsletter</h2>
            <p className="newsletter-subtext">Get the latest updates, tips, and exclusive offers straight to your inbox.</p>
            <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bar">
          © 2025 Skill Swap. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;