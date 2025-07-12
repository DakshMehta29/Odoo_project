import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/homepage.css";

const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  bio: "Full-stack developer & lifelong learner.",
  location: "San Francisco, CA",
  avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=1a2b5a&color=fff&rounded=true&size=64",
  social: {
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson"
  }
};

const initialTeach = ["React", "Node.js", "UI Design"];
const initialLearn = ["Go", "Docker", "Public Speaking"];
const initialIncoming = [
  { id: 1, skill: "React", from: "Priya S.", status: "pending" },
  { id: 2, skill: "UI Design", from: "Samir K.", status: "pending" }
];
const initialMyReq = [
  { id: 1, skill: "Go", to: "Alex P.", status: "pending" },
  { id: 2, skill: "Docker", to: "Maria L.", status: "accepted" },
  { id: 3, skill: "Public Speaking", to: "Chris T.", status: "completed" }
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [teachSkills, setTeachSkills] = useState(initialTeach);
  const [learnSkills, setLearnSkills] = useState(initialLearn);
  const [incoming, setIncoming] = useState(initialIncoming);
  const [myReq, setMyReq] = useState(initialMyReq);
  const [tab, setTab] = useState("incoming");
  const [showSkillInput, setShowSkillInput] = useState({ teach: false, learn: false });
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (type) => {
    if (!newSkill.trim()) return;
    if (type === "teach") setTeachSkills([...teachSkills, newSkill.trim()]);
    else setLearnSkills([...learnSkills, newSkill.trim()]);
    setNewSkill("");
    setShowSkillInput({ ...showSkillInput, [type]: false });
  };
  const handleDeleteSkill = (type, idx) => {
    if (type === "teach") setTeachSkills(teachSkills.filter((_, i) => i !== idx));
    else setLearnSkills(learnSkills.filter((_, i) => i !== idx));
  };
  const handleAccept = (id) => setIncoming(incoming.filter(req => req.id !== id));
  const handleDecline = (id) => setIncoming(incoming.filter(req => req.id !== id));
  const handleCancel = (id) => setMyReq(myReq.filter(req => req.id !== id));

  const stats = {
    swaps: 7,
    ratings: 5,
    totalSkills: teachSkills.length + learnSkills.length
  };

  const displayUser = user || mockUser;

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh", fontFamily: "Inter, Poppins, sans-serif" }}>
      {/* Back to Homepage Button */}
      <button onClick={()=>navigate('/')} style={{margin:'24px 0 0 24px',padding:'8px 18px',borderRadius:24,border:'none',background:'#f5f7fa',color:'#1a2b5a',fontWeight:600,fontSize:'1rem',boxShadow:'0 2px 8px rgba(30,42,69,0.07)',cursor:'pointer',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:'1.2em',marginRight:6}}>&larr;</span> Back to Homepage
      </button>
      <div className="dashboard-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 1rem" }}>
        {/* User Info Overview */}
        <div className="dashboard-card user-info-card" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 2px 16px rgba(30,60,90,0.07)", padding: "2rem 2rem 1.5rem 2rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32, marginBottom: 32 }}>
          <img src={displayUser.avatar} alt="avatar" style={{ width: 80, height: 80, borderRadius: "50%", marginRight: 32, border: "3px solid #e6eaf3" }} />
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#1a2b5a", marginBottom: 4 }}>{displayUser.name}</div>
            <div style={{ color: "#6b7280", fontSize: 15, marginBottom: 8 }}>{displayUser.bio}</div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center", fontSize: 15, color: "#444" }}>
              <span>✉️ {displayUser.email}</span>
              {displayUser.location && <span>🌍 {displayUser.location}</span>}
              {displayUser.social?.linkedin && <a href={displayUser.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#0a66c2", textDecoration: "none", fontWeight: 500 }}>LinkedIn</a>}
              {displayUser.social?.github && <a href={displayUser.social.github} target="_blank" rel="noopener noreferrer" style={{ color: "#24292f", textDecoration: "none", fontWeight: 500 }}>GitHub</a>}
            </div>
          </div>
          <button style={{ background: "#1a2b5a", color: "#fff", border: "none", borderRadius: 12, padding: "0.7rem 1.6rem", fontWeight: 600, fontSize: 15, cursor: "pointer", marginLeft: "auto", transition: "background 0.2s" }}>Edit Profile</button>
        </div>

        {/* Skills Section */}
        <div className="dashboard-card skills-section" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 2px 16px rgba(30,60,90,0.07)", padding: "2rem 2rem 1.5rem 2rem", marginBottom: 32, display: "flex", flexWrap: "wrap", gap: 32 }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontWeight: 700, color: "#1a2b5a", fontSize: 18, marginBottom: 10 }}>Skills I Can Teach</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
              {teachSkills.map((skill, idx) => (
                <span key={idx} style={{ background: "#e6f0fa", color: "#1a2b5a", borderRadius: 10, padding: "6px 16px", fontWeight: 500, fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>
                  {skill}
                  <span style={{ marginLeft: 6, cursor: "pointer", color: "#e53e3e", fontWeight: 700 }} onClick={() => handleDeleteSkill("teach", idx)}>&times;</span>
                </span>
              ))}
              {showSkillInput.teach ? (
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input value={newSkill} onChange={e => setNewSkill(e.target.value)} style={{ padding: "6px 10px", borderRadius: 8, border: "1.5px solid #cfd8e3", fontSize: 15, minWidth: 80 }} autoFocus />
                  <button style={{ background: "#10b981", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontWeight: 600, cursor: "pointer" }} onClick={() => handleAddSkill("teach")}>Add</button>
                </span>
              ) : (
                <button style={{ background: "#10b981", color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontWeight: 600, fontSize: 15, cursor: "pointer" }} onClick={() => setShowSkillInput({ ...showSkillInput, teach: true })}>+ Add Skill</button>
              )}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontWeight: 700, color: "#1a2b5a", fontSize: 18, marginBottom: 10 }}>Skills I Want to Learn</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
              {learnSkills.map((skill, idx) => (
                <span key={idx} style={{ background: "#fce7f3", color: "#a21caf", borderRadius: 10, padding: "6px 16px", fontWeight: 500, fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>
                  {skill}
                  <span style={{ marginLeft: 6, cursor: "pointer", color: "#e53e3e", fontWeight: 700 }} onClick={() => handleDeleteSkill("learn", idx)}>&times;</span>
                </span>
              ))}
              {showSkillInput.learn ? (
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input value={newSkill} onChange={e => setNewSkill(e.target.value)} style={{ padding: "6px 10px", borderRadius: 8, border: "1.5px solid #cfd8e3", fontSize: 15, minWidth: 80 }} autoFocus />
                  <button style={{ background: "#10b981", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontWeight: 600, cursor: "pointer" }} onClick={() => handleAddSkill("learn")}>Add</button>
                </span>
              ) : (
                <button style={{ background: "#10b981", color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontWeight: 600, fontSize: 15, cursor: "pointer" }} onClick={() => setShowSkillInput({ ...showSkillInput, learn: true })}>+ Add Skill</button>
              )}
            </div>
          </div>
        </div>

        {/* Swap Requests Section */}
        <div className="dashboard-card swap-section" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 2px 16px rgba(30,60,90,0.07)", padding: "2rem 2rem 1.5rem 2rem", marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 24, marginBottom: 18, flexWrap: "wrap" }}>
            <button onClick={() => setTab("incoming")} style={{ background: tab === "incoming" ? "#1a2b5a" : "#f5f7fa", color: tab === "incoming" ? "#fff" : "#1a2b5a", border: "none", borderRadius: 8, padding: "8px 22px", fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "background 0.2s" }}>Incoming Requests</button>
            <button onClick={() => setTab("my") } style={{ background: tab === "my" ? "#1a2b5a" : "#f5f7fa", color: tab === "my" ? "#fff" : "#1a2b5a", border: "none", borderRadius: 8, padding: "8px 22px", fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "background 0.2s" }}>My Requests</button>
          </div>
          {tab === "incoming" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {incoming.length === 0 && <div style={{ color: "#888", fontSize: 15 }}>No incoming requests.</div>}
              {incoming.map(req => (
                <div key={req.id} style={{ display: "flex", alignItems: "center", background: "#f5f7fa", borderRadius: 10, padding: "12px 18px", gap: 18 }}>
                  <span style={{ fontWeight: 600, color: "#1a2b5a" }}>{req.skill}</span>
                  <span style={{ color: "#444" }}>requested by <b>{req.from}</b></span>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                    <button style={{ background: "#10b981", color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontWeight: 600, cursor: "pointer" }} onClick={() => handleAccept(req.id)}>Accept</button>
                    <button style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontWeight: 600, cursor: "pointer" }} onClick={() => handleDecline(req.id)}>Decline</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {myReq.length === 0 && <div style={{ color: "#888", fontSize: 15 }}>No requests sent.</div>}
              {myReq.map(req => (
                <div key={req.id} style={{ display: "flex", alignItems: "center", background: "#f5f7fa", borderRadius: 10, padding: "12px 18px", gap: 18 }}>
                  <span style={{ fontWeight: 600, color: "#1a2b5a" }}>{req.skill}</span>
                  <span style={{ color: "#444" }}>to <b>{req.to}</b></span>
                  <span style={{ background: req.status === "pending" ? "#fbbf24" : req.status === "accepted" ? "#10b981" : "#6366f1", color: "#fff", borderRadius: 8, padding: "4px 12px", fontWeight: 600, fontSize: 13, marginLeft: 8 }}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
                  {req.status === "pending" && <button style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontWeight: 600, cursor: "pointer", marginLeft: 10 }} onClick={() => handleCancel(req.id)}>Cancel</button>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity Overview / Stats */}
        <div className="dashboard-card stats-section" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 2px 16px rgba(30,60,90,0.07)", padding: "1.5rem 2rem", marginBottom: 32, display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ flex: 1, minWidth: 120, textAlign: "center" }}>
            <div style={{ fontWeight: 700, color: "#1a2b5a", fontSize: 18 }}>Swaps Completed</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#10b981", marginTop: 4 }}>{stats.swaps}</div>
          </div>
          <div style={{ flex: 1, minWidth: 120, textAlign: "center" }}>
            <div style={{ fontWeight: 700, color: "#1a2b5a", fontSize: 18 }}>Ratings Received</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#6366f1", marginTop: 4 }}>{stats.ratings}</div>
          </div>
          <div style={{ flex: 1, minWidth: 120, textAlign: "center" }}>
            <div style={{ fontWeight: 700, color: "#1a2b5a", fontSize: 18 }}>Total Skills</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#1a2b5a", marginTop: 4 }}>{stats.totalSkills}</div>
          </div>
        </div>

        {/* Quick Action Menu */}
        <div className="dashboard-card quick-actions" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 2px 16px rgba(30,60,90,0.07)", padding: "1.2rem 2rem", display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <button style={{ background: "#1a2b5a", color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "background 0.2s" }}>Go to Skill Directory</button>
          <button style={{ background: "#fbbf24", color: "#1a2b5a", border: "none", borderRadius: 10, padding: "10px 22px", fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "background 0.2s" }}>Suggest a Feature</button>
          <button style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "background 0.2s" }} onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
} 