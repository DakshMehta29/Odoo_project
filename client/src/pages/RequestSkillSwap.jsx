import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Mock data for all skills and users
const allSkills = [
  { name: "React", icon: "💻" },
  { name: "Node.js", icon: "💻" },
  { name: "UI Design", icon: "🎨" },
  { name: "Go", icon: "💻" },
  { name: "Docker", icon: "🐳" },
  { name: "Public Speaking", icon: "🎤" },
  { name: "Python", icon: "💻" },
  { name: "Guitar", icon: "🎸" },
  { name: "Spanish", icon: "🗣️" },
];
const allUsers = [
  { name: "Alex P.", avatar: "https://ui-avatars.com/api/?name=Alex+P.&background=1a2b5a&color=fff" },
  { name: "Maria L.", avatar: "https://ui-avatars.com/api/?name=Maria+L.&background=1a2b5a&color=fff" },
  { name: "Chris T.", avatar: "https://ui-avatars.com/api/?name=Chris+T.&background=1a2b5a&color=fff" },
  { name: "Priya S.", avatar: "https://ui-avatars.com/api/?name=Priya+S.&background=1a2b5a&color=fff" },
  { name: "Samir K.", avatar: "https://ui-avatars.com/api/?name=Samir+K.&background=1a2b5a&color=fff" },
];

// Simulate user's teachable skills (should come from context/dashboard)
const userTeachSkills = ["React", "Node.js", "UI Design"];

export default function RequestSkillSwap() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Autofill from location.state if present
  const prefill = location.state || {};

  const [offer, setOffer] = useState(userTeachSkills[0] || "");
  const [learn, setLearn] = useState(prefill.skill || "");
  const [recipient, setRecipient] = useState(prefill.recipient || "");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [searchSkill, setSearchSkill] = useState("");
  const [searchUser, setSearchUser] = useState("");

  // Protect page - move navigation to useEffect
  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // Return null if not authenticated
  if (!user) {
    return null;
  }

  // Filter skills for "want to learn"
  const filteredSkills = useMemo(() => {
    return allSkills.filter(s =>
      s.name.toLowerCase().includes(searchSkill.toLowerCase())
    );
  }, [searchSkill]);

  // Filter users for recipient
  const filteredUsers = useMemo(() => {
    return allUsers.filter(u =>
      u.name.toLowerCase().includes(searchUser.toLowerCase())
    );
  }, [searchUser]);

  const handleSubmit = e => {
    e.preventDefault();
    // Simulate saving request (would update context/db in real app)
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/dashboard", { state: { tab: "my" } });
    }, 1800);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "Inter, Poppins, sans-serif" }}>
      {/* Back to Homepage Button */}
      <button onClick={()=>navigate('/')} style={{margin:'24px 0 0 24px',padding:'8px 18px',borderRadius:24,border:'none',background:'#f5f7fa',color:'#1a2b5a',fontWeight:600,fontSize:'1rem',boxShadow:'0 2px 8px rgba(30,42,69,0.07)',cursor:'pointer',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:'1.2em',marginRight:6}}>&larr;</span> Back to Homepage
      </button>
      {showToast && (
        <div style={{ position: "fixed", top: 32, right: 32, background: "#1E2A45", color: "#fff", padding: "16px 32px", borderRadius: 14, fontWeight: 700, fontSize: 18, zIndex: 1000, boxShadow: "0 2px 12px rgba(30,42,69,0.13)" }}>
          Your request has been sent!
        </div>
      )}
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "48px 16px" }}>
        <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px rgba(30,42,69,0.09)", padding: "2.5rem 2rem 2rem 2rem", marginTop: 32 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 6, color: "#1E2A45" }}>Request a Skill Swap</h1>
          <p style={{ color: "#4a5568", fontSize: "1.08rem", marginBottom: 28 }}>Choose what you can offer and what you want to learn.</p>
          <form onSubmit={handleSubmit}>
            {/* Skill You Offer */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 600, color: "#1E2A45", marginBottom: 6, display: "block" }}>Skill You Offer</label>
              <div style={{ position: "relative" }}>
                <select value={offer} onChange={e => setOffer(e.target.value)} required style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #cfd8e3", fontSize: "1.08rem", appearance: "none", background: "#f7fafd", fontFamily: "inherit" }}>
                  {userTeachSkills.map(skill => {
                    const icon = allSkills.find(s => s.name === skill)?.icon || "💡";
                    return <option key={skill} value={skill}>{icon} {skill}</option>;
                  })}
                </select>
                <span style={{ position: "absolute", right: 16, top: 16, pointerEvents: "none", color: "#888" }}>▼</span>
              </div>
            </div>
            {/* Skill You Want to Learn */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 600, color: "#1E2A45", marginBottom: 6, display: "block" }}>Skill You Want to Learn</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchSkill}
                  onChange={e => setSearchSkill(e.target.value)}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #cfd8e3", fontSize: "1.08rem", marginBottom: 8, fontFamily: "inherit" }}
                />
                <div style={{ position: "absolute", right: 16, top: 16, pointerEvents: "none", color: "#888" }}>🔍</div>
                <div style={{ position: "relative" }}>
                  <select value={learn} onChange={e => setLearn(e.target.value)} required style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #cfd8e3", fontSize: "1.08rem", appearance: "none", background: "#f7fafd", fontFamily: "inherit" }}>
                    <option value="" disabled>Select a skill</option>
                    {filteredSkills.map(skill => (
                      <option key={skill.name} value={skill.name}>{skill.icon} {skill.name}</option>
                    ))}
                  </select>
                  <span style={{ position: "absolute", right: 16, top: 16, pointerEvents: "none", color: "#888" }}>▼</span>
                </div>
              </div>
            </div>
            {/* Recipient */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 600, color: "#1E2A45", marginBottom: 6, display: "block" }}>Recipient</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchUser}
                  onChange={e => setSearchUser(e.target.value)}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #cfd8e3", fontSize: "1.08rem", marginBottom: 8, fontFamily: "inherit" }}
                />
                <div style={{ position: "absolute", right: 16, top: 16, pointerEvents: "none", color: "#888" }}>🔍</div>
                <div style={{ position: "relative" }}>
                  <select value={recipient} onChange={e => setRecipient(e.target.value)} required style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #cfd8e3", fontSize: "1.08rem", appearance: "none", background: "#f7fafd", fontFamily: "inherit" }}>
                    <option value="" disabled>Select a recipient</option>
                    {filteredUsers.map(user => (
                      <option key={user.name} value={user.name}>{user.name}</option>
                    ))}
                  </select>
                  <span style={{ position: "absolute", right: 16, top: 16, pointerEvents: "none", color: "#888" }}>▼</span>
                </div>
              </div>
            </div>
            {/* Optional Message */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontWeight: 600, color: "#1E2A45", marginBottom: 6, display: "block" }}>Optional Message</label>
              <textarea
                placeholder="Tell them why you're excited to learn this skill..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={3}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #cfd8e3", fontSize: "1.08rem", fontFamily: "inherit", resize: "vertical" }}
              />
            </div>
            <button type="submit" style={{ width: "100%", background: "#1E2A45", color: "#fff", padding: "15px 0", border: "none", borderRadius: 10, fontWeight: 700, fontSize: "1.13rem", cursor: "pointer", transition: "background 0.18s" }}>
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 