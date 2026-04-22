class GitHubPageEnhancer {
  constructor() {
    this.config = {
      LANG: 'ko-KR',
      PAGE_MAP: {
        'gist.github.com': 'gist',
        'www.githubstatus.com': 'status',
        'skills.github.com': 'skills',
        'education.github.com': 'education'
      },
      SPECIAL_SITES: ['gist', 'status', 'skills', 'education']
    };

    this.pageConfig = {};
    this.previousURL = window.location.href;
    this.processedNodes = new WeakSet();

    this.observer = null;
    this.observerConfig = {
      childList: true,
      subtree: true,
      characterData: true,
      attributeFilter: ['value', 'placeholder', 'aria-label', 'data-confirm', 'title']
    };

    this.useTranslation = true;
    this.useDevTerms = false;
    this.useParticles = true;
    this.logPerformance = false;

    this.devTermsReplacements = [
      [/끌어오기\s*요청(을|를)/g, '풀 리퀘스트를'],
      [/끌어오기\s*요청(이|가)/g, '풀 리퀘스트가'],
      [/끌어오기\s*요청(은|는)/g, '풀 리퀘스트는'],
      [/끌어오기\s*요청(과|와)/g, '풀 리퀘스트와'],
      [/끌어오기\s*요청(으로|로)/g, '풀 리퀘스트로'],
      [/끌어오기\s*요청/g, '풀 리퀘스트'],
      [/저장소(를|을)/g, '리포지토리를'],
      [/저장소(가|이)/g, '리포지토리가'],
      [/저장소(는|은)/g, '리포지토리는'],
      [/저장소(와|과)/g, '리포지토리와'],
      [/저장소(로|으로)/g, '리포지토리로'],
      [/저장소/g, '리포지토리'],
      [/분기(를|을)/g, '브랜치를'],
      [/분기(가|이)/g, '브랜치가'],
      [/분기(는|은)/g, '브랜치는'],
      [/분기(와|과)/g, '브랜치와'],
      [/분기(로|으로)/g, '브랜치로'],
      [/분기/g, '브랜치'],
      [/별표(를|을)/g, '스타를'],
      [/별표(가|이)/g, '스타가'],
      [/별표(는|은)/g, '스타는'],
      [/별표(와|과)/g, '스타와'],
      [/별표(로|으로)/g, '스타로'],
      [/별표/g, '스타'],
      [/꼬리표(를|을)/g, '태그를'],
      [/꼬리표(가|이)/g, '태그가'],
      [/꼬리표(는|은)/g, '태그는'],
      [/꼬리표(와|과)/g, '태그와'],
      [/꼬리표(로|으로)/g, '태그로'],
      [/꼬리표/g, '태그'],
      [/장터(를|을)/g, '마켓플레이스를'],
      [/장터(가|이)/g, '마켓플레이스가'],
      [/장터(는|은)/g, '마켓플레이스는'],
      [/장터(로|으로)/g, '마켓플레이스로'],
      [/장터/g, '마켓플레이스'],
      [/탐험하기/g, '탐색'],
      [/빠른\s*답장/g, '저장된 답장'],
      [/구매/g, '결제'],
      [/실행기/g, '러너'],
      [/토론/g, '디스커션'],
      [/모음/g, '컬렉션'],
      [/명령\s*팔레트/g, '커맨드 팔레트'],
      [/슬래시\s*명령어/g, '슬래시 커맨드'],
      [/엑세스/g, '액세스']
    ];
  }

  async storageGet(key, defaultValue) {
    try {
      const result = await chrome.storage.local.get(key);
      return result[key] === undefined ? defaultValue : result[key];
    } catch (e) {
      const value = localStorage.getItem(key);
      if (value === null) return defaultValue;
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
  }

  async storageSet(key, value) {
    try {
      await chrome.storage.local.set({ [key]: value });
    } catch (e) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }


  notify(message) {
    try {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: chrome.runtime.getURL('icon.png'),
        title: 'GitHub Enhancer',
        message: message
      });
    } catch (e) {
      if (this.logPerformance) console.log(`Notification: ${message}`);
    }
  }

  async networkRequest(options) {
    const { method = "GET", url, headers, data, onload, onerror } = options;
    try {
      const response = await fetch(url, {
        method,
        headers,
        body: method === "POST" ? JSON.stringify(data) : undefined,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const responseText = await response.text();
      if (onload) onload({ responseText });
    } catch (error) {
      if (onerror) onerror({ type: error.name, message: error.message });
    }
  }

  applyDevTerms(text) {
    if (!text) return text;
    let result = text;
    for (const [pattern, replacement] of this.devTermsReplacements) {
      result = result.replace(pattern, replacement);
    }
    return result;
  }

  reorderFlexElements(parent) {
    if (this.processedNodes.has(parent)) return;

    try {
      const shrinkElem = parent.querySelector('.flex-shrink-0');
      const overflowElem = parent.querySelector('.overflow-auto');

      if (!shrinkElem || !overflowElem) return;

      const userAnchor = shrinkElem.querySelector('a');
      if (!userAnchor) return;

      const article = parent.closest('article.js-feed-item-component');
      let cardType = '';
      if (article) {
        try {
          const hydroData = JSON.parse(article.getAttribute('data-hydro-view') || '{}');
          cardType = hydroData?.payload?.feed_card?.card_type || '';
        } catch (e) {}
      }

      const textContent = shrinkElem.textContent;
      let actionSuffix = "";

      if (cardType === 'STARRED_REPOSITORY' || textContent.includes('starred') || textContent.includes('별표')) {
        actionSuffix = "에 별표를 남겼습니다";
      } else if (cardType === 'FOLLOW' || textContent.includes('following') || textContent.includes('팔로우')) {
        actionSuffix = "을(를) 팔로우하기 시작했습니다";
      } else if (cardType === 'CREATED_REPOSITORY' || textContent.includes('created') || textContent.includes('만들었')) {
        actionSuffix = " 저장소를 만들었습니다";
      } else if (cardType === 'FORKED_REPOSITORY' || textContent.includes('forked') || textContent.includes('포크')) {
        actionSuffix = " 저장소를 포크했습니다";
      } else if (cardType === 'ADDED_TO_LIST' || textContent.includes('added') || textContent.includes('추가')) {
        actionSuffix = "을(를) 목록에 추가했습니다";
      } else if (cardType === 'PUBLISHED_RELEASE' || textContent.includes('released') || textContent.includes('릴리즈')) {
        actionSuffix = "의 새 릴리즈를 공개했습니다";
      } else if (cardType === 'MERGED_PULL_REQUEST' || textContent.includes('merged') || textContent.includes('기여')) {
        actionSuffix = "에 기여했습니다";
      } else {
        return;
      }

      if (this.useDevTerms) {
        actionSuffix = this.applyDevTerms(actionSuffix);
      }

      shrinkElem.innerHTML = '';
      shrinkElem.appendChild(userAnchor);
      shrinkElem.appendChild(document.createTextNode(" 님이 "));

      const textWalker = document.createTreeWalker(overflowElem, NodeFilter.SHOW_TEXT, null, false);
      let textNode;
      while ((textNode = textWalker.nextNode())) {
        let text = textNode.textContent.replace(/^\s+|\s+$/g, '');
        let translated = this.transText(text); // 번역 시도
        textNode.textContent = translated ? translated : text;
        this.processedNodes.add(textNode);
      }

      const actionSpan = document.createElement('span');
      actionSpan.className = 'color-fg-muted flex-shrink-0';
      actionSpan.style.whiteSpace = 'nowrap';
      actionSpan.textContent = actionSuffix;
      this.processedNodes.add(actionSpan);

      overflowElem.style.display = 'inline-flex';
      overflowElem.style.alignItems = 'baseline';
      overflowElem.appendChild(actionSpan);

      this.processedNodes.add(parent);
    } catch (e) {}
  }

  reorderUpdatedRelativeTime(div) {
    if (this.processedNodes.has(div)) return;

    try {
      const relTime = div.querySelector("relative-time");
      if (!relTime) return;

      let updatedTextNode = null;
      div.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("Updated")) {
          updatedTextNode = node;
        }
      });
      if (!updatedTextNode) return;

      const children = Array.from(div.childNodes);
      if (children.indexOf(relTime) < children.indexOf(updatedTextNode)) return;

      const newText = " " + updatedTextNode.textContent.trim();
      updatedTextNode.remove();

      relTime.insertAdjacentText('afterend', newText);
      this.processedNodes.add(div);
    } catch (e) {}
  }

  removeOnPrefix(element) {
    try {
      const relativeTimes = element.matches('relative-time') ? [element] : element.querySelectorAll("relative-time");
      relativeTimes.forEach(rt => {
        const prev = rt.previousSibling;
        if (prev && prev.nodeType === Node.TEXT_NODE) {
          prev.textContent = prev.textContent.replace(/\bon\s*$/, '');
          this.processedNodes.add(prev);
        }
      });
    } catch (e) {}
  }

  detectPageType() {
    if (typeof I18N === 'undefined' || !I18N.conf) return false;

    const { PAGE_MAP, SPECIAL_SITES } = this.config;
    const url = new URL(window.location.href);
    const { hostname, pathname } = url;
    const site = PAGE_MAP[hostname] || 'github';
    const isLogin = document.body.classList.contains("logged-in");
    const metaLocation = document.head.querySelector('meta[name="analytics-location"]')?.content || '';
    const isSession = document.body.classList.contains("session-authentication");
    const isHomepage = pathname === '/' && site === 'github';
    const isProfile = document.body.classList.contains("page-profile") || metaLocation === '/<user-name>';
    const isRepository = /\/<user-name>\/<repo-name>/.test(metaLocation);
    const isOrganization = /\/<org-login>/.test(metaLocation) || /^\/(?:orgs|organizations)/.test(pathname);
    const { rePagePathRepo, rePagePathOrg, rePagePath } = I18N.conf;
    let pageType;

    switch (true) {
      case isSession: pageType = 'session-authentication'; break;
      case SPECIAL_SITES.includes(site): pageType = site; break;
      case isProfile:
        const tabParam = new URLSearchParams(url.search).get('tab');
        pageType = pathname.includes('/stars') ? 'page-profile/stars'
                 : tabParam ? `page-profile/${tabParam}` : 'page-profile';
        break;
      case isHomepage: pageType = isLogin ? 'dashboard' : 'homepage'; break;
      case isRepository:
        const repoMatch = pathname.match(rePagePathRepo);
        pageType = repoMatch ? `repository/${repoMatch[1]}` : 'repository';
        break;
      case isOrganization:
        const orgMatch = pathname.match(rePagePathOrg);
        pageType = orgMatch ? `orgs/${orgMatch[1] || orgMatch.slice(-1)[0]}` : 'orgs';
        break;
      default:
        const pathMatch = pathname.match(rePagePath);
        pageType = pathMatch ? (pathMatch[1] || pathMatch.slice(-1)[0]) : false;
    }

    if (pageType === false || !I18N[this.config.LANG]?.[pageType]) {
      return false;
    }
    return pageType;
  }

  buildPageConfig(pageType) {
    if (typeof I18N === 'undefined') return;

    const langPack = I18N[this.config.LANG];
    const conf = I18N.conf;
    this.pageConfig = {
      currentPageType: pageType,
      staticDict: {
        ...langPack.public.static,
        ...(langPack[pageType]?.static || {})
      },
      regexpRules: [
        ...langPack.public.regexp,
        ...(langPack[pageType]?.regexp || [])
      ],
      ignoreSelectors: [
        ...conf.ignoreSelectorPage['*'],
        ...(conf.ignoreSelectorPage[pageType] || [])
      ].join(', '),
      tranSelectors: [
        ...(langPack.public.selector || []),
        ...(langPack[pageType]?.selector || [])
      ],
    };
  }
  
  updatePageConfig() {
    const newType = this.detectPageType();
    if (newType && newType !== this.pageConfig.currentPageType) {
      this.buildPageConfig(newType);
      if (this.logPerformance) console.log(`[Debug] Page type changed: ${newType}`);
    }
  }

  transText(text) {
    if (!this.useTranslation || !text || /^\s*$/.test(text)) return false;

    const trimmedText = text.trim();
    if (!/[a-zA-Z]/.test(trimmedText)) return false; 

    let translated = this.pageConfig.staticDict[trimmedText];
    if (typeof translated === 'string') {
      let result = text.replace(trimmedText, translated);
      if (this.useDevTerms) result = this.applyDevTerms(result);
      return result;
    }

    for (const [pattern, replacement] of this.pageConfig.regexpRules) {
      if (pattern.test(trimmedText)) {
        translated = trimmedText.replace(pattern, replacement);
        let result = text.replace(trimmedText, translated);
        if (this.useDevTerms) result = this.applyDevTerms(result);
        return result;
      }
    }

    return false;
  }

  resolveKoreanParticles(rootNode) {
    if (!rootNode || !rootNode.ownerDocument) return;
    const targetNode = rootNode.nodeType === Node.ELEMENT_NODE ? rootNode : rootNode.parentElement;
    if (!targetNode || this.processedNodes.has(targetNode)) return;

    const walker = document.createTreeWalker(targetNode, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => this.processedNodes.has(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    }, false);
    
    let textNode;
    const regex = /(을\(를\)|이\(가\)|은\(는\)|와\(과\))/g;

    while ((textNode = walker.nextNode())) {
      if (!regex.test(textNode.textContent)) continue;

      const newText = textNode.textContent.replace(regex, (match, p1, offset, string) => {
        let prevChar = '';
        const textBefore = string.substring(0, offset);
        const localMatch = textBefore.match(/[가-힣a-zA-Z0-9](?=[^가-힣a-zA-Z0-9]*$)/);

        if (localMatch) {
          prevChar = localMatch[0];
        } else {
          const prevWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
          prevWalker.currentNode = textNode;
          let pNode;
          while ((pNode = prevWalker.previousNode())) {
            const pMatch = pNode.textContent.match(/[가-힣a-zA-Z0-9](?=[^가-힣a-zA-Z0-9]*$)/);
            if (pMatch) {
              prevChar = pMatch[0];
              break;
            }
          }
        }

        if (prevChar) {
          let hasJongseong = false;
          if (/[가-힣]/.test(prevChar)) {
            hasJongseong = (prevChar.charCodeAt(0) - 0xAC00) % 28 > 0;
          } else {
            hasJongseong = /[136780lLmMnNrR]/.test(prevChar);
          }

          if (match === '을(를)') return hasJongseong ? '을' : '를';
          if (match === '이(가)') return hasJongseong ? '이' : '가';
          if (match === '은(는)') return hasJongseong ? '은' : '는';
          if (match === '와(과)') return hasJongseong ? '과' : '와';
        }
        return match;
      });

      if (textNode.textContent !== newText) {
        textNode.textContent = newText;
        this.processedNodes.add(textNode);
      }
    }
  }

  processNode(node) {
    if (!this.useTranslation || !this.pageConfig || !this.pageConfig.ignoreSelectors) return;
    if (this.processedNodes.has(node)) return;

    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.matches(this.pageConfig.ignoreSelectors) || node.closest(this.pageConfig.ignoreSelectors)) {
        return;
      }

      const flexElements = node.matches('.flex-1') ? [node] : Array.from(node.querySelectorAll('span.flex-1'));
      flexElements.forEach(flexElem => {
        if (flexElem.parentElement && flexElem.parentElement.tagName === 'H3') {
          this.reorderFlexElements(flexElem);
        }
      });

      if (node.tagName === 'DIV' && node.querySelector('relative-time')) {
        if (node.textContent.includes('Updated')) {
          this.reorderUpdatedRelativeTime(node);
          this.removeOnPrefix(node);
        }
      }
    }

    const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        if (this.processedNodes.has(n)) return NodeFilter.FILTER_REJECT;
        if (n.nodeType === Node.ELEMENT_NODE) {
          if (n.matches(this.pageConfig.ignoreSelectors)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
        if (n.nodeType === Node.TEXT_NODE) {
          if (/^\s*$/.test(n.textContent)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    });
    
    while (treeWalker.nextNode()) {
      const currentNode = treeWalker.currentNode;

      if (currentNode.nodeType === Node.TEXT_NODE) {
        const translated = this.transText(currentNode.textContent);
        if (translated && currentNode.textContent !== translated) {
          currentNode.textContent = translated;
          this.processedNodes.add(currentNode);
        }
      } 
      else if (currentNode.nodeType === Node.ELEMENT_NODE) {
        const translatableAttributes = ['placeholder', 'title', 'aria-label', 'value', 'data-confirm'];
        let attrModified = false;
        for (const attr of translatableAttributes) {
          if (currentNode.hasAttribute(attr)) {
            if (attr === 'value') {
              const tagName = currentNode.tagName.toUpperCase();
              const type = (currentNode.getAttribute('type') || '').toLowerCase();
              if (tagName === 'OPTION') continue;
              if (tagName === 'INPUT' && !['button', 'submit', 'reset'].includes(type)) continue;
              if (tagName === 'BUTTON') continue;
            }

            const translated = this.transText(currentNode.getAttribute(attr));
            if (translated && currentNode.getAttribute(attr) !== translated) {
              currentNode.setAttribute(attr, translated);
              attrModified = true;
            }
          }
        }
        if (attrModified) this.processedNodes.add(currentNode);
      }
    }

    if (this.useParticles) {
      this.resolveKoreanParticles(node);
    }
  }

  transTitle() {
    if (!this.useTranslation) return;
    const titleNode = document.querySelector('title');
    if (titleNode && this.processedNodes.has(titleNode)) return;

    const originalTitle = document.title;
    const translated = this.transText(originalTitle);
    if (translated && originalTitle !== translated) {
      document.title = translated;
      if (titleNode) this.processedNodes.add(titleNode);
    }
  }

  mutationCallback(mutations) {
    if (!this.useTranslation) return;
    
    const start = performance.now();

    if (document.documentElement.lang !== this.config.LANG) {
      document.documentElement.lang = this.config.LANG;
    }

    for (const mutation of mutations) {
      if (this.processedNodes.has(mutation.target)) continue;

      if (mutation.target.nodeName === 'TITLE') {
        this.transTitle();
        continue;
      }

      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
            this.processNode(node);
          }
        });
      } else if (mutation.type === 'attributes' || mutation.type === 'characterData') {
        this.processNode(mutation.target);
      }
    }

    if (this.logPerformance) {
      const duration = performance.now() - start; 
      if (duration > 5) { 
        console.log(`[DOM 처리 소요시간] ${duration.toFixed(2)}ms`);
      }
    }
  }

  injectSponsorBannerStyle() {
    if (document.getElementById('github-kr-banner-style')) return;
    const style = document.createElement('style');
    style.id = 'github-kr-banner-style';
    style.textContent = `
      .gh-kr-banner-container {
        margin: 16px 0; border: 1px solid var(--color-border-default); border-radius: 6px; 
        background-color: var(--color-canvas-subtle); padding: 16px; display: flex; 
        align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
      }
      .gh-kr-banner-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 280px; }
      .gh-kr-banner-icon {
        background-color: var(--color-canvas-default); border: 1px solid var(--color-border-default); 
        border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; 
        justify-content: center; flex-shrink: 0; box-shadow: var(--color-shadow-small);
      }
      .gh-kr-banner-text-group { display: flex; flex-direction: column; line-height: 1.4; }
      .gh-kr-banner-title { font-weight: 600; font-size: 14px; color: var(--color-fg-default); }
      .gh-kr-banner-subtitle { font-size: 12px; color: var(--color-fg-muted); }
      .gh-kr-banner-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
      .gh-kr-banner-close-group { display: flex; align-items: center; gap: 8px; }
      .gh-kr-banner-close-btn {
        cursor: pointer; background: transparent; border: none; padding: 4px; 
        color: var(--color-fg-muted); display: flex; align-items: center; 
        justify-content: center; border-radius: 4px; transition: background-color 0.2s;
      }
      .gh-kr-banner-close-btn:hover { background-color: var(--color-action-list-item-danger-hover-bg, rgba(200, 0, 0, 0.1)); }
    `;
    document.head.appendChild(style);
  }

  async injectSponsorBanner() {
    if (window.location.hostname !== 'github.com' || window.location.pathname !== '/') {
      return;
    }

    const isLoggedIn = document.body.classList.contains("logged-in");
    
    const feedContainer = document.querySelector('.feed-content.flex-justify-center.border-bottom');

    if (!isLoggedIn || !feedContainer) {
      return;
    }

    if (document.getElementById('github-kr-sponsor-banner') || this.isBannerInjecting) return;

    const storageKey = 'github_kr_banner_dismissed_at';
    const lastDismissed = await this.storageGet(storageKey, 0);
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (now - lastDismissed < ONE_DAY) return;

    this.isBannerInjecting = true;

    try {
      const JSON_URL = 'https://raw.githubusercontent.com/newhajinyoon/github-korean/main/sponsors.json';
      const response = await fetch(JSON_URL);
      if (!response.ok) throw new Error();
      const data = await response.json();
      
      if (!data?.sponsors?.length) {
        this.isBannerInjecting = false;
        return;
      }
      
      if (document.getElementById('github-kr-sponsor-banner')) {
        this.isBannerInjecting = false;
        return;
      }

      const randomIndex = Math.floor(Math.random() * data.sponsors.length);
      const sponsorData = data.sponsors[randomIndex];

      this.injectSponsorBannerStyle();

      const bannerHtml = `
        <div id="github-kr-sponsor-banner" class="gh-kr-banner-container">
          <div class="gh-kr-banner-left">
            <div class="gh-kr-banner-icon">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-heart-fill" style="color: #bf3989;">
                <path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 0 0 8 13.393a20.561 20.561 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path>
              </svg>
            </div>
            <div class="gh-kr-banner-text-group">
              <span class="gh-kr-banner-title">${sponsorData.text}</span>
              <span class="gh-kr-banner-subtitle">${sponsorData.subtext}</span>
            </div>
          </div>
          <div class="gh-kr-banner-right">
            <a href="${sponsorData.link}" target="_blank" class="btn btn-sm" style="font-weight: 500;">확인하기</a>
            <div class="gh-kr-banner-close-group">
              <span class="gh-kr-banner-subtitle">오늘 하루 안 나와요</span>
              <button id="github-kr-banner-close" aria-label="닫기" title="닫기 (오늘 하루 보지 않기)" type="button" class="gh-kr-banner-close-btn">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-x">
                  <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;

    const targetContainer = document.querySelector('div.repository-content') || document.querySelector('main');
    if (targetContainer) {
      const template = document.createElement('template');
      template.innerHTML = bannerHtml.trim();
      const bannerEl = template.content.firstChild;
      targetContainer.insertBefore(bannerEl, targetContainer.firstChild);

      const closeBtn = bannerEl.querySelector('#github-kr-banner-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', async () => {
          bannerEl.remove();
          await this.storageSet(storageKey, Date.now());
        });
      }
    }
  } catch (e) {
  } finally {
    this.isBannerInjecting = false;
  }
}

  async init() {
    if (typeof I18N === 'undefined') return;

    const settings = await chrome.storage.local.get({
      useTranslation: true,
      useDevTerms: false,
      useParticles: true,
      useLogs: false
    });
    
    this.useTranslation = settings.useTranslation;
    this.useDevTerms = settings.useDevTerms;
    this.useParticles = settings.useParticles;
    this.logPerformance = settings.useLogs;

    chrome.storage.onChanged.addListener((changes) => {
      let needsReload = false;
      
      if (changes.useTranslation) {
        this.useTranslation = changes.useTranslation.newValue;
        needsReload = true;
      }
      if (changes.useDevTerms) {
        this.useDevTerms = changes.useDevTerms.newValue;
        needsReload = true;
      }
      if (changes.useParticles) {
        this.useParticles = changes.useParticles.newValue;
      }
      if (changes.useLogs) {
        this.logPerformance = changes.useLogs.newValue;
      }

      if (needsReload) {
        window.location.reload();
      }
    });

    if (!this.useTranslation) return;

    this.observer = new MutationObserver(this.mutationCallback.bind(this));

    const startTranslation = () => {
      document.documentElement.lang = this.config.LANG;
      this.updatePageConfig();
      this.processNode(document.body);
      this.transTitle();
      
      this.observer.disconnect();
      this.observer.observe(document.documentElement, this.observerConfig);

      this.injectSponsorBanner();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startTranslation, { once: true });
    } else {
      startTranslation();
    }
    
    document.addEventListener('turbo:load', () => {
      if (!this.useTranslation) return;
      this.previousURL = window.location.href; 
      startTranslation();
    });
  }
}

new GitHubPageEnhancer().init();