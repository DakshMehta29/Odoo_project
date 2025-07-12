import React, { useState, useRef, useEffect } from "react";

export default function AuthModal({ open, onClose, mode = "login", onAuth }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.25)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div ref={modalRef} className="modal-content" style={{background:'#fff',borderRadius:16,padding:32,minWidth:320,boxShadow:'0 8px 32px rgba(30,42,69,0.13)'}}>
        <h2 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:16}}>{mode === "signup" ? "Sign Up" : "Log In"}</h2>
        <form onSubmit={e => {e.preventDefault();onAuth({name,email});onClose();}}>
          {mode === "signup" && (
            <div style={{marginBottom:12}}>
              <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required style={{width:'100%',padding:10,borderRadius:8,border:'1.5px solid #cfd8e3',marginBottom:8}} />
            </div>
          )}
          <div style={{marginBottom:16}}>
            <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:'100%',padding:10,borderRadius:8,border:'1.5px solid #cfd8e3'}} />
          </div>
          <button type="submit" style={{width:'100%',background:'#1a2b5a',color:'#fff',padding:12,border:'none',borderRadius:8,fontWeight:600,fontSize:'1.08rem',cursor:'pointer'}}>Continue</button>
        </form>
        <div style={{marginTop:18,textAlign:'center',fontSize:'0.98rem'}}>
          {mode === "signup" ? (
            <>Already have an account? <span style={{color:'#1a2b5a',cursor:'pointer',fontWeight:600}} onClick={()=>onClose('login')}>Log In</span></>
          ) : (
            <>Don&apos;t have an account? <span style={{color:'#1a2b5a',cursor:'pointer',fontWeight:600}} onClick={()=>onClose('signup')}>Sign Up</span></>
          )}
        </div>
      </div>
    </div>
  );
} 