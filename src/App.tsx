import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // ==========================================
  // CONFIGURATION BOX
  // ==========================================
  const CONFIG = {
    botName: "Llama Loot",
    botUsername: "YourLlamaLootBot", // আপনার আসল টেলিগ্রাম বটের ইউজারনেম এখানে দিন
    monetagSmartlink: "https://your-monetag-smartlink.com", 
    cpaContentLocker: "https://your-cpa-locker-link.com",  
    youtubeSubscribe: "https://youtube.com", 
    facebookFollow: "https://facebook.com",      
    twitterFollow: "https://x.com",           
  };
  // ==========================================

  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('llama_coins');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [activeTab, setActiveTab] = useState<string>('tap'); 

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
  }, [coins]);

  useEffect(() => {
    const adTimer = setInterval(() => {
      if (CONFIG.monetagSmartlink) {
        window.open(CONFIG.monetagSmartlink, "_blank");
      }
    }, 15 * 60 * 1000); 

    return () => clearInterval(adTimer);
  }, [CONFIG.monetagSmartlink]);

  const inviteLink = `https://t.me{CONFIG.botUsername}?start=ref_${userId}`;

  const handleInvite = () => {
    const telegramShareUrl = `https://t.me{encodeURIComponent(inviteLink)}&text=${encodeURIComponent(`Join Llama Loot and claim +25,000 Coins instantly!`)}`;
    window.open(telegramShareUrl, '_blank');
    
    setTimeout(() => {
      setReferrals(prev => {
        const newCount = prev + 1;
        localStorage.setItem('llama_ref_count', newCount.toString());
        return newCount;
      });
      setCoins(prev => prev + 25000);
    }, 2000);
  };

  return (
    <div className="game-container">
      {/* 👑 টপ ব্যালেন্স সেকশন */}
      <div className="header-section">
        <div className="coin-icon">🦙🪙</div>
        <h1 className="balance-text">{coins.toLocaleString()}</h1>
        <p className="coin-label">\$LMLOOT Tokens</p>
      </div>

      {/* 📱 মেইন কন্টেন্ট এরিয়া */}
      <div className="main-content">
        
        {/* TAB 1: TAP TO EARN */}
        {activeTab === 'tap' && (
          <div className="tap-section">
            <button className="llama-circle-btn" onClick={() => setCoins(coins + 1)}>
              <span className="llama-emoji">🦙</span>
            </button>
            <p className="tap-instruction">Tap the Llama to Loot Coins!</p>
          </div>
        )}

        {/* TAB 2: LOOT TASKS */}
        {activeTab === 'tasks' && (
          <div className="tasks-section">
            <h2 className="section-title">📋 Loot Tasks</h2>
            <p className="section-subtitle">Complete sponsored tasks to claim big rewards!</p>
            
            <div className="task-card vip-task">
              <div className="task-info">
                <span className="task-icon">🎁</span>
                <div>
                  <h4>Daily Reward Chest</h4>
                  <p>+50,000 Coins</p>
                </div>
              </div>
              <a href={CONFIG.cpaContentLocker} target="_blank" rel="noreferrer" className="task-btn">Loot</a>
            </div>

            <div className="task-card">
              <div className="task-info">
                <span className="task-icon">🔴</span>
                <div>
                  <h4>Subscribe Official YouTube</h4>
                  <p>+20,000 Coins</p>
                </div>
              </div>
              <a href={CONFIG.youtubeSubscribe} target="_blank" rel="noreferrer" className="task-btn claim">Subscribe</a>
            </div>

            <div className="task-card">
              <div className="task-info">
                <span className="task-icon">🔵</span>
                <div>
                  <h4>Follow Partner Facebook</h4>
                  <p>+15,000 Coins</p>
                </div>
              </div>
              <a href={CONFIG.facebookFollow} target="_blank" rel="noreferrer" className="task-btn claim">Follow</a>
            </div>

            <div className="task-card">
              <div className="task-info">
                <span className="task-icon">🐦</span>
                <div>
                  <h4>Follow Official Twitter/X</h4>
                  <p>+15,000 Coins</p>
                </div>
              </div>
              <a href={CONFIG.twitterFollow} target="_blank" rel="noreferrer" className="task-btn claim">Follow</a>
            </div>
          </div>
        )}

        {/* TAB 3: INVITE FRIENDS */}
        {activeTab === 'invite' && (
          <div className="tasks-section">
            <h2 className="section-title">👥 Invite Friends</h2>
            <p className="section-subtitle">Earn +25,000 Coins for every friend you invite!</p>
            
            <div className="profile-card" style={{textAlign: 'center', marginBottom: '20px'}}>
              <h3 style={{color: '#4ade80', margin: '5px 0'}}>{referrals} Friends Invited</h3>
              <p style={{fontSize: '0.85rem', color: '#9ca3af'}}>Total Referral Earnings: {(referrals * 25000).toLocaleString()} Coins</p>
            </div>

            <div className="invite-box" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <button onClick={handleInvite} className="task-btn" style={{width: '100%', padding: '14px', fontSize: '1rem', backgroundColor: '#4ade80', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold'}}>
                Invite a Friend
              </button>
              
              <div style={{backgroundColor: '#1e2026', padding: '10px', borderRadius: '10px', fontSize: '0.8rem', color: '#9ca3af', wordBreak: 'break-all', border: '1px dashed #2d3139', marginTop: '10px'}}>
                <strong>Your Link:</strong><br/>{inviteLink}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div className="leaderboard-section">
            <h2 className="section-title">🏆 Top Looters</h2>
            <p className="section-subtitle">Global rankings of the top Llama minners!</p>
            <div className="leaderboard-list">
              <div className="leader-item global-top"><span>🥇 CryptoWhale</span><span>9,450,000</span></div>
              <div className="leader-item global-top"><span>🥈 LlamaKing</span><span>7,120,000</span></div>
              <div className="leader-item global-top"><span>🥉 TonMaster</span><span>5,890,000</span></div>
              <div className="leader-item"><span>4. Alex_Crypto</span><span>4,200,000</span></div>
              <div className="leader-item"><span>5. LMLoot_Fan</span><span>3,500,000</span></div>
            </div>
          </div>
        )}

        {/* TAB 5: USER PROFILE */}
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2 className="section-title">👤 Miner Profile</h2>
            <div className="profile-card">
              <div className="profile-row"><span>User ID:</span> <span>#{userId}</span></div>
              <div className="profile-row"><span>Status:</span> <span className="status-badge">Active ⚡</span></div>
              <div className="profile-row"><span>League:</span> <span>Bronze Llama 🥉</span></div>
              <div className="profile-row"><span>Total Taps:</span> <span>{coins}</span></div>
              <div className="profile-row"><span>Weekly Giveaway:</span> <span className="verify-text">Qualified ✅</span></div>
            </div>
          </div>
        )}

      </div>

      {/* 🗺️ ৫ বোতামের আপডেট করা নেভিগেশন বার */}
      <div className="bottom-nav" style={{gap: '5px', padding: '8px'}}>
        <button className={activeTab === 'tap' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('tap')}>
          <div className="nav-icon">🦙</div>
          <span style={{fontSize: '0.7rem'}}>Loot</span>
        </button>
        <button className={activeTab === 'tasks' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('tasks')}>
          <div className="nav-icon">📋</div>
          <span style={{fontSize: '0.7rem'}}>Tasks</span>
        </button>
        <button className={activeTab === 'invite' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('invite')}>
          <div className="nav-icon">👥</div>
          <span style={{fontSize: '0.7rem'}}>Invite</span>
        </button>
        <button className={activeTab === 'leaderboard' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('leaderboard')}>
          <div className="nav-icon">🏆</div>
          <span style={{fontSize: '0.7rem'}}>Top</span>
        </button>
        <button className={activeTab === 'profile' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('profile')}>
          <div className="nav-icon">👤</div>
          <span style={{fontSize: '0.7rem'}}>Profile</span>
        </button>
      </div>
    </div>
  );
}

export default App;
