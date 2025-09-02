r"""(function(){
  const KEY='pts_cookie_consent_v2';

  function setConsent(grantAnalytics, grantAds){
    window.gtag && window.gtag('consent','update',{
      'analytics_storage': grantAnalytics ? 'granted':'denied',
      'ad_storage': grantAds ? 'granted':'denied',
      'ad_user_data': grantAds ? 'granted':'denied',
      'ad_personalization': grantAds ? 'granted':'denied'
    });
    if (grantAnalytics){
      document.querySelectorAll('script[type="text/plain"][data-cookieconsent="analytics"]').forEach(s=>{
        const exec=document.createElement('script');
        exec.textContent=s.textContent;
        document.head.appendChild(exec);
        s.remove();
      });
    }
  }

  function save(choice){ localStorage.setItem(KEY, JSON.stringify(choice)); }
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)); }catch(_){ return null; } }

  function renderBar(){
    const css=`#cookiebar{position:fixed;inset:auto 16px 16px 16px;background:#1f2937;color:#fff;padding:16px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.2);z-index:9999;max-width:860px;margin:0 auto}
#cookiebar h3{margin:0 0 8px 0;font-size:18px}
#cookiebar p{margin:0 0 12px 0}
#cookiebar .actions{display:flex;gap:8px;flex-wrap:wrap}
#cookiebar button{padding:10px 14px;border-radius:10px;border:0;cursor:pointer}
#cookie-accept{background:#10b981;color:#031b0f}
#cookie-decline{background:#e5e7eb;color:#111827}
#cookie-settings{background:#f59e0b;color:#111827}
#cookiebar details{background:#111827;padding:8px;border-radius:8px;margin:8px 0}
#cookiebar a{color:#93c5fd}`;
    const style=document.createElement('style'); style.textContent=css; document.head.appendChild(style);

    const bar=document.createElement('div');
    bar.id='cookiebar';
    bar.innerHTML=`
      <h3>Cookies na PojistiToSnadno.cz</h3>
      <p>Používáme nezbytné cookies a s Vaším souhlasem také analytické. <a href="/cookies.html" target="_blank" rel="noopener">Více informací</a>.</p>
      <details><summary>Nastavení</summary>
        <label style="display:flex;gap:8px;align-items:center;margin-top:8px">
          <input type="checkbox" id="opt-analytics"> Povolit analytické cookies (GA4)
        </label>
      </details>
      <div class="actions">
        <button id="cookie-accept">Přijmout vybrané</button>
        <button id="cookie-decline">Odmítnout</button>
        <button id="cookie-settings">Nastavení cookies</button>
      </div>
    `;
    document.body.appendChild(bar);

    const optAnalytics=bar.querySelector('#opt-analytics');
    const accept=bar.querySelector('#cookie-accept');
    const decline=bar.querySelector('#cookie-decline');
    const openSettings=bar.querySelector('#cookie-settings');

    accept.addEventListener('click',()=>{
      const choice={analytics: !!optAnalytics.checked, marketing:false, ts:Date.now()};
      save(choice);
      setConsent(choice.analytics,false);
      bar.remove();
    });
    decline.addEventListener('click',()=>{
      const choice={analytics:false, marketing:false, ts:Date.now()};
      save(choice);
      setConsent(false,false);
      bar.remove();
    });
    openSettings.addEventListener('click',()=>{ document.querySelector('#cookiebar details').open=true; });
  }

  window.resetCookieConsent=function(){
    localStorage.removeItem(KEY);
    location.reload();
  }

  const stored=load();
  if (!stored){ window.addEventListener('DOMContentLoaded', renderBar); }
  else { setConsent(!!stored.analytics,false); }
})();"""
