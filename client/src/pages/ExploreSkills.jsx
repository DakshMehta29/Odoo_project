import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Programming", "Design", "Language", "Music"];
const levels = ["All", "Beginner", "Intermediate", "Expert"];
const skillsData = [
  {
    id: 1,
    name: "Python",
    user: { name: "Alice", avatar: "https://ui-avatars.com/api/?name=Alice&background=1a2b5a&color=fff" },
    category: "Programming",
    level: "Expert",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Public Speaking",
    user: { name: "Bob", avatar: "https://ui-avatars.com/api/?name=Bob&background=1a2b5a&color=fff" },
    category: "Language",
    level: "Intermediate",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Guitar",
    user: { name: "Charlie", avatar: "https://ui-avatars.com/api/?name=Charlie&background=1a2b5a&color=fff" },
    category: "Music",
    level: "Beginner",
    rating: 4.5,
  },
  {
    id: 4,
    name: "UI/UX Design",
    user: { name: "Dana", avatar: "https://ui-avatars.com/api/?name=Dana&background=1a2b5a&color=fff" },
    category: "Design",
    level: "Expert",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Spanish",
    user: { name: "Eva", avatar: "https://ui-avatars.com/api/?name=Eva&background=1a2b5a&color=fff" },
    category: "Language",
    level: "Intermediate",
    rating: 4.6,
  },
  {
    id: 6,
    name: "React",
    user: { name: "Frank", avatar: "https://ui-avatars.com/api/?name=Frank&background=1a2b5a&color=fff" },
    category: "Programming",
    level: "Intermediate",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Piano",
    user: { name: "Grace", avatar: "https://ui-avatars.com/api/?name=Grace&background=1a2b5a&color=fff" },
    category: "Music",
    level: "Expert",
    rating: 4.9,
  },
  {
    id: 8,
    name: "Logo Design",
    user: { name: "Henry", avatar: "https://ui-avatars.com/api/?name=Henry&background=1a2b5a&color=fff" },
    category: "Design",
    level: "Beginner",
    rating: 4.3,
  },
  {
    id: 9,
    name: "JavaScript",
    user: { name: "Ivy", avatar: "https://ui-avatars.com/api/?name=Ivy&background=1a2b5a&color=fff" },
    category: "Programming",
    level: "Expert",
    rating: 4.8,
  },
  // ...add more for demo
];

const PAGE_SIZE = 6;

export default function ExploreSkills() {
  const { user, login, signup } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("signup");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Filtered and searched skills
  const filteredSkills = useMemo(() => {
    return skillsData.filter(skill => {
      const matchesSearch =
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.user.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || skill.category === category;
      const matchesLevel = level === "All" || skill.level === level;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, category, level]);

  const paginatedSkills = filteredSkills.slice(0, page * PAGE_SIZE);
  const hasMore = filteredSkills.length > paginatedSkills.length;

  const requireAuth = (mode = "signup") => {
    if (!user) {
      setModalMode(mode);
      setModalOpen(true);
      return false;
    }
    return true;
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Poppins', sans-serif", background: "#fff", minHeight: "100vh" }}>
      {/* Back to Homepage Button */}
      <button onClick={()=>navigate('/')} style={{margin:'24px 0 0 24px',padding:'8px 18px',borderRadius:24,border:'none',background:'#f5f7fa',color:'#1a2b5a',fontWeight:600,fontSize:'1rem',boxShadow:'0 2px 8px rgba(30,42,69,0.07)',cursor:'pointer',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:'1.2em',marginRight:6}}>&larr;</span> Back to Homepage
      </button>
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
      {/* Header */}
      <header style={{ padding: "48px 0 24px 0", background: "#f7fafd", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: 8 }}>Explore Skills</h1>
          <p style={{ fontSize: "1.18rem", color: "#4a5568", marginBottom: 28 }}>
            Find people who can teach you what you want to learn.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <input
              type="text"
              placeholder="Search for skills, categories, or users"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{
                padding: "12px 18px",
                borderRadius: 10,
                border: "1.5px solid #cfd8e3",
                fontSize: "1.08rem",
                width: 320,
                maxWidth: "90vw",
                outline: "none"
              }}
            />
          </div>
        </div>
      </header>
      {/* Filter Bar */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
        borderBottom: "1.5px solid #f1f5f9",
        padding: "18px 0 10px 0"
      }}>
        <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }} style={{ padding: 10, borderRadius: 8, border: "1.5px solid #cfd8e3", fontSize: "1rem", minWidth: 140 }}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={level} onChange={e => { setLevel(e.target.value); setPage(1); }} style={{ padding: 10, borderRadius: 8, border: "1.5px solid #cfd8e3", fontSize: "1rem", minWidth: 140 }}>
          {levels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
        </select>
        {/* Rating/Popularity filter (optional) */}
        {/* <select style={{ padding: 10, borderRadius: 8, border: "1.5px solid #cfd8e3", fontSize: "1rem", minWidth: 140 }}>
          <option>Sort by: Rating</option>
        </select> */}
      </div>
      {/* Skills Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 28,
        maxWidth: 1100,
        margin: "36px auto 0 auto",
        padding: "0 16px"
      }}>
        {paginatedSkills.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#6b7280", fontSize: "1.2rem", padding: 40 }}>
            No skills found.
          </div>
        )}
        {paginatedSkills.map(skill => (
          <div key={skill.id} style={{
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 4px 24px rgba(30,42,69,0.09)",
            padding: 28,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: 220,
            transition: "box-shadow 0.18s",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <img src={skill.user.avatar} alt={skill.user.name} style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #1a2b5a" }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.13rem" }}>{skill.user.name}</div>
                <div style={{ fontSize: "0.98rem", color: "#4a5568" }}>{skill.category}</div>
              </div>
            </div>
            <div style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 6, color: "#1a2b5a", textAlign: "center" }}>{skill.name}</div>
            <div style={{ fontSize: "0.98rem", color: "#64748b", marginBottom: 10 }}>{skill.level} • <span style={{ color: "#f59e42", fontWeight: 700 }}>★ {skill.rating}</span></div>
            <button
              style={{
                marginTop: "auto",
                background: "#1a2b5a",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 0",
                width: "100%",
                fontWeight: 700,
                fontSize: "1.08rem",
                cursor: "pointer",
                transition: "background 0.18s"
              }}
              onClick={() => requireAuth("signup")}
            >
              Request Swap
            </button>
          </div>
        ))}
      </div>
      {/* Pagination / Load More */}
      {hasMore && (
        <div style={{ display: "flex", justifyContent: "center", margin: "36px 0 60px 0" }}>
          <button
            style={{
              background: "#1a2b5a",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "14px 38px",
              fontWeight: 700,
              fontSize: "1.13rem",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(30,42,69,0.09)",
              transition: "background 0.18s"
            }}
            onClick={() => setPage(p => p + 1)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
} 