import { useState, useEffect } from 'react';
import './App.css';

interface TapEffect {
  id: number;
  x: number;
  y: number;
}

function App() {
  const CONFIG = {
    botName: "Llama Loot",
    botUsername: "YourLlamaLootBot", 
    monetagSmartlink: "https://your-monetag-smartlink.com", 
    cpaContentLocker: "https://your-cpa-locker-link.com",  
    youtubeSubscribe: "https://youtube.com", 
    facebookFollow: "https://facebook.com",      
    twitterFollow: "https://x.com",           
  };
  const MAX_ENERGY = 500; 

  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('llama_coins');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [energy, setEnergy] = useState<number>(() => {
    const saved = localStorage.getItem('llama_energy');
    return saved ? parseInt(saved, 10) : MAX_ENERGY;
  });

  const [activeTab, setActiveTab] = useState<string>('tap'); 
  const [tapEffects, setTapEffects] = useState<TapEffect[]>([]);

  const [userId] = useState<string>(() => {
    let id = localStorage.getItem('llama_user_id');
    if (!id) {
      id = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('llama_user_id', id);
    }
    return id;
  });

  const [referrals, setReferrals] = useState<number>(() => {
    const saved = localStorage.getItem('llama_ref_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('llama_coins', coins.toString());
    localStorage.setItem('llama_energy', energy.toString());
  }, [coins, energy]);

  useEffect(() => {
    const refillTimer = setInterval(() => {
      setEnergy((prevEnergy) => {
        if (prevEnergy < MAX_ENERGY) {
          return Math.min(prevEnergy + 1, MAX_ENERGY);
        }
        return prevEnergy;
      });
    }, 1500);

    return () => clearInterval(refillTimer);
  }, []);

  useEffect(() => {
    const adTimer = setInterval(() => {
      if (CONFIG.monetagSmartlink) {
        window.open(CONFIG.monetagSmartlink, "_blank");
      }
    }, 15 * 60 * 1000); 

    return () => clearInterval(adTimer);
  }, [CONFIG.monetagSmartlink]);

  const handleTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (energy > 0) {
      setCoins((prev) => prev + 1);
      setEnergy((prev) => prev - 1);

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newEffect: TapEffect = { id: Date.now(), x, y };
      
      setTapEffects((prev) => [...prev, newEffect]);
    }
  };

  useEffect(() => {
    if (tapEffects.length > 0) {
      const timer = setTimeout(() => {
        setTapEffects((prev) => prev.slice(1));
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [tapEffects]);

  const handleVideoRefill = () => {
    if (CONFIG.monetagSmartlink) {
      window.open(CONFIG.monetagSmartlink, "_blank");
    }
    setEnergy(MAX_ENERGY);
  };

  const inviteLink = `https://t.me{CONFIG.botUsername}?start=ref_${userId}`;

  const handleInvite = () => {
    const telegramShareUrl = `https://t.me{encodeURIComponent(inviteLink)}&text=${encodeURIComponent(`Join Llama Loot and claim +2,500 Coins instantly!`)}`;
    window.open(telegramShareUrl, '_blank');
    
    setTimeout(() => {
      setReferrals(prev => {
        const newCount = prev + 1;
        localStorage.setItem('llama_ref_count', newCount.toString());
        return newCount;
      });
      setCoins(prev => prev + 2500);
    }, 2000);
  };

  return (
    <div className="game-container">
      <div className="header-section">
        <div className="coin-icon">🦙🪙</div>
        <h1 className="balance-text">{coins.toLocaleString()}</h1>
        <p className="coin-label">\$LMLOOT Tokens</p>
      </div>

      <div className="main-content">
        
        {activeTab === 'tap' && (
          <div className="tap-section">
            <button className="llama-circle-btn" onClick={handleTap} disabled={energy === 0}>
              <span className="llama-emoji">🦙</span>
              {tapEffects.map((effect) => (
                <span key={effect.id} className="floating-plus-one" style={{ left: `${effect.x}px`, top: `${effect.y}px` }}>
                  +1
                </span>
              ))}
            </button>
            
            <div className="energy-container">
              <div className="energy-header">
                <span>⚡ {energy} / {MAX_ENERGY}</span>
              </div>
              <div className="energy-bar-bg">
                <div className="energy-bar-fill" style={{ width: `${(energy / MAX_ENERGY) * 100}%` }}></div>
              </div>
              
              <button className="video-refill-btn" onClick={handleVideoRefill}>
                📺 Watch Ad (Instant Refill ⚡)
              </button>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="tasks-section">
            <h2 className="section-title">📋 Loot Tasks</h2>
            <p className="section-subtitle">Complete sponsored tasks to claim big rewards!</p>
            
            <div className="task-card vip-task">
              <div className="task-info">
                <span className="task-icon">🎁</span>
                <div>
                  <h4>Daily Reward Chest</h4>
                  <p>+1,000 Coins</p>
                </div>
              </div>
              <a href={CONFIG.cpaContentLocker} target="_blank" rel="noreferrer" className="task-btn">Loot</a>
            </div>

            <div className="task-card">
              <div className="task-info">
                <span className="task-icon">🔴</span>
                <div>
                  <h4>Subscribe Official YouTube</h4>
                  <p>+1,000 Coins</p>
                </div>
              </div>
              <a href={CONFIG.youtubeSubscribe} target="_blank" rel="noreferrer" className="task-btn claim">Subscribe</a>
            </div>

            <div className="task-card">
              <div className="task-info">
                <span className="task-icon">🔵</span>
                <div>
                  <h4>Follow Partner Facebook</h4>
                  <p>+1,000 Coins</p>
                </div>
              </div>
              <a href={CONFIG.facebookFollow} target="_blank" rel="noreferrer" className="task-btn claim">Follow</a>
            </div>

            <div className="task-card">
              <div className="task-info">
                <span className="task-icon">🐦</span>
                <div>
                  <h4>Follow Official Twitter/X</h4>
                  <p>+1,000 Coins</p>
                </div>
              </div>
              <a href={CONFIG.twitterFollow} target="_blank" rel="noreferrer" className="task-btn claim">Follow</a>
            </div>
          </div>
        )}

        {activeTab === 'invite' && (
          <div className="tasks-section">
            <h2 className="section-title">👥 Invite Friends</h2>
            <p className="section-subtitle">Earn +2,500 Coins for every friend you invite!</p>
            
            <div className="profile-card" style={{textAlign: 'center', marginBottom: '20px'}}>
              <h3 style={{color: '#f3ba2f', margin: '5px 0'}}>{referrals} Friends Invited</h3>
              <p style={{fontSize: '0.85rem', color: '#9ca3af'}}>Total Referral Earnings: {(referrals * 2500).toLocaleString()} Coins</p>
            </div>

            <div className="invite-box" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <button onClick={handleInvite} className="task-btn-gold">
                Invite a Friend
              </button>
              
              <div style={{backgroundColor: '#1e2026', padding: '10px', borderRadius: '10px', fontSize: '0.8rem', color: '#9ca3af', wordBreak: 'break-all', border: '1px dashed #f3ba2f', marginTop: '10px'}}>
                <strong>Your Link:</strong><br/>{inviteLink}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="leaderboard-section">
            <h2 className="section-title">🏆 Top Looters</h2>
            <p className="section-subtitle">Global rankings of the top Llama miners!</p>
            <div className="leaderboard-list">
              <div className="leader-item global-top"><span>🥇 CryptoWhale</span><span>9,450,000</span></div>
              <div className="leader-item global-top"><span>🥈 LlamaKing</span><span>7,120,000</span></div>
              <div className="leader-item global-top"><span>🥉 TonMaster</span><span>5,890,000</span></div>
              <div className="leader-item"><span>4. Alex_Crypto</span><span>4,200,000</span></div>
              <div className="leader-item"><span>5. LMLoot_Fan</span><span>3,500,000</span></div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2 className="section-title">👤 Miner Profile</h2>
            <div className="profile-card">
              <div className="profile-row"><span>User ID:</span> <span>#{userId}</span></div>
              <div className="profile-row"><span>Status:</span> <span className="status-badge">Active</span></div>
              <div className="profile-row"><span>League:</span> <span>Bronze Llama</span></div>
              <div className="profile-row"><span>Total Taps:</span> <span>{coins}</span></div>
              <div className="profile-row"><span>Weekly Giveaway:</span> <span className="verify-text">Qualified</span></div>
            </div>
          </div>
        )}

      </div>

      <div className="bottom-nav">
        <button className={activeTab === 'tap' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('tap')}>
          <div className="nav-icon">🦙</div>
          <span>Loot</span>
