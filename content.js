// === 스크립트 전체를 관리하는 클래스 ===
class GitHubPageEnhancer {
  /**
   * 클래스 생성자: 초기 설정을 담당합니다.
   */
  constructor() {
    // 번역 및 페이지 유형 감지에 필요한 설정
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

    // 현재 페이지의 번역 규칙 등을 담을 객체
    this.pageConfig = {};
    // 이전 URL을 저장하여 페이지 변경을 감지
    this.previousURL = window.location.href;

    // MutationObserver 설정: 관찰할 DOM 변경 유형 정의
    this.observerConfig = {
      childList: true,
      subtree: true,
      characterData: true,
      attributeFilter: ['value', 'placeholder', 'aria-label', 'data-confirm', 'lang']
    };

    // 성능 측정을 위한 옵션
    this.logPerformance = false;
  }

  /*────────────────────────────────────────────
     1. 확장 프로그램용 유틸리티 (Extension Utilities)0
  ────────────────────────────────────────────*/

  /**
   * 확장 프로그램 스토리지에서 데이터를 가져옵니다. (비동기)
   * @param {string} key - 가져올 데이터의 키
   * @param {*} defaultValue - 키에 해당하는 데이터가 없을 경우 반환할 기본값
   * @returns {Promise<*>} 저장된 값
   */
  async storageGet(key, defaultValue) {
    try {
      const result = await chrome.storage.local.get(key);
      return result[key] === undefined ? defaultValue : result[key];
    } catch (e) {
      console.warn('확장 프로그램 스토리지에 접근할 수 없습니다. localStorage를 사용합니다.');
      const value = localStorage.getItem(key);
      if (value === null) return defaultValue;
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
  }

  /**
   * 확장 프로그램 스토리지에 데이터를 저장합니다. (비동기)
   * @param {string} key - 저장할 데이터의 키
   * @param {*} value - 저장할 값
   */
  async storageSet(key, value) {
    try {
      await chrome.storage.local.set({ [key]: value });
    } catch (e) {
      console.warn('확장 프로그램 스토리지에 접근할 수 없습니다. localStorage를 사용합니다.');
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * 확장 프로그램 API를 사용해 알림을 표시합니다.
   * @param {string} message - 알림에 표시할 메시지
   */
  notify(message) {
    const notificationOptions = {
      type: 'basic',
      iconUrl: '/images/icon48.png', // 확장 프로그램에 포함된 아이콘 경로
      title: 'GitHub Enhancer',
      message: message
    };
    try {
      chrome.notifications.create(notificationOptions);
    } catch (e) {
      console.warn('확장 프로그램 알림 API를 사용할 수 없습니다. 콘솔에 로그를 남깁니다.');
      console.log(`Notification: ${message}`);
    }
  }

  /**
   * fetch API를 사용한 네트워크 요청
   * @param {object} options - 요청 옵션 (url, method, headers, data 등)
   */
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


  /*────────────────────────────────────────────
     2. DOM 조작 및 재배치 (DOM Manipulation & Reordering)
     - 여러 함수로 흩어져 있던 DOM 변경 로직을 통합합니다.
  ────────────────────────────────────────────*/

  /**
   * 특정 패턴의 flex 컨테이너 내부 요소 순서를 변경합니다.
   * 예: "User starred Repo" -> "User 님이 Repo 에 스타"
   * @param {HTMLElement} parent - 대상이 되는 .flex-1 요소
   */
  reorderFlexElements(parent) {
    const reorders = [
      { keyword: "starred", textBefore: "님이", textAfter: text => text },
      { keyword: "forked", textBefore: "님이 ", textAfter: text => " " + text.trim() },
      { keyword: "added a repository to", textBefore: "님이", textAfter: text => text },
      { keyword: "started following", textBefore: " 님이 ", textAfter: " started following" }
    ];

    for (const { keyword, textBefore, textAfter } of reorders) {
      if (parent.textContent.includes(keyword) && !parent.dataset.reordered) {
        const shrinkElem = parent.querySelector('.flex-shrink-0');
        const overflowElem = parent.querySelector('.overflow-auto');
        if (!shrinkElem || !overflowElem) continue;

        const anchor = shrinkElem.querySelector('a');
        if (!anchor) continue;

        let targetTextNode = null;
        shrinkElem.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.includes(keyword)) {
            targetTextNode = node;
          }
        });
        if (!targetTextNode) continue;

        // 더 효율적이고 안전한 append로 DOM 조작 (innerHTML 대신)
        const afterContent = typeof textAfter === 'function'
          ? textAfter(targetTextNode.textContent)
          : textAfter;

        parent.innerHTML = ''; // 내용을 비우고
        parent.append(anchor, textBefore, overflowElem, afterContent); // 새 순서대로 추가

        parent.dataset.reordered = 'true'; // 중복 실행 방지 플래그
        break;
      }
    }
  }

  /**
   * "Updated" 텍스트와 <relative-time> 요소의 순서를 변경합니다.
   * @param {HTMLElement} div - 대상이 되는 div.f6.color-fg-muted.mt-2 요소
   */
  reorderUpdatedRelativeTime(div) {
    if (div.dataset.reordered) return;

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

    // relative-time 뒤에 텍스트를 추가
    relTime.insertAdjacentText('afterend', newText);
    div.dataset.reordered = 'true';
  }

  /**
   * <relative-time> 요소 주변의 "on" 접두사를 제거합니다.
   * @param {HTMLElement} element - 대상 요소
   */
  removeOnPrefix(element) {
    const relativeTimes = element.matches('relative-time') ? [element] : element.querySelectorAll("relative-time");

    relativeTimes.forEach(rt => {
      const prev = rt.previousSibling;
      if (prev && prev.nodeType === Node.TEXT_NODE) {
        prev.textContent = prev.textContent.replace(/\bon\s*$/, '');
      }
    });
  }

  /*────────────────────────────────────────────
     3. 페이지 번역 로직 (Page Translation Logic)
  ────────────────────────────────────────────*/

  /**
   * 페이지 URL과 상태를 분석하여 페이지 유형을 감지합니다.
   * @returns {string|false} 감지된 페이지 유형 또는 실패 시 false
   */
  detectPageType() {
    // 원본 함수의 로직을 그대로 유지
    // (이 부분은 GitHub의 DOM 구조에 매우 특화되어 있으므로 변경하지 않음)
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
        console.warn(`[i18n] 페이지 유형 미일치 또는 사전 누락: ${pageType}`);
        return false;
    }
    return pageType;
  }

  /**
   * 페이지 유형에 맞는 번역 규칙(사전, 정규식 등)을 빌드합니다.
   * @param {string} pageType - 현재 페이지 유형
   */
  buildPageConfig(pageType) {
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
  
  /**
   * 페이지 유형을 감지하고 그에 맞는 설정을 업데이트합니다.
   */
  updatePageConfig() {
    const newType = this.detectPageType();
    if (newType && newType !== this.pageConfig.currentPageType) {
      this.buildPageConfig(newType);
      console.log(`【Debug】페이지 유형 변경: ${newType}`);
    }
  }

  /**
   * 텍스트를 번역합니다.
   * @param {string} text - 번역할 원본 텍스트
   * @returns {string|false} 번역된 텍스트 또는 번역 실패 시 false
   */
  transText(text) {
    if (!text || /^\s*$/.test(text)) return false;

    const trimmedText = text.trim();
    if (!/[a-zA-Z]/.test(trimmedText)) return false; // 알파벳이 없으면 번역 시도 안함

    // 1. Static Dictionary
    let translated = this.pageConfig.staticDict[trimmedText];
    if (typeof translated === 'string') {
        return text.replace(trimmedText, translated);
    }

    // 2. RegExp Rules
    for (const [pattern, replacement] of this.pageConfig.regexpRules) {
        if (pattern.test(trimmedText)) {
            translated = trimmedText.replace(pattern, replacement);
            return text.replace(trimmedText, translated);
        }
    }

    return false;
  }

  /**
   * 단일 노드(Element 또는 Text)를 순회하며 번역 및 DOM 조작을 수행합니다.
   * @param {Node} node - 처리할 노드
   */
  processNode(node) {
    // 무시할 선택자에 해당하면 자식 노드도 처리하지 않고 건너뜀
    if (node.nodeType === Node.ELEMENT_NODE && node.matches(this.pageConfig.ignoreSelectors)) {
      return;
    }

    // 1. 재배치 로직 수행
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.matches('.flex-1')) {
        this.reorderFlexElements(node);
      }
      if (node.matches('div.f6.color-fg-muted.mt-2')) {
        this.reorderUpdatedRelativeTime(node);
        this.removeOnPrefix(node);
      }
    }

    // 2. 번역 로직 수행 (TreeWalker 사용으로 자식 노드는 자동으로 처리됨)
    const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: (n) =>
        n.parentElement && n.parentElement.closest(this.pageConfig.ignoreSelectors)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT,
    });
    
    while (treeWalker.nextNode()) {
      const currentNode = treeWalker.currentNode;
      if (currentNode.nodeType === Node.TEXT_NODE) {
          const translated = this.transText(currentNode.textContent);
          if (translated) currentNode.textContent = translated;
      } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
          const translatableAttributes = ['placeholder', 'title', 'aria-label'];
          for (const attr of translatableAttributes) {
              if (currentNode.hasAttribute(attr)) {
                  const translated = this.transText(currentNode.getAttribute(attr));
                  if (translated) currentNode.setAttribute(attr, translated);
              }
          }
      }
    }
  }

  /**
   * 페이지 제목을 번역합니다.
   */
  transTitle() {
    const text = document.title;
    const translated = this.transText(text);
    if(translated) {
        document.title = translated;
    }
  }


  /*────────────────────────────────────────────
     4. 초기화 및 이벤트 리스너 (Initialization & Event Listeners)
  ────────────────────────────────────────────*/

  /**
   * DOM 변경을 감지하여 필요한 작업을 수행하는 통합 콜백 함수.
   * @param {MutationRecord[]} mutations - 감지된 변경 사항 목록
   */
  mutationCallback(mutations) {
    const start = performance.now();

    // URL 변경 확인 (Turbo Drive 등 SPA 환경 대응)
    const currentURL = window.location.href;
    if (currentURL !== this.previousURL) {
      this.previousURL = currentURL;
      this.updatePageConfig();
      this.processNode(document.body); // 페이지 전환 시 전체 재처리
      return;
    }
    
    // lang 속성이 en으로 바뀌면 다시 ko-KR로 설정
    if (document.documentElement.lang !== this.config.LANG) {
      document.documentElement.lang = this.config.LANG;
    }

    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => this.processNode(node));
      } else if (mutation.type === 'attributes' || mutation.type === 'characterData') {
        this.processNode(mutation.target);
      }
    }

    if (this.logPerformance) {
        const duration = performance.지금() - start;
        if (duration > 5) { // 5ms 이상 걸릴 경우에만 로그
            console.log(`DOM 처리 소요시간: ${duration.toFixed(2)}ms`);
        }
    }
  }

  /**
   * 스크립트 실행을 초기화합니다.
   */
  init() {
    console.log("GitHub Page Enhancer 초기화 시작");
    
    // 페이지 언어를 한국어로 강제 설정
    document.documentElement.lang = this.config.LANG;

    // 페이지 유형 감지 및 초기 설정
    this.updatePageConfig();
    
    // 초기 로딩 시 전체 페이지 처리
    if (document.body) {
      this.processNode(document.body);
      this.transTitle();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        this.processNode(document.body);
        this.transTitle();
      }, { once: true });
    }
    
    // Turbo(SPA) 이벤트 리스너
    document.addEventListener('turbo:load', () => {
        console.log(`【Debug】Turbo load - 재적용`);
        this.updatePageConfig();
        this.processNode(document.body);
        this.transTitle();
    });

    // 모든 DOM 변경을 감지할 단일 MutationObserver 시작
    const observer = new MutationObserver(this.mutationCallback.bind(this));
    observer.observe(document.documentElement, this.observerConfig);
  }
}


// 스크립트 실행
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
        new GitHubPageEnhancer().init();
    });
} else {
    new GitHubPageEnhancer().init();
}
