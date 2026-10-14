import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // ==========================================
  // ⚙️ TASK CONFIGURATION BOX (রোজ শুধু এই লিংকগুলো পরিবর্তন করবেন)
  // ==========================================
  const CONFIG = {
    botName: "Llama Loot",
    monetagSmartlink: "https://your-monetag-smartlink.com", // আপনার Monetag লিংক
    cpaContentLocker: "https://your-cpa-locker-link.com",  // আপনার CPA লিংক
    youtubeSubscribe: "https://youtube.com", // ক্লায়েন্টের ইউটিউব
    facebookFollow: "https://facebook.com",      // ক্লায়েন্টের ফেসবুক
    twitterFollow: "https://x.com",           // ক্লায়েন্টের টুইটার/X
  };
  // ==========================================

  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('llama_coins');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [activeTab, setActiveTab] = useState<string>('tap'); // tap, tasks, profile, leaderboard

  useEffect(() => {
    localStorage.setItem('llama_coins', coins.toString());
  }, [coins]);

  // ⏱️ ১৫ মিনিট পর পর Monetag পপ-আপ অ্যাড দেখানোর টাইমার
  useEffect(() => {
    const adTimer = setInterval(() => {
      if (CONFIG.monetagSmartlink) {
        window.open(CONFIG.monetagSmartlink, "_blank");
      }
    }, 15 * 60 * 1000); // 15 Minutes

    return () => clearInterval(adTimer);
  }, [CONFIG.monetagSmartlink]);

  return (
    <div className="game-container">
      {/* 👑 টপ ব্যালেন্স সেকশন */}
      <div className="header-section">
        <div className="coin-icon">🦙🪙</div>
        <h1 className="balance-text">{coins.toLocaleString()}</h1>
        <p className="coin-label">$LMLOOT Tokens</p>
      </div>

      {/* 📱 মেইন গেম ইন্টারফেস */}
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

        {activeTab === 'tasks' && (
          <div className="tasks-section">
            <h2 className="section-title">📋 Loot Tasks</h2>
            <p className="section-subtitle">Complete sponsored tasks to claim big rewards!</p>
            
            {/* CPA Task */}
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

            {/* YouTube Task */}
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

            {/* Facebook Task */}
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

            {/* Twitter Task */}
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

        {/* TAB 3: LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div className="leaderboard-section">
            <h2 className="section-title">🏆 Top Looters</h2>
            <div className="leaderboard-list">
              <div className="leader-item global-top"><span>🥇 CryptoWhale</span><span>9,450,000</span></div>
              <div className="leader-item global-top"><span>🥈 LlamaKing</span><span>7,120,000</span></div>
              <div className="leader-item global-top"><span>🥉 TonMaster</span><span>5,890,000</span></div>
              <div className="leader-item"><span>4. Alex_Crypto</span><span>4,200,000</span></div>
              <div className="leader-item"><span>5. LMLoot_Fan</span><span>3,500,000</span></div>
            </div>
          </div>
        )}

        {/* TAB 4: USER PROFILE */}
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2 className="section-title">👤 Miner Profile</h2>
            <div className="profile-card">
              <div className="profile-row"><span>Status:</span> <span className="status-badge">Active ⚡</span></div>
              <div className="profile-row"><span>League:</span> <span>Bronze Llama 🥉</span></div>
              <div className="profile-row"><span>Total Taps:</span> <span>{coins}</span></div>
              <div className="profile-row"><span>Weekly Giveaway:</span> <span className="verify-text">Qualified ✅</span></div>
            </div>
          </div>
        )}

      </div>

      {/* 🗺️ বটম নেভিগেশন বার (Hamster Kombat স্টাইল) */}
      <div className="bottom-nav">
        <button className={activeTab === 'tap' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('tap')}>
          <div className="nav-icon">🦙</div>
          <span>Loot</span>
        </button>
        <button className={activeTab === 'tasks' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('tasks')}>
          <div className="nav-icon">📋</div>
          <span>Tasks</span>
        </button>
        <button className={activeTab === 'leaderboard' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('leaderboard')}>
          <div className="nav-icon">🏆</div>
          <span>Top</span>
        </button>
        <button className={activeTab === 'profile' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('profile')}>
          <div className="nav-icon">👤</div>
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}

export default App;
