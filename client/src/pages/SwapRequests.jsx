import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SwapRequests() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Back to Homepage Button */}
      <button onClick={()=>navigate('/')} style={{margin:'24px 0 0 24px',padding:'8px 18px',borderRadius:24,border:'none',background:'#f5f7fa',color:'#1a2b5a',fontWeight:600,fontSize:'1rem',boxShadow:'0 2px 8px rgba(30,42,69,0.07)',cursor:'pointer',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:'1.2em',marginRight:6}}>&larr;</span> Back to Homepage
      </button>
    </div>
  );
}
