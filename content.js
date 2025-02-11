(function (window, document, undefined) {
    'use strict';

    /****************** GM_* 함수 폴리필 ******************/
    // GM_getValue: localStorage를 사용 (여기서는 정규식 기능은 항상 true)
    function GM_getValue(key, defaultValue) {
        const value = localStorage.getItem(key);
        if (value === null) return defaultValue;
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

    // GM_setValue: localStorage에 JSON 문자열로 저장
    function GM_setValue(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // GM_notification: Notification API 사용 (권한 필요)
    function GM_notification(message) {
        if (Notification.permission === "granted") {
            new Notification(message);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") new Notification(message);
            });
        }
        console.log("Notification: " + message);
    }

    // GM_xmlhttpRequest: fetch API를 이용한 간단한 구현
    function GM_xmlhttpRequest(options) {
        const method = options.method || "GET";
        let url = options.url;
        if (method === "GET" && options.params) {
            const query = new URLSearchParams(options.params).toString();
            url += "?" + query;
        }
        fetch(url, {
            method: method,
            headers: options.headers,
            body: method === "POST" ? options.data : undefined,
        })
        .then(response => response.text().then(text => {
            options.onload({ responseText: text });
        }))
        .catch(error => {
            options.onerror({ type: error.name });
        });
    }

    /****************** 원본 스크립트 코드 ******************/
    // 정규식 기능은 항상 활성화 (항상 true)
    const FeatureSet = {
        enable_RegExp: true
    };

    const CONFIG = {
        LANG: 'ko-KR', // 필요에 따라 'ko-KR' 등으로 변경 가능
        // 사이트 도메인 -> 유형 매핑
        PAGE_MAP: {
            'gist.github.com': 'gist',
            'www.githubstatus.com': 'status',
            'skills.github.com': 'skills',
            'education.github.com': 'education'
        },
        // 특별 처리 대상 사이트
        SPECIAL_SITES: ['gist', 'status', 'skills', 'education'],
        OBSERVER_CONFIG: {
            childList: true,
            subtree: true,
            characterData: true,
            attributeFilter: ['value', 'placeholder', 'aria-label', 'data-confirm']
        },
    };

    let pageConfig = {};

    // 페이지 설정 업데이트
    function updatePageConfig() {
        const newType = detectPageType();
        if (newType && newType !== pageConfig.currentPageType) {
            pageConfig = buildPageConfig(newType);
        }
    }

    // 페이지 설정 객체 구성
    function buildPageConfig(pageType = pageConfig.currentPageType) {
        return {
            currentPageType: pageType,
            firstChangeURL: false,
            // 정적 번역 사전
            staticDict: {
                ...I18N[CONFIG.LANG].public.static,
                ...(I18N[CONFIG.LANG][pageType]?.static || {})
            },
            // 정규식 번역 규칙
            regexpRules: [
                ...I18N[CONFIG.LANG].public.regexp,
                ...(I18N[CONFIG.LANG][pageType]?.regexp || [])
            ],
            // 무시할 Mutation 선택자 (문자열)
            ignoreMutationSelectors: [
                ...I18N.conf.ignoreMutationSelectorPage['*'],
                ...(I18N.conf.ignoreMutationSelectorPage[pageType] || [])
            ].join(', '),
            // 무시할 요소 선택자 규칙 (문자열)
            ignoreSelectors: [
                ...I18N.conf.ignoreSelectorPage['*'],
                ...(I18N.conf.ignoreSelectorPage[pageType] || [])
            ].join(', '),
            // 문자 데이터 감시 활성화 여부
            characterData: I18N.conf.characterDataPage.includes(pageType),
            // CSS 선택자 규칙
            tranSelectors: [
                ...(I18N[CONFIG.LANG].public.selector || []),
                ...(I18N[CONFIG.LANG][pageType]?.selector || [])
            ],
        };
    }

    /**
     * 페이지 변화 감시 및 번역 처리
     */
    function watchUpdate() {
        let previousURL = window.location.href;

        const handleUrlChange = () => {
            const currentURL = window.location.href;
            if (currentURL !== previousURL) {
                previousURL = currentURL;
                updatePageConfig();
                console.log(`【Debug】페이지 전환 pageType= ${pageConfig.currentPageType}`);
                pageConfig.firstChangeURL = false;
            }
        };

        const processMutations = mutations => {
            mutations.flatMap(({ target, addedNodes, type }) => {
                if (type === 'childList' && addedNodes.length > 0) {
                    return [...addedNodes];
                }
                return (type === 'attributes' || (type === 'characterData' && pageConfig.characterData))
                    ? [target]
                    : [];
            })
            .filter(node =>
                !node.parentElement?.closest(pageConfig.ignoreMutationSelectors)
            )
            .forEach(node =>
                traverseNode(node)
            );
        };

        new MutationObserver(mutations => {
            if (pageConfig.firstChangeURL) handleUrlChange();
            if (pageConfig.currentPageType) processMutations(mutations);
        }).observe(document.body, CONFIG.OBSERVER_CONFIG);
    }

    /**
     * 노드 트리 순회하며 번역 처리
     */
    function traverseNode(rootNode) {
        const start = performance.now();

        const handleTextNode = node => {
            if (node.length > 500) return;
            transElement(node, 'data');
        };

        if (rootNode.nodeType === Node.TEXT_NODE) {
            handleTextNode(rootNode);
            return;
        }

        const treeWalker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
            {
                acceptNode: node =>
                    node.matches?.(pageConfig.ignoreSelectors) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
            }
        );

        const handleElement = node => {
            switch (node.tagName) {
                // case "RELATIVE-TIME":
                //     transTimeElement(node.shadowRoot);
                //     watchTimeElement(node.shadowRoot);
                //     return;
                case "INPUT":
                case "TEXTAREA":
                    if (['button', 'submit', 'reset'].includes(node.type)) {
                        transElement(node.dataset, 'confirm');
                        transElement(node, 'value');
                    } else {
                        transElement(node, 'placeholder');
                    }
                    break;
                case "OPTGROUP":
                    transElement(node, 'label');
                    break;
                case "BUTTON":
                    transElement(node, 'title');
                    transElement(node.dataset, 'confirm');
                    transElement(node.dataset, 'confirmText');
                    transElement(node.dataset, 'confirmCancelText');
                    transElement(node, 'cancelConfirmText');
                    transElement(node.dataset, 'disableWith');
                case "A":
                case "SPAN":
                    transElement(node, 'title');
                default:
                    if (/tooltipped/.test(node.className)) transElement(node, 'ariaLabel');
            }
        };

        const handlers = {
            [Node.ELEMENT_NODE]: handleElement,
            [Node.TEXT_NODE]: handleTextNode
        };

        let currentNode;
        while ((currentNode = treeWalker.nextNode())) {
            handlers[currentNode.nodeType]?.(currentNode);
        }

        const duration = performance.now() - start;
        if (duration > 10) {
            console.log(`노드 탐색 소요시간: ${duration.toFixed(2)}ms`);
        }
    }

    /**
     * 페이지 유형 감지 (URL, 클래스명, meta 정보 기반)
     */
    function detectPageType() {
        const { PAGE_MAP, SPECIAL_SITES } = CONFIG;
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
            case isSession:
                pageType = 'session-authentication';
                break;
            case SPECIAL_SITES.includes(site):
                pageType = site;
                break;
            case isProfile:
                const tabParam = new URLSearchParams(url.search).get('tab');
                pageType = pathname.includes('/stars') ? 'page-profile/stars'
                         : tabParam ? `page-profile/${tabParam}`
                         : 'page-profile';
                break;
            case isHomepage:
                pageType = isLogin ? 'dashboard' : 'homepage';
                break;
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

        console.log(`【Debug】pathname = ${pathname}, site = ${site}, isLogin = ${isLogin}, analyticsLocation = ${metaLocation}, isOrganization = ${isOrganization}, isRepository = ${isRepository}, isProfile = ${isProfile}, isSession = ${isSession}`);

        if (pageType === false || !I18N[CONFIG.LANG]?.[pageType]) {
            console.warn(`[i18n] 페이지 유형 미일치 또는 사전 누락: ${pageType}`);
            return false;
        }

        return pageType;
    }

    /**
     * 페이지 제목 번역
     */
    function transTitle() {
        const text = document.title;
        let translatedText = I18N[CONFIG.LANG]['title']['static'][text] || '';
        if (!translatedText) {
            const res = I18N[CONFIG.LANG]['title'].regexp || [];
            for (const [pattern, replacement] of res) {
                translatedText = text.replace(pattern, replacement);
                if (translatedText !== text) break;
            }
        }
        document.title = translatedText;
    }

    /**
     * 시간 요소 번역
     */
    function transTimeElement(el) {
        const text = el.childNodes.length > 0 ? el.lastChild.textContent : el.textContent;
        const translatedText = text.replace(/^on/, "");
        if (translatedText !== text) {
            el.textContent = translatedText;
        }
    }

    function watchTimeElement(el) {
        new MutationObserver(mutations => {
            transTimeElement(mutations[0].addedNodes[0]);
        }).observe(el, {
            childList: true
        });
    }

    /**
     * 요소의 텍스트 또는 속성을 번역
     */
    function transElement(el, field) {
        const text = el[field];
        if (!text) return false;

        const translatedText = transText(text);
        if (translatedText) {
            el[field] = translatedText;
        }
    }

    /**
     * 텍스트 번역 처리
     */
    function transText(text) {
        const shouldSkip = text => /^[\s0-9]*$/.test(text) || /^[\u4e00-\u9fa5]+$/.test(text) || !/[a-zA-Z,.]/.test(text);
        if (shouldSkip(text)) return false;

        const trimmedText = text.trim();
        const cleanedText = trimmedText.replace(/\xa0|[\s]+/g, ' ');

        const translatedText = fetchTranslatedText(cleanedText);

        if (translatedText && translatedText !== cleanedText) {
            return text.replace(trimmedText, translatedText);
        }

        return false;
    }

    /**
     * 정적/정규식 사전에서 번역문 검색
     */
    function fetchTranslatedText(text) {
        let translatedText = pageConfig.staticDict[text];

        if (typeof translatedText === 'string') return translatedText;

        if (FeatureSet.enable_RegExp) {
            for (const [pattern, replacement] of pageConfig.regexpRules) {
                translatedText = text.replace(pattern, replacement);
                if (translatedText !== text) return translatedText;
            }
        }

        return false;
    }

    /**
     * 중첩 객체의 속성을 안전하게 조회
     */
    function getNestedProperty(obj, path) {
        return path.split('.').reduce((acc, part) => {
            const match = part.match(/(\w+)(?:\[(\d+)\])?/);
            if (!match) return undefined;
            const key = match[1];
            const index = match[2];
            if (acc && acc[key] !== undefined) {
                return index !== undefined ? acc[key][index] : acc[key];
            }
            return undefined;
        }, obj);
    }

    /**
     * CSS 선택자로 요소 찾아서 번역 처리
     */
    function transBySelector() {
        pageConfig.tranSelectors?.forEach(([selector, translatedText]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = translatedText;
            }
        });
    }

    /****************** 초기화 ******************/
    function init() {
        updatePageConfig();
        console.log(`【Debug】시작 pageType= ${pageConfig.currentPageType}`);

        if (pageConfig.currentPageType) traverseNode(document.body);

        watchUpdate();
    }

    // 페이지 lang 설정 (예: ko-KR)
    document.documentElement.lang = CONFIG.LANG;
    new MutationObserver(() => {
        if (document.documentElement.lang === "en") {
            document.documentElement.lang = CONFIG.LANG;
        }
    }).observe(document.documentElement, {
        attributeFilter: ['lang']
    });

    // Turbo 프레임워크 관련 이벤트 리스너
    document.addEventListener('turbo:before-fetch-response', () => {
        pageConfig.firstChangeURL = true;
    });

    // Turbo 로드 완료 시 제목 및 기본 요소 번역 (설명 번역 기능은 제거됨)
    document.addEventListener('turbo:load', () => {
        if (!pageConfig.currentPageType) return;
        transTitle();
        transBySelector();
    });

    // DOMContentLoaded 시 초기화
    window.addEventListener('DOMContentLoaded', init);

})(window, document);

// Turbo 로드 완료 시 전체 페이지를 다시 번역하도록 재적용
document.addEventListener('turbo:load', () => {
    // 페이지 설정 업데이트(페이지 유형 재감지)
    updatePageConfig();
    console.log(`【Debug】Turbo load - 재적용 pageType= ${pageConfig.currentPageType}`);
    
    // 전체 페이지의 번역 재적용
    traverseNode(document.body);
    
    // 페이지 제목 및 정적 선택자 번역도 재실행
    transTitle();
    transBySelector();
});
