/*******************************************************************************

    locals.js - 搭配用户脚本插件`GitHub 中文化插件`的页面匹配规则, 翻译忽略规则,
                词条库文件
    Copyright (C) 2016-2021 楼教主 (https://github.com/52cik)
    Copyright (C) 2021-当前 沙漠之子 (https://github.com/maboloshi)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

    Home: https://github.com/maboloshi/github-chinese
*/
var I18N = {};

I18N.conf = {

    /**
     * 匹配 pathname 页面的正则
     *
     * 注册页面 /signup
     * 登录二步验证 /login/oauth
     * 登录页面 /login
     * 密码重置 /password_reset
     * 组织页面 /orgs
     * 探索页面 /explore
     * 订阅页面 /notifications/subscriptions
     * 通知页面 /notifications
     * 关注页面 /watching
     * 星标页面 /stars
     * 이슈页面 /issues
     * 拉取请求 /pulls
     * 搜索页面 /search
     * 趋势页面 /trending
     * 展示页面 /showcases
     * 导入仓库 /new/import
     * ...
     */
    rePagePath: /^\/($|home|dashboard|copilot|signup|login\/oauth|login|logout|sessions?|password_reset|orgs|explore|topics|notifications\/subscriptions|notifications|watching|stars|issues|pulls|search|trending|showcases|new\/(import|project)|new|import|settings\/(profile|admin|appearance|accessibility|notifications|billing|emails|security_analysis|security-log|security|auth|sessions|keys|ssh|gpg|organizations|enterprises|blocked_users|interaction_limits|code_review_limits|repositories|codespaces|codespaces\/allow_permissions|deleted_repositories|packages|copilot|pages|replies|installations|apps\/authorizations|reminders|sponsors-log|apps|(?:personal-access-|)tokens|developers|applications\/new|applications|connections\/applications)|settings|installations\/new|marketplace|apps|account\/(organizations\/new|choose|upgrade|billing\/history)|projects|redeem|discussions|events|collections|sponsors|sponsoring|github-copilot\/(signup|free_signup)|codespaces|developer\/register|features|security|sitemap|education)|^\/users\/[^\/]+\/(projects|packages|succession\/invitation)/,

    // 仓库路径
    rePagePathRepo: /^\/[^\/]+\/[^\/]+\/(issues|pulls|pull|tree|watchers|stargazers|new|edit|delete|upload|find|wiki|branches|discussions|activity|rules|releases|packages|tags|labels|milestones|compare|commit|blob|blame|actions(\/metrics\/(usage|performance))?|runs|deployments|security|pulse|community|forks|fork|import|graphs\/(contributors|community|traffic|commit-activity|code-frequency)|network$|network\/(dependencies|dependents|updates|members)|settings\/(access|code_review_limits|interaction_limits|branches|branch_protection_rules|tag_protection|rules|actions|hooks|environments|codespaces|pages|security_analysis|dependabot_rules|keys|secrets|variables|installations|notifications|key_links)|settings|transfer|projects\/new|pkgs|contribute|subscription|invitations|codespaces|attestations|custom-properties)/,

    // 组织路径
    rePagePathOrg: /^\/[^\/]+\/[^\/]+\/(repositories\/new|repositories|sponsoring|discussions|projects|packages|teams|new-team|people|outside-collaborators|pending_collaborators|dashboard|billing_managers\/new|invitations?|settings\/(profile|billing|roles|member_privileges|teams|import-export|blocked_users|interaction_limits|code_review_limits|moderators|repository-defaults|rules|codespaces|copilot|actions|hooks|discussions|packages|pages|projects|security_analysis|security|dependabot_rules|domains|secrets|variables|oauth_application_policy|installations|personal-access-token|reminders|sponsors-log|audit-log|deleted_repositories|applications\/new|applications|apps\/new|apps|publisher)|topics|domain\/new|audit-log\/event_settings|billing\/(history|plans)|policies\/applications)|^\/[^\/]+\/(enterprise_plan|sponsoring)/,

    // 特定页面，启用`字符数据`监测
    characterDataPage: ['repository/new', 'repository/edit', 'new', 'new/import', 'orgs/repositories/new', 'repository/blob', 'marketplace', 'homepage'],

    // 特定页面，忽略突变元素规则
    ignoreMutationSelectorPage: {
        'repository/new': [".cm-scroller"], // 代码编辑器
        'repository/edit': [".cm-scroller", "table"], // 代码编辑器
        'repository/pull': ["td.blob-code"], // 代码差异 分屏/同屏
        'repository/compare': ["tbody"], // 代码差异
        'repository/commit': ["td.blob-code"], // 代码差异 分屏/同屏
        'repository/blob': ["#highlighted-line-menu-positioner", ".Text__StyledText-sc-17v1xeu-0"], // 代码视图 存在
        'repository/blame': ["#highlighted-line-menu-positioner"], // 代码视图
        'repository': [".AppHeader-context", "table"], //  "article.markdown-body",
        'repository/releases': [".Box-footer"], // 附件清单
        '*': [
            'div.QueryBuilder-StyledInputContainer',  // 顶部搜索栏 关键词被翻译
        ],
    },

    // 特定页面，忽略元素规则
    ignoreSelectorPage: {
        'page-profile': [
            'span.p-nickname', // 用户昵称
            'span.p-name', // 同上
        ],
        'page-profile/followers': [
            'span.f4.Link--primary',
            "span.Link--secondary.pl-1",
        ],
        'page-profile/repositories': [
            'a[itemprop="name codeRepository"]', // 仓库名称
        ],
        'page-profile/stars': [
            '.mb-1.d-inline-block > h3', // 仓库名称
        ],
        'repository': [
            '.AppHeader-context-full', // 顶部 <username>/<repo_name>
            'strong[itemprop="name"]', // 仓库名称
            // 'ul.list-style-none', // 右侧 部署列表 无效
            'div[data-testid="latest-commit"]', // 最新的提交
            'tr.react-directory-row', // 文件列表中文件夹和文件条目
            'p.f4.my-3', // 仓库简介正文
            '#translate-me',
            '.my-3.d-flex.flex-items-center', // 仓库简介中的链接
            'article.markdown-body', // 自述文件正文
            'li.mt-2',
        ],
        'repository/tree': [
            '.AppHeader-context-full', // 顶部 <username>/<repo_name>
            'div.react-tree-show-tree-items', // 左侧文件树项目
            'tr.react-directory-row', // 文件列表中文件夹和文件条目
            '#repos-header-breadcrumb',
            '#file-name-id', // 文件路径中文件部分
            'article.markdown-body', // Markdown 正文
        ],
        'repository/blob': [
            '.AppHeader-context-full', // 顶部 <username>/<repo_name>
            'article.markdown-body', // Markdown 正文
            'div.react-tree-show-tree-items', // 左侧文件树项目
            '[id^="offset"]', // 符号-->引用
            '#highlighted-line-menu-positioner', // 代码视图
            '#filter-results', // 右侧 符号筛选
            '#repos-header-breadcrumb', // 文件路径中文件夹路径
            '#repos-header-breadcrumb--wide', // 文件路径中文件夹路径 左侧文件树展开情况
            '#sticky-breadcrumb',
            '#file-name-id', // 文件路径中文件部分
        ],
        'repository/commit': [
            'td.blob-code', // 代码差异 分屏/同屏
            'span.ws-pre-wrap', // 提交说明
        ],
        'repository/pull': [
            'td.blob-code', // 代码差异 分屏/同屏
        ],
        'repository/compare': [
            'td.blob-code', // 代码差异 分屏/同屏
        ],
        'repository/edit': [
            '.cm-scroller', // 代码编辑器
            'table', // 代码差异预览
        ],
        'repository/new': [
            '.cm-scroller', // 代码编辑器
            'table', // 代码差异预览
        ],
        'repository/actions': [
            'table.highlight', // 工作流程文件 源码视图
            'span.user-select-none', // 日志 - 作业名
            'span.CheckStep-line-content', // 日志 - 具体内容
        ],
        'repository/releases': [
            'div.markdown-body', // 发布版正文
        ],
        'repository/wiki': [
            '#wiki-body', // wiki 正文
        ],
        'orgs': [
            'a[itemprop="name codeRepository"]', // 仓库名称
        ],
        'search': [
            'span.search-match', // 搜索匹配信息
            'div.code-list', // 代码片段预览
        ],
        'dashboard': [
            '.js-notice-dismiss', // 右侧栏 广告
            '.TimelineItem', // 右侧栏 最新变化
            'section.comment-body', // 发布版正文
        ],
        'gist': [
            '.gist-content[itemprop="about"]', // Gist 简介
            'div.js-blob-code-container', // 代码框
            'table.js-diff-table', // 代码差异
        ],
        'topics': [
            'h3.f3.color-fg-muted.text-normal.lh-condensed', // 仓库名称
        ],
        'marketplace': [
            '.markdown-body',
        ],
        '*': [
            '.js-comment-body', '.js-preview-body',
            '.markdown-title',
            'span.ActionListItem-label.text-normal', // 顶部搜索栏 关键词被翻译
            'CODE', 'SCRIPT', 'STYLE', 'LINK', 'IMG', 'MARKED-TEXT', 'PRE', 'KBD', // 特定元素标签
        ],
    },

    // 以下兼容 1.9.2 版本，且冻结 等待 1.9.3 明显 Bug 修复
    /**
     * 要翻译的页面正则(不含仓库页)
     *
     * 2021-10-07 11:53:34
     * GitHub 网站更新 调整 Class 过滤规则
     * 且过滤 Class 并不是总是生效，增加 PathName 规则补充
     */
    rePageClass: /\b(page-(profile|new-repo|create-org)|session-authentication)\b/,

    /**
     * 忽略区域的 class 正则
     *
     * 代码编辑器 内容 代码高亮 CodeMirror
     * 代码编辑器 最小单元 cm-line ͼ.*
     * 代码高亮 blob-code
     * 仓库名和用户名 repo-and-owner (已知出现在：应用安装授权页和设置页 选定仓库)
     * 文件,目录位置栏 |js-path-segment|final-path
     * 文件列表 files js-navigation-container js-active-navigation-container
     * 评论内容等 js-comment-body
     * 评论预览 js-preview-body
     * 评论编辑区域 comment-form-textarea
     * 文件搜索模式 js-tree-finder-virtual-filter
     * 仓库文件列表 js-navigation-open Link--primary
     * 快捷键 按键 js-modifier-key
     * 洞察-->流量-->热门内容列表 capped-list-label
     * realease 页面 描述主体 markdown-body my-3
     * 仓库页 仓库描述 f4 my-3
     * 提交的用户名 commit-author$
     * 搜索页 搜索结果 search-match
     * 追溯 视图 代码 react-code-text
     * tree 视图 文件名 react-directory-filename-column 提交信息 react-directory-commit-message
     * 代码差异页面 代码 pl-s1|pl-smi|pl-token|pl-c1|pl-kos|pl-k|pl-c|pl-en
     */
    reIgnoreClass: /(cm-line|ͼ.*|pl-s1|pl-smi|pl-token|pl-c1|pl-kos|pl-k|pl-c|pl-en|CodeMirror|blob-code|highlight-.*|repo-and-owner|js-path-segment|final-path|files js-navigation-container|js-comment-body|js-preview-body|comment-form-textarea|markdown-title|js-tree-finder-virtual-filter|js-navigation-open Link--primary|js-modifier-key|capped-list-label|blob-code blob-code-inner js-file-line|markdown-body my-3|f4 my-3|commit-author$|search-match|react-directory-filename-column|react-directory-commit-message|react-code-text|zausi)/,

    /**
     * 忽略区域的 itemprop 属性正则
     * name 列表页 仓库名
     * author 仓库页 作者名称
     * additionalName 个人主页 附加名称
     */
    reIgnoreItemprop: /(name|author|additionalName)/,

    /**
     * 忽略区域的 特定元素id 正则
     * /blob页面 offset  符号-->引用
     * /blob页面 右侧 符号筛选 filter-results
     * fix repo详情页文件路径breadcrumb
     */
    reIgnoreId: /(readme|^offset|breadcrumb|file-name-id|filter-results)/,

    /**
     * 忽略区域的 标签 正则
     * /i 规则不区分大小写
     */
    reIgnoreTag: ['CODE', 'SCRIPT', 'STYLE', 'LINK', 'IMG', 'MARKED-TEXT', 'PRE', 'KBD'],
    // marked-text --> 文件搜索模式/<user-name>/<repo-name>/find/<branch> 文件列表条目
    // ^script$ --> 避免勿过滤 notifications-list-subscription-form
    // ^pre$ --> 避免勿过滤
};

I18N["ko-KR"] = {};

I18N["ko-KR"]["title"] = { // 标题翻译
    "static": { // 静态翻译
        "Sign in to GitHub · GitHub": "GitHub 로그인 · GitHub",
        "Join GitHub · GitHub": "GitHub 계정 만들기 · GitHub",
        "Forgot your password? · GitHub": "비밀번호를 까먹으셨나요? · GitHub",
        "Forgot your password?": "비밀번호를 까먹으셨나요?",
        "GitHub · Where software is built": "GitHub · 소프트웨어가 만들어지는 곳",
        "Create a New Repository": "저장소 만들기",
        "Import a Repository": "저장소 불러오기",
        "New Project": "새로운 프로젝트",
        "Your Repositories": "내 저장소",
        "Your Projects": "내 프로젝트",
        "Your Packages": "내 패키지",
        "Your Stars": "내 별표",
        "Your profile": "내 프로필",
        "Your Achievements": "내 업적",
        "Your Followers": "내 팔로워",
        "Who You’re Following": "팔로우하고 있는 사람",
        "Account settings": "계정 설정",
        "Appearance": "모양",
        "Accessibility": "접근성",
        "Notification settings": "알림",
        "Billing": "구매",
        "Email settings": "이메일 설정",
        "Account security": "보안",
        "SSH and GPG keys": "SSH 및 GPG 키",
        "Organizations": "조직",
        "Blocked users": "차단한 사람",
        "Temporary interaction limits": "상호 작용 제한",
        "Code review limits": "코드 검토 제한",
        "Repositorys": "저장소",
        "Deleted Packages": "삭제된 패키지",
        "Pages": "페이지",
        "Saved replies": "빠른 답장",
        "Security & analysis": "보안 및 분석",
        "Installed GitHub Apps": "설치된 GitHub 앱",
        "Issue search results": "이슈 검색 결과",
        "Scheduled reminders": "예약된 알림",
        "Security log": "보안 로그",
        "Sponsorship Log": "스폰서십 로그",
        "GitHub Apps": "GitHub 앱",
        "Developer applications": "개발자 앱",
        "Personal Access Tokens": "개인용 액세스 토큰",
        "Register new GitHub App": "새 GitHub 앱 등록",
        "New OAuth Application": "OAuth 앱 만들기",
        "Create a new Gist": "Gist 만들기",
        "Discover gists": "Gist 찾기",
        "Enable two-factor authentication": "2단계 인증 켜기",
        "Manage two-factor authentication": "2단계 인증 관리",
        "Options": "설정",
        "Confirm access": "엑세스 확인",
        "General": "일반",
        "Manage access": "엑세스 관리",
        "branches": "분기",
        "Tags": "꼬리표",
        "Webhooks": "웹후크",
        "Environments": "환경",
        "Security & analysis": "보안 및 분석",
        "Deploy keys": "배포 키",
        "Add deploy key": "배포 키를 추가해 주세요",
        "Actions secrets": "액션 비밀값",
        "Dependabot secrets": "Dependabot 비밀값",
        "Configure email notifications": "이메일 알림을 설정해 주세요",
        "Community Standards": "커뮤니티 기준",
        "General Organization Settings": "일반 조직 설정",
        "Member privileges": "멤버 권한",
        "Teams": "팀",
        "Trending repositories on GitHub today": "오늘 GitHub에서 인기 있는 저장소예요",
        "Trending repositories on GitHub this week": "이번 주 GitHub에서 인기 있는 저장소예요",
        "Trending repositories on GitHub this month": "이번 달 GitHub에서 인기 있는 저장소예요",
        "Repository defaults": "저장소 기본값",
        "Repository search results": "저장소 검색 결과",
        "Runners": "실행기",
        "Runner Groups": "실행기 그룹",
        "Packages": "패키지",
        "Package": "패키지",
        "Payment Information": "결제 정보",
        "Security": "보안",
        "Verified & approved domains": "검증 및 승인된 도메인",
        "Add a Pages verified domain": "인증된 GitHub 페이지 도메인을 추가해 주세요",
        "Third-party application access policy": "타사 애플리케이션 접근 정책",
        "Audit log": "감사 로그",
        "Deleted Repositories": "삭제된 저장소",
        "GitHub Publisher Verification": "GitHub 게시자 인증",
        "Notifications": "알림",
        "Confirm your account recovery settings": "계정 복구 설정을 확인해 주세요",
        "Your stars": "내 별표",
        "Your starred repositories": "내가 별표한 저장소",
        "Your starred topics": "내가 별표한 주제",
        "Register for the GitHub Developer Program": "GitHub 개발자 프로그램에 등록해 주세요",
        "Codespaces": "코드스페이스",
        "Codespace Templates": "코드스페이스 템플릿",
        "Create new codespace": "새로운 코드스페이스를 만들어 주세요",
        "Error": "오류",
        "Discover gists · GitHub": "GitHub에서 코드 스니펫을 찾아보세요",
        "Explore GitHub Sponsors": "GitHub 스폰서를 둘러보세요",
        "Actions Usage Metrics": "액션 사용 지표",
        "Fine-grained Personal Access Tokens": "세밀하게 설정된 개인 접근 토큰",
        "Import repository": "저장소를 가져와 보세요",
        "Explore GitHub": "GitHub를 둘러보세요",
        // "Rate limit · GitHub": "속도 제한 · GitHub",
        // "GitHub: Let’s build from here · GitHub": "GitHub: 여기서부터 시작해 보세요 · GitHub",
        "GitHub · Build and ship software on a single, collaborative platform · GitHub": "GitHub · 단일 협업 플랫폼에서 소프트웨어를 개발하고 배포해보세요",
        "GitHub · Build and ship software on a single, collaborative platform": "GitHub · 단일 협업 플랫폼에서 소프트웨어를 개발하고 배포해보세요",
        "Topics on GitHub · GitHub": "GitHub의 주제들",
        "Code security": "코드 보안",
        "Deploy keys": "배포 키",
        "Actions Performance Metrics": "액션 성능 지표",
        "GitHub Sitemap · GitHub": "GitHub 사이트맵",
        "Code search results": "코드 검색 결과",
        "Enterprises": "기업용",
        "Blocked users": "차단된 사용자들",
        "New conversation · GitHub Copilot": "새로운 대화 · GitHub Copilot",
        "Models · GitHub Marketplace": "모델 · GitHub 장터",
        "GitHub Education": "GitHub 교육",
        "GitHub Student Developer Pack - GitHub Education": "GitHub 교육 - 학생 개발자 꾸러미",
        "Get your GitHub benefits - GitHub Education": "GitHub 교육 혜택을 받아보세요",
        "Signup to GitHub Copilot": "GitHub Copilot에 가입해 보세요",
        "Device Activation": "기기 활성화",
        "Spending Limit": "지출 한도",
        "Autolink references": "자동 링크 참조",
        "Add autolink reference": "자동 링크 참조를 추가해 보세요"
    },
    "regexp": [ // 정규 표현식 번역
        [/Authorized OAuth Apps/, "승인된 OAuth 앱"],
        [/Authorized GitHub Apps/, "승인된 GitHub 앱"],
        [/Installed GitHub Apps/, "설치된 GitHub 앱"],
        [/Accessibility/, "접근성"],
        [/Environments/, "환경"],
        [/New repository/, "새 저장소"],
        [/Repositories/, "저장소"],
        [/Starred/, "별표한 항목"],
        [/starred repositories/, "별표한 저장소"],
        [/starred topics/, "별표한 주제"],
        [/starred/, "별표"],
        [/Commits · ([^ ]+)/, "커밋 · $1"],
        [/New Issue/, "새 이슈"],
        [/Issues?/, "이슈"],
        [/Pull (R|r)equests?/, "끌어오기 요청"],
        [/Actions secrets · ([^ ]+)/, "액션 비밀 · $1"],
        [/Actions settings · ([^ ]+)/, "액션 설정 · $1"],
        [/Actions/, "액션"],
        [/Projects/, "프로젝트"],
        [/Packages?/, "패키지"],
        [/Settings · Rulesets/, "설정 · 규칙 집합"],
        [/Security Overview/, "보안 개요"],
        [/Security Policy/, "보안 정책"],
        [/Security Advisories/, "보안 공지"],
        [/Dependabot alerts/, "Dependabot 경고"],
        [/Pulse/, "통계"],
        //[/Contributors to/, "기여자 ·"],
        [/Dashboard/, "대시보드"],
        [/Deployments/, "배포"],
        [/Community/, "커뮤니티"],
        [/Traffic/, "트래픽"],
        [/Commit Activity/, "커밋 활동"],
        [/Code frequency/, "코드 빈도"],
        [/Created/, "생성됨"],
        [/Dependencies/, "의존성"],
        [/Network Dependents/, "네트워크 의존자"],
        [/Network Graph/, "네트워크 그래프"],
        [/Revisions/, "수정 내역"],
        [/GitHub Skills Quickstart Guide/, "GitHub 스킬 빠른 시작 가이드"],
        [/Skills/, "스킬"],
        [/Sponsoring/, "후원"],
        [/Stargazers/, "별표 누른 사용자"],
        [/Forks?/, "포크"],
        [/Settings · Tags · ([^ ]+)/, "설정 · 꼬리표 · $1"],
        [/Tags?/, "꼬리표"],
        [/Edit release/, "릴리스 편집"],
        [/Releases?/, "릴리스"],
        [/Draft Advisory/, "보안 공지 초안"],
        [/Code scanning alerts/, "코드 스캔 경고"],
        [/Repository topics/, "저장소 주제"],
        [/Scheduled reminders/, "예약 알림"],
        [/Sponsorship Log/, "후원 로그"],
        [/Sponsor @([^ ]+) on GitHub Sponsors/, "GitHub Sponsors에서 $1님을 후원"],
        [/OAuth applications/, "OAuth 앱"],
        [/People · Pending Collaborators/, "사람 · 대기 중인 협업자"],
        [/Members · People · ([^ ]+)/, "사람 · $1"],
        [/People/, "사람"],
        [/Outside collaborators/, "외부 협업자"],
        [/New Discussion/, "새 토론"],
        [/Discussions/, "토론"],
        [/Workflow runs/, "워크플로 실행"],
        [/Webhooks · Settings/, "웹훅 · 설정"],
        [/Add a code of conduct to/, "코드 행동 강령 추가하기"],
        [/Caches?/, "캐시"],
        [/Runners?/, "실행기"],
        [/Attestations?/, "증명"],
        [/Activit(y|ies)/, "활동"],
        [/Rate limit/, "요청 제한"],
        [/Comparing/, "비교"],
        [/History for ([^ ]+)/, "$1의 기록"],
        [/Compare plans for ([^ ]+)/, "$1의 요금제 비교"],
        [/([^ ]+)’s gists/, "$1님의 코드 조각"],
        [/Secret scanning · ([^ ]+)/, "비밀 스캔 · $1"],
        [/Dependabot secrets · ([^ ]+)/, "Dependabot 비밀 · $1"],
        [/Contributors to ([^ ]+)/, "$1의 기여자"],
        [/([^ ]+) repositories^/, "$1의 저장소"],
        [/Create new page · ([^ ]+) Wiki/, "새 페이지 생성 · $1 위키"],
        [/Settings · Branches · ([^ ]+)/, "설정 · 분기 · $1"],
        [/Webhooks · Settings · ([^ ]+)/, "웹훅 · 설정 · $1"],
        [/Environments · ([^ ]+)/, "환경 · $1"],
        [/Branches · ([^ ]+)/, "분기 · $1"],
        [/([^ ]+) · GitHub Topics/, "$1 · GitHub 주제"],
        [/New release · ([^ ]+)/, "새 릴리스 · $1"],
        [/Codespaces secrets · ([^ ]+)/, "코드스페이스 비밀 · $1"],
        [/Dependabot secrets · ([^ ]+)/, "Dependabot 비밀 · $1"],
        [/Invitation to join ([^ ]+)/, "$1 가입 초대"],
        [/Security Managers for · ([^ ]+)/, "보안 관리자 · $1"],
        ["_regexp_end", "끝"]
    ],
};

I18N["ko-KR"]["public"] = { // 公共区域翻译
    "static": { // 静态翻译
        // 错误页面
        "No server is currently available to service your request.": "현재 서버에서 요청을 처리해드릴 수 없어요.",
        "This page is taking too long to load.": "이 페이지 로딩 시간이 너무 오래 걸려요.",
        "We had issues producing the response to your request.": "요청에 대한 응답을 생성하는 데 문제가 있었어요.",
        "Sorry about that. Please try refreshing and contact us if the problem persists.": "죄송해요. 페이지를 새로 고침해 보시고, 문제가 계속된다면 저희에게 연락해 주세요.",
        "Error": "오류",
        "Looks like network is down!": "네트워크 연결이 안 된 것 같아요!",
        "Contact Support": "GitHub 지원팀에 연락하기",
        "GitHub Status": "GitHub 상태",
        // 상단 안내
        "You only have a single verified email address. We recommend verifying at least one more email address to ensure you can recover your account if you lose access to your primary email.": "확인된 이메일 주소가 하나밖에 없어요. 주 이메일에 접근할 수 없을 경우 계정을 복구할 수 있도록, 최소한 하나 이상의 이메일 주소를 추가로 확인해 보세요.",
        "Email settings": "이메일 설정",
        "Your recovery codes have not been saved in the past year. Make sure you still have them stored somewhere safe by viewing and downloading them again.": "지난 1년 동안 복구 코드를 저장하지 않으셨어요. 안전한 곳에 보관되어 있는지 확인하시려면, 복구 코드를 다시 확인하고 다운로드해 보세요.",
        "View recovery codes": "복구 코드 보기",
        // 하단 빨간 배너
        "You can’t perform that action at this time.": "현재 해당 작업을 수행할 수 없어요.",
        // 속도 제한 - 짧은 시간 동안 페이지를 자주 방문해서 발생해요 (최소 https://github.com/issues 포함)
        "Whoa there!": "잠깐만요!",
        "You have exceeded a secondary rate limit.": "보조 속도 제한을 초과하셨어요.",
        "Please wait a few minutes before you try again;": "다시 시도하기 전에 몇 분만 기다려 주세요;",
        "in some cases this may take up to an hour.": "경우에 따라 최대 한 시간까지 걸릴 수 있어요.",
        // 이슈, 끌어오기 요청, 토론 플로팅 정보 카드 (링크가 참조되는 모든 페이지에 나타나요)
        "You opened this issue": "이 이슈를 열었어요.",
        "You opened this pull request": "이 끌어오기 요청를 열었어요.",
        "You commented on this issue": "이 이슈에 댓글을 남겼어요.",
        "You commented on and opened this issue": "이 이슈를 열고 댓글을 남겼어요.",
        "You commented on this pull request": "이 끌어오기 요청에 댓글을 남겼어요.",
        "You commented on and opened this pull request": "이 끌어오기 요청를 열고 댓글을 남겼어요.",
        "You were mentioned on and commented on this issue": "이 이슈에서 언급되었고 댓글을 남겼어요.",
        "You were mentioned on and commented on this pull request": "이 끌어오기 요청에서 언급되었고 댓글을 남겼어요.",
        "You were mentioned on and opened this pull request": "이 끌어오기 요청에서 언급되었고 열었어요.",
        "You are assigned to this pull request": "이 끌어오기 요청에 할당되었어요.",
        "You left a review": "리뷰를 남겼어요.",
        "Changes requested": "변경 요청", // 끌어오기 요청
        "Review required": "리뷰 요청", // 끌어오기 요청
        "Approved": "승인됨", // 끌어오기 요청
        "replied": "답글 남겼어요", // 토론

        // 상단바 (로그인 전)
        "Product": "제품",
            // 작업
            "Automate any workflow": "어떤 작업 흐름도 자동화해보세요.",
            // 패키지
            "Host and manage packages": "패키지를 호스팅하고 관리해보세요.",
            // 보안
            "Find and fix vulnerabilities": "취약점을 찾아서 수정해보세요.",
            // 코드스페이스
            "Instant dev environments": "즉시 개발 환경",
        "Code Review": "코드 리뷰",
            "Manage code changes": "코드 변경 사항을 관리해보세요.",
            // Copilot
            "Write better code with AI": "AI를 활용해 더 나은 코드를 작성해보세요.",
            // 이슈
            "Plan and track work": "작업을 계획하고 추적해보세요.",
            // 토론
            "Collaborate outside of code": "코드 외부에서 협업해보세요.",
        "Code Search": "코드 검색",
            "Find more, search less": "더 많이 찾아보고, 덜 검색해보세요.",
        
        // 오른쪽
        "All features": "모든 기능",
        "GitHub Skills": "GitHub 스킬",
        "Solutions": "솔루션",
            "By company size": "기업 규모별",
            "By size": "규모별",
            "Enterprises": "기업",
            "Small and medium teams": "중소 팀",
            "Startups": "스타트업",
            "By industry": "산업별",
            "Healthcare": "헬스케어",
            "Financial services": "금융 서비스",
            "Manufacturing": "제조업",
            "Government": "정부",
            "View all industries": "모든 산업 보기",
            "By use case": "사용 사례별",
            "CI/CD & Automation": "CI/CD & 자동화",
            "DevOps": "DevOps",
            "DevSecOps": "DevSecOps",
            "View all use cases": "모든 사용 사례 보기",
            "View all solutions": "모든 솔루션 보기",
        "Resources": "리소스",
            "Innersource": "내부 소스",
            "Learning Pathways": "학습 경로",
            "White papers, Ebooks, Webinars": "백서, 전자책, 웨비나",
            "Customer Stories": "고객 사례",
            "Software Development": "소프트웨어 개발",
            "Partners": "파트너",
            "View all": "전체 보기",
        "Open Source": "오픈 소스",
            "GitHub Sponsors": "GitHub 후원자",
            "Fund open source developers": "오픈 소스 개발자를 후원해보세요.",
            "The ReadME Project": "ReadME 프로젝트",
            "GitHub community articles": "GitHub 커뮤니티 글",
            // 저장소
            "Topics": "주제",
            "Trending": "트렌딩",
            "Collections": "모음",
        "Pricing": "가격",
        "Search": "검색",
        "Sign in": "로그인",
        "Sign up": "회원가입",

        "Team": "팀",
        "Enterprise": "기업",
            "Enterprise platform": "기업 플랫폼",
            "AI-powered developer platform": "AI 기반 개발자 플랫폼",
            "Available add-ons": "사용 가능한 추가 기능",
            "Advanced Security": "고급 보안",
                "Enterprise-grade security features": "기업급 보안 기능을 제공해보세요.",
            // Copilot
                "Enterprise-grade AI features": "기업급 AI 기능을 제공해보세요.",
            // 고급 지원
                "Enterprise-grade 24/7 support": "기업급 24시간 7일 지원을 제공해보세요.",

        // 검색창
        "Search or jump to...": "검색하거나 다음으로 이동해보세요…",
        "Type": " ",
        "to search": "키로 검색",
        "Command palette": "명령 팔레트",
        "Saved queries": "저장된 검색",
        "All of GitHub": "전체 GitHub",
        "Autocomplete": "자동 완성",
        "Search all of GitHub": "전체 GitHub 검색",
        "Search in this directory": "이 디렉토리에서 검색",
        "Search in this repository": "이 저장소에서 검색",
        "Search in this owner": "이 소유자에서 검색",
        "Search in this organization": "이 조직에서 검색",
        "Owners": "소유자",
        "Languages": "언어",
        "Search syntax tips": "검색 문법 팁",
        "Jump to": "다음으로 이동:",
        
        "Ask Copilot": "Copilot에게 물어보기",
        "Start a new Copilot thread": "새로운 Copilot 대화를 시작해보세요.",
        
        // 로그인 전일 때
            "Enterprise": "기업",
            "Security": "보안",
            "Pricing": "가격",
        
        // 왼쪽 상단 드롭다운 (로그인 후)
        "Home": "홈",
        "Issues": "이슈",
        "Pull requests": "끌어오기 요청",
        "Projects": "프로젝트",
        "Codespaces": "코드스페이스",
        "Explore": "탐험하기",
        "Marketplace": "장터",
        
        "Filter repositories": "저장소 필터",
        "Close filter": "필터 닫기",
        "Show more": "더 보기",
        
        // 상단 알림 배너
        "Don't get locked out of your account.": "계정에 접근할 수 없게 되지 않도록 해보세요.",
        "Download your recovery codes": "복구 코드를 다운로드해보세요.",
        "add a passkey": "패스키 추가하기",
        "so you don't lose access when you get a new device.": "새 기기에서 로그인할 때 접근 권한을 잃지 않도록 해보세요.",
        "GitHub users are": "GitHub 사용자들은",  // 아래 문장은 정규 표현식
        "now required": "이제 필수예요",  // 아래 문장은 정규 표현식
        "Enable 2FA": "2FA 활성화하기",
        
        // 오른쪽 상단 알림 버튼 메시지
        "You have no unread notifications": "읽지 않은 알림이 없어요.",
        "You have unread notifications": "읽지 않은 알림이 있어요.",
        
        // 오른쪽 상단 새로 만들기 버튼 드롭다운 메뉴
        "Create new...": "새로 만들기...",
            "New repository": "저장소 만들기",
            "Import repository": "저장소 가져오기",
            "New codespace": "코드스페이스 만들기",
            "New gist": "새 gist 만들기",
            "New organization": "조직 만들기",
            "New project": "프로젝트 만들기",
            "This organization": "이 조직", // 조직
            "New team": "팀 만들기", // 조직

        // 右上角 Copilot 下拉菜单
            "Chat with Copilot": "Copilot과 채팅하기",
            "Open Copilot…": "Copilot 열기…",
                "New conversation in": "다음에서의 새 채팅 :",
                "New conversation": "새 채팅",
                    "Immersive": "몰입형",
                "Open with": "다음으로 열기 :",

            // 오른쪽 상단 개인 아이콘 드롭다운 메뉴
            "Account switcher": "계정 전환",
                "Add account": "계정 추가하기",
                "Switch account": "계정 전환하기",
                "Sign out...": "로그아웃...",
            "Set status": "상태 설정하기",
            "Your profile": "내 프로필",
            "Your repositories": "내 저장소",
            "Your codespaces": "내 코드스페이스",
            "Your Copilot": "내 Copilot",
            "Your projects": "내 프로젝트",
            "Your discussions": "내 토론",
            "Your stars": "내 별표",
            "Your gists": "내 gists",
            "Your organizations": "내 조직",
            "Your enterprises": "내 기업",
            "Your sponsors": "내 후원자",
            "Create new": "새로 만들기", // Android UA 에서 나타남
            "Upgrade": "업그레이드하기",
            "Try Enterprise": "기업용 체험하기",
                "Free": "무료",
            "Feature preview": "기능 미리보기",
                // 대화상자
                "Feature preview dialog": "기능 미리보기 대화상자",
                "Enable": "활성화하기",
                "Enabled": "활성화됨",
                "Disable": "비활성화하기",
                "Disabled": "비활성화됨",
                "Documentation": "문서",
                "Colorblind themes": "색맹 테마",
                "Varying by gender and geography, color blindness can affect on average 8% of men and up to 0.5% of women. Our previous colorblind theme has been split into two new themes:": "성별과 지역에 따라 다르게 나타나지만, 평균적으로 색맹은 남성의 8%와 여성의 최대 0.5%에 영향을 줄 수 있어요. 이전 색맹 테마는 두 개의 새로운 테마로 나누어졌어요:",
                "Light/dark Protanopia & Deuteranopia for red/green color blindness.": "밝은/어두운 프로타노피아 및 듀테라노피아 (적록색맹용)",
                "Light/dark Tritanopia for blue/yellow color blindness.": "밝은/어두운 트리타노피아 (파란/노란 색맹용)",
                "Command Palette": "명령 팔레트",
                "Quickly navigate and jump between your organizations or repositories and search recent issues, pull requests, projects and more with the new command palette. You can also execute time saving commands all without lifting your fingers off the keyboard!": "새로운 명령 팔레트를 사용하면, 조직이나 저장소 간을 빠르게 탐색하고, 최근 이슈, 끌어오기 요청, 프로젝트 등을 검색할 수 있어요. 또한 손을 키보드에서 떼지 않고 시간 절약 명령어를 실행할 수 있어요.",
                "To open the command palette:": "명령 팔레트 여는 방법:",
                "Copilot Workspace for Pull Requests": "끌어오기 요청용 Copilot 작업공간",
                "Copilot Workspace is a Copilot-native coding environment that helps you land high-quality pull requests faster by allowing you to edit and run code from your pull request without leaving GitHub.com.": "Copilot 작업공간은 Copilot 고유의 코딩 환경으로, GitHub.com을 떠나지 않고도 끌어오기 요청 내의 코드를 편집하고 실행할 수 있게 해, 고품질의 끌어오기 요청을 더 빠르게 완료할 수 있도록 도와줘요.",
                "Copilot Workspace is available to customers with access to the Copilot code review public preview.": "Copilot 작업공간은 Copilot 코드 리뷰 공개 미리보기를 사용할 수 있는 고객에게 제공돼요.",
                "Sign up for the Copilot code review public preview": "Copilot 코드 리뷰 공개 미리보기에 가입하기",
                "Copilot Immersive Enhancements": "Copilot 몰입형 개선",
                // GitHub Copilot의 Copilot Chat 몰입형 모드에서 향상된 경험을 탐색해보세요. 이 베타 버전은 집중되고 심도 있는 대화를 위해 설계된 전용 채팅 인터페이스 내에서 개선된 상호작용과 더욱 똑똑한 제안을 제공합니다.
                "Discover an enhanced experience in the immersive mode of Copilot Chat, available at": " ",
                ". This beta introduces improved interaction and smarter suggestions within a dedicated chat interface designed for focused, in-depth conversations.": "에서 제공되는 Copilot Chat의 몰입형 모드에서 향상된 경험을 찾아보세요. 이 베타 버전은 집중적이고 심도 있는 대화를 위해 설계된 전용 채팅 인터페이스 내에서 향상된 상호작용과 스마트한 제안을 제공합니다.",
                "New Commit Details Page": "새로운 커밋 상세 페이지",
                "New version of the commit details page that lets you quickly understand and navigate the changes in a commit. Improves filtering, commenting (with new floating comments and comment counts on the file tree), keyboard navigation, and more.": "커밋의 변경 사항을 빠르게 이해하고 탐색할 수 있도록 도와주는 새로운 커밋 상세 페이지예요. 필터링, 주석 작성(파일 트리의 새로운 부동 주석 및 주석 개수 기능 포함), 키보드 탐색 등이 개선되었어요.",
                "Rich Jupyter Notebook Diffs": "풍부한 Jupyter Notebook 차이 보기",
                "Enables rich diffs of Jupyter Notebooks in pull requests": "끌어오기 요청에서 Jupyter Notebook의 풍부한 차이 보기를 활성화해보세요.",
                "Note: commenting on rich diff views of notebooks is not yet supported": "참고: Jupyter Notebook의 풍부한 차이 보기에는 아직 주석 기능이 지원되지 않아요.",
                "New Issues Experience": "새로운 이슈 체험",
                "The new GitHub Issues experience brings three powerful new features:": "새로운 GitHub 이슈 체험은 세 가지 강력한 새로운 기능을 제공합니다:",
                "Sub-issues are designed to help you break-down and manage your issues with a parent/child relationship into a hierarchy.": "하위 이슈는 부모/자식 관계를 가진 이슈를 계층 구조로 나누어 관리할 수 있도록 도와드려요.",
                "Issues types allow you to classify and manage your issues with a shared and consistent language across all repositories in an organization, such as bugs or tasks.": "이슈 유형을 사용하면, 조직 내 모든 저장소에서 버그나 작업 등 공통되고 일관된 용어로 이슈를 분류하고 관리할 수 있어요.",
                "Advanced search allows you to build advanced queries using the AND and OR keywords, as well as nested queries using parentheses up to 5 layers deep right from the repository Issues page.": "고급 검색 기능을 사용하면, 저장소 이슈 페이지에서 바로 AND와 OR 키워드를 사용해 고급 쿼리를 구성하고, 괄호를 사용해 최대 5단계의 중첩 쿼리를 작성할 수 있어요.",
                "New merge experience": "새로운 병합 체험",
                "Improved merge experience on the pull request page that helps you better understand the state of your pull request and get it merged faster!": "끌어오기 요청 페이지에서 병합 체험이 개선되어, 끌어오기 요청의 상태를 더 잘 파악하고 더 빠르게 병합할 수 있도록 도와드려요!",
                "New Pull Request Commits Experience": "새로운 끌어오기 요청 커밋 체험",
                "The pull request commits page has been refreshed to improve performance, improve consistency with other pages, and to make the page more accessible!": "끌어오기 요청 커밋 페이지가 새롭게 개선되어 성능이 향상되고, 다른 페이지와의 일관성이 개선되었으며, 접근성이 높아졌어요!",
                "Enhanced Repos Insights Views": "강화된 저장소 인사이트 보기",
                "We’re thrilled to introduce our new graphics library! With this update, you’ll find significant enhancements to two of our repository insights views—Contributors and Code Frequency. Both now utilize an SVG-based solution, offering improved focus navigation for precise, point-by-point interaction. You can also hide a series by interacting with the chart legend and view or download the data in both table format and as PNGs.": "새로운 그래픽 라이브러리를 소개하게 되어 정말 기뻐요! 이번 업데이트로 저장소 인사이트 보기 중 '기여자'와 '코드 빈도'에 상당한 향상이 이루어졌어요. 두 보기 모두 이제 SVG 기반 솔루션을 사용해 정밀한 포인트별 상호작용을 위한 개선된 포커스 탐색을 제공하고, 차트 범례와 상호작용하여 시리즈를 숨기거나 데이터를 표 형식과 PNG 파일로 확인 및 다운로드할 수 있어요.",
                "Slash Commands": "슬래시 명령어",
                "Slash commands make it easier to type more complex Markdown, such as tables, tasklists, and code blocks.": "슬래시 명령어를 사용하면 표, 작업 목록, 코드 블록 등 복잡한 Markdown을 더 쉽게 입력할 수 있어요.",
                "Simply type": "이슈, 끌어오기 요청, 토론에서",
                "on Issues, PRs and Discussions to check out a list of available commands!": "를 입력하여 사용 가능한 명령어 목록을 확인해보세요!",
                "Feature disabled.": "기능이 비활성화되었어요.",
                "Please": "부디",
                "give feedback": "피드백을 남겨주세요.",
                "so we can improve it!": "깃허브를 더 개선할게요!",
                // 오류 메시지
                "Sorry, something went wrong and we were not able to fetch the feature previews": "죄송해요, 문제가 발생하여 기능 미리보기를 불러올 수 없었어요.",
            "Settings": "설정",
            "GitHub Website": "GitHub 홈페이지", // 대시보드 외 페이지
            "GitHub Docs": "GitHub 문서",
            "GitHub Support": "GitHub 지원",
            "GitHub Community": "GitHub 커뮤니티",
            "Sign out": "로그아웃",

            // 상태 설정 대화상자
            // 나타나는 위치: 프로필 페이지, Gist 개인 페이지, 저장소 페이지 우측 상단 개인 아이콘 드롭다운 메뉴
            "Edit status": "상태 편집하기",
            "What's happening?": "무슨 일이 있으신가요?",
            "Suggestions": "추천",
                "On vacation": "휴가 중이에요",
                "Out sick": "병가 중이에요",
                "Working from home": "재택근무 중이에요",
                "Focusing": "집중 중이에요",
            "Busy": "바쁜 중이에요",
                "When others mention you, assign you, or request your review, GitHub will let them know that you have limited availability.": "다른 사람이 사용자님을 언급하거나 지정하거나 리뷰를 요청할 때, GitHub가 사용자님이 바쁘다는 것을 알려드릴 거예요.",
                "I may be slow to respond.": "답변이 늦을 수 있어요.",
            "Clear status": "상태 지우기",
                "Never": "지우지 않기",
                "in 30 minutes": "30분 후",
                "in 1 hour": "1시간 후",
                "in 4 hours": "4시간 후",
                "after today": "오늘 이후",
                "after this week": "이번 주 이후",
                "after a month": "한 달 이후",
                "How long until this status will automatically clear.": "이 상태가 자동으로 지워지기까지의 시간을 설정해보세요.",
            "Visible to": "보이기 대상",
                "Everyone": "모두",
                "Scope status visibility to a single organization.": "상태 보임 대상을 특정 조직으로 한정해보세요.",
            "Filter emoji": "이모지 필터링",
                "Search results": "검색 결과",

            // 하단 바
            "Terms": "서비스 약관",
            "Privacy": "개인정보 처리방침",
            "Security": "보안",
            "Status": "상태",
            "Docs": "문서",
            "Contact": "문의하기",
            "Manage cookies": "쿠키 관리",
            "Do not share my personal information": "내 개인정보 공유하지 않기",

            // 왼쪽 사이드바 하단 바
            "About": "정보",
            "Blog": "블로그",
            "Manage Cookies": "쿠키 관리",

            // 기타
            "Contact GitHub": "GitHub에 연락하기",
            "Training": "훈련",

            // 描述、评论编辑器翻译
            "Add a comment": "댓글 추가하기",
            "Add a body": "내용 추가하기",
            "Write": "작성하기",
            "Use Markdown to format your comment": "Markdown을 사용해 댓글을 꾸며보세요.",
            "Add your comment here...": "여기에 댓글을 추가해보세요...",
            "Add your answer here...": "여기에 답변을 추가해보세요...", // 具体讨论页
            "Text field is empty": "텍스트 입력란이 비어 있어요.",
            "Preview": "미리보기",
            "Nothing to preview": "미리볼 내용이 없어요.",
            "This file is empty.": "이 파일은 비어 있어요.",
            "Try again with a file that’s not empty.": "비어 있지 않은 파일로 다시 시도해보세요.",
            "Leave a comment": "댓글 남기기",
            "Write a reply": "답글 작성하기", // 具体讨论页
            "Write a comment": "댓글 작성하기", // 具体讨论页
            "Suggest an answer": "답변 제안하기", // 具体讨论页
            "Ask a question, start a conversation, or make an announcement": "질문을 하거나, 대화를 시작하거나, 공지를 남겨보세요.", // 新建讨论
            "Nothing to preview": "미리볼 내용이 없어요.",
            "This repository has been archived.": "이 저장소는 보관되었어요.", // 已存档仓库 某个提交的评论框
            "Add review comment": "리뷰 댓글 추가하기", // 具体拉取请求 文件审查意见
            "Start a review": "리뷰 시작하기", // 具体拉取请求 文件审查意见
            // 取消按钮 提醒信息
            "Are you sure you want to discard your unsaved changes?": "저장하지 않은 변경 사항을 취소해도 괜찮으신가요?",

            "Add a title": "제목 추가하기",
            "Title": "제목",
            "Add a description": "설명 추가하기",
            "Add your description here...": "여기에 설명을 추가해보세요...",

            // 网络错误
            "There was a problem saving your comment. Please try again.": "댓글 저장 중 문제가 발생했어요. 다시 시도해보세요.",

            // 拉取请求 代码审查 回复对话框
            "Add a suggestion, <Ctrl+g>": "제안 추가하기, <Ctrl+g>",
            "Heading": "제목",
            "Bold": "굵게",
            "Italic": "기울임",
            "Quote": "인용",
            "Link": "링크",
            "Menu": "메뉴", // Android UA 下出现
            "Numbered list": "번호 목록",
            "Unordered list": "글머리 기호 목록",
            "Task list": "작업 목록",
            "Attach files": "파일 첨부하기",
            "Mention": "언급",
            "Reference": "참조",
            "Saved replies": "빠른 답장",
            "Select a reply": "답장 선택하기",
            "Create a new saved reply": "새로운 빠른 답장 만들기",
            "Slash commands": "슬래시 명령어",
            "Alerts": "알림",
            "Add a markdown alert to emphasize important information": "중요한 정보를 강조하기 위해 Markdown 알림 추가하기",
            "Code block": "코드 블록",
            "Insert a code block formatted for a chosen syntax": "선택한 문법에 맞춰 코드 블록 삽입하기",
            "Details": "세부사항",
            "Add a details tag to hide content behind a visible heading": "보이는 제목 뒤에 내용을 숨기기 위해 details 태그 추가하기",
            // "快速回复": "",
            "Insert one of your saved replies": "저장된 빠른 답장 중 하나 삽입하기",
            "Table": "표",
            "Add markdown table": "Markdown 표 추가하기",
            "Templates": "템플릿",
            "Insert one of your issue templates": "이슈 템플릿 중 하나 삽입하기",

            "Slash": "슬래시",
            // 代码块
            "No Syntax": "문법 없음",
            // 快速回复
            "No saved replies": "저장된 빠른 답장이 없어요.",
            "You can create one in your": "사용자 설정에서 생성할 수 있어요:",
            "Settings": "설정",
            // 表格
            "Columns": "열",
            "1 column": "1열",
            "2 columns": "2열",
            "3 columns": "3열",
            "4 columns": "4열",
            "5 columns": "5열",

            "Rows": "행",
            "1 row": "1행",
            "2 rows": "2행",
            "3 rows": "3행",
            "4 rows": "4행",
            "5 rows": "5행",

            // 模板
            "No issue templates": "이슈 템플릿이 없어요.",
            "Learn more about": "자세히 알아보기:",
            "issue templates": "이슈 템플릿",

            // 小屏 插入链接 对话框
            "Insert Link": "링크 삽입하기",
            "Link Text": "링크 텍스트",
            "Add": "추가하기",

            "Attach files by": "파일 첨부하기:",
            "dragging & dropping,": "드래그 앤 드롭,",
            "selecting or pasting them.": "선택하거나 붙여넣어 추가할 수 있어요.",
            "Markdown is supported": "Markdown이 지원돼요.",
            "Styling with Markdown is supported.": "Markdown 스타일링이 지원돼요.",
            "Paste, drop, or click to add files": "붙여넣기, 드래그 앤 드롭 또는 클릭하여 파일 추가하기",
            "Uploading your files…": "파일을 업로드 중이에요…",
            // 文件过大
            "This video is too big.": "이 비디오는 너무 커요.",
            "Try again": "다시 시도해보세요",
            "with a file size less than 10MB.": "10MB 미만의 파일로 시도해보세요.",

            "Close issue": "이슈 닫기", // issue页 评论框
            "Close as completed": "완료됨으로 닫기",
            "Done, closed, fixed, resolved": "완료, 닫힘, 수정, 해결됨",
            "Close as not planned": "계획에 없어서 닫기",
            "Won't fix, can't repro, duplicate, stale": "수정하지 않음, 재현 불가, 중복, 오래됨",
            "Won't fix, can't repro, stale": "수정하지 않음, 재현 불가, 오래됨", // 新版이슈页
            // 因重复而关闭（新版이슈页）
            "Duplicate of another issue": "다른 이슈의 중복",
            "Close with comment": "댓글과 함께 닫기", // 이슈/拉取请求 评论框
            "Close pull request": "끌어오기 요청 닫기", // 拉取请求页 评论框
            "Reopen discussion": "토론 다시 열기", // discussion页 评论框
            "Close discussion": "토론 닫기", // discussion页 评论框
            "Close as resolved": "해결됨으로 닫기",
            "The discussion has been resolved": "토론이 해결되었어요.",
            "Close as outdated": "오래됨으로 닫기",
            "The discussion is no longer relevant": "토론이 더 이상 관련 없어요.",
            "Close as duplicate": "중복으로 닫기",
            "The discussion is a duplicate of another": "토론이 다른 토론과 중복돼요.",
            "Comment": "댓글 작성하기",
            "comment": "댓글",
            "Submit new issue": "새 이슈 제출하기",
            "Comment on this commit": "커밋에 댓글 달기",
            "Close and comment": "닫고 댓글 남기기",
            "Reopen and comment": "다시 열고 댓글 남기기",
            "Reopen issue": "이슈 다시 열기", // 具体이슈
            "Reopen with comment": "댓글과 함께 다시 열기", // 具体이슈
            "Reopen pull request": "끌어오기 요청 다시 열기", //具体拉取请求
            "Add single comment": "단일 댓글 추가하기", // 具体提交页 进行某条代码评论
            "Reply": "답글 달기", // 具体讨论页
            "Answer": "답변하기", // 具体讨论页
            "Start discussion": "토론 시작하기", // 新建讨论
            "Update": "업데이트하기", // 新建讨论
            "discussion": "토론", // 新建讨论
            "Discussions": "토론", // 新建讨论

            "Spammy": "스팸 처리됨",
            "This user is marked as spammy. Their comments will onlyshow in staff mode.": "이 사용자는 스팸 처리되었어요. 해당 사용자의 댓글은 스태프 모드에서만 보여져요.",

        // 添加到清单
            "Add to list": "목록에 추가",
                "You don't have any lists yet.": "아직 어떤 목록도 없어요.",
                "Lists": "목록",
                    "Search lists": "목록 검색",
                    "🔮 Future ideas": "🔮 미래 아이디어",
                    "🚀 My stack": "🚀 기술 창고",
                    "✨ Inspiration": "✨ 영감",
                "Create list": "목록 만들기",
                    "Create a list to organize your starred repositories.": "별표 된 저장소를 정리할 목록을 만드세요.",
                    "⭐️ Name this list": "⭐️ 이름을 지어주세요",
                    "Write a description": "설명을 적어주세요",
                    // 小贴士
                        "type : to add emoji to the name or description.": "이름이나 목록에 이모티콘을 넣으려면 : 를 입력하세요",
                    "Lists are currently in beta.": "목록 기능은 현재 베타에요.",
                    "Share feedback and report bugs.": "피드백을 공유하고 버그를 신고해주세요",
                    "Creating...": "생성중...",

            // 全局快捷键对话框 - 快捷键 ? 打开
                "Keyboard shortcuts": "단축키",
                "Site-wide shortcuts": "전체 사이트 단축키에요",
                "Open command palette": "명령 팔레트 열기",
                "Open command palette in command mode": "명령 모드에서 명령 팔레트 열기",
                "Focus search bar": "검색창에 포커스 맞추기", // gists
                "Open search bar": "검색창 열기",
                "Go to notifications": "알림으로 이동하기",
                "Go to dashboard": "대시보드로 이동하기",
                "Go to your issues": "이슈로 이동하기",
                "Go to your pull requests": "끌어오기 요청으로 이동하기",
                "Bring up this help dialog": "이 도움말 대화상자 띄우기",
                "Move selection down": "선택 항목 아래로 이동하기",
                "Move selection up": "선택 항목 위로 이동하기",
                "Toggle selection": "선택 전환하기",
                "Open selection": "선택 항목 열기",
                "Expand and move focus into focused link's hovercard": "포커스된 링크의 호버카드 확장 후 포커스 이동하기",
            "View all keyboard shortcuts": "모든 키보드 단축키 보기",
            
            // 명령 팔레트 - ctrl k 또는 ctrl alt k 로 열어요
            "Clear Command Palette": "명령 팔레트 지우기",
            "Tip:": "팁:",
                "Go to your accessibility settings to change your keyboard shortcuts": "키보드 단축키를 변경하려면 무장해제 설정으로 이동해보세요",
                "to search discussions": "토론 검색하기", // # 입력
                "to search issues": "이슈 검색하기", // # 입력
                "to search pull requests": "끌어오기 요청 검색하기", // # 입력
                "to search projects": "프로젝트 검색하기", // ! 입력
                "to search people and organizations": "사람과 조직 검색하기", // @ 입력
                "to search teams": "팀 검색하기", // @ 입력
                "to activate command mode": "명령 모드 활성화하기", // > 입력
                "Type is:issue to filter to issues": "is:issue 입력해서 이슈 필터링해보세요",
                "Type is:pr to filter to pull requests": "is:pr 입력해서 끌어오기 요청 필터링해보세요",
                "Type is:open to filter to open content": "is:open 입력해서 열린 콘텐츠 필터링해보세요",
                "Type author:@me to search your content": "author:@me 입력해서 내 콘텐츠 검색해보세요",
                "for help and tips": "도움말 및 팁을 보시려면", // ? 입력
            
            "Pages": "페이지",
            "Dashboard": "대시보드",
            "Notifications": "알림",
            "Discussions": "토론",
            "Actions": "액션",
            "Insights": "통계",
            "Organizations": "조직",
            "Repositories": "저장소",
            "Packages": "패키지",
            "Users": "사용자",
            "to jump to": "다음으로 이동:",
            
            "Top result": "최고 결과",
            "No results matched your search": "검색과 일치하는 결과가 없어요.",
            // [/in ([\w]+/[\w]+)/, "在 $1"],
            
            // # 모드
            "Search issues and pull requests": "이슈와 끌어오기 요청 검색하기",
            "Search issues, pull requests, discussions, and projects": "이슈, 끌어오기 요청, 토론 및 프로젝트 검색하기",
            "Issues, pull requests, and discussions": "이슈, 끌어오기 요청, 토론",
            
            // ! 모드
            "Search projects": "프로젝트 검색하기",
            
            // @ 모드
            "Search or jump to a repository": "저장소 검색 또는 이동하기",
            "Search or jump to a user, organization, or repository": "사용자, 조직 또는 저장소 검색 또는 이동하기",
            
            // / 파일 모드
            "Search files": "파일 검색하기",
            "Files": "파일",
            
            // > 명령 모드
            "Run a command": "명령 실행하기",
            "Run command": "명령 실행하기",
            "Commands": "명령",
            "Global Commands": "전역 명령",
            "Type > to filter": "키워드 > 입력해서 필터링해보세요",
            "– New repository": "- 새 저장소 만들기",
            "– Import repository": "- 저장소 가져오기",
            "– New project": "- 새 프로젝트 만들기",
            "– New discussion": "- 새 토론 만들기",
            "– New organization": "- 새 조직 만들기",
            "– New gist": "- 새 gists 만들기",
            "– New issue": "- 새 이슈 만들기",
            "– New file": "- 새 파일 만들기",
            "– Change tab size rendering": "- 탭 크기 렌더링 변경하기",
            "– Switch theme": "- 테마 전환하기",

            "New issue": "새 이슈 만들기",
            "New discussion": "새 토론 만들기",
            "New file": "새 파일 만들기",
            "Change tab size rendering": "탭 크기 변경하기",
            "Change tab size r...": "탭 크기 변경하기",
            "2 spaces": "2 칸 공백",
            "3 spaces": "3 칸 공백",
            "4 spaces": "4 칸 공백",
            "5 spaces": "5 칸 공백",
            "6 spaces": "6 칸 공백",
            "7 spaces": "7 칸 공백",
            "8 spaces": "8 칸 공백",
            "9 spaces": "9 칸 공백",
            "10 spaces": "10 칸 공백",
            "12 spaces": "12 칸 공백",
            "Switch theme": "테마 전환하기",
            "Default dark": "다크 - 기본",
            "Default light": "라이트 - 기본",
            "Dark dimmed": "어둡게 흐림",
            "Switch theme to dark high contrast": "테마를 다크 - 고대비로 전환하기",
            "Sync with system settings": "시스템 설정과 동기화하기",
          
            // ? 모드
            "Modes": "모드",
            "Search for": "검색하기",
            "across all of GitHub": "GitHub 전체에서",
            "issues, pull requests, discussions,": "이슈, 끌어오기 요청, 토론,",
            "organizations, repositories,": "조직, 저장소,",
            "Projects": "프로젝트",
            "files": "파일",
            "issues": "이슈",
            "Pull requests": "끌어오기 요청",
            "organizations": "조직",
            "repositories": "저장소",
            "users": "사용자",
            "Activate": "활성화",
            "command mode": "명령 모드",
          
            "Use filters in issues, pull requests, discussions, and projects": "이슈, 끌어오기 요청, 토론, 그리고 프로젝트에서 필터 사용하기",
            "Search your issues, pull requests, and discussions": "내 이슈, 끌어오기 요청, 토론 검색하기",
            "Filter to pull requests": "끌어오기 요청으로 필터링하기",
            "Filter to issues": "이슈로 필터링하기",
            "Filter to discussions": "토론으로 필터링하기",
            "Filter to projects": "프로젝트로 필터링하기",
            "Filter to open issues, pull requests, and discussions": "열린 이슈, 끌어오기 요청, 토론으로 필터링하기",
          
            // 이슈 페이지
            "Edit issue title": "이슈 제목 수정하기",
            "Edit issue body": "이슈 내용 수정하기",
            "Transfer issue…": "이슈 옮기기…",
            "Delete issue…": "이슈 삭제하기…",
          
            // 공통 단어, 자주 쓰는 단어
            "Follow": "팔로우",
            "Unfollow": "팔로우 취소",
            "Star": "별표",
            "Stars": "별표",
            "Unstar": "별표 취소",
            "Starred": "별표 됨",
            "Fork": "포크",
            "Save": "저장",
            "Saving…": "저장 중…",
            "Saving...": "저장 중...",
            "Updating": "업데이트 중",
            "Updating…": "업데이트 중…",
            "Delete": "삭제",
            "Cancel": "취소",
            "Edit": "편집",
            "Added on": "추가됨:",
            "Loading...": "로딩 중...",
            "Loading…": "로딩 중…",
            "Copied!": "✅ 복사 완료!",
            "Copy to clipboard": "클립보드에 복사하기",
            "Give feedback": "피드백 남기기",
            "Give us your feedback": "피드백 부탁드려요.",
            "Download": "다운로드하기",
            "Create": "만들기",
          
            // 빈 저장소
            "This repository is empty.": "이 저장소는 텅 비어있네요",
            "Care to check out the": "잠시 기다리는 동안",
            "GitHub Channel on YouTube": "GitHub의 YouTube 채널도",
            "while you wait?": "확인해보세요. 심심할 것 같아서요.",
            "and": "그리고",
            ", and": ", 그리고",
            "or": "아니면",
            ", or": ", 아니면",
            "to": "까지",
            "by": "작성자:",
            "on": "에서",
            "Use": "사용하기",

            "Learn more": "자세히 알아보기",
            "Learn More": "자세히 알아보기",
            "Learn more.": "자세히 알아보기",
            ",": ",",
            ".": ".",

            "Prev": "이전",
            "Previous": "이전",
            "Next": "다음",

            // 名词
            "Public": "공개",
            "Private": "비공개",
            "Public archive": "공개 보관",
            "Private archive": "비공개 보관",
            "Public template": "공개 템플릿",
            "Public mirror": "공개 미러",
            "Code": "코드",
            "Overview": "개요",
            "Followers": "팔로워",
            "Collaborators": "기여자",
            "collaborators": "기여자",
            "Sponsors": "후원",
            "Sponsoring": "후원",
            "commit": "커밋",
            "commits": "커밋",
            "Organization": "조직",
            "People": "사람",
            "Teams": "팀",

            // 相对时间
            "just now": "방금",
            "now": "지금",
            "yesterday": "어제",
            "last month": "저번달",

        // 验证标记浮动信息
        "This commit was created on GitHub.com and signed with GitHub’s": "이 커밋은 GitHub.com에서 생성되었고, GitHub의",
        "This commit was created on GitHub.com and signed with GitHub's": "이 커밋은 GitHub.com에서 생성되었고, GitHub의",
        "This commit was created on GitHub.com and signed with GitHub’s verified signature": "이 커밋은 GitHub.com에서 생성되었고, GitHub의 검증된 서명으로 서명되었어요.",
        "This commit was signed with the committer's": "이 커밋은 커밋 작성자의",
        "This tag was signed with the committer's": "이 꼬리표는 커밋 작성자의", // /<user-name>/<repo-name>/releases
        "This commit was signed with the committer’s": "이 커밋은 커밋 작성자의",
        "This tag was signed with the committer’s": "이 꼬리표는 커밋 작성자의", //
        "verified signature": "검증된 서명",
        "The key has expired": "키가 만료되었어요.",
        "This commit is not signed, but one or more authors requires that any commit attributed to them is signed.": "이 커밋은 서명되지 않았어요. 하지만 한 명 이상의 작성자가 자신에게 귀속된 모든 커밋에 서명되기를 요구해요.",
        "We had a problem verifying this signature. Please try again later.": "이 서명을 검증하는 중 문제가 발생했어요. 나중에 다시 시도해보세요.",
      
        "GPG Key ID:": "GPG 키 ID:",
        "SSH key Fingerprint:": "SSH 키 지문:",
        "Learn about vigilant mode": "경계 모드에 대해 알아보기",
        "The email in this signature doesn’t match the committer email.": "이 서명의 이메일이 커밋 작성자의 이메일과 일치하지 않아요.",
        "No user is associated with the committer email.": "커밋 작성자의 이메일과 연결된 사용자가 없어요.",
      
        "Verified": "검증됨",
        "Expired": "만료됨",
        "Partially verified": "부분 검증됨",
        "Unverified": "검증되지 않음",
            "Upload your public signing GPG key": "공개 서명 GPG 키 업로드하기",
            "to verify your signature.": "서명 검증을 위해 업로드해보세요.",
      
        // 이메일 검증 알림
        "Please verify your email address to access all of GitHub's features.": "모든 GitHub 기능을 사용하시려면 이메일 주소를 검증해보세요.",
        "Configure email settings": "이메일 설정 구성하기",
        "Your email was verified.": "이메일 주소가 검증되었어요.",
      
        // 꼬리표 알림
        "New feature or request": "새 기능 또는 요청",
      
        // 새 휴대폰으로 교체할 때, 복구 코드를 다시 다운로드해야 한다는 전체 알림
        "Don't get locked out - if you get a new phone this season, be sure to transfer your authenticator app data to the new phone. Enable cloud back up if your authenticator app supports it and consider": "계정 접근이 차단되지 않도록 하세요 - 이번에 새 휴대폰을 사용하게 되면, 반드시 인증 앱 데이터를 새 휴대폰으로 이전해보세요. 인증 앱이 클라우드 백업을 지원한다면 이를 활성화하고",
        "redownloading your recovery codes": "복구 코드를 다시 다운로드하기",
        ", just to be safe.": "안전을 위해서요.",
      
        // 세션 새로 고침 알림
        "You signed in with another tab or window.": "다른 탭 또는 창에서 로그인하셨어요.",
        "Reload": "다시 불러오기",
        "to refresh your session.": "로 세션을 새로 고치세요.",

        // Cookie 设置
        "Manage cookie preferences": "쿠키 환경 설정 관리하기",
        "Most GitHub websites use cookies. Cookies are small text files placed on your device to store data so web servers can use it later. GitHub and our third-party partners use cookies to remember your preferences and settings, help you sign in, show you personalized ads, and analyze how well our websites are working. For more info, see the Cookies and similar technologies section of the": "대부분의 GitHub 웹사이트는 쿠키를 사용해요. 쿠키는 웹 서버가 나중에 활용할 수 있도록 기기에 저장되는 작은 텍스트 파일이에요. GitHub와 제3자 파트너들은 여러분의 환경 설정과 설정 정보를 기억하고, 로그인에 도움을 주며, 개인 맞춤형 광고를 제공하고, 웹사이트의 작동 상태를 분석하기 위해 쿠키를 사용해요. 자세한 정보는 다음의 쿠키 및 유사 기술 섹션을 참고해 주세요:",
        "Privacy Statement": "개인정보 보호정책",
        "Accept": "수락하기",
        "Reject": "거부하기",
        "Reset all": "전체 재설정하기",
        "Save changes": "변경 사항 저장하기",
        "Required": "필수",
        "GitHub uses required cookies to perform essential website functions and to provide the services. For example, cookies are used to log you in, save your language preferences, provide a shopping cart experience, improve performance, route traffic between web servers, detect the size of your screen, determine page load times, improve user experience, and for audience measurement. These cookies are necessary for our websites to work.": "GitHub는 필수 쿠키를 사용하여 웹사이트의 기본 기능을 수행하고 서비스를 제공해요. 예를 들어, 쿠키는 로그인, 언어 환경 설정 저장, 쇼핑 카트 경험 제공, 성능 향상, 웹 서버 간 트래픽 라우팅, 화면 크기 감지, 페이지 로드 시간 측정, 사용자 경험 개선 및 방문자 측정을 위해 사용돼요. 이러한 쿠키는 웹사이트가 정상적으로 작동하는 데 꼭 필요해요.",
        "Analytics": "분석",
        "We allow third parties to use analytics cookies to understand how you use our websites so we can make them better. For example, cookies are used to gather information about the pages you visit and how many clicks you need to accomplish a task. We also use some analytics cookies to provide personalized advertising.": "저희는 제3자가 분석 쿠키를 사용하여 여러분이 웹사이트를 어떻게 이용하는지 이해하고, 이를 바탕으로 웹사이트를 개선할 수 있도록 허용해요. 예를 들어, 쿠키는 여러분이 방문한 페이지와 작업을 수행하는 데 필요한 클릭 수에 대한 정보를 수집하는 데 사용돼요. 또한, 일부 분석 쿠키는 개인 맞춤형 광고를 제공하기 위해 사용돼요.",
        "Social Media": "소셜 미디어",
        "GitHub and third parties use social media cookies to show you ads and content based on your social media profiles and activity on GitHub's websites. This ensures that the ads and content you see on our websites and on social media will better reflect your interests. This also enables third parties to develop and improve their products, which they may use on websites that are not owned or operated by GitHub.": "GitHub와 제3자는 여러분의 소셜 미디어 프로필과 GitHub 웹사이트에서의 활동을 기반으로 광고와 콘텐츠를 보여주기 위해 소셜 미디어 쿠키를 사용해요. 이를 통해 여러분이 웹사이트와 소셜 미디어에서 보는 광고와 콘텐츠가 여러분의 관심사를 더욱 잘 반영할 수 있어요. 또한, 제3자가 GitHub가 소유하거나 운영하지 않는 웹사이트에서 사용할 제품을 개발하고 개선할 수 있도록 도와줘요.",
        "Advertising": "광고",
        "In addition, GitHub and third parties use advertising cookies to show you new ads based on ads you've already seen. Cookies also track which ads you click or purchases you make after clicking an ad. This is done to show you ads that are more relevant to you and for business purposes with our advertising partners. For example, cookies are used to detect when you click an ad and to show you ads based on your social media interests and website browsing history.": "또한, GitHub와 제3자는 여러분이 이미 본 광고를 기반으로 새로운 광고를 보여주기 위해 광고 쿠키를 사용해요. 쿠키는 여러분이 클릭한 광고나, 광고 클릭 후 구매한 상품을 추적하기도 해요. 이는 여러분에게 더욱 관련성 높은 광고를 보여주고, 광고 파트너와의 비즈니스 목적으로 사용돼요. 예를 들어, 쿠키는 여러분이 언제 광고를 클릭하는지 감지하고, 여러분의 소셜 미디어 관심사와 웹사이트 방문 기록을 바탕으로 광고를 보여주는 데 사용돼요.",
        // 달력
            "Jan": "1월",
            "Feb": "2월",
            "Mar": "3월",
            "Apr": "4월",
            "May": "5월",
            "Jun": "6월",
            "Jul": "7월",
            "Aug": "8월",
            "Sep": "9월",
            "Oct": "10월",
            "Nov": "11월",
            "Dec": "12월",

            "January"   : "1월",
            "February"  : "2월",
            "March"     : "3월",
            "April"     : "4월",
            "June"      : "6월",
            "July"      : "7월",
            "August"    : "8월",
            "September" : "9월",
            "October"   : "10월",
            "November"  : "11월",
            "December"  : "12월",

            "Sun"  : "일",
            "Mon"  : "월",
            "Tue"  : "화",
            "Wed"  : "수",
            "Thu"  : "목",
            "Fri"  : "금",
            "Sat"  : "토",


        // 语言名称（仅适配热门语言
            "Abkhazian": "압카즈어",
            "Afar": "아파르어",
            "Afrikaans": "아프리칸스어",
            "Akan": "아칸어",
            "Albanian": "알바니아어",
            "Amharic": "암하라어",
            "Arabic": "아랍어",
            "Aragonese": "아라고네스어",
            "Armenian": "아르메니아어",
            "Assamese": "아삼어",
            "Avaric": "아바르어",
            "Avestan": "아베스타어",
            "Aymara": "아이마라어",
            "Azerbaijani": "아제르바이잔어",
            "Bambara": "밤바라어",
            "Bashkir": "바슈키르어",
            "Basque": "바스크어",
            "Belarusian": "벨라루스어",
            "Bengali": "벵골어",
            "Bihari languages": "비하리어",
            "Bislama": "비스라마어",
            "Bosnian": "보스니아어",
            "Breton": "브르타뉴어",
            "Bulgarian": "불가리아어",
            "Burmese": "버마어",
            "Catalan, Valencian": "카탈루냐어",
            "Chamorro": "차모로어",
            "Chechen": "체첸어",
            "Chichewa, Chewa, Nyanja": "치체와어",
            "Chinese": "중국어",
            "Chuvash": "추바시어",
            "Cornish": "콘월어",
            "Corsican": "코르시카어",
            "Cree": "크리어",
            "Croatian": "크로아티아어",
            "Czech": "체코어",
            "Danish": "덴마크어",
            "Divehi, Dhivehi, Maldivian": "디베히어",
            "Dutch, Flemish": "네덜란드어",
            "Dzongkha": "종카어",
            "English": "영어",
            "Esperanto": "에스페란토",
            "Estonian": "에스토니아어",
            "Ewe": "에웨어",
            "Faroese": "페로어",
            "Fijian": "피지어",
            "Finnish": "핀란드어",
            "French": "프랑스어",
            "Fulah": "풀라어",
            "Galician": "갈리시아어",
            "Georgian": "조지아어",
            "German": "독일어",
            "Greek, Modern": "현대 그리스어",
            "Guarani": "과라니어",
            "Gujarati": "구자라트어",
            "Haitian, Haitian Creole": "아이티 크리올어",
            "Hausa": "하우사어",
            "Hebrew": "히브리어",
            "Herero": "헤레로어",
            "Hindi": "힌디어",
            "Hiri Motu": "히리 모투어",
            "Hungarian": "헝가리어",
            "Interlingua": "인터링구아어",
            "Indonesian": "인도네시아어",
            "Interlingue, Occidental": "인터링구에어",
            "Irish": "아일랜드어",
            "Igbo": "이그보어",
            "Inupiaq": "이누피악어",
            "Ido": "이도",
            "Icelandic": "아이슬란드어",
            "Italian": "이탈리아어",
            "Inuktitut": "이눅티투트어",
            "Japanese": "일본어",
            "Javanese": "자바어",
            "Kalaallisut, Greenlandic": "그린란드어",
            "Kannada": "칸나다어",
            "Kanuri": "카누리어",
            "Kashmiri": "카슈미르어",
            "Kazakh": "카자흐어",
            "Central Khmer": "크메르어",
            "Kikuyu, Gikuyu": "키쿠유어",
            "Kinyarwanda": "키냐르완다어",
            "Kirghiz, Kyrgyz": "키르기스어",
            "Komi": "코미어",
            "Kongo": "콩고어",
            "Korean": "한국어",
            "Kurdish": "쿠르드어",
            "Kuanyama, Kwanyama": "콴야마어",
            "Latin": "라틴어",
            "Luxembourgish, Letzeburgesch": "룩셈부르크어",
            "Ganda": "간다어",
            "Limburgan, Limburger, Limburgish": "림버그어",
            "Lingala": "링갈라어",
            "Lao": "라오어",
            "Lithuanian": "리투아니아어",
            "Luba-Katanga": "루바-카탕가어",
            "Latvian": "라트비아어",
            "Manx": "맨스어",
            "Macedonian": "마케도니아어",
            "Malagasy": "마다가스카르어",
            "Malay": "말레이어",
            "Malayalam": "말라얄람어",
            "Maltese": "몰타어",
            "Maori": "마오리어",
            "Marathi": "마라티어",
            "Marshallese": "마셜어",
            "Mongolian": "몽골어",
            "Nauru": "나우루어",
            "Navajo, Navaho": "나바호어",
            "North Ndebele": "북부 은데벨레어",
            "Nepali": "네팔어",
            "Ndonga": "은동가어",
            "Norwegian Bokmål": "노르웨이어 (보크말)",
            "Norwegian Nynorsk": "노르웨이어 (뉴노르스크)",
            "Norwegian": "노르웨이어",
            "Yi": "이족어",
            "South Ndebele": "남부 은데벨레어",
            "Occitan": "옥시타니어",
            "Ojibwa": "오지브와어",
            "Church Slavic, Old Slavonic, Church Slavonic": "교회 슬라브어",
            "Oromo": "오로모어",
            "Oriya": "오리야어",
            "Ossetian, Ossetic": "오세트어",
            "Punjabi, Panjabi": "펀자브어",
            "Pali": "팔리어",
            "Persian": "페르시아어",
            "Polish": "폴란드어",
            "Pashto, Pushto": "파슈토어",
            "Portuguese": "포르투갈어",
            "Quechua": "케추아어",
            "Romansh": "로만슈어",
            "Rundi": "룬디어",
            "Romanian, Moldavian, Moldovan": "루마니아어",
            "Russian": "러시아어",
            "Sanskrit": "산스크리트어",
            "Sardinian": "사르데냐어",
            "Sindhi": "신드어",
            "Northern Sami": "북부 사미어",
            "Samoan": "사모아어",
            "Sango": "상고어",
            "Serbian": "세르비아어",
            "Gaelic, Scottish Gaelic": "스코틀랜드 게일어",
            "Shona": "쇼나어",
            "Sinhala, Sinhalese": "신할라어",
            "Slovak": "슬로바키아어",
            "Slovenian": "슬로베니아어",
            "Somali": "소말리어",
            "Southern Sotho": "남부 소토어",
            "Spanish": "스페인어",
            "Sundanese": "순다어",
            "Swahili": "스와힐리어",
            "Swati": "스와티어",
            "Swedish": "스웨덴어",
            "Tamil": "타밀어",
            "Telugu": "텔루구어",
            "Tajik": "타지크어",
            "Thai": "태국어",
            "Tigrinya": "티그리냐어",
            "Tibetan": "티베트어",
            "Turkmen": "투르크멘어",
            "Tagalog": "타갈로그어",
            "Tswana": "츠와나어",
            "Tonga (Tonga Islands)": "통가어",
            "Turkish": "터키어",
            "Tsonga": "총가어",
            "Tatar": "타타르어",
            "Twi": "트위어",
            "Tahitian": "타히티어",
            "Uighur, Uyghur": "위구르어",
            "Ukrainian": "우크라이나어",
            "Urdu": "우르두어",
            "Uzbek": "우즈베크어",
            "Venda": "벤다어",
            "Vietnamese": "베트남어",
            "Volapük": "볼라퓌크어",
            "Walloon": "왈롱어",
            "Welsh": "웰시어",
            "Wolof": "월로프어",
            "Western Frisian": "서부 프리지아어",
            "Xhosa": "코사어",
            "Yiddish": "이디시어",
            "Yoruba": "요루바어",
            "Zhuang": "좡어",
            "Zulu": "줄루어",

    // Copilot 창
        // 상단
        "All repositories": "모든 저장소",
        "Back": "뒤로가기",
        "Conversation options": "대화 옵션",
            "Delete conversation": "대화 삭제하기",
            "View all conversations": "모든 대화 보기",
                "Active conversations": "최근 대화",
                // 삭제
                    "Are you sure? This can’t be undone.": "확실하신가요? 이 작업은 되돌릴 수 없어요.",
        "Take conversation to immersive": "전체 화면 대화로 전환하기",
        "Close chat": "채팅 닫기",

        "public": "공개",
        "repository": "저장소",

        "Ask Copilot": "Copilot에게 문의하기",
            "Select a repository to get started. Ask questions about your codebase to get answers fast and learn your way around.": "시작하려면 저장소를 선택해주세요. 코드베이스에 관한 질문을 하시면 빠른 답변과 필요한 정보를 얻으실 수 있어요.",
            "uses AI. Check for mistakes.": "은(는) AI를 사용해요. 실수가 없는지 확인해주세요.",
        "Search repositories to chat about": "대화할 저장소 검색하기",
        "Recent repositories": "최근 방문한 저장소",
        "General purpose chat": "일반 대화하기",

        "Loading Conversation": "대화 로딩 중...",
        "Chatting about code and programming": "코드와 프로그래밍에 대해 대화하기",
        // 대화창
        "Ask about the repository:": "저장소에 대해 문의하기:",
        "Attach files or symbols": "파일이나 심볼 첨부하기",
        "Add an extension": "확장 추가하기",
            "Files and symbols…": "파일 및 심볼…",
                "First attach a repository": "먼저 저장소를 첨부해주세요",
                "Attach files and symbols": "파일과 심볼 첨부하기",
                    "Choose which files and symbols you want to chat about. Use fewer references for more accurate responses.": "대화할 파일과 심볼을 선택해주세요. 참조가 적을수록 더 정확한 답변을 얻을 수 있어요.",
                    "Search files and symbols": "파일 및 심볼 검색하기",
                    "Current attachments": "현재 첨부물",
                    "Symbols": "심볼",
            "Repository…": "저장소…",
                "Attach a repository": "저장소 첨부하기",
                    "Search repositories": "저장소 검색하기",
                    "Fetching repositories…": "저장소 가져오는 중…",
                "Close": "닫기",
            "Extension…": "확장…",
            "Extension": "확장",
                "Extensions": "확장들",
                    "Chat with your favorite tools and services": "자주 사용하는 도구 및 서비스와 대화해보세요.",
                    "Browse the marketplace to find extensions for the tools and services you rely on": "사용 중인 도구와 서비스의 확장을 찾으려면 장터를 둘러보세요.",
                    "Browse marketplace": "장터 둘러보기",
        "Send now": "지금 전송하기",
        // 피드백
        "Rate your experience": "피드백 남기기",
        // 네 가지 이모티콘
            "Love it": "쩔어요",
            "It’s ok": "괜찮아요",
            "Not great": "보통이에요",
            "Hate it": "별로예요",

        "Tell us what you liked or what could be better": "좋았던 점이나 개선할 점을 알려주세요.",

        // 응답 상태
            "Copilot is responding…": "Copilot이 응답 중이에요…",
            "creating plan": "계획 작성 중",
            "getting data": "데이터 가져오는 중",
            "Using the GitHub API to search pull requests": "GitHub API를 사용해 끌어오기 요청 검색 중",
            "Using the GitHub API to get latest release": "GitHub API를 사용해 최신 릴리스를 가져오는 중",
                "Copilot used the": "Copilot이 사용했어요:",
                "Issue API": "이슈 API",
                "tool": "도구",

        // 참조
            "More reference options": "더 많은 참조 옵션",
                "Attach to chat": "대화에 첨부하기",
                "Raw": "원시 코드",
                "Show content": "내용 보기",
                    "above": "위쪽에",
                    "below": "아래쪽에",
                "Reference details": "참조 세부사항",
                    "contributor": "기여자",
                    "contributors": "기여자들",
                    "updated": "업데이트됨",

        "Please don’t include sensitive, confidential, or personal data. Your anonymous feedback helps us improve our services in line with our": "민감하거나 기밀, 개인 데이터를 포함하지 말아주세요. 익명의 피드백은 당사의 서비스 개선에 도움이 돼요. (아래)",
        "Privacy Policy": "개인정보 보호정책",
        "Send": "전송하기",
        "uses AI. Check for mistakes.": "은(는) AI를 사용해요. 실수가 없는지 확인해주세요.",

        "Copy code": "코드 복사하기",
        "Copied!": "복사 됐어요!",

        "Good response": "좋은 대답",
        "Bad response": "나쁜 대답",

        },
        "regexp": [ // 정규식 번역
            // Copilot 창
            [/Chatting about ([^ ]+)/, "$1에 대한 대화"],
            //[/Public code references from 4 repositories/, ""],
            [/Public code references from (\d+) repositor(y|ies)/, "공개 코드, $1개 저장소에서 참조"],
            [/(\d+) references?/, "$1개 참조"],
            [/(\d+) lines? \((\d+) loc\) ·/, "$1줄 ($2 비어 있지 않은 줄) ·"],  // loc = 코드 줄(line of code) = 전체 줄 - 공백 줄 (lines - blank lines)
            [/Using the GitHub API to search for issues assigned to user ([^ ]+)/, "GitHub API를 사용하여 사용자 $1에게 할당된 이슈 검색"],
            [/Chatting with (\d+) attachments?/, "$1개 첨부 파일과 대화"],
            
            // 날짜 및 시간 형식 변환
            [/(^Updated |^Commits on |^Joined on |on )?(?:(Sun(?:day)?|Mon(?:day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:day)?|Sat(?:urday)?)?,? )?(?:(\d{1,2})(?:st.|nd.|rd.|th.)?)? ?(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?) ?(\d{1,2})?,? (\d{4})?/g, function (all, prefix, week, date1, month, date2, year) {
                var prefixKey = {
                    "Updated "   : "업데이트됨 ",
                    "Commits on ": "커밋됨 ",
                    "Joined on " : "가입일: ",
                };
                var weekKey = {
                    "Sun"  : "일요일",
                    "Mon"  : "월요일",
                    "Tue"  : "화요일",
                    "Wed"  : "수요일",
                    "Thu"  : "목요일",
                    "Fri"  : "금요일",
                    "Sat"  : "토요일"
                };
                var monthKey = {
                    "Jan": "1월",
                    "Feb": "2월",
                    "Mar": "3월",
                    "Apr": "4월",
                    "May": "5월",
                    "Jun": "6월",
                    "Jul": "7월",
                    "Aug": "8월",
                    "Sep": "9월",
                    "Oct": "10월",
                    "Nov": "11월",
                    "Dec": "12월"
                };
    
                var date = date1 ? date1 : date2;
                var formattedDate = (year ? year + '년 ' : '') + monthKey[month.substring(0, 3)] + (date ? date + '일' : '');
                var formattedWeek = week ? ', ' + weekKey[week.substring(0, 3)] : '';
    
                return (prefixKey[prefix] ? prefixKey[prefix] : '') + formattedDate + formattedWeek;
            }],
            
            // 상대 시간 형식 변환
            [/^just now|^now|^last month|^yesterday|(?:(over|about|almost|in) |)(an?|\d+)(?: |)(second|minute|hour|day|month|year)s?( ago|)/, function (all, prefix, count, unit, suffix) {
                if (all === 'now') {
                    return '지금';
                }
                if (all === 'just now') {
                    return '방금';
                }
                if (all === 'last month') {
                    return '지난달';
                }
                if (all === 'yesterday') {
                    return '어제';
                }
                if (count[0] === 'a') {
                    count = '1';
                }
    
                var unitKey = {second: '초', minute: '분', hour: '시간', day: '일', month: '개월', year: '년'};
    
                if (suffix) {
                    return (prefix === 'about' || prefix === 'almost' ? '약 ' : prefix === 'less than' ? '미만 ' : '') + count + ' ' + unitKey[unit] + (prefix === 'over' ? ' 이상 전' : ' 전');
                } else {
                    return count + ' ' + unitKey[unit] + (prefix === 'in' ? ' 후' : ' 전');
                }
            }],
            
            // 보안 메시지 번역
            [/to enable two-factor authentication as an additional security measure. Your activity on GitHub includes you in this requirement. You will need to enable two-factor authentication on your account before ([^ ]+), or be restricted from account actions./, "추가 보안 조치로 이중 인증(2FA)을 활성화하세요. GitHub에서의 활동으로 인해 이 요구 사항이 적용됩니다. $1 이전에 이중 인증을 설정하지 않으면 계정 작업이 제한됩니다."],
        ],
        "time-regexp": [ // 시간 정규식 변환 전용
            [/^just now|^now|^last year|^last month|^last week|^yesterday|(?:(over|about|almost|in) |)(an?|\d+)(?: |)(second|minute|hour|day|month|year|week)s?( ago|)/, function (all, prefix, count, unit, suffix) {
                if (all === 'now') {
                    return '지금';
                }
                if (all === 'just now') {
                    return '방금';
                }
                if (all === 'last year') {
                    return '작년';
                }
                if (all === 'last month') {
                    return '지난달';
                }
                if (all === 'last week') {
                    return '지난주';
                }
                if (all === 'yesterday') {
                    return '어제';
                }
                if (count[0] === 'a') {
                    count = '1';
                }
                
                var unitKey = {second: '초', minute: '분', hour: '시간', day: '일', month: '개월', year: '년', week: '주'};
    
                if (suffix) {
                    return (prefix === 'about' || prefix === 'almost' ? '약 ' : prefix === 'less than' ? '미만 ' : '') + count + ' ' + unitKey[unit] + (prefix === 'over' ? ' 이상 전' : ' 전');
                } else {
                    return count + ' ' + unitKey[unit] + (prefix === 'in' ? ' 후' : ' 전');
                }
            }],
        ],
    };
    

I18N["ko-KR"]["orgs-public"] = { // 组织公共部分
    "static": { // 静态翻译
    },
    "regexp": [ // 正则翻译
        [/Invite someone to/, "邀请加入到组织"],
        [/New team in/, "新建团队在组织"],
        [/New repository in/, "新建仓库在组织"],
        [/This organization was marked as archived by an administrator (on .+). It is no longer maintained./, "该组织已由管理员于 $1 存档。不再维护。"],
        [/You are now a member of ([^ ]+)!/, "您现在是 $1 的成员了！"],
    ],
};

I18N["ko-KR"]["page-dashboard"] = { // 已登录的首页 - 仪表板（含组织）
    "static": { // 静态翻译
        // GPT 부분
        "Ask Copilot": "Copilot에게 무엇이든 물어보세요!",
            "Open issues in facebook/react": "facebook/react의 열린 이슈",
            // "Pull requests in": "microsoft/vscode", 
            // "microsoft/vscode": "에 있는 끌어오기 요청",
            // -- 작동 안함 --
            "Recent commits in torvalds/linux": "torvalds/linux의 최근 커밋",
            "Find issues assigned to me": "나에게 할당된 이슈 찾기",
            "What is a hash table in JS?": "JS에서 해시 테이블이란?",
            "Latest nodejs/node release": "최신 nodejs/node 릴리스",
            "Create a profile README for me": "프로필 README 생성",
            "Recent bugs in primer/react": "primer/react의 최근 버그",
            "My open pull requests": "내 열린 끌어오기 요청",
            "Generate an HTML/JS calculator": "HTML/JS 계산기 생성",
            "Python password endpoint": "Python 비밀번호 엔드포인트",
            "Rails authentication endpoint": "Rails 인증 엔드포인트",
            "Email validation regex in JS": "JS 이메일 검증 정규식",
            "What are Python decorators?": "Python 데코레이터란?",
            "Python Panda data analysis": "Python Panda 데이터 분석",
            "How can you help?": "어떻게 도와줄 수 있어?", 
            "What can I do here?": "내가 여기서 뭘 할 수 있을까?",
            "To-do list with local storage": "로컬 스토리지를 사용하는 할 일 목록",
            "A digital time zone clock": "디지털 시간대 시계",
            "Develop a weather dashboard": "날씨 대시보드 개발",
            "Create a joke generator": "농담 생성기 만들기",
        "Send": "전송",
        "uses AI. Check for mistakes.": "AI를 사용해요. 실수를 확인해보세요!",
        // 초보자 도움말
        "Learn Git and GitHub without any code!": "Git과 GitHub를 단 한 줄의 코드도 없이 배워보세요!",
        "Using the Hello World guide, you’ll create a repository, start a branch,": "헬로 월드 가이드를 사용해서, 저장소를 생성하고 분기를 시작할 거예요,",
        "write comments, and open a pull request.": "댓글도 작성하고 끌어오기 요청을 열 거예요.",
        "Let's get started!": "시작해봐요!",
        "Hide this notice forever": "이 알림을 영원히 숨기기",
    
        "Welcome to GitHub! What’s next?": "GitHub에 오신 것을 환영해요! 이제 뭘 할까요?",
        "Create a repository": "저장소를 만들기",
        "Tell us about yourself": "자신에 대해 소개해 주세요",
        "Browse interesting repositories": "흥미로운 저장소들을 둘러보기",
        "on Twitter": "Twitter에서",
    
        "You don’t have any repositories yet!": "아직 저장소가 없어요!",
        "Create your first repository": "첫 번째 저장소를 만들어보세요",
        "or": "아니면",
        "Learn more about Git and GitHub": "Git과 GitHub에 대해 더 알아보기",
    
        // 교육판
        "Join GitHub Education!": "GitHub 교육에 가입해보세요!",
            "GitHub Education opens doors to new skills, tools, and a collaborative community eager to drive innovation. Join us and build a foundation for your future in technology.": "GitHub 교육은 새로운 기술과 도구, 그리고 혁신을 향한 열정을 가진 협업 커뮤니티로 나아갈 수 있는 기회를 제공해요. 지금 합류해서 여러분의 기술 미래를 위한 기반을 마련해보세요.",
        "Join GitHub Education": "GitHub 교육에 가입해보세요",
    
        // 조직
        // [/You’re an owner of the ([^ ]+) organization!/, "사용자님은 $1 조직의 소유자에요!"],
        // [/Create a repository for ([^ ]+)/, "$1을 위한 저장소를 만들어보세요"],
        "Welcome to the": "환영합니다 :",
        "View your teams": "팀을 확인해보세요",
        "View and create teams": "팀을 확인하고 만들어보세요",
        "See all owners": "모든 소유자를 확인해보세요",
        "You've been added to the": "이미",
        "organization.": "조직에 추가되어 있어요.",
        // [/Edit ([^ ]+)’s settings/, "$1의 설정을 편집해보세요"],
        "Return to your personal dashboard": "개인 대시보드로 돌아가기",
    
        // 이미 저장소가 있는 프로젝트
        // 왼쪽 사이드바
        "View organization": "조직 보기", // 조직
        "Browse organization's repositories": "조직의 저장소들을 둘러보기", // 조직
        "Top repositories": "상위 저장소",
        "Top Repositories": "상위 저장소", // 안드로이드 UA
        "New": "새로 만들기",
        "Find a repository…": "저장소 검색…",
        "Show more": "더 보기",
        "Your teams": "내 팀",
            "You don’t belong to any teams yet!": "아직 어떤 팀에도 속해 있지 않아요!",
        "Find a team…": "팀 검색…",
        "Recent activity": "최근 활동",
            "When you take actions across GitHub, we’ll provide links to that activity here.": "GitHub 전반에서 활동을 하실 때, 해당 활동에 대한 링크를 이곳에 제공해드릴게요.", // 조직
    
        "Create your first project": "첫 번째 프로젝트를 만들어보세요.",
            "Ready to start building? Create a repository for a new idea or bring over an existing repository to keep contributing to it.": "구축을 시작할 준비가 되셨나요? 새로운 아이디어를 위한 저장소를 만들어보거나 기존 저장소를 가져와서 계속 기여해보세요.",
            "Create repository": "저장소 만들기.",

        // 中间栏
        "The home for all developers — including you.": "모든 개발자들의 집이에요! — 사용자님도 당연히 포함해서요.",
        "Welcome to your personal dashboard, where you can find an introduction to how GitHub works, tools to help you build software, and help merging your first lines of code.": "개인 대시보드에 오신 것을 환영해요. 여기서 GitHub의 작동 원리, 소프트웨어 개발에 도움을 주는 도구들, 그리고 첫 코드를 병합하는 방법을 확인해보실 수 있어요.",
        "Learn with a tutorial project": "튜토리얼 프로젝트로 배우기",
          "Introduction to GitHub": "GitHub 소개",
          "Get started using GitHub in less than an hour.": "한 시간 안에 GitHub 사용법을 익혀보세요.",
          "Create a site or blog from your GitHub repositories with GitHub Pages.": "GitHub 저장소를 활용해 GitHub Pages로 사이트나 블로그를 만들어보세요.",
          "Code with Copilot": "Copilot으로 코드 작성하기",
          "Develop with AI-powered code suggestions using GitHub Copilot, Codespaces, and VS Code.": "GitHub Copilot, Codespaces, 그리고 VS Code를 사용해 AI 기반의 코드 제안을 받아 개발해보세요.",
          "Hello GitHub Actions": "GitHub 액션아 안녕!",
          "Create a GitHub Action and use it in a workflow.": "GitHub 액션을 만들어 워크플로에서 사용해보세요.",
          "See more tutorial projects": "더 많은 튜토리얼 프로젝트 보기",
        "Start writing code": "코드 작성 시작하기",
          "A repository contains all of your project's files, revision history, and collaborator discussion.": "저장소는 프로젝트의 모든 파일, 수정 이력, 그리고 협업자 간의 토론을 포함하고 있어요.",
          "Repository name": "저장소 이름",
          "name your new repository...": "새 저장소의 이름을 지어보세요…",
          "Anyone on the internet can see this repository": "인터넷상의 누구나 이 저장소를 볼 수 있어요.",
          "You choose who can see and commit to this repository": "이 저장소를 볼 수 있고 커밋할 수 있는 사람은 직접 선택할 수 있어요.",
          "Create a new repository": "새 저장소 만들기",
          "You're seeing this because you haven't created a repository in a while.": "오랫동안 저장소를 만들지 않으셔서 이 메시지가 보이고 있어요.",
          "You're seeing this because you haven't used repositories, issues, and pull requests recently.": "최근에 저장소, 이슈, 끌어오기 요청을 사용하지 않으셔서 이 메시지가 보이고 있어요.",
          "Remove from dashboard": "대시보드에서 제거하기",
        "Use tools of the trade": "개발 도구 사용하기",
          "You're seeing this because you haven't opened a pull request in a while.": "오랫동안 끌어오기 요청을 열지 않으셔서 이 메시지가 보이고 있어요.",
            "Simplify your development workflow with a GUI": "GUI를 사용해 개발 워크플로를 간소화해보세요.",
            "Install GitHub Desktop": "GitHub Desktop 설치하기",
            "to visualize, commit, and push changes without ever touching the command line.": "명령줄을 전혀 사용하지 않고도 변경 사항을 시각화, 커밋, 푸시할 수 있어요.",
          "Get AI-based coding suggestions": "AI 기반 코딩 제안 받아보기",
            "Try GitHub Copilot free for 30 days,": "GitHub Copilot을 30일 동안 무료로 사용해보세요,",
            "which suggests entire functions in real time, right from your editor.": "편집기에서 바로 전체 함수를 실시간으로 제안해줘요.",
          "Write code in your web browser": "웹 브라우저에서 코드 작성하기",
            "Use": " ",
            "the github.dev web-based editor": "github.dev 웹 기반 편집기를",
            "from your repository or pull request to create and commit changes.": "저장소 또는 끌어오기 요청에서 사용해 변경 사항을 만들고 커밋해보세요.",
        "Install a powerful code editor": "강력한 코드 편집기 설치하기",
          "is a multi-platform code editor optimized for building and debugging software.": "이 편집기는 소프트웨어 빌드와 디버깅에 최적화된 다중 플랫폼 코드 편집기에요.",
        "Set up your local dev environment": "로컬 개발 환경 설정하기",
          "set up Git": "Git 설정하기",
          ", simplify your dev workflow with": "개발 워크플로 간소화하기",
          ", or": ", 아니면",
          "bring GitHub to the command line": "GitHub를 명령줄에서 사용하기",
        "Get started on GitHub": "GitHub 시작하기",
          "You're seeing this because you haven't used GitHub's core features, yet.": "아직 GitHub의 핵심 기능을 사용하지 않으셔서 이 메시지가 보이고 있어요.",
        "Introduce yourself with a profile README": "프로필 README로 자신을 소개하기",
          "Share information about yourself by creating a profile README, which appears at the top of your profile page.": "프로필 페이지 상단에 표시되는 프로필 README를 작성하여 자신에 대한 정보를 공유해보세요.",
        "Follow this exercise to try the GitHub flow": "이 연습을 따라 GitHub 흐름을 체험해보세요.",
          "GitHub's “Hello World” tutorial teaches you essentials, where you create your own repository and learn GitHub's pull request workflow for creating and reviewing code.": "GitHub의 ‘Hello World’ 튜토리얼은 필수 사항을 알려주며, 여기서 본인의 저장소를 만들고 코드를 작성 및 검토하는 끌어오기 요청 워크플로를 배울 수 있어요.",
          "Try the GitHub flow": "GitHub 흐름 체험하기",
        "About version control and Git": "버전 관리 및 Git에 대해 알아보기",
          "Learn about the version control system, Git, and how it works with GitHub.": "버전 관리 시스템인 Git과 GitHub와의 연동 방식에 대해 알아보세요.",
        "The GitHub Flow": "GitHub 흐름",
          "Adopt GitHub's lightweight, branch-based workflow to collaborate on projects.": "프로젝트 협업을 위해 GitHub의 경량화된 분기 기반 워크플로를 도입해보세요.",

        "One moment please...": "잠시만요...",
        "Loading activity...": "작업을 로드중이에요...",
        "All activity": "모든 작업",

        "Welcome to the new feed!": "새 피드에 오신것을 환영합니다!",
        "We’re updating the cards and ranking all the time, so check back regularly. At first, you might need to follow some people or star some repositories to get started": "우리는 항상 카드를 업데이트하고 순위를 매기기 때문에 정기적으로 다시 확인해보세요. 처음에는 몇몇 사람들을 팔로우하거나 리포지토리를 선택해야 시작될 수도 있어요",
        "Send feedback": "피드백 보내기",

        "Updates to your homepage feed": "홈페이지 피드 업데이트",
        "We've combined the power of the Following feed with the For you feed so there’s one place to discover content on GitHub. There’s improved filtering so you can customize your feed exactly how you like it, and a shiny new visual design. ✨": "GitHub에서 팔로우 피드와 추천 피드의 기능을 합쳐서 콘텐츠를 한 곳에서 발견할 수 있게 되었어요. 원하는 대로 피드를 맞춤 설정할 수 있도록 필터링 기능이 개선되었고, 새로운 디자인으로 더욱 보기 좋아졌답니다. ✨",
        "Learn more": "자세히 알아보기",

        // 提要筛选
        "Filter": "필터",
            "Feed filters": "피드 필터",
            "Events": "이벤트",
                "Activity you want to see on your feed": "피드에서 보고 싶은 활동을 골라보세요!",
            "Announcements": "공지",
                "Special discussion posts from repositories": "저장소에서 올라온 특별 토론 게시글들",
            "Releases": "릴리즈",
                "Update posts from repositories": "저장소의 업데이트 게시글들",
            // 후원
                "Relevant projects or people that are being sponsored": "후원을 받고 있는 관련 프로젝트나 사람들",
            "Stars": "별표",
                "Repositories being starred by people": "사람들이 별표 표시한 저장소",
            "Repositories": "저장소",
                "Repositories that are created or forked by people": "사람들이 생성하거나 포크한 저장소",
            "Repository activity": "저장소 활동",
                "Issues and pull requests from repositories": "저장소에서 온 이슈와 끌어오기 요청",
            "Follows": "팔로우",
                "Who people are following": "사람들이 팔로우하는 사람들",
            "Recommendations": "추천",
                "Repositories and people you may like": "사용자님이 좋아할 만한 저장소와 사람들",

            "Include events from starred repositories": "별표 표시한 저장소에서 온 이벤트 포함하기",
                "By default, the feed shows events from repositories you sponsor or watch, and people you follow.": "기본적으로, 피드에는 후원하거나 구독하는 저장소와 팔로우하는 사람들의 이벤트가 표시돼요.",
            "Reset to default": "기본값으로 재설정하기",
            "Save": "저장하기",

        "Show all": "모두 표시하기",
        "Show less": "덜 표시하기",

        "Uh oh!": "헐...",
        "There was an error in loading the activity feed.": "활동 피드를 불러오는 중 오류가 발생했어요.",
        "Reload this page": "이 페이지 다시 불러오기",

        // 动态 状态词
        "starred": "에 별표했어요",
        "created": "생성 :",
        "forked from": "포크됨 :",
        "generated from": "생성됨 :",
        "mirrored from": "미러됨 :",
        "forked": "을(를) 포크했어요",
        "from": "쀐이거어디서나오는지알아냈다면이슈에올려주시거나디스코드jinyoon으로연락주세요왜냐하면이게어디서나오는지진짜모르겠거든요",
        "for": "",
        "pushed to": "푸시됨 :",
        "released": "에서 새로 릴리즈했어요",
        "published": "님이 공개했어요",
        "started sponsoring": "을(를) 후원하기 시작했어요",
        "started following": "을(를) 팔로우하기 시작했어요",
        "you": "나",
        "Updated": "업데이트 :",
        "a repository": "저장소",
        "has a new repository": "에게 새 저장소가 있어요",
        "created a repository": "님이 새 저장소를 만들었어요",
        "created a branch in": "님이 새 분기를 만들었어요 :",
        "in": ":", //쀐
        "Forked to": "포크했어요", //쀐
        "of": "",
        "made": "만들었어요", //쀐
        "public": "공개", 
        "committed": "님이 커밋했어요",
        "posted a discussion in": "님이 토론을 열었어요 :",
        "made this repository public": "님이 이 저장소를 공개로 설정했어요",
        "labeled a pull request": "님이 끌어오기 요청을 라벨했어요",
        "launched their sponsorship page 💖": "이(가) 새 후원 페이지를 열었어요 💖",
        //[/and (\d+) more/, "和另外 $1 个"],
        "All reactions": "모든 반응",

        "published a release": "님이 릴리즈를 공개했어요",
        "forked a repository": "님이 저장소를 포크했어요",
        "starred a repository": "님이 저장소에 별표했어요",
        "sponsored": "님이 후원했어요",
        "followed": "님이 다른 사용자를 팔로우했어요.",
        "added a repository to": "목록에 추가했어요",
        "contributed to": "님이 기여했어요",
            // 现在会显示拉取请求状态
            "Merged": "병합됨",

        "your repository": "내 저장소",

        "Read more": "더 보기",

        "More": "더 보기",
        "Loading more…": "불러오는 중…",

        "Subscribe to your news feed": "뉴스 피드 구독하기",
        "Subscribe to the": "구독하기", // 조직
        "organization news feed": "조직의 뉴스 피드", // 조직
      
        // 홈페이지에 있는 저장소의 3점 메뉴
        "Feed item options": "피드 항목 옵션",
        "You're seeing this because of your activity.": "사용자님의 활동 때문에 이 메시지가 보이고 있어요.",
        "Show less activity like this": "이런 활동 덜 보기",
        // [/You're seeing this because you collaborated with ([^ ]+)/, "사용자님의 활동 때문에 $1와 협업했기 때문이에요"],
        // [/You're seeing this because you starred ([^ ]+)/, "사용자님의 활동 때문에 $1에 별표를 눌렀기 때문이에요"],
        "Unstar this repository": "이 저장소 별표 취소하기",
        // [/You're seeing this because you follow ([^ ]+)/, "사용자님의 활동 때문에 $1를 팔로우했기 때문이에요"],
        "Unfollow this user": "이 사용자 팔로우 취소하기",
      
        "Contributors": "기여자",
        "Report": "신고하기",
        "Recommended for you": "사용자님을 위해 준비했어요",
        "Trending repositories": "유행하는 저장소",
        "See more": "더 보기",
        "You're seeing this based on GitHub-wide trends.": "이 메시지는 GitHub 전반의 트렌드를 바탕으로 보여드리고 있어요.",
        "Recommended based on people you follow": "팔로우 중인 사람들을 기준으로 추천드려요.",
        "has a new discussion in": "새로운 토론이 있어요 :",
        "Join discussion": "토론 참여하기",
        "Popular among": "인기 있어요",
        "people you follow": "내가 팔로우하는 사람들",
        "Sponsor": "후원하기",
      
        // 오른쪽 사이드바
        "Latest changes": "최근 변경 사항",
        "View changelog →": "변경 로그 보기 →",
        "Explore repositories": "저장소 둘러보기",
        "Explore more →": "더 둘러보기 →",
      
        "Member statuses": "멤버 상태", // 조직
      
        // 대시보드 우측 상단 패널
        "The world’s fair of software is here.": "세계 소프트웨어 박람회가 여기 있어요.",
        "The GitHub Universe call for sessions is now open! Apply to share your expertise by submitting a session proposal today. Plus, get 35% off your tickets to GitHub Universe only for a limited time.": "GitHub Universe 세션 제안 접수가 지금 열려 있어요! 오늘 바로 세션 제안을 제출해서 전문 지식을 공유해보세요. 또한, 한정 기간 동안 GitHub Universe 티켓을 35% 할인된 가격에 구입할 수 있어요.",
      
        // 교육 대시보드 (교육 패키지 신청 시 제공)
        "Learn. Collaborate. Grow.": "배우고, 협업하고, 성장해요.",
        "GitHub Education gives you the tools and community support to take on tech challenges and turn them into opportunities. Your future in tech starts here!": "GitHub Education은 기술 도전을 기회로 바꿀 수 있도록 도구와 커뮤니티 지원을 제공해요. 기술 분야에서의 사용자님의 미래는 여기서 시작돼요!",
        "Go to GitHub Education": "GitHub 교육으로 이동하기",
      
        // 사용자 플로팅 정보 카드
        "Member of": "소속 조직",
        // [/, and (\d+) more/, "그리고 추가로 $1개의 조직"],
      
        // 조직 플로팅 정보 카드
        // [/(\d+) repositor(y|ies)/, "$1개의 저장소"],
        // [/(\d+) members?/, "$1명의 멤버"],
      
        "Switch dashboard context": "기본 아이덴티티 전환하기", // 조직
        "Manage organizations": "조직 관리하기", // 조직
        "Create organization": "조직 만들기", // 조직
      
        // 처음 조직에 가입했을 때 알림
        "You’ve been added to the": "(경) 조직에 |",
        "organization!": "| 초대 되셨어요! (축)",
        "Here are some quick tips for a first-time organization member.": "처음 조직에 가입한 분들을 위한 간단한 팁이에요.",
        "Use the switch context button in the upper left corner of this page to switch between your personal context (": "이 페이지 왼쪽 상단의 전환 버튼을 사용하여 개인 아이덴티티 (",
        ") and organizations you are a member of.": ")와 소속 조직 아이덴티티 사이를 전환할 수 있어요.",
        "After you switch contexts you’ll see an organization-focused dashboard that lists out organization repositories and activities.": "아이덴티티를 전환하면 조직 저장소와 활동이 나열된 조직 중심의 대시보드를 보실 수 있어요.",
      
        // 단축키
        "Dashboards": "대시보드",
        "Go to your issues": "내 이슈로 이동하기",
        "Go to your pull requests": "내 끌어오기 요청으로 이동하기",
    },
    "regexp": [ // 正则翻译
        [/added (\d+) repositor(y|ies) to/, "저장소 $1개를 추가하기"],
        [/, and (\d+) more/, "，그리고 다른 $1개의 조직"], // 사용자 플로팅 정보 카드
        [/(\d+) repositor(y|ies)/, "저장소 $1개"], // 조직 플로팅 정보 카드
        [/(\d+) of your repositor(y|ies)/, "사용자님의 $1개의 저장소"],
        [/(\d+) members?/, "$1 명의 멤버"], // 조직 플로팅 정보 카드
        [/is being deleted./, "삭제 중이에요."], // 저장소 및 조직 삭제 중
        [/Your repository \"([^ ]+)\" was successfully deleted./, "사용자님의 저장소 “$1”가 성공적으로 삭제되었어요."], // 저장소 삭제
        [/(\d+) releases?/, "$1 개의 릴리즈"],
        [/(\d+k?) followers?/, "팔로워 $1명"],
        [/(\d+) users?/, "$1명의 사용자"],
        [/(\d+) comments?/, "$1 개의 댓글"],
        [/(\d+) commits? to/, "$1 개의 커밋을"],
        [/(\d+) more commits? »/, "$1 개의 추가 커밋을"],
        [/(\d+) issues? needs? help/, "$1 개의 이슈에 도움이 필요해요"],
        [/Join discussion/, "토론에 참여하기"],
        // [/Updated/, "업데이트됨"],
        [/You’re an owner of the ([^ ]+) organization!/, "사용자님은 $1 조직의 소유자에요!"], // 조직
        [/Create a repository for ([^ ]+)/, "$1 을 위해 저장소 만들기"], // 조직
        [/Edit ([^ ]+)’s settings/, "$1 의 설정 편집하기"], // 조직
        [/Check out ([^ ]+)’s public profile/, "$1 의 공개 프로필 보기"], // 조직
        [/and (\d+) more/, "그리고 $1개 더"],
        [/You're seeing this because you collaborated with ([^ ]+)/, "이 메시지가 보이는 이유는 $1 과(와) 협업했기 때문이에요"],
        [/You're seeing this because you starred ([^ ]+)/, "이 메시지가 보이는 이유는 $1 에 별표를 눌렀기 때문이에요"],
        [/You're seeing this because you follow ([^ ]+)/, "이 메시지가 보이는 이유는 $1 을 팔로우했기 때문이에요"],
        [/You and/, "사용자님과"],
        [/You reacted with (thumbs up|thumbs down|laugh|hooray|confused|heart|rocket|eyes)/, function (all, reacted) {
            var reactedKey = {
                'thumbs up': "좋아요",
                'thumbs down': "싫어요",
                laugh: "웃음",
                hooray: "환호",
                confused: "혼란",
                heart: "하트",
                rocket: "로켓",
                eyes: "관심"
            };

            return '사용자님' + reactedKey[reacted];
        }],
        [/(\d+) (?:people|person) reacted with (thumbs up|thumbs down|laugh|hooray|confused|heart|rocket|eyes)/, function (all, number, reacted) {
            var reactedKey = {
                'thumbs up': "좋아요",
                'thumbs down': "싫어요",
                laugh: "웃음",
                hooray: "환호",
                confused: "혼란",
                heart: "하트",
                rocket: "로켓",
                eyes: "관심"
            };

            return number + ' 명' + reactedKey[reacted];
        }],
        [/Support ([^ ]+)'s open source work/, "​$1 의 오픈 소스 작업 지원하기"],
        [/Start a new repository for/, "새 저장소 만들기:"],
        [/([^ ]+) requested changes, you commented/, "$1 가 변경 요청을 했고, 사용자님은 댓글을 남겼어요."], // 끌어오기 요청 플로팅 정보 카드
        // 상단 알림
        // 후임자 관련
        [/You are now the designated successor for ([^ ]+)'s account./, "사용자님은 이제 $1 의 지정 후임자가 되었어요."],
        [/You have declined to become the designated successor for ([^ ]+)'s account./, "사용자님은 이미 $1 계정의 지정 후임자가 되는 것을 거절하셨어요."],
        // 끌어오기 요청 상태
        [/merged (\d+) commits?/, "커밋 $1개가 병합되었어요."],
    ],
};
I18N["ko-KR"]["dashboard"] = I18N["ko-KR"]["page-dashboard"];
I18N["ko-KR"]["orgs/dashboard"] = I18N["ko-KR"]["page-dashboard"];

I18N["ko-KR"]["page-profile-public"] = { // 个人首页（含组织）
    "static": { // 静态翻译
        // 左侧用户信息栏
        "Change your avatar": "아바타 변경하기",
        "they/them": "그들",
        "she/her": "그녀",
        "he/him": "그",
        "You have blocked this user": "이 사용자를 차단하셨어요",
        "Follow": "팔로우",
        "Sponsor": "후원",
        "follower": "팔로워",
        "followers": "팔로워",
        "following": "팔로잉",
        "Followed by": "함께 팔로우한 사람:",
        "Joined": "가입일:",
        "Achievements": "업적",
        "Highlights": "하이라이트",
            "Label: Pro": "라벨: 프로",
        "Developer Program Member": "개발자 프로그램 멤버",
        "Organizations": "조직",
        "Block or Report": "차단 또는 신고",
        "Unblock or report user": "차단 해제 또는 신고하기",
        "- same time": "- 같은 시간",
    
        // 프로필 편집
            "Edit profile": "프로필 편집하기",
            "Name": "이름",
            "Display": "표시",
                "badge.": "뱃지.",
            "Bio": "자기소개",
            "Add a bio": "자기소개 추가하기",
                "You can": "사용할 수 있어요:",
                "@mention": "@언급",
                "other users and organizations to link to them.": "다른 사용자와 조직을 연결해보세요.",
            "Pronouns": "대명사",
                "Don't specify": "선택 안 함",
                "they/them": "그들",
                "she/her": "그녀",
                "he/him": "그",
                "Custom": "직접 입력",
            "Company": "회사",
            "Location": "위치",
            "Display current local time": "현재 현지 시간 표시하기",
            "same time": "같은 시간",
            "Website": "웹사이트",
            "Social accounts": "소셜 계정",
            "Link to social profile": "소셜 프로필 연결하기",
    
        // 업적 플로팅 인터페이스
            // 북극 코드 저장소 기여자
                "Arctic Code Vault Contributor": "북극 코드 저장소 기여자",
                    "History": "이력",
                    "100% unlocked": "100% 해금됨",
                    "· Unlocked": "· 해금됨:",
                    "these repositories, and more, were archived": "이 저장소와 그 외 저장소가 아카이브되었어요.",
            // YOLO
                "You want it? You merge it.": "원하시면, 직접 머지해보세요.",
                "Merged without a review": "리뷰 없이 머지되었어요.",
            // Pull Shark
                "Pull Shark": "풀 샤크",
                "Bronze unlocked": "브론즈 해금됨",
                "Bronze and Silver unlocked": "브론즈와 실버 해금됨",
                "· First unlocked": "· 최초 해금됨:",
                "2nd pull request merged": "2번째 끌어오기 요청 병합함",
                "16th pull request merged": "16번째 끌어오기 요청 병합함",
                "128th pull request merged": "128번째 끌어오기 요청 병합함",
                "1024th pull request merged": "1024번째 끌어오기 요청 병합함",
            // Starstruck
                "Starstruck": "별에 매료됨",
                "⭐️ 16 stars": "⭐️ 별표 16개",
                "⭐️ 128 stars": "⭐️ 별표 128개",
                "⭐️ 512 stars": "⭐️ 별표 512개",
                "⭐️ 4096 stars": "⭐️ 별표 4096개",
            // Pair Extraordinaire
                "Pair Extraordinaire": "뛰어난 페어",
                "Unlocked": "해금됨:",
                "Coauthored with": "함께 작성:",
                "Coauthored with an unknown user": "알 수 없는 사용자와 함께 작성함",
            // Quickdraw
                "Quickdraw": "빠른 클로즈",
                "Gitty up!": "빨리 시작해보세요!",
                "Closed within 5 minutes of opening": "오픈한 후 5분 이내에 닫았어요.",
            // Galaxy Brain
                "Galaxy Brain": "갤럭시 브레인",
                "2nd accepted answer": "2번째 채택된 답변",
                "8th accepted answer": "8번째 채택된 답변",
                "16th accepted answer": "16번째 채택된 답변",
                "32nd accepted answer": "32번째 채택된 답변",
            // Public Sponsor
                "Public Sponsor": "공개 후원자",
                "1st sponsorship": "첫 번째 후원",
            // Mars 2020 Contributor
                "Mars 2020 Contributor": "Mars 2020 기여자",
                "Mars 2020 Helicopter Mission": "2020 화성 무인 헬리콥터 미션",
                "this repository was included": "이 저장소가 포함되었어요.",
    
            // ?tab=업적
                "Hide from profile": "프로필에서 숨기기",
                "Hidden from your profile.": "프로필에서 숨겨졌어요.",
                "Show on profile": "프로필에 표시하기",
                "Copy share link": "공유 링크 복사하기",
                "Preview on Twitter": "Twitter에서 미리보기",
                "New": "새",
                
                // 상단 알림
                    // [/The (.+) achievement will now be hidden from your profile./, "이제 프로필에서 “$1” 업적이 숨겨졌어요."],
                    // [/The (.+) achievement will now be shown in your profile./, "이제 프로필에 “$1” 업적이 표시되었어요."],
    
            "Send feedback": "피드백 보내기",
    
        // 사용자 차단 및 신고 대화창
            // [/Block or report ([^ ]+)/, "차단 또는 신고 $1"],
            "Block user": "사용자 차단하기",
            "Prevent this user from interacting with your repositories and sending you notifications. Learn more about": "이 사용자가 사용자님의 저장소와 상호작용하거나 알림을 보내지 못하게 할 수 있어요. 자세한 내용은",
            "blocking users": "사용자 차단",
            
            "Add an optional note:": "선택적 메모 추가:",
                "Please don't include any personal information such as legal names or email addresses. Maximum 100 characters, markdown supported. This note will be visible to only you.": "법적 이름이나 이메일 주소와 같은 개인 정보를 포함하지 마세요. 최대 100자까지 입력할 수 있고, 마크다운을 지원해요. 이 메모는 본인만 볼 수 있어요.",
            
            "Unblock user": "차단 해제하기",
            "Allow this user to interact with your repositories and send you notifications. Learn more about": "이 사용자가 사용자님의 저장소와 상호작용하고 알림을 보낼 수 있도록 허용할 수 있어요. 자세한 내용은",
            
            "Report abuse": "남용 신고",
                "Contact GitHub support about this user’s behavior. Learn more about": "이 사용자의 행동에 대해 GitHub 지원팀에 연락할 수 있어요. 자세한 내용은",
                "reporting abuse": "남용 신고",
    
        // 저장소
            "Forked from": "포크됨:",
            "Updated": "업데이트됨:",
    
        // 라이선스
                "GNU General Public License v3.0": "GNU 일반 공중 라이선스 v3.0",
                "GPL-3.0 License": "GPL-3.0 라이선스",
                "AGPL-3.0 License": "AGPL-3.0 라이선스",
                "LGPL-3.0 License": "LGPL-3.0 라이선스",
                "MIT License": "MIT 라이선스",
                "Apache License 2.0": "Apache 라이선스 2.0",
                "OFL-1.1 License": "OFL-1.1 라이선스",
                "0BSD License": "0BSD 라이선스",
                "BSD-3-Clause License": "BSD-3-Clause 라이선스",
                "BSD 3-Clause \"New\" or \"Revised\" License": "BSD-3-Clause 라이선스",
                "CC0-1.0 License": "CC0-1.0 라이선스",
                "WTFPL License": "WTFPL 라이선스",
                "Other": "기타",
                "Unknown": "알 수 없음",
    
        // 标签栏
            "Sponsoring": "후원"
    },
    "regexp": [ // 正则翻译
        [/(\d+) discussions? answered/, "$1 个讨论已回答"], // 高光时刻
        [/Block or report ([^ ]+)/, "拉黑或举报 $1"],
        [/contributed code to several repositories in the/, "为多个仓库贡献了代码，在"],
        [/(\d+) GitHub Archive Program/, "$1 GitHub 存档计划"], // 成就浮动款
        [/opened pull requests that have been merged./, "打开的拉取请求已被合并。"], // Pull Shark
        [/created a repository that has many stars./, "创建了一个拥有很多星标的仓库。"], // Starstruck
        [/coauthored commits on merged pull requests./, "与他人共同提交了合并的拉取请求。"], // Pair Extraordinaire
        [/answered discussions./, "回答了讨论。"], // Galaxy Brain
        [/is sponsoring (\d+) organizations? or users?./, "赞助了 $1 个组织或用户。"], // Public Sponsor
        [/contributed code to (\d+) repositor(y|ies) used in the/, "贡献于 $1 个仓库收录于"], // Mars 2020 Helicopter Mission.
        [/The (.+) achievement will now be hidden from your profile./, "现在，将从您的个人资料中隐藏 “$1” 成就。"],
        [/The (.+) achievement will now be shown in your profile./, "现在，将在您的个人资料中显示 “$1” 成就。"],
        [/(\d+) repositor(y|ies)/, "$1 仓库"],
        [/(\d+) members?/, "$1 成员"],
        [/and (\d+) more/, "等 $1 人"],
        [/- (\d+)h (ahead|behind)/, function(all, num, compare){
            var compareKey = {ahead: '早', behind: '晚'};

            return '- ' + compareKey[compare] + num + '小时';
        }],
    ],
};
I18N["ko-KR"]["page-profile/achievements"] = I18N["ko-KR"]["page-profile-public"]; // ?tab=achievements
I18N["ko-KR"]["page-profile/followers"] = I18N["ko-KR"]["page-profile-public"]; // ?tab=followers
I18N["ko-KR"]["page-profile/following"] = I18N["ko-KR"]["page-profile-public"]; // ?tab=following

I18N["ko-KR"]["page-profile"] = { // 个人首页
    "static": { // 静态翻译
        ...I18N["ko-KR"]["page-profile-public"]["static"],

            // 概述标签卡 即主页 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "Customize your pins": "고정 항목 맞춤 설정하기",
        
            // 고정 항목 설정 대화상자
            "Edit pinned items": "고정 항목 설정하기",
            "Select up to six public repositories or gists you'd like to show to anyone.": "최대 6개의 공개 저장소 또는 gists를 선택해 누구에게나 보여줄 수 있어요.",
            "Select up to six public repositories you'd like to show.": "최대 6개의 공개 저장소를 선택해 보여줄 수 있어요.", // 조직 페이지
            "Filter repositories and gists": "저장소 및 gists 필터링하기",
            "Repositories": "저장소",
            "Gists": "gists",
            "Filter repositories": "저장소 필터링하기", // 조직 페이지 
            "Show:": "표시:",
            "Save pins": "고정 항목 저장하기",
        
            "Drag to reorder": "끌어서 순서 변경하기",
        
            // 상단 알림
            "You unlocked new Achievements with private contributions! Show them off by including private contributions in your Profile in": 
            "비공개 기여를 통해 새로운 업적을 잠금 해제했어요! 프로필에 비공개 기여를 포함해 자랑해보세요.",
            
            "You unlocked new Achievements! Show them off by including achievements and private contributions in your Profile in": 
            "새로운 업적을 잠금 해제했어요! 프로필에 업적과 비공개 기여를 포함해 자랑해보세요.",
            
            "Your pins have been updated. Drag and drop to reorder them.": "고정 항목이 업데이트되었어요. 끌어서 순서를 변경해보세요.",
            
            "Your popular repositories will now be shown instead of your pins.": "이제 고정 항목 대신 인기 있는 저장소가 표시돼요.",
        
            "Only you can see your full profile.": "전체 프로필은 본인만 볼 수 있어요.",
            "You have marked your profile as private, which limits what activity other people can see.": "프로필을 비공개로 설정했어요. 다른 사람들이 볼 수 있는 활동이 제한돼요.",
            "Update profile settings": "프로필 설정 업데이트하기",
            
            "View what others see": "다른 사람이 보는 화면 보기",
            "View full profile": "전체 프로필 보기",
        
            "Your pins have been updated.": "고정 항목이 업데이트되었어요.",
        
            // 드래그 정렬 알림
            "Order updated.": "순서가 업데이트되었어요.",
        
            "Pinned": "고정됨",
            "Top repositories": "고정된 저장소",
            "Popular repositories": "인기 있는 저장소",
        
            "Learn how we count contributions": "기여도를 계산하는 방법 알아보기",
            "Less": "적음",
            "More": "많음",
            "Contribution settings": "기여 설정",

            // 复刻仓库特有
            "Forked from": "포크됨 :",
            // 기여 설정 드롭다운 메뉴
            "Private contributions": "비공개 기여",
            "Turning on private contributions will show anonymized private activity on your profile.": "비공개 기여를 활성화하면, 프로필에 익명 처리된 비공개 활동이 표시돼요.",
            "Visitors will now see your public and anonymized private contributions.": "방문자들이 이제 프로필에서 공개 기여와 익명 처리된 비공개 기여를 볼 수 있어요.",
            "Turning off private contributions will show only public activity on your profile.": "비공개 기여를 끄면, 프로필에 공개 활동만 표시돼요.",
            "Visitors will now see only your public contributions.": "방문자들이 이제 프로필에서 공개 기여만 볼 수 있어요.",
            "Activity overview": "활동 개요",
            "Turning off the activity overview will hide the section on your profile.": "활동 개요를 끄면, 프로필의 해당 섹션이 숨겨져요.",
            "The 'Activity overview' section will no longer appear on your profile.": "이제 프로필에 '활동 개요' 섹션이 더 이상 나타나지 않아요.",
            "Turning on the activity overview will show an overview of your activity across organizations and repositories.": "활동 개요를 켜면, 조직과 저장소에 걸친 활동 개요가 표시돼요.",
            "Others will now see 'Activity overview' when they view your profile.": "다른 사람들이 이제 프로필을 볼 때 '활동 개요'를 확인할 수 있어요.",

            "Contribution activity": "기여 활동",
                "Year:": "연도:", // 작은 화면 모드

            "Search by name": "조직명 검색하기",
            "Contributed to": "기여함",
            "Activity in": "활동한:",
            "No activity overview available.": "활동 개요를 볼 수 없어요.",

            "open": "열림",
            "closed": "닫힘",
            "merged": "병합됨",
            "pull request": "끌어오기 요청",

            "commits": "커밋",
            "comments": "댓글",
            "Commits": "커밋",
            "Code review": "코드 리뷰",
            "Built by": "빌드한 사람",

            "Created their first repository": "첫 번째 저장소를 만들었어요.",
            "Created an issue in": "다음에서 이슈를 만들었어요:",
            "a private repository": "비공개 저장소",
            "Created a pull request in": "다음에서 끌어오기 요청을 만들었어요:",
                "lines changed": "변경된 줄",
            "First repository": "첫 번째 저장소",
            "First pull request": "첫 번째 끌어오기 요청",
            "First issue": "첫 번째 이슈",
            "Opened their first issue on GitHub in": "GitHub에서 첫 번째 이슈를 열었어요:",
            "Opened their first pull request on GitHub in": "GitHub에서 첫 번째 끌어오기 요청을 열었어요:",
            "Opened their first pull request on GitHub in a private repository": "비공개 저장소에서 GitHub 첫 번째 끌어오기 요청을 열었어요.",
            "Joined GitHub": "GitHub에 가입했어요.",
            "Joined the": "가입했어요 :",
            "organization": "조직",
            //"Show more activity": "더 많은 활동 보기",
            "Show more activity": "더 많은 활동 불러오기",
            "Loading...": "불러오는 중...",

            "Seeing something unexpected? Take a look at the": "예상치 못한 것이 보이시나요? 한 번 살펴보세요 :",
            "GitHub profile guide": "GitHub 프로필 안내",

    },
    "regexp": [ // 정규식 번역
        [/(\d+) discussions? answered/, "$1개의 토론이 답변되었어요."], // 하이라이트 순간
        [/Block or report ([^ ]+)/, "차단 또는 신고하기 $1"],
        [/(\d+) GitHub Archive Program/, "$1 GitHub 아카이브 프로그램"], // 업적 플로팅 항목
        [/(\d+) remaining/, "$1 남았어요"], // 상단 고정 항목 남음
        [/([^ ]+) doesn('|’)t have any public repositories yet./, "$1 아직 공개 저장소가 없어요."],
        [/([\d,]+) contributions? in the last year/, "지난 1년 동안 $1회 기여했어요."],
        [/([\d,]+) contributions? in (\d+) in ([^ ]+)/, "$2년에 $3에 $1회 기여했어요."],
        [/([\d,]+) contributions? in (\d+)/, "$2년에 $1회 기여했어요."],
        [/(\d+) contributions? in private repositor(y|ies)/, "비공개 저장소에서 $1회 기여했어요."],
        [/(\d+|No) contribution(?:s)? on (.+)(?:st|nd|rd|th)./, (match, number, p1) => {
            const dateRegExp = I18N["ko-KR"]["public"]["time-regexp"];
            const translatedDate = dateRegExp.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), p1);
            //return optKey[opt] + `${translatedDate}`;
            return number === 'No' ? `${translatedDate}，기여 없어요` : `${translatedDate}，` + number + `회 기여했어요`;
        }], // 기여 달력
        //[/A graph representing ([^ ]+)'s contributions from ( .+) to ( .+)./, "$1 从 $2 到 $3 的贡献图。"],
        [/and (\d+) other repositor(y|ies)/, "와 $1개의 다른 저장소"], // 활동 개요
        // 기여 정보
        [/Created ([\d,]+) commits? in (\d+) repositor(y|ies)/, "$2개의 저장소에서 $1회 커밋을 만들었어요."],
        [/Created (\d+) (other)? repositor(y|ies)/, "$1개의 저장소를 만들었어요."],
        [/Opened (\d+) pull requests? in (\d+) repositor(y|ies)/, "$2개의 저장소에서 $1개의 끌어오기 요청을 열었어요."],
        [/Opened (\d+) other pull requests? in (\d+) repositor(y|ies)/, "$2개의 다른 저장소에서 $1개의 끌어오기 요청을 열었어요."],
        [/Opened (\d+) issues? in (\d+) repositor(y|ies)/, "$2개의 저장소에서 $1개의 이슈를 열었어요."],
        [/Opened (\d+) other issues? in (\d+) repositor(y|ies)/, "$2개의 다른 저장소에서 $1개의 다른 이슈를 열었어요."],
        [/Reviewed (\d+) pull requests? in (\d+) repositor(y|ies)/, "$2개의 저장소에서 $1개의 끌어오기 요청을 검토했어요."],
        [/Answered (\d+) discussions? in (\d+) repositor(y|ies)/, "$2개의 저장소에서 $1개의 토론에 답변했어요."],
        [/Started (\d+) discussions? in (\d+) repositor(y|ies)/, "$2개의 저장소에서 $1개의 토론을 시작했어요."],
        [/(\d+) commits?/, "$1회 커밋"],
        [/(\d+) pull requests?/, "$1회 끌어오기 요청"],
        [/that received (\d+) comments?/  , "받은 $1개의 댓글"],
        [/(\d+) of (\d+) tasks?/, "$1 / $2 개의 작업"],
        [/(\d+) comments?/, "$1개의 댓글"],
        [/(\d+) tasks? done/, "$1개의 작업이 완료되었어요."],
        [/([^ ]+) doesn't have any projects yet./, "$1은 아직 어떤 프로젝트도 없어요."],
        [/([^ ]+) has no activity yet for this period./, "$1은 아직 이 기간에 활동이 없어요."],
        [/([^ ]+) had no activity during this period./, "$1은 이 기간 동안 활동이 없었어요."],
        [/Contribution activity in ([^ ]+)/, "$1에서의 기여 활동"],
        [/([^ ]+) had no activity in ([^ ]+) during this period./, "$1은 이 기간 동안 $2에서 활동이 없었어요."],
        [/([^ ]+) has no activity in ([^ ]+) yet for this period./, "$1은 아직 이 기간에 $2에서 활동이 없어요."],
        [/@([^ ]+)'s activity is private/, "$1의 활동은 비공개에요."],
        [/Created (\d+\+?) repositor(y|ies)/, "$1개의 저장소를 만들었어요."],
        [/(\d+) repositor(y|ies)/, "$1개의 저장소"],
        [/(\d+) members?/, "$1명의 멤버"], // 조직 플로팅 정보 카드
        [/(\d+) tasks?/, "$1개의 작업"], // 작업 포함 이슈
        [/and (\d+) more/, "외 $1명"],
        [/- (\d+)h (ahead|behind)/, function(all, num, compare){
            var compareKey = {ahead: '앞', behind: '뒤'};

            return '- ' + compareKey[compare] + num + '시간';
        }],
        //[/A graph representing ([^ ]+)'s contributions from (.+) to (.+). The contributions are (\d+\%) (commits|pull requests|issues|code review), (\d+\%) (commits|pull requests|issues|code review), (\d+\%) (commits|pull requests|issues|code review), (\d+\%) (commits|pull requests|issues|code review)./, function(all, user, date1, date2, cd1, c1, cd2, c2, cd3, c3, cd4, c4){
        //    var c1Key, c2Key, c3Key, c4Key = {
        //        'commits': '커밋',
        //        'pull requests': '끌어오기 요청',
        //        'code review': '코드 리뷰',
        //        'issues': '이슈',
        //    };
        //    return user + '의 ' + date1 + '부터 ' + date2 + '까지의 기여 그래프에요. 그 중 ' + cd1 + c1Key[c1] + ', ' + cd2 + c2Key[c2] + ', ' + cd3 + c3Key[c3] + ', ' + cd4 + c4Key[c4] + '에요.';
        //}],
        // 업적
        [/answered discussions./, "토론에 답변했어요."], // 갤럭시 브레인
        [/opened pull requests that have been merged./, "열린 끌어오기 요청이 병합되었어요."], // 풀 샤크
        [/created a repository that has many stars./, "별표가 많은 저장소를 만들었어요."], // 스타스트럭
        [/coauthored commits on merged pull requests./, "병합된 끌어오기 요청에서 다른 사람과 함께 커밋했어요."], // 페어 엑스트라오디네어
    ],
};
I18N["ko-KR"]["page-profile/overview"] = I18N["ko-KR"]["page-profile"];

I18N["ko-KR"]["page-profile/repositories"] = { // 个人首页 - 仓库标签卡
    "static": { // 静态翻译
        ...I18N["ko-KR"]["page-profile-public"]["static"],

        // 仓库标签卡 ?tab=repositories >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            // 顶部提醒
                // [/Your repository \"([^ ]+)\" was successfully deleted./, "您的仓库 “$1” 已成功删除。"],

            // "Search repositories…": "搜索这些查库…",
            // "Search starred repositories…": "搜索点赞的仓库…",

            // 搜索, 筛选 & 排序工具栏
            "Find a repository…": "저장소 찾기…",
            // "Type": "유형", // 与全局冲突 使用 Selector 规则翻译
                // 下拉菜单
                "Select type": "유형 선택",
                "All": "모두",
                "Public": "공개",
                "Private": "비공개",
                "Sources": "소스",
                "Forks": "포크",
                "Archived": "보관됨",
                "Can be sponsored": "후원 가능",
                "Mirrors": "미러",
                "Templates": "템플릿",
            "Language": "언어",
                // 下拉菜单
                "Select language": "언어를 선택해주세요",
                "All languages": "모든 언어",
            "Sort": "정렬",
                // 下拉菜单
                "Select order": "기준을 선택해주세요",
                "Last updated": "최근 업데이트",
                // "Name": "仓库名",
                // "Recently starred": "最近星标",
                // "Recently active": "最近活跃",
                // "Most stars": "最多星标",
                // "Unstar": "取消星标",
            "New": "새로 만들기",

            // 筛选结果
            "result for": "개의 검색 결과 |",
            "results for": "개의 검색 결과 |",
                "public": "공개",
                "private": "비공개",
                "source": "소스",
                "forked": "포크",
                "archived": "보관",
                "sponsorable": "후원 가능",
                "mirror": "미러",
                "template": "템플릿",
            "repositories matching": "저장소, ",
            "result for repositories matching": "개의 검색 결과 |",
            "results for repositories matching": "개의 검색 결과 |",
            "repositories sorted by": "저장소, ",
            "written in": ", ",
            "repositories written in": "저장소, ",
            "results for repositories written in": "개의 검색 결과 | ",
            "star matching": "개의 검색 결과 |", //?tab=stars
            "stars matching": "개의 검색 결과 |", //?tab=stars
            "star written in": "개의 검색 결과 |", //?tab=stars
            "stars written in": "개의 검색 결과 |", //?tab=stars
            "sorted by": ", ",
                "last updated": "최근 업데이트순 정렬",
                "name": "이름순 정렬",
                "stars": "별표순 정렬",

            "Clear filter": "필터 초기화",

            // [/([^ ]+) doesn’t have any repositories that match./, "$1 没有任何匹配的仓库"],
            "This organization doesn’t have any repositories that match.": "이 조직에는 일치하는 저장소가 없어요.", // 조직 저장소

            "This organization has no public repositories.": "이 조직에는 공개 저장소가 없어요.", //조직 저장소

            "No repositories matched your search.": "검색하신 내용과 일치하는 저장소가 없어요.", // 일치하는 저장소 없음

            // 项目 状态词
            "on": "",
            "Updated": "업데이트 됨",
            "Forked from": "포크 됨",

            // 曲线图提示
            "Past year of activity": "지난 1년간의 활동",

        // 새 버전 조직 - 저장소 개요 https://github.com/orgs/<orgs-name>/repositories
            "Filter": "필터",
                "Advanced filters": "고급 필터",
                    "Build complex filter queries": "복잡한 필터 쿼리를 구성해보세요.",
                        "To start building your query add your first filter using the button below.": "쿼리 작성을 시작하려면, 아래 버튼을 사용하여 첫 번째 필터를 추가해보세요.",
                    "Add a filter": "필터 추가하기",
                    "Apply": "반영하기",
                    "Qualifier": "한정어",
                        "Created": "생성됨",
                        "Total forks": "포크 총수",
                        "Total good-first issues": "총 good-first 이슈 수",
                        "Has": "파일 포함",
                        "Total help-wanted issues": "총 help-wanted 이슈 수",
                        "License": "라이센스",
                        "Mirror": "미러",
                        "Size (Kb)": "크기 (Kb)",
                        "Sponsorable": "후원 가능",
                        "Text": "텍스트",
                        "Total topics": "총 토픽 수",
                        "Total stars": "별표 총수",
                        "Template": "템플릿",
                        "Topic": "토픽",
                        "Visibility": "가시성",
                    "Operator": "연산자",
                        "is": "같음",
                        "is not": "같지 않음",
                        "before": "이전",
                        "after": "이후",
                        "between": "사이",
                            "From": "부터",
                            "To": "까지",
                        "is one of": "포함",
                        "is not one of": "포함하지 않음",
                        "greater than": "보다 큼",
                        "less than": "보다 작음",
                        "greater than or equal to": "보다 크거나 같음",
                        "less than or equal to": "보다 작거나 같음",
                        "equal to": "같음",
                    "Value": "값",
                        "Enter a number": "숫자를 입력해보세요.",
                        "Enter search text": "검색 텍스트를 입력해보세요.",
                        "Make a selection": "선택해보세요.",
                            "Select items": "항목 선택하기",
                            "Select an item": "항목 선택하기",
                                "Filter values": "필터 값",
                                    // 포크
                                        "Only forks": "포크만",
                                        "Exclude forks": "포크 제외",
                                    // 정렬
                                        "Recently pushed": "최근 푸시",
                                        "Topics": "토픽",
                                        "Size": "크기",
                                        "Recently pushed (descending)": "최근 푸시 (내림차순)",
                                        "Name (descending)": "이름 (내림차순)",
                                        "Language (descending)": "언어 (내림차순)",
                                        "License (descending)": "라이센스 (내림차순)",
                                        "Topics (ascending)": "토픽 (오름차순)",
                                        "Size (ascending)": "크기 (내림차순)",
                                        "Total stars (ascending)": "별표 총수 (내림차순)",
                                        "Total forks (ascending)": "포크 총수 (내림차순)",
                                        "Help-wanted issues (ascending)": "총 help-wanted 이슈 수 (오름차순)",
                                        "Help-wanted issues (descending)": "총 help-wanted 이슈 수 (내림차순)",
                                    // 가시성
                                        "Internal": "내부",
                "Discard changes?": "변경 사항을 취소할까요?",
                    "You have unsaved changes. Are you sure you want to discard them?": "저장되지 않은 변경 사항이 있어요. 정말로 취소하시겠어요?",
                    "Keep editing": "계속 편집하기",
                    "Close and discard": "닫고 취소하기",
            "Search repositories": "저장소 검색하기",
                "No repositories matched your search": "검색 결과와 일치하는 저장소가 없어요.",
                    "Try a different search query": "다른 검색어를 사용해보세요.",

            "Last pushed": "최근 푸시",
                "Ascending": "오름차순",
                "Descending": "내림차순",
            "repository": "저장소",
            "No language": "언어 없음",

    },
    "regexp": [ // 정규 표현식 번역
        [/(\d+(k|M|B)?) repositor(y|ies)/, "$1 개 저장소"],
        [/(\d+) members?/, "$1 명 멤버"], // 조직 플로팅 정보 카드
        [/([^ ]+) doesn’t have any repositories that match./, "$1 일치하는 저장소가 없어요."], // 저장소 태그 카드
        [/Your repository \"([^ ]+)\" was successfully deleted./, "사용자님의 저장소 “$1”가 성공적으로 삭제되었어요."],
        [/(\d+) issues? needs? help/, "$1 개 이슈가 도움이 필요해요."],
        [/and (\d+) more/, "등 $1 명"],
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
    "selector": [ // 元素筛选器规则
        ["#type-options > summary > span:nth-child(1)", "유형"], // 个人主页 --> 仓库标签页-->类型筛选器 Type
    ],
};

I18N["ko-KR"]["page-profile/projects"] = { // 个人首页- 项目标签卡
    "static": { // 静态翻译
        ...I18N["ko-KR"]["page-profile-public"]["static"],

        // 项目标签卡 ?tab=projects >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "There aren't any projects yet": "아직 아무 프로젝트도 없네요",
            "Provide quick access to relevant projects.": "관련된 프로젝트에 대한 빠른 접근을 제공해요.",
            "Add projects to view them here.": "프로젝트를 추가해보세요.",

            "Welcome to the all-new projects": "완전 새로운 프로젝트에 오신 걸 환영해요!",
            "Built like a spreadsheet, project tables give you a live canvas to filter, sort, and group issues and pull requests. Tailor them to your needs with custom fields and saved views.":
            "스프레드시트처럼 생긴 프로젝트 테이블은 이슈와 끌어오기 요청을 필터링, 정렬, 그룹화할 수 있는 라이브 캔버스를 제공해요. 사용자 정의 필드와 저장된 보기를 사용하여 필요에 맞게 조정해보세요.",

            "Learn more about projects": "프로젝트에 대해 더 알아보기", // ?tab=projects

            "Create your first GitHub project": "첫 번째 GitHub 프로젝트 만들기",
            "Projects are a customizable, flexible tool for planning and tracking your work.": "프로젝트는 작업을 계획하고 쌓아가기 위한 유연한 사용자 정의 도구에요.",

            "Sort": "정렬 방식",
                // 排序下拉菜单
                "Newest": "최신순",
                "Oldest": "오래된순",
                "Recently updated": "최근 업데이트순",
                "Least recently updated": "업데이트된 지 오래된순",
            // 清除筛选
            "Clear current search query and sorts": "검색 초기화",

            "Plan and track work across repositories with custom fields and multiple views": "사용자 정의 필드와 다중 보기를 사용하여 저장소 전체에서 작업을 계획하고 추적해요.",
            "Kanban-style project board": "Kanban 스타일 프로젝트 보드",

            "You don't have any projects yet.": "아직 아무 프로젝트도 없어요.",
            "There are no projects matching your search.": "검색 결과에 맞는 프로젝트가 없어요.",
            "Learn More": "더 알아보기",

            "No description": "설명이 없어요",
            "Close": "닫기",
            "Closed": "닫힘",
            "Reopen": "다시 열기",

            // 顶部提醒
            "Project closed.": "프로젝트를 닫았어요.",
            "Project reopened.": "프로젝트를 다시 열었어요.",

            // 组织
            "Created by me": "사용자님이 만들었어요",
            "Create your first GitHub project template": "첫 번째 GitHub 프로젝트 템플릿 만들기",
            "Templates can be used to quickly get started with a new project.": "템플릿은 새로운 프로젝트를 재빨리 만들 수 있게 해줘요.",
            "New template": "새 템플릿",

        // https://github.com/users/<user-name>/projects/<id>
            "New view": "새 보기",
            "Layout": "레이아웃",
            "Board": "보드",
            "Roadmap": "로드맵",
            "Duplicate view": "중복 보기",
            "Configuration": "구성",
            "Group by": "그룹화 :",
            "No grouping": "없음",
            "Markers": "마커",
            "Sort by": "정렬 방식 :",
            "No sorting": "없음",
            "Zoom level": "확대 정도",
            "Field sum": "필드 합계",
            "Slice by": "자르기 :",
            "No slicing": "없음",
            "Fields": "필드 단위",
            "Generate chart": "차트 생성하기",
            "Rename view": "보기 이름 변경",
            "Delete view": "보기 삭제",
            "Export view data": "보기 데이터 내보내기",
            "Assignees": "할당 담당자",
            "Project templates": "프로젝트 템플릿",
            "Featured": "추천",
            "Iteration": "반복",
            "Dates": "날짜",
            "User settings": "사용자 세팅",
            "Truncate titles": "쀐 자르기인지 생략하기인지 모르겟다",
            "Show date fields": "날짜 필드 보이기",
            "Add status update": "상태 업데이트 추가",
            "Project details": "프로젝트 세부정보",
            "View more options": "더 많은 옵션 표시",
            "Date fields": "날짜 필드",
            "Month": "월",
            "Quarter": "분기",
            "Year": "년",
            "Today": "오늘",
            "Add item": "항목 추가",
            "Start typing to create a draft, or type # to select a repository": "초안을 만들려면 입력을 시작하고 저장소를 선택하려면 #을 입력해요.",
            "Scroll to previous date range": "이전 기간으로 가기",
            "Scroll to next date range": "다음 기간으로 가기",
            "Filter by keyword or by field": "키워드 또는 필드별로 필터링",
            "Discard": "Discord",
            "Save changes to new view": "새 보기의 변경사항 저장",
            "Visible fields": "보이는 필드",
            "Hidden fields": "숨겨진 필드",
            "New field": "새 필트",
            "Column by": "열 :",
            "Workflows": "워크플로",
            "Archived items": "보관된 항목",
            "Make a copy": "복제하기",
            "GitHub Projects": "GitHub 프로젝트",
            "What’s new": "새로운 기능",
            "Project settings": "프로젝트 설정",
            "Project name": "프로젝트 이름",
            "Short description": "짧은 설명",
            "More options": "더 많은 옵션",
            "Make a copy of this project.": "이 프로젝트의 복제본을 만들어요.",
            "Danger zone": "취급 주의",
            "This project is currently private.": "이 프로젝트는 현재 비공개에요.",
            "Closing a project will disable its workflows & remove it from the list of open projects.": "프로젝트를 닫으면 해당 워크플로가 비활성화되고 열려 있는 프로젝트 목록에서 제거돼요.",
            "Close this project": "이 프로젝트 닫기",
            "Manage access": "엑세스 관리",
            "Who has access": "엑세스 가능한 사람",
            "Private project": "비공개 프로젝트",
            "Only those with access to this project can view it.": "이 프로젝트에 접근할 수 있는 사람만 볼 수 있어요.",
            "Invite collaborators": "협업자 초대",
            "Manage access": "엑세스 관리",
            "Custom fields": "사용자 지정 필드",
            "Field name": "필드 이름",
            "Field type": "필드 형식",
            "Text": "텍스트",
            "Number": "숫자",
            "Date": "날짜",
            "Single select": "쀐",
            "Starts on": "시작 위치 :",
            "Duration": "쀐동안",
            "days": "일",
            "weeks": "주",
            "Save and create": "만들고 저장",
            "You don't have any collaborators yet.": "아직 아무 협업자도 없어요.",
            "Add a collaborator to see them here.": "여기서 만날 협업자를 추가하세요.",
            "Make template": "템플릿 만들기",
            "Copy as template": "템플릿 복사",
            "Visibility": "공개 범위",
            "Close project": "프로젝트 닫기",
            "Delete project": "프로젝트 삭제",
            "Delete this project": "이 프로젝트 삭제",
            "Status chart": "상태 차트",
            "This chart shows the current status for the total number of items in your project.": "이 차트는 프로젝트의 총 항목 수에 대한 현재 상태를 보여줘요.",
            "Default charts": "기본 차트",
            "Custom charts": "사용자 지정 차트",
            "Configure": "구성",
            "Configure chart": "차트 구성",
            "Group by (optional)": "그룹화(선택사항) :",
            "X-axis": "X축",
            "Y-axis": "Y축",
            "Save to new chart": "새 차트에 저장하기",
            "Add a project status update": "프로젝트 상태 업데이트 추가",
            "Add update": "업데이트 추가",
            "Status updates are brief reports tracking your project's health and progress. Begin by adding an update.": "상태 업데이트는 프로젝트의 상태와 진행 상황을 추적하는 간략한 보고서에요. 업데이트를 추가해서 시작해보세요.",
            "Let everyone know what this project is about, how to use it and link to important resources.": "이 프로젝트가 무엇인지, 어떻게 사용하는지, 중요한 리소스에 대한 링크를 모두에게 알리세요.",
            "A short description about this project.": "프로젝트에 대한 짧은 설명을 추가하세요.",
    },
    "regexp": [ // 正则翻译
        [/View (\d+)/, "视图 $1"],
        [/([\d,]+) Open/, "$1 打开"], // 项目标签卡
        [/([\d,]+) Closed/, "$1 已关闭"],
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
};

I18N["ko-KR"]["page-profile/sponsoring"] = { // 个人首页- 赞助标签卡
    "static": { // 静态翻译
        ...I18N["ko-KR"]["page-profile-public"]["static"],
            "has sponsored": "님이 후원함 :",
            "organization or maintainer in the past": "과거의 조직 혹은 유지 관리자",
            "organization or maintainer": "조직 혹은 유지 관리자",
            "Bulk Sponsor": "후원",
            "Sponsor multiple maintainers in one easy transaction.": "하나의 간편한 거래로 여러 유지 관리자를 후원해보세요.",
            "Get started": "시작하기",
            "Past sponsorship": "과거 후원",
            "Sponsored": "후원함 :",

    },
    "regexp": [ // 正则翻译
        [/is sponsoring/, "후원 중 :"],
        [/Sponsoring since/, "이때부터 후원중 :"],
        [/Sponsored/, "후원함 :"],
        [/(\d+) repositor(y|ies)/, "$1개의 저장소"],
        [/(\d+) members?/, "회원 $1명"], // 组织 浮动信息卡
    ],
};

I18N["ko-KR"]["page-profile/packages"] = { // 个人首页 - 软件包标签卡
    "static": { // 静态翻译
        ...I18N["ko-KR"]["page-profile-public"]["static"],

        // 软件包标签卡 ?tab=packages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "Get started with GitHub Packages": "开始使用 GitHub 软件包",
            "Safely publish packages, store your packages alongside your code, and share your packages privately with your team.": "安全地发布包，将您的包与您的代码一起存储，并与您的团队私下共享您的包。",
            "Choose a registry": "选择注册表",
            "A software platform used for building applications based on containers — small and lightweight execution environments.": "用于构建基于容器的应用的软件平台——小型轻量级执行环境。",
            "A default package manager used for the Java programming language and the Java runtime environment.": "用于 Java 编程语言和 Java 运行环境的一个默认包管理器。",
            "A free and open source package manager used for the Microsoft development platforms including .NET.": "一个自由和开源的开源包管理器，用于包括 .NET 在内的 Microsoft 开发平台。",
            "A standard format for distributing Ruby programs and libraries used for the Ruby programming language.": "分发用于 Ruby 编程语言的 Ruby 程序和库的标准格式。",
            "A package manager for JavaScript, included with Node.js. npm makes it easy for developers to share and reuse code.": "npm 是一个 JavaScript 的包管理器，包含在 Node.js 中。它使开发人员能够轻松地分享和重用代码。",
            "Containers": "容器",
            "A single place for your team to manage Docker images and decide who can see and access your images.": "为您的团队提供一个管理 Docker 镜像的单一场所，并决定谁可以看到和访问您的镜像。",

            "Type:": "类型:",
                // 下拉菜单
                "Select type": "选择类型",
                "All": "全部",
            "Search packages…": "搜索软件包…",
            "Visibility:": "可见性:",
                "Select visibility": "选择可见性",
                "Internal": "内部",
            "Sort by:": "排序方式:",
                "Select sort view": "选择排序视图",
                "Most downloads": "最多下载",
                "Least downloads": "最少下载",

            "Clear current search query, filters, and sorts": "清除当前的搜索查询、筛选器和排序方式",
            // 筛选结果
            "No results matched your search.": "没有与您的搜索匹配的结果。",
            "Try": "尝试",
            "browsing all packages": "浏览所有软件包",
            "to find what you're looking for.": "，以找寻您想要的内容。",

            "Published": "发布于",

    },
    "regexp": [ // 正则翻译
        [/(\d+) packages?/, "$1 软件包"],
        [/(\d+) repositor(y|ies)/, "$1 个仓库"],
        [/(\d+) members?/, "$1 成员"], // 组织 浮动信息卡
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
};

I18N["ko-KR"]["page-profile/sponsors"] = { // 个人首页 - 赞助标签卡
    "static": { // 静态翻译
        ...I18N["ko-KR"]["page-profile-public"]["static"],

        // 赞助标签卡 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            // [/is sponsoring/, "正在赞助"],
            "organization or developer:": "个组织或开发者：",
    },
    "regexp": [ // 正则翻译
        [/is sponsoring/, "正在赞助"],
        [/(\d+) repositor(y|ies)/, "$1 个仓库"],
        [/(\d+) members?/, "$1 成员"], // 组织 浮动信息卡
    ],
};

I18N["ko-KR"]["page-profile/stars"] = { // 个人首页 - 星标标签卡
    "static": { // 静态翻译
        ...I18N["ko-KR"]["page-profile-public"]["static"],

        // 星标标签卡 ?tab=stars >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "Show all lists...": "显示所有列表...",

            "Sort by": "排序方式",
            // 排序补充
                "Name ascending (A-Z)": "名称升序 (A-Z)",
                "Name descending (Z-A)": "名称降序 (Z-A)",
                "Newest": "最新",
                "Oldest": "最早",
                "Last updated": "最后更新",

            "Create your first list": "创建您的第一个清单",
            "Lists make it easier to organize and curate repositories that you have starred.": "列表可使您更容易组织和策划您的星标仓库。",
            "Create your first list.": "创建您的第一个清单。",

            // 搜索, 筛选 & 排序工具栏
            "Search stars": "搜索星标",
            "Type: All"    : "类型：全部",
            "Type: Public" : "类型：公共",
            "Type: Private": "类型：私有",
            "Type: Sources": "类型：源码",
            "Type: Forks"  : "类型：复刻",
            "Type: Mirrors": "类型：镜像",
            "Type: Templates": "类型：模板",
                "All"    : "全部",
                "Public" : "공개",
                "Private": "비공개",
                "Sources": "源码",
                "Forks"  : "复刻",
                "Can be sponsored": "可赞助",
                "Mirrors": "镜像",
                "Templates": "模板",
            "Language": "语言",
                // 下拉菜单
                "Select language": "选择语言",
                "All languages": "所有语言",
            "Sort": "排序",
                // 下拉菜单
            "Sort by: Recently starred": "排序：最近星标",
            "Sort by: Recently active": "排序：最近活跃",
            "Sort by: Most stars": "排序：最多星标",
                "Recently starred": "最近星标",
                "Recently active": "最近活跃",
                "Most stars": "最多星标",
                "Languages": "语言",

            // 筛选结果
            "result for": "个结果在",
            "results for": "个结果在",
                "public": "공개",
                "private": "비공개",
                "source": "源码",
                "forked": "复刻",
                "sponsorable": "可赞助",
                "archived": "보관됨",
                "mirror": "镜像",
                "template": "模板",
            "star matching": "개의 검색 결과 |", //?tab=stars
            "stars matching": "개의 검색 결과 |", //?tab=stars
            "star written in": "개의 검색 결과 |", //?tab=stars
            "stars written in": "개의 검색 결과 |", //?tab=stars
            "starred repositories": "星标仓库",
            "starred repositories written in": "星标仓库使用语言",

            "Clear filter": "清除筛选",

            // 项目 状态词
            "Updated": "更新于",
            "Forked from": "复刻自",

            "That’s it. You’ve reached the end of your stars.": "而已。您已经到了星海的尽头。",

            "Topics": "主题",

            "Add to list": "添加到清单",
            "Lists": "清单",
            "You don't have any lists yet.": "您尚无任何清单。",

            // [/(\d+) repositor(y|ies)/, "$1 个仓库"],

            // 他人库 星标页 补充
            "Search starred repositories": "搜索星标仓库",
            "Starred repositories": "星标仓库",
            "Starred topics": "星标主题",
            "See all starred topics": "查看所有星标主题",

            // [/That’s it. You’ve reached the end of ([^ ]+)’s stars./, "而已。您已经到了$1 星海的尽头。"], // 他人星标页 搜索结果

        // https://github.com/stars/<user-name>/lists/<清单>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "Edit list": "编辑清单",
                "Delete list": "删除清单",
                    "Are you sure you want to delete this list?": "您确定要删除此清单吗？",
                        // 顶部提醒
                        // [/Deleted \"(.*)\"./, "已删除 “$1”。], // 删除星标清单
                "Save list": "保存清单",
                "Saving...": "保存中...",
            "Add repositories to this list": "添加仓库到此清单",
            "Star repositories on GitHub to keep track of your favorite projects and inspirational code.": "GitHub上的星标仓库可以跟踪您最喜欢的项目和鼓舞人心的代码。",
            "Explore repositories.": "探索仓库。",
    },
    "regexp": [ // 正则翻译
        [/Deleted \"(.*)\"./, "已删除 “$1”。"], // 删除星标清单 顶部提醒
        [/doesn’t have any starred repositories yet./, "尚无任何星标仓库。"],
        [/That’s it. You’ve reached the end of ([^ ]+)’s stars./, "而已。您已经到了$1 星海的尽头。"], // 他人星标页 搜索结果
        [/(\d+) repositor(y|ies)/, "$1 个仓库"],
        [/(\d+) members?/, "$1 成员"], // 组织 浮动信息卡
        [/Language: /, "语言："],
    ],
};

I18N["ko-KR"]["confirm-access"] = { // “授权访问” 对话框
    "static": { // 静态翻译
        // 授权访问 sudo 模式身份验证
            "Confirm access": "접근 확인",
            "Signed in as": "登录身份为",
            "Authentication code": "验证码",
                "More information about sudo mode authentication": "更多关于 sudo 模式身份验证的信息",
            "Open your two-factor authenticator (TOTP) app or browser extension to view your authentication code.": "打开您的双因素身份验证器 (TOTP) 应用或浏览器扩展以查看您的身份验证码。",
            "Verify": "验证",
            "Verify": "验证",
            "Verifying…": "验证中…",
            "Your authentication code has been sent.": "您的验证码已发送。",

            "Having problems?": "有问题吗？",
            "Use GitHub Mobile": "使用 GitHub Mobile",
            "Use your passkey": "使用您的通行密钥",
            "Use your authenticator app": "使用您的身份验证器应用",
            "Use your password": "使用您的密码",

            "GitHub Mobile": "GitHub Mobile",
            "Creating a verification request for your GitHub Mobile app.": "为您的 GitHub Mobile 应用创建验证请求。",
            "We sent you a verification request on your GitHub Mobile app. Enter the digits shown below to enter sudo mode.": "我们向您的 GitHub Mobile 应用发送了一个验证请求。输入下面显示的数字以进入 sudo 模式。",
            "We could not verify your identity": "我们无法核实您的身份",
            "Retry": "请重试",

            "Password": "비밀번호",
            "Forgot password?": "忘记密码？",
            "Confirm": "确认",

            "Passkey": "通行密钥",
            "When you are ready, authenticate using the button below.": "准备好后，请使用下面的按钮进行身份验证。",
            "This browser or device does not fully support passkeys.": "此浏览器或设备不完全支持通行密钥。",
            "Use passkey": "使用通行密钥",

            "Authentication failed.": "认证失败。",
            "Retry passkey": "重试通行密钥",

            "Unable to verify with your passkey?": "无法验证您的通行密钥？",
    },
};

I18N["ko-KR"]["settings-menu"] = { // 设置 - 公共部分
    "static": { // 静态翻译
        "Settings": "설정", // 新版全局导航

        "Your personal account": "내 계정이에요",
        "Switch settings context": "주체 전환", // 存在组织时
        "Go to your personal profile": "내 프로필로 이동하기",
        // 左侧菜单
        "Public profile": "공개 프로필",
        "Account": "계정",
        "Appearance": "모양",
        "Accessibility": "접근성",
        "Notifications": "알림",

        "Access": "엑세스",
        "Billing and plans": "구매",
            "Plans and usage": "플랜 및 사용량",
            "Spending limits": "결제 한도",
            "Payment information": "결제 정보",
        "Emails": "이메일",
        "Password and authentication": "비밀번호 및 인증",
        "Sessions": "세션",
        "SSH and GPG keys": "SSH 및 GPG 키",
        "Organizations": "조직",
        "Enterprises": "기업",
        "Moderation": "관리",
            "Blocked users": "차단한 사람",
            "Interaction limits": "상호 작용 제한",
            "Code review limits": "코드 검토 제한", 

        "Code, planning, and automation": "코드 안정성 및 분석",
        // "Repository": "저장소"
        "Packages": "패키지",
        "Copilot": "Copilot",
        "Pages": "페이지",
        "Saved replies": "빠른 답장",

        // "Security": "보안",
        "Code security": "코드 보안",
        "Code security and analysis": "코드 보안 및 분석",

        "Integrations": "통합",
        "Applications": "앱",
        "Scheduled reminders": "예약된 알림",

        "Archives": "보관됨",
        "Security log": "보안 로그",
        "Sponsorship log": "후원 로그",

        "Developer settings": "개발자 설정",

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
};

I18N["ko-KR"]["orgs-settings-menu"] = { // 组织设置 公共部分
    "static": { // 静态翻译
        ...I18N["ko-KR"]["orgs-public"]["static"],

        // 公用部分
            "Organization": "조직",
            "Switch settings context": "주체 변환", // 存在组织时
            "Go to your organization profile": "조직 프로필로 이동하기",
            // 左侧菜单
            "General": "일반",
            "Access": "엑세스",
            "Billing and plans": "구매",
            "Repository roles": "저장소 역할",
            "Member privileges": "멤버 권한",
            "Team discussions": "팀 토론",
            "Import/Export": "불러오기/내보내기",
            "Moderation": "관리",
                "Blocked users": "차단한 사람",
                "Interaction limits": "상호 작용 제한",
                "Code review limits": "코드 검토 제한",
                "Moderators": "관리자",

            "Code, planning, and automation": "코드 안정성 및 분석",
            "Repository": "저장소",
            "Rulesets": "규칙 집합",
            "Rule insights": "규칙 통찰",
            "Custom properties": "사용자 정의 속성",
            "Planning": "계획",
            "Codespaces": "코드스페이스",
            "Copilot": "GitHub Copilot",
                "Access": "엑세스",
                "Policies and features": "정책 및 기능",
            "Actions": "액션",
                "Runners": "실행기",
                "Runner groups": "실행기 그룹",
                "Caches": "캐시",
            "Webhooks": "웹훅",
            "Packages": "패키지",
            "Projects": "프로젝트",
        
            "Security": "보안",
                "Authentication security": "인증 보안",
                "Deploy keys": "배포 키",
                "Code security": "코드 보안",
                "Compliance": "규정 준수",
                "Verified and approved domains": "검증 및 승인된 도메인",
                "Secrets and variables": "비밀 및 변수",
                    "Private registries": "비공개 레지스트리",
        
            "Third-party Access": "타사 접근",
            "OAuth app policy": "OAuth 앱 정책",
            "GitHub Apps": "GitHub 앱",
            "Personal access tokens": "개인 접근 토큰",
                "Active tokens": "활성 토큰",
                "Pending requests": "대기 중인 요청",
        
            "Integrations": "통합",
            "Scheduled reminders": "예약된 알림",
        
            "Archive": "보관됨",
            "Logs": "로그",
                "Sponsorship log": "후원 로그",
                "Audit log": "감사 로그",
            "Deleted repositories": "삭제된 저장소",
        
            "Developer settings": "개발자 설정",
                "OAuth Apps": "OAuth 앱",
                "Publisher Verification": "발행자 검증",
            "Account settings": "계정 설정",
        
            "Developer Settings": "개발자 설정"
    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
};

I18N["ko-KR"]["settings/profile"] = { // 设置 - 个人资料
    "static": { // 静态翻译
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // Profile 个人资料 https://github.com/settings/profile
            "Public profile": "프로필",
            "Profile picture": "프로필 사진",
                "Edit": "편집",
                "Upload a photo…": "사진 업로드…",
                "Remove photo": "사진 제거하기",
                "Are you sure you want to reset your current avatar?": "정말로 제거하시겠어요?",
                "Your profile picture has been reset. It may take a few minutes to update across the site.": "프로필 사진이 재설정됐어요. 적용까지 몇 분이 걸릴 수도 있어요.",
                "Your profile picture has been updated. It may take a few minutes to update across the site.": "프로필 사진이 업데이트됐어요. 적용까지 몇 분이 걸릴 수도 있어요.",
                // 裁剪个人头像对话框
                "Crop your new profile picture": "프로필 사진 자르기",
                "Set new profile picture": "새 프로필 사진으로 등록하기",
            //"You can also drag and drop a picture from your computer.": "您也可以直接拖拽照片镜像上传.",
            "Name": "이름",
            "Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time.": "기여하거나 언급될 때 표시될 거에요. 언제든지 제거할 수 있어요.",
            "Public email": "공개 이메일",
            "Remove": "제거하기",
            "Select a verified email to display": "표시할 이메일을 선택하세요",
            "You have set your email address to private. To toggle email privacy, go to": "이메일 주소를 비공개로 설정했어요.",
            "email settings": "이메일 설정에서",
            "and uncheck \"Keep my email address private.\"": "공개 상태를 변경할 수 있어요.",
            "You can manage verified email addresses in your": "이메일 주소 관리는",
            //"Don’t show my email address": "不显示我的邮箱",
            //"You can add or remove verified email addresses in your": "您可以添加或删除邮件地址在您的",
            //"personal email settings": "邮箱设置",
            "Bio": "설명",
            "Tell us a little bit about yourself": "사용자님에 대해 더 알고 싶어요",
            "You can": "다른 사람이나 어떤 조직의 사람들을",
            "@mention": "@언급",
            "other users and organizations to link to them.": "할 수 있어요.",
            "URL": "URL",
            "Social accounts": "소셜 계정",
            "Link to social profile": "소셜 계정 링크",
            "Company": "회사",
            "your company’s GitHub organization to link it.": "회사의 Github 조직 링크",
             //"your company's GitHub organization to link it.": "贵公司和GitHub的组织联系起来。",
            "Pronouns": "대명사",
                "Don't specify": "없음",
                "they/them": "그들/그들의",
                "she/her": "그녀/그녀의",
                "he/him": "그/그의",
                "Custom": "사용자 지정",
            "Location": "위치",
            "Display current local time": "위치에 맞는 시간 표시",
                "Other users will see the time difference from their local time.": "다른 사람들에게는 시간 차이로 표시돼요.",
                "Time zone": "시간대",

            "All of the fields on this page are optional and can be deleted at any time, and by filling them out, you're giving us consent to share this data wherever your user profile appears. Please see our": "이 페이지의 모든 필드는 선택 사항이며 언제든지 삭제할 수 있어요. 여기서 작성한 것들이 나의 프로필이 표시되는 모든 곳에서 이 데이터를 공유하는 것에 동의하게 돼요.",
            "privacy statement": "개인정보 보호정책에서",
            "to learn more about how we use this information.": "내 정보가 어디에 쓰이는지 알아보세요.",
            "Update profile": "적용하기",
            // 顶部提醒
                "Profile updated successfully": "성공적으로 적용됐어요.",
                "Profile updated successfully —": "성공적으로 적용됐어요. —",
                "view your profile.": "내 프로필 보기",

                "Contributions & activity": "기여 및 활동",
                "Make profile private and hide activity": "프로필을 비공개로 설정하고 활동 숨기기",
                    "Enabling this will hide your contributions and activity from your GitHub profile and from social features like followers, stars, feeds, leaderboards and releases.": "이 기능을 활성화하면 기여 및 활동이 GitHub 프로필에서 숨겨지고, 팔로워, 별표, 피드, 리더보드, 릴리즈 같은 소셜 기능에서도 보이지 않아요.",
                "Include private contributions on my profile": "내 프로필에 비공개 기여 포함하기",
                    "Your contribution graph, achievements, and activity overview will show your private contributions without revealing any repository or organization information.": "기여 그래프, 업적, 활동 개요에서 비공개 기여가 표시되지만, 저장소나 조직 정보는 노출되지 않아요.",
                    "Read more": "자세히 알아보기",
            "Update preferences": "설정 업데이트하기",

            "Profile settings": "프로필 설정",
                "Display PRO badge": "PRO 배지 표시하기",
                    "This will display the": "이 기능을 활성화하면",
                    "badge on your public profile page.": "공개 프로필 페이지에 배지가 표시돼요.",
                "Show Achievements on my profile": "내 프로필에 업적 표시하기",
                    "Your achievements will be shown on your profile.": "업적이 내 프로필에 표시돼요.",

            "GitHub Developer Program": "GitHub 개발자 프로그램",
                "has guides, API and webhook references, information about creating GitHub Apps and other resources for building applications that integrate with GitHub. Make sure your contact information is up-to-date below. Thanks for being a member!": "가이드, API 및 웹훅 문서, GitHub 앱 생성 정보, GitHub과 통합되는 애플리케이션을 개발하는 데 필요한 리소스를 제공해요. 아래 연락처 정보를 최신 상태로 유지해주세요. 가입해 주셔서 감사합니다!",

            "Support email address": "기술 지원 이메일 주소",
                "An email address where GitHub users can contact you for support.": "GitHub 사용자가 지원을 요청할 때 연락할 수 있는 이메일 주소예요.",
            "Product or company website": "제품 또는 회사 웹사이트",
                "The URL for the product, company, or service that integrates with GitHub.": "GitHub와 연동되는 제품, 회사 또는 서비스의 URL이에요.",
            "Update contact information": "연락처 정보를 업데이트",
            "Leave the program": "프로그램 탈퇴하기",

            "Building an application, service, or tool that integrates with GitHub?": "GitHub와 연동되는 애플리케이션, 서비스 또는 도구를 개발 중이신가요?",
            "Join the GitHub Developer Program": "GitHub 개발자 프로그램에 가입해 보세요",
            ", or read more about it at our": ", 또는 자세한 내용을 보시려면 저희의",
            "GitHub developer program": "GitHub 개발자 프로그램",
            "Developer site": "개발자 사이트",

            "Jobs profile": "취업 프로필",
            "Available for hire": "구직 중",
            "Save jobs profile": "구직 프로필 저장하기",
            // 상단 알림
            "Profile updated successfully —": "프로필이 성공적으로 업데이트되었어요!",
            "view your profile.": "프로필을 확인해 보세요.",

            "Trending settings": "트렌딩 설정",
            "Preferred spoken language": "선호하는 언어",
            "No Preference": "선택 없음",

            "We'll use this language preference to filter the trending repository lists on": "이 언어 선호도는",
            "our": "페이지에서 사용돼요. ",
            "Trending Repositories": "트렌딩 저장소",
            "page.": "페이지에서도 사용해요.",
            "Save Trending settings": "트렌딩 설정 저장하기",

            "ORCID provides a persistent identifier - an ORCID iD - that distinguishes you from other researchers. Learn more at": "ORCID는 다른 연구자들과 구분되는 영구 식별자인 ORCID iD를 제공해요. 자세한 내용을 확인해 보세요.",
            "Connect your ORCID iD": "ORCID iD를 연결해 보세요",
            "Successfully connected your GitHub account with ORCID.": "GitHub 계정과 ORCID를 성공적으로 연결했어요.",
            "You have a connected ORCID iD": "이미 연결된 ORCID iD가 있어요",
            "for the account": "해당 계정",
            "Display your ORCID iD on your GitHub profile": "GitHub 프로필에 ORCID iD를 표시해 보세요",
            "Disconnecting your ORCID iD may affect areas of your profile where your ORCID iD is displayed.": "ORCID iD 연결을 해제하면 GitHub 프로필에서 ORCID iD가 표시되는 부분에 영향을 줄 수 있어요.",
            "Disconnect your ORCID iD": "ORCID iD 연결을 해제해 보세요",
            "Successfully disconnected ORCID from your GitHub Account.": "GitHub 계정에서 ORCID 연결을 성공적으로 해제했어요."
    },
    "regexp": [ // 正则翻译
    ],
};
I18N["ko-KR"]["settings"] = I18N["ko-KR"]["settings/profile"];

I18N["ko-KR"]["settings/admin"] = { // 设置 - 账户
    "static": { // 静态翻译
        ...I18N["ko-KR"]["settings-menu"]["static"],

            // Account settings 账户设置 https://github.com/settings/admin
            "Change username": "사용자 이름 변경하기",
            "Changing your username can have": "사용자 이름 변경 시",
            "unintended side effects": "예상치 못한 부작용이 있을 수 있어요",
                "Really change your username?": "정말로 사용자 이름을 변경할까요?", //쀐
                "Unexpected bad things will happen if you don’t read this!": "이 내용을 읽지 않으면 뜻밖의 문제가 생길 수 있어요!",
                "We": "저희는",
                "will not": "절대",
                "will": " ",
                "set up redirects for your old profile page.": "이전 프로필 페이지에 리디렉션을 설정해드리지 않아요.",
                "set up redirects for Pages sites.": "GitHub Pages 사이트에 리디렉션을 설정해드리지 않아요.",
                "create redirects for your repositories (web and git access).": "저장소(웹 및 git 접근)에 리디렉션을 만들어드릴게요.",
                "Renaming may take a few minutes to complete.": "이름 변경은 완료되기까지 몇 분 정도 소요될 수 있어요.",
                "I understand, let’s change my username": "이해했어요, 사용자 이름을 변경할게요.",

                "Enter a new username": "새 사용자 이름 입력하기",
                "Choose a new username": "새 사용자 이름 선택하기",
                "Change my username": "사용자 이름 변경하기",
                "Trademark Policy": "상표 정책",
                "are available.": "사용 가능합니다.",
                "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.": "사용자 이름은 영문자와 숫자, 또는 단일 하이픈만 포함할 수 있으며, 하이픈으로 시작하거나 끝날 수 없어요.",
            "Looking to manage account security settings? You can find them in the": "계정 보안 설정을 관리하고 싶으세요? ",
            "page.": "페이지에서 관리해보세요.",

            "Link Patreon account": "Patreon 계정 연결하기",
                "Connect a Patreon account for": " ",
                "to sponsor maintainers with. Get recognition on GitHub for sponsorships made on Patreon when the sponsored person has linked Patreon and GitHub, too, and has a public GitHub Sponsors profile.": "의 Patreon 계정을 연결하여 유지 관리자들을 후원해보세요. 후원받는 사람이 Patreon과 GitHub를 연동하고 공개된 GitHub Sponsors 프로필을 가지고 있다면, Patreon에서 진행된 후원이 GitHub에서도 인정을 받게 돼요.",
                "Connect with Patreon": "Patreon 계정 연결하기",
                "Successfully connected your GitHub account with Patreon.": "GitHub 계정과 Patreon 계정이 성공적으로 연결되었어요.",

            "Unlink Patreon account": "Patreon 계정 연결 해제하기",
                "Disconnect the Patreon account": "Patreon 계정 연결 해제하기",
                "for": "그리고", //쀐
                //유지 관리자 후원에 사용하기 위해 연결해요. 
                "to sponsor maintainers with. Any sponsorships made on Patreon will no longer receive recognition on GitHub.": "Patreon에서 진행한 후원은 더 이상 GitHub에 표시되지 않아요.",
                "Successfully disconnected your GitHub account from Patreon.": "GitHub 계정과 Patreon 계정 연결이 성공적으로 해제되었어요.",

            "Export account data": "계정 데이터 내보내기",
            "Export all repositories and profile metadata for": " ",
            ". Exports will be available for 7 days.": "의 모든 저장소와 프로필 메타데이터를 내보낼 수 있어요. 내보낸 데이터는 7일 동안 유효해요.",
            "Start export": "내보내기 시작하기",
            "Recent exports": "최근 내보내기",
            "New export": "새 내보내기",
            "We're preparing your export! We'll send you an email when it's finished.": "내보내기를 준비 중이에요! 완료되면 이메일로 알려드릴게요.",
            "New exports cannot be requested while an export is currently in progress": "현재 내보내기가 진행 중일 때는 새 내보내기를 요청할 수 없어요.",
            "Resend email with link": "링크가 포함된 이메일 재전송하기",
            "Download deleted": "내보낸 데이터가 삭제되었어요.",
            "Job queued to delete file.": "파일 삭제 작업이 대기 중이에요.",

            "Successor settings": "후임자 설정",
            // 미지정
            "designated below": " ",
            ", in the event of my death. I understand that this appointment of a successor does not override legally binding next-of-kin rules or estate laws of any relevant jurisdiction, and does not create a binding will.": " ",
            "Learn more about account successors.": "계정 후임자에 대해 더 알아보기.",
            "Add Successor": "후임자 추가하기",
            "Search by username, full name, or email address": "사용자 이름, 전체 이름, 또는 이메일 주소로 검색하기",
            "You have not designated a successor.": "아직 후임자를 지정하지 않으셨어요.",
            // 대기 중
            "Pending": "처리 중",
            "Copy invite link": "초대 링크 복사하기",
            // 지정됨
            "Learn more about account successors": "계정 후임자에 대해 더 알아보기",
            "Revoke": "취소하기",
            // 거절됨
            "Declined": "거절됨",

            "Delete account": "계정 삭제하기",
            "Once you delete your account, there is no going back. Please be certain.": "계정을 삭제하면 되돌릴 수 없어요. 신중하게 결정해 주세요.",
                "Your account is currently an owner in these organizations:": "현재 사용자님의 계정은 다음 조직들의 소유자에요:",
                "You must": "먼저 반드시",
                "remove yourself": "본인을 제거하시거나",
                "transfer ownership": "소유권을 이전하시거나",
                "delete": "삭제하시고",
                "these organizations before you can delete your user.": "이 조직들을 처리해야 계정을 삭제할 수 있어요.",
            "Delete your account": "계정 삭제하기",
            "Are you sure you don’t want to just": "정말로 단순히",
            "downgrade your account": "계정을 다운그레이드하지 않으시겠어요?",
            "to a": "로,",
            "FREE": "무료",
            "account? We won’t charge your payment information anymore.": "계정으로 전환하시겠어요? 이제 더 이상 결제 정보가 청구되지 않아요.",
                "Are you sure you want to do this?": "정말로 진행하시겠어요?",
                "This is extremely important.": "매우 중요한 사항이에요.",
                "We will": "저희가",
                ", along with all of your forks, wikis, issues, pull requests, and GitHub Pages sites.": ", 모든 포크, 위키, 이슈, 끌어오기 요청, 그리고 GitHub Pages 사이트도 함께",
                "You will no longer be billed, and after 90 days your username will be available to anyone on GitHub.": "요금이 더 이상 청구되지 않고, 90일 후에는 해당 사용자 이름이 GitHub의 누구에게나 사용 가능해져요.",
                "For more help, read our article \"": "더 많은 도움을 원하시면, 저희 기사 “",
                "Deleting your user account": "계정 삭제하기",
                "\".": "”를 읽어보세요.",
                "Your username or email:": "사용자 이름 또는 이메일:",
                "To verify, type": "확인을 위해 입력해 주세요:",
                "below:": "다음에서:",
                "Confirm your password:": "비밀번호 확인:",
                "Cancel plan and delete this account": "플랜 취소 후 계정 삭제하기",
            // "and": "그리고",

    },
    "regexp": [ // 正则翻译
        [/is available\./, "可用。"],
        [/Username ([^ ]+) is not available\. Please choose another\. To submit a trademark claim, please see our/, "用户名 $1 不可用。请重新选择。要提交商标索赔，请看我们的"],
        [/immediately delete all of your repositor(y|ies) \((\d+)\)/, "立即删除您所有的仓库（$1个）"],

        // 设置继任者
        [/By clicking \"Add Successor\" below, I acknowledge that I am the owner of the([^@]+@[^\n]+) account, and am authorizing GitHub to transfer content within that account to my GitHub Successor,/, "아래의 “후임자 추가하기”를 클릭함으로써, 나는 $1 계정의 소유자임을 확인하며, 만약 내가 사망할 경우 GitHub가 그 계정 내의 콘텐츠를 내 GitHub 후임자에게 이전하도록 허용하는 것에 동의해요. 이 후임자 지정은 법적으로 구속력 있는 상속 규칙이나 관련 관할 구역의 유산 법률을 무시하지 않으며, 구속력 있는 유언을 생성하지 않음을 이해해요."],
        [/This link will only work for ([^ ]+)./, "此链接仅对 $1 有效。"],

        // 顶部提醒
        [/You have successfully sent the successor invitation to ([^ ]+)./, "您已经成功向 $1 发送了继任者邀请。"],
        [/You have revoked the successor invitation to ([^ ]+)./, "您已经撤销了对 $1 的继任者邀请。"],
        [/You have canceled the invitation to ([^ ]+) to be your designated successor./, "您已经取消了让 $1 成为您的指定继任者的邀请。"],
    ],
};

I18N["ko-KR"]["succession/invitation"] = { // 账户继任者邀请  users/<邀请者的 user-name>/succession/invitation
    "static": { // 静态翻译
        // 受邀者
        "invited you to be their account successor": "邀请您成为其账户继任者",
        "Learn more about account successors": "了解更多关于账户继任者的信息",
        //[/By clicking \"Accept invitation\" below, I acknowledge that I agree to serve as the successor for ([^ ]+), in such ways authorized by their successor request. I agree to abide by GitHub's/, "通过点击下面的 “接受邀请”，我确认我同意按照其继任者要求所授权的方式担任 $1 的继任者。我同意在使用和维护其帐户内容时遵守 GitHub 的"],
        "Terms of Service": "서비스 약관",
        "and the user's written requests, if any, in my use and maintaining of their account's content.": "그리고 사용자의 서면 요청이 있을 경우, 계정의 콘텐츠를 사용하고 유지하는 데 이용됩니다.",
        "I understand that accepting this appointment as successor does not override legally binding next-of-kin rules or estate laws of any relevant jurisdiction, and does not create a binding will, and I agree to comply or assist with a valid request by an individual with legal authority over the user's property (such as next-of-kin, an estate's executor, and/or a beneficiary of their will).": "저는 이 임명을 승계인으로 수락하는 것이 법적 구속력이 있는 차상위 규칙이나 관련 관할권의 유산법을 무시하지 않으며, 구속력 있는 유언을 작성하지 않는다는 점을 이해하고 사용자의 재산에 대한 법적 권한을 가진 개인(예: 차상위 규칙, 유산의 집행자 및/또는 유언의 수혜자)의 유효한 요청에 응하거나 지원하는 데 동의할게요.",
        "Accept invitation": "초대 수락",
        "Decline": "거절",
        // 已接受
        "This invitation has already been accepted.": "초대가 이미 수락되었어요.",
        // 已谢绝
        "This invitation has already been declined.": "초대가 이미 거절되었어요.",
        // 不存在
        "Invitation not found": "초대를 찾을 수 없어요",
        "Your invitation could not be found, or is not valid.": "사용자님의 초대를 찾을 수 없어요. 유효하지 않은걸까요?",
    },
    "regexp": [ // 正则翻译
        [/As an account successor, you would be able to manage ([^ ]+)'s repositories if they're not able to./, "계정 후속자로서 $1에서 리포지토리를 관리할 수 없는 경우 대신 관리할 수 있어요."],
        [/By clicking \"Accept invitation\" below, I acknowledge that I agree to serve as the successor for ([^ ]+), in such ways authorized by their successor request. I agree to abide by GitHub's/, "아래의 '초대 수락'을 클릭함으로써, 저는 그들의 후임 요청에 의해 승인된 방식으로 $1의 후임자로 활동하는 것에 동의함을 인정합니다. 저는 GitHub의 요청을 따르는 것에 동의합니다"],
    ]
};

I18N["ko-KR"]["settings/appearance"] = { // 设置 - 外观
    "static": { // 静态翻译
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // Appearance 外观 https://github.com/settings/appearance
            "Theme preferences": "테마 환경설정",
            "Choose how GitHub looks to you. Select a single theme, or sync with your system and automatically switch between day and night themes. Selections are applied immediately and saved automatically.": "GitHub이 어떻게 보일지 선택해보세요. 단일 테마를 선택하거나 시스템과 동기화하여 낮과 밤 테마를 자동으로 전환할 수 있어요. 선택 사항은 즉시 적용되고 자동으로 저장돼요.",
            "Theme mode": "테마 모드",
                "Single theme": "단일 테마",
                "Sync with system": "시스템과 동기화",
            "GitHub will use your selected theme": "GitHub은 선택한 테마를 사용할 거예요.",
            "GitHub theme will match your system active settings": "GitHub 테마는 시스템의 활성 설정과 일치할 거예요.",
            "Light default": "라이트 - 기본",
            "Light high contrast": "라이트 - 고대비",
            "Light Protanopia & Deuteranopia": "라이트 - 적녹색맹",
            "Light Tritanopia": "라이트 - 청색맹",
            "Dark default": "다크 - 기본",
            "Dark high contrast": "다크 - 고대비",
            "Dark Protanopia & Deuteranopia": "다크 - 적녹색맹",
            "Dark Tritanopia": "다크 - 청색맹",
            "Dark dimmed": "다크 - 어두운",
            "Day theme": "낮 테마",
            "Night theme": "밤 테마",
            "Active": "활성화됨",
            "This theme will be active when your system is set to “light mode”": "시스템이 “라이트 모드”로 설정되었을 때 이 테마가 활성화돼요.",
            "This theme will be active when your system is set to “dark mode”": "시스템이 “다크 모드”로 설정되었을 때 이 테마가 활성화돼요.",
        
            "Emoji skin tone preference": "이모지 피부 톤 선호도",
            "Preferred default emoji skin tone": "기본 이모지 피부 톤 선호도",
        
            "Tab size preference": "탭 크기 선호도",
            "Choose the number of spaces a tab is equal to when rendering code": "코드를 렌더링할 때 탭이 몇 개의 공백에 해당하는지 선택해보세요.",
            "8 (Default)": "8 (기본값)",
        
            "Markdown editor font preference": "Markdown 편집기 글꼴 선호도",
            "Font preference for plain text editors that support Markdown styling (e.g. pull request and issue descriptions, comments.)": "Markdown 스타일을 지원하는 일반 텍스트 편집기(예: 끌어오기 요청 및 이슈 설명, 댓글 등)의 글꼴 선호도를 설정해보세요.",
            "Use a fixed-width (monospace) font when editing Markdown": "Markdown 편집 시 고정 폭(등폭) 글꼴을 사용해보세요.",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N["ko-KR"]["settings/accessibility"] = { // 设置 - 无障碍
    "static": { // 静态翻译
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // Accessibility 无障碍 https://github.com/settings/accessibility
        "GitHub keyboard shortcuts": "GitHub 키보드 단축키",
        "General": "일반",
        "Character keys": "문자 키",
            "Activate": " ",
            "GitHub shortcuts": "GitHub 단축키",
            "that don't use modifier keys in their activation. For example, the": "수정 키 없이 활성화되는 단축키예요. 예를 들어,",
            "shortcut to navigate notifications, or": "은 알림 탐색을 위한 단축키고, 또는",
            "to view context relevant shortcuts.": "로 상황에 맞는 단축키들을 확인해보세요.",
            "Learn more about character key shortcuts": "문자 키 단축키에 대해 더 알아보기",
        
        "Command palette": "명령 팔레트",
            "Modify the shortcuts to trigger the Command Palette for the default search mode and the command mode": "기본 검색 모드와 명령 모드에서 명령 팔레트를 호출하도록 단축키를 수정해보세요.",
            "Search mode": "검색 모드",
                "control + k or control + alt + k (default)": "control + k 또는 control + alt + k (기본값)",
                "Disabled": "비활성화됨",
            "Command mode": "명령 모드",
                "control + shift + k (default)": "control + shift + k (기본값)",
            "Save keyboard shortcut preferences": "키보드 단축키 환경설정 저장하기",
            "Save command palette preferences": "명령 팔레트 환경설정을 저장하기",
        
        // 상단 알림
        "Keyboard shortcut preference successfully saved.": "키보드 단축키 환경설정이 성공적으로 저장되었어요.",
        
        "Motion": "모션",
        "Autoplay animated images": "애니메이션 이미지 자동 재생",
        "Select whether animated images should play automatically.": "애니메이션 이미지가 자동으로 재생되도록 할지 선택해보세요.",
        "Sync with system": "시스템과 동기화하기",
        "Adopts your system preference for reduced motion": "시스템의 모션 감소 설정을 따릅니다.",
        "Enabled": "사용함",
        "Automatically plays animated images": "애니메이션 이미지를 자동 재생해요.",
        "Prevents animated images from playing automatically": "애니메이션 이미지가 자동 재생되지 않도록 해요.",
        "Save motion preferences": "모션 환경설정을 저장해보세요.",
        
        // 상단 알림
        "Motion preferences successfully saved.": "모션 환경설정이 성공적으로 저장되었어요.",
        
        "Content": "콘텐츠",
        "Link underlines": "링크 밑줄",
        "Toggle the visibility of underlines on links that are adjacent to text.": "텍스트와 인접한 링크의 밑줄 표시 여부를 전환해보세요.",
        "Hide link underlines": "링크 밑줄 숨기기",
        "Show link underlines": "링크 밑줄 보이기",
        "Save content preferences": "콘텐츠 환경설정을 저장해보세요.",
        
        "Hovercards": "호버 카드",
            "Enable previewing link content via mouse hover or keyboard focus before navigation. Move focus to hovercard content using": "탐색 전에 마우스 호버나 키보드 포커스를 통해 링크 내용을 미리 볼 수 있도록 활성화해보세요. 다음을 사용하여 호버 카드 내용으로 포커스를 이동시켜보세요.",
            "Save hovercard preferences": "호버 카드 환경설정을 저장해보세요.",
        
        // 상단 알림
        "Link underline preferences successfully saved.": "링크 밑줄 환경설정이 성공적으로 저장되었어요.",
        
        "Editor settings": "편집기 설정",
            "URL paste behavior": "URL 붙여넣기 동작",
            "Select if URLs should be formatted on paste. You can use": "URL을 붙여넣을 때 형식을 적용할지 선택해보세요. 다음을 사용해보실 수 있어요:",
            "to paste a link in the opposite way.": "반대 방식으로 링크를 붙여넣어보세요.",
            "Formatted link": "서식 있는 링크",
                "Pasting a URL while having text selected will format to a Markdown link": "텍스트가 선택된 상태에서 URL을 붙여넣으면 Markdown 링크로 서식이 지정돼요.",
            "Plain text": "일반 텍스트",
                "Pasting a URL while having text selected will replace the text": "텍스트가 선택된 상태에서 URL을 붙여넣으면 텍스트가 대체돼요.",
            "Save editor settings": "편집기 설정을 저장해보세요.",
                // 상단 알림
                "Paste behavior preferences successfully saved.": "붙여넣기 동작 환경설정이 성공적으로 저장되었어요.",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N["ko-KR"]["settings/notifications"] = { // 设置 - 通知
    "static": { // 静态翻译
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // Notification center 通知 https://github.com/settings/notifications
            "Default notifications email": "기본 알림 이메일 설정",
                "Choose where you'd like emails to be sent. You can add more email addresses. Use custom routes to specify different email addresses to be used for individual organizations.": "알림 이메일을 받을 주소를 선택해보세요. 이메일 주소를 추가할 수 있어요. 사용자 지정 라우팅을 사용해 각 조직마다 다른 이메일 주소를 지정할 수도 있어요.",
                "Custom routing": "사용자 지정 라우팅",

            "Automatically watch repositories": "저장소 자동 관찰하기",
                "When you're given push access to a repository, automatically receive notifications for it.": "저장소에 푸시 권한이 부여되면, 해당 저장소의 알림을 자동으로 받아보세요.",
            "Automatically watch teams": "팀 자동 관찰하기",
                "Anytime you join a new team, you will automatically be subscribed to updates and receive notification when that team is @mentioned.": "새 팀에 가입하면, 해당 팀의 업데이트를 자동 구독하고 @언급될 때 알림을 받아보실 수 있어요.",

                "On": "켜기",
                "Off": "끄기",

            "Subscriptions": "구독",
                "Watching": "저장소 관찰하기",
                    "Notifications for all repositories, teams, or conversations you're watching.": "관찰 중인 모든 저장소, 팀 또는 대화의 알림이에요.",
                    "View watched repositories": "관찰 중인 저장소 보기",
                    "Notify me:": "알림 받기:",
                    "Select notification channels": "알림 채널 선택하기",
                    "Close": "닫기",
                    "on GitHub, Email, CLI": "GitHub, 이메일, CLI에서",
                    "on GitHub, CLI": "GitHub, CLI에서",
                    "on GitHub, Email, CLI": "GitHub, 이메일, CLI에서",
                    "on GitHub, Email": "GitHub, 이메일에서",
                    "On GitHub": "GitHub에서",
                    "on GitHub": "GitHub에서",
                "Don't notify": "알림 받지 않기",

                "Participating, @mentions and custom": "참여, @언급 및 사용자 지정",
                    "Notifications for the conversations you are participating in, or if someone cites you with an @mention. Also for all activity when subscribed to specific events.": "참여 중인 대화나 누군가가 @언급할 때, 그리고 특정 이벤트를 구독했을 때의 모든 활동에 대한 알림이에요.",

                "Customize email updates": "이메일 업데이트 사용자 지정하기",
                    "Choose which additional events you'll receive emails for when participating or watching.": "참여하거나 저장소를 관찰할 때, 추가로 이메일을 받을 이벤트를 선택해보세요.",
                    "Select events": "이벤트 선택하기",
                    "Reviews": "리뷰",
                    "Reviews, Pushes": "리뷰, 푸시",
                    "Reviews, Pushes, Comments": "리뷰, 푸시, 댓글",
                    "Reviews, Pushes, Comments, My own updates": "리뷰, 푸시, 댓글, 내 업데이트",
                    "Pull Request reviews": "끌어오기 요청 리뷰",
                    "Pull Request pushes": "끌어오기 요청 푸시",
                    "Comments on Issues and Pull Requests": "이슈 및 끌어오기 요청 댓글",
                    "Includes your own updates": "본인 업데이트 포함",
                "Ignored repositories": "무시된 저장소",
                "You'll never be notified.": "알림을 절대 받지 않으실 거예요.",
                "View ignored repositories": "무시된 저장소 보기",

            "System": "시스템",
                "Actions": "액션",
                    "Notifications for workflow runs on repositories set up with": "설정된 저장소의 워크플로우 실행 알림이에요:",
                    ". (": " (",
                    "Failed workflows only": "실패한 워크플로우만",
                    "Only notify for failed workflows": "실패한 워크플로우에 대해서만 알림받기",

            "Dependabot alerts: New vulnerabilities": "Dependabot 경고: 새로운 취약점",
                "When you're given access to": "접근 권한을 받으면",
                "Dependabot alerts": "Dependabot 경고를",
                "automatically receive notifications when a new vulnerability is found in one of your dependencies.": "의존성 중 하나에서 새로운 취약점이 발견되면 자동으로 알림을 받아보세요.",

            "Email weekly digest": "주간 이메일 요약",
                "Email a weekly summary summarizing alerts for up to 10 of your repositories.": "최대 10개의 저장소에 대한 경고를 요약한 주간 이메일 요약을 보내드려요.",
                "Don't send": "보내지 않기",
                "Send weekly": "주간 전송하기",
                "Send daily": "일일 전송하기",

            "\'Deploy key\' alert email": "‘배포 키’ 경고 이메일",
                "When you are given admin permissions to an organization, automatically receive notifications when a new deploy key is added.": "조직의 관리자 권한을 받으면, 새 배포 키가 추가될 때 자동으로 알림을 받아보세요.",

        // 알림 사용자 지정 라우팅 https://github.com/settings/notifications/custom_routing
                "/ Custom Routing": "/ 사용자 지정 라우팅",
                    "You can send notifications to different": "저장소를 소유한 조직에 따라 다른",
                    "verified": "인증된 (이메일)",
                    "email addresses depending on the organization that owns the repository.": "이메일 주소로 알림을 보내실 수 있어요.",
                    "is your current default email for notifications.": "는 현재 기본 알림 이메일이에요.",

                    "No custom routes yet.": "아직 사용자 지정 라우팅이 없어요.",
                    "Add new route": "새 라우트 추가하기",
                        "Pick organization": "조직 선택하기",
                            "Select an item": "항목 선택하기",
                        "Search organizations": "조직 검색하기",
                        "Select Email": "이메일 선택하기",
                        "Saved": "저장됨",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N["ko-KR"]["settings/billing"] = { // 设置 - 账单和计划
    "static": { // 静态翻译
        ...I18N["ko-KR"]["settings-menu"]["static"],
        ...I18N["ko-KR"]["orgs-settings-menu"]["static"], // 组织设置

        // 상단 알림
        "Successfully updated billing information.": "결제 정보가 성공적으로 업데이트되었어요.",

        // 청구 및 플랜 https://github.com/settings/billing/summary
            "Billing summary": "청구 요약",
            "Your next payment": "다음 결제 예정액",
            "This amount does not include the spend on usage of metered service. View your": "이 금액은 계량 서비스 사용 비용을 포함하지 않아요. ",
            "usage this month": "이번 달 사용량",
            "below.": "에서 확인해보세요",

            // 조직 설정
                "Current monthly bill": "현재 월 청구액",
                "Switch to yearly billing and save": "연간 결제로 전환하고 절약해보세요",
                "Next payment due": "다음 결제 예정일",

            "Payment information": "결제 정보",
            "Manage spending limit": "지출 한도 관리하기",
            "View payment history": "결제 내역 보기",
            "Switch to yearly billing": "연간 결제로 전환하기",
            "Switch to monthly billing": "월간 결제로 전환하기",

            "Current plan": "현재 플랜",
                "Compare all plans": "모든 플랜 비교하기",
                    "per month": "월 기준",

                "GitHub Free": "GitHub 무료",
                "The basics for all developers": "모든 개발자를 위한 기본 플랜",
                //"GitHub Pro": "GitHub 전문",
                "The basics for organizations and developers": "조직과 개발자를 위한 기본 플랜", // 조직 설정
                "Unlimited public/private repos": "무제한 공개/비공개 저장소",
                "Unlimited collaborators": "무제한 협업자",
                "2,000 Actions minutes/month": "매월 2,000 분의 액션 사용 시간",
                "500MB of Packages storage": "500MB의 패키지 저장공간",
                "120 core-hours of Codespaces compute per developer": "개발자당 120 코어 시간의 코드스페이스 컴퓨트 제공",
                "15GB of Codespaces storage per developer": "개발자당 15GB의 코드스페이스 저장공간 제공",
                "Community support": "커뮤니티 지원",
                // pro
                    "Downgrade to Free": "무료 버전으로 다운그레이드하기",
                "3,000 Actions minutes/month": "매월 3,000 분의 액션 사용 시간",
                "2GB of Packages storage": "2GB의 패키지 저장공간",
                "180 core-hours of Codespaces compute": "180 코어 시간의 코드스페이스 컴퓨트",
                "20GB of Codespaces storage": "20GB의 코드스페이스 저장공간",
                "Code owners, required reviewers, GitHub Pages,": "코드 소유자, 필수 검토자, GitHub 페이지,",
                "and more": "그리고 더 많은 기능",
                "advanced tools": "고급 도구",

                "Not included:": "포함되지 않음:",
                "Free Codespaces usage per organization": "조직별 무료 코드스페이스 사용량",
                "Protected branches on all repos": "모든 저장소의 보호된 분기",
                "Increase Codespaces": "코드스페이스 늘리기",
                "spend limits": "소비 한도",
                "Multiple reviewers in pull requests": "끌어오기 요청에서 여러 검토자",
                "Required status checks": "필수 상태 검사",
                "Code owners": "코드 소유자",
                "Required reviewers": "필수 검토자",
                "Pages for static website hosting": "정적 웹사이트 호스팅용 페이지",
                "Web-based support": "웹 기반 지원",
                "See all features and compare plans": "모든 기능 보기 및 플랜 비교하기",

            "Start your first organization": "첫 조직 만들기",
            "With CI/CD, Dependabot, and the world's largest developer community, GitHub gives your team everything they need to ship better software faster": "CI/CD, Dependabot, 그리고 세계 최대의 개발자 커뮤니티와 함께, GitHub는 팀이 더 빠르게 더 나은 소프트웨어를 출시하는 데 필요한 모든 것을 제공해요.",
            "Create an organization": "조직 만들기",

            // [/In addition to your personal account, you manage (\d+) organizations?./, "개인 계정 외에도, 사용자님은 $1개의 조직을 관리하고 있어요."],
            "Manage your organizations": "조직 관리하기",
                "Create a new organization": "새 조직 만들기",

            "Add-ons": "추가 기능",
                // "GitHub Copilot": "",
                    "Your AI pair programmer": "사용자님의 AI 페어 프로그래머",
                    "Your AI powered pair programmer": "사용자님의 AI 페어 프로그래머",
                    "Upgrade to Copilot Pro": "Copilot Pro로 업그레이드하기",
                    "Active subscription": "활성 구독",
                        "Copilot Free": "Copilot 무료",
                    "You can upgrade to Copilot Pro at any time. Check out this": "언제든지 Copilot Pro로 업그레이드할 수 있어요. 자세한 내용은",
                    "You are eligible to use GitHub Copilot for free.": "GitHub Copilot을 무료로 사용할 자격이 있어요.",
                    "documentation": "문서",
                    "for more details.": "를 참고해보세요.",
                    //"Enable GitHub Copilot": "GitHub Copilot 활성화하기",
                    //"GitHub Copilot suggests code and entire functions in real-time, right from your editor": "GitHub Copilot은 편집기에서 실시간으로 코드와 전체 함수를 제안해줘요.",
                    //"GitHub Copilot uses the GPT-3.5 Turbo model to suggest code and entire functions in real-time, right from your editor": "GitHub Copilot은 GPT-3.5 Turbo 모델을 사용해 편집기에서 실시간으로 코드와 전체 함수를 제안해줘요.",
                     // 조직 설정
                    "Learn more about Copilot Business": "GitHub Copilot 비즈니스에 대해 더 알아보세요",
                    "Copilot Business": "GitHub Copilot 비즈니스",
                    "GitHub Copilot uses the OpenAI large language models to suggest code and entire functions in real-time, right from your editor. You can set up a GitHub Copilot Business subscription for your organization.": "GitHub Copilot은 OpenAI 대형 언어 모델을 사용하여 편집기에서 실시간으로 코드와 전체 함수를 제안해줘요. 조직을 위해 GitHub Copilot 비즈니스 구독을 설정할 수 있어요.",
                    "Sign up for Copilot Business": "GitHub Copilot 비즈니스 가입하기",

            "Usage this month": "이번 달 사용량",
                "Get usage report": "사용 보고서 받기",
                    "A full detailed report will be generated including usage for all eligible": "모든 해당 제품의 사용량을 포함한 자세한 보고서가 생성될 거예요",
                    "products.": "제품 사용량이에요.",
                    "You’ll receive an email at": "준비되면 해당 이메일로 보내드릴게요:",
                    "as soon as it’s ready (it may take up to a couple of hours).": "준비되면 (최대 몇 시간이 걸릴 수 있어요).",
                    "Send report to email": "이메일로 보고서 보내기",
                "Included": "포함됨",
                "Paid": "결제됨",
                "Total": "총액",
                // 작업
                    "Usage minutes": "사용 분",
                    "Price / minute": "분당 단가",
                    "Ubuntu 2-core": "2코어 Ubuntu",
                    "Windows 2-core": "2코어 Windows",
                    "macOS 3-core": "3코어 macOS",
                    "Included minutes quota only applies to Ubuntu 2-core, Windows 2-core and macOS 3-core runners. Windows 2-core and macOS 3-core runners consume included minutes at higher rates.": "포함된 분 사용 한도는 2코어 Ubuntu, 2코어 Windows, 3코어 macOS 실행기에만 적용돼요. 2코어 Windows와 3코어 macOS 실행기는 포함된 분을 더 빠르게 사용해요.",
                // 패키지
                    "Data transfer out": "데이터 전송",
                    "Data transfer out (rounded)": "데이터 전송 (반올림)",
                    "Price estimate / GB": "GB당 예상 단가",
                // 패키지 및 액션 저장공간
                    "Storage for Actions and Packages": "액션 및 패키지 저장공간",
                    "Shared storage consists of Actions artifacts and Packages usage. This graph shows the account's storage usage in GB-months. Removing stored artifacts will not reduce this number, but it will lower its rate of growth. To see your account's current storage, download a usage report.": "공유 저장공간은 액션 아티팩트와 패키지 사용량으로 구성돼요. 이 그래프는 계정의 저장공간 사용량을 GB-월 단위로 보여줘요. 저장된 아티팩트를 삭제해도 이 숫자는 줄어들지 않지만, 증가 속도는 낮아져요. 현재 계정의 저장공간을 확인하려면 사용 보고서를 다운로드해보세요.",
                    "Storage": "저장공간",
                    "Shared Storage": "공유 저장공간",
                // 코드스페이스
                    "Usage hours": "사용 시간",
                    "Core hours are calculated by multiplying the compute types by their per-hour rates, which can vary": "코어 시간은 계산 유형에 시간당 요금을 곱하여 계산되며, 요금은 다를 수 있어요.",
                    "Price / hour": "시간당 단가",
                    "2-core": "2코어",
                    "4-core": "4코어",
                    "8-core": "8코어",
                    "16-core": "16코어",
                    "32-core": "32코어",
                    "Storage usage is updated daily and billed monthly": "저장공간 사용량은 매일 업데이트되며, 매월 청구돼요.",
                    "Price / GB": "GB당 단가",
                    "Prebuild Storage": "사전 구축 저장공간",
                // Git LFS 데이터
                    "Git LFS Data": "Git LFS 데이터",
                    "Add more data": "데이터 추가하기",
                    "Bandwidth": "대역폭",
                "See billing documentation": "청구 문서 보기",
                "monthly spending limit": "월별 지출 한도",
                "monthly spending limit |": "월별 지출 한도 |",  // 조직 설정
                "Set up a spending limit": "지출 한도 설정하기",

            "GitHub Sponsors": "GitHub 스폰서",
                "Connect with the community that builds the tools you use": "사용하는 도구를 개발하는 커뮤니티와 연결해보세요",
                "Start sponsoring": "스폰서 시작하기",
                "You're currently not sponsoring anyone.": "현재 스폰서로 등록된 사람이 없어요.",
                "Learn more about GitHub Sponsors": "GitHub 스폰서에 대해 더 알아보세요",
                "Switch to invoiced billing": "청구서를 통한 결제로 전환하기", // 조직

            "GitHub Marketplace": "GitHub 장터",
                "Change plan": "플랜 변경하기",
                "Cancel plan": "플랜 취소하기",
                "Do you have any questions? Contact": "궁금한 점 있으세요? 연락해보세요:",

            // 조직 설정
            "Billing Management": "결제 관리",
                "Receipts are sent to billing managers and email recipients.": "영수증은 결제 관리자와 이메일 수신자에게 전송돼요.",

                "Billing managers": "결제 관리자",
                    "You have not invited any billing managers": "아직 결제 관리자를 초대하지 않았어요.",
                    "Invite": "초대하기",

                "Email recipients": "이메일 수신자",
                    "Add": "추가하기",
                    "Primary": "주 계정",

                    // 결제 이메일 편집 대화상자
                        "Edit billing email address": "결제 이메일 주소 편집하기",
                        "Billing primary email": "결제 주 이메일",
                        "Update": "업데이트하기",

                    // 결제 수신자 추가 대화상자
                        "Add billing recipient": "결제 수신자 추가하기",
                        "Add billing recipient email": "결제 수신자 이메일 추가하기",

                "Metered billing via Azure": "Azure를 통한 계량 청구",
                    "Add Azure Subscription": "Azure 구독 추가하기",
                    "To manage metered billing for this account through Microsoft Azure an Azure Subscription ID must be added to your account.": "Microsoft Azure를 통해 이 계정의 계량 청구를 관리하려면 Azure 구독 ID를 계정에 추가해야 해요.",

        // 결제 정보 https://github.com/settings/billing/payment_information
            // pro
                "Your recurring charges & discounts": "정기 결제 비용 및 할인 내역",
                    "GitHub Coupon": "GitHub 쿠폰",
                        "* Discount applies for GitHub Pro": "* GitHub Pro에 할인 적용돼요",

            "Billing & plans": "청구 및 플랜",
            "/ Payment information": "/ 결제 정보",

            "Please update your billing information in order to add a payment method.": "결제 수단을 추가하려면 결제 정보를 업데이트해주세요.",

            "Billing information": "청구 정보",
                "Remove": "제거하기",
                    "Remove your billing information?": "결제 정보를 제거할까요?",
                    "You are about to remove the billing information for this account.": "이 계정의 결제 정보를 제거하려고 해요.",
                    "Are you sure you want to do this?": "정말로 진행할까요?",
                    "Remove billing information": "결제 정보 제거하기",
            // 조직 설정
            "An organization owner's personal billing information must be linked with this organization account.": "조직 소유자의 개인 결제 정보는 이 조직 계정과 연동되어야 해요.",
            "Update your billing information": "결제 정보 업데이트하기",
            "to be able to link it with this organization.": "이 조직과 연동할 수 있도록요.",

            "First name": "이름",
            "Last name": "성",
            "Add your business information to show on every invoice": "모든 인보이스에 표시될 기업 정보를 추가해주세요.",
            "Address": "주소",
                "(Street, P.O. box)": "(도로명, 우편함)",
            "Address line 2": "주소 2",
                "(Apartment, suite, unit)": "(아파트, 스위트, 유닛)",
            "City": "도시",
            "Country/Region": "국가/지역",
                "Choose your country": "국가 선택하기",
            "State/Province": "주/도",
            "Postal/Zip code": "우편번호",
                "Required for certain countries": "일부 국가에서는 필수에요",
                "(9-digit zip code for US)": "(미국의 경우 9자리 우편번호)",
            "VAT/GST ID": "부가세/GST ID",
            "Save billing information": "결제 정보 저장하기",
            "You have not added any billing information.": "아직 결제 정보를 추가하지 않았어요.",

            "Payment method": "결제 수단",
            "Add Information": "정보 추가하기",
            "You have not added a payment method.": "아직 결제 수단을 추가하지 않았어요.",
            "Credit or debit card": "신용카드 또는 체크카드",
                "504 Gateway Time-out": "504 게이트웨이 타임아웃",
                "You may see an authorization hold on your provided payment method after accruing significant usage of metered services. Authorization holds are temporary and are released as quickly as possible.": "계량 서비스 사용량이 많아지면 제공하신 결제 수단에 승인 보류가 발생할 수 있어요. 승인 보류는 일시적이며 가능한 한 빨리 해제됩니다.",
            "Last payment": "마지막 결제",
            "You have not made any payments.": "아직 결제를 진행하지 않으셨어요.",
            "Coupon": "쿠폰",
            "Redeem a coupon": "쿠폰 사용하기",
            "You don't have an active coupon.": "현재 사용 가능한 쿠폰이 없어요.",
            "* Discount only applies for GitHub Pro": "* 할인은 GitHub Pro에만 적용돼요.",
            "Additional Information": "추가 정보",
                "Add specific contact or tax information to your receipts, like your full business name, VAT/GST identification number, or address of record here. We’ll make sure it shows up on every receipt.": "영수증에 표시될 구체적인 연락처나 세금 정보를 추가해보세요. 예를 들어, 기업 전체 이름, 부가세/GST 번호, 혹은 등록된 주소 등을 입력할 수 있어요. 모든 영수증에 표시되도록 할게요.",
            "Add information": "정보 추가하기",
            "No additional information added to your receipts.": "영수증에 추가 정보가 없어요.",

            // 대화상자
            "Extra billing information": "추가 결제 정보",
            "This information will appear on all your receipts.": "이 정보는 모든 영수증에 표시돼요.",
            "For your security, do not include any confidential or financial information (like credit card numbers).": "안전을 위해, 기밀이나 재무 정보(예: 신용카드 번호)는 포함하지 마세요.",
            "Full business name or address of record": "기업 전체 이름 또는 등록 주소",
            "Save contact information": "연락처 정보 저장하기",

            "Invoice": "인보이스",
                "Receive an invoice for your GitHub purchases": "GitHub 구매에 대한 인보이스 받기",
                "The data from Billing Information, such as your address and VAT/GST ID will appear on your invoices.": "청구 정보의 데이터, 예를 들어 주소와 부가세/GST ID가 인보이스에 표시돼요.",
                "Update your information displayed on your invoices in the": "인보이스에 표시된 정보를 업데이트하려면",
                "billing information section": "청구 정보 섹션에서",
                "Automatically receive an invoice alongside the payment receipt": "결제 영수증과 함께 자동으로 인보이스 받기",
                    "* Enables invoices for all NEW payments.": "* 모든 신규 결제에 대해 인보이스를 활성화해요.",
                "Save invoice preference": "인보이스 선호도 저장하기",

        // 결제 수단 https://github.com/settings/billing/payment
            "/ Payment method": "/ 결제 수단",
            "Loading payment information…": "결제 정보를 불러오는 중…",
            "Pay with": "결제 수단:",
                "Credit card": "신용카드",
                    "Card Number": "카드 번호",
                    "Expiration Date": "만료일",
                        "- Select One -": "- 하나 선택 -",
                    "Address 1": "주소 1",
                    "Address 2": "주소 2",
                    "Country": "국가/지역",
                    "City": "도시",
                    "State": "주/도",
                    "Postal Code": "우편번호",
                    "Submit": "제출하기",
                "PayPal account": "PayPal 계정",
                    "Sign in to": "로그인하기:",
                    "Connecting to PayPal…": "PayPal에 연결 중…",
            "Back to billing settings": "결제 설정으로 돌아가기",
            "There are no upcoming charges to your account.": "계정에 예정된 결제가 없어요.",

        // 지출 한도 https://github.com/settings/billing/spending_limit
            "/ Monthly spending limits": "/ 월별 지출 한도",
            "/ Monthly spending limit": "/ 월별 지출 한도", // 조직 설정
            "Set up a monthly spending limit. You can adjust it at any time. Read more information about": "월별 지출 한도를 설정해보세요. 언제든지 조정할 수 있어요. 자세한 내용은",
            "spending limits": "지출 한도",
            "Actions spending limits": "GitHub 액션 지출 한도", // 조직 설정
            "Packages spending limits": "패키지 지출 한도", // 조직 설정

            "Payment method is missing": "결제 수단이 없습니다.",
            "You can’t increase the spending limits until you set up a valid payment method.": "유효한 결제 수단을 설정하기 전까지는 지출 한도를 늘릴 수 없어요.",
                // 교육 인증
                "Coupons do not apply to any overages.": "쿠폰은 초과 사용량에 적용되지 않아요.",
                    "Any incurred overages will be paid in full by the added payment method.": "발생한 초과 비용은 추가된 결제 수단으로 전액 결제돼요.",
            "Add payment method": "결제 수단 추가하기",

            "Actions & Packages": "액션 및 패키지",
            "Limit spending": "지출 제한하기",
                "Set up a spending limit on a monthly basis": "월별 지출 한도 설정하기",
                "Update limit": "한도 업데이트하기",
                // [/Leaving it at (\$\d+\.\d{2}) will avoid any extra expenses/, "($1 달러로 유지하면 추가 비용을 피할 수 있어요.)"],
            "Unlimited spending": "지출 무제한",
                "Pay as much as needed to keep Actions & Packages running": "액션 및 패키지가 계속 실행되도록 필요한 만큼 결제하기",

            "Email alerts": "이메일 알림",
            "Receive email notifications when usage reaches 75%, 90% and 100% thresholds.": "사용량이 75%, 90%, 100%에 도달하면 이메일 알림을 받아보세요.",
            "Included resources alerts": "포함된 리소스 알림",
            "Spending limit alerts": "지출 한도 알림",

            // 코드스페이스
                "Pay as much as needed to keep Codespaces running": "코드스페이스가 계속 실행되도록 필요한 만큼 결제하기",

        // 결제 내역 https://github.com/account/billing/history
            "/ Payment history": "/ 결제 내역",
            "Amounts shown in USD": "표시 금액은 USD 기준이에요.",

        // 사용자 플랜 https://github.com/account/billing/plans
        // https://github.com/account/billing/plans
            "Compare plans": "플랜 비교하기",
            "Free": "무료",
                "All the basics": "기본 모든 기능",
            "Pro": "전문",
                "Advanced tools for private repos": "비공개 저장소를 위한 고급 도구",
            // 구체 내용
                "Code management": "코드 관리",
                    "Public repositories": "공개 저장소",
                        "Host open source projects in public GitHub repositories, accessible via web or command line. Public repositories are accessible to anyone at GitHub.com.": "웹이나 명령줄을 통해 접근할 수 있는 공개 GitHub 저장소에 오픈 소스 프로젝트를 호스팅해보세요. GitHub.com에서 누구나 접근할 수 있어요.",
                    "Private repositories": "비공개 저장소",
                        "Host code in private GitHub repositories, accessible via appliance, web, and command line. Private repositories are only accessible to you and people you share them with.": "기기, 웹, 명령줄을 통해 접근 가능한 비공개 GitHub 저장소에 코드를 호스팅해보세요. 비공개 저장소는 본인과 공유한 사람만 접근할 수 있어요.",

                "Code workflow": "코드 워크플로우",
                    "GitHub Codespaces": "GitHub 코드스페이스",
                        "Spin up fully configured dev environments in the cloud with the power of your favorite editor. A \"core hour\" denotes compute usage. On a 2-core machine, you would get 60 hours free. On a 4-core machine, you would get 30 hours free, etc. Free hours are assigned to personal accounts, rather than free organizations.": "좋아하는 에디터의 힘으로 클라우드에서 완전히 구성된 개발 환경을 실행해보세요. '코어 시간'은 컴퓨트 사용량을 나타내며, 2코어 머신에서는 60시간, 4코어 머신에서는 30시간의 무료 사용 시간이 제공돼요. 무료 사용 시간은 무료 조직이 아니라 개인 계정에 할당돼요.",
                    "GitHub Actions": "GitHub 액션",
                        "Use execution minutes with GitHub Actions to automate your software development workflows. Write tasks and combine them to build, test, and deploy any code project on GitHub. Minutes are free for public repositories.": "GitHub 액션의 실행 시간을 사용해 소프트웨어 개발 워크플로우를 자동화해보세요. 작업을 작성하고 결합하여 GitHub에서 어떤 코드 프로젝트든 빌드, 테스트, 배포할 수 있어요. 공개 저장소의 경우 실행 시간이 무료에요.",
                        "Learn more about billing": "청구에 대해 더 알아보기",
                    "GitHub Packages": "GitHub 패키지",
                        "Host your own software packages or use them as dependencies in other projects. Both private and public hosting available. Packages are free for public repositories.": "자신의 소프트웨어 패키지를 호스팅하거나 다른 프로젝트의 의존성으로 사용할 수 있어요. 비공개와 공개 호스팅 모두 가능하며, 공개 저장소의 경우 패키지는 무료에요.",
                    "Code reviews": "코드 리뷰",
                        "Review new code, see visual code changes, and confidently merge code changes with automated status checks.": "새 코드를 검토하고, 시각적으로 변경 사항을 확인한 후, 자동화된 상태 검사와 함께 자신 있게 코드 변경을 병합해보세요.",
                    // 끌어오기 요청
                        "Allow contributors to easily notify you of changes they've pushed to a repository – with access limited to the contributors you specify. Easily merge changes you accept.": "기여자가 저장소에 푸시한 변경 사항을 쉽게 알릴 수 있도록 하고, 지정한 기여자에게만 접근 권한을 제한해요. 승인한 변경 사항은 쉽게 병합할 수 있어요.",
                    "Protected branches": "보호된 분기",
                        "Enforce restrictions on how code branches are merged, including requiring reviews by selected collaborators, or allowing only specific contributors to work on a particular branch.": "코드 분기의 병합 방식에 제한을 두어, 선택한 협업자의 리뷰를 요구하거나 특정 기여자만 특정 분기에서 작업할 수 있도록 해보세요.",
                    // 코드 소유자
                        "Automatically request reviews – or require approval – by selected contributors when changes are made to sections of code that they own.": "자신이 소유한 코드 부분에 변경이 발생하면 선택한 기여자에게 자동으로 리뷰를 요청하거나 승인을 요구해보세요.",
                    "Draft pull requests": "끌어오기 요청 초안",
                        "Easily discuss and collaborate on pull requests before submitting to formal review.": "정식 리뷰 제출 전, 끌어오기 요청에 대해 쉽게 논의하고 협업해보세요.",
                    "Multiple pull request assignees": "여러 끌어오기 요청 담당자",
                        "Assign more than one person to a pull request.": "끌어오기 요청에 여러 사람을 담당자로 지정해보세요.",
                    "Repository insights": "저장소 인사이트",
                        "See data about activity and contributions within your repositories, including trends. You can use this data to improve collaboration and make development faster and more effective.": "저장소 내 활동 및 기여 데이터, 추세 등을 확인해보세요. 이 데이터를 활용하여 협업을 개선하고 개발 속도를 높일 수 있어요.",
                    // 정기 알림
                        "Send scheduled messages to you or your team listing open pull requests.": "열린 끌어오기 요청 목록을 팀 또는 본인에게 정기적으로 전송해보세요.",
                    "Automatic code review assignment": "자동 코드 리뷰 할당",
                        "Automatically assign code reviews to members of your team based on one of two algorithms.": "두 가지 알고리즘 중 하나를 기반으로 팀원들에게 코드 리뷰를 자동으로 할당해보세요.",
                    "Environment protection rules": "환경 보호 규칙",
                        "When a workflow job references an environment, the job won't start until all of the environment's protection rules pass.": "워크플로우 작업이 환경을 참조할 때, 환경의 모든 보호 규칙이 통과될 때까지 작업이 시작되지 않아요.",
                    "Environment deployment branches and secrets": "환경 배포 분기 및 비밀",
                        "A job cannot access secrets that are defined in an environment unless it is running on the specified branch.": "작업이 지정된 분기에서 실행되지 않으면, 환경에 정의된 비밀에 접근할 수 없어요.",

                "Collaboration": "협업",
                    "Collaborators for public repositories": "공개 저장소 협업자",
                        "Invite any GitHub member, or all GitHub members, to work with you on code in a public repository you control – including making changes and opening issues.": "자신이 관리하는 공개 저장소에서 코드를 함께 작업할 GitHub 멤버(혹은 모든 멤버)를 초대해보세요 – 코드 변경 및 이슈 제기도 포함돼요.",
                    "Collaborators for private repositories": "비공개 저장소 협업자",
                        "Invite any GitHub member, or all GitHub members, to work with you on code in a private repository you control – including making changes and opening issues.": "자신이 관리하는 비공개 저장소에서 코드를 함께 작업할 GitHub 멤버(혹은 모든 멤버)를 초대해보세요 – 코드 변경 및 이슈 제기도 포함돼요.",
                    // 이슈
                        "Track bugs, enhancements, and other requests, prioritize work, and communicate with stakeholders as changes are proposed and merged.": "버그, 기능 개선 및 기타 요청을 추적하고, 작업 우선순위를 정하며, 변경 사항이 제안되고 병합될 때 이해관계자와 소통해보세요.",
                    // 프로젝트
                        "Visualize and manage issues and pull requests across tables, boards, and roadmaps with custom fields and views that you can arrange to suit your workflow.": "사용자 워크플로우에 맞게 조정할 수 있는 커스텀 필드와 뷰를 활용해, 표, 보드, 로드맵 상에서 이슈와 끌어오기 요청을 시각화 및 관리해보세요.",
                    "Milestones": "마일스톤",
                        "Track progress on groups of issues or pull requests in a repository, and map groups to overall project goals.": "저장소 내 이슈나 끌어오기 요청 그룹의 진행 상황을 추적하고, 이를 전체 프로젝트 목표에 맞춰보세요.",
                    // 팀 토론
                        "Discuss any topic, unattached to a specific project or issue. Control who has access, notify discussion participants with updates, and link from anywhere.": "특정 프로젝트나 이슈에 얽매이지 않고 어떤 주제든 토론해보세요. 접근 권한을 제어하고, 업데이트로 토론 참가자들에게 알리며, 어디서든 링크할 수 있어요.",
                    "Organization and team management": "조직 및 팀 관리",
                        "Manage access to projects on a team-by-team, or individual user, basis.": "팀별 또는 개별 사용자별로 프로젝트 접근을 관리해보세요.",
                    "Pages and wikis": "GitHub 페이지와 Wiki",
                        "Host documentation and simple websites for your project in a wiki format that contributors can easily edit either on the web or command line.": "위키 형식으로 프로젝트의 문서와 간단한 웹사이트를 호스팅해보세요. 기여자들은 웹이나 명령줄에서 쉽게 편집할 수 있어요.",
                    "Multiple issue assignees": "여러 이슈 담당자",
                        "Assign more than one person to an issue.": "이슈에 여러 사람을 담당자로 지정해보세요.",
                    "GitHub organizations give you team-based access control and discussions.": "GitHub 조직은 팀 기반의 접근 제어와 토론 기능을 제공해요.",
                        "Learn more about organizations": "조직에 대해 더 알아보기",

                "Security and compliance": "보안 및 준수",
                    "Code scanning": "코드 스캐닝",
                        "Integrate automated security review into your pull requests with CodeQL. Find, prioritize, and fix vulnerabilities in your repositories without disrupting your workflow.": "CodeQL을 사용해 자동화된 보안 검토를 끌어오기 요청에 통합해보세요. 워크플로우를 방해하지 않고 저장소의 취약점을 발견, 우선순위 지정, 수정할 수 있어요.",
                    "Secret scanning": "비밀 스캐닝",
                        "Detect credentials exposed in your git history, comments, or discussions. Prevent further exposures with push protection, which proactively blocks secrets from being pushed into your code.": "git 기록, 댓글 또는 토론에서 노출된 자격 증명을 감지하고, 푸시 보호를 통해 코드에 비밀이 푸시되는 것을 사전에 차단해 추가 노출을 방지해보세요.",
                    "Dependency review": "의존성 검토",
                        "Understand the security impact of newly introduced dependencies during pull requests, before they get merged.": "끌어오기 요청 병합 전에 새로 도입된 의존성이 보안에 미치는 영향을 이해해보세요.",
                    "Security overview": "보안 개요",
                        "Get a centralized view of your organization's security risks. Know where security features have and haven’t yet been configured.": "조직의 보안 위험을 한눈에 파악하고, 어떤 보안 기능이 설정되었는지 파악해보세요.",
                    "Dependabot alerts": "Dependabot 알림",
                        "Get notified when there are new vulnerabilities affecting dependencies in your repositories.": "저장소의 의존성에 영향을 주는 새로운 취약점이 발생하면 알림을 받아보세요.",
                    "Dependabot security updates": "Dependabot 보안 업데이트",
                        "Keep projects secure by automatically opening pull requests that update vulnerable dependencies to secure versions.": "취약한 의존성을 안전한 버전으로 업데이트하는 끌어오기 요청을 자동으로 열어 프로젝트를 안전하게 유지해보세요.",
                    "Dependabot version updates": "Dependabot 버전 업데이트",
                        "Keep projects up-to-date by automatically opening pull requests that update out-of-date dependencies.": "자동으로 끌어오기 요청을 열어 오래된 의존성을 업데이트해 프로젝트를 최신 상태로 유지해보세요.",
                    "Repository rules": "저장소 규칙",
                        "Enforce branch and tag protections across repositories. Rule insights allow you to review rule enforcement and understand its impact.": "저장소 전반에 걸쳐 분기 및 꼬리표 보호 규칙을 적용해보세요. 규칙 인사이트를 통해 규칙 적용 내역과 영향을 확인할 수 있어요.",
                    "Required reviews": "필수 승인 리뷰",
                        "Ensure that pull requests have a specific number of approving reviews before collaborators can make changes to a protected branch.": "협업자가 보호된 분기에 변경을 가하기 전에 끌어오기 요청에 정해진 수의 승인 리뷰가 있어야 해요.",
                    // 필수 상태 검사
                        "Ensure that all required CI tests are passing before collaborators can make changes to a protected branch.": "협업자가 보호된 분기에 변경을 가하기 전에 모든 필수 CI 테스트가 통과되었는지 확인해보세요.",
                    "GitHub Security Advisories": "GitHub 보안 공지",
                        "Privately discuss, fix, and publish information about security vulnerabilities found in your repository.": "저장소에서 발견된 보안 취약점에 대해 비공개로 논의, 수정, 그리고 정보를 공개해보세요.",
                    "Role-based access control": "역할 기반 접근 제어",
                        "Define users' level of access to your code, data and settings.": "사용자가 코드, 데이터, 설정에 접근할 수 있는 수준을 정의해보세요.",
                    "Required 2FA": "필수 2단계 인증(2FA)",
                        "Use an extra layer of security with two factor authentication (2FA) when logging into GitHub.": "GitHub 로그인 시 2단계 인증(2FA)으로 추가 보안을 사용해보세요.",
                    // 감사 로그
                        "Quickly review the actions performed by members of your organization.": "조직 구성원이 수행한 작업을 빠르게 검토해보세요.",
                    "Enterprises can connect to advanced systems like LDAP and SAML single sign-on (SSO).": "기업은 LDAP와 SAML 싱글 사인온(SSO) 같은 고급 시스템에 연결할 수 있어요.",
                        "Learn more about GitHub Enterprise": "GitHub 엔터프라이즈에 대해 더 알아보기.",

                "Marketplace and integrations": "장터 및 통합",
                    // GitHub 앱
                        "Install apps that integrate directly with GitHub's API to improve development workflows – or build your own for private use or publication in the GitHub Marketplace.": "GitHub API와 직접 통합되어 개발 워크플로우를 개선하는 앱을 설치하거나, 개인 사용 또는 GitHub 장터에 공개할 목적으로 직접 앱을 만들어보세요.",
                    "Status checks": "상태 검사",
                        "Define tests that GitHub automatically runs against code being committed to your repository, and get details about failures and what is causing them.": "저장소에 커밋되는 코드에 대해 GitHub이 자동으로 실행하는 테스트를 정의하고, 실패 원인에 대한 자세한 정보를 확인해보세요.",
                    "Enterprise Server customers create pre-receive hooks to automatically accept or reject a push.": "엔터프라이즈 서버 고객은 프리리시브 훅을 만들어 푸시를 자동으로 승인하거나 거부할 수 있어요.",
                        "Learn more about pre-receive hooks": "프리리시브 훅에 대해 더 알아보기.",

                "Support and deployment": "지원 및 배포",
                    "Community Support": "커뮤니티 지원",
                        "Get help with most of your GitHub questions and issues in our Community Forum.": "GitHub 관련 질문과 이슈에 대해 커뮤니티 포럼에서 도움을 받아보세요.",
                    "Standard Support": "표준 지원",
                        "GitHub Support can help you troubleshoot issues you run into while using GitHub. Get support via the web.": "GitHub 지원이 GitHub 사용 중 발생하는 문제 해결을 도와드려요. 웹을 통해 지원을 받아보세요.",
                    "Enterprises also get Premium Support, invoice billing, and self-hosted deployment.": "엔터프라이즈 고객은 프리미엄 지원, 인보이스 결제, 그리고 자체 호스팅 배포도 이용할 수 있어요.",
                       // "Learn more about GitHub Enterprise": "GitHub 엔터프라이즈에 대해 더 알아보기.",

                // 표 내용
                "per user/month": "사용자당/월",
                "Upgrade to Pro": "전문 버전으로 업그레이드하기",
                "Unlimited": "무제한",
                "$0 spend limit": "$0 지출 한도",
                    "With policies and controls": "정책과 제어 기능 포함",
                "180 core-hours compute/month and 20GB storage": "월 180 코어 시간 컴퓨트와 20GB 저장공간",
                "2,000 minutes/month": "월 2,000 분",
                    "Free for public repositories": "공개 저장소 무료",
                "3,000 minutes/month": "월 3,000 분",
                "Public repositories": "공개 저장소",

        // 조직 설정 - 결제 관리자 초대 '/organizations/<org-login>/billing_managers/new'
            "Billing": "청구",
            "/ Add a billing manager": "/ 결제 관리자 추가하기",
            "A": " ",
            "billing manager": "결제 관리자",
            "is a user who manages the billing settings of your organization.": "조직의 청구 설정을 관리하는 사용자에요.",
            "will": "할 거에요",
            "will not": "하지 않을 거에요",
            "have the ability to:": "다음 작업을 할 수 있어요:",
                "Change the billing plan": "청구 플랜 변경하기",
                "Add, update, or remove payment methods": "결제 수단 추가, 업데이트 또는 제거하기",
                // "": "결제 내역 보기",
                "Download, and receive receipts": "영수증 다운로드 및 수신하기",
                "View a list of billing managers": "결제 관리자 목록 보기",
                "Invite additional billing managers": "추가 결제 관리자 초대하기",
                "Remove other existing billing managers": "다른 기존 결제 관리자 제거하기",
                "Start, modify, or cancel sponsorships": "스폰서십 시작, 수정 또는 취소하기",
            "be able to:": "할 수 있어요:",
                "Create or access repositories in your organization": "조직 내에서 저장소 만들기 또는 접근하기",
                "See private members of your organization": "조직의 비공개 멤버 보기",
                "Be seen in the list of organization members": "조직 멤버 목록에 표시되기",
                "Use the organization’s payment method": "조직의 결제 수단 사용하기",
                "Enable or manage Copilot": "GitHub Copilot 활성화 또는 관리하기",
                "Purchase, edit, or cancel Marketplace subscriptions": "장터 구독 구매, 수정 또는 취소하기",

            "Search by username, full name or email address": "사용자 이름, 전체 이름 또는 이메일 주소로 검색하기",
            "Send invitation": "초대 보내기",

            // 불러오는 중
            "Loading Actions data...": "액션 데이터를 불러오는 중…",
            "Loading Packages data...": "패키지 데이터를 불러오는 중…",
            "Loading Shared Storage data...": "공유 저장공간 데이터를 불러오는 중…",
            "Loading Codespaces data...": "코드스페이스 데이터를 불러오는 중…",
            "Loading usage breakdown…": "사용 내역을 불러오는 중…",


    },
    "regexp": [ // 정규 표현식 번역
        [/The plan change was successful. @([^ ]+) has been updated to the pro yearly plan./, "플랜 변경이 성공적으로 완료되었어요. @$1 님이 프로 연간 플랜으로 업데이트되었어요."],
        [/The plan change was successful. @([^ ]+) has been updated to the pro monthly plan./, "플랜 변경이 성공적으로 완료되었어요. @$1 님이 프로 월간 플랜으로 업데이트되었어요."],
        [/We're preparing your report! We’ll send an email to ([^@]+@[^\n]+) when it’s ready./, "보고서를 준비 중이에요! 준비되면 $1 으로 이메일을 보내드릴게요."], // 상단 알림
        [/Included minutes quota resets? in (\d+) days?./, "포함된 분(minute) 쿼터가 $1일 내에 재설정돼요."],
        [/Data transfer quota resets? in (\d+) days?./, "데이터 전송 쿼터가 $1일 내에 재설정돼요."],
        //[/Included minutes quota resets/, "포함된 분(minute) 쿼터 재설정"],
        [/Included quotas resets? in (\d+) days?./, "포함된 쿼터가 $1일 내에 재설정돼요."],
        [/Bandwidth quota resets? in (\d+) days?./, "대역폭 사용 쿼터가 $1일 내에 재설정돼요."],
        [/In addition to your personal account, you manage (\d+) organizations?./, "개인 계정 외에도, 당신은 $1개의 조직을 관리하고 있어요."],
        [/Leaving it at (\$\d+\.\d{2}) will avoid any extra expenses/, "$1 달러로 제한하면 추가 비용을 피할 수 있어요."],
        [/isn’t a GitHub member/, "GitHub 멤버가 아니에요."], // 조직 설정
        [/of ([\d,]+\.\d{2}) min included/, "/ $1 분"],
        [/(?:GB )?of ([^ ]+) GB(?: included)?/, "/ $1 GB"],
        //[/of ([^ ]+) GB( included)?/, "/ $1 GB"],
        [/of (\d+\.\d{2}) included core hours used/, "/ $1 핵심 시간"],
        [/of (\d+\.\d{2}) included GB-month used/, "/ $1 GB/월"],
        [/Last (\d+) days/, "최근 $1일"],
        [/([^ ]+) support/, "$1 지원"],
        [/Included minutes quota only applies to Ubuntu 2-core, Windows 2-core and macOS 3-core runners\. Windows 2-core and macOS 3-core runners consume included minutes at higher rates\. Your (\d+\.\d+) included minutes used consists of (.*)/, "포함된 분(minute) 쿼터는 Ubuntu 2코어, Windows 2코어 및 macOS 3코어 실행기에만 적용돼요. Windows 2코어와 macOS 3코어 실행기는 포함된 분을 더 빠른 속도로 소모해요. 당신이 사용한 $1 분은 다음으로 구성되어 있어요: $2"],
        [/(\$\d+\.\d{2}) off per month for (\d+) years/, "매월 $1 할인, $2년 동안"],
        [/(\$\d+\.\d{2})\/month/, "$1/월"],
        [/(\$\d+\.\d{2}) off \/ month/, "-$1/월"],
        [/(\$\d+\.\d{2})\/year/, "$1/년"],
        [/(\$\d+\.\d{2}) off \/ year/, "-$1/년"],
        //[/ (Due by|until|On|Expires) (Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?) (\d+), (\d+)/, function(all, opt, month, day, year){
        //    var monthKey = {
        //        "Jan": "1월", "Feb": "2월", "Mar": "3월", "Apr": "4월", "May": "5월", "Jun": "6월", "Jul": "7월", "Aug": "8월", "Sep": "9월", "Oct": "10월", "Nov": "11월", "Dec": "12월"
        //    };
        //    var optKey = {
        //        "Due by": "마감", "until": "까지", "On": "시작", "Expires": "만료"
        //    };
        //    return year + '년' + monthKey[month] + day + '일 ' + optKey[opt];
        //}],
        //[/Due by (.+)/, "$1 마감"],
        [/(Due by|On|Expires) (.+)/, (match, opt, p1) => {
            var optKey = {"Due by": "마감", "On": "시작", "Expires": "만료"};
            const dateRegExp = I18N["ko-KR"]["public"]["time-regexp"];
            const translatedDate = dateRegExp.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), p1);
            return `${translatedDate}` + optKey[opt];
        }],
        [/until (.+)./, (match, p1) => { // p1은 (.+) 이에요.
            const dateRegExp = I18N["ko-KR"]["public"]["time-regexp"];
            const translatedDate = dateRegExp.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), p1);
            return `까지 ${translatedDate}.`; // 여기에 번역 결과를 작성해요.
        }],
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
};
I18N["ko-KR"]["account/billing/history"] = I18N["ko-KR"]["settings/billing"];
I18N["ko-KR"]["orgs/settings/billing"] = I18N["ko-KR"]["settings/billing"];
I18N["ko-KR"]["orgs/billing_managers/new"] = I18N["ko-KR"]["settings/billing"];
I18N["ko-KR"]["orgs/billing/history"] = I18N["ko-KR"]["settings/billing"];
I18N["ko-KR"]["orgs/billing/plans"] = I18N["ko-KR"]["settings/billing"];

I18N["ko-KR"]["settings/emails"] = { // 设置 - 电子邮箱
    "static": { // 静态翻译
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // 이메일 电子邮箱 https://github.com/settings/emails
            // 노란색 경고 상자
            "You have a single verified email associated with your GitHub account. Add an additional verified email address in case you lose access to your primary email.": "사용자님의 GitHub 계정에 인증된 이메일이 하나만 연결되어 있어요. 주 이메일에 접근할 수 없게 될 경우를 대비해 추가 인증 이메일 주소를 등록해보세요.",

            "Email settings": "이메일 설정",
            "Primary": "주 이메일",
            "Unverified email addresses cannot receive notifications or be used to reset your password.": "인증되지 않은 이메일 주소는 알림을 받을 수 없거나 비밀번호 재설정에 사용할 수 없어요.",
            "This email will be used for account-related notifications and can also be used for password resets.": "이 이메일은 계정 관련 알림에 사용되며 비밀번호 재설정에도 활용돼요.",
            "Not visible in emails": "이메일에 표시되지 않음",
            "Visible in emails": "이메일에 표시됨",
                "This email may be used as the 'author' or 'committer' address for web-based Git operations, e.g., edits and merges.": "이 이메일은 웹 기반 Git 작업(예: 편집 및 병합) 시 '작성자' 또는 '커미터' 주소로 사용될 수 있어요.",
            "Receives notifications": "알림 수신",
            "This email address is the default used for GitHub notifications, i.e., replies to issues, pull requests, etc.": "이 이메일 주소는 GitHub 알림의 기본 주소로 사용되며, 예를 들어 이슈나 끌어오기 요청에 대한 답장이 여기에 발송돼요.",
            "At least one email is required.": "최소 하나의 이메일이 필요해요.",
            // 삭제 버튼 경고 메시지
                "At least one verified email is required.": "최소 하나의 인증된 이메일이 필요해요.",
                "Are you sure you want to remove this email from your account? Once removed, commits attributed to this email address will no longer be associated with your account.": "이 이메일을 계정에서 삭제하시겠어요? 삭제되면 이 이메일 주소에 귀속된 커밋은 더 이상 사용자님의 계정과 연결되지 않아요.",
                "Are you sure you want to remove this email from your account? Once removed, commits attributed to this email address will no longer be associated with your account. One of your other emails will become your primary address.": "이 이메일을 계정에서 삭제하시겠어요? 삭제되면 이 이메일 주소에 귀속된 커밋은 더 이상 사용자님의 계정과 연결되지 않고, 다른 이메일 중 하나가 주 이메일로 설정돼요.",

            "At least one non-backup email is required.": "최소 하나의 백업이 아닌 이메일이 필요해요.",
            "Backup": "백업 이메일",
            "This email will be used as an additional destination for security-relevant account notifications and can also be used for password resets.": "이 이메일은 보안 관련 계정 알림의 추가 수신처로 사용되며 비밀번호 재설정에도 활용돼요.",
            "Add email address": "이메일 추가하기",
            "Email address": "이메일 주소",
                // 상단 알림
                "Resend verification email": "인증 이메일 재전송하기",
                "Your email was verified.": "사용자님의 이메일이 인증되었어요!",

            "Primary email address": "주 이메일 주소",
            // 이메일 비공개 관련
            "will be used for account-related notifications and can be used for password resets.": "계정 관련 알림에 사용되며 비밀번호 재설정에도 활용돼요.",
            // 이메일 개인정보 보호
            "Because you have email privacy enabled,": "사용자님께서 이메일 개인정보 보호 기능을 사용 중이므로,",
            "will be used for account-related notifications as well as password resets.": "계정 관련 알림과 비밀번호 재설정에 사용돼요.",
            "will be used for web-based Git operations, e.g., edits and merges.": "웹 기반 Git 작업(예: 편집 및 병합)에 사용돼요.",
            // 상단 알림
            "Your primary email was changed to": "사용자님의 주 이메일이 다음으로 변경되었어요:",
            ". Your default notification email address is still set to": "。기본 알림 이메일 주소는 여전히 다음으로 설정되어 있어요:",
            ". Would you like to update that as well?": "。같이 업데이트할까요?",
            "Yes， update my notification email": "네, 내 알림 이메일 업데이트하기",

            "Backup email address": "백업 이메일 주소",
            "Your backup GitHub email address will be used as an additional destination for security-relevant account notifications and can also be used for password resets.": "사용자님의 백업 GitHub 이메일 주소는 보안 관련 계정 알림의 추가 수신처로 사용되며 비밀번호 재설정에도 활용돼요.",
            "Allow all verified emails": "모든 인증된 이메일 허용하기",
                // 상단 알림
                "All verified emails can now be used for password resets.": "모든 인증된 이메일이 이제 비밀번호 재설정에 사용될 수 있어요.",
            "Only allow primary email": "주 이메일만 허용하기",
                // 상단 알림
                "Only your primary email address can now be used for password resets.": "이제 주 이메일만 비밀번호 재설정에 사용될 수 있어요.",
            "Please add a verified email, in addition to your primary email, in order to choose a backup email address.": "백업 이메일 주소를 선택하기 위해 주 이메일 외에 인증된 이메일을 추가해보세요.",

            "Keep my email addresses private": "내 이메일 주소 비공개 유지하기",
                // 상단 알림
                "Your primary email address is now public. To select which email to display on your profile, visit": "사용자님의 주 이메일 주소가 이제 공개되었어요. 프로필에 표시할 이메일을 선택하려면 다음을 방문해주세요:",
                "profile settings.": "프로필 설정.",
                "Your primary email address is now private. If you previously made your email public, we’ve removed it from your profile.": "사용자님의 주 이메일 주소가 이제 비공개로 변경되었어요. 이전에 이메일을 공개하셨다면, 프로필에서 삭제되었어요.",
            "We’ll remove your public profile email and use": "공개된 프로필 이메일은 삭제하고,",
            "when performing web-based Git operations (e.g. edits and merges) and sending email on your behalf. If you want command line Git operations to use your private email you must": "웹 기반 Git 작업(예: 편집 및 병합)과 사용자님을 대신하여 이메일 전송 시 이 이메일을 사용할 거예요. 명령줄 Git 작업에서도 비공개 이메일을 사용하고 싶으시다면,",
            "set your email in Git": "Git에서 사용자님의 이메일을 설정해주세요.",
            "Previously authored commits associated with a public email will remain public.": "이전에 공개 이메일로 작성된 커밋은 그대로 공개 상태로 유지돼요.",

            "Block command line pushes that expose my email": "내 이메일이 노출되는 명령줄 푸시 차단하기",
                // 상단 알림
                "Commits pushed with a private email will no longer be blocked.": "비공개 이메일로 푸시된 커밋은 더 이상 차단되지 않아요.",
                "Commits pushed with a private email will now be blocked and you will see a warning.": "비공개 이메일로 푸시된 커밋은 이제 차단되며, 경고 메시지가 표시될 거예요.",
            "When you push to GitHub, we’ll check the most recent commit. If the author email on that commit is a private email on your GitHub account, we will block the push and warn you about exposing your private email.": "사용자님이 GitHub에 푸시할 때, 가장 최근의 커밋을 확인할 거예요. 만약 그 커밋의 작성자 이메일이 사용자님의 GitHub 계정에 등록된 비공개 이메일이라면, 푸시를 차단하고 비공개 이메일 노출에 대해 경고할 거예요.",

            "Email preferences": "이메일 환경설정",
                "Subscriptions through our various marketing platforms. Each email address has its own subscriptions.": "저희 다양한 마케팅 플랫폼을 통한 구독이에요. 각 이메일 주소마다 별도의 구독 설정이 있어요.",
                "Manage": "관리하기",

        // 구독 환경설정 https://github.com/settings/emails/subscriptions
            "Subscription preferences for": "구독 환경설정 대상:",
            "⏳Please wait while we find your subscriptions...⌛": "⏳구독 정보를 찾는 중이에요...⌛",
            "No subscriptions found": "구독 정보가 없어요.",
            "Save subscription preferences": "구독 환경설정 저장하기",
            "Back to email settings": "이메일 설정으로 돌아가기",
            "To stop receiving emails for the topics below, uncheck any topics you don't want to receive, then click Save subscription preferences": "아래 주제의 이메일 수신을 중단하려면, 받고 싶지 않은 주제의 선택을 해제한 후 ‘구독 환경설정 저장하기’를 클릭해주세요.",
            "General info and offers from GitHub": "GitHub의 일반 정보 및 혜택",
            "Get tips, solutions and exclusive offers from GitHub about products, services and events we think you might find interesting.": "사용자님께서 관심을 가지실 만한 제품, 서비스 및 이벤트에 대한 GitHub의 팁, 솔루션, 그리고 독점 혜택을 받아보세요.",
            "Unsubscribe from all topics": "모든 주제 구독 취소하기",
    },
    "regexp": [ // 정규식 번역
        [/This email will not be used as the 'from' address for web-based Git operations, e\.g\., edits and merges. We will instead use ([^@]+@users.noreply.github.com)\./, "이 전자메일은 웹 기반 Git 작업(예: 편집 및 병합)에서 ‘발신자’ 주소로 사용되지 않아요. 대신 $1 을 사용해요."],
        [/Your primary email was changed to ([^@]+@[^\n]+)\./, "사용자님의 주 전자메일 주소가 $1 로 변경되었어요."],
        [/Subscription preferences for ([^@]+@[^\n]+)/, "$1 의 구독 환경설정"],
        [/We sent a verification email to ([^@]+@[^\s]+)\. Please follow the instructions in it\./, "저희가 $1 로 인증 전자메일을 보냈어요. 전자메일에 있는 안내를 따라주세요."],
        [/Delete ([^@]+@[^\n]+)/, "삭제하기: $1"],
        [/Error adding ([^@]+@[^:]+): email is already in use/, "$1 의 전자메일이 이미 사용 중이에요."],
    ],
};

I18N["ko-KR"]["settings/security"] = { // 설정 - 비밀번호와 인증
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],
        ...I18N["ko-KR"]["confirm-access"]["static"],

        // 비밀번호와 인증 - 계정 보안 https://github.com/settings/security
            "Change password": "비밀번호 변경하기",
            "Old password": "이전 비밀번호",
            "New password": "새 비밀번호",
            "Confirm new password": "새 비밀번호 확인하기",
            "Make sure it's": "반드시 확인해 주세요:",
            "at least 15 characters": "최소 15자 이상이어야 해요",
            "OR": " 또는",
            "at least 8 characters": "최소 8자 이상이어요",
            "including a number": "숫자를 포함해 주세요",
            "and a lowercase letter": "소문자도 포함해 주세요",
            "Password is too short (minimum is 8 characters)": "비밀번호가 너무 짧아요 (최소 8자)",
            "Password is too short (minimum is 8 characters), needs at least 1 lowercase letter, and is in a list of passwords commonly used on other websites": "비밀번호가 너무 짧아요 (최소 8자), 최소 1개의 소문자가 필요하고, 다른 웹사이트에서 자주 사용되는 비밀번호 목록에 있어요",
            "Password is too short (minimum is 8 characters), needs at least 1 lowercase letter, cannot include your login, and is in a list of passwords commonly used on other websites": "비밀번호가 너무 짧아요 (최소 8자), 최소 1개의 소문자가 필요하며, 로그인 정보를 포함할 수 없고, 다른 웹사이트에서 자주 사용되는 비밀번호 목록에 있어요",
            "Password is too short (minimum is 8 characters), needs at least 1 number, cannot include your login, and is in a list of passwords commonly used on other websites": "비밀번호가 너무 짧아요 (최소 8자), 최소 1개의 숫자가 필요하며, 로그인 정보를 포함할 수 없고, 다른 웹사이트에서 자주 사용되는 비밀번호 목록에 있어요",
            "Password is too short (minimum is 8 characters) and is in a list of passwords commonly used on other websites": "비밀번호가 너무 짧아요 (최소 8자) 그리고 다른 웹사이트에서 자주 사용되는 목록에 있어요",
            "Password needs at least 1 lowercase letter and is in a list of passwords commonly used on other websites": "비밀번호에는 최소 1개의 소문자가 필요하며, 다른 웹사이트에서 자주 사용되는 목록에 있어요",
            "Password is in a list of passwords commonly used on other websites": "비밀번호가 다른 웹사이트에서 자주 사용되는 목록에 있어요",
            "Update password": "비밀번호 업데이트하기",
            "I forgot my password": "비밀번호를 잊어버렸어요",

            "Strengthen your account by ensuring your password is strong.": "비밀번호가 강력한지 확인하여 계정을 안전하게 지켜주세요.",
            "Learn more about creating a strong password": "강력한 비밀번호 만드는 방법을 더 알아보세요.",

            "Passkeys": "패스키",
                "Passwordless sign-in with passkeys": "패스키로 비밀번호 없이 로그인하기",
                "Passkeys are webauthn credentials that validate your identity using touch, facial recognition, a device password, or a PIN. They can be used as a password replacement or as a 2FA method. Passkeys can be used for sign-in as a simple and secure alternative to your password and two-factor credentials.": "패스키는 터치, 얼굴 인식, 기기 비밀번호 또는 PIN으로 사용자의 신원을 확인하는 WebAuthn 자격증명이에요. 비밀번호 대신 또는 2단계 인증 수단으로 사용할 수 있어요. 패스키는 비밀번호와 2단계 인증 자격증명의 간단하고 안전한 대안으로 로그인할 때 사용할 수 있어요.",
                "This browser or device does not fully support passkeys - you may be able to use a passkey from another device.": "이 브라우저 또는 기기는 패스키를 완전히 지원하지 않아요 - 다른 기기의 패스키를 사용해 보실 수 있어요.",
                "This browser or device is reporting partial passkey support, but you may be able to use a passkey from a nearby device.": "이 브라우저 또는 기기는 패스키를 부분적으로 지원하지만, 가까운 다른 기기의 패스키를 사용해 보실 수 있어요.",
                "Add a passkey": "패스키 추가하기",

                "Passkeys are webauthn credentials that validate your identity using touch, facial recognition, a device password, or a PIN. They can be used as a password replacement or as a 2FA method.": "패스키는 터치, 얼굴 인식, 기기 비밀번호 또는 PIN으로 사용자의 신원을 확인하는 WebAuthn 자격증명이에요. 비밀번호 대신 또는 2단계 인증 방법으로 사용할 수 있어요.",
                "Learn more about passkeys": "패스키에 대해 더 알아보세요.",

                "Your passkeys": "내 패스키",
                "| Last used": "| 마지막 사용",
                // | Last used less than 1 小时之前
                "Edit passkey nickname": "패스키 별칭 수정하기",
                // [/Delete `([^ ]+)` passkey/, "删除 “$1” 通行密钥"],

                // 삭제 키 대화상자
                    "Delete passkey?": "패스키 삭제할까요?",
                    // [/Are you sure you want to delete your `([^ ]+)` passkey?/, "您确定要删除您的 “$1” 通行密钥吗？"],
                    "You will no longer be able to use it to sign-in to your account.": "이 패스키로 더 이상 계정에 로그인할 수 없게 돼요.",
                    "Note: You may continue to see this passkey as an option during sign-in until you also delete it from your browser, device or associated account's password management settings.": "참고: 브라우저, 기기 또는 관련 계정의 비밀번호 관리 설정에서 삭제하기 전까지 로그인 옵션에 계속 표시될 수 있어요.",
                    "Deleting…": "삭제 중…",

            // 2단계 인증
                // 상단 알림
                    "You can now manage your two-factor authentication methods from this page.": "이 페이지에서 2단계 인증 방법을 관리할 수 있어요.",
                    "Two-factor authentication successfully disabled.": "2단계 인증이 성공적으로 비활성화되었어요.",
                    "SMS/Text message successfully configured.": "SMS/문자 메시지가 성공적으로 설정되었어요.",

            "Two-factor authentication": "2단계 인증",
                "Two-factor authentication is not enabled yet.": "아직 2단계 인증이 활성화되지 않았어요.",
                "Enable two-factor authentication": "2단계 인증 활성화하기",

                "Because of your contributions on GitHub, two-factor authentication is required for your account. Thank you for helping keep the ecosystem safe!": "GitHub에 기여해 주셔서, 사용자님의 계정에 2단계 인증이 필요해요. 생태계의 안전을 지켜주셔서 감사합니다!",
                "Because of your contributions on GitHub, two-factor authentication will be required for your account starting": "GitHub에 기여해 주셔서, 앞으로 사용자님의 계정에는 2단계 인증이 필요할 거예요:",
                ". Thank you for helping keep the ecosystem safe!": " 생태계의 안전을 지켜주셔서 감사합니다!",
                "Learn more about our two-factor authentication initiative": "2단계 인증 이니셔티브에 대해 더 알아보세요.",

                "Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.": "2단계 인증은 단순한 비밀번호 외에도 추가적인 보안 계층을 제공해요.",
                "Learn more about two-factor authentication": "2단계 인증에 대해 더 알아보세요.",


                "Enable": "활성화하기",
                "Enabled": "활성화됨",
                    "Two-factor authentication is required for at least one organization or enterprise account you're affiliated with.": "사용자님가 소속된 조직 또는 기업 계정 중 최소 하나에는 2단계 인증이 필요해요.",
                "Disable": "비활성화하기",

            "Preferred 2FA method": "선호하는 2FA 방식",
                "Set your preferred method to use for two-factor authentication when signing into GitHub.": "GitHub 로그인 시 사용할 선호하는 2단계 인증 방식을 설정해 주세요.",

            "Two-factor methods": "2단계 인증 방법들",
                "Configured": "설정됨",

                "Authenticator app": "인증 앱",
                    "Use an authentication app or browser extension to get two-factor authentication codes when prompted.": "인증 앱이나 브라우저 확장을 사용하여 2단계 인증 코드를 받아보세요.",
                    "Use an authentication app or browser extension to generate one-time codes.": "인증 앱이나 브라우저 확장을 사용하여 일회용 코드를 생성해 보세요.",

                    "Manage Authenticator app": "인증 앱 관리하기",

                    "Authenticator apps and browser extensions like": "예를 들어, 인증 앱 및 브라우저 확장들은",
                    ", etc. generate one-time passwords that are used as a second factor to verify your identity when prompted during sign-in.": "등이 로그인 시 2단계 인증으로 사용되는 일회용 비밀번호를 생성해요.",

                    "Scan the QR code": "QR 코드 스캔하기",
                    "Re-scan the QR code": "QR 코드 재스캔하기",
                    "Use an authenticator app or browser extension to scan.": "인증 앱이나 브라우저 확장을 사용하여 스캔해 보세요.",
                    "Learn more about enabling 2FA": "2단계 인증 활성화에 대해 더 알아보세요.",

                    "Unable to scan? You can use the": "스캔이 어려우신가요? 대신",
                    "setup key": "설정 키",
                    "to manually configure your authenticator app.": "를 사용하여 인증 앱을 수동으로 설정해 보세요.",
                        "Your two-factor secret": "내 2단계 인증 비밀키",

                    "Verify the code from the app": "앱에서 받은 코드를 확인해 보세요.",
                    "Two-factor code verification failed. Please try again.": "2단계 인증 코드 확인에 실패했어요. 다시 시도해 주세요.",

                "SMS/Text message": "SMS/문자 메시지",
                    "Manage SMS/Text message": "SMS/문자 메시지 관리하기",

                    "Get one-time codes sent to your phone via SMS to complete authentication requests.": "인증 요청을 완료하기 위해 SMS로 휴대폰에 일회용 코드를 받아보세요.",

                    "Get authentication codes by SMS on your mobile phone when signing into GitHub. Make sure that": "GitHub 로그인 시 SMS로 인증 코드를 받아보세요. 반드시",
                    "your country or region is supported": "해당 국가 또는 지역이 지원되는지 확인해 주세요.",
                    "for SMS delivery.": "SMS 전송을 위해요.",

                    "Verify account": "계정 확인하기",
                    "Before setting up SMS, please verify that you're a human.": "SMS 설정 전에 본인 확인을 해 주세요.",

                    "Country code": "국가 코드",
                    "Your phone number": "휴대폰 번호",
                    "Send authentication code": "인증 코드 보내기",
                    "Sent. It may take a minute for the SMS to arrive.": "보냈어요. SMS 도착까지 1분 정도 걸릴 수 있어요.",
                    "Verify the code sent to your phone": "휴대폰으로 받은 코드를 확인해 주세요.",

                    // [/You will receive one-time codes at this phone number:/, "您将通过以下电话号码收到一次性验证码："], // 이미 설정된 SMS/문자 메시지

                "Security keys": "보안 키",
                    "Security keys are webauthn credentials that can only be used as a second factor of authentication.": "보안 키는 WebAuthn 자격증명으로, 오직 2단계 인증의 두 번째 요소로만 사용할 수 있어요.",
                    "Hide": "숨기기",
                    "No security keys": "보안 키가 없어요.",

                    "Register new security key": "새 보안 키 등록하기",
                    "Enter a nickname for this security key": "이 보안 키의 별칭을 입력해 주세요.",
                    "Waiting for input from browser interaction...": "브라우저 상호작용으로 입력을 기다리고 있어요...",
                    "Security key registration failed.": "보안 키 등록에 실패했어요.",
                    "Try again": "다시 시도해 주세요.",

                "GitHub Mobile": "GitHub Mobile",
                    "GitHub Mobile can be used for two-factor authentication by installing the GitHub Mobile app and signing in to your account.": "GitHub Mobile 앱을 설치하고 로그인하면 2단계 인증에 사용할 수 있어요.",
                    "Manage GitHub Mobile": "GitHub Mobile 관리하기",

                    // [/(\d+) devices?/, "$1 设备"], // 설정 -> 비밀번호와 인증 페이지
                    "Show": "보이기",

            "Recovery options": "복구 옵션",
                "Your two-factor authentication recovery codes have not been downloaded or printed in the last one year. Make sure your recovery codes are up-to-date by viewing and downloading or printing them again.": "지난 1년 동안 2단계 인증 복구 코드를 다운로드하거나 인쇄하지 않으셨어요. 복구 코드를 다시 확인하고 다운로드 또는 인쇄하여 최신 상태인지 확인해 주세요.",

                "Recovery codes": "복구 코드",
                    "Recovery codes can be used to access your account in the event you lose access to your device and cannot receive two-factor authentication codes.": "복구 코드는 기기에 접근할 수 없거나 2단계 인증 코드를 받을 수 없을 때 계정에 접근하는 데 사용해요.",
                    "Viewed": "확인됨",
                    "View": "보기",

    },
    "regexp": [ // 정규식 번역
        [/(\d+) devices?/, "$1 개의 기기"],
        [/You will receive one-time codes at this phone number:/, "이 휴대폰 번호로 일회용 코드를 받아보실 거예요:"],
        [/Delete `([^ ]+)` passkey/, "“$1” 패스키 삭제하기"],
        [/Are you sure you want to delete your `([^ ]+)` passkey?/, "정말로 “$1” 패스키를 삭제하시겠어요?"],
    ],
};

I18N["ko-KR"]["settings/auth"] = {
    "static": { // 정적 번역

        // 복구 코드 확인 https://github.com/settings/auth/recovery-codes
            // 상단 알림
                "New two-factor recovery codes successfully generated. Save them in a safe, durable location and discard your previous codes.": "새로운 이중 인증 복구 코드를 성공적으로 생성했어요. 안전하고 견고한 곳에 저장하시고 이전 코드는 폐기해 주세요.", // 새 복구 코드 생성

            "Two-factor recovery codes": "이중 인증 복구 코드",
                "Recovery codes can be used to access your account in the event you lose access to your device and cannot receive two-factor authentication codes.": "기기에 접근할 수 없거나 이중 인증 코드를 받지 못하는 경우, 복구 코드를 사용해 사용자님의 계정에 접근할 수 있어요.",
                "Your two-factor authentication recovery codes have not been downloaded or printed in the last one year. Make sure your recovery codes are up-to-date by downloading or printing them again.": "사용자님의 이중 인증 복구 코드는 지난 1년 동안 다운로드나 인쇄가 이루어지지 않았어요. 복구 코드가 최신 상태인지 다시 다운로드하거나 인쇄해 보세요.",

            "Recovery codes": "복구 코드",
                "Keep your recovery codes as safe as your password. We recommend saving them with a password manager such as": "복구 코드를 비밀번호만큼 안전하게 보관해 주세요. 예를 들어, 비밀번호 관리자를 사용하여 저장하는 것을 권장해요.",
                "Keep your recovery codes in a safe spot.": "복구 코드를 안전한 곳에 보관해 주세요.",
                "These new codes have replaced your old codes. Save them in a safe spot.": "이 새로운 코드는 기존 코드를 대체했어요. 안전한 곳에 보관해 주세요.", // 새 복구 코드 생성
                "These codes are the last resort for accessing your account in case you lose your password and second factors. If you cannot find these codes, you": "이 코드는 비밀번호와 이중 인증 수단을 잃어버렸을 때 계정에 접근할 수 있는 마지막 수단이에요. 만약 이 코드를 찾지 못하신다면,",
                "will": "하시게 될 거예요",
                "lose access to your account.": "계정에 접근하지 못하게 될 거예요.",

                "Download": "다운로드하기",
                "Print": "인쇄하기",
                "Copy": "복사하기",

            "Generate new recovery codes": "새 복구 코드 생성하기",
                "When you generate new recovery codes, you must download or print the new codes.": "새 복구 코드를 생성할 때는 반드시 새 코드를 다운로드하거나 인쇄해 주세요.",
                "Your old codes won't work anymore.": "이전 코드는 더 이상 사용하실 수 없어요.",

            "Back to settings": "설정으로 돌아가기",
    },
    "regexp": [ // 정규 표현식 번역
    ],
};

I18N["ko-KR"]["settings/sessions"] = {
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // 세션 세부정보 https://github.com/settings/sessions
            "Web sessions": "웹 세션",
            "GitHub Mobile can be used to verify your identity when signing in from a new device and as a two-factor authentication method.": "새로운 기기에서 로그인할 때 사용자님의 신원을 확인하고, 이중 인증 수단으로 GitHub Mobile을 사용할 수 있어요.",
            "Learn more about authentication with GitHub Mobile.": "GitHub Mobile 인증에 대해 더 알아보세요.",
            "To get started, install GitHub Mobile for": "시작하려면, GitHub Mobile을 설치해 보세요:",
            "and sign in to your account.": "그리고 사용자님의 계정에 로그인해 주세요.",

            "This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.": "사용자님의 계정에 로그인한 기기 목록이에요. 확인되지 않는 세션은 취소해 주세요.",
            "See more": "더 보기",
            "Your current session": "현재 세션",
            "Last accessed on": "마지막 접근일:",

            "GitHub Mobile sessions": "GitHub Mobile 세션",
            "This is a list of devices that have logged into your account via the GitHub Mobile app. Revoke any session that you do not recognize or you can": "GitHub Mobile 앱을 통해 사용자님의 계정에 로그인한 기기 목록이에요. 확인되지 않는 세션은 취소하시거나",
            "revoke": "취소하기",
            "your GitHub Mobile app authorization to sign out of all your devices.": "사용자님의 GitHub Mobile 앱 권한을 취소하여 모든 기기에서 로그아웃할 수 있어요.",
            "Revoke": "취소하기",
            "Registered -": "등록일 -",
            "Last accessed -": "마지막 접근 -",
            "Last used for authentication -": "마지막 인증 사용 -",
            "Never used": "사용하지 않음",

        // 세션 세부정보 https://github.com/settings/sessions/<id>
            "Session details": "세션 세부정보",
            "Revoke session": "세션 취소하기",
            "Device:": "기기:",
            "Last location:": "마지막 위치:",
            "Signed in:": "로그인:",
            "View all sessions": "모든 세션 보기",
    },
    "regexp": [ // 정규 표현식 번역
        [/Seen in/, "로그인한 곳:"],
    ],
};

I18N["ko-KR"]["settings/keys"] = { // 설정 - SSH 및 GPG 공개 키
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // SSH와 GPG 키 https://github.com/settings/keys
            "SSH keys": "SSH 키",
            "New SSH key": "새 SSH 키",
            "Authentication keys": "인증 키",
            "There are no SSH keys associated with your account.": "사용자님의 계정과 연결된 SSH 키가 없어요.",
            "This is a list of SSH keys associated with your account. Remove any keys that you do not recognize.": "사용자님의 계정과 연결된 SSH 키 목록이에요. 확인되지 않는 키는 제거해 주세요.",
            "Last used within the last week": "지난 주 내 마지막 사용",
            "Check out our guide to": "다음 가이드를 확인해 보세요:",
            "connecting to GitHub using SSH keys": "SSH 키를 사용하여 GitHub에 연결하기",
            "or troubleshoot": "또는 문제 해결하기:",
            "common SSH problems": "일반적인 SSH 문제들",

            "GPG keys": "GPG 키",
            "New GPG key": "새 GPG 키",
            "There are no GPG keys associated with your account.": "사용자님의 계정과 연결된 GPG 키가 없어요.",
            "This is a list of GPG keys associated with your account. Remove any keys that you do not recognize.": "사용자님의 계정과 연결된 GPG 키 목록이에요. 확인되지 않는 키는 제거해 주세요.",

            "Email address:": "이메일 주소:",
            "Key ID:": "키 ID:",
            "Subkeys:": "서브키:",
            "Added": "추가됨",

            "Learn how to": "방법 알아보기:",
            "generate a GPG key and add it to your account": "GPG 키를 생성하여 사용자님의 계정에 추가하기",

            "Vigilant mode": "경계 모드",
            "Flag unsigned commits as unverified": "서명되지 않은 커밋을 미인증으로 표시하기",
            "This will include any commit attributed to your account but not signed with your GPG or S/MIME key.": "사용자님의 계정에 속하지만 GPG 또는 S/MIME 키로 서명되지 않은 커밋이 모두 포함돼요.",
            "Note that this will include your existing unsigned commits.": "기존의 서명되지 않은 커밋도 포함됨을 유의해 주세요.",
            "Learn about vigilant mode": "경계 모드에 대해 알아보세요",

            // SSH 키 삭제 대화상자
            "Are you sure you want to delete this SSH key?": "이 SSH 키를 삭제하시겠어요?",
            "This action": "이 작업은",
            "CANNOT": "취소할 수 없어요",
            "be undone. This will permanently delete the SSH key and if you’d like to use it in the future, you will need to upload it again.": "되돌릴 수 없어요. 이 작업은 SSH 키를 영구적으로 삭제하며, 나중에 사용하시려면 다시 업로드하셔야 해요.",
            "I understand, delete this SSH key": "이해했어요, 이 SSH 키 삭제하기",

            // GPG 키 삭제 대화상자
            "Are you sure you want to delete this GPG key?": "이 GPG 키를 삭제하시겠어요?",
            "be undone. This will permanently delete the GPG key, and if you’d like to use it in the future, you will need to upload it again.": "되돌릴 수 없어요. 이 작업은 GPG 키를 영구적으로 삭제하며, 나중에 사용하시려면 다시 업로드하셔야 해요.",
            "Any commits you signed with this key will become unverified after removing it.": "이 키로 서명한 커밋은 삭제 후 미인증 상태로 표시돼요.",
            "I understand, delete this GPG key": "이해했어요, 이 GPG 키 삭제하기",
            "Okay, you have successfully deleted that key.": "네, 해당 키를 성공적으로 삭제하셨어요.",

            // 상단 알림
            "Key is invalid. You must supply a key in OpenSSH public key format": "키가 유효하지 않아요. OpenSSH 공개 키 형식의 키를 제공해 주세요.",
            "We got an error doing that.": "작업 중 오류가 발생했어요.",
            "We got an error adding your GPG key. Please verify the input is a valid GPG key.": "GPG 키 추가 중 오류가 발생했어요. 입력한 값이 유효한 GPG 키인지 확인해 주세요.",

    },
    "regexp": [ // 정규 표현식 번역
    ],
};

I18N["ko-KR"]["settings/ssh"] = { // 설정 - SSH 및 GPG 공개 키 - SSH 공개 키 추가
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // SSH 공개 키 추가 https://github.com/settings/ssh/new
            "Add new SSH Key": "새 SSH 키 추가하기",
            "Title": "제목",
            "Key type": "키 유형",
                "Authentication Key": "인증 키",
                "Signing Key": "서명 키",
            "Key": "키",
            "Add SSH key": "SSH 키 추가하기",

    },
    "regexp": [ // 정규 표현식 번역
    ],
};

I18N["ko-KR"]["settings/gpg"] = { // 설정 - SSH 및 GPG 공개 키 - GPG 공개 키 추가
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // GPG 공개 키 추가 https://github.com/settings/gpg/new
            "Add new GPG key": "새 GPG 키 추가하기",
            "Title": "제목",
            "Key": "키",
            "Add GPG key": "GPG 키 추가하기",

    },
    "regexp": [ // 정규 표현식 번역
    ],
};

I18N["ko-KR"]["settings/organizations"] = { // 설정 - 조직
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // Organizations 조직 https://github.com/settings/organizations
            "You are not a member of any organizations.": "사용자님은 아직 어떠한 조직에도 소속되어 있지 않아요.",
            
            "Owner": "소유자",
            "Member": "멤버",
            "Compare plans": "요금제 비교하기",
            "Leave": "탈퇴하기",
            "Start free for 30 days": "30일 무료체험하기",
            
            "Transform account": "계정 전환하기",
            "You cannot transform this account into an organization until you leave all organizations that you’re a member of.": "가입하신 모든 조직을 탈퇴하시기 전에는 이 계정을 조직으로 전환할 수 없어요.",
            "You cannot transform this account into an organization because you have an active GitHub Sponsors account.": "활성화된 GitHub 스폰서 계정이 있어서 이 계정을 조직으로 전환할 수 없어요.",
            "Account Transformation Warning": "계정 전환 경고",
            "What you are about to do is an irreversible and destructive process. Please be aware:": "앞으로 진행할 작업은 되돌릴 수 없고 파괴적인 과정이에요. 확인해 주세요:",
            "Any user-specific information (OAuth tokens, SSH keys, Job Profile, etc) will be erased": "사용자별 정보(OAuth 토큰, SSH 키, 직업 프로필 등)는 모두 삭제돼요.",
            "You will no longer be able to create or modify gists owned by the converted personal account": "전환된 개인 계정에 속한 gists를 더 이상 생성하거나 수정할 수 없어요.",
            "create a new personal account": "새 개인 계정 만들기",
            "The total amount of collaborators across private repositories will be the total amount of seats for the organization": "비공개 저장소의 협업자 총 수가 조직의 총 좌석 수가 돼요."
    },
    "regexp": [ // 정규식 번역
        [/Turn ([^ ]+) into an organization/, "$1 을(를) 조직으로 전환하기"],
        [/You will no longer be able to sign in to ([^ ]+) \(all administrative privileges will be bestowed upon the owners you choose\)/, "사용자님은 더 이상 $1 에 로그인할 수 없어요 (모든 관리 권한은 선택하신 소유자에게 부여돼요)"],
        [/Any commits and comments credited to ([^ ]+) will no longer be linked to this GitHub account/, "$1 에 기인한 모든 커밋과 댓글은 더 이상 이 GitHub 계정과 연동되지 않아요"],
        [/Any GitHub Apps installed on ([^ ]+) will be uninstalled/, "$1 에 설치된 모든 GitHub 앱이 제거될 거예요"],
        [/If you are using ([^ ]+) as a personal account, you should/, "만약 $1 을 개인 계정으로 사용 중이시라면, 조직으로 전환하기 전에"],
        [/before transforming ([^ ]+) into an organization./, " $1 을 조직으로 전환하기 전에요."],
        [/Outside collaborator on (\d+) repositor(y|ies)/, "$1 개의 저장소에 대한 외부 협업자"],
        [/Member and collaborator on (\d+) repositor(y|ies)/, "$1 개의 저장소에 대한 멤버 및 협업자"],
        [/Are you positive you want to leave ([^ ]+)\? You will lose access to all repositories and teams./, "정말 $1 을 탈퇴하시겠어요? 모든 저장소와 팀에 대한 접근 권한을 잃게 돼요."],
        [/Are you positive you want to leave ([^ ]+)\? You will lose access to all repositories./, "정말 $1 을 탈퇴하시겠어요? 모든 저장소에 대한 접근 권한을 잃게 돼요."]
    ],
};

I18N["ko-KR"]["settings/enterprises"] = { // 설정 - 기업
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // 企业版 https://github.com/settings/enterprises
        "Enterprises": "기업",
        "You don't have any enterprises": "사용자님은 아직 어떠한 기업에도 가입되어 있지 않아요.",
        "Designed for businesses or teams who collaborate on GitHub.com": "GitHub.com에서 협업하는 기업이나 팀을 위해 설계되었어요.",
        
        "Start a free trial": "무료 체험 시작하기",
        "Learn more about enterprises": "기업에 대해 더 알아보기"
    },
    "regexp": [ // 정규식 번역
    ],
};

I18N["ko-KR"]["settings/blocked_users"] = { // 설정 - 차단된 사용자
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // Blocked users 차단된 사용자 https://github.com/settings/blocked_users
            "Block a user": "사용자 차단하기",
            "Blocking a user prevents the following on all your repositories:": "사용자 차단 시, 모든 저장소에서 아래 작업들이 제한돼요:",
            "opening or commenting on issues or pull requests": "이슈나 끌어오기 요청 열기 및 댓글 달기",
            "starring, forking, or watching": "별표, 포크 또는 워칭하기",
            "adding or editing wiki pages": "Wiki 페이지 추가나 편집하기",
            "Additionally, blocked users are not able to:": "추가로, 차단된 사용자는 아래 작업을 할 수 없어요:",
            "invite you as a collaborator to their repositories": "사용자님을 그들의 저장소 협업자로 초대하기",
            "follow your account’s public activity": "사용자님의 공개 활동 팔로우하기",
            "send you notifications by @mentioning your username in public repositories": "공개 저장소에서 사용자님을 @언급하여 알림 보내기",
            "Search by username, full name or email address": "사용자명, 전체 이름 또는 이메일 주소로 검색하기",
                "Learn more about blocking a user": "사용자 차단에 대해 더 알아보기",
            "Block user": "사용자 차단하기",
            "You have not blocked any users.": "아직 차단한 사용자가 없어요.",
            "Unblock": "차단 해제하기",
            "Warn me when a blocked user is a prior contributor to a repository": "차단한 사용자가 저장소에 이전에 기여한 경우 경고해 주세요",
            "On repositories you haven’t contributed to yet, we’ll warn you when a user you’ve blocked has previously made contributions.": "아직 사용자님이 기여하지 않은 저장소에서, 차단한 사용자가 이전에 기여한 기록이 있으면 경고해 드려요."
    },
    "regexp": [ // 정규식 번역
    ],
};

I18N["ko-KR"]["settings/interaction_limits"] = { // 설정 - 상호작용 제한
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // Interaction limits 상호작용 제한 https://github.com/settings/interaction_limits
            "Temporary interaction limits": "일시적인 상호작용 제한",
            "Temporarily restrict which external users can interact with your repositories (comment, open issues, or create pull requests) for a configurable period of time.": "설정 가능한 기간 동안 외부 사용자가 사용자님의 저장소와 상호작용(댓글 달기, 이슈 열기, 끌어오기 요청 생성)을 할 수 없도록 일시적으로 제한해요.",
            "This may be used to force a \"cool-down\" period during heated discussions or prevent unwanted interactions.": "격렬한 토론 중에 휴식 시간을 강제하거나 원치 않는 상호작용을 방지하는 데 사용할 수 있어요.",
            "Interaction limits may already exist in your account's": "사용자님의 계정에 이미 상호작용 제한이 있을 수 있어요",
            "public repositories": "공개 저장소",
            ". Any changes here will override those limits.": " 의 설정 중이에요. 여기서 변경하는 설정은 해당 제한을 덮어써요.",
            "Limit to existing users": "기존 사용자로 제한하기",
                "Users that have recently created their account will be unable to interact with your repositories.": "최근에 계정을 생성한 사용자는 사용자님의 저장소와 상호작용할 수 없게 돼요.",
            "Limit to prior contributors": "이전에 기여한 사용자로 제한하기",
                "Users that have not previously committed to the default branch of one of your repositories will be unable to interact with that repository.": "사용자님의 저장소 중 하나의 기본 분기에 이전에 커밋한 적이 없는 사용자는 해당 저장소와 상호작용할 수 없어요.",
            "Limit to repository collaborators": "저장소 협업자로 제한하기",
                "Users that are not collaborators of one of your repositories will not be able to interact with that repository.": "사용자님의 저장소 협업자가 아닌 사용자는 해당 저장소와 상호작용할 수 없어요.",
            "New users": "신규 사용자",
            "Users": "사용자",
            "Contributors": "기여자",
            "Collaborators": "협업자",
            // 交互限制时间 下拉 메뉴
            "Enable interaction limits for:": "다음 기간 동안 상호작용 제한 활성화:",
            "24 hours": "24 시간",
            "3 days": "3 일",
            "1 week": "1 주",
            "1 month": "1 달",
            "6 months": "6 달",
            // 顶部提醒
            "User interaction limit settings saved.": "사용자 상호작용 제한 설정이 저장되었어요."
    },
    "regexp": [ // 정규식 번역
        [/Enabled with (.+) remaining./, "활성화되었고, 아직 $1 남았어요."]
    ],
};


I18N["ko-KR"]["settings/code_review_limits"] = { // 설정 - 코드 리뷰 제한
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // 상단 알림
            "Code review limit settings saved.": "코드 리뷰 제한 설정이 저장되었어요.",

        // 코드 리뷰 제한 https://github.com/settings/code_review_limits
            "Restrict users who are permitted to approve or request changes on pull requests in your public repositories.": "공개 저장소의 끌어오기 요청에서 승인하거나 변경 요청할 수 있는 사용자들을 제한해 주세요.",
            "Code review limits may already be specified by individual repositories. Any changes here will override those limits until unset.": "코드 리뷰 제한은 개별 저장소에서 이미 지정되어 있을 수 있어요. 여기서의 변경 사항은 제한이 해제될 때까지 기존 제한을 덮어쓰게 돼요.",
            "Code review limits are currently managed individually for all repositories. Enable limits to permit only users who have explicitly been granted access to each repository to submit reviews that \"approve\" or \"request changes\". Remove limits to allow all users to submit pull request reviews. All users able to submit comment pull request reviews will continue to be able to do so.": "현재 모든 저장소의 코드 리뷰 제한은 개별적으로 관리되고 있어요. 제한을 활성화하면 각 저장소에 대해 명시적으로 접근 권한이 부여된 사용자만 ‘승인’ 또는 ‘변경 요청’ 리뷰를 제출할 수 있어요. 제한을 해제하면 모든 사용자가 끌어오기 요청 리뷰를 제출할 수 있어요. 댓글 끌어오기 요청 리뷰를 제출할 수 있는 사용자들은 계속해서 제출할 수 있어요.",
            "Code review limits are currently": "현재 모든 저장소는",
            "enabled": "활성화되어 있어요",
            "disabled": "비활성화되어 있어요",
            "for all repositories. Only users explicitly granted access to these repositories may submit pull request reviews that \"approve\" or \"request changes\". All users able to submit comment pull request reviews continue to be able to do so.": "모든 저장소에 대해 적용돼요. 해당 저장소에 명시적으로 접근 권한이 부여된 사용자만 ‘승인’ 또는 ‘변경 요청’ 끌어오기 요청 리뷰를 제출할 수 있어요. 댓글 끌어오기 요청 리뷰는 계속 제출할 수 있어요.",
            "for all repositories. All users are able to submit pull request reviews, including those that \"approve\" or \"request changes\". Limit reviews to only permit users who have explicitly been granted access to each repository to submit reviews that \"approve\" or \"request changes\".": "모든 저장소에 대해 적용돼요. 모든 사용자가 ‘승인’ 또는 ‘변경 요청’을 포함한 끌어오기 요청 리뷰를 제출할 수 있어요. 리뷰 제한을 활성화하면 각 저장소에 명시적으로 접근 권한이 부여된 사용자만 ‘승인’ 또는 ‘변경 요청’ 리뷰를 제출할 수 있어요.",
            "Unset": "해제하기",
            "Limit reviews on all repositories": "모든 저장소에 대한 리뷰 제한하기",
            "Remove review limits from all repositories": "모든 저장소의 리뷰 제한 해제하기",

    },
    "regexp": [ // 정규식 번역
    ],
};

I18N["ko-KR"]["settings/repositories"] = { // 설정 - 저장소
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // 저장소 https://github.com/settings/repositories
            "Repository default branch": "저장소 기본 분기",
            "Choose the default branch for your new personal repositories. You might want to change the default name due to different workflows, or because your integrations still require “master” as the default branch name. You can always change the default branch name on individual repositories.": "새로운 개인 저장소의 기본 분기를 선택해 주세요. 작업 흐름이 다르거나 통합 시스템이 여전히 “master”를 기본 분기명으로 요구하기 때문에 기본 이름을 변경하고 싶으실 수 있어요. 개별 저장소에서는 언제든지 기본 분기명을 변경할 수 있어요.",
            "Learn more about default branches.": "기본 분기에 대해 더 알아보세요.",
            "Update": "업데이트",
            "Deleted repositories": "삭제된 저장소",
            "Leave": "나가기",

    },
    "regexp": [ // 정규식 번역
        [/(\d+) collaborators?/, "$1 명의 협업자"]
    ],
};

I18N["ko-KR"]["settings/deleted_repositories"] = { // 설정 - 저장소 - 삭제된 저장소
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // 삭제된 저장소 https://github.com/settings/deleted_repositories
            "Deleted repositories": "삭제된 저장소",
            "It may take up to an hour for repositories to be displayed here. You can only restore repositories that are not forks, or have not been forked.": "저장소가 여기에 표시되기까지 최대 한 시간이 걸릴 수 있어요. 포크가 아니거나 포크된 적이 없는 저장소만 복원할 수 있어요.",
            "Learn more about restoring deleted repositories": "삭제된 저장소 복원에 대해 더 알아보세요",

            "These repositories were deleted, but can't be restored by you. Contact support if you want to restore them.": "이 저장소들은 삭제되었으나, 사용자님께서 복원할 수 없어요. 복원하고 싶으시면 지원팀에 연락해 주세요.",

            "Deleted": "삭제됨",
            // [/by/, "由"], // 삭제된 저장소
            "Restore": "복원하기",
            "Queue…": "대기 중…",
            "Done!": "완료!",

            // 저장소 복원 대화상자
            // [/Are you sure you want to restore ([^ ]+)?/, "您确定要恢复 $1 吗？"],
            "This repository will be in a private state when it is restored. To change this state, go to settings once the repo is restored.": "이 저장소는 복원되면 비공개 상태가 돼요. 상태를 변경하려면 저장소 복원 후 설정으로 이동해 주세요.",
            "Any team or collaborator permissions that previously existed for this repository will not be restored. If you require specific team or collaborator permissions, you will need to configure them in settings.": "이 저장소의 이전 팀이나 협업자 권한은 복원되지 않아요. 특정 팀이나 협업자 권한이 필요하시면 설정에서 다시 구성해 주세요.",
            "I understand, restore this repository": "이해했어요, 이 저장소를 복원할게요.",

    },
    "regexp": [ // 정규식 번역
        [/No recoverable repositories were found for ([^ ]+)\./, "$1 에 대해 복원 가능한 저장소를 찾지 못했어요."],
        [/by/, "에 의해"], // 삭제된 저장소
        [/Are you sure you want to restore ([^ ]+)?/, "$1 을(를) 복원하시겠어요?"],
    ],
};

I18N["ko-KR"]["settings/codespaces"] = { // 설정 - 코드스페이스
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // 코드스페이스 https://github.com/settings/codespaces
            "Dotfiles": "도트파일",
            "Automatically install dotfiles": "도트파일을 자동으로 설치하기",
            "Codespaces can automatically install your dotfiles into every codespace you create.": "코드스페이스는 사용자가 생성하는 모든 코드스페이스에 도트파일을 자동으로 설치할 수 있어요.",
            "Learn how to set up your dotfiles for Codespaces.": "코드스페이스에 도트파일을 설정하는 방법을 알아보세요.",
            "Select repository": "저장소 선택하기",
            "Search for a repository": "저장소 검색하기",
            "Changes saved": "변경 사항이 저장되었어요",

            "Secrets": "기밀",
            "Codespace user secrets": "코드스페이스 사용자 기밀",
            "New secret": "새 기밀 만들기",
            "Development environment secrets are environment variables that are encrypted. They are available to any codespace you create using repositories with access to that secret.": "개발 환경 기밀은 암호화된 환경 변수에요. 해당 기밀에 접근할 수 있는 저장소를 사용하는 모든 코드스페이스에서 사용할 수 있어요.",
            "There are no Codespace secrets.": "코드스페이스 기밀이 없어요.",
            "Secrets created at the user level can be shared with specified repositories.": "사용자 레벨에서 생성된 기밀은 지정된 저장소와 공유할 수 있어요.",

            // [/(\d+) repositor(y|ies)/, "$1 개의 저장소"],
            "Updated": "업데이트됨",
            // [/Are you sure you want to delete ([^ ]+)\?/, "$1 삭제하시겠어요?"],

            "GPG verification": "GPG 검증",
                "Codespaces can have GPG commit signing capabilities so that GitHub can verify that commits made in the codespace come from a trusted source. When enabled, this setting will be applied to your list of trusted repositories.": "코드스페이스는 GPG 커밋 서명 기능을 가질 수 있어요, 이를 통해 GitHub가 코드스페이스에서 만들어진 커밋이 신뢰할 수 있는 출처에서 왔는지 검증할 수 있어요. 활성화되면, 이 설정은 사용자님의 신뢰하는 저장소 목록에 적용돼요.",
                // "Enabled": "启用",
                    "GPG signing will be available in Codespaces": "코드스페이스에서 GPG 서명이 사용 가능해요",

            "Settings Sync": "설정 동기화",
                "By enabling, your codespaces will be able to pull from VS Code Settings Sync service and push only for the trusted repositories you specify. Only enable this for repositories that you trust.": "활성화하면, 사용자님의 코드스페이스는 VS Code 설정 동기화 서비스에서 데이터를 가져올 수 있고, 지정한 신뢰하는 저장소에만 푸시할 수 있어요. 신뢰하는 저장소에 대해서만 활성화해주세요.",
                // "Enabled": "启用",
                    "VS Code Settings Sync will be available in Codespaces": "코드스페이스에서 VS Code 설정 동기화가 사용 가능해요",

            "Trusted repositories": "신뢰하는 저장소",
                "The following repositories will be referenced by GPG verification and Settings Sync.": "다음 저장소들이 GPG 검증과 설정 동기화에 참조될 거예요.",

                "All repositories": "모든 저장소",
                    "GPG signing and VS Code Settings Sync will be available for codespaces for all repositories": "모든 저장소의 코드스페이스에서 GPG 서명과 VS Code 설정 동기화가 사용 가능해요.",
                "Selected repositories": "선택한 저장소",
                    "GPG signing and VS Code Settings Sync will be available for codespaces from the selected repositories": "선택한 저장소의 코드스페이스에서 GPG 서명과 VS Code 설정 동기화가 사용 가능해요.",
                    "Select repositories": "저장소 선택하기",
                    // [/Selected (\d+) repositor(y|ies)./, "선택된 저장소 $1개"],
                    "GPG and VS Code Settings Sync will be available for Codespaces from these repositories.": "이 저장소의 코드스페이스에서 GPG와 VS Code 설정 동기화가 사용 가능해요.",

            "Access and security": "접근 및 보안",
            "Deprecated": "더 이상 사용되지 않아요",
            "Codespaces you create for your personal account can either be restricted to accessing the repository it was opened for, or granted read access to other repositories you own.": "개인 계정으로 생성한 코드스페이스는, 열어본 저장소에만 접근하도록 제한하거나, 사용자님이 소유한 다른 저장소에 읽기 권한을 부여할 수 있어요.",
            "Disabled": "비활성화",
            "Limit access of personal Codespaces to the repository they were opened for": "개인 코드스페이스가 열어본 저장소에만 접근하도록 제한하기",
            "All Codespaces can access other repositories I own": "모든 코드스페이스가 사용자님이 소유한 다른 저장소에 접근할 수 있어요.",
            "Personal Codespaces created for specific repositories can access other repositories I own": "특정 저장소를 위해 생성한 개인 코드스페이스는 사용자님이 소유한 다른 저장소에 접근할 수 있어요.",

            "Editor preference": "에디터 선호도",
                // VS code
                    "Connect to the cloud from your local desktop client. Requires": "로컬 데스크톱 클라이언트에서 클라우드에 연결하기. 필요 조건:",
                    "with the": "와 함께:",
                    "GitHub Codespaces": "GitHub 코드스페이스",
                    "extension.": "확장 프로그램이 필요해요.",

                "Visual Studio Code for the Web": "웹용 Visual Studio Code",
                    "Edit and preview changes straight from the browser.": "브라우저에서 바로 편집하고 변경 사항을 미리보기 할 수 있어요.",

                // "JetBrains Gateway": "",
                    "Connect to the cloud from your local desktop client. Requires the": "로컬 데스크톱 클라이언트에서 클라우드에 연결하기. 필요 조건:",
                    "plugin, and a JetBrains license.": "플러그인과 JetBrains 라이센스가 필요해요.",

                // JupyterLab
                    "Edit and run notebooks from the browser with JupyterLab.": "JupyterLab를 사용해 브라우저에서 노트북을 편집하고 실행해보세요.",

            "Default idle timeout": "기본 유휴 시간 초과",
                "A codespace will suspend after a period of inactivity. You can specify a default idle timeout value, which will apply to all codespaces created after the default is changed. You will be charged for the entire time your codespace is running, even if it is idle. The maximum value is": "일정 시간 동안 활동이 없으면 코드스페이스가 일시 중지돼요. 기본 유휴 시간 초과 값을 지정할 수 있으며, 이 값은 기본값 변경 이후 생성되는 모든 코드스페이스에 적용돼요. 코드스페이스가 실행 중인 전체 시간에 대해 요금이 부과되니 참고해주세요. 최대 값은",
                "minutes (4 hours).": "분 (4시간).",
                "minutes": "분",

            "Default retention period": "기본 보존 기간",
                "Inactive codespaces are automatically deleted 30 days after the last time they were stopped. A shorter retention period can be set, and will apply to all codespaces created going forward. The default and maximum value is": "활동하지 않는 코드스페이스는 마지막 중지 시점 이후 30일 후 자동으로 삭제돼요. 더 짧은 보존 기간을 설정할 수 있으며, 이 값은 이후 생성되는 모든 코드스페이스에 적용돼요. 기본값 및 최대 값은",
                "days.": "일.",
                "Learn about retention setting": "보존 기간 설정에 대해 알아보세요",
                "days": "일",

            "Host image version preference": "호스트 이미지 버전 선호도",
                "The host image defines the operating system in which development containers run. These images receive periodic upgrades for security, functionality, and performance. GitHub Codespaces offers early access to beta images to ensure compatibility with existing development container configurations. Any codespace created or resumed after changing this setting will use the specified image configuration.": "호스트 이미지는 개발 컨테이너가 실행되는 운영 체제를 정의해요. 이 이미지들은 보안, 기능, 성능 향상을 위해 주기적으로 업그레이드돼요. GitHub 코드스페이스는 기존 개발 컨테이너 구성과의 호환성을 보장하기 위해 베타 이미지에 조기 접근할 수 있도록 제공해요. 이 설정을 변경한 후 생성되거나 재개되는 모든 코드스페이스는 지정된 이미지 구성을 사용하게 돼요.",
                "Learn more about host images": "호스트 이미지에 대해 더 알아보세요",
                "Stable": "안정판",
                    "Always use the latest stable configuration.": "항상 최신 안정판 구성을 사용해보세요.",
                "Beta": "베타",
                    "Use a beta image configuration when available. Otherwise, use the latest stable configuration.": "베타 이미지 구성이 사용 가능하면 사용해보세요. 그렇지 않으면 최신 안정판 구성을 사용해주세요.",

            "Region": "지역",
                "Your default region will be used to designate compute resources to your codespaces. GitHub can set your region automatically based on your location, or you can set it yourself. Codespaces are deployed to a subset of Azure regions.": "사용자님의 기본 지역은 코드스페이스에 컴퓨팅 자원을 할당하는 데 사용돼요. GitHub가 사용자님의 위치에 따라 자동으로 지역을 설정할 수도 있고, 직접 설정할 수도 있어요. 코드스페이스는 Azure의 일부 지역에 배포돼요.",
                "Set automatically": "자동 설정하기",
                "We will determine the closest available region based on your location (IP address) at codespace creation time.": "코드스페이스 생성 시 사용자님의 위치(IP 주소)를 기반으로 가장 가까운 사용 가능한 지역을 결정할 거예요.",
                "Set manually": "수동 설정하기",
                "Choose your default region": "기본 지역 선택하기",
                    "United States": "미국",
                        "US West": "미국 서부",
                        "US East": "미국 동부",
                    "Europe": "유럽",
                        "Europe West": "유럽 서부",
                    "Asia Pacific": "아시아 태평양",
                        "Southeast Asia": "동남아시아",
                    "Australia": "호주",

            // 상단 알림
                "Secret added.": "기밀이 추가되었어요.",
                "Secret deleted.": "기밀이 삭제되었어요.",
                "Secret updated.": "기밀이 업데이트되었어요.",

        // 코드스페이스 기밀 새로 만들기 https://github.com/settings/codespaces/secrets/new
            "/ New secret": "/ 새 기밀",
            "Add secret": "기밀 추가하기",
                "Adding…": "추가 중이에요…",

            "Name": "이름",
                "YOUR_SECRET_NAME": "사용자님의 기밀 이름",
                "Secret name is required and must not start with GITHUB": "기밀 이름은 필수이며, GITHUB로 시작할 수 없어요",
            "Value": "값",

            "Repository access": "저장소 접근 권한",
            "Available to": "사용 대상",
            "repository": "저장소",
            "This secret will not be active until at least 1 repository is selected.": "이 기밀은 최소 1개의 저장소가 선택되어야 활성화돼요.",

        // 기밀 편집 https://github.com/settings/codespaces/secrets/<기밀이름>/edit
            "/ Update secret": "/ 기밀 업데이트",
            "Secret values are encrypted and cannot be displayed, but you can": "기밀 값은 암호화되어 표시할 수 없지만, 새로운 값을",
            "enter a new value.": "입력할 수 있어요.",
            "Update secret": "기밀 업데이트하기",
                "Updating…": "업데이트 중이에요…",
            "Save changes": "변경 사항 저장하기",

    },
    "regexp": [ // 정규식 번역
        [/Selected (\d+) repositor(y|ies)./, "선택된 저장소 $1개"],
        [/(\d+) repositor(y|ies)/, "$1 개의 저장소"],
        [/Are you sure you want to delete ([^ ]+)\?/, "$1 삭제하시겠어요?"],
    ],
};

I18N["ko-KR"]["settings/packages"] = { // 설정 - 패키지
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],
        ...I18N["ko-KR"]["orgs-settings-menu"]["static"], // 조직 설정

        // Packages 패키지 https://github.com/settings/packages
            "Packages permissions": "패키지 권한",

            // 조직 설정
                "Package creation": "패키지 생성하기",
                "Members will be able to publish only the selected visibility types for packages and containers. Outside collaborators can never publish packages or containers.": "회원은 선택된 공개 유형의 패키지와 컨테이너만 게시할 수 있어요. 외부 협업자는 절대 패키지나 컨테이너를 게시할 수 없어요.",
                "Public": "공개",
                    "Members will be able to create public packages, visible to anyone.": "회원은 누구나 볼 수 있는 공개 패키지를 만들 수 있어요.",
                "Private": "비공개",
                    "Members will be able to create private packages, visible to organization members with permission.": "회원은 권한이 있는 조직 구성원만 볼 수 있는 비공개 패키지를 만들 수 있어요.",
                "Internal": "내부",
                    "Members will be able to create internal packages, visible to all organization/enterprise members.": "회원은 모든 조직/기업 구성원이 볼 수 있는 내부 패키지를 만들 수 있어요.",

            "Default Package Setting": "기본 패키지 설정",
            "Default package settings": "기본 패키지 설정", // 조직
            "This setting will be applied to new Container, npm, rubygems and NuGet packages.": "이 설정은 새로운 컨테이너, npm, rubygems 및 NuGet 패키지에 적용될 거예요.",
            "Inherit access from source repository": "원본 저장소에서 접근 권한 상속하기",
            "Save": "저장하기",

            "Deleted Packages": "삭제된 패키지",
            "Deleted packages": "삭제된 패키지", // 조직
            "These are packages that have been previously deleted belonging to you. You can restore a package deleted within the last 30 days.": "이것들은 사용자님께 속했던 이전에 삭제된 패키지들이에요. 지난 30일 이내에 삭제된 패키지는 복원할 수 있어요.",
            "These are packages that have been previously deleted belonging to this organization. You can restore a package deleted within the last 30 days.": "이것들은 이 조직에 속했던 이전에 삭제된 패키지들이에요. 지난 30일 이내에 삭제된 패키지는 복원할 수 있어요.", // 조직 설정
            "Search deleted packages": "삭제된 패키지 검색하기",

    },
    "regexp": [ // 정규식 번역
        [/No recoverable packages were found for ([^ ]+)./, "$1 에 대해 복원 가능한 패키지를 찾을 수 없어요."],
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
};
I18N["ko-KR"]["orgs/settings/packages"] = I18N["ko-KR"]["settings/packages"];

I18N["ko-KR"]["settings/copilot"] = { // 설정 - GitHub Copilot
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // GitHub Copilot https://github.com/settings/copilot
            "Trained on billions of lines of code,": "수십억 줄의 코드로 훈련되었어요,",
            "turns natural language prompts into coding suggestions across dozens of languages.": "자연어 프롬프트를 수십 가지 언어의 코드 제안으로 전환해줘요.",
            "Start free trial": "무료 체험 시작하기",
            "After that $10/month": "체험 후 $10/월이에요",
            "Get Copilot from an organization": "조직에서 GitHub Copilot 받기",
            "Organizations can provide their members (including you) and their teams access to GitHub Copilot.": "조직은 구성원(사용자님 포함)과 팀에게 GitHub Copilot 접근 권한을 제공할 수 있어요.",
            "Organizations owned by enterprise accounts": "기업 계정이 소유한 조직은",
            "are not currently listed.": "현재 목록에 포함되어 있지 않아요.",
            "You do not belong to any organizations.": "사용자님은 어떠한 조직에도 속해 있지 않아요.",
            "Create an organization": "조직 만들기",

            "Ask admin for access": "관리자에게 접근 권한 요청하기",
            "Requesting...": "요청 중이에요...",
            "Remove request": "요청 취소하기",
            "Cancelling...": "취소 중이에요...",
            "Buy Copilot Business": "GitHub Copilot 기업용 구매하기",
            "Owner": "소유자",
            "Member": "구성원",

        // 무료 버전
            "You are using Copilot for free": "사용자님은 GitHub Copilot 무료 버전을 사용 중이에요",
                "Responses are limited to 2,000 code completions and 50 chat messages per month.": "응답은 매월 2,000회 코드 완성과 50개의 채팅 메시지로 제한돼 있어요.",
            //"Copilot Free is active for your account": "사용자님의 계정에서 Copilot 무료 버전이 활성화되었어요",
                //"Responses are capped at 2,000 code completions and 50 chat messages per month.": "응답은 매월 2,000회 코드 완성과 50개의 채팅 메시지로 제한돼 있어요.",
            "Get unlimited usage with Copilot Pro": "GitHub Copilot Pro로 무제한 사용하기",
                "Unlimited messages and interactions": "메시지와 상호작용이 무제한이에요",
                "Access to the latest models": "최신 모델에 접근할 수 있어요",
                "Customize conversations to your private codebase and extensions": "사용자님의 개인 코드베이스와 확장 기능에 맞게 대화를 맞춤 설정해보세요",
                "Start a free trial": "무료 체험 시작하기",

            "Copilot policies": "Copilot 정책",
                "Copilot in github.com": "github.com에서 Copilot 사용하기",
                    "You can use Copilot Chat in github.com, but not preview features.": "github.com에서는 Copilot Chat을 사용할 수 있어요, 단 미리보기 기능은 지원되지 않아요.",
                    "Learn more about Copilot in github.com": "github.com에서 Copilot 사용에 대해 더 알아보기",
                "Suggestions matching public code (duplication detection filter)": "공개 코드와 일치하는 제안 (중복 감지 필터)",
                    "Copilot can allow or block suggestions matching public code. Learn more about": "Copilot은 공개 코드와 일치하는 제안을 허용하거나 차단할 수 있어요. 자세한 내용은",
                    "code suggestions": "코드 제안",
                    "Allowed": "허용",
                        "GitHub Copilot will show suggestions matching public code.": "GitHub Copilot은 공개 코드와 일치하는 제안을 보여줄 거예요.",
                    "Blocked": "차단",
                        "GitHub Copilot won't show suggestions matching public code.": "GitHub Copilot은 공개 코드와 일치하는 제안을 보여주지 않을 거예요.",
                "Allow GitHub to use my data for product improvements": "GitHub이 제품 개선을 위해 사용자님의 데이터를 사용하는 것을 허용하기",
                //"Allow GitHub to use my code snippets from the code editor for product improvements": "GitHub이 코드 에디터의 코드 조각을 사용해 제품을 개선하는 것을 허용하기",
                    "Allow GitHub, its affiliates and third parties to use my data, including Prompts, Suggestions, and Code Snippets, for product improvements. More information in the": "GitHub과 그 계열사 및 제3자가 사용자님의 데이터(프롬프트, 제안, 코드 조각 포함)를 제품 개선에 사용하는 것을 허용해 주세요. 자세한 내용은",
                    //"Allow GitHub, its affiliates and third parties to use my code snippets to research and improve GitHub Copilot suggestions, related models and product features. More information in the": "GitHub과 그 계열사 및 제3자가 사용자님의 코드 조각을 사용해 GitHub Copilot 제안, 관련 모델 및 제품 기능을 연구하고 개선하는 것을 허용해 주세요. 자세한 내용은",
                    "About GitHub Copilot privacy.": "GitHub Copilot 개인정보 보호에 대해 확인해 보세요.",
                "Allow GitHub to use my data for AI model training": "GitHub이 AI 모델 훈련을 위해 사용자님의 데이터를 사용하는 것을 허용하기",
                    "Allow GitHub, its affiliates and third parties to use my data, including Prompts, Suggestions, and Code Snippets, for AI model training. More information in the": "GitHub과 그 계열사 및 제3자가 사용자님의 데이터(프롬프트, 제안, 코드 조각 포함)를 AI 모델 훈련에 사용하는 것을 허용해 주세요. 자세한 내용은",
                "Copilot access to Bing": "Copilot의 Bing 접근",
                    "Copilot can answer questions about new trends and give improved answers.": "Copilot은 새로운 트렌드에 관한 질문에 답하고 개선된 답변을 제공할 수 있어요.",
                    "See Microsoft Privacy Statement": "Microsoft 개인정보 보호정책 보기",

                    "GitHub Copilot will answer questions about new trends and give improved answers": "GitHub Copilot은 새로운 트렌드에 관한 질문에 답하고 개선된 답변을 제공할 거예요",
                    "GitHub Copilot won't answer questions about new trends and give improved answers": "GitHub Copilot은 새로운 트렌드에 관한 질문에 답하지 않고 개선된 답변을 제공하지 않을 거예요",
                "Anthropic Claude 3.5 Sonnet in Copilot": "Copilot에서 Anthropic Claude 3.5 Sonnet 사용하기", // 간략화된 명칭
                    "You can use the latest Claude 3.5 Sonnet model.": "최신 Claude 3.5 Sonnet 모델을 사용할 수 있어요.",
                    "Learn more about how GitHub Copilot serves Claude 3.5 Sonnet.": "GitHub Copilot이 Claude 3.5 Sonnet에 어떻게 서비스를 제공하는지 더 알아보세요.",
                    "Select an option": "옵션 선택하기",
                        "You will have access to the feature": "이 기능을 사용할 수 있게 될 거예요",
                        "You won’t have access to the feature": "이 기능을 사용할 수 없게 될 거예요",
                "Dashboard entry point": "대시보드 진입점",
                    "Allows instant chatting when landing on GitHub.com": "GitHub.com 접속 시 즉시 채팅할 수 있도록 해줘요",

            "For more information about the data your organization receives regarding your use of GitHub Copilot, please review": "조직이 사용자님의 GitHub Copilot 사용 관련 데이터에 대해 받는 정보에 관해서는 꼭 확인해 주세요",
                "GitHub's Privacy Statement": "GitHub 개인정보 보호정책",
            "It can take up to 30 minutes for the changes to take effect. Restart your code editor for the changes to take effect immediately.": "변경 사항이 적용되기까지 최대 30분이 걸릴 수 있어요. 즉시 적용하려면 코드 에디터를 재시작해 주세요.",

        // 프로 버전
            // 상단 알림
                "It appears you are not eligible to sign up to GitHub Copilot for free": "사용자님은 무료 GitHub Copilot 가입 자격이 없는 것 같아요",
            "Your GitHub Copilot setup is incomplete. Select your preferences below to start using GitHub Copilot.": "사용자님의 GitHub Copilot 설정이 완전하지 않아요. 아래에서 선호도를 선택해 GitHub Copilot 사용을 시작해 주세요.",

            "GitHub Copilot Pro is active for your account": "사용자님의 GitHub Copilot Pro가 계정에 활성화되어 있어요",
                "You currently have an active": "현재 활성화된",
                "Copilot Pro subscription": "GitHub Copilot Pro 구독이 있어요",
                "Get started by installing the extension in your preferred IDE.": "사용자님이 선호하는 IDE에 확장 기능을 설치하여 시작해 보세요.",
                "Copilot in your IDE": "IDE 내의 Copilot",
                "Copilot in the CLI": "터미널 내의 Copilot",
                "Chat in GitHub Mobile": "GitHub Mobile에서 채팅하기",
                "More features": "더 많은 기능",

            // "Copilot policies": "Copilot 정책",
                // "Copilot in github.com": "github.com에서 Copilot 사용하기",
                    "You can use Copilot Chat in github.com, Copilot for pull requests, and all of the preview features.": "github.com에서는 Copilot Chat, 끌어오기 요청용 Copilot, 그리고 모든 미리보기 기능을 사용할 수 있어요.",
                // "Copilot in the CLI": "터미널 내의 Copilot 사용하기",
                    "You can use": "사용할 수 있어요",
                    "GitHub Copilot for assistance in terminal": "터미널에서 GitHub Copilot 도움 기능을",
                "Copilot Chat in the IDE": "IDE 내의 Copilot Chat",
                    "GitHub Copilot Chat in the IDE": "IDE 내에서 GitHub Copilot Chat을",
                    "to explain a piece of code, propose bug fixes, or generate unit tests in a chat interface from your editor.": "코드 한 조각을 설명하거나, 버그 수정을 제안하거나, 단위 테스트를 생성하기 위해 에디터의 채팅 인터페이스를 사용해 보세요.",
                "Copilot Chat in GitHub Mobile": "GitHub Mobile 내의 Copilot Chat",
                    "personalized to a codebase.": "개인 코드베이스에 맞춰 개인화되어 있어요.",
    },
    "regexp": [ // 정규식 번역
        [/Outside collaborator on (\d+) repositor(y|ies)/, "$1 개 저장소의 외부 협업자"],
        [/Member and collaborator on (\d+) repositor(y|ies)/, "$1 개 저장소의 구성원 및 협업자"],
    ],
};

I18N["ko-KR"]["settings/pages"] = { // 설정 - GitHub 페이지
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],
        ...I18N["ko-KR"]["orgs-settings-menu"]["static"], // 조직 설정 메뉴

        // GitHub Pages https://github.com/settings/pages
            "Verified domains": "인증된 도메인",
            "Add a domain": "도메인 추가하기",
            "There are no verified domains.": "인증된 도메인이 없어요.",
            "There are no verified domains for this organization.": "이 조직에 인증된 도메인이 없어요.", // 조직 설정
            "Verify domains to restrict who can publish GitHub Pages on them.": "GitHub 페이지를 게시할 수 있는 대상을 제한하기 위해 도메인을 인증해 주세요.",
            "One of your domains is unverified. Please verify it to prevent others from claiming it for their Pages sites.": "사용자님의 도메인 중 하나가 인증되지 않았어요. 다른 사용자가 자신의 페이지 사이트로 등록하지 못하도록 인증해 주세요.",
            "Please verify your domain": "도메인을 인증해 주세요",
            "Continue verifying": "인증 계속하기",
            "Review verification steps": "인증 절차 확인하기",

            // 도메인 삭제 대화 상자
            "Delete verified domain": "인증된 도메인 삭제하기",
            "This is a destructive action. Your GitHub Pages sites may lose their custom domains.": "이 작업은 되돌릴 수 없어요. GitHub 페이지 사이트가 사용자님의 맞춤 도메인을 잃을 수 있어요.",
            "Your GitHub Pages sites may be unpublished from their custom domains if another organization claims ownership of this domain.": "다른 조직이 이 도메인의 소유권을 주장하면, 사용자님의 GitHub 페이지 사이트가 맞춤 도메인에서 게시 해제될 수 있어요.",
            "Please type": "입력해 주세요",
            "to confirm.": "확인을 위해.",
            "I understand, delete verified domain": "알겠습니다, 인증된 도메인 삭제할게요",

            // GitHub Pages - 도메인 추가 https://github.com/settings/pages_verified_domains/new
            "Add a verified domain": "인증된 도메인 추가하기",
            "What domain would you like to add?": "어떤 도메인을 추가하시겠어요?",
            "Add domain": "도메인 추가하기",
            "Domain name has already been added": "해당 도메인은 이미 추가되었어요",
            "Add a DNS TXT record": "DNS TXT 레코드 추가하기",
            "Before we can verify": "인증하기 전에",
            ", you'll need to complete these steps:": "다음 절차를 완료해 주세요:",
            "Create a TXT record in your DNS configuration for the following hostname:": "다음 호스트명에 대해 DNS 설정에서 TXT 레코드를 생성해 주세요:",
            "Use this code for the value of the TXT record:": "TXT 레코드 값으로 이 코드를 사용해 주세요:",
            "Wait until your DNS configuration changes. This could take up to 24 hours to propagate.": "DNS 설정 변경 사항이 전파될 때까지 기다려 주세요. 최대 24시간이 걸릴 수 있어요.",
            "Verify": "인증하기",
            "Copy verification steps": "인증 절차 복사하기",
            "Your domain is verified. No further action is needed.": "사용자님의 도메인이 인증되었어요. 추가 조치는 필요 없어요.",
    },
    "regexp": [ // 정규식 번역
        [/Successfully verified/, "성공적으로 인증되었어요"],
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
};
I18N["ko-KR"]["orgs/settings/pages"] = I18N["ko-KR"]["settings/pages"];

I18N["ko-KR"]["settings/replies"] = { // 설정 - 빠른 답글
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // Saved replies 빠른 답글 https://github.com/settings/replies
            "Saved replies are re-usable text snippets that you can use throughout GitHub comment fields. Saved replies can save you time if you’re often typing similar responses.": "빠른 답글은 GitHub 댓글 입력란에서 반복 사용 가능한 텍스트 스니펫이에요. 비슷한 답글을 자주 입력하신다면, 빠른 답글을 사용해 시간을 절약할 수 있어요.",
            "Learn more about working with saved replies": "빠른 답글 사용에 대해 더 알아보기",
            "No saved replies yet.": "아직 빠른 답글이 없어요.",
            "Add a saved reply": "빠른 답글 추가하기",
            "Saved reply title": "빠른 답글 제목",
            "Add a short title to your reply": "답글에 짧은 제목을 추가해 주세요",
            "Add your saved reply": "사용자님의 빠른 답글 추가하기",
            "Add saved reply": "빠른 답글 추가하기",
            "Your saved reply was created successfully.": "사용자님의 빠른 답글이 성공적으로 생성되었어요.",
            "Edit saved reply": "빠른 답글 편집하기",
            "Update saved reply": "빠른 답글 업데이트하기",
            "Your saved reply was updated successfully.": "사용자님의 빠른 답글이 성공적으로 업데이트되었어요.",

    },
    "regexp": [ // 정규식 번역
    ],
};

I18N["ko-KR"]["settings/security_analysis"] = { // 설정 - 코드 보안 및 분석
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // 코드 보안 및 분석 https://github.com/settings/security_analysis
            "Security and analysis features help keep your repositories secure and updated. By enabling these features, you're granting us permission to perform read-only analysis on your repositories.":
                "보안 및 분석 기능은 사용자님의 저장소를 안전하고 최신 상태로 유지하는 데 도움이 돼요. 이 기능들을 활성화하시면, 사용자님의 저장소에 대해 읽기 전용 분석을 수행할 수 있도록 허용하신 것으로 간주해요.",

            "User": "사용자",
                "Security and analysis features help keep you secure and updated, wherever you are.":
                    "보안 및 분석 기능은 사용자님께서 어디에 계시든 안전하고 최신 상태를 유지하실 수 있도록 도와드려요.",

                "Keep your public pushes safe with push protection":
                    "푸시 보호로 사용자님의 공개 푸시를 안전하게 유지해보세요.",
                "GitHub will enable push protection for all GitHub Free individuals in January 2024. Enable below to try it now in beta.":
                    "GitHub은 2024년 1월에 모든 GitHub 무료 사용자에 대해 푸시 보호 기능을 활성화할 예정이에요. 아래에서 활성화하셔서 베타 버전을 바로 사용해보세요.",
                    "Dismiss": "무시하기",

                "Push protection for yourself": "푸시 보호 사용하기",
                    "Block commits that contain": "포함된 내용이 있는 커밋 차단하기",
                    "supported secrets": "지원되는 기밀",
                    "across all public repositories on GitHub.":
                        "모든 GitHub 공개 저장소에 적용돼요.",

                    // 대화 상자
                        "Enable push protection for yourself": "내 푸시 보호 활성화",
                            "Pushes that contain secrets will be blocked on public repositories. You'll have the option to bypass the block.":
                                "기밀이 포함된 푸시는 공개 저장소에서 차단될 거예요. 차단을 우회할 옵션도 제공돼요.",
                            "Enable push protection": "푸시 보호 활성화",

                        "Disable push protection for yourself": "내 푸시 보호 비활성화",
                            "Pushes that contain secrets will not be blocked.":
                                "기밀이 포함된 푸시는 차단되지 않아요.",
                            "Disable push protection": "푸시 보호 비활성화",

                        // 상단 알림
                            // [/Security settings updated for ([^ ]+)\'s repositories./, "업데이트된 $1 저장소의 보안 설정."],

            // 저장소
                "Security and analysis features help keep your repositories secure and updated.":
                    "보안 및 분석 기능은 사용자님의 저장소를 안전하고 최신 상태로 유지하는 데 도움이 돼요.",

            "Disable all": "전체 비활성화",
            "Enable all": "전체 활성화",

            "Private vulnerability reporting": "비공개 취약점 보고",
                "Allow your community to privately report potential security vulnerabilities to maintainers and repository owners.":
                    "커뮤니티가 유지관리자와 저장소 소유자에게 잠재적인 보안 취약점을 비공개로 보고할 수 있도록 허용해보세요.",
                "Learn more about private vulnerability reporting": "비공개 취약점 보고에 대해 더 알아보기",
                "Automatically enable for new public repositories": "새 공개 저장소에 대해 자동 활성화하기",

                // 대화 상자
                    "Disable private vulnerability reporting": "비공개 취약점 보고 비활성화",
                        // [/You're about to disable private vulnerability reporting on all public repositories in ([^ ]+)./, "사용자님께서 $1의 모든 공개 저장소에서 비공개 취약점 보고를 비활성화하려고 하십니다."],
                        "Enable by default for new public repositories": "새 공개 저장소 기본 활성화",

                    "Enable private vulnerability reporting": "비공개 취약점 보고 활성화",
                        // [/You're about to enable private vulnerability reporting on all public repositories in ([^ ]+)./, "사용자님께서 $1의 모든 공개 저장소에서 비공개 취약점 보고를 활성화하려고 하십니다."],

            "Dependency graph": "의존성 그래프",
                "Understand your dependencies.": "의존 관계를 이해해보세요.",
                "Automatically enable for new private repositories": "새 비공개 저장소에 대해 자동 활성화하기",

                // 대화 상자
                    "Enable dependency graph": "의존성 그래프 활성화",
                        "You're about to enable dependency graph on all your private repositories.":
                            "사용자님의 모든 비공개 저장소에서 의존성 그래프를 활성화하려고 하십니다.",
                        "Enable by default for new private repositories": "새 비공개 저장소 기본 활성화",

                    "Disable dependency graph": "의존성 그래프 비활성화",
                        "You're about to disable dependency graph on all your private repositories. This will also disable Dependabot alerts and Dependabot security updates on those repositories.":
                            "사용자님의 모든 비공개 저장소에서 의존성 그래프를 비활성화하려고 하십니다. 이 경우, 해당 저장소의 Dependabot 경고와 Dependabot 보안 업데이트도 함께 비활성화됩니다.",

            // Dependabot
                "Keep your dependencies secure and up-to-date.":
                    "사용자님의 의존성을 안전하고 최신 상태로 유지해보세요.",
                "Learn more about Dependabot": "Dependabot에 대해 더 알아보기",

                "Dependabot alerts": "Dependabot 경고",
                    "Receive alerts for vulnerabilities that affect your dependencies and manually generate Dependabot pull requests to resolve these vulnerabilities.":
                        "사용자님의 의존성에 영향을 미치는 취약점에 대한 경고를 받고, 수동으로 Dependabot 끌어오기 요청을 생성하여 문제를 해결해보세요.",
                        "Configure alert notifications": "경고 알림 구성하기",
                    "Automatically enable for new repositories": "새 저장소에 대해 자동 활성화하기",

                    // 대화 상자
                        "Enable Dependabot alerts": "Dependabot 경고 활성화",
                            "You're about to enable Dependabot alerts on all your repositories. Alerts require the dependency graph, so we'll also turn that on for all repositories. No notifications will be sent while Dependabot alerts are being enabled.":
                                "사용자님의 모든 저장소에서 Dependabot 경고를 활성화하려고 하십니다. Dependabot 경고는 의존성 그래프가 필요하므로, 모든 저장소에 대해 의존성 그래프도 함께 활성화됩니다. Dependabot 경고 활성화 중에는 알림이 전송되지 않아요.",
                                "Enable by default for new repositories": "새 저장소 기본 활성화",

                        "Disable Dependabot alerts": "Dependabot 경고 비활성화",
                            "You're about to disable Dependabot alerts on all your repositories. This will also disable Dependabot security updates on those repositories.":
                                "사용자님의 모든 저장소에서 Dependabot 경고를 비활성화하려고 하십니다. 이 경우, 해당 저장소의 Dependabot 보안 업데이트도 함께 비활성화됩니다.",

                "Dependabot security updates": "Dependabot 보안 업데이트",
                    "Enabling this option will result in Dependabot automatically attempting to open pull requests to resolve every open Dependabot alert with an available patch.":
                        "이 옵션을 활성화하면, Dependabot이 사용 가능한 패치를 통해 모든 열린 Dependabot 경고를 해결하기 위해 자동으로 끌어오기 요청을 생성하려고 시도할 거예요.",
                        "Dependabot rules": "Dependabot 규칙",

                    // 대화 상자
                        "Enable Dependabot security updates": "Dependabot 보안 업데이트 활성화",
                            "You're about to enable Dependabot security updates on all your repositories. Dependabot security updates require the dependency graph and Dependabot alerts, so we'll also turn that on for all repositories.":
                                "사용자님의 모든 저장소에서 Dependabot 보안 업데이트를 활성화하려고 하십니다. Dependabot 보안 업데이트는 의존성 그래프와 Dependabot 경고가 필요하므로, 모든 저장소에 대해 이들 기능도 함께 활성화됩니다.",
                        "Disable Dependabot security updates": "Dependabot 보안 업데이트 비활성화",
                            "You're about to disable Dependabot security updates on all your repositories.":
                                "사용자님의 모든 저장소에서 Dependabot 보안 업데이트를 비활성화하려고 하십니다.",

                "Grouped security updates": "그룹화된 보안 업데이트",
                    "Groups all available updates that resolve a Dependabot alert into one pull request (per package manager and directory of requirement manifests). This option may be overridden by group rules specified in dependabot.yml -":
                        "Dependabot 경고를 해결하는 모든 가능한 업데이트를 (패키지 관리자와 요구사항 매니페스트 디렉토리별로) 하나의 끌어오기 요청으로 그룹화해요. 이 옵션은 dependabot.yml에 지정된 그룹 규칙에 의해 재설정될 수 있어요.",
                    "Learn how to group updates.": "업데이트 그룹화 방법 알아보기",

                    // 대화 상자
                        "Enable grouped security updates": "그룹화된 보안 업데이트 활성화",
                            "You're about to enable grouped security updates on all your repositories. Grouped security updates require the dependency graph, Dependabot alerts and Dependabot security updates, so we'll also turn that on for all repositories.":
                                "사용자님의 모든 저장소에서 그룹화된 보안 업데이트를 활성화하려고 하십니다. 그룹화된 보안 업데이트는 의존성 그래프, Dependabot 경고 및 Dependabot 보안 업데이트가 필요하므로, 모든 저장소에 대해 이들 기능도 함께 활성화됩니다.",
                        "Disable grouped security updates": "그룹화된 보안 업데이트 비활성화",
                            "You're about to disable grouped security updates on all your repositories.":
                                "사용자님의 모든 저장소에서 그룹화된 보안 업데이트를 비활성화하려고 하십니다.",

                "Dependabot on Actions runners": "액션 실행기에서 Dependabot 사용하기",
                    "Run Dependabot security and version updates on Actions runners.":
                        "액션 실행기에서 Dependabot 보안 및 버전 업데이트를 실행해보세요.",

                    // 대화 상자
                        "Enable dependabot on actions": "액션에서 Dependabot 활성화",
                            "You're about to enable dependabot on actions on all your repositories. Dependabot on actions requires Actions so we'll also turn that on for all repositories.":
                                "사용자님의 모든 저장소에서 액션 내 Dependabot을 활성화하려고 하십니다. 액션 내 Dependabot은 액션 기능이 필요하므로, 모든 저장소에 대해 액션도 함께 활성화됩니다.",
                        "Disable dependabot on actions": "액션에서 Dependabot 비활성화",
                            "You're about to disable dependabot on actions on all your repositories.":
                                "사용자님의 모든 저장소에서 액션 내 Dependabot을 비활성화하려고 하십니다.",

                "Dependabot on self-hosted runners": "자체 호스팅 실행기에서 Dependabot 사용하기",
                    "Run Dependabot security and version updates on self-hosted Actions runners.":
                        "자체 호스팅 액션 실행기에서 Dependabot 보안 및 버전 업데이트를 실행해보세요.",

                    // 대화 상자
                        "Enable dependabot self-hosted": "자체 호스팅 실행기에서 Dependabot 활성화",
                            "You're about to enable dependabot self-hosted on all your repositories. Dependabot self-hosted depends on Dependabot on Actions so we'll also turn that on for all repositories.":
                                "사용자님의 모든 저장소에서 자체 호스팅 Dependabot을 활성화하려고 하십니다. 자체 호스팅 Dependabot은 액션 내 Dependabot에 의존하므로, 모든 저장소에 대해 해당 기능도 함께 활성화됩니다.",
                        "Disable dependabot self-hosted": "자체 호스팅 실행기에서 Dependabot 비활성화",
                            "You're about to disable dependabot self-hosted on all your repositories.":
                                "사용자님의 모든 저장소에서 자체 호스팅 Dependabot을 비활성화하려고 하십니다.",

            "Secret scanning": "기밀 스캔",
                "Receive alerts on GitHub for detected secrets, keys, or other tokens.":
                    "GitHub에서 감지된 기밀, 키 또는 기타 토큰에 대한 경고를 받아보세요.",
                "GitHub will always send alerts to partners for detected secrets in public repositories.":
                    "GitHub은 공개 저장소에서 감지된 기밀에 대해 항상 파트너에게 경고를 전송해요.",
                "Learn more about partner patterns": "파트너 패턴에 대해 더 알아보기",

                // 대화 상자
                    "Enable secret scanning for eligible repositories?": "조건에 맞는 저장소에서 기밀 스캔을 활성화하시겠어요?",
                        "This will turn on secret scanning for all public repositories.":
                            "이렇게 하면 모든 공개 저장소에서 기밀 스캔이 활성화돼요.",
                        "Enable for eligible repositories": "조건에 맞는 저장소 활성화",

                    "Disable secret scanning?": "기밀 스캔을 비활성화하시겠어요?",
                        "This will disable secret scanning on all repositories where it is enabled.":
                            "이렇게 하면 기밀 스캔이 활성화된 모든 저장소에서 기밀 스캔이 비활성화돼요.",
                        "Disable secret scanning": "기밀 스캔 비활성화",

                "Push protection": "푸시 보호",
                    // "Block commits that contain": "포함된 내용이 있는 커밋 차단하기",
                    // "supported secrets": "지원되는 기밀",
                    "Automatically enable for repositories added to secret scanning":
                        "기밀 스캔이 적용된 저장소에 대해 자동 활성화하기",

                    // 대화 상자
                        "Enable push protection for eligible repositories?": "조건에 맞는 저장소에서 푸시 보호를 활성화하시겠어요?",
                            "This will turn on push protection for all repositories that have secret scanning enabled.":
                                "이렇게 하면 기밀 스캔이 활성화된 모든 저장소에서 푸시 보호가 활성화돼요.",
                        "Disable push protection?": "푸시 보호를 비활성화하시겠어요?",
                            "This will disable push protection on all repositories where it is enabled.":
                                "이렇게 하면 푸시 보호가 활성화된 모든 저장소에서 푸시 보호가 비활성화돼요.",
                            "You can still enable push protection at the repository level.":
                                "사용자님께서는 저장소 단위에서 푸시 보호를 개별로 활성화하실 수도 있어요.",

    },
    "regexp": [ // 정규 표현식 번역
        [/You're about to disable private vulnerability reporting on all public repositories in ([^ ]+)./, "사용자님께서 $1의 모든 공개 저장소에서 비공개 취약점 보고를 비활성화하려고 하십니다."],
        [/You're about to enable private vulnerability reporting on all public repositories in ([^ ]+)./, "사용자님께서 $1의 모든 공개 저장소에서 비공개 취약점 보고를 활성화하려고 하십니다."],
        [/Security settings updated for ([^ ]+)\'s repositories./, "사용자님의 $1 저장소의 보안 설정이 업데이트되었어요."],
    ],
};

I18N["ko-KR"]["settings/installations"] = { // 설정 - GitHub 앱/설치
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],
        ...I18N["ko-KR"]["orgs-settings-menu"]["static"],

        "Installed GitHub Apps": "설치된 GitHub 앱",
        "Authorized GitHub Apps": "승인된 GitHub 앱",
        "Authorized OAuth Apps": "승인된 OAuth 앱",

        // 설치된 GitHub 앱 https://github.com/settings/installations
            // 상단 알림
                // [/You're all set! (.*) has been uninstalled./, "모든 준비가 완료되었어요! $1 이(가) 제거되었어요."],
                // [/You're all set! A job has been queued to uninstall the \'(.*)\' app./, "모든 준비가 완료되었어요! ‘$1’ 앱 제거 작업이 대기 중이에요."],
                // [/Okay, (.*) was installed on the (@[^ ]+) account./, "알겠습니다, $2 계정에 $1 이(가) 설치되었어요."],
                // [/Okay, (.*) was updated for the (@[^ ]+) account./, "알겠습니다, $2 계정의 $1 이(가) 업데이트되었어요."],

            // "Installed GitHub Apps": "설치된 GitHub 앱",
                "GitHub Apps augment and extend your workflows on GitHub with commercial, open source, and homegrown tools.": "GitHub 앱은 상업용, 오픈 소스, 그리고 자체 개발 도구들을 통해 GitHub에서의 작업 흐름을 보완하고 확장해요.",
                "Permission updates requested.": "GitHub 권한 업데이트 요청이 있어요.",

            "Pending GitHub Apps installation requests": "대기 중인 GitHub 앱 설치 요청", // 조직 설정
                "Members in your organization can request that GitHub Apps be installed. Pending requests are listed below.": "조직의 구성원이 GitHub 앱 설치를 요청할 수 있어요. 대기 중인 요청들은 아래에 나열되어 있어요.",

            "No installed applications": "설치된 앱이 없어요",
            "You have no applications installed on this account.": "이 계정에 설치된 앱이 없어요.",
            "Configure": "설정하기",
            "Suspended": "일시 중지됨",

        // 설치된 GitHub 앱 설정 https://github.com/settings/installations/<id>
            // 상단 알림
                // [/Your installation was suspended by you on/, "사용자님께서 설치를 일시 중지한 날짜:"],
                "Your app has been unsuspended": "앱의 일시 중지가 해제되었어요.",

            "Installed": "설치됨",
            "Developed by": "개발자",
            "App settings": "앱 설정",
            "Permissions": "권한",
                // [/is requesting an update to its permissions./, "권한 업데이트를 요청하고 있어요."],
                "Review request": "요청 검토하기",
                "Access public information (read-only)": "공개 정보 접근 (읽기 전용)",
                "Access user email addresses (read-only)": "사용자 이메일 주소 접근 (읽기 전용)",
                "Read all user profile data": "모든 사용자 프로필 데이터 읽기",
                "Create gists": "코드 조각 만들기",
                "Full control of private repositories": "비공개 저장소 완전 제어",
                "Update github action workflows": "GitHub 액션 워크플로우 업데이트하기",
                "Update all user data": "모든 사용자 데이터 업데이트하기",
                "Full control of codespaces": "Codespaces 완전 제어",
                "Read all user profile data": "모든 사용자 프로필 데이터 읽기",

            "Repository access": "저장소 접근 권한",
            "All repositories": "모든 저장소",
                "This applies to all current": "현재 모든",
                "and": "그리고",
                "future repositories owned by the resource owner.": "자원 소유자가 소유할 미래의 저장소에 적용돼요.",
                "Also includes public repositories (read-only).": "공개 저장소 (읽기 전용)도 포함돼요.",
            "Only select repositories": "선택한 저장소만",
                "Select at least one repository.": "최소 한 개 이상의 저장소를 선택해 주세요.",
                "Also includes public repositories (read-only).": "공개 저장소 (읽기 전용)도 포함돼요.",
                // [/Selected (\d+) repositor(y|ies)./, "$1 개의 저장소 선택됨."],
            "Select repositories": "저장소 선택하기",
            "Search for a repository": "저장소 검색하기",

            "Danger zone": "위험 구역",
            "Suspend your installation": "설치를 일시 중지하기",
            "This will block the app access to your resources.": "이 작업을 수행하면 앱이 사용자님의 자원에 접근하지 못하게 돼요.",
            "Suspend": "일시 중지",
                // 취소 버튼 경고 메시지
                "Are you sure you want to suspend this GitHub App?": "정말로 이 GitHub 앱을 일시 중지하시겠어요?",
            "This will remove the app and revoke access to all resources.": "이 작업을 수행하면 앱이 삭제되고 모든 자원에 대한 접근 권한이 취소돼요.",
            // [/Uninstall "(.*)"/, "“$1” 제거하기"],
            "Uninstall": "앱 제거하기",
                // 취소 버튼 경고 메시지
                // [/This action cannot be undone. Are you sure you want to uninstall this GitHub App from (\d+) repositor(y|ies)?/, "이 작업은 취소할 수 없어요. 정말로 이 GitHub 앱을 $1 개의 저장소에서 제거하시겠어요?"],
            "Unsuspend your installation": "일시 중지 해제하기",
                "This grant the app access to your resources.": "이 작업을 수행하면 앱이 사용자님의 자원에 접근할 수 있게 돼요.",
                "Unsuspend": "일시 중지 해제하기",

            "Report abuse": "남용 신고하기",
            "Revoke": "권한 취소하기",
            "Read more about connecting with third-party applications at": "타사 앱과의 연결에 대해 자세히 알아보시려면 다음을 참고해 주세요:",
            "GitHub Help": "GitHub 도움말",

        // 설치된 GitHub 앱 권한 업데이트 https://github.com/settings/installations/<id>/permissions/update
            // [/The (.*) app by/, "$1 앱 (제작자:"],
            "is requesting updated permissions": "업데이트된 권한을 요청하고 있어요.",

            "Read and write": "읽기/쓰기 권한",
            "Read-only": "읽기 전용 권한",
            "Admin": "관리자 권한",
            "access to": "접근 권한:",
            "New request": "새 요청",
            "Show unchanged permissions": "변경되지 않은 권한 보기",
            "Hide unchanged permissions": "변경되지 않은 권한 숨기기",
            "Accept new permissions": "새 권한 수락하기",
            // [/The (.*) app will retain its current permissions if you choose not to accept the new permissions./, "새로운 권한을 수락하지 않으시면, “$1” 앱은 현재 권한을 유지할 거예요."],

        // 승인된 GitHub 앱 https://github.com/settings/apps/authorizations
            // "Authorized GitHub Apps": "승인된 GitHub 앱",
            "No authorized applications": "승인된 앱이 없어요",
            "You have no applications authorized to access your account.": "사용자님의 계정에 접근할 수 있도록 승인된 앱이 없어요.",

        // 승인된 OAuth 앱 https://github.com/settings/applications
            // "Authorized OAuth Apps": "승인된 OAuth 앱",
            "You have granted": "사용자님께서 이미 승인하셨어요",
            "access to your account.": "사용자님의 계정 접근 권한을.",
            "Revoke all": "전체 권한 취소하기",
            "Sort": "정렬",
            "Sort by": "정렬 기준",
            "Alphabetical": "알파벳 순",
            "Recently used": "최근 사용",
            "Least recently used": "가장 덜 사용",

            "Never used · Owned by": "한 번도 사용하지 않음 · 소유자:",
            "Last used within the last week · Owned by": "최근 1주일 내 사용됨 · 소유자:",

            "Report abuse": "남용 신고하기",
            "Revoke": "권한 취소하기",

            // 전체 권한 취소 대화상자
            "Are you sure you want to revoke authorization?": "정말로 승인 권한을 취소하시겠어요?",
            "I understand, revoke access": "알겠습니다, 접근 권한 취소할게요",

            // 전체 취소 대화상자
            "Are you sure you want to revoke access for all applications?": "정말로 모든 앱에 대한 접근 권한을 취소하시겠어요?",
            "This will revoke access for": "이 작업은 다음에 대한 접근 권한을 취소해요:",
            "all third-party": "모든 제3자",
            "OAuth applications. This action cannot be undone.": "OAuth 앱. 이 작업은 취소할 수 없어요.",
            "Any SSH keys created on your behalf by applications will also be deleted.": "앱이 사용자님을 대신하여 생성한 모든 SSH 키도 삭제돼요.",
            "Type your username to confirm.": "확인을 위해 사용자님의 사용자명을 입력해 주세요.",
            "I understand, revoke access for everything": "알겠습니다, 모든 접근 권한 취소할게요",

            // 남용 신고 대화상자
            "Report Abuse": "남용 신고하기",
            "More options": "추가 옵션",
            "Revoking will deny future access to your account": "권한 취소 시 앞으로 사용자님의 계정 접근이 차단돼요.",

        // 승인된 GitHub 앱 승인 설정 https://github.com/settings/connections/applications/<client-id>
        // 승인된 OAuth 앱 승인 설정 https://github.com/settings/connections/applications/<id>
            "Never used": "한 번도 사용하지 않음",
            "Last used within the last week": "최근 1주일 내 사용됨",

            "Developed by": "개발자:",
            "Permissions": "권한",
            "Revoke access": "접근 권한 취소하기",
                "Are you sure you want to revoke authorization?": "정말로 승인 권한을 취소하시겠어요?",
                    // [/(.+) will no longer be able to access the GitHub API. You cannot undo this action./, "$1 은 더 이상 GitHub API에 접근할 수 없으며, 이 작업은 취소할 수 없어요."],
                "I understand, revoke access": "알겠습니다, 접근 권한 취소할게요",
                    "Revoking…": "권한 취소 중…",

            "Applications act on your behalf to access your data based on the permissions you grant them. Organizations control which applications are allowed to access their private data. Applications you authorize will always have access to public data in your organizations.": "앱은 사용자님께서 부여하신 권한을 바탕으로 대신하여 데이터에 접근해요. 조직에서는 어떤 앱이 비공개 데이터에 접근할 수 있는지를 제어해요. 사용자님께서 승인한 앱은 항상 조직 내의 공개 데이터에 접근할 수 있어요.",
            "Read about third-party access.": "제3자 접근에 대해 읽어보세요.",

            "Organization access": "조직 접근 권한",
                "Grant": "승인하기",
                "This organization allows the application to access organization data as described in the permissions above.": "이 조직은 위에서 설명한 권한에 따라 앱이 조직 데이터에 접근하는 것을 허용해요.",
                "Request": "요청하기",
                    "Until access is granted by an owner, the application cannot access the organization’s private data or modify its public data.": "소유자가 접근 권한을 승인하기 전까지 앱은 조직의 비공개 데이터에 접근하거나 공개 데이터를 수정할 수 없어요.",

        // 조직 OAuth 앱 정책 설정 /orgs/<orgs-name>/policies/applications/<id>
            "approval requested by": "승인 요청:",
            "Currently:": "현재:",
                "No private access": "비공개 접근 불가",
                "Approved": "승인됨",
            "Review third-party application access request": "제3자 앱 접근 요청 검토하기",
                "Grant access": "접근 승인하기",
                "Granting access will give this application the ability to request access to private data in the": "접근 권한을 승인하면 이 앱이 다음 조직의 비공개 데이터 접근을 요청할 수 있게 돼요:",
                "organization.": "조직.",
                
                "Deny access": "접근 거부하기",
                "Denying access will remove this application’s ability to request access to private data in the": "접근 권한을 거부하면 이 앱이 다음 조직의 비공개 데이터 접근 요청을 할 수 없게 돼요:",
            
            // 상단 알림
                // [/(.*) is authorized to access this organization’s resources/, "$1 은(는) 이 조직의 자원에 접근할 수 있도록 승인되었어요."],
                // [/(.*) is denied access this organization’s resources/, "$1 은(는) 이 조직의 자원 접근이 거부되었어요."],
            
            "Applications act on your behalf to access your data based on the permissions you grant them. Organizations control which applications are allowed to access their private data. Applications authorized by members will always have access to public data in your organization.": "앱은 사용자님께서 부여하신 권한을 바탕으로 대신하여 데이터에 접근해요. 조직에서는 어떤 앱이 비공개 데이터에 접근할 수 있는지를 제어해요. 구성원이 승인한 앱은 항상 조직 내의 공개 데이터에 접근할 수 있어요.",
            "Read about organization OAuth app access restrictions.": "조직 OAuth 앱 접근 제한에 대해 읽어보세요.",
            "No installed GitHub Apps": "설치된 GitHub 앱이 없어요",
            "You have no GitHub Apps installed on this account.": "이 계정에 설치된 GitHub앱이 없어요",
            "Visit Marketplace": "장터 방문하기",
            "My GitHub Apps": "내 깃허브 앱 보기",
    },
    "regexp": [ // 정규식 번역
        [/Your installation was suspended by you on/, "사용자님께서 설치를 일시 중지한 날짜:"],
        [/This action cannot be undone. Are you sure you want to uninstall this GitHub App from (\d+) repositor(y|ies)?/, "이 작업은 취소할 수 없어요. 정말로 이 GitHub 앱을 $1 개의 저장소에서 제거하시겠어요?"],
        [/Uninstall "(.*)"/, "“$1” 제거하기"],
        [/You will no longer be able to sign in to ([^ ]+) \(all administrative privileges will be bestowed upon the owners you choose\)/, "$1 에 더 이상 로그인할 수 없으며, 모든 관리자 권한은 사용자님께서 선택한 소유자에게 부여될 거예요."],
        [/(\d+) applications?/, "$1 개의 앱"],
        [/([^ ]+) will no longer be able to access your GitHub account. You cannot undo this action./, "$1 은 더 이상 사용자님의 GitHub 계정에 접근할 수 없으며, 이 작업은 취소할 수 없어요."],
        [/([^ ]+) has been revoked from your account./, "$1 은(는) 사용자님의 계정에서 취소되었어요."],
        [/Last used within the last (\d+) weeks? · Owned by/, "최근 $1 주 내 사용됨 · 소유자:"],
        [/Last used within the last (\d+) months? · Owned by/, "최근 $1 달 내 사용됨 · 소유자:"],
        [/Selected (\d+) repositor(y|ies)./, "$1 개의 저장소 선택됨."],
        [/You're all set! (.*) has been uninstalled./, "모든 준비가 완료되었어요! $1 이(가) 제거되었어요."],
        [/You're all set! A job has been queued to uninstall the \'(.*)\' app./, "모든 준비가 완료되었어요! ‘$1’ 앱 제거 작업이 대기 중이에요."],
        [/Okay, (.*) was installed on the (@[^ ]+) account./, "알겠습니다, $2 계정에 $1 이(가) 설치되었어요."],
        [/Okay, (.*) was updated for the (@[^ ]+) account./, "알겠습니다, $2 계정의 $1 이(가) 업데이트되었어요."],
        [/Last used within the last (\d+) weeks?/, "최근 $1 주 내 사용됨"],
        [/Last used within the last (\d+) months?/, "최근 $1 달 내 사용됨"],
        [/(.+) will no longer be able to access the GitHub API. You cannot undo this action./, "$1 은 더 이상 GitHub API에 접근할 수 없으며, 이 작업은 취소할 수 없어요."],
        [/is requesting an update to its permissions./, "권한 업데이트를 요청하고 있어요."],
        [/The (.*) app by/, "$1 앱 (제작자:"],
        [/The (.*) app will retain its current permissions if you choose not to accept the new permissions./, "새로운 권한을 수락하지 않으시면, “$1” 앱은 현재 권한을 유지할 거예요."],
        [/(.*) is authorized to access this organization’s resources/, "$1 은(는) 이 조직의 자원에 접근할 수 있도록 승인되었어요."],
        [/(.*) is denied access this organization’s resources/, "$1 은(는) 이 조직의 자원 접근이 거부되었어요."],
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
};
I18N["ko-KR"]["settings/apps/authorizations"] = I18N["ko-KR"]["settings/installations"];
I18N["ko-KR"]["settings/applications"] = I18N["ko-KR"]["settings/installations"];
I18N["ko-KR"]["settings/connections/applications"] = I18N["ko-KR"]["settings/installations"];
I18N["ko-KR"]["orgs/settings/installations"] = I18N["ko-KR"]["settings/installations"];
I18N["ko-KR"]["orgs/policies/applications"] = I18N["ko-KR"]["settings/installations"];

I18N["ko-KR"]["settings/reminders"] = { // 설정 - 예약 알림
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // 예약 알림 https://github.com/settings/reminders
            "Reminders allow you to push certain events to authorized instances of Microsoft Teams or Slack.": "예약 알림을 사용하면 Microsoft Teams나 Slack의 권한 있는 인스턴스로 특정 이벤트를 전송할 수 있어요.",
            "To use scheduled reminders, make sure that the Slack or Microsoft Teams integration is installed and up-to-date. If you need help with this, please contact your organization's owner.": "예약 알림을 사용하시려면 Slack 또는 Microsoft Teams 통합이 설치되어 있고 최신 버전인지 확인해주세요. 도움이 필요하시면 조직의 소유자님께 연락해보세요.",
            "Available organizations": "사용 가능한 조직",
            "Unavailable organizations": "사용할 수 없는 조직",
            "Configure Reminder": "알림 구성하기",
            "No reminders": "알림이 없어요",
            "Needs installing": "설치가 필요해요",

        // 새 예약 알림 https://github.com/settings/reminders/<orgs-name>
            "New scheduled reminder": "새 예약 알림",
            "Slack workspace": "Slack 작업공간",
            "Authorize Slack workspace": "Slack 작업공간 승인하기",
            "Days": "일",
                "Weekdays": "평일",
                "Monday"    : "월요일",
                "Tuesday"   : "화요일",
                "Wednesday" : "수요일",
                "Thursday"  : "목요일",
                "Friday"    : "금요일",
                "Saturday"  : "토요일",
                "Sunday"    : "일요일",
            "Times": "시간",
                "Filter": "필터",
            "Review requests assigned to you": "사용자님에게 할당된 검토 요청",
                "Receive reminders for reviews waiting on you.": "사용자님을 기다리는 검토 요청에 대한 알림을 받아보세요.",
            "Review requests assigned to your team": "사용자님 팀에 할당된 검토 요청",
                "Receive reminders for reviews waiting on your team.": "사용자님 팀을 기다리는 검토 요청에 대한 알림을 받아보세요.",
            "Enable real-time alerts": "실시간 알림 활성화하기",
                "Receive immediate Slack messages when certain events happen": "특정 이벤트 발생 시 즉시 Slack 메시지를 받아보세요.",

            "You will only receive notifications from public repositories in this organization because the current plan for": "현재 사용 중인 플랜이 비공개 저장소의 알림을 지원하지 않기 때문에, 이 조직의 공개 저장소에서만 알림을 받으실 수 있어요:",
            "does not support reminders for private repositories.": "비공개 저장소의 알림은 지원하지 않아요.",
            "Upgrade to Team": "팀으로 업그레이드하기",
            "Create reminder": "알림 만들기",

    },
    "regexp": [ // 정규식 번역
    ],
};

I18N["ko-KR"]["settings/security-log"] = { // 설정 - 보안 로그
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // 보안 로그 https://github.com/settings/security-log
            "Loading audit log entries…": "감사 로그 항목을 불러오는 중이에요...",
            "Filters": "필터",
                "Filter audit logs": "감사 로그 필터링하기",
                "Yesterday's activity": "어제 활동",
                "Repository management": "저장소 관리",
                "Billing updates": "결제 업데이트",
                "Copilot activity": "Copilot 활동",
                "Personal access token activity": "개인 접근 토큰 활동",
                "View advanced search syntax": "고급 검색 구문 보기",
            "Filter by Member": "사용자별로 필터하기",
            "Filter by Action": "이벤트별로 필터하기",
            "Search audit logs": "감사 로그 검색하기",
            "Search your security log": "보안 로그 검색하기",
            "Clear current search query": "현재 검색어 지우기",
            "Events matching search query": "검색어에 일치하는 이벤트",
            "Export": "내보내기",
            "Recent events": "최근 이벤트",
            "Unknown IP address": "알 수 없는 IP 주소",
            "Unknown location": "알 수 없는 위치",
            // [/Found (\d+) events?/, "발견 $1 개의 이벤트"],
            "Newer": "최신순",
            "Older": "이전순",
            "ProTip!": "프로 팁!",
                "View all events created yesterday": "어제 생성된 모든 이벤트 보기",
                "View all events where you created something": "사용자님이 생성한 모든 이벤트 보기",
            "Country changed from your previous session": "이전 세션과 국가/지역이 달라졌어요",
            "Logged in": "로그인함",
            "User signed in from an unrecognized device.": "사용자님이 인식되지 않는 장치에서 로그인하셨어요.",
            "User signed in from an unrecognized device and location.": "사용자님이 인식되지 않는 장치와 위치에서 로그인하셨어요.",
            "New Device Used": "새로운 장치 사용됨",
            "Created the repository": "저장소를 생성했어요.",
            "Created GitHub Pages site in": "GitHub Pages 사이트를 생성했어요:",
            "Modified GitHub Pages source in": "GitHub Pages 소스를 수정했어요:",
            "Created environment": "환경을 생성했어요.",
            "Added": "추가했어요.",
            "to the": "에",
            "repository": "저장소",
                "organization with": "조직, 사용하여",
                "read": "읽기",
                "permission": "권한",
            "Added the following repositories to the": "다음 저장소들을 추가했어요:",
            "integration:": "통합:",
            "Enabled GitHub Actions for": "GitHub 액션을 활성화했어요:",
            "Created a secret for": "비밀을 생성했어요:",
            "Created a token for": "토큰을 생성했어요:",
            "Regenerated a token for": "토큰을 재생성했어요:",
            "Revoked a token for": "토큰을 취소했어요:",
                "ending in": "로 끝나는",
                "for the": "에 대한",
                "GitHub App": "GitHub 앱",

    },
    "regexp": [ // 정규식 번역
        [/Found (\d+) events?/, "$1 개의 이벤트 발견"],
        [/View ([^ ]+)'s profile/, "$1 의 프로필 보기"],
    ],
};

I18N["ko-KR"]["settings/sponsors-log"] = { // 설정 - 후원 로그
    "static": { // 정적 번역
        ...I18N["ko-KR"]["settings-menu"]["static"],

        // Sponsorship log 후원 로그 https://github.com/settings/sponsors-log
            "Sponsors log": "후원 로그",
            "New sponsorships, changes, and cancellations": "새로운 후원, 변경, 취소 내역",
            "Period:": "기간:",
            "Filter activity": "활동 필터링",
            "All-time": "전체 기간",
            "Past day": "지난 하루",
            "Past week": "지난 일주일",
            "Past month": "지난 한 달",
            "Past year": "지난 1년",
            "No sponsorship activity in this time period": "이 기간 동안 후원 활동이 없어요.",
            "This is where you can review activity from your sponsorships.": "여기에서 후원 활동 내역을 확인하실 수 있어요.",

    },
    "regexp": [ // 정규 표현식 번역
    ],
};

I18N["ko-KR"]["settings/apps"] = { // 설정 - 개발자 설정/GitHub 앱
    "static": { // 정적 번역
        "Developer Settings": "개발자 설정",
        "GitHub Apps": "GitHub 앱",
        "OAuth Apps": "OAuth 앱",
        "Personal access tokens": "개인 접근 토큰",
            "Fine-grained tokens": "세분화된 토큰",
            "Tokens (classic)": "토큰(클래식)",

        // GitHub 앱 https://github.com/settings/apps
            // 상단 알림
                "Job queued to revoke all user tokens": "모든 사용자 토큰 취소 작업이 대기 중이에요.",

            "Register a new GitHub App": "새 GitHub 앱 등록하기",
            "Want to build something that integrates with and extends GitHub?": "GitHub와 통합 및 확장하는 무언가를 만들어보고 싶으세요?",
            "New GitHub App": "새 GitHub 앱 등록하기",
            "to get started developing on the GitHub API. You can also read more about building GitHub Apps in our": "GitHub API로 개발을 시작해 보세요. 또한 GitHub 앱 구축에 관한 자세한 내용은 저희의",
            "developer documentation": "개발자 문서",
            "A GitHub App can act on its own behalf, taking actions via the API directly instead of impersonating a user. Read more in our": "GitHub 앱은 사용자 대신 직접 API를 통해 작업할 수 있어요. 자세한 내용은 저희의", // 앱이 있을 때

            // 앱이 없을 때 안내
                "No GitHub Apps": "GitHub 앱이 없어요.",
                    "Want to build something that integrates with and extends GitHub? Register a new GitHub App to get started developing on the GitHub API.": "GitHub와 통합 및 확장하는 무언가를 만들어보고 싶으세요? 새 GitHub 앱을 등록해서 GitHub API 개발을 시작해 보세요.",
 
                "View documentation": "문서 보기",

        // GitHub 앱 등록 https://github.com/settings/apps/new
            "Register new GitHub App": "새 GitHub 앱 등록하기",
            "GitHub App name": "GitHub 앱 이름",
            "The name of your GitHub App.": "사용자님의 GitHub 앱 이름이에요.",
            "Markdown supported": "Markdown 문법 지원해요",
            "This is displayed to users of your GitHub App": "GitHub 앱 사용자에게 표시돼요.",
            "Homepage URL": "홈페이지 URL",
                "The full URL to your GitHub App’s website.": "GitHub 앱 웹사이트의 전체 URL이에요.",
 
            "Identifying and authorizing users": "사용자 식별 및 인증",
                "The full URL to redirect to after a user authorizes an installation.": "사용자께서 설치를 승인한 후 리디렉션할 전체 URL이에요.",
                "Callback URL documentation": "콜백 URL 문서",
                "Add Callback URL": "콜백 URL 추가하기",
 
                "Callback URL": "콜백 URL",
                "Expire user authorization tokens": "사용자 인증 토큰 만료시키기",
                    "This will provide a": "이 기능은",
                    "which can be used to request an updated access token when this access token expires.": "해당 토큰 만료 시 새 접근 토큰을 요청하는 데 사용될 수 있어요.",
                "Request user authorization (OAuth) during installation": "설치 중에 사용자 인증 (OAuth) 요청하기",
                    "Requests that the installing user grants access to their identity during installation of your App": "설치 중에 사용자께서 본인의 신원 접근을 허용해 주시도록 요청해요.",
                    "Identifying and authorizing users for GitHub Apps documentation": "GitHub 앱의 사용자 식별 및 인증에 관한 문서",
                "Enable Device Flow": "디바이스 흐름 활성화하기",
                    "Allow this GitHub App to authorize users via the Device Flow.": "이 GitHub 앱이 디바이스 흐름을 통해 사용자 인증을 할 수 있도록 허용해요.",
                    "Read the": "문서 읽어보기",
                    "Device Flow documentation": "디바이스 흐름 문서",
 
            "Post installation": "설치 완료 후",
                "Setup URL (optional)": "설정 URL (선택 사항)",
                    "Users will be redirected to this URL after installing your GitHub App to complete additional setup.": "사용자께서 GitHub 앱 설치 후 추가 설정을 완료하시도록 이 URL로 리디렉션돼요.",
                    "Unavailable when requesting OAuth during installation.": "설치 중 OAuth 요청 시에는 사용 불가능해요.",
                    "Users will be redirected to the 'User authorization callback URL' to complete additional setup.": "추가 설정을 완료하려면 사용자께서 '사용자 인증 콜백 URL'로 리디렉션돼요.",
                "Redirect on update": "업데이트 시 리디렉션하기",
                    "Redirect users to the 'Setup URL' after installations are updated (E.g. repositories added/removed).": "설치 업데이트 후(예: 저장소 추가/삭제 시) 사용자께서 '설정 URL'로 리디렉션되도록 해요.",
                    "Redirect users to the 'User authorization callback URL' after installations are updated (E.g repositories added/removed).": "설치 업데이트 후(예: 저장소 추가/삭제 시) 사용자께서 '사용자 인증 콜백 URL'로 리디렉션되도록 해요.",
 
            "Webhook": "웹훅",
                "Active": "활성화",
                    "We will deliver event details when this hook is triggered.": "훅이 트리거되면 이벤트 상세 정보를 전달해드려요.",
                "Webhook URL": "웹훅 URL",
                    "Events will POST to this URL. Read our": "이벤트가 이 URL로 POST돼요. 저희의",
                    "webhook documentation": "웹훅 문서",
                    "for more information.": "을 읽어보세요.",
                "Secret": "시크릿",
                    "Read our": "저희의",
                    "webhook secret documentation": "웹훅 시크릿 문서",
 
            "Permissions": "권한",
                "User permissions are granted on an individual user basis as part of the": "사용자 권한은 개별 사용자 단위로 부여돼요, 이는",
                "User authorization flow": "사용자 인증 흐름",
                "permissions documentation": "권한 문서",
                "for information about specific permissions.": "를 참고하세요.",
 
                "Access:": "접근 권한:",
                "Select an access level": "접근 수준 선택하기",
                "No access": "접근 금지",
                "Read-only": "읽기 전용",
                "Read and write": "읽기/쓰기",
                "Admin": "관리자",
 
                  "Selected": "선택됨",
                  "mandatory": "필수",
 
                "Repository permissions": "저장소 권한",
                    "Repository permissions permit access to repositories and related resources.": "저장소 권한은 저장소와 관련 리소스에 접근할 수 있도록 해줘요.",
 
                    "Actions": "액션",
                        "Workflows, workflow runs and artifacts.": "워크플로, 워크플로 실행 및 아티팩트에 관한 내용이에요.",
                    "Administration": "관리",
                        "Repository creation, deletion, settings, teams, and collaborators.": "저장소 생성, 삭제, 설정, 팀 및 협업자 관련이에요.",
                    "Attestations": "증명서",
                        "Create and retrieve attestations for a repository.": "저장소의 증명서를 생성하고 조회할 수 있어요.",
                    "Checks": "체크",
                        "Checks on code.": "코드를 체크해요.",
                    "Code scanning alerts": "코드 스캔 알림",
                        "View and manage code scanning alerts.": "코드 스캔 알림을 조회 및 관리할 수 있어요.",
                    // "": "코드스페이스",
                        "Create, edit, delete and list Codespaces.": "코드스페이스를 생성, 편집, 삭제 및 목록을 볼 수 있어요.",
                    "Codespaces lifecycle admin": "코드스페이스 라이프사이클 관리",
                        "Manage the lifecycle of Codespaces, including starting and stopping.": "코드스페이스의 라이프사이클(시작 및 중지 포함)을 관리해요.",
                    "Codespaces metadata": "코드스페이스 메타데이터",
                        "Access Codespaces metadata including the devcontainers and machine type.": "코드스페이스 메타데이터(개발 컨테이너 및 머신 타입 포함)를 조회할 수 있어요.",
                    "Codespaces secrets": "코드스페이스 시크릿",
                        "Restrict Codespaces user secrets modifications to specific repositories.": "코드스페이스 사용자 시크릿 수정 권한을 특정 저장소로 제한할 수 있어요.",
                    "Commit statuses": "커밋 상태",
                        "Commit statuses.": "커밋 상태에 관한 정보에요.",
                    "Contents": "내용",
                        "Repository contents, commits, branches, downloads, releases, and merges.": "저장소 내용, 커밋, 분기, 다운로드, 릴리즈 및 병합 내역이에요.",
                    // 自定义属性
                        "View and set values for a repository's custom properties, when allowed by the property.": "속성 허용 시, 저장소의 사용자 정의 속성 값을 조회 및 설정할 수 있어요.",
                    "Dependabot alerts": "Dependabot 알림",
                        "Retrieve Dependabot alerts.": "Dependabot 알림을 조회할 수 있어요.",
                    "Dependabot secrets": "Dependabot 시크릿",
                        "Manage Dependabot repository secrets.": "Dependabot 저장소 시크릿을 관리할 수 있어요.",
                    "Deployments": "배포",
                        "Deployments and deployment statuses.": "배포 및 배포 상태에 관한 내용이에요.",
                    "Discussions": "토론",
                        "Discussions and related comments and labels.": "토론 및 관련 댓글과 라벨이에요.",
                    "Environments": "환경",
                        "Manage repository environments.": "저장소 환경을 관리할 수 있어요.",
                    "Issues": "이슈",
                        "Issues and related comments, assignees, labels, and milestones.": "이슈와 관련 댓글, 담당자, 라벨, 마일스톤이에요.",
                    "Merge queues": "병합 큐",
                        "Manage a repository's merge queues": "저장소의 병합 큐를 관리할 수 있어요.",
                    "Metadata": "메타데이터",
                        "Search repositories, list collaborators, and access repository metadata.": "저장소 검색, 협업자 목록 조회, 저장소 메타데이터 접근이 가능해요.",
                    "Packages": "패키지",
                        "Packages published to the GitHub Package Platform.": "GitHub 패키지 플랫폼에 게시된 패키지에 관한 내용이에요.",
                    "Pages": "GitHub Pages",
                        "Retrieve Pages statuses, configuration, and builds, as well as create new builds.": "Pages 상태, 구성, 빌드 조회 및 새 빌드 생성이 가능해요.",
                    "Projects": "프로젝트",
                        "Manage classic projects within a repository.": "저장소 내 클래식 프로젝트를 관리할 수 있어요.",
                    "Pull requests": "끌어오기 요청",
                        "Pull requests and related comments, assignees, labels, milestones, and merges.": "끌어오기 요청 및 관련 댓글, 담당자, 라벨, 마일스톤, 병합 내역이에요.",
                    "Repository security advisories": "저장소 보안 공지",
                        "View and manage repository security advisories.": "저장소 보안 공지를 조회 및 관리할 수 있어요.",
                    "Secret scanning alerts": "시크릿 스캔 알림",
                        "View and manage secret scanning alerts.": "시크릿 스캔 알림을 조회 및 관리할 수 있어요.",
                    "Secrets": "시크릿",
                        "Manage Actions repository secrets.": "액션 저장소 시크릿을 관리할 수 있어요.",
                    "Single file": "단일 파일",
                        "Manage just a single file.": "단일 파일만 관리할 수 있어요.",
                        "Path": "경로",
                        "The content paths to single files your app can access.": "앱이 접근할 수 있는 단일 파일의 콘텐츠 경로에요.",
                    "Variables": "변수",
                        "Manage Actions repository variables.": "액션 저장소 변수를 관리할 수 있어요.",
                    "Webhooks": "웹훅",
                        "Manage the post-receive hooks for a repository.": "저장소의 포스트-리시브 훅을 관리할 수 있어요.",
                    "Workflows": "워크플로",
                        "Update GitHub Action workflow files.": "GitHub 액션 워크플로 파일을 업데이트할 수 있어요.",
 
                "Organization permissions": "조직 권한",
                    "Organization permissions permit access to organization related resources.": "조직 권한은 조직 관련 리소스에 접근할 수 있도록 해줘요.",
 
                    "API Insights": "API 인사이트",
                        "View statistics on how the API is being used for an organization.": "조직에서 API 사용 통계를 조회할 수 있어요.",
                    // 관리
                        "Manage access to an organization.": "조직 접근을 관리할 수 있어요.",
                    "Blocking users": "사용자 차단하기",
                        "View and manage users blocked by the organization.": "조직에서 차단한 사용자를 조회 및 관리할 수 있어요.",
                    "Custom organization roles": "사용자 정의 조직 역할",
                        "Create, edit, delete and list custom organization roles. View system organization roles.": "사용자 정의 조직 역할을 생성, 편집, 삭제 및 목록 조회할 수 있어요. 시스템 조직 역할도 확인할 수 있어요.",
                    "Custom properties": "사용자 정의 속성",
                        "View custom properties, write repository values, and administer definitions.": "사용자 정의 속성을 조회하고, 저장소 값을 입력하며 정의를 관리할 수 있어요.",
                    "Custom repository roles": "사용자 정의 저장소 역할",
                        "Create, edit, delete and list custom repository roles.": "사용자 정의 저장소 역할을 생성, 편집, 삭제 및 목록 조회할 수 있어요.",
                    "Events": "이벤트",
                        "View events triggered by an activity in an organization.": "조직 내 활동으로 발생한 이벤트를 조회할 수 있어요.",
                    "GitHub Copilot Business": "GitHub Copilot 비즈니스",
                        "Manage Copilot Business seats and settings": "Copilot 비즈니스 좌석 및 설정을 관리할 수 있어요.",
                    "Knowledge bases": "지식 베이스",
                        "View and manage knowledge bases for an organization.": "조직의 지식 베이스를 조회 및 관리할 수 있어요.",
                    "Members": "멤버",
                        "Organization members and teams.": "조직 멤버 및 팀 관련이에요.",
                    "Organization announcement banners": "조직 공지 배너",
                        "View and modify announcement banners for an organization.": "조직의 공지 배너를 조회 및 수정할 수 있어요.",
                    "Organization codespaces": "조직 코드스페이스",
                        "Manage Codespaces for an organization.": "조직의 코드스페이스를 관리할 수 있어요.",
                    "Organization codespaces secrets": "조직 코드스페이스 시크릿",
                        "Manage Codespaces Secrets for an organization.": "조직 코드스페이스 시크릿을 관리할 수 있어요.",
                    "Organization codespaces settings": "조직 코드스페이스 설정",
                        "Manage Codespaces settings for an organization.": "조직 코드스페이스 설정을 관리할 수 있어요.",
                    "Organization dependabot secrets": "조직 Dependabot 시크릿",
                        "Manage Dependabot organization secrets.": "조직의 Dependabot 시크릿을 관리할 수 있어요.",
                    "Organization private registries": "조직 개인 레지스트리",
                        "Manage private registries for an organization.": "조직의 개인 레지스트리를 관리할 수 있어요.",
                    "Personal access token requests": "개인 접근 토큰 요청",
                        "Manage personal access token requests from organization members.": "조직 멤버의 개인 접근 토큰 요청을 관리할 수 있어요.",
                    "Personal access tokens": "개인 접근 토큰",
                        "View and revoke personal access tokens that have been granted access to an organization.": "조직 접근 권한이 부여된 개인 접근 토큰을 조회하고 취소할 수 있어요.",
                    "Plan": "플랜",
                        "View an organization's plan.": "조직의 플랜을 조회할 수 있어요.",
                    // 프로젝트
                        "Manage projects for an organization.": "조직의 프로젝트를 관리할 수 있어요.",
                    // 시크릿
                        "Manage Actions organization secrets.": "액션 조직 시크릿을 관리할 수 있어요.",
                    "Self-hosted runners": "자체 호스팅 러너",
                        "View and manage Actions self-hosted runners available to an organization.": "조직에서 사용 가능한 액션 자체 호스팅 러너를 조회 및 관리할 수 있어요.",
                    "Team discussions": "팀 토론",
                        "Manage team discussions and related comments.": "팀 토론 및 관련 댓글을 관리할 수 있어요.",
                    // 변수
                        "Manage Actions organization variables.": "액션 조직 변수를 관리할 수 있어요.",
                    // 웹훅
                        "Manage the post-receive hooks for an organization.": "조직의 포스트-리시브 훅을 관리할 수 있어요.",
 
                "Account permissions": "계정 권한",
                    "These permissions are granted on an individual user basis as part of the User authorization flow.": "이 권한들은 사용자 인증 흐름의 일환으로 개별 사용자에게 부여돼요.",
 
                    "Block another user": "다른 사용자 차단하기",
                        "View and manage users blocked by the user.": "사용자께서 차단한 사용자를 조회 및 관리할 수 있어요.",
                    "Codespaces user secrets": "코드스페이스 사용자 시크릿",
                        "Manage Codespaces user secrets.": "코드스페이스 사용자 시크릿을 관리할 수 있어요.",
                    "Copilot Chat ": "Copilot 채팅",
                        "This application will receive your GitHub ID, your GitHub Copilot Chat session messages (not including messages sent to another application), and timestamps of provided GitHub Copilot Chat session messages. This permission must be enabled for Copilot Extensions.": "이 애플리케이션은 사용자님의 GitHub ID, GitHub Copilot 채팅 세션 메시지(다른 애플리케이션으로 전송된 메시지 제외)와 메시지 타임스탬프를 받게 돼요. Copilot 확장을 사용하려면 이 권한을 활성화해야 해요.",
                    "Copilot Editor Context": "Copilot 에디터 컨텍스트",
                        "This application will receive bits of Editor Context (e.g. currently opened file) whenever you send it a message through Copilot Chat.": "Copilot 채팅을 통해 메시지를 보낼 때마다 에디터 컨텍스트(예: 현재 열려있는 파일) 일부를 받게 돼요.",
                    "Email addresses": "이메일 주소",
                        "Manage a user's email addresses.": "사용자님의 이메일 주소를 관리할 수 있어요.",
                    // 활동
                        "View events triggered by a user's activity.": "사용자 활동으로 발생한 이벤트를 조회할 수 있어요.",
                    // 팔로워
                        "A user's followers": "사용자님의 팔로워에요.",
                    "GPG keys": "GPG 키",
                        "View and manage a user's GPG keys.": "사용자님의 GPG 키를 조회 및 관리할 수 있어요.",
                    // Gist
                        "Create and modify a user's gists and comments.": "사용자님의 Gist와 댓글을 생성 및 수정할 수 있어요.",
                    "Git SSH keys": "Git SSH 키",
                    "Interaction limits": "상호 작용 제한",
                        "Interaction limits on repositories": "저장소의 상호 작용 제한이에요.",
                    // 플랜
                        "View a user's plan.": "사용자님의 플랜을 조회할 수 있어요.",
                    "Profile": "프로필",
                        "Manage a user's profile settings.": "사용자님의 프로필 설정을 관리할 수 있어요.",
                    "SSH signing keys": "SSH 서명 키",
                        "View and manage a user's SSH signing keys.": "사용자님의 SSH 서명 키를 조회 및 관리할 수 있어요.",
                    "Starring": "별표",
                        "List and manage repositories a user is starring.": "사용자님이 별표를 누른 저장소를 조회 및 관리할 수 있어요.",
                    "Watching": "구독",
                        "List and change repositories a user is subscribed to.": "사용자님이 구독 중인 저장소를 조회 및 변경할 수 있어요.",
 
            // 아래 이벤트는 웹훅 페이지와 동일해요
            // 훅 추가 페이지 /<user-name>/<repo-name>/settings/hooks/new
            "Subscribe to events": "이벤트 구독하기",
                "Based on the permissions you’ve selected, what events would you like to subscribe to?": "선택한 권한에 따라 구독할 이벤트를 선택해 보세요.",
                "Installation target": "설치 대상",
                    "A GitHub App installation target is renamed.": "GitHub 앱 설치 대상의 명칭이 변경되었어요.",
                "Meta": "메타데이터",
                    "When this App is deleted and the associated hook is removed.": "앱이 삭제되고 관련 훅이 제거될 때에요.",
                "Security advisory": "보안 권고",
                    "Security advisory published, updated, or withdrawn.": "보안 권고가 게시, 업데이트 또는 철회되었어요.",
                "Branch protection configuration": "분기 보호 구성",
                    "All branch protections disabled or enabled for a repository.": "저장소의 모든 분기 보호가 활성화 또는 비활성화되었어요.",
                "Branch protection rule": "분기 보호 규칙",
                    "Branch protection rule created, deleted or edited.": "분기 보호 규칙이 생성, 삭제 또는 편집되었어요.",
                "Code scanning alert": "코드 스캔 알림",
                    "Code Scanning alert created, fixed in branch, or closed": "코드 스캔 알림이 생성되거나, 분기에서 수정되었거나, 닫혔어요.",
                "Check run": "체크 실행",
                    "Check run is created, requested, rerequested, or completed.": "체크 실행이 생성, 요청, 재요청 또는 완료되었어요.",
                "Check suite": "체크 스위트",
                    "Check suite is requested, rerequested, or completed.": "체크 스위트가 요청, 재요청 또는 완료되었어요.",
                "Commit comment": "커밋 댓글",
                    "Commit or diff commented on.": "커밋 또는 변경사항에 대해 댓글이 달렸어요.",
                //"创建": "",
                    "Branch or tag created.": "분기 또는 꼬리표가 생성되었어요.",
                "Custom property": "사용자 정의 속성",
                    "Custom property is created, updated, or deleted.": "사용자 정의 속성이 생성, 업데이트 또는 삭제되었어요.",
                "Custom property values": "사용자 정의 속성 값",
                    "Custom property values are changed for a repository": "저장소의 사용자 정의 속성 값이 변경되었어요.",
                "Discussion": "토론",
                    "Discussion created, edited, closed, reopened, pinned, unpinned, locked, unlocked, transferred, answered, unanswered, labeled, unlabeled, had its category changed, or was deleted.": "토론이 생성, 편집, 종료, 재개, 고정, 고정 해제, 잠금, 잠금 해제, 전환, 답변, 미답변, 라벨 추가, 라벨 제거, 카테고리 변경 또는 삭제되었어요.",
                "Discussion comment": "토론 댓글",
                    "Discussion comment created, edited, or deleted.": "토론 댓글이 생성, 편집 또는 삭제되었어요.",
                //"删除": "",
                    "Branch or tag deleted.": "분기 또는 꼬리표가 삭제되었어요.",
                "Dependabot alert": "Dependabot 알림",
                    "Dependabot alert auto_dismissed, auto_reopened, created, dismissed, reopened, fixed, or reintroduced.": "Dependabot 알림이 자동 해제, 자동 재개, 생성, 해제, 재개, 수정 또는 재도입되었어요.",
                "Deploy key": "배포 키",
                    "A deploy key is created or deleted from a repository.": "저장소에서 배포 키가 생성되거나 삭제되었어요.",
                "Deployment": "배포",
                    "Repository was deployed or a deployment was deleted.": "저장소가 배포되었거나 배포가 삭제되었어요.",
                "Deployment protection rule": "배포 보호 규칙",
                    "Deployment protection rule requested for an environment.": "환경에 대해 배포 보호 규칙이 요청되었어요.",
                "Deployment review": "배포 검토",
                    "Deployment review requested, approved or rejected": "배포 검토가 요청, 승인 또는 거부되었어요.",
                "Deployment status": "배포 상태",
                    "Deployment status updated from the API.": "API를 통해 배포 상태가 업데이트되었어요.",
                "Exemption request push ruleset": "푸시 규칙집 예외 요청",
                    "Push ruleset bypass request was created, cancelled, completed, received a response, or a response was dismissed. Note: Delegated bypass for push rules is currently in beta and subject to change.": "푸시 규칙집 예외 요청이 생성, 취소, 완료, 응답 수신 또는 응답 해제되었어요. 참고: 푸시 규칙 위임 예외는 현재 베타 단계이며 변경될 수 있어요.",
                "Exemption request secret scanning": "시크릿 스캔 예외 요청",
                    "Secret scanning push protection bypass request was created, cancelled, completed, received a response, or a response was dismissed. Note: Delegated bypass for push protection is currently in beta and subject to change.": "시크릿 스캔 푸시 보호 예외 요청이 생성, 취소, 완료, 응답 수신 또는 응답 해제되었어요. 참고: 푸시 보호 위임 예외는 현재 베타 단계이며 변경될 수 있어요.",
                //"复刻": "",
                    "Repository forked.": "저장소가 포크되었어요.",
                "Gollum": "골룸",
                    "Wiki page updated.": "Wiki 페이지가 업데이트되었어요.",
                "Issue comment": "이슈 댓글",
                    "Issue comment created, edited, or deleted.": "이슈 댓글이 생성, 편집 또는 삭제되었어요.",
                //"이슈": "",
                    "Issue opened, edited, deleted, transferred, pinned, unpinned, closed, reopened, assigned, unassigned, labeled, unlabeled, milestoned, demilestoned, locked, or unlocked.": "이슈가 열리거나, 편집, 삭제, 전환, 고정, 고정 해제, 종료, 재개, 할당, 할당 취소, 라벨 추가, 라벨 제거, 마일스톤 설정, 마일스톤 해제, 잠금 또는 잠금 해제되었어요.",
                "Label": "라벨",
                    "Label created, edited or deleted.": "라벨이 생성, 편집 또는 삭제되었어요.",
                "Milestone": "마일스톤",
                    "Milestone created, closed, opened, edited, or deleted.": "마일스톤이 생성, 종료, 열림, 편집 또는 삭제되었어요.",
                "Member": "멤버",
                    "Collaborator added to, removed from, or has changed permissions for a repository.": "저장소에 협업자가 추가되거나 제거되었거나 권한이 변경되었어요.",
                "Membership": "팀 멤버십",
                    "Team membership added or removed.": "팀 멤버십이 추가되거나 제거되었어요.",
                "Merge group": "병합 그룹",
                    "Merge Group requested checks, or was destroyed.": "병합 그룹이 체크를 요청하거나 제거되었어요.",
                "Merge queue entry": "병합 큐 항목",
                    "Merge Queue entry added": "병합 큐 항목이 추가되었어요.",
                "Organization": "조직",
                    "Organization deleted, renamed, member invited, member added, or member removed.": "조직이 삭제, 이름 변경, 멤버 초대, 추가 또는 제거되었어요.",
                "Page build": "GitHub Pages 빌드",
                    "Pages site built.": "GitHub Pages 사이트가 빌드되었어요.",
                "Personal access token request": "개인 접근 토큰 요청",
                    "Personal access token request created, approved, denied, or cancelled.": "개인 접근 토큰 요청이 생성, 승인, 거부 또는 취소되었어요.",
                "Project": "프로젝트",
                    "Project created, updated, or deleted.": "프로젝트가 생성, 업데이트 또는 삭제되었어요.",
                "Project card": "프로젝트 카드",
                    "Project card created, updated, or deleted.": "프로젝트 카드가 생성, 업데이트 또는 삭제되었어요.",
                "Project column": "프로젝트 칼럼",
                    "Project column created, updated, moved or deleted.": "프로젝트 칼럼이 생성, 업데이트, 이동 또는 삭제되었어요.",
                "Projects v2 item": "프로젝트 v2 항목",
                    "Project item created, edited, deleted, archived, restored, converted, or reordered.": "프로젝트 항목이 생성, 편집, 삭제, 보관, 복원, 전환 또는 재정렬되었어요.",
                "Projects v2": "프로젝트 v2",
                    "Project created, updated, deleted, closed, or reopened.": "프로젝트가 생성, 업데이트, 삭제, 종료 또는 재개되었어요.",
                "Projects v2 status update": "프로젝트 v2 상태 업데이트",
                    "Project status updates created, updated, or deleted.": "프로젝트 상태 업데이트가 생성, 업데이트 또는 삭제되었어요.",
                // 공통
                    "Repository changes from private to public.": "저장소가 비공개에서 공개로 변경되었어요.",
                "Pull request": "끌어오기 요청",
                    "Pull request assigned, auto merge disabled, auto merge enabled, closed, converted to draft, demilestoned, dequeued, edited, enqueued, labeled, locked, milestoned, opened, ready for review, reopened, review request removed, review requested, synchronized, unassigned, unlabeled, or unlocked.": "끌어오기 요청이 할당, 자동 병합 비활성화, 자동 병합 활성화, 종료, 초안 전환, 마일스톤 해제, 큐 제거, 편집, 큐 추가, 라벨 추가, 잠금, 마일스톤 설정, 열림, 검토 준비, 재개, 검토 요청 제거, 검토 요청, 동기화, 할당 취소, 라벨 제거 또는 잠금 해제되었어요.",
                "Pull request review": "끌어오기 요청 검토",
                    "Pull request review submitted, edited, or dismissed.": "끌어오기 요청 검토가 제출, 편집 또는 기각되었어요.",
                "Pull request review comment": "끌어오기 요청 검토 댓글",
                    "Pull request diff comment created, edited, or deleted.": "끌어오기 요청 차이 댓글이 생성, 편집 또는 삭제되었어요.",
                "Pull request review thread": "끌어오기 요청 검토 스레드",
                    "A pull request review thread was resolved or unresolved.": "끌어오기 요청 검토 스레드가 해결되었거나 미해결 상태에요.",
                "Push": "푸시",
                    "Git push to a repository.": "저장소로 Git 푸시가 이루어졌어요.",
                "Registry package": "레지스트리 패키지",
                    "Registry package published or updated in a repository.": "저장소에서 레지스트리 패키지가 게시 또는 업데이트되었어요.",
                "Release": "릴리즈",
                    "Release created, edited, published, unpublished, or deleted.": "릴리즈가 생성, 편집, 게시, 비게시 또는 삭제되었어요.",
                "Repository": "저장소",
                    "Repository created, deleted, archived, unarchived, publicized, privatized, edited, renamed, or transferred.": "저장소가 생성, 삭제, 보관, 보관 해제, 공개, 비공개, 편집, 이름 변경 또는 이전되었어요.",
                "Repository dispatch": "저장소 디스패치",
                    "When a message is dispatched from a repository.": "저장소에서 메시지가 디스패치될 때에요.",
                "Repository ruleset": "저장소 규칙집",
                    "Repository ruleset created, deleted or edited.": "저장소 규칙집이 생성, 삭제 또는 편집되었어요.",
                "Security and analysis": "보안 및 분석",
                    "Code security features enabled or disabled for a repository.": "저장소의 코드 보안 기능이 활성화 또는 비활성화되었어요.",
                "Secret scanning alert": "시크릿 스캔 알림",
                    "Secrets scanning alert created, resolved, reopened, validated, or publicly leaked.": "시크릿 스캔 알림이 생성, 해결, 재개, 검증 또는 공개 누출되었어요.",
                "Secret scanning alert location": "시크릿 스캔 알림 위치",
                    "Secrets scanning alert location created.": "시크릿 스캔 알림 위치가 생성되었어요.",
                "Secret scanning scan": "시크릿 스캔",
                    "Secrets scanning scan completed.": "시크릿 스캔이 완료되었어요.",
                // 별표
                    "A star is created or deleted from a repository.": "저장소에 별표가 생성되거나 취소되었어요.",
                //"状态": "",
                    "Commit status updated from the API.": "API를 통해 커밋 상태가 업데이트되었어요.",
                //"团队": "",
                    "Team is created, deleted, edited, or added to/removed from a repository.": "팀이 생성, 삭제, 편집되었거나 저장소에 추가/제거되었어요.",
                "Team add": "팀 추가",
                    "Team added or modified on a repository.": "저장소 팀이 추가되거나 수정되었어요.",
                "Watch": "구독",
                    "User stars a repository.": "사용자님이 저장소에 별표를 눌렀어요.",
                "Workflow dispatch": "워크플로 디스패치",
                    "A manual workflow run is requested.": "수동 워크플로 실행이 요청되었어요.",
                "Workflow job": "워크플로 작업",
                    "Workflow job queued, waiting, in progress, or completed on a repository.": "저장소에서 워크플로 작업이 대기, 진행 중 또는 완료되었어요.",
                "Workflow run": "워크플로 실행",
                    "Workflow run requested or completed on a repository.": "저장소에서 워크플로 실행이 요청되었거나 완료되었어요.",
                "Org block": "조직 차단", // 조직 설정
                    "A user has been blocked or unblocked.": "사용자가 차단되었거나 차단 해제되었어요.",
                "Repository advisory": "저장소 공지",
                    "Repository advisory published or reported.": "저장소 공지가 게시되었거나 보고되었어요.",
                "Sub issues": "하위 이슈",
                    "Sub-issues added or removed, and parent issues added or removed.": "하위 이슈와 상위 이슈가 추가 또는 제거되었어요.",
 
            "Where can this GitHub App be installed?": "이 GitHub 앱을 어디에 설치할 수 있나요?",
                "Only on this account": "현재 계정에만 설치하기",
                    // [/Only allow this GitHub App to be installed on the (@[^ ]+) account./, "仅允许在 $1 帐户上安装此 GitHub 应用。"],
                "Any account": "어떤 계정에도 설치 가능",
                    "Allow this GitHub App to be installed by any user or organization.": "어떤 사용자나 조직에서도 이 GitHub 앱을 설치할 수 있도록 해요.",
 
            "Create GitHub App": "GitHub 앱 만들기",
 
        // 특정 GitHub 앱 https://github.com/settings/apps/<app-name>
            // 상단 알림
                // GitHub 앱 등록 성공
                "Registration successful. You must": "등록에 성공했어요. 반드시",
                "generate a private key": "개인 키를 생성해야 해요.",
                "in order to install your GitHub App.": "그래야 GitHub 앱을 설치할 수 있어요.",
                // GitHub 앱 업데이트됨
                "Got it. Your GitHub App has been updated.": "알겠어요. GitHub 앱이 업데이트되었어요.",
                "The GitHub App is now public. Anyone is free to install it.": "GitHub 앱이 이제 공개되었어요. 누구나 자유롭게 설치할 수 있어요.",
                "The GitHub App is now private. It can only be installed on this account.": "GitHub 앱이 이제 비공개로 전환되었어요. 현재 계정에만 설치할 수 있어요.",
 
            "Developer settings": "개발자 설정",
            // 왼쪽 메뉴
                "General": "일반",
                "Permissions & events": "권한 및 이벤트",
                "Install App": "앱 설치하기",
                "Advanced": "고급",
                "Optional features": "선택적 기능",
                "Public page": "공개 페이지",
 
            // 정보
                "Owned by:": "소유자:",
                "Using your App ID to get installation tokens? You can now": "앱 ID로 설치 토큰을 받으시나요? 이제는",
                "use your Client ID instead": "클라이언트 ID를 사용해 보실 수 있어요.",
                "Revoke all user tokens": "모든 사용자 토큰 취소하기",
                "GitHub Apps can use OAuth credentials to identify users. Learn more about identifying users by reading our": "GitHub 앱은 OAuth 자격 증명을 사용해 사용자를 식별할 수 있어요. 사용자 식별에 관한 자세한 내용은 저희의",
                "integration developer documentation": "통합 개발자 문서를",
 
                "Public link": "공개 링크",
 
                // 모든 사용자 토큰 취소 대화상자
                "Revoke all user tokens?": "모든 사용자 토큰을 취소할까요?",
                    "Are you sure you want to revoke": "이 앱의",
                    "all": "모든",
                    "user tokens for this application?": "사용자 토큰을 취소하시겠어요?",
                    "All users of this application will be forced back through the": "이 앱의 모든 사용자는 다시",
                    "authorization flow": "인증 과정을",
                    "before they can use your application again.": "이용할 수 있게 돼요.",
                    "All SSH keys created by this application will also be deleted.": "이 앱이 생성한 모든 SSH 키도 삭제될 거예요.",
                    "This action is not reversible.": "이 작업은 되돌릴 수 없어요.",
                    "I understand, revoke all user tokens": "알겠습니다, 모든 사용자 토큰 취소하기",
 
            "Client secrets": "클라이언트 시크릿",
                "Generate a new client secret": "새 클라이언트 시크릿 생성하기",
                "You need a client secret to authenticate as the application to the API.": "API 인증을 위해 앱으로서 클라이언트 시크릿이 필요해요.",
 
            "Basic information": "기본 정보",
                "Save changes": "변경 사항 저장하기",
 
            "Display information": "표시 정보",
                "Drag & drop": "드래그 & 드롭",
                "Upload a logo...": "로고 업로드하기...",
                    "Uploading...": "업로드 중...",
                "You can also drag and drop a picture from your computer.": "컴퓨터에서 그림을 드래그 앤 드롭할 수도 있어요.",
 
                "Delete this image": "이 이미지 삭제하기",
                "Badge background color": "배지 배경 색상",
                "The hex value of the badge background color. Hex colors should only contain numbers and letters from a-f.": "배지 배경 색상의 16진수 값이에요. 16진수 색상은 a-f 사이의 숫자와 문자만 포함해야 해요.",
                // 크롭 대화상자
                    "Crop your new avatar": "새 아바타 크롭하기",
                    "Set new avatar": "새 아바타 설정하기",
                // 상단 알림
                    "Your avatar has been updated. It may take a few minutes to update across the site.": "아바타가 업데이트되었어요. 사이트 전체에 반영되기까지 몇 분 정도 걸릴 수 있어요.",
                    "This avatar has been deleted.": "이 아바타가 삭제되었어요.",
 
            // 장터
                "List your GitHub App in the": "GitHub 앱을",
                "GitHub Marketplace": "GitHub 장터",
                "so that other users can discover it.": "에 등록해서 다른 사용자들이 발견할 수 있도록 해요.",
                "List in Marketplace": "장터에 등록하기",
 
                "Edit how your GitHub App is presented in the Marketplace directory, including screenshots and links.": "장터 디렉토리에서 GitHub 앱이 어떻게 표시되는지, 스크린샷과 링크를 포함해 편집할 수 있어요.",
                "Edit Marketplace listing": "장터 등록 정보 수정하기",
 
            "Private keys": "개인 키",
                "Generate a private key": "개인 키 생성하기",
                "You need a private key to sign access token requests.": "접근 토큰 요청 서명을 위해 개인 키가 필요해요.",
 
                "Learn more about private keys": "개인 키에 대해 더 알아보기",
                "Private key": "개인 키",
                "Added": "추가됨:",
 
            "IP allow list": "IP 허용 목록",
                "Enter the IP addresses of your GitHub App to allow organizations with": "조직이 설치할 때, 이 GitHub 앱의 IP 주소를 입력해 IP 허용 목록을 상속하도록 할 수 있어요.",
                "IP allow lists": "IP 허용 목록",
                "to selectively inherit the App's IP allow list when installed.": "조직이 선택적으로 앱의 IP 허용 목록을 상속할 수 있어요.",
                "Learn more about App IP allow lists": "앱 IP 허용 목록에 대해 더 알아보기",
 
                "There are no IP addresses on the allow list yet.": "아직 허용 목록에 IP 주소가 없어요.",
                "IP address or range in CIDR notation": "CIDR 표기법의 IP 주소 또는 범위",
                "Short description of IP address or range": "IP 주소 또는 범위에 대한 간단한 설명",
 
                "Check IP address": "IP 주소 확인하기",
                    "Enter an IP address to check whether it is permitted by enabled entries on the IP allow list.": "IP 허용 목록의 활성 항목에서 해당 IP 주소가 허용되는지 확인해 보세요.",
 
        // 특정 GitHub 앱 - 권한 https://github.com/settings/apps/<app-name>/permissions
            "Changes to permissions will be applied to all future installations. Current users will be prompted to accept any changes and enable the new permissions on their installation.": "권한 변경은 향후 모든 설치에 적용되며, 현재 사용자께서는 변경 사항을 수락하고 새 권한을 활성화하라는 메시지를 받게 돼요.",
 
            "Add a note to users": "사용자께 메모 추가하기",
                "This note will be displayed on the permissions update approval page.": "이 메모는 권한 업데이트 승인 페이지에 표시돼요.",
                    "Add a note to your users explaining why you are requesting these changes.": "왜 이러한 변경을 요청하는지 사용자께 설명하는 메모를 추가해 보세요.",
 
                "Are you sure you want to update permissions?": "권한을 업데이트하시겠어요?",
                    "Current users will be prompted to accept these changes and enable the new permissions on their installation.": "현재 사용자께서는 변경 사항을 수락하고 새 권한을 활성화하라는 메시지를 받게 돼요.",
 
        // 특정 GitHub 앱 - 에이전트 https://github.com/settings/apps/<app-name>/agent
            "A Copilot configuration allows your GitHub App to integrate with Copilot. Learn more about building GitHub Copilot Extensions in the": "Copilot 설정을 통해 GitHub 앱이 Copilot과 통합될 수 있어요. GitHub Copilot 확장 만들기에 대해 더 알고 싶으시면",
            "documentation": "문서를",
 
            "Accept the Marketplace Developer agreement to create your Copilot Extension": "Copilot 확장을 만들려면 장터 개발자 계약을 수락해 주세요.",
                "By clicking \"Accept Terms\" below, you agree to the": "아래의 \"수락하기\" 버튼을 클릭하시면, 다음의",
                "GitHub Copilot Extension Developer Policy": "GitHub Copilot 확장 개발자 정책",
                "Pre-release License terms": "프리릴리즈 라이선스 조건",
                "on behalf of": "의 behalf로",
                ". Please check to make sure that you are agreeing to these terms on behalf of the correct account.": "계정이 올바른지 확인하시고 해당 조건에 동의해 주세요.",
                "Accept Terms": "수락하기",
 
            "To enable Copilot functionality, you must first accept the Marketplace Developer agreement": "Copilot 기능을 활성화하려면 먼저 장터 개발자 계약을 수락해야 해요.",
            "To enable Copilot functionality, you must first grant your app permission to read Copilot Messages. To do so, navigate to Permissions & Events > Account Permissions > Read-only for Copilot Chat": "Copilot 기능을 활성화하려면 먼저 앱에 Copilot 메시지 읽기 권한을 부여해야 해요. 이를 위해 '권한 및 이벤트 > 계정 권한 > Copilot 채팅 - 읽기 전용'으로 이동해 주세요.",
 
        // 특정 GitHub 앱 - 설치 https://github.com/settings/apps/<app-name>/installations
            // [/Install (.*)/, "설치하기: $1"],
            // [/Choose an account to install (.*) on:/, "어느 계정에 $1 설치할지 선택하세요:"],
            "Install": "설치하기",
            // [/Install (.*) on this account./, "이 계정에 $1 설치하기"],
            "Installed": "설치됨",
            // [/(.*) is installed on this account./, "$1 이(가) 이 계정에 설치되었어요."],
 
        // 특정 GitHub 앱 - 고급 https://github.com/settings/apps/<app-name>/advanced
            "Danger zone": "위험 구역",
                "Transfer ownership of this GitHub App": "이 GitHub 앱의 소유권 이전하기",
                    "Transferring may be delayed until the new owner approves the transfer.": "소유권 이전은 새 소유자가 승인할 때까지 지연될 수 있어요.",
                    "Transfer ownership": "소유권 이전하기",
                        // [/Where should we transfer (.*)\?/, "$1 을(를) 어디로 이전할까요?"],
                        "Type the name of the GitHub App to confirm": "확인을 위해 GitHub 앱 이름을 입력해 주세요.",
                        "New owner’s GitHub username or organization name": "새 소유자의 GitHub 사용자명 또는 조직 이름",
                        "Transfer this GitHub App": "이 GitHub 앱 소유권 이전하기",
                "Delete this GitHub App": "이 GitHub 앱 삭제하기",
                    "This cannot be undone. Please be certain.": "이 작업은 취소할 수 없으니, 신중하게 결정해 주세요.",
 
                    "Delete GitHub App": "GitHub 앱 삭제하기",
                        "Delete GitHub App?": "GitHub 앱을 삭제할까요?",
                            "Unexpected bad things will happen if you don’t read this!": "주의사항을 읽지 않으면 예상치 못한 문제가 발생할 수 있어요!",
                            "This action": "이 작업은",
                            "CANNOT": "취소할 수 없어요",
                            "be undone. This will permanently delete": "되돌릴 수 없으며, 영구적으로 삭제할 거예요.",
                            "GitHub App.": "GitHub 앱을.",
 
                            "This will also uninstall the GitHub App from": "이 작업은 또한 GitHub 앱을 다음 계정에서 제거할 거예요:",
                            // [/(\d+) accounts?/, "$1 개의 계정"],
 
                            "Please type in the name of the GitHub App to confirm.": "확인을 위해 GitHub 앱 이름을 입력해 주세요.",
                            "I understand the consequences, delete this GitHub App": "결과를 이해했으며, 그래도 이 GitHub 앱을 삭제할게요.",
                "Make this GitHub App public": "이 GitHub 앱을 공개하기",
                    "Allow this GitHub App to be installed on other accounts.": "다른 계정에서도 설치할 수 있도록 허용해요.",
 
                    "Make public": "공개로 전환하기",
                        // [/Any user or organization will be able to install this GitHub App. Are you sure you want to make (.*) public\?/, "어떤 사용자나 조직에서도 이 GitHub 앱을 설치할 수 있어요. 정말로 $1 을(를) 공개할까요?"],
                "Make this GitHub App private": "이 GitHub 앱을 비공개로 전환하기",
                    "Private GitHub Apps cannot be installed on other accounts.": "비공개 GitHub 앱은 다른 계정에 설치할 수 없어요.",
                    "Make private": "비공개로 전환하기",
                        "This integration cannot be made private since it is already installed on other accounts.": "이미 다른 계정에 설치되어 있어서 이 앱은 비공개로 전환할 수 없어요.",
                "Make this application private": "이 애플리케이션을 비공개로 전환하기",
                    "Private applications cannot be installed on other accounts.": "비공개 애플리케이션은 다른 계정에 설치할 수 없어요.",
                        // [/This GitHub app will only be installable on the ([^ ]+) account. Are you sure you want to make (.*) private\?/, "이 GitHub 앱은 단 $1 계정에만 설치 가능해요. 정말로 $2 을(를) 비공개로 전환할까요?"],
 
        // 특정 GitHub 앱 - 선택적 기능 https://github.com/settings/apps/<app-name>/beta
            // [/Activate optional features for (.*)/, "$1 의 선택적 기능 활성화하기"],
            // [/Choose a feature to activate for (.*):/, "$1 에 활성화할 기능 선택하기:"],
 
            "User-to-server token expiration": "사용자-서버 토큰 만료",
                "User-to-server access tokens will expire after 8 hours. A Refresh Token will be provided which can be exchanged for a new access token.": "사용자-서버 접근 토큰은 8시간 후에 만료돼요. 새 접근 토큰으로 교환할 수 있는 리프레시 토큰이 제공될 거예요.",
                "Opt-out": "옵트아웃",
                "Opt-in": "옵트인",
                    "Disable user-to-server token expiration for this app.": "이 앱의 사용자-서버 토큰 만료를 비활성화할 수 있어요.",
 
    },
    "regexp": [ // 정규 표현식 번역
        [/Only allow this GitHub App to be installed on the (@[^ ]+) account./, "단 $1 계정에만 이 GitHub 앱을 설치할 수 있어요."],
        [/Choose an account to install (.*) on:/, "어느 계정에 $1 설치할지 선택하세요:"],
        [/Install (.*) on this account./, "이 계정에 $1 설치하기"],
        [/Install (.*)/, "설치하기: $1"],
        [/(.*) is installed on this account./, "$1 이(가) 이 계정에 설치되었어요."],
        [/Where should we transfer (.*)\?/, "$1 을(를) 어디로 이전할까요?"],
        [/Any user or organization will be able to install this GitHub App. Are you sure you want to make (.*) public\?/, "어떤 사용자나 조직에서도 이 GitHub 앱을 설치할 수 있어요. 정말로 $1 을(를) 공개할까요?"],
        [/This GitHub app will only be installable on the ([^ ]+) account. Are you sure you want to make (.*) private\?/, "이 GitHub 앱은 단 $1 계정에만 설치 가능해요. 정말로 $2 을(를) 비공개로 전환할까요?"],
        [/(\d+) accounts?/, "$1 개의 계정"],
        [/Activate optional features for (.*)/, "$1 의 선택적 기능 활성화하기"],
        [/Choose a feature to activate for (.*):/, "$1 에 활성화할 기능 선택하기:"],
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
};
I18N["ko-KR"]["orgs/settings/apps/new"] = I18N["ko-KR"]["settings/apps"];

I18N["ko-KR"]["settings/developers"] = { // 설정 - 개발자 설정/OAuth 앱
    "static": { // 정적 번역
            "Developer Settings": "개발자 설정",
            "GitHub Apps": "GitHub 앱",
            "OAuth Apps": "OAuth 앱",
            "Personal access tokens": "개인 접근 토큰",
                "Fine-grained tokens": "세분화된 토큰",
                "Tokens (classic)": "토큰 (클래식)",

        // OAuth 앱 https://github.com/settings/developers
            "No OAuth applications": "OAuth 앱이 없어요",
            "OAuth applications are used to access the GitHub API.": "OAuth 앱은 GitHub API에 접근하기 위해 사용해요.",
            "Read the docs": "문서 읽어보기",
            "to find out more.": "자세한 정보를 확인해보세요.",
            "Register a new application": "새 OAuth 앱 등록하기",

            "No OAuth apps": "OAuth 앱이 없어요",
            "OAuth apps are used to access the GitHub API. Read the docs to find out more.": "OAuth 앱은 GitHub API 접근을 위해 사용돼요. 자세한 내용은 문서를 읽어보세요.",
            "New OAuth app": "새 OAuth 앱 등록하기",

            "View documentation": "문서 보기",

    },
    "regexp": [ // 정규 표현식 번역
    ],
};

I18N["ko-KR"]["settings/applications/new"] = { // 설정 - 개발자 설정/OAuth 앱
    "static": { // 정적 번역

        // OAuth 앱 등록 https://github.com/settings/applications/new
            "Developer Settings": "개발자 설정",

            "Register a new OAuth app": "OAuth 앱 등록하기",
            "Application name": "앱 이름",
            "Something users will recognize and trust.": "사용자들이 인식하고 신뢰할 수 있도록 해주세요.",
            "Homepage URL": "홈페이지 URL",
            "The full URL to your application homepage.": "앱의 홈페이지 전체 URL을 입력해 주세요.",
            "Application description": "앱 설명",
            "Application description is optional": "앱 설명 (선택 사항)",
            "This is displayed to all users of your application.": "이 설명은 앱을 사용하는 모든 사용자에게 표시돼요.",
            "Authorization callback URL": "인증 콜백 URL",
            "Your application’s callback URL. Read our": "앱의 인증 콜백 URL이에요. 아래의",
            "OAuth documentation": "OAuth 문서",
            "for more information.": "를 읽어보시어 자세한 정보를 확인해보세요.",
            "Enable Device Flow": "디바이스 플로우 활성화하기",
            "Allow this OAuth App to authorize users via the Device Flow.": "이 OAuth 앱이 디바이스 플로우를 통해 사용자 인증을 할 수 있도록 허용해요.",
            "Read the": "읽어보세요",
            "Device Flow documentation": "디바이스 플로우 문서",
            "Register application": "앱 등록하기",

    },
    "regexp": [ // 정규 표현식 번역
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
};
I18N["ko-KR"]["orgs/settings/applications/new"] = I18N["ko-KR"]["settings/applications/new"];

I18N["ko-KR"]["settings/tokens"] = { // 설정 - 개발자 설정/개인 접근 토큰
    "static": { // 정적 번역
            "Developer Settings": "개발자 설정",
            "GitHub Apps": "GitHub 앱",
            "OAuth Apps": "OAuth 앱",
            "Personal access tokens": "개인 접근 토큰",
                "Fine-grained tokens": "세분화된 토큰",
                "Tokens (classic)": "토큰 (클래식)",

        // 개발자 설정/세분화된 개인 접근 토큰 https://github.com/settings/tokens?type=beta
            "No personal access token created": "생성된 개인 토큰이 없어요",

            "Fine-grained personal access tokens": "세분화된 개인 접근 토큰",
                "Need an API token for scripts or testing?": "스크립트나 테스트용 API 토큰이 필요하세요?",
                "Generate a personal access token": "개인 접근 토큰 생성하기",
                "for quick access to the": "를 사용하여 빠르게 접근하세요",

                "These are fine-grained, repository-scoped tokens suitable for personal": "이 토큰은 세분화되어 있으며, 개인용으로 적합한 저장소 범위 토큰이에요.",
                "use and for using Git over HTTPS.": "그리고 HTTPS를 통한 Git 사용에도 적합해요.",

                "Make sure to copy your personal access token now as you will not be able to see this again.": "다시 확인할 수 없으니 지금 바로 개인 접근 토큰을 복사해 주세요.",
                "Loading expiration ...": "만료 시간 불러오는 중 ...",
                "This token has expired.": "이 토큰은 만료되었어요.",
                    "To set a new expiration date, you must regenerate the token.": "새 만료 날짜를 설정하려면 토큰을 재생성해야 해요.",

                "No fine-grained tokens created": "세분화된 개인 접근 토큰이 생성되지 않았어요",
                    "Need an API token for scripts or testing? Generate a personal access token for quick access to the GitHub API.": "스크립트나 테스트용 API 토큰이 필요하세요? GitHub API에 빠르게 접근하기 위해 개인 접근 토큰을 생성해보세요.",

            // 상단 알림
                "Deleted personal access token": "개인 접근 토큰이 삭제되었어요",

        // 개발자 설정/개인 접근 토큰 (클래식) https://github.com/settings/tokens
            "Personal access tokens (classic)": "개인 접근 토큰 (클래식)",
            "Generate new token": "새 토큰 생성하기",
                "Fine-grained, repo-scoped": "세분화된, 저장소 범위",
                "Generate new token (classic)": "새 토큰 생성하기 (클래식)",
                    "For general use": "일반 용도로",
            "Revoke all": "전체 취소하기",
            "Tokens you have generated that can be used to access the": "생성한 토큰은 다음에 접근하기 위해 사용돼요:",
            "Expires": "만료일",
            "Expired": "만료됨",
            "This token has no expiration date": "이 토큰은 만료일이 없어요",
            "Regenerate": "재생성하기",
            "this token to take advantage of the": "이 토큰을 사용하여",
            "new token formats": "새로운 토큰 형식을 사용해 보세요",
            "Personal access tokens (classic) function like ordinary OAuth access tokens. They can be used instead of a password for Git over HTTPS, or can be used to": "개인 접근 토큰 (클래식)은 일반 OAuth 접근 토큰처럼 작동해요. HTTPS를 통한 Git 사용 시 비밀번호 대신 사용하거나,",
            "authenticate to the API over Basic Authentication": "기본 인증을 통해 API에 인증할 수 있어요.",

            "Never used": "사용된 적 없음",
            "Last used within the last week": "최근 1주일 내에 사용됨",

            // 전체 취소 대화상자
            "Are you sure you want to revoke access for all personal access tokens?": "정말로 모든 개인 접근 토큰의 접근 권한을 취소하시겠어요?",
            "This will revoke access for": "다음의 접근 권한을 취소할 거예요:",
            "all personal access tokens": "모든 개인 접근 토큰",
            ", but will not revoke access for any authorized third-party OAuth applications. This action cannot be undone.": "，하지만 승인된 제3자 OAuth 앱의 접근 권한은 취소되지 않아요. 이 작업은 취소할 수 없어요.",
            "Any SSH keys created on your behalf by personal access tokens will also be deleted.": "개인 접근 토큰으로 생성된 모든 SSH 키도 삭제될 거예요.",
            "Type your username to confirm": "확인을 위해 사용자명을 입력해 주세요",
            "I understand, revoke access for everything": "알겠습니다, 모든 접근 권한을 취소할게요.",

        // 세분화된 개인 접근 토큰 생성하기 https://github.com/settings/personal-access-tokens/new
            "New fine-grained personal access token": "새 세분화된 개인 접근 토큰 생성하기",
            "Create a fine-grained, repository-scoped token suitable for personal API use and for using Git over HTTPS.": "개인 API 사용과 HTTPS를 통한 Git 사용에 적합한 세분화된 저장소 범위 토큰을 생성해보세요.",
            "Token name": "토큰 이름",
                "A unique name for this token. May be visible to resource owners or users with possession of the token.": "이 토큰의 고유한 이름이에요. 리소스 소유자나 토큰을 보유한 사용자에게 보일 수 있어요.",
                "Name can't be blank": "이름은 비워둘 수 없어요",
                "is a vaild name.": "는 유효한 이름이에요.",
                "is an invalid name. The token name has already been taken.": "는 유효하지 않은 이름이에요. 이미 사용 중인 토큰 이름이에요.",
            "Description": "설명",
            "What is this token for?": "이 토큰은 무엇을 위해 사용되나요?",
            "Resource owner": "리소스 소유자",
            "Authorizing...": "인증 중이에요...",

            "Custom expiration can't be blank. Please choose a date.": "사용자 지정 만료일은 비워둘 수 없어요. 날짜를 선택해 주세요.",

            "Repository access": "저장소 접근",
                "Public Repositories (read-only)": "공개 저장소 (읽기 전용)",
                "All repositories": "모든 저장소",
                    "This applies to all current": "현재 소유한 모든",
                    "future repositories owned by the resource owner.": "향후 저장소에 적용돼요.",
                    "Also includes public repositories (read-only).": "공개 저장소 (읽기 전용)도 포함돼요.",
                "Only select repositories": "선택된 저장소만",
                    "Select at least one repository. Max 50 repositories.": "최소 한 개의 저장소를 선택해 주세요. 최대 50개까지 가능해요.",
                    "Select repositories": "저장소 선택하기",
                    "Search for a repository": "저장소 검색하기",
                    // [/Selected (\d+) repositor(y|ies)./, "선택된 저장소 $1개"],
                        "No repositories found.": "저장소를 찾을 수 없어요.",

            // 권한
            "Permissions": "권한",
                "Read our": "저희의",
                "permissions documentation": "권한 문서",
                "for information about specific permissions.": "를 읽어보시어 구체적인 권한 정보를 확인해 주세요.",

                "Access:": "접근 권한:",
                "Select an access level": "접근 수준 선택하기",
                "No access": "접근 불가",
                "Read-only": "읽기 전용",
                "Read and write": "읽기 및 쓰기",
                "Admin": "관리자",

                "Selected": "선택됨",
                "mandatory": "필수",

                "Repository permissions": "저장소 권한",
                    "Repository permissions permit access to repositories and related resources.": "저장소 권한은 저장소와 관련 자원에 접근할 수 있도록 해줘요.",

                    "Actions": "액션",
                        "Workflows, workflow runs and artifacts.": "워크플로우, 워크플로우 실행 및 산출물.",
                    "Administration": "관리",
                        "Repository creation, deletion, settings, teams, and collaborators.": "저장소 생성, 삭제, 설정, 팀, 협업자 관리를 할 수 있어요.",
                    "Attestations": "증명서",
                        "Create and retrieve attestations for a repository.": "저장소에 대한 증명서를 생성하고 확인할 수 있어요.",
                    "Checks": "체크",
                        "Checks on code.": "코드 체크.",
                    "Code scanning alerts": "코드 스캔 경고",
                        "View and manage code scanning alerts.": "코드 스캔 경고를 확인하고 관리해 보세요.",
                    // "": "코드스페이스",
                        "Create, edit, delete and list Codespaces.": "코드 공간을 생성, 편집, 삭제 및 나열할 수 있어요.",
                    "Codespaces lifecycle admin": "코드 공간 라이프사이클 관리",
                        "Manage the lifecycle of Codespaces, including starting and stopping.": "코드 공간의 라이프사이클(시작 및 중지 포함)을 관리해 보세요.",
                    "Codespaces metadata": "코드 공간 메타데이터",
                        "Access Codespaces metadata including the devcontainers and machine type.": "코드 공간의 메타데이터(개발 컨테이너와 머신 유형 포함)에 접근해 보세요.",
                    "Codespaces secrets": "코드 공간 비밀",
                        "Restrict Codespaces user secrets modifications to specific repositories.": "특정 저장소에 대해서만 코드 공간 사용자 비밀 수정을 제한해 보세요.",
                    "Commit statuses": "커밋 상태",
                        "Commit statuses.": "커밋 상태.",
                    "Contents": "내용",
                        "Repository contents, commits, branches, downloads, releases, and merges.": "저장소 내용, 커밋, 분기, 다운로드, 릴리즈 및 병합.",
                    // 사용자 지정 속성
                        "View and set values for a repository's custom properties, when allowed by the property.": "허용되는 경우, 저장소의 사용자 지정 속성 값을 확인하고 설정할 수 있어요.",
                    "Dependabot alerts": "Dependabot 경고",
                        "Retrieve Dependabot alerts.": "Dependabot 경고를 확인해 보세요.",
                    "Dependabot secrets": "Dependabot 비밀",
                        "Manage Dependabot repository secrets.": "Dependabot 저장소 비밀을 관리해 보세요.",
                    "Deployments": "배포",
                        "Deployments and deployment statuses.": "배포 및 배포 상태.",
                    "Discussions": "토론",
                        "Discussions and related comments and labels.": "토론과 관련 댓글 및 라벨.",
                    "Environments": "환경",
                        "Manage repository environments.": "저장소 환경을 관리해 보세요.",
                    "Issues": "이슈",
                        "Issues and related comments, assignees, labels, and milestones.": "이슈와 관련 댓글, 담당자, 라벨, 마일스톤.",
                    "Merge queues": "병합 대기열",
                        "Manage a repository's merge queues": "저장소의 병합 대기열을 관리해 보세요.",
                    "Metadata": "메타데이터",
                        "Search repositories, list collaborators, and access repository metadata.": "저장소 검색, 협업자 목록 확인, 저장소 메타데이터 접근이 가능해요.",
                    "Packages": "패키지",
                        "Packages published to the GitHub Package Platform.": "GitHub Package 플랫폼에 게시된 패키지.",
                    "Pages": "GitHub Pages",
                        "Retrieve Pages statuses, configuration, and builds, as well as create new builds.": "페이지 상태, 구성, 빌드를 확인하거나 새 빌드를 생성할 수 있어요.",
                    "Projects": "프로젝트",
                        "Manage classic projects within a repository.": "저장소 내의 클래식 프로젝트를 관리해 보세요.",
                    "Pull requests": "끌어오기 요청",
                        "Pull requests and related comments, assignees, labels, milestones, and merges.": "끌어오기 요청과 관련 댓글, 담당자, 라벨, 마일스톤, 병합.",
                    "Repository security advisories": "저장소 보안 공지",
                        "View and manage repository security advisories.": "저장소 보안 공지를 확인하고 관리해 보세요.",
                    "Secret scanning alerts": "비밀 스캔 경고",
                        "View and manage secret scanning alerts.": "비밀 스캔 경고를 확인하고 관리해 보세요.",
                    "Secrets": "비밀",
                        "Manage Actions repository secrets.": "액션 저장소 비밀을 관리해 보세요.",
                    "Variables": "변수",
                        "Manage Actions repository variables.": "액션 저장소 변수를 관리해 보세요.",
                    "Webhooks": "웹후크",
                        "Manage the post-receive hooks for a repository.": "저장소의 포스트-리시브 웹후크를 관리해 보세요.",
                    "Workflows": "워크플로우",
                        "Update GitHub Action workflow files.": "GitHub 액션 워크플로우 파일을 업데이트해 보세요.",

                "Account permissions": "계정 권한",
                    "User permissions permit access to resources under your personal GitHub account.": "사용자 권한은 본인의 GitHub 계정 자원에 접근할 수 있게 해줘요.",

                    "Block another user": "다른 사용자 차단하기",
                        "View and manage users blocked by the user.": "본인이 차단한 사용자를 확인하고 관리해 보세요.",
                    "Codespaces user secrets": "코드 공간 사용자 비밀",
                        "Manage Codespaces user secrets.": "코드 공간 사용자 비밀을 관리해 보세요.",
                    "Email addresses": "이메일 주소",
                        "Manage a user's email addresses.": "사용자의 이메일 주소를 관리해 보세요.",
                    // 팔로워
                        "A user's followers": "사용자의 팔로워",
                    "GPG keys": "GPG 키",
                        "View and manage a user's GPG keys.": "사용자의 GPG 키를 확인하고 관리해 보세요.",
                    // Gist
                        "Create and modify a user's gists and comments.": "사용자의 gists와 댓글을 생성 및 수정해 보세요.",
                    "Git SSH keys": "Git SSH 키",
                    "Interaction limits": "상호 작용 제한",
                        "Interaction limits on repositories": "저장소의 상호 작용 제한",
                    "Plan": "플랜",
                        "View a user's plan.": "사용자의 플랜을 확인해 보세요.",
                    "Private repository invitations": "비공개 저장소 초대",
                        "View a user's invitations to private repositories": "비공개 저장소 초대를 확인해 보세요.",
                    "Profile": "프로필",
                        "Manage a user's profile settings.": "사용자 프로필 설정을 관리해 보세요.",
                    "SSH signing keys": "SSH 서명 키",
                        "View and manage a user's SSH signing keys.": "사용자의 SSH 서명 키를 확인하고 관리해 보세요.",
                    "Starring": "별표",
                        "List and manage repositories a user is starring.": "사용자가 별표를 누른 저장소를 확인하고 관리해 보세요.",
                    "Watching": "팔로잉",
                        "List and change repositories a user is subscribed to.": "사용자가 구독한 저장소를 확인하고 변경해 보세요.",

                "Organization permissions": "조직 권한",
                    "Organization permissions permit access to organization related resources.": "조직 권한은 조직 관련 자원에 접근할 수 있게 해줘요.",

                    // 관리
                        "Manage access to an organization.": "조직 접근을 관리해 보세요.",
                    "Blocking users": "사용자 차단하기",
                        "View and manage users blocked by the organization.": "조직에서 차단한 사용자를 확인하고 관리해 보세요.",
                    "Custom properties": "사용자 지정 속성",
                        "View custom properties, write repository values, and administer definitions.": "사용자 지정 속성을 확인하고, 저장소 값을 작성하며, 정의를 관리해 보세요.",
                    "Custom repository roles": "사용자 지정 저장소 역할",
                        "Create, edit, delete and list custom repository roles.": "사용자 지정 저장소 역할을 생성, 편집, 삭제 및 나열해 보세요.",
                    "Events": "이벤트",
                        "View events triggered by an activity in an organization.": "조직 내 활동으로 발생한 이벤트를 확인해 보세요.",
                    "GitHub Copilot for Business": "GitHub Copilot 비즈니스",
                        "Manage Copilot for Business seats and settings": "GitHub Copilot 비즈니스 좌석 및 설정을 관리해 보세요.",
                    "Members": "멤버",
                        "Organization members and teams.": "조직 멤버와 팀.",
                    "Organization announcement banners": "조직 공지 배너",
                        "View and modify announcement banners for an organization.": "조직의 공지 배너를 확인하고 수정해 보세요.",
                    "Organization codespaces": "조직 코드 공간",
                        "Manage Codespaces for an organization.": "조직의 코드 공간을 관리해 보세요.",
                    "Organization codespaces secrets": "조직 코드 공간 비밀",
                        "Manage Codespaces Secrets for an organization.": "조직의 코드 공간 비밀을 관리해 보세요.",
                    "Organization codespaces settings": "조직 코드 공간 설정",
                        "Manage Codespaces settings for an organization.": "조직의 코드 공간 설정을 관리해 보세요.",
                    "Organization dependabot secrets": "조직 Dependabot 비밀",
                        "Manage Dependabot organization secrets.": "조직의 Dependabot 비밀을 관리해 보세요.",
                    "Plan": "플랜",
                        "View an organization's plan.": "조직의 플랜을 확인해 보세요.",
                    // 프로젝트
                        "Manage projects for an organization.": "조직의 프로젝트를 관리해 보세요.",
                    // 비밀
                        "Manage Actions organization secrets.": "액션 조직 비밀을 관리해 보세요.",
                    "Self-hosted runners": "셀프 호스티드 실행기",
                        "View and manage Actions self-hosted runners available to an organization.": "조직에서 사용 가능한 액션 셀프 호스티드 실행기를 확인하고 관리해 보세요.",
                    "Team discussions": "팀 토론",
                        "Manage team discussions and related comments.": "팀 토론과 관련 댓글을 관리해 보세요.",
                    // 변수
                        "Manage Actions organization variables.": "액션 조직 변수를 관리해 보세요.",
                    // 웹후크
                        "Manage the post-receive hooks for an organization.": "조직의 포스트-리시브 웹후크를 관리해 보세요.",

            // 개요
                // [/(\d+) permissions for none of your repositories/, ""],
                "permission": "권한 항목",
                "Organization permission": "조직 권한 항목",
                "s": " ",
                "for": " ",
                "none": "없음",
                "all": "모든",
                "of your repositories": "사용자님의 저장소",
                "Account permission": "계정 권한 항목",

                "This token will expire": "이 토큰은 만료될 거예요:",
                "on an unselected custom date.": "선택되지 않은 사용자 지정 날짜에.",
                "This token will be ready for use immediately.": "이 토큰은 즉시 사용 가능해요.",

        // https://github.com/settings/personal-access-tokens/<id>
            "No description": "설명이 없어요",
            "Created": "생성됨",
            "Access on": "접근:",
            "Select the repositories this token can access. Personal access tokens can always read from all public repositories on GitHub.com": "이 토큰이 접근할 저장소를 선택해 주세요. 개인 접근 토큰은 GitHub.com의 모든 공개 저장소를 항상 읽을 수 있어요.",
            "This token does not have access to any repositories.": "이 토큰은 어떠한 저장소에도 접근할 수 없어요.",
            "User permissions": "사용자 권한",
            "This token does not have any user permissions.": "이 토큰은 사용자 권한이 없어요.",
            "This token does not have any repository permissions.": "이 토큰은 저장소 권한이 없어요.",

            // 상단 알림
                "Your personal access token has been updated": "개인 접근 토큰이 업데이트되었어요",

        // 세분화된 개인 접근 토큰 재생성 https://github.com/settings/personal-access-tokens/<id>/regenerate
            "Regenerate fine-grained personal access token": "세분화된 개인 접근 토큰 재생성하기",

        // 새 개인 접근 토큰 생성 https://github.com/settings/tokens/new
            "New personal access token (classic)": "새 개인 접근 토큰 (클래식)",
            "Note": "메모",
                "Note can't be blank": "메모는 비워둘 수 없어요",
            "What’s this token for?": "이 토큰은 무엇을 위해 사용되나요?",

            "Expiration": "만료일",
            // "This token expires": "이 토큰의 만료일:",
            ". To set a new expiration date, you must": "。새 만료일을 설정하려면,",
            // 만료일 드롭다운 메뉴
            "7 days": "7일",
            "30 days": "30일",
            "60 days": "60일",
            "90 days": "90일",
            "Custom...": "사용자 지정...",
            "No expiration": "만료일 없음",
            "The token will never expire!": "이 토큰은 절대 만료되지 않아요!",
            "GitHub strongly recommends that you set an expiration date for your token to help keep your information secure.": "GitHub은 사용자의 정보를 안전하게 보호하기 위해 토큰에 만료일을 설정할 것을 강력히 권장해요.",

            "Select scopes": "범위 선택하기",
            "Scopes define the access for personal tokens.": "범위는 개인 토큰의 접근 권한을 정의해요.",
            "Read more about OAuth scopes.": "OAuth 범위에 대해 더 읽어보세요.",
            "Full control of private repositories": "비공개 저장소 완전 제어",
            "Access commit status": "커밋 상태 접근",
            "Access deployment status": "배포 상태 접근",
            "Access public repositories": "공개 저장소 접근",
            "Access repository invitations": "저장소 초대 접근",
            "Read and write security events": "보안 이벤트 읽기 및 쓰기",
            "Update GitHub Action workflows": "GitHub 액션 워크플로우 업데이트",
            "Upload packages to GitHub Package Registry": "GitHub Package Registry에 패키지 업로드",
            "Download packages from GitHub Package Registry": "GitHub Package Registry에서 패키지 다운로드",
            "Delete packages from GitHub Package Registry": "GitHub Package Registry에서 패키지 삭제",
            "Full control of orgs and teams, read and write org projects": "조직 및 팀 완전 제어, 조직 프로젝트 읽기 및 쓰기",
            "Read and write org and team membership, read and write org projects": "조직 및 팀 멤버십 읽기 및 쓰기, 조직 프로젝트 읽기 및 쓰기",
            "Read org and team membership, read org projects": "조직 및 팀 멤버십 읽기, 조직 프로젝트 읽기",
            "Manage org runners and runner groups": "조직 실행기 및 실행기 그룹 관리",
            "Full control of user public keys": "사용자 공개 키 완전 제어",
            "Write user public keys": "사용자 공개 키 쓰기",
            "Read user public keys": "사용자 공개 키 읽기",
            "Full control of repository hooks": "저장소 훅 완전 제어",
            "Write repository hooks": "저장소 훅 쓰기",
            "Read repository hooks": "저장소 훅 읽기",
            "Full control of organization hooks": "조직 훅 완전 제어",
            "Create gists": "코드 스니펫 생성",
            "Access notifications": "알림 접근",
            "Update ALL user data": "모든 사용자 데이터 업데이트",
            "Read ALL user profile data": "모든 사용자 프로필 데이터 읽기",
            "Access user email addresses (read-only)": "사용자 이메일 주소 접근 (읽기 전용)",
            "Follow and unfollow users": "사용자 팔로우 및 언팔로우",
            "Delete repositories": "저장소 삭제",
            "Read and write team discussions": "팀 토론 읽기 및 쓰기",
            "Read team discussions": "팀 토론 읽기",
            "Full control of enterprises": "기업 완전 제어",
            "Manage enterprise runners and runner groups": "기업 실행기 및 실행기 그룹 관리",
            "Read and write enterprise billing data": "기업 결제 데이터 읽기 및 쓰기",
            "Read enterprise profile data": "기업 프로필 데이터 읽기",
            "Provisioning of users and groups via SCIM": "SCIM을 통한 사용자 및 그룹 프로비저닝",
            "Full control of audit log": "감사 로그 완전 제어",
            "Read access of audit log": "감사 로그 읽기",
            "Full control of codespaces": "코드 공간 완전 제어",
            "Ability to create, read, update, and delete codespace secrets": "코드 공간 비밀 생성, 읽기, 업데이트, 삭제 권한",
            "Full control of GitHub Copilot settings and seat assignments": "GitHub Copilot 설정 및 좌석 배정 완전 제어",
                "View and edit Copilot Business seat assignments": "GitHub Copilot 비즈니스 좌석 배정 확인 및 편집",
            "Full control of projects": "프로젝트 완전 제어",
            "Read access of projects": "프로젝트 읽기 접근",
            "Full control of public user GPG keys": "공개 사용자 GPG 키 완전 제어",
            "(Developer Preview)": "（개발자 미리보기）",
            "Write public user GPG keys": "공개 사용자 GPG 키 쓰기",
            "Read public user GPG keys": "공개 사용자 GPG 키 읽기",
            "Full control of public user SSH signing keys": "공개 사용자 SSH 서명 키 완전 제어",
            "Write public user SSH signing keys": "공개 사용자 SSH 서명 키 쓰기",
            "Read public user SSH signing keys": "공개 사용자 SSH 서명 키 읽기",
            "Generate token": "토큰 생성하기",
                // 상단 알림
                "Some of the scopes you’ve selected are included in other scopes. Only the minimum set of necessary scopes has been saved.": "선택한 일부 범위는 다른 범위에 포함되어 있어요. 최소한의 필요한 범위만 저장되었어요.",
                "Note has already been taken": "메모가 이미 사용 중이에요",

            "Make sure to copy your personal access token now. You won’t be able to see it again!": "지금 바로 개인 접근 토큰을 복사해 두세요. 다시 확인할 수 없어요!",

            "Are you sure you want to delete this token?": "정말 이 토큰을 삭제하시겠어요?",
            "Any applications or scripts using this token will no longer be able to access the GitHub API. You cannot undo this action.": "이 토큰을 사용하는 앱이나 스크립트는 더 이상 GitHub API에 접근할 수 없게 돼요. 이 작업은 취소할 수 없어요.",
            "I understand, delete this token": "알겠습니다, 이 토큰을 삭제할게요.",

        // 개인 접근 토큰 편집 https://github.com/settings/tokens/<id>
            "Edit personal access token (classic)": "개인 접근 토큰 (클래식) 편집하기",
            "If you’ve lost or forgotten this token, you can regenerate it, but be aware that any scripts or applications using this token will need to be updated.": "이 토큰을 잃어버리거나 잊으셨다면 재생성할 수 있어요. 단, 이 토큰을 사용하는 모든 스크립트나 앱을 업데이트해야 한다는 점을 유념해 주세요.",
            "This token has no expiration date. To set a new expiration date, you must": "이 토큰은 만료일이 없어요. 새 만료일을 설정하려면,",
            "regenerate the token": "토큰을 재생성해야 해요",
            "Update token": "토큰 업데이트하기",
            "Delete personal access token": "개인 접근 토큰 삭제하기",
            "Delete token": "토큰 삭제하기",
            "Delete this token": "이 토큰 삭제하기",

        // 개인 접근 토큰 재생성 https://github.com/settings/tokens/<id>/regenerate
            "Regenerate personal access token (classic)": "개인 접근 토큰 (클래식) 재생성하기",
            "Submitting this form will generate a new token. Be aware that any scripts or applications using this token will need to be updated.": "이 양식을 제출하면 새 토큰이 생성돼요. 이 토큰을 사용하는 모든 스크립트나 앱을 업데이트해야 한다는 점에 유의해 주세요.",
            "Regenerate token": "토큰 재생성하기",

    },
    "regexp": [ // 정규 표현식 번역
        [/The token will expire on ([^ ]+), ([^ ]+) (\d+) (\d+)/, function(all, week, month, day, year){
            var weekKey = {
                "Sun"  : "일요일",
                "Mon"  : "월요일",
                "Tue"  : "화요일",
                "Wed"  : "수요일",
                "Thu"  : "목요일",
                "Fri"  : "금요일",
                "Sat"  : "토요일"
            };
            var monthKey = {
                "Jan": "1월",
                "Feb": "2월",
                "Mar": "3월",
                "Apr": "4월",
                "May": "5월",
                "Jun": "6월",
                "Jul": "7월",
                "Aug": "8월",
                "Sep": "9월",
                "Oct": "10월",
                "Nov": "11월",
                "Dec": "12월"
            };

            return '이 토큰은 ' + year + '년 ' + monthKey[month] + day + '일, ' + weekKey[week] + '에 만료될 거예요';
        }],
        [/Last used within the last (\d+) weeks?/, "최근 $1주일 내에 사용됨"],
        [/Last used within the last (\d+) months?/, "최근 $1개월 내에 사용됨"],
        [/Selected (\d+) repositor(y|ies)./, "선택된 저장소 $1개"],
        [/Access:/, "접근:"],
    ],
};
I18N["ko-KR"]["settings/personal-access-tokens"] = I18N["ko-KR"]["settings/tokens"];

// 仓库相关==
I18N["ko-KR"]["repository-public"] = { // 저장소 - 공용 부분
    "static": { // 정적 번역
        // 저장소 페이지 /<user-name>/<repo-name>/
            // GitHub 공식에 의해 비활성화됨
            "This repository has been disabled.": "이 저장소는 비활성화되었어요.",
            "Access to this repository has been disabled by GitHub Staff due to a violation of GitHub's terms of service. If you are the owner of the repository, you may reach out to GitHub Support for more information.": "GitHub 서비스 약관 위반으로 GitHub 스태프가 이 저장소에 대한 접근을 비활성화하였어요. 저장소 소유자이시라면 GitHub 지원팀에 문의해보세요.",

            // 저장소 주소 - 플로팅 정보 창 (Android UA 전용)
            "Navigate back to": "돌아가기:",

            // 상단 알림
            "Sorry, that branch already exists.": "죄송해요, 해당 분기가 이미 존재해요.",
            "has invited you to collaborate on this repository": "님이 이 저장소의 협업자로 초대하셨어요",
                "View invitation": "초대 확인하기",

            // 저장소가 DMCA 위반으로 인함
            "Repository unavailable due to DMCA takedown.": "DMCA 삭제로 인해 저장소를 사용할 수 없어요.",
            "This repository is currently disabled due to a DMCA takedown notice. We have disabled public access to the repository. The notice has been": "이 저장소는 DMCA 삭제 통보로 인해 현재 비활성화되었어요. 공개 접근이 차단되었고, 통보는",
            "publicly posted": "공개되었어요",
            "If you are the repository owner, and you believe that your repository was disabled as a result of mistake or misidentification, you have the right to file a counter notice and have the repository reinstated. Our help articles provide more details on our": "저장소 소유자이시고 저장소가 실수나 오인으로 인해 비활성화되었다고 생각되시면, 반대 통지를 제출하여 저장소를 복구할 권리가 있어요. 도움말 문서에서 자세한 정보를 확인해보세요.",
            "DMCA takedown policy": "DMCA 삭제 정책",
            "how to file a counter notice": "반대 통지 제출 방법",
            ". If you have any questions about the process or the risks in filing a counter notice, we suggest that you consult with a lawyer.": ". 반대 통지 제출 과정이나 위험에 대해 궁금하시면 변호사와 상담해보세요.",

             // 사용자 플로팅 정보 카드
                "- same time": "- 같은 시간",
                "Recently edited these files": "최근에 이 파일들을 수정했어요.",
                "Owns this repository": "이 저장소를 소유하고 있어요.",
                "Left a review": "리뷰를 남겼어요.",
                "Committed to this repository": "이 저장소에 커밋했어요.",
                "Committed to this repository in the past day": "최근 하루 동안 이 저장소에 커밋했어요.",
                "Committed to this repository in the past week": "최근 일주일 동안 이 저장소에 커밋했어요.",
                "Committed to this repository in the past month": "최근 한 달 동안 이 저장소에 커밋했어요.",
                "Member of": "소속 조직:",
                // [/, and (\d+) more/, "，以及其他 $1 个组织"],
                "Opened this issue": "이 이슈를 열었어요.",
                "Opened this pull request": "이 끌어오기 요청을 열었어요.",
                "Opened this pull request (their first ever)": "이 끌어오기 요청을 열었어요 (첫 번째 요청이에요).",
                "Started this discussion": "이 토론을 시작했어요.",

            // 조직 플로팅 정보 카드
                // [/(\d+) repositor(y|ies)/, "$1 个仓库"],
                // [/(\d+) members?/, "$1 个成员"],

            "Some checks haven't completed yet": "일부 체크가 아직 완료되지 않았어요.",

            "Jump to bottom": "맨 아래로 점프하기", // 소형 화면 모드
            "forked from": "포크됨 :",

            "people": "사람", // 커밋
            "committed": "커밋함:", // 커밋 플로팅 정보창
            "authored": "작성함:",

            // 탭 바
            "Code": "코드",
            "Pull requests": "끌어오기 요청",
            "Discussions": "토론",
            "Actions": "액션",
            "Projects": "프로젝트",
            "Security": "보안",
            "Insights": "통계",
            "Settings": "설정",

            "Additional navigation options": "추가 탐색 옵션", // 소형 화면
            "View all files": "모든 파일 보기", // Android UA 에서 표시됨

            // "Pulse": "통계",
            // "Graphs": "그래프",

            // 알림 페이지 상태 바로 돌아가기
            "Back to notifications": "알림으로 돌아가기",
            "Done": "완료됨",
            "Subscribe": "구독하기",
            "Unsubscribe": "구독 취소하기",
            "Mark as read": "읽은 상태로 표시하기",
            "Mark as unread": "안 읽은 상태로 표시하기",
            "Save": "저장하기",
            "Unsave": "저장 취소하기",

            // 댓글 입력 창 상단 바 (이슈 & 끌어오기 요청)
                "Contributor": "기여자",
                "Owner": "소유자",
                "Author": "작성자",
                    "You are the author of this issue": "이 이슈의 작성자예요.",  // 이슈
                    "You are the author of this pull request.": "이 끌어오기 요청의 작성자예요.", // 끌어오기 요청
                    "This user is the author of this issue": "이 사용자가 이 이슈의 작성자예요.",  // 이슈
                    "This user is the author of this issue.": "이 사용자가 이 이슈의 작성자예요.",// 끌어오기 요청
                    "This user is the author of this pull request.": "이 사용자가 이 끌어오기 요청의 작성자예요.",// 끌어오기 요청
                "Member": "멤버",
                    //[/This user is a member of the ([^ ]+)./, "该用户是 $1 组织的成员。"],
                "Collaborator": "협업자",
                    //[/This user has been invited to collaborate on the ([^ ]+) repository./, "该用户已被邀请在 $1 仓库上进行协作。"],
                "Pick your reaction": "반응 선택하기",
                "Copy link": "링크 복사하기",
                "Quote reply": "인용하여 답글 달기",
                "Reference in new issue": "새 이슈에 인용하기",
                    // 인용하여 새 이슈 작성 대화상자
                    "Body": "본문",
                "Report content": "내용 신고하기",
                "Report": "신고하기",
                // 댓글 삭제 확인
                    "Are you sure you want to delete this?": "정말로 삭제하시겠어요?",

                "commented": "댓글 남김:",
                "commented on behalf of": "대표로 댓글 남김:",
                "— with": "— 함께:",
                "Update comment": "댓글 업데이트하기",
                "Hide": "숨기기",
                    "via email": "이메일로",

                "created": "작성함:",
                "edited": "수정함:",
                "(most recent)": "(가장 최신)",
                "(deleted)": "(삭제됨)",
                "deleted this content": "이 내용을 삭제했어요.",
                // 댓글 기록 보기
                "Options": "옵션",
                // 옵션 드롭다운 메뉴
                "More options": "더 많은 옵션",
                "The most recent revision cannot be deleted. Need to delete sensitive information? Go to the specific edit where the information was added.": "가장 최신의 수정본은 삭제할 수 없어요. 민감한 정보를 삭제해야 한다면, 해당 정보가 추가된 특정 수정 내역으로 가보세요.",
                "Delete revision from history": "히스토리에서 수정본 삭제하기",
                "This edit’s content will no longer be visible": "이 수정본의 내용은 더 이상 보이지 않아요.",
                // 댓글 상태
                "This comment has been hidden.": "이 댓글은 숨겨졌어요.",
                "This comment was marked as abuse.": "이 댓글은 남용으로 표시되었어요.",
                "This comment was marked as spam.": "이 댓글은 스팸으로 표시되었어요.",
                "This comment was marked as off-topic.": "이 댓글은 주제에서 벗어난 것으로 표시되었어요.",
                "This comment was marked as outdated.": "이 댓글은 오래된 것으로 표시되었어요.",
                "This comment was marked as duplicate.": "이 댓글은 중복으로 표시되었어요.",
                "This comment was marked as resolved.": "이 댓글은 해결됨으로 표시되었어요.",
                "Sign in to view": "로그인 후에 확인해보세요.", // 미로그인

            // 분기/태그 전환 드롭다운 메뉴
                "Switch branches/tags": "분기/꼬리표 전환하기",
                "Find or create a branch…": "분기 찾거나 만들기…",
                "Find a branch...": "분기 찾기...",
                "Filter branches/tags": "분기/꼬리표 검색하기",
                "branches": "분기",
                "default": "기본",
                "View all branches": "전체 분기 보기",
                "Find a tag": "꼬리표 찾기",
                "Tags": "꼬리표",
                "Tag": "꼬리표",
                "Search for a tag": "꼬리표 검색하기",
                "Nothing to show": "표시할 내용이 없어요",
                "View all tags": "전체 꼬리표 보기",

                "Find or create a branch...": "분기 찾거나 만들기...",
                "View all": "전체 보기",
                "branches": "분기",
                "Find a tag...": "꼬리표 찾기...",
                "Nothing to show": "표시할 내용이 없어요",
                "Tags": "꼬리표",

                "View all rules": "전체 규칙 보기",

            // 키보드 단축키
                "Open in codespace"  : "코드스페이스에서 열기",
                "Open in github.dev editor"  : "github.dev 에디터에서 열기",
                "Open github.dev editor in a new tab"  : "새 탭에서 github.dev 에디터 열기",
                "Open cs.github.com in a new tab": "새 탭에서 cs.github.com 열기",
                "Focus secondary search bar" : "보조 검색창으로 포커스하기",
                "Go to Code"                 : "코드로 이동하기",
                "Go to Issues"               : "이슈로 이동하기",
                "Go to Pull Requests"        : "끌어오기 요청으로 이동하기",
                "Go to Actions"              : "액션으로 이동하기",
                "Go to Projects"             : "프로젝트로 이동하기",
                "Go to Wiki"                 : "Wiki로 이동하기",
                "Go to Discussions"          : "토론으로 이동하기",

                "Copilot chat": "Copilot 채팅",
                "Open Copilot chat": "Copilot 채팅 열기",
                "Close Copilot chat": "Copilot 채팅 닫기",
                "Expand/collapse Copilot chat": "Copilot 채팅 펼치기/접기",

            // 이슈
                "Submit comment": "댓글 제출하기",
                "Submit comment and close issue": "댓글 제출하고 이슈 닫기",
                "Preview comment": "댓글 미리보기",
                "Create issue": "이슈 만들기",
                // "筛选用户": "",
                "Filter by or edit assignees"  : "담당자별 필터 또는 담당자 수정하기",
                "Filter by or edit labels"     : "라벨별 필터 또는 라벨 수정하기",
                "Filter by or edit projects"   : "프로젝트별 필터 또는 프로젝트 수정하기",
                "Filter by or edit milestones" : "마일스톤별 필터 또는 마일스톤 수정하기",
                "Reply (quoting selected text)": "답글 달기 (선택한 텍스트 인용)",
                "Open saved replies": "저장된 답글 열기",
                "Insert saved reply (with open saved replies)": "저장된 답글 삽입하기 (저장된 답글 열림)",

                "Pull request list": "끌어오기 요청 목록",
                    "Open pull request"  : "끌어오기 요청 열기",
                "Pull request - Conversation tab": "끌어오기 요청 - 대화 탭",
                    "Submit comment and close or open pull request": "댓글 제출하고 끌어오기 요청 닫기 또는 열기",
                    "Request reviewers": "리뷰어 요청하기",
                    "Link an issue or pull request from the same repository": "같은 저장소의 이슈 또는 끌어오기 요청 연결하기",
                    "Toggle visibility of all collapsed review comments instead of just the current one": "현재 댓글뿐만 아니라 모든 접힌 리뷰 댓글의 표시 상태 전환하기",
                "Pull request - Files changed tab": "끌어오기 요청 - 파일 변경 탭",
                    "Open commits list": "커밋 목록 열기",
                    "Open files list": "파일 목록 열기",
                    "Next commit": "다음 커밋",
                    "Previous commit": "이전 커밋",
                    "Show or hide annotations": "주석 표시/숨기기",
                    "Show or hide comments": "댓글 표시/숨기기",
                    "Submit a review comment": "리뷰 댓글 제출하기",
                    "Collapse or expand all files instead of just the current one": "현재 파일뿐만 아니라 모든 파일 접기/펼치기",
                    "and click": "그리고 클릭하기",

            // 자주 쓰는 단어
                "Open": "열기",
                "Closed": "닫힘",
                "Merged": "병합됨",
                "Draft": "초안",
                "branch": "분기",
                "branches": "분기",
                "Tags": "꼬리표",

                "Compare & pull request": "비교 및 끌어오기 요청",

        // 저장소 404 페이지 (삭제 상태 아님)
            "404 - page not found": "404 - 페이지를 찾을 수 없어요",
            "The": "해당",
            "branch of": "분기의",
            "does not contain the path": "경로가 포함되어 있지 않아요",
            "Return to the repository overview": "저장소 개요로 돌아가기",
            "Cannot find a valid ref in": "유효한 참조를 찾을 수 없어요",
            "Go to default branch": "기본 분기로 이동하기",

        // 500 페이지
            "Looks like something went wrong!": "문제가 발생한 것 같아요!",
            "We track these errors automatically, but if the problem persists feel free to contact us. In the meantime, try refreshing.": "이 오류는 자동으로 추적 중이에요. 그래도 문제가 계속된다면, 언제든지 문의해주세요. 그동안 새로고침해보세요.",
            "Contact Support": "GitHub 지원 문의하기",
            "GitHub Status": "GitHub 상태",

        // 페이지 로딩 오류 (저장소)
            "Error loading page": "페이지 로딩 중 오류가 발생했어요",
            "It looks like your internet connection is down. Please check it.": "인터넷 연결에 문제가 있는 것 같아요. 확인해보세요.",

        // 후임자 초대 알림
            "Ensure the future of your work!": "작업의 미래를 보장하세요!",
            "Consider inviting another GitHub user to be your successor.": "다른 GitHub 사용자를 후임자로 초대해보세요.",
            "Inviting a successor helps ensure the continuity of your work in case you are unable to access your account.": "계정에 접근할 수 없을 때 작업의 연속성을 위해 후임자를 초대하는 것이 좋아요.",
            "Invite a successor": "후임자 초대하기",

        // 저장소 후원
            "Couldn't load subscription status.": "구독 상태를 불러올 수 없어요.",
            "Retry": "다시 시도하기",

        // 커밋 체크 대화상자
            "Some checks haven’t completed yet": "일부 체크가 아직 완료되지 않았어요",
            "Some checks were not successful": "일부 체크가 실패했어요",
            "All checks have passed": "모든 체크가 통과했어요",
            "All checks have failed": "모든 체크가 실패했어요",
            "Waiting to run this check...": "이 체크를 실행하기 위해 대기 중이에요...",
            "Queued": "대기열 중",
            "Skipped": "건너뛰었어요",
            "Deployed": "배포되었어요",
            "Pending": "대기 중",
            "Build Failed": "빌드 실패했어요",
            "Build Passed": "빌드 통과했어요",
            "Build Errored": "빌드 오류 발생했어요",
            "Build Canceled": "빌드 취소되었어요",
            "Waiting for build": "빌드를 기다리고 있어요",

        // 미로그인 플로팅 창
            "You must be signed in to change notification settings": "알림 설정을 변경하려면 로그인하셔야 해요",
            "You must be signed in to star a repository": "저장소에 별표를 누르려면 로그인하셔야 해요",
            "You must be signed in to add this repository to a list": "이 저장소를 목록에 추가하려면 로그인하셔야 해요",
            "You must be logged in to vote": "투표하려면 로그인하셔야 해요"
    },
    "regexp": [ // 정규식 번역
        [/Started (\d+) discussions? in this repository in the past day/, "지난 하루 동안 이 저장소에서 토론을 $1개 시작했어요."], // 사용자 플로팅 정보 카드
        [/Started (\d+) discussions? in this repository in the past week/, "지난 일주일 동안 이 저장소에서 토론을 $1개 시작했어요."], // 사용자 플로팅 정보 카드
        [/Started (\d+) discussions? in this repository in the past month/, "지난 한 달 동안 이 저장소에서 토론을 $1개 시작했어요."], // 사용자 플로팅 정보 카드
        [/Started (\d+) discussions? in this repository/, "이 저장소에서 토론을 $1개 시작했어요."], // 사용자 플로팅 정보 카드
        [/Opened this pull request \(their first in ([^ ]+)\)/, "이 끌어오기 요청을 열었어요 (첫 번째로 $1에서 열었어요)"], // 사용자 플로팅 정보 카드
        [/([^ ]+) requested changes, you commented/, "$1 가 변경을 요청했어요, 당신은 댓글을 남겼어요."], // 끌어오기 요청 플로팅 정보 카드
        [/(\d+) successful checks?/, "$1 개의 체크가 성공했어요"],
        [/(\d+) successful/, "$1 성공"],
        [/(@\S+) generated this status\./, "$1 이 이 상태를 생성했어요."],
        [/Successful in (\d+)s/, "$1초 안에 성공했어요"],
        [/Successful in (\d+)m/, "$1분 안에 성공했어요"],
        [/(\d+) failing checks?/, "$1 개의 체크가 실패했어요"],
        [/Failing after (\d+)s/, "$1초 후에 실패했어요"],
        [/(\d+) in progress check/, "$1 개의 체크가 진행 중이에요"],
        [/ and /, " 와 "],
        [/, and (\d+) more/, "，그리고 다른 $1 개의 조직"], // 사용자 플로팅 정보 카드
        [/(\d+) repositor(y|ies)/, "$1 个仓库"], // 조직 플로팅 정보 카드
        [/(\d+) members?/, "$1 个成员"], // 조직 플로팅 정보 카드
        [/Answered (\d+) discussions? in this repository in the past month/, "지난 한 달 동안 이 저장소에서 토론에 $1개 답변했어요."], // 사용자 플로팅 정보 카드
        [/Answered (\d+) discussions? in this repository in the past week/, "지난 일주일 동안 이 저장소에서 토론에 $1개 답변했어요."], // 사용자 플로팅 정보 카드
        [/Answered (\d+) discussions? in this repository/, "이 저장소에서 토론에 $1개 답변했어요."], // 사용자 플로팅 정보 카드
        [/had recent pushes (\d+) seconds? ago/, "분기에 최근 푸시가 있었어요, $1초 전"],
        [/had recent pushes (\d+) minutes? ago/, "분기에 최근 푸시가 있었어요, $1분 전"],
        [/had recent pushes less than (\d+) minutes? ago/, "분기에 최근 푸시가 있었어요, $1분 미만 전에"],
        [/had recent pushes about/, "분기에 최근 푸시가 있었어요, 약"],
        [/This user is a member of the ([^ ]+) organization./, "이 사용자는 $1 조직의 멤버예요."],
        [/This user has been invited to collaborate on the ([^ ]+) repository./, "이 사용자는 $1 저장소의 협업자로 초대되었어요."],
        [/You are the owner of the (.*) repository./, "당신은 $1 저장소의 소유자예요."],
        [/This user is the owner of the (.*) repository./, "이 사용자는 $1 저장소의 소유자예요."],
        [/You have been invited to collaborate on the (.*) repository./, "당신은 이미 $1 저장소의 협업자로 초대받았어요."],
        [/You have previously committed to the (.*) repository./, "당신은 이전에 $1 저장소에 커밋했어요."],
        [/This user has previously committed to the (.*) repository./, "이 사용자는 이전에 $1 저장소에 커밋했어요."],
        [/This repository has been archived by the owner on (.+). It is now read-only./, (match, p1) => {
            const dateRegExp = I18N["ko-KR"]["public"]["time-regexp"];
            const translatedDate = dateRegExp.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), p1);
            return `이 저장소는 소유자에 의해 ${translatedDate}에 아카이브되었어요. 지금은 읽기 전용이에요.`;
        }],
        [/, and ([^ ]+)/, ", 그리고 $1"],
        [/reacted with (thumbs up|thumbs down|laugh|hooray|confused|heart|rocket|eyes) emoji/, function (all, reacted) {
            var reactedKey = {
                'thumbs up': "좋아요",
                'thumbs down': "싫어요",
                laugh: "웃음",
                hooray: "환호",
                confused: "혼란",
                heart: "하트",
                rocket: "로켓",
                eyes: "관심"
            };

            return reactedKey[reacted];
        }],
        // 협업자 권한 관련 알림
        [/You now have push access to the ([^ ]+) repository./, "당신은 이제 $1 저장소에 푸시할 권한이 있어요."],
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
};


I18N["ko-KR"]["page-new-repo"] = { // 저장소 - 새로 만들기/가져오기/포크하기
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 새 저장소 만들기 https://github.com/new
            "Create a new repository": "저장소 만들기",
                "A repository contains all project files, including the revision history.": "저장소는 프로젝트의 모든 파일과 수정 이력을 포함하고 있어요.",
                "Already have a project repository elsewhere?": "다른 곳에 이미 저장소가 있으신가요?",
                "Import a repository.": "저장소 가져오기",
                "Required fields are marked with an asterisk (*).": "필수 항목은 별표 (*) 로 표시되어 있어요.",

            "Repository template": "저장소 템플릿",
                "Fetching templates…": "템플릿을 가져오는 중이에요…",
                "No template": "템플릿 없음",
                "No templates available.": "사용 가능한 템플릿이 없어요.",
                "Start your repository with a template repository's contents.": "템플릿 저장소의 내용을 사용해서 저장소를 시작해보세요.",

            "Owner": "소유자",
            "Repository name": "저장소 이름",
            "Great repository names are short and memorable. Need inspiration? How about": "멋진 저장소 이름은 짧고 기억하기 쉬워요. 영감이 필요하시면 이건 어때요:",
                "Checking availability…": "사용 가능 여부를 확인하는 중이에요…",
                "is available.": "은(는) 사용 가능해요.",
                "The repository": "저장소",
                "already exists on this account": "이미 이 계정에 있어요.",
                "Your new repository will be created as": "새 저장소가 다음 이름으로 생성될 거예요:",
                "New repository name must not be blank": "새 저장소 이름은 비워둘 수 없어요.",

                // 사용자명과 동일한 저장소
                "You found a secret!": "비밀을 발견하셨어요!",
                "is a ✨": "은(는) ✨",
                "special": "특별한",
                "✨ repository that you can use to add a": "✨ 저장소인데, 이 저장소를 통해",
                "to your GitHub profile. Make sure it’s public and initialize it with a": "를 프로필에 추가할 수 있어요. 공개 저장소로 하는걸 잊지 마세요!",
                "to get started.": " 파일을 추가해서 시작해보세요.",
                 // 조직 .github 저장소
                "to your organization's GitHub profile. Make sure it’s public and initialize it with a": "를 조직 프로필에 추가할 수 있어요. 공개 저장소로 하는걸 잊지 마세요!",
                "in the": "다음 위치에서:",
                "directory to get started.": "디렉토리에서 시작해보세요.",

                // 조직 저장소
                "You may not create private repositories by organization policy.": "조직 정책에 따라 비공개 저장소를 만들 수 없어요.",

            "Description": "설명",
                "(optional)": "(선택)",
            "Public": "공개",
                "Anyone on the internet can see this repository. You choose who can commit.": "인터넷상의 누구나 이 저장소를 볼 수 있어요. 커밋 권한은 본인이 선택할 수 있어요.",
            "Private": "비공개",
                "You choose who can see and commit to this repository.": "누가 이 저장소를 보고 커밋할 수 있는지 본인이 선택할 수 있어요.",
            "Initialize this repository with:": "다음 항목으로 저장소를 초기화해보세요:",
                // "Skip this step if you’re importing an existing repository.": "기존 저장소를 가져오시는 경우, 이 단계를 건너뛰셔도 돼요.",
                "Add a README file": "README 파일 추가하기",
                    "This is where you can write a long description for your project.": "여기에 프로젝트에 대한 자세한 설명을 작성할 수 있어요.",
                    "Learn more about READMEs.": "README에 대해 더 알아보세요.",
            "Add .gitignore": ".gitignore 파일 추가하기",
                "Choose which files not to track from a list of templates.": "템플릿 목록에서 추적하지 않을 파일을 선택해보세요.",
                "Learn more about ignoring files.": "파일 무시에 대해 더 알아보세요.",
                ".gitignore template:": ".gitignore 템플릿:",
                    ".gitignore template": ".gitignore 템플릿",
                    "Filter…": "필터링…",
                    "None": "없음",
            "Choose a license": "라이선스 선택하기",
                "A license tells others what they can and can't do with your code.": "라이선스는 다른 사람들이 사용자님의 코드를 어떻게 사용할 수 있고 사용할 수 없는지를 알려줘요.",
                "Learn more about licenses.": "라이선스에 대해 더 알아보세요.",

                "License:": "라이선스:",
                    "License": "라이선스",

            // 장터 앱 목록
            "Grant your Marketplace apps access to this repository": "장터 앱에 이 저장소에 대한 접근 권한을 부여해보세요.",
            "You are": "사용자님은",
            "subscribed to": "구독하셨어요",
            "Marketplace app": "장터 앱",
            "s": " ",

            "You are creating a public repository in your personal account.": "개인 계정에서 공개 저장소를 만들고 있어요.",
            "You are creating a private repository in your personal account.": "개인 계정에서 비공개 저장소를 만들고 있어요.",

            "This will set": "이렇게 설정할 거예요:", // 쀐
            "as the default branch.": "기본 분기로.",
            "Change the default name in": "기본 이름 변경은",
            "your": "사용자님의",
            "Settings": "설정",

            "Create repository": "저장소 만들기",
            "Creating repository...": "저장소 생성 중이에요...",

        // 템플릿 기반 새 저장소 만들기 https://github.com/new?template_owner=<template-owner>&template_name=<template-name>
            "Include all branches": "모든 분기 포함하기", // 쀐
                "Copy all branches from": "모든 분기 복사하기:",
                "and not just the default branch.": "기본 분기만이 아니라요.",

        // 저장소 가져오기 1페이지 https://github.com/new/import
            "Import your project to GitHub": "프로젝트를 GitHub로 가져오기",
                "Import all the files, including revision history, from another version control system.": "다른 버전 관리 시스템에서 파일과 수정 이력을 모두 가져와요.",
                "Support for importing Mercurial, Subversion and Team Foundation Version Control (TFVC) repositories ended on April 12, 2024. For more details, see the": "Mercurial, Subversion, Team Foundation Version Control (TFVC) 저장소 가져오기는 2024년 4월 12일부터 지원이 종료되었어요. 자세한 내용은 아래를 참조해보세요:",
                "changelog": "변경 로그",

            "Your source repository details": "원본 저장소 정보",
            "The URL for your source repository": "원본 저장소 URL",
                "Learn more about the types of": "다음 종류에 대해 더 알아보세요:",
                "importing git repositories": "Git 저장소 가져오기",

            "Please enter your credentials if required for cloning your remote repository.": "원격 저장소를 복제하려면 필요한 경우 자격 증명을 입력해보세요.",
            "Your username for your source repository": "원본 저장소 사용자명",
            "Your access token or password for your source repository": "원본 저장소의 접근 토큰 또는 비밀번호",

            "Your new repository details": "새 저장소 정보",
            //"Owner": "所有者",
            // "Repository name": "仓库名称",
                // "is available.": "名称可用。",
                //"The repository": "저장소",
                //"already exists on this account.": "已经存在于此账户。",
                //"Your new repository will be created as": "您的新仓库将被创建为",
            //"Public": "공개",
            //"Anyone on the internet can see this repository. You choose who can commit.": "任何人都可以看到这个仓库，您可以选择谁能提交。",
            //"Private": "비공개",
            //"You choose who can see and commit to this repository.": "您可以选择谁可以看和提交到该仓库.",
            "Cancel": "취소하기",
            "Begin import": "가져오기 시작하기",
            "Preparing import…": "가져오기 준비 중이에요…",

        // 저장소 가져오기 1페이지 /<user-name>/<repo-name>/import
            "Import all the files, including the revision history, from another version control system.": "다른 버전 관리 시스템에서 파일과 수정 이력을 모두 가져와요.",
            "Your old repository’s clone URL": "이전 저장소의 클론 URL",
            "supported VCS.": "지원하는 VCS.",
            "Your existing repository": "기존 저장소",
            "Change repository": "저장소 선택하기",

        // 저장소 가져오기 2페이지 /<user-name>/<repo-name>/import
            "Preparing your new repository": "새 저장소 준비 중이에요",
                "There is no need to keep this window open, we’ll email you when the import is done.": "이 창을 열어둘 필요 없어요, 가져오기가 완료되면 이메일로 알려드릴게요.",
                "There is no need to keep this window open. We'll email you when the import is done.": "이 창을 열어둘 필요 없어요. 가져오기가 완료되면 이메일로 알려드릴게요.",
            "Detecting your project’s version control system…": "프로젝트의 버전 관리 시스템을 감지하는 중이에요…",
            "Importing commits and revision history…": "커밋과 수정 이력을 가져오는 중이에요…",
            // [/Updating branches and (\d) commit authors?…/, "업데이트 중: 분기와 $1명의 커밋 작성자…"],
            "Optimizing repository and pushing commits to GitHub…": "저장소를 최적화하고 커밋을 GitHub로 푸시하는 중이에요…",
            "Importing complete! Your new repository": "가져오기 완료! 새 저장소",
            "is ready.": "가 준비되었어요.",

        // 저장소 포크 /<user-name>/<repo-name>/fork
            "Create a new fork": "새 포크 만들기",
                "A": "한",
                "fork": "포크",
                "is a copy of a repository. Forking a repository allows you to freely experiment with changes without affecting the original project.": "포크는 저장소의 복사본이에요. 포크를 하면 원본 프로젝트에 영향을 주지 않고 자유롭게 변경을 실험해볼 수 있어요.",
                "View existing forks.": "기존 포크 보기",

            "No available destinations to fork this repository.": "이 저장소를 포크할 수 있는 대상이 없어요.",
            "Creating fork…": "포크 생성 중이에요…",

            // "Owners": "소유자",
                "Choose an owner": "소유자 선택하기",
                    "(fork already exists)": "(포크가 이미 있어요)",
            // "Repository name": "저장소 이름",
                // "The repository": "저장소",
                // "already exists on this account.": "이미 이 계정에 있어요.",
                "Your new repository will be created as": "새 저장소가 다음 이름으로 생성될 거예요:",
                    "The repository name can only contain ASCII letters, digits, and the characters": "저장소 이름은 ASCII 문자, 숫자, 그리고 다음 문자를 포함할 수 있어요:",

            "By default, forks are named the same as their upstream repository. You can customize the name to distinguish it further.": "기본적으로 포크는 상위 저장소와 동일한 이름을 사용해요. 더 구분되도록 이름을 직접 정할 수 있어요.",

            "Copy the": "복사하기만",
            "branch only": "분기만",

            "Contribute back to": "기여하기:",
            "by adding your own branch.": "자신의 분기를 추가해서.",

            "You are creating a fork in your personal account.": "개인 계정에 포크를 생성하고 있어요.",
            "Create fork": "포크 만들기",

    },
    "regexp": [ // 정규식 번역
        // [/([^ ]+) is available\./,"$1 이름 사용 가능해요."],
        [/You are creating a public repository in the ([^ ]+) organization./, "사용자님은 $1 조직에서 공개 저장소를 생성하고 있어요."], // 조직의 공개 저장소 생성
        [/You are creating a private repository in the ([^ ]+) organization./, "사용자님은 $1 조직에서 비공개 저장소를 생성하고 있어요."], // 조직의 비공개 저장소 생성
        // [/\(fork already exists\)/, "（포크가 이미 있어요）"], // 포크 페이지
        // [/\(repository already exists\)/, "（저장소가 이미 있어요）"], // 포크 페이지
        [/You are creating a fork in the ([^ ]+) organization./, "사용자님은 $1 조직에서 포크를 생성하고 있어요."], // 포크 페이지
        [/Updating branches and (\d+) commit authors?…/, "분기와 $1명의 커밋 작성자를 업데이트 중이에요…"], // 저장소 가져오기 2페이지
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        // [/, and (\d+) more/, "，및 다른 $1개"],
        // [/(\d+) repositor(y|ies)/, "$1개의 저장소"],
        // [/(\d+) members?/, "$1명의 멤버"],
        ...I18N["ko-KR"]["orgs-public"]["regexp"],
    ],
};
I18N["ko-KR"]["new"] = I18N["ko-KR"]["page-new-repo"];
I18N["ko-KR"]["new/import"] = I18N["ko-KR"]["page-new-repo"];
I18N["ko-KR"]["repository/import"] = I18N["ko-KR"]["page-new-repo"];
I18N["ko-KR"]["repository/fork"] = I18N["ko-KR"]["page-new-repo"];
I18N["ko-KR"]["orgs/repositories/new"] = I18N["ko-KR"]["page-new-repo"];

I18N["ko-KR"]["repository"] = { // 仓库页面 /<user-name>/<repo-name>/
    "static": { // 静态翻译
            ...I18N["ko-KR"]["repository-public"]["static"],

        // 代码标签卡 & 仓库首页 /<user-name>/<repo-name>/ 和 /<user-name>/<repo-name>/tree/<branch>
            // [/Branch ([^ ]+) was renamed to ([^ ]+)./, "分支 $1 已更名为 $2。"],

            // 快捷键
                "Commands": "命令",
                "Clone repository: Copy HTTPS": "克隆仓库：复制 HTTPS",
                "Clone repository: Copy SSH": "克隆仓库：复制 SSH",
                "Clone repository: Copy GitHub CLI": "克隆仓库：复制 GitHub CLI",
                "Copy file permalink": "复制文件永久链接",

            // 操作条
                "forked from": "포크함 :",
                "Public repository · Forked from": "공개 저장소 · 포크함 :", // Android UA 下出现
                "Public repository · Generated from": "공개 저장소 · 생성함 :", // 同上
                "generated from": "생성함 :",
                "mirrored from": "미러함 :",

                "Pin": "고정",
                    "Pin this repository to your profile": "이 저장소를 프로필에 고정",
                    "No pin slots remaining in your profile": "남아있는 고정할 자리가 없어요",
                "Edit Pins": "고정 수정하기",
                    "Pin to…": "고정…",
                    "Profile": "프로필",
                        "Pin this to your personal profile, visible to everyone": "개인 프로필에 이것을 고정하기, 모두에게 보임",
                        "Limit reached": "최대 제한 넘음",
                    // 组织仓库
                    "Public pins in this organization": "이 조직의 공개 고정",
                        "Visible to anyone": "모두에게 보임",
                    "Private pins in this organization": "이 조직의 비공개 고정",
                        "Visible to members only": "조직 회원에게만 보임",
                "Unpin": "고정 취소",

                "Unwatch": "무시 중",
                "Stop ignoring": "그만 무시하기",
                "Watch": "구독",
                "Unwatch": "구독 취소",

                "Star": "별표",
                "Unstar": "별표 취소",
                "Fork": "포크",
                "Unfork": "포크 취소",

                "Sponsor": "후원",
                // 赞助对话框
                // [/Sponsor ([^ ]+)?/, "赞助 $1"], // 赞助按钮 对话框 标题
                "External links": "외부 링크",
                "Learn more about funding links in repositories": "저장소의 펀딩 링크에 대해 자세히 알아보기",
                "Report abuse": "남용 신고",

                // 提交栏 GitHub Action
                "All checks have passed": "모든 검사가 통과되었어요",


                // 关注 & 订阅通知设置 下拉菜单
                "Notification settings": "알림 설정", //小屏模式
                "Subscribe to events for": "다음 이벤트를 위해 구독 :",
                "Notifications": "알림",
                "Participating and @mentions": "구독과 @언급",
                    "Only receive notifications from this repository when participating or @mentioned.": "참여하거나 @언급된 경우에만 이 저장소에서 알림을 받어요",
                "All Activity": "모든 액션",
                    "Notified of all notifications on this repository.": "이 저장소에 있는 모든 알림에 대해 알림을 받았어요.",
                "Ignore": "무시",
                    "Never be notified.": "절대 알림 받지 않기.",
                "Custom": "맞춤",
                    "Select events you want to be notified of in addition to participating and @mentions.": "참여 및 @언급 외에도 알림을 받고 싶은 이벤트를 선택하기",
                "Get push notifications on": "푸시 알림 받기",
                "Releases": "릴리즈",
                    //"Issues are not enabled for this repository": "此仓库未启用이슈功能",
                "Discussions": "토론",
                    //"Discussions are not enabled for this repository": "该仓库未启用讨论功能",
                    //"Discussions are not enabled for this repo": "此仓库未启用讨论功能",
                    "are not enabled for this repository": "은 이 저장소에서 활성화 되어 있지 않어요",
                "Security alerts": "보안 알림",
                //"Cancel": "取消",
                "Apply": "반영하기",
                "Close": "닫기",

                // 复刻下拉
                "Cannot fork because repository is empty.": "저장소가 비어있기 때문에 포크할 수 없어요.",
                "Cannot fork because you own this repository and are not a member of any organizations.": "이 저장소를 소유하고 있으며 어떤 조직의 회원도 아니기 때문에 포크할 수 없어요.",
                "Existing forks": "기존 포크",
                "You don't have any forks of this repository.": "이 저장소에는 포크가 없어요.",
                "Create a new fork": "새 포크 만들기",

                //
                "Star this repository": "이 저장소에 별표하기", //小屏模式
                "Unstar this repository": "이 저장소 별표 취소하기", //小屏模式

            // 仓库主页 分支保护
                // [/Your ([^ ]+) branch isn't protected/, "您的 $1 分支不受保护"], // 仓库主页 分支保护
                "Your": "사용자님의",
                "branch isn't protected": "분기가 보호되지 않고 있어요", // 新版仓库概述
                "Protect this branch from force pushing or deletion, or require status checks before merging.": "강제 푸시나 삭제로부터 이 분기를 보호하거나 병합하기 전에 상태 확인이 필요해요.",
                "View documentation.": "문서 보기",
                "Protect this branch": "이 분기 보호하기",
                "Dismiss": "무시",

            // 仓库主页 Dependabot 警告框
                "We found potential security vulnerabilities in your dependencies.": "사용하시는 종속성에서 잠재적인 보안 취약점이 발견되었어요.",
                "Only the owner of this repository can see this message.": "이 저장소의 소유자만 이 메시지를 볼 수 있어요.",
                "See Dependabot alerts": "Dependabot 알림 보기",

            // 空仓库
                "This repository is empty.": "이 저장소는 텅 비어있네요",
                "Care to check out the": "기다리는 동안",
                "GitHub Channel on YouTube": "GitHub의 YouTube 채널도",
                "while you wait?": "확인해보세요. 심심할 것 같아서요.",

            // 已上架的 GitHub Action 项目
                "Use this GitHub action with your project": "이 GitHub 액션을 프로젝트와 함께 사용하세요",
                "Add this Action to an existing workflow or create a new one": "기존 워크플로에 이 액션을 추가하거나 새 워크플로를 만들어 주세요",
                "View on Marketplace": "장터에서 보기",

            // 未上架的 GitHub Action 项目
                "You can publish this Action to the GitHub Marketplace": "이 액션을 GitHub 장터에 게시할 수 있어요",
                "Draft a release": "릴리즈 초안 작성하기",

            // 访问已删除的分支
            "This commit does not belong to any branch on this repository, and may belong to a fork outside of the repository.": "이 커밋은 이 저장소의 어떤 분기에도 속하지 않으며 저장소 외부의 분기에도 속할 수 있어요.",

            // 最近有了新提交提醒
            // [/had recent pushes less than/, "有了最近的推送，不到"], //最近有了新提交提醒
            // [/had recent pushes/, "有了最近的推送，"], //最近有了新提交提醒

            "Navigate back to": "다음으로 돌아가기 :", // 小屏模式

            // 左侧正文

            // 文档栏目(仅 Andoid UA)
            "More": "더 보기",
            "Menu": "메뉴",

            // 自述文件(README.md)
            "Filter headings": "필터 제목",
            "Edit file": "파일 수정하기",

            // 默认分支被重命名提醒框
                "The default branch has been renamed!": "기본 지점의 이름이 변경되었어요!",
                "is now named": "은(는) 이제 이 이름이에요 :",
                "If you have a local clone, you can update it by running the following commands.": "로컬 복제가 있는 경우 다음 명령을 실행하여 업데이트할 수 있어요.",
                "OK, got it": "이해했어요",

                // 上游仓库分支重命名
                    "The default branch on the parent repository has been renamed!": "부모 저장소의 기본 분기 이름이 변경되었어요!",
                    "renamed its default branch": "기본 분기로 이름을 변경했어요",
                    "You can rename this fork's default branch to match in": "이 포크의 기본 분기 이름을 일치하도록 변경할 수 있어요",
                    "branch settings": "분기 설정",

            "branch": "분기",
            "branches": "분기",
            "Tag": "꼬리표",
            "Tags": "꼬리표",

            "Go to file": "파일로 가기",
                "No matches found": "아무것도 못 찾았어요",
                "Go to folder": "폴더로 가기",
                "See all results": "모든 결과 보기",
            "Add file": "파일 추가",
                // 添加文件 下拉菜单
                "Create new file": "새 파일 만들기",
                "Upload files": "파일 업로드하기",
                "Upload file": "파일 업로드하기", // Android UA

            // 代码 下拉菜单
                "Local": "로컬",
                    "Clone": "복제",
                        // HTTPS
                        "Clone using the web URL.": "Web URL을 사용해서 복제",
                        // SSH
                        "You don't have any public SSH keys in your GitHub account.": "GitHub 계정에 공개 SSH 키가 없어요.",
                        "You can": "새로운 공개 키를",
                        "add a new public key": "추가하실 수 있어요",
                        ", or try cloning this repository via HTTPS.": ", 아니면 HTTPS를 통해 이 저장소를 복제해 보세요.",

                        "Use a password-protected SSH key.": "비밀번호로 보호된 SSH 키를 사용해주세요.",
                        // GitHub CLI
                        "Work fast with our official CLI.": "우리의 공식 CLI로 빠르게 작업해보세요.",
                        "Learn more about the CLI": "CLI에 대해 자세히 알아보기",

                    "Open with GitHub Desktop": "GitHub Desktop으로 열기",
                        "Launching GitHub Desktop": "GitHub Desktop 여는 중",
                            "If nothing happens,": "아무 일도 일어나지 않는다면",
                            "download GitHub Desktop": "GitHub Desktop을 다운로드 하고",
                            "and try again.": "다시 시도해보세요.",
                    "Open with Visual Studio": "Visual Studio로 열기",
                    "Download ZIP": "ZIP 다운로드하기",

                    "Code 55% faster with AI pair programming.": "AI를 사용한 프로그래밍으로 55% 빠르게 코딩해보세요.",
                        "Start my free trial": "무료 체험판 시작하기",
                        "Don't show again": "다시 보지 않기",

                    "Which remote URL should I use?": "어떤 원격 URL을 사용해야 하나요?",
                    "Copy url to clipboard": "URL 클립보드로 복사하기",
                    // "Copy to clipboard": "复制到剪切板",
                    // "Copied!": "✅ 复制成功!",

                // 代码空间
                    "Your workspaces in the cloud": "클라우드에 있는 작업공간들",
                    //[/Create a codespace on ([^ ]+)/, "在 $1 上创建代码空间"],
                    "Codespace repository configuration": "코드스페이스 저장소 구성",
                        "New with options...": "새로 만들기 (옵션 포함)",
                        "Configure dev container": "개발 컨테이너 구성",
                        "Set up prebuilds": "사전 빌드 설정",
                        "Manage codespaces": "코드스페이스 관리",
                        "Share a deep link": "딥 링크 공유",
                            "Share codespace configuration": "코드스페이스 구성 공유",
                            "Choose which settings from this configuration to include when sharing": "공유 시 포함할 설정 선택",
                            "Quick start": "빠른 시작",
                            "Automatically create or reuse the most recent matching codespace.": "자동으로 생성하거나 최근의 일치하는 코드스페이스 재사용.",
                            "Read more about creating a link.": "링크 생성에 대한 자세한 내용 읽기.",
                            "Snippets": "코드 조각",
                            "Use the following snippets to embed an “Open in Codespaces” button for this configuration in your own page or README.": "다음 코드 조각을 사용하여 이 설정의 'Codespaces에서 열기' 버튼을 페이지 또는 README에 포함해주세요.",
                        "What are codespaces?": "코드스페이스란?",
                    "No codespaces": "코드스페이스 없음",
                    "You don't have any codespaces with this repository checked out": "이 저장소에서 체크아웃된 코드스페이스가 없어요.",
                    "Opening in codespace": "코드스페이스에서 여는 중",
                    //[/Create codespace on ([^ ]+)/, "$1에서 코드스페이스 생성"],
                    "Learn more about codespaces...": "코드스페이스에 대해 더 알아보기...",
                    "Codespace usage for this repository is paid for by": "이 저장소의 코드스페이스 사용 요금은 다음에서 부담해요 :",

                    "On current branch": "현재 분기에선요",
                        "No codespaces on current branch": "이 분기에는 코드스페이스가 없어요",
                    "On other branches": "다른 분기에선요",
                    "miniature adventure": "미니 탐험",
                    "Open miniature adventure in web": "웹에서 미니 탐험 열기",
                    "Active": "활성화",
                        "Open in ...": "다음에서 열기 :",
                            "Open in browser": "브라우저에서 열기",
                            "Open in Visual Studio Code": "Visual Studio Code에서 열기",
                            "Open in JetBrains Gateway": "JetBrains Gateway에서 열기",
                            "Open in JupyterLab": "JupyterLab에서 열기",
                        "Rename": "이름 변경",
                            "Change codespace display name to...": "다음으로 코드스페이스 표시 이름 변경 :",
                        "Export changes to a branch": "변경 사항을 분기로 내보내기",
                            "This will create a new branch with any unpushed changes": "이건 푸시되지 않은 변경 사항을 포함한 새 분기를 만들거에요",
                            "Create branch": "분기 만들기",
                        "Change machine type": "머신 유형 변경",
                            "Change codespace machine type": "코드스페이스 머신 유형 변경",
                            "Machine type": "머신 유형",
                                "2-core": "2코어",
                                "4-core": "4코어",
                            "Need even more power?": "더 강력한 성능이 필요하세요?",
                            "Contact our team": "팀에 문의하기",
                            "to enable 32-core or GPU machines.": "32코어 또는 GPU 머신을 활성화하려면요.",
                            "Update codespace": "코드스페이스 업데이트",
                        "Stop codespace": "코드스페이스 중지",
                    "Show more actions for codespace": "코드스페이스의 추가 작업 보기",
                        "Open in Browser": "브라우저에서 열기",
                        "Open in Visual Studio Code": "Visual Studio Code에서 열기",
                        "Open in JetBrains Gateway": "JetBrains Gateway에서 열기",
                        "Open in JupyterLab": "JupyterLab에서 열기",
                        "Rename": "이름 변경",
                            "Rename codespace": "코드스페이스 이름 변경",
                            "Name": "이름",
                        "Auto-delete codespace": "코드스페이스 자동 삭제",
                        "Export changes to a branch": "변경 사항을 분기로 내보내기",
                            "This will create a new branch with any unpushed changes": "푸시되지 않은 변경 사항을 포함한 새 분기가 생성돼요",
                            "Checking branch status": "분기 상태 확인 중",
                            "Create branch": "분기 생성",
                        "Export changes to a fork": "변경 사항을 포크로 내보내기",
                            "You do not have write access to this codespace's repository. This will create a new fork of the repository at": "이 코드스페이스 저장소에 대한 쓰기 권한이 없어요. 새로운 포크가 다음 위치에 생성돼요:",
                            ", reassign your codespace to that fork, and export your changes to a new branch.": "해당 포크로 코드스페이스가 재할당되고, 변경 사항이 새 분기로 내보내져요.",
                            "Create fork": "포크 생성",
                        "Change machine type": "머신 유형 변경",
                            "Change codespace machine type": "코드스페이스 머신 유형 변경",
                            "Update codespace": "코드스페이스 업데이트",
                        "Stop codespace": "코드스페이스 중지",
                    "No changes": "변경 사항 없음",

                // Copilot
                    "Describe a task...": "작업을 묘사해보세요...",
                    "Start task": "작업 시작하기",

                    // [/Codespace \"(.+)\" stopped./, "代码空间 “$1” 已停止。"],
                    // [/Codespace \"(.+)\" deleted./, "代码空间 “$1” 已删除。"],
                    // [/Are you sure you want to delete (.+)\?/, "您确定要删除 $1 吗？"],


            "Use this template": "이 템플릿 사용",
                "Create a new repository": "새 저장소 만들기",
                "Open in a codespace": "코드스페이스에서 열기",

            // 개인 저장소 현재 분기 상태
            "This branch is": "이 분기는",
            "ahead of": "보다 앞서 있어요", // 새 버전 저장소 개요
            "behind": "보다 뒤처져 있어요", // 새 버전 저장소 개요
            "This branch is up to date with": "이 분기는 ~와 동기화되어 있어요", // 새 버전 저장소 개요

            "Contribute": "기여",
                // 기여 버튼 드롭다운 메뉴
                "This branch is not ahead of the upstream": "이 분기는 상위 저장소보다 앞서 있지 않아요",
                "No new commits yet. Enjoy your day!": "새로운 커밋이 아직 없어요. 좋은 하루 보내세요!",
                "Open a pull request to contribute your changes upstream.": "상위 저장소에 변경사항을 기여하기 위해 끌어오기 요청를 여세요.",
                "This branch is not behind the upstream": "이 분기는 상위 저장소보다 뒤처져 있지 않아요",
                "Open pull request": "끌어오기 요청 열기",

            "Sync fork": "포크 동기화",
                // 포크 동기화 버튼 드롭다운 메뉴
                "This branch is out-of-date": "이 분기는 최신 상태가 아니에요",
                "Update branch to merge the latest changes from the upstream repository into this branch.": "상위 저장소의 최신 변경사항을 이 분기에 병합하기 위해 분기를 업데이트해요.",
                // [/Update branch to keep this branch up-to-date by syncing (\d+) commits? from the upstream repository./, "상위 저장소에서 $1개의 커밋을 동기화하여 이 분기를 최신 상태로 유지하기 위해 분기를 업데이트해요."], // 포크 동기화
                "Update branch to keep this branch up-to-date by syncing": "이 분기를 최신 상태로 유지하기 위해 동기화해 업데이트해요",
                "from the upstream repository.": "상위 저장소에서 가져왔어요.",
                "Learn more about syncing a fork": "포크 동기화에 대해 자세히 알아보기",
                // [/This branch is not behind the upstream ([^ ]+)/, "이 분기는 상위 저장소보다 뒤처져 있지 않아요 $1"], // 포크 동기화
                "No new commits to fetch. Enjoy your day!": "새로운 커밋을 가져올 수 없어요. 좋은 하루 보내세요!",
                "Compare": "비교",
                "Update branch": "분기 업데이트",
                "Updating...": "업데이트 중이에요...",

                "This branch has conflicts that must be resolved": "이 분기에는 반드시 해결해야 할 충돌이 있어요",
                // [/Discard (\d+) commits? to make this branch match the upstream repository. (\d+)commits? will be removed from this branch./, "이 분기를 상위 저장소와 일치시키기 위해 $1개의 커밋을 폐기하면, 이 분기에서 $2개의 커밋이 제거될 거예요."],
                "Discard": "폐기하기",
                "to make this branch match the upstream repository.": "상위 저장소와 일치하도록",
                "will be removed from this branch.": "이 분기에서 제거될 거예요.",
                "You can resolve merge conflicts using the command line and a text editor.": "명령 줄과 텍스트 편집기를 사용하여 병합 충돌을 해결할 수 있어요.",
                // [/Discard (\d+) commits?/, "폐기 $1개의 커밋"],
                "Discarding changes...": "변경 사항을 폐기하는 중이에요...",

                // 顶部提醒
                    // [/Successfully fetched and merged from upstream ([^ ]+)/, "成功从上游 $1 获取并合并。"],

            // "Choose a head ref": "选择一个头引用",

            // "There isn’t anything to compare.": "没有什么可比较的。",
            // "and": "그리고",
            // "are entirely different commit histories.": "是完全不同的提交历史。",
            // "No commit comments for this range": "在此范围内没有提交评论",
            // "No new commits yet. enjoy your day!": "尚无新提交。祝您愉快！",
            // "Find a branch": "查找分支",

            // 正文
            "commit": "커밋",
            "commits": "커밋",
            "failure": "실패",
            "success": "성공",
            "Approved": "승인됨",
            // [/([\d,]+) Commits?/, "$1 次提交"], // 新版仓库概述

            "Failed to load latest commit information.": "载入最新提交信息失败。",

            "View code": "查看代码", //小屏模式

            // 仓库缺失 README 提醒
            "Help people interested in this repository understand your project by adding a README.": "이 저장소에 관심 있는 사람들을 위해 README를 추가하여 프로젝트를 이해할 수 있도록 도와주세요!",
            "Add a README": "README 추가",

            // 右侧栏

            // 与用户名同名仓库 编辑 README
            "is a special repository.": "은(는) 특별한 저장소에요.",
            "Its": "그것은", //쀐
            "will appear on your public profile.": "공개 프로필에 표시될거에요.",
            "Edit README": "README 수정",
            "Visit profile": "프로필 방문하기",

            "is special. If you": "특별해요. 만약",
            "make this a public repository": "이 저장소를 공개 저장소로 만든다면요",
            ", its": ", 그것은", //쀐
            "Go to Settings": "설정으로 가기",

            // 组织下.github 仓库 README
                "is a special repository. Create a": "은(는) 특별한 저장소에요.",
                "and it will appear on the organization's profile!": "를 만들면 조직의 프로필에 나타날거에요!",
                "Add profile README": "프로필 README 추가하기",

                "is a special repository.": "은(는) 특별한 저장소에요.",
                "will appear on the organization's profile.": "은(는) 조직의 프로필에 나타날거에요.",

            // 组织下.github-private 仓库 README
                "Add a README with an overview of your project.": "프로젝트 개요와 함께 README를 추가해주세요.",
                "The": " ",
                // [/will appear on ([^ ]+)'s member profile, visible only to organization members./, "将出现在 $1 的成员资料中，仅对组织成员可见。"],

            // "About": "정보"，
            "No description, website, or topics provided.": "설명, 웹사이트 또는 주제가 제공되지 않았어요.",
            "Readme": "README",
            "README": "README",
            "View license": "라이선스 보기",
            "GPL-3.0 license": "GPL-3.0 라이선스",
            "AGPL-3.0 license": "AGPL-3.0 라이선스",
            "LGPL-3.0 license": "LGPL-3.0 라이선스",
            "MIT license": "MIT 라이선스",
            "Apache-2.0 license": "Apache-2.0 라이선스",
            "OFL-1.1 license": "OFL-1.1 라이선스",
            "0BSD license": "0BSD 라이선스",
            "BSD-3-Clause license": "BSD-3-Clause 라이선스",
            "CC0-1.0 license": "CC0-1.0 라이선스",
            "WTFPL license": "WTFPL 라이선스",
            "Unknown": "알 수 없어요",
            "Code of conduct": "행동 강령",
            "Security policy": "보안 정책",
            "Cite this repository": "이 저장소를 인용하기",
            "If you use this software in your work, please cite it using the following metadata.": "작업에서 이 소프트웨어를 사용하면, 아래 메타데이터를 사용해서 인용해 주세요.",
            "Learn more about CITATION files.": "CITATION 파일에 대해 더 알아보세요.",
            "View citation file": "인용 파일 보기",
            "Activity": "작업",
            "Custom properties": "사용자 정의 속성",
            "star": "별표",
            "stars": "별표", 
            "watching": "관심",
            "fork": "포크", 
            "forks": "포크",
            "Report repository": "저장소 신고",
            "Public repository": "공개 저장소", // 작은 화면 모드
            "Private repository": "비공개 저장소", // 작은 화면 모드

            // 仓库描述编辑 对话框
            "Edit repository details": "저장소 간략 설명을 편집",
            "Description": "설명",
            "Short description of this repository": "이 저장소에 대한 간단한 설명",
            "Website": "웹사이트",
            "Enter a valid URL": "유효한 URL을 입력해주세요",
            "Use your GitHub Pages website": "GitHub Pages 웹사이트를 사용해주세요",
            "Topics": "주제",
            "(separate with spaces)": "（공백으로 구분해요）",
            "Suggested:": "제안됨 :",
              "Add this topic": "이 주제에 추가하기",
              "Decline this topic": "이 제안 거절하기",
                "This isn’t relevant": "이건 관련이 없어요",
                "This is too specific": "이건 너무 구체적이에요",
                "This is too general": "이건 너무 일반적이에요",
                "I just don’t like it": "그냥 마음에 들지 않아요",
            "Include in the home page": "홈페이지에 포함시키기",
            "Save changes": "변경 사항 저장",
              // 상단 알림
              "Your repository details have been saved.": "저장소 간략 설명이 저장되었어요.",
          
            "Releases": "릴리즈",
              "No releases published": "아무런 릴리즈도 출시되지 않았어요",
              "Latest": "최신",
              "Create a new release": "새 릴리즈 생성하기",
            // "Packages": "패키지",
              "No packages published": "아무런 패키지도 출시되지 않았어요",
              "Publish your first package": "첫 번째 패키지를 출시해보세요",
            "Sponsor this project": "이 프로젝트 후원하기",
              "Learn more about GitHub Sponsors": "GitHub Sponsors에 대해 자세히 알아보기",
            "Used by": "다음에 의해 사용됨 :",
            "Contributors": "기여자",
            "Environments": "환경",
            "Deployments": "배포",
              "+ more deployments": "+ 더 많은 배포",
            "Languages": "언어",

            // "branch": "분기",
            // "branches": "분기",
            // "release": "次发布",
            // "releases": "次发布",
            // "contributor": "个贡献者",
            // "contributors": "个贡献者",

            // 새로운 버전 저장소 개요
                // /<user-name>/<repo-name>#coc
                "Add a code of conduct": "행동 강령을 추가하세요",
                "Define community standards, signal a welcoming and inclusive project, and outline procedures for handling abuse by adding a code of conduct.": "행동 강령을 추가하여 커뮤니티 기준을 명확히 하고, 환영과 포용의 메시지를 전달하며, 남용 행위를 처리하는 절차를 설명해 보세요.",

            // /<user-name>/<repo-name>#license
                "License": "라이선스",
                "Add a license": "라이선스를 추가하세요",
                "Add a license to your repository to make it clear how others can use, change, and contribute to your project.": "저장소에 라이선스를 추가하여 다른 사람들이 프로젝트를 어떻게 사용, 변경, 그리고 기여할 수 있는지 명확히 해 보세요.",

            // /<user-name>/<repo-name>#security
                "Add a security policy": "보안 정책을 추가하세요",
                "Help your community understand how to securely report security vulnerabilities for your project.": "프로젝트의 보안 취약점을 안전하게 신고하는 방법을 커뮤니티가 이해할 수 있도록 도와주세요.",

            // 액션 저장소 오른쪽 사이드바
            "Suggested workflows": "제안된 워크플로",
            "Based on your tech stack": "사용자님의 기술 스택을 기반으로 맞췄어요!",
            "Set up": "설정하기",
            "Configure": "구성하기",
            "More workflows": "더 많은 워크플로",
            "Dismiss suggestions": "제안 숨기기",

            // 저장소 포크 중...
            // [/Forking ([^ ]+)/, "포크 $1 중"], // 포크 진행 중...
            "Generating your repository...": "저장소를 생성 중이에요...",
            "It should only take a few seconds.": "몇 초면 충분해요.",
            "Refresh": "새로 고침",

            // 빈 저장소 초기화 /<user-name>/<repo-name>/
            "Start coding with Codespaces": "Codespaces를 사용하여 코딩을 시작해 보세요",
                "Add a README file and start coding in a secure, configurable, and dedicated development environment.": "README 파일을 추가하고 안전하며 구성 가능한 전용 개발 환경에서 코딩을 시작해 보세요.",
                "Create a codespace": "코드스페이스를 생성해 보세요",
            // 저장소 관리
            "Set up GitHub Copilot": "GitHub Copilot을 설정해 보세요",
                "Use GitHub's AI pair programmer to autocomplete suggestions as you code.": "코딩할 때 GitHub의 AI 페어 프로그래머를 사용하여 자동 완성 제안을 받아보세요.",
                "Get started with GitHub Copilot": "GitHub Copilot 사용을 시작해 보세요",
            "Add collaborators to this repository": "이 저장소에 협업자를 추가해 보세요",
                "Search for people using their GitHub username or email address.": "GitHub 사용자 이름이나 이메일 주소로 사람들을 검색해 보세요.",
                "Invite collaborators": "협업자를 초대해 보세요",
            "Quick setup": "빠른 설정",
            "— if you’ve done this kind of thing before": "- 이전에 이런 작업을 해보셨다면",
            "Set up in Desktop": "GitHub Desktop에서 설정해 보세요",
            "Get started by": "다음으로 시작해 보세요:",
            "creating a new file": "새 파일을 생성해 보세요",
            "uploading an existing file": "기존 파일을 업로드해 보세요",
            ". We recommend every repository include a": ". 저장소마다 다음을 포함하는 것을 권장해요:",
            ", and": ", 그리고",
            "…or create a new repository on the command line": "…또는 명령줄에서 새로운 저장소를 생성해 보세요",
            "…or push an existing repository from the command line": "…또는 명령줄에서 기존 저장소를 푸시해 보세요",
            "…or import code from another repository": "…또는 다른 저장소에서 코드를 가져와 보세요",
            "You can initialize this repository with code from a Subversion, Mercurial, or TFS project.": "Subversion, Mercurial, 또는 TFS 프로젝트의 코드를 사용하여 이 저장소를 초기화할 수 있어요.",
            "Import code": "코드를 가져와 보세요",
            "ProTip!": "전문가 팁!",
                "Use the URL for this page when adding GitHub as a remote.": "GitHub을 원격 저장소로 추가할 때 이 페이지의 URL을 사용해 보세요.",


        // 文件管理器 /<user-name>/<repo-name>/tree/<branch>/<文件夹路径>/
          // /<user-name>/<repo-name>/?search=1
          // /<user-name>/<repo-name>/tree/?search=1
            // 文件树侧边栏
            "Expand file tree": "파일 트리를 펼치기",
            "Collapse file tree": "파일 트리를 접기",
            // 검색창
            "Go to file": "파일로 이동",
                "No matches found": "일치하는 항목이 없어요",
                "Go to folder": "폴더로 이동하기",
                "See all results": "모든 결과 확인하기",
          
            "Add file": "파일 추가하기",
                // 파일 추가 드롭다운 메뉴
                "Create new file": "새 파일 만들기",
                "Upload files": "파일 업로드하기",
          
            // 새 세 개의 점
            "Copy path": "경로 복사하기",
            "Copy permalink": "영구 링크 복사하기",
            "Delete directory": "폴더 삭제하기",
            "View options": "옵션을 확인하기",
                "Center content": "내용을 중앙에 배치하기",
          
            "Copied path!": "✅ 경로를 복사했어요!",
          
            "History": "역사",
          
            "Top": "맨 위",
            "Jump to file": "파일로 바로 가기",
          
            "Name": "이름",
            "Last commit message": "마지막 커밋 메시지",
            "Last commit date": "마지막 커밋 시간",
          
            // 편집 버튼
            "Edit README": "README 편집하기", // md 파일
          
            // 파일 관리자 - 이슈 템플릿 /<user-name>/<repo-name>/tree/<분기>/.github/ISSUE_TEMPLATE
            "Customize the issue creation experience with a": "이슈 생성 경험을 사용자 정의하려면 다음 파일을 사용해보세요:",
            "file.": "파일.",
            "Learn more about configuring a template chooser.": "템플릿 선택기 구성에 대해 자세히 알아보세요."
        },
        "regexp": [ // 정규식 번역
            // 개인 저장소에서 기여 및 동기화 포크 작업 후의 정보 알림
            [/Successfully fetched and fast-forwarded from upstream ([^ ]+)\./, "상위 저장소 $1 에서 성공적으로 가져와 패스트 포워드 병합을 했어요."],
            [/Successfully discarded changes and synchronized branch to match upstream ([^ ]+)\./, "변경 사항을 성공적으로 버리고, 상위 저장소 $1 에 맞춰 분기를 동기화했어요."],
            ...I18N["ko-KR"]["repository-public"]["regexp"],
            [/commits by (.+)/, "$1 님이 커밋했어요."],
            [/Branch ([^ ]+) was renamed to ([^ ]+)./, "분기 $1 의 이름이 $2 로 변경되었어요."],
            [/Your ([^ ]+) branch isn't protected/, "시용자님의 $1 분기는 보호되어 있지 않아요."], // 저장소 메인 페이지: 분기 보호
            [/([\d,]+) Commits?/, "$1 개의 커밋"], // 새 버전 저장소 개요
            [/Create a codespace on (.+)/, "$1 에서 코드스페이스를 생성해 보세요."], // 저장소 메인 페이지: 코드스페이스 생성
            [/Create codespace on (.+)/, "$1 에서 코드스페이스를 생성해 보세요."],
            [/Codespace \"(.+)\" stopped./, "코드스페이스 “$1” 이(가) 중지되었어요."],
            [/Codespace \"(.+)\" deleted./, "코드스페이스 “$1” 이(가) 삭제되었어요."],
            [/Are you sure you want to delete (.+)\?/, "정말로 $1 을(를) 삭제하시겠어요?"],
            [/Sponsor ([^ ]+)?/, "후원 $1"], // 후원 버튼: 대화상자 제목
            [/\+ ([\d,]+) releases?/, "+ $1 개의 릴리즈"], // 저장소 메인 페이지 우측: 릴리즈
            [/\+ ([\d,]+) packages?/, "+ $1 개의 패키지"], // 저장소 메인 페이지 우측: 패키지
            [/\+ ([\d,]+) contributors?/, "+ $1 명의 기여자"], // 저장소 메인 페이지 우측: 기여자
            [/\+ ([\d,]+) environments?/, "+ $1 개의 환경"], // 저장소 메인 페이지 우측: 환경
            [/\+ ([\d,]+) deployments?/, "+ $1 개의 배포"], // 저장소 메인 페이지 우측: 배포
            // 동기화 포크
            [/Update branch to keep this branch up-to-date by syncing (\d+) commits? from the upstream repository./, "상위 저장소에서 $1개의 커밋을 동기화하여, 분기를 최신 상태로 유지하도록 업데이트했어요."],
            [/This branch is not behind the upstream ([^ ]+)/, "이 분기는 상위 저장소 $1 에 뒤처지지 않아요."],
            [/Discard (\d+) commits? to make this branch match the upstream repository. (\d+) commits? will be removed from this branch./, "이 분기를 상위 저장소와 일치시키기 위해 $1개의 커밋을 버리면, 이 분기에서 $2개의 커밋이 제거될 거예요."],
            [/Discard (\d+) commits?/, "커밋 $1개를 버려요."],
            [/Successfully fetched and merged from upstream ([^ ]+)/, "상위 저장소 $1 에서 성공적으로 가져와 병합했어요."],
            // 기여
            [/This branch is not ahead of the upstream ([^ ]+)\./, "이 분기는 상위 저장소 $1 에 앞서 있지 않아요."],
            [/This branch is (\d+) commits? ahead of ([^ ]+)\./, "이 분기는 상위 저장소 $2 보다 $1개의 커밋만큼 앞서 있어요."],
            // 개인 저장소 현재 분기 상태
            [/This branch is up to date with ([^ ]+)\./, "이 분기는 상위 저장소 $1 와 동기화되어 있어요."],
            [/(\d+) commits? ahead/, "앞서 $1개의 커밋"],
            [/(\d+) commits? behind/, "뒤처진 $1개의 커밋"],
            [/(\d+) commits?/, "$1 개의 커밋"], // 새 버전 저장소 개요
            [/Save (.+?) to your computer and use it in GitHub Desktop./, "GitHub Desktop을 사용하여, $1 을(를) 컴퓨터에 저장해 보세요."],
            [/Forking ([^ ]+)/, "포크 진행 중: $1"], // 포크 진행 중...
            [/Fork your own copy of ([^ ]+)/, "자신의 $1 복사본을 포크해 보세요."], // 포크 버튼 안내
            [/will appear on ([^ ]+)'s member profile, visible only to organization members./, "$1 님의 멤버 프로필에 나타나며, 조직 구성원에게만 보일 거예요."],
            [/and ([^ ]+) were installed on this repository/, "그리고 $1 이(가) 이 저장소에 설치되었어요."], // 상단 알림: 장터 앱 (있는 경우)
            [/([^ ]+) and (\d+) other licenses found/, function(all, lic, num){
                var licKey = {'Unknown': '알 수 없음'};
                return licKey[lic] + ' 및 추가로 ' + num + '개의 라이선스';
            }],
            [/First (\d+) files? shown./, "첫 $1 개의 파일이 표시되었어요."],
        ],
    };    
I18N["ko-KR"]["repository/tree"] = I18N["ko-KR"]["repository"];

I18N["ko-KR"]["repository/milestones"] = { // 仓库 - 里程碑页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 里程碑页面 /<user-name>/<repo-name>/milestones
            "Labels": "라벨",
            "Milestones": "마일스톤",

            "You haven’t created any Milestones.": "아직 마일스톤을 생성하지 않았습니다.",
            "Use Milestones to create collections of Issues and Pull Requests for a particular release or project.": "마일스톤을 사용하여 특정 릴리스 또는 프로젝트의 이슈와 끌어오기 요청를 모아보세요.",

            // 组织 仓库 里程碑
            "No Milestones found!": "마일스톤을 찾을 수 없습니다!",
            "If this project had milestones, we’d show you them here. Promise!": "이 프로젝트에 마일스톤이 있다면 여기에 표시됩니다. 약속해요!",

            "Create a Milestone": "마일스톤 생성",

            "Sort": "정렬",
                "Recently updated": "최신순",
                "Furthest due date": "마감일이 가장 늦은 순",
                "Closest due date": "마감일이 가장 빠른 순",
                "Least complete": "완성도가 낮은 순",
                "Most complete": "완성도가 높은 순",
                "Alphabetically": "알파벳 순",
                "Reverse alphabetically": "알파벳 역순",
                "Most issues": "이슈가 가장 많은 순",
                "Least issues": "이슈가 가장 적은 순",

            "No due date": "마감일 없음",
            // [/Due by (.*)/, "截止日期 $1"], // 里程碑截止日期
            "Last updated": "마지막 업데이트",
            "(more)": "（더보기）",
            "Show less": "(간략히)",
            // 完成进度条
            "complete": "완료됨",
            "open": "열림",
            "closed": "닫힘",

        // 新建里程碑页面 /<user-name>/<repo-name>/milestones/new
            "New milestone": "새 마일스톤",
                "Create a new milestone to help organize your issues and pull requests. Learn more about": "새 마일스톤을 생성하여 이슈와 끌어오기 요청를 정리하세요. 자세히 알아보기",
                "milestones and issues": "마일스톤과 이슈",
            "Title": "제목",
            "Due date (optional)": "마감일 (선택사항)",
            "Description": "설명",
            "Create milestone": "마일스톤 생성",

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/([\d,]+) Open/, "$1 打开"],
        [/([\d,]+) Closed/, "$1 已关闭"],
    ],
};

I18N["ko-KR"]["repository/pull_issue_public"] = { // 仓库 - 이슈和拉取请求页面公共部分
    "static": { // 静态翻译
        // pull 与 request 公共词条
            "Filters": "필터",
                // 筛选下拉菜单
                "Filter Issues": "이슈 필터링",
                "Open issues and pull requests": "열린 이슈 및 끌어오기 요청",
                "Your issues": "나의 이슈",
                "Your pull requests": "나의 끌어오기 요청",
                "Everything assigned to you": "나에게 할당된 항목",
                "Everything mentioning you": "나를 언급한 항목",
                "View advanced search syntax": "고급 검색 문법 보기",

            "Search all issues": "모든 이슈 검색하기",
            "Clear current search query, filters, and sorts": "현재 검색어, 필터, 정렬 지우기",

            "Labels": "라벨",
                "No labels": "라벨 없음",
            "Milestones": "마일스톤",
            "New issue": "새 이슈",
            "New": "생성", // 小屏

            // 筛选工作条
            // "Author": "作者",
                "Filter by author": "제작자별 필터",
                "Filter users": "유저 필터링",

            "Label": "라벨",
                "Filter by label": "라벨별 필터",
                "Filter labels": "라벨 필터링",
                "Unlabeled": "라벨되지 않음",
                "to exclude labels": "라벨 제외하기",
                "for logical OR": "논리적 '또는(OR)' 연산",

            // "Projects": "프로젝트",
                "Filter by project": "프로젝트별 필터",
                "Filter projects": "프로젝트 필터링",
                "Repository": "저장소",
                "Organization": "조직",
                "No projects found. Sorry about that.": "프로젝트가 없어요.",

            // "Milestones": "里程碑",
                "Filter by milestone": "마일스톤별 필터",
                "Filter milestones": "마일스톤 필터링",
                "Issues with no milestone": "마일스톤이 없는 이슈",
                "Pull requests with no milestone": "마일스톤이 없는 끌어오기 요청", // pulls
                "Nothing to show": "표시할 내용 없음",

            "Assignee": "담당자",
                "Filter by who’s assigned": "담당자별 필터",
                "Filter assignees": "담당자 필터링",
                "Assigned to nobody": "담당자 없음",
                // [/Awaiting requested review from ([^ ]+)/, "正在等待 $1 审查请求"],
                "Requested changes must be addressed to merge this pull request.": "이 끌어오기 요청를 병합하려면 요청된 변경 사항을 해결해야 합니다.",
                "No one -": "담당자 없음 -",
                    "Assign yourself": "나에게 할당",

            "Relationships": "연관 관계",
                "Parent issue": "상위 이슈",

            "Sort": "정렬",
                "Sort by": "정렬 기준",  
                "Newest": "최신순",  
                "Oldest": "오래된 순",  
                "Most commented": "댓글이 많은 순",  
                "Least commented": "댓글이 적은 순",  
                "Recently updated": "최근 업데이트",  
                "Least recently updated": "오래된 업데이트",  
                "Most reactions": "반응이 많은 순",  
                "Best match": "최적 일치",  

            // 选中模式
                "selected": "선택됨",  
                "Mark as": "다음으로 표시",  
                "Apply labels": "라벨 적용",  
                "Assign": "할당",  
                    "Assign someone": "누군가에게 할당",  
                    "Assign to nobody": "아무에게도 할당하지 않음",  

            // 筛选结果
            "No results matched your search.": "没有与您的搜索匹配的结果。",
            "You could search": "您可以搜索",
            "all of GitHub": "所有 GitHub",
            "or try an": "或者尝试",
            "advanced search": "高级搜索",

            // 状态词
            "was merged": "合并于",
            "was closed": "关闭于",
            "closed this": "关闭了这个",
            "reopened this": "重新打开了这个",
            "Approved": "已批准",
            "Review required": "需要审查", // 拉取请求 页面状态词
                "Review required before merging": "合并前需要审查",
            "outdated": "陈旧的",
            "Pending": "待定",
            "Draft": "草案",
            "deployed": "部署",
                "View deployment": "查看部署",
            "This was referenced": "被引用于",
            "locked as": "锁定为",
                "spam": "垃圾信息",
            "and limited conversation to collaborators": "并限制与协作者对话",

            // 图标浮窗
            "Open issue": "이슈已打开",
            "Closed issue": "이슈已完成",
            "Closed as not planned issue": "이슈已关闭因未计划",
            "Open Pull Request": "拉取请求已打开",
            "Draft Pull Request": "拉取请求草案",
            "Merged Pull Request": "拉取请求已合并",
            "Closed Pull Request": "拉取请求已关闭",

            // [/(\d+) linked pull requests?/, "链接 $1 个拉取请求"],

        // 某个拉取请求和某个이슈 公共词条
            // 顶部提醒
                "You’ve been unsubscribed from this thread.": "您已退订该主题。",

            // 右侧栏
                "Reviewers": "审查者",
                    "No reviews": "无人审查",
                    "Loading suggestions…": "载入推荐…",
                    // [/([^ ]+) left review comments/, "$1 发表了审查意见"],
                    // [/At least (\d+) approving reviews? is required to merge this pull request./, "合并此拉取请求至少需要 $1 次批准审核。"], // 具体的拉取请求 审查者
                    "No reviews—at least 1 approving review is required.": "未经审查—至少需要 1 次批准审查。",
                    "Re-request review": "重新请求审核",
                    "Still in progress?": "仍在进行中吗？",
                    // [/Awaiting requested review from ([^ ]+)/, "等待 $1 的审查请求"]
                    "Learn about draft PRs": "了解拉取请求草案",
                        "Try draft pull requests": "尝试拉取请求草案",
                        "Open an in-progress pull request without asking for formal review or risking an unwanted merge. When you're ready for code review, you can mark your draft pull request as ready for review, which will request reviews from any code owners.": "打开正在进行的拉取请求，无需请求正式审核，也不必冒不必要的合并风险。当您准备好进行代码审核时，您可以将拉取请求草案标记为已准备好审核，这将请求任何代码所有者进行审核。",
                        "Ask admin for access": "向管理员请求权限",
                    "Convert to draft": "设置为草案",
                        // 设置草案对话框
                            "Convert this pull request to draft?": "将此拉取请求转换为草案？", // 拉取请求
                            "People who are already subscribed will not be unsubscribed.": "已订阅的用户将不会被取消订阅。",
                    // 下拉
                    "Request up to 15 reviewers": "最多请求 15 个审查者",
                    // [/([^ ]+) approved these changes/, "$1 批准这些更改"], // 具体的拉取请求 审查者
                    "Request": "请求",
                    // [/Request review from ([^ ]+)/, "请求 $1 审查"], // 具体的拉取请求 审查者
                    "This pull request is waiting on your review.": "此拉取请求正在等待您的审核。",

                "Assignees": "受理人",
                    "No one assigned": "无人受理",
                    "No one—": "无人 - ",
                    "assign yourself": " 受理自己",
                    // 下拉框
                    "Assign up to 10 people to this issue": "最多指定 10 人", // 이슈
                    "Assign up to 10 people to this pull request": "最多指定 10 人", // 拉取请求
                    "Clear assignees": "清除受理人",
                    "Type or choose a user": "输入或选择用户",
                    "Suggestions": "建议",

                // "Labels": "标签",
                    "None yet": "暂无",
                    // 下拉
                    "bug": "BUG",
                        "Something isn't working": "有些东西不工作",
                    "dependencies": "依赖性",
                        "Pull requests that update a dependency file": "更新一个依赖文件的拉取请求",
                    "documentation": "文档",
                        "Improvements or additions to documentation": "文档的改进或补充",
                    "duplicate": "重复",
                        "This issue or pull request already exists": "这个이슈或拉取请求已经存在",
                    "enhancement": "增强",
                        "New feature or request": "新功能或请求",
                    "good first issue": "好的首发이슈",
                        "Good for newcomers": "适合新人",
                    "help wanted": "需要帮助",
                        "Extra attention is needed": "需要特别关注",
                    "invalid": "无效",
                        "This doesn't seem right": "这似乎不对",
                    "question": "问题",
                        "Further information is requested": "要求提供更多信息",
                    "wontfix": "不会修复",
                        "This will not be worked on": "这将不会被处理",

                    "Apply labels to this issue": "应用标签", // 이슈
                    "Apply labels to this pull request": "应用标签", // 拉取请求
                    "Edit labels": "编辑标签",

                    // 拉取请求
                    "dependencies": "依赖关系",
                        "Pull requests that update a dependency file": "更新依赖文件的拉取请求",

                // 项目
                    "Recent": "最近",
                    "User": "用户",
                    "No projects": "无项目",

                "Milestone": "里程碑",
                    "No milestone": "无里程碑",
                    //下拉
                    "Set milestone": "设置里程碑",
                        "Nothing to show": "暂无",

                "Development": "进展",
                    "Successfully merging this pull request may close these issues.": "成功合并此拉取请求可能会关闭这些이슈。",
                    "Successfully merging a pull request may close this issue.": "成功合并一个拉取请求可能会关闭此이슈。",
                    // 下拉
                    "Link an issue from this repository": "关联来自此仓库的이슈",
                    "Filter": "筛选",
                    "No results": "无结果",

                // "Notifications": "通知类型",
                "Customize": "自定义",
                "Subscribe": "订阅",
                // "Unsubscribe": "取消订阅",
                "You’re not receiving notifications from this thread.": "您没有收到来自该话题的通知。",
                "You're not receiving notifications from this thread.": "您没有收到来自该话题的通知。",
                "You're receiving notifications because you're subscribed to this thread.": "您收到通知是因为您订阅了该话题。",
                "You’re receiving notifications because you’re subscribed to this thread.": "您收到通知是因为您订阅了该话题。",
                "You’re receiving notifications because you’re watching this repository.": "您收到通知是因为您正在关注此仓库。",
                "You’re receiving notifications because you authored the thread.": "您收到通知是因为您提出了该话题。",
                "You’re receiving notifications because you were mentioned.": "您收到通知是因为有人 @您。",
                "You’re receiving notifications because you commented.": "您收到通知是因为您发表了评论。",
                "You’re receiving notifications because you are watching pull requests on this repository.": "您收到通知是因为您正在关注此仓库上的拉取请求。",
                "You’re receiving notifications because you are watching issues on this repository.": "您收到通知是因为您正在关注此仓库上的이슈。",
                "You’re receiving notifications because you modified the open/close state.": "您收到通知是因为您修改了打开/关闭状态。",
                "You’re receiving notifications because you were assigned.": "您收到通知是因为您受理了它。",
                "You’re ignoring this repository.": "您忽略了这个仓库。",

                    // 通知设置对话框
                    "Notification settings": "通知设置",
                    "Notifications settings": "通知设置", // 新版이슈页面
                    "Not subscribed": "未订阅",
                        "Only receive notifications from this pull request when you have participated or have been @mentioned.": "只有在您参与或被 @您时才会收到来自此拉取请求的通知。",
                        "Only receive notifications from this issue when you have participated or have been @mentioned.": "只有在您参与或被 @您时才会收到来自此이슈的通知。", // 이슈页面
                    "Subscribed": "订阅",
                        "Receive all notifications from this pull request.": "接收来自此拉取请求的所有通知。",
                        "Receive all notifications from this issue.": "接收来自此이슈的所有通知。",  // 이슈页面
                    "Custom": "自定义",
                        "You will only be notified for events selected from the list below. If you participate or are @mentioned you will be subscribed.": "您只会收到从以下列表中选择的事件的通知。如果您参与或 @s您时，将自动订阅。",
                        "You will only be notified for the events selected from the list below.": "您只会收到从以下列表中选择的事件的通知。",
                        "If you participate or are @mentioned you will be subscribed.": "如果您参与或 @您时，将自动订阅。",
                    // 이슈
                        "Receive a notification when this issue has been closed.": "当이슈被关闭时，收到通知。",
                        "Reopened": "重新打开",
                            "Receive a notification when this issue has been reopened.": "当이슈被重新打开时，收到通知。",
                    // 拉取请求
                        "Receive a notification when this pull request has been merged.": "当拉取请求被合并时，收到通知。",
                        "Receive a notification when this pull request has been closed.": "当拉取请求被关闭时，收到通知。",
                        "Receive a notification when this pull request has been reopened.": "当拉取请求被重新打开时，收到通知。",

                "Lock conversation": "锁定对话",
                    "Lock conversation on this issue": "锁定此이슈的对话",
                    "Lock conversation on this pull request": "锁定此拉取请求的对话",
                    "Other users": "其他用户",
                    "can’t add new comments": "无法添加新评论",
                    "to this issue.": "到该이슈。",
                    "to this pull request.": "到该拉取请求。",
                    "You and other collaborators": "您和其他协作者",
                    "with access": "有权限访问",
                    "to this repository": "该仓库",
                    "can still leave comments": "仍然可以发表评论",
                    "that others can see.": "其他人可以看到。",
                    "You can always unlock this issue again in the future.": "您今后仍可以随时再次解锁此이슈。",
                    "You can always unlock this pull request again in the future.": "您今后仍可以随时再次解锁此拉取请求。",
                    "Reason for locking": "锁定原因",
                    "Choose a reason": "选择原因",
                        "Off-topic": "偏离主题",
                        "Too heated": "争论不休",
                        "Resolved": "已解决",
                        "Spam": "垃圾信息",
                    "Optionally, choose a reason for locking that others can see. Learn more about when it’s appropriate to": "或者，选择其他人可以看到的锁定原因。详细了解何时适合",
                    "lock conversations": "锁定对话",
                    // "Lock conversation on this issue": "锁定对话",
                "Unlock conversation": "解锁对话",
                    "Unlock conversation on this issue": "解锁此이슈的对话",
                    "Unlock conversation on this pull request": "解锁此拉取请求的对话",
                    "Everyone": "任何人",
                    "will be able to comment on this issue once more.": "将能够再次对这个이슈发表评论。",
                    "will be able to comment on this pull request once more.": "将能够再次对这个拉取请求发表评论。",
                    "You can always lock this pull request again in the future.": "您今后仍可以随时再次锁定此拉取请求。",
                    "You can always lock this issue again in the future.": "您今后仍可以随时再次锁定此이슈。",

                // 隐藏评论对话框
                "The reason will be displayed to describe this comment to others.": "将显示原因，以便向其他人描述此评论。",
                "Learn more about hiding comments": "了解更多关于隐藏评论的信息",
                "comment": "评论",
                "Unhide": "取消隐藏",
                "Choose a reason for hiding this comment": "选择隐藏此评论原因",
                "Choose a reason": "选择原因",
                    "Abuse": "滥用",
                    "Spam": "垃圾信息",
                    "Off Topic": "偏离主题",
                    "Outdated": "过时",
                    "Duplicate": "重复",
                    "Resolved": "已解决",

                "This comment has been minimized.": "此评论已最小化。",
                    "Show comment": "显示评论",
                    "Hide comment": "隐藏评论",

            "Remember, contributions to this repository should follow our": "请记住，对该仓库的贡献应遵循我们的",
            "GitHub Community Guidelines": "GitHub 社区准则",
            "Remember, contributions to this repository should follow its": "请记住，对该仓库的贡献应遵循",
            "contributing guidelines": "贡献指南",
            "security policy": "安全政策",
            "code of conduct": "行为准则",
            "contributing guidelines": "贡献准则",

            // 被锁定
                "This conversation has been locked as": "此对话已锁定为",
                    "and limited to collaborators.": "，并限制与协作者对话。",
                "You can't perform this action at this time.": "您此时不能操作。",

            // 底部赞助
                "Show your support for": "通过赞助来表达您对",
                "by sponsoring them.": "的支持。",
                "Sponsor": "후원",

            // 底部提示栏 (未登录)
                "Sign up for free": "免费注册",
                "to subscribe to this conversation on GitHub": "在 GitHub 上订阅这个讨论",
                "to join this conversation on GitHub": "加入 GitHub 上的这个讨论",
                ". Already have an account?": "。已经有账户？",
                "Sign in to comment": "登录后发表评论",

            // 专业提示
                "will show everything without a milestone.": "将显示所有不含里程碑的内容",
                "Updated in the last three days:": "显示最近3天更新：",
                "Notify someone on an issue with a mention, like:": "用提及的方式通知某人某个이슈，例如：",
                "Adding": "添加",
                "will show everything without a label.": "将显示所有无标签内容。",
                "on any issue or pull request to go back to the issue listing page.": "可返回이슈列表页面。",
                "Click a checkbox on the left to edit multiple issues at once.": "单击左侧的复选框可同时编辑多个이슈。",

    },
    "regexp": [ // 正则翻译
        // [/At least (\d+) approving reviews? is required by reviewers with write access./, "具有写入权限的审查者至少需要 $1 次批准审查。"],
        [/(\d+) linked issues?/, "链接 $1 个이슈"],
        [/Assigned to (.*)/, "分配给 $1"],
        [/Edited (\d+) times?/, "编辑 $1 次"],
        [/Open issues created by ([^ ]+)/, "$1 创建이슈"],
        [/issues opened by ([^ ]+)/, "$1 打开이슈"],
        [/Open pull requests created by ([^ ]+)/, "$1 创建拉取请求"],
        [/pull requests opened by ([^ ]+)/, "$1 打开拉取请求"],
        [/(\d+) hidden conversations/, "$1 条隐藏对话"],
    ]
};
I18N["ko-KR"]["repository/issues"] = { // 저장소 - 이슈 페이지
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository/pull_issue_public"]["static"],

        // 저장소 --> 이슈 라벨 탭 /<user-name>/<repo-name>/issues
        // /<user-name>/<repo-name>/labels/<label-name>
            // 환영 메시지
            "Welcome to issues!": "이슈에 오신 것을 환영해요!",
            "Issues are used to track todos, bugs, feature requests, and more. As issues are created, they’ll appear here in a searchable and filterable list. To get started, you should": "이슈는 할일, 버그, 기능 요청 등을 추적하는 데 사용해요. 이슈가 생성되면 이곳에 검색 및 필터 기능이 있는 목록으로 표시돼요. 시작하시려면",
            "create an issue": "이슈 만들기",

            "Label issues and pull requests for new contributors": "신규 기여자를 위한 이슈와 끌어오기 요청에 라벨 달기",
            "Now, GitHub will help potential first-time contributors": "이제 GitHub가 처음 기여하시는 분들을 도와드릴 거예요",
            "discover issues": "이슈 찾아보기",
            "labeled with": "라벨이 붙은",

            "Clear filter": "필터 지우기",
            "Filter authors": "작성자별 필터",
            "Filter by assignees": "담당자별 필터",
                "No assignees": "담당자가 없습니다",
            // 신버전 내용
                // 상단
                    "👋 Want to contribute to": "👋 에 기여하고 싶으신가요:",
                // 정렬 기준
                    "Created on": "생성 날짜",
                    "Comments": "댓글",
                    "Total comments": "총 댓글 수",
                    "Reactions": "반응",
                    "Total reactions": "총 반응 수",
                    "Thumbs up": "좋아요",
                    "Thumbs down": "싫어요",
                    "Rocket": "로켓",
                    "Hooray": "환호",
                    "Eyes": "관심",
                    "Heart": "하트",
                    "Laugh": "웃음",
                    "Confused": "혼란",
                    "Ascending": "오름차순",
                    "Descending": "내림차순",

                "Types": "유형",
                "Issue type": "이슈 유형",
                    "Filter by issue type": "이슈 유형별 필터",
                    "Select issue type": "이슈 유형 선택",
                    "Filter types": "유형별 필터",
                        "No type": "유형 없음",
                            "Issues with no type": "유형 없는 이슈",
                            "No issue type": "이슈 유형 없음",
                // 검색 안내
                "Try adjusting your search filters.": "검색 필터를 조정해 보세요.",

            // [/Want to contribute to ([^ ]+)\?/, "想为 $1 做贡献吗？"],
            "If you have a bug or an idea, read the": "버그나 아이디어가 있으시다면, 먼저 읽어보시고",
            "before opening an issue.": "이슈를 열기 전에요.",
            "If you have a bug or an idea, browse the open issues before opening a new one. You can also take a look at the": "버그나 아이디어가 있으시다면, 새 이슈를 열기 전에 열린 이슈들을 먼저 살펴보시고, 또한",
            "Open Source Guide": "오픈 소스 가이드",
                "Learn about Open Source and how to contribute": "오픈 소스와 기여 방법에 대해 알아보세요.",
            "If you're ready to tackle some open issues,": "열린 이슈들을 해결할 준비가 되셨다면,",
            "we've collected some good first issues for you": "처음 시작하시기 좋은 이슈들을 모아두었어요",
            "we've collected some good first issues for you.": "처음 시작하시기 좋은 이슈들을 모아두었어요.",

            "Dismiss": "무시하기",
                // 무시하기 드롭다운
                "Dismiss for this repository only": "이 저장소에 한해 무시하기",
                "Dismiss for all repositories": "모든 저장소에 대해 무시하기",

            "There aren’t any open issues.": "열린 이슈가 없어요.",

            // 상태 관련 용어
            "Open": "열림",
            "Closed": "닫힘",
            "Merged": "병합됨",
            // "open": "열림",
            // "Opened": "열림",
            "opened": "열린 날짜:",
            // "closed": "닫힘",
            // 신버전
                "Closed as not planned": "계획에 없어서 닫힘",

            // 상위 이슈
            "Parent:": "상위:",
            // 하위 이슈
            "Create sub-issue": "하위 이슈 만들기",
                //"Create sub-issue": "하위 이슈 만들기",
                    // 팝업 창
                        "Create new issue": "새 이슈 만들기",
                            "Select an item": "항목 선택하기",
                                "Select repository": "저장소 선택하기",
                            "Templates and forms": "템플릿 및 양식",
                                // 빈 이슈
                                    "Create a new issue from scratch": "처음부터 새 이슈 만들기",
                "Add existing issue": "기존 이슈 추가하기",
                    "Search issues": "이슈 검색하기",
                        "Group selected": "그룹 선택하기",

                "Blank issue": "빈 이슈",
                    "in": "위치:",
                "Type your description here…": "여기에 설명 입력해 주세요…",
                "Create more sub-issues": "추가 하위 이슈 만들기",

            "Sub-issues": "하위 이슈",
                "Collapse Sub-issues": "하위 이슈 접기",
                "Expand Sub-issues": "하위 이슈 펼치기",

            "You commented on and opened this issue": "이 이슈에 댓글을 남기고 직접 만드셨어요.",
            "You were mentioned on and commented on this issue": "이 이슈에서 사용자님이 언급되었고 댓글을 남기셨어요.",
            "You commented on this issue": "이 이슈에 댓글 남기셨어요.",
            "You opened this issue": "이 이슈를 만드셨어요.",

            // 고정 이슈
            "Pinned issues": "고정 이슈",
            "Drag to reorder": "드래그하여 순서 변경하기",

            "Unpin": "고정 해제",
            "Advanced move...": "고급 이동...",
                "Move selected item": "선택 항목 이동하기",
                    "Item": "항목",
                    "Action": "작업",
                    "Move item before": "이전으로 이동하기:",
                    "Move item after": "다음으로 이동하기:",
                    "Move to position": "지정 위치로 이동하기:",
                    "Move": "이동하기",

            "ProTip!": "전문가 팁!",
                "Find everything you created by searching": "사용자님이 만드신 모든 항목을 검색해 보세요.",
                "Exclude your own issues with": "자신의 이슈를 제외하려면",
                "Mix and match filters to narrow down what you’re looking for.": "필터를 조합하여 원하는 항목을 좁혀보세요.",
                "Exclude everything labeled": "특정 라벨이 붙은 항목을 제외하려면",
                "with": "라벨을 사용해 보세요.",

        // 새 이슈 작성 - 이슈 템플릿 선택 /<user-name>/<repo-name>/issues/new/choose
            "Get started": "시작하기",
            "Don’t see your issue here?": "이곳에 원하는 이슈가 보이지 않으세요?",
            "Open a blank issue.": "빈 이슈 열기",
            "Edit templates": "템플릿 편집하기",
            "Report abuse": "남용 신고하기",

            "View organization templates": "조직 템플릿 보기", // 조직 저장소

        // 새 빈 이슈 작성 /<user-name>/<repo-name>/issues/new
            "Title": "제목",
            "Helpful resources": "도움이 되는 자료",

        // 토론에서 이슈 생성 /<user-name>/<repo-name>/issues/new?created_from_discussion_number=<id>
            "Documentation has changed since you last contributed": "마지막 기여 이후 문서가 변경되었어요",
            ". Take a look before submitting an issue:": "．이슈 제출 전에 한 번 살펴보세요:",
            "Contributing guidelines": "기여 가이드라인",
            "Last updated": "마지막 업데이트",

        // 특정 이슈 상세 페이지 /<user-name>/<repo-name>/issues/<id> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            // 단축키
                "Convert issue to discussion…": "이슈를 토론으로 전환하기…",

            "This issue was moved to a discussion.": "이 이슈는 토론으로 이동되었어요.",
            "You can continue the conversation there.": "해당 토론에서 대화를 이어가실 수 있어요.",
            "Go to discussion →": "토론으로 이동하기 →",

            "Edit": "편집하기",

            // 상태 관련 용어 (/<user-name>/<repo-name>/pull/<id>와 동일)
            "changed the title": "제목을 변경했어요",
            "opened this issue": "이 이슈를 열었어요",
            "· Fixed by": "· 수정함:",
            "mentioned this issue": "이 이슈를 언급했어요",
            "mentioned this": "이 항목을 언급했어요",
            "opened this": "이 항목을 열었어요",
            "linked a pull request": "끌어오기 요청을 연결했어요",
            "that will": "해서",
            "close": "닫기",
            "this issue": "이 이슈",
            // "that will close this issue": "이 이슈를 닫게 돼요",
            // "Issue": "이슈",
            "added a commit that closed this issue": "이 이슈를 닫는 커밋을 추가했어요",
            "closed this in": "다음에서 닫힘:",
            "added the": "추가함:",
            "added": "추가함",
            "and removed": "및 제거함",
            "removed the": "제거함:",
            "removed": "제거함",
            "label": "라벨",
            "labels": "라벨들",
            "self-assigned this": "스스로 담당자로 지정했어요",
            // "edited": "편집함",
            "added this to the": "다음에 추가함:",
            "added this to": "추가함:",
            "milestone": "마일스톤",
            "closed this": "이 항목을 닫았어요",
            "as": "로서",
            "closed this as": "다음 이유로 닫았어요:",
                "not planned": "계획에 없음",
                "completed": "완료됨",
            "reopened this": "이 항목을 다시 열었어요",
            "This was referenced": "참조되었습니다",
            "deleted a comment from": "댓글을 삭제함, 작성자:",
            "· May be fixed by": " · 다음으로 수정 가능:",
            "pinned this issue": "이 이슈를 고정했어요",
            "unpinned this issue": "이 이슈의 고정을 해제했어요",
            "Repository owner locked and limited conversation to collaborators": "저장소 소유자가 대화를 협업자로 제한하고 잠갔어요",
            "Repository owner locked as": "저장소 소유자가 다음과 같이 잠갔어요:",
            "Repository owner deleted a comment": "저장소 소유자가 댓글을 삭제했어요",
            "Repository owner deleted a comment from": "저장소 소유자가 댓글을 삭제했어요, 작성자:",
            "locked": "잠김",
            "locked as": "다음과 같이 잠김:",
                "off-topic": "주제 벗어남",
                "too heated": "너무 과열됨",
                "resolved": "해결됨",
                "spam": "스팸",
            "and limited conversation to collaborators": "및 협업자와의 대화로 제한했어요",
            "unlocked this conversation": "대화의 잠금을 해제했어요",
            "merged commit": "커밋이 병합되었어요",
            // "into": "에서",
            "deleted the": "삭제했어요",
            "locked and limited conversation to collaborators": "협업자와의 대화만 허용하도록 잠그고 제한했어요",
            "converted this issue into discussion": "이 이슈를 토론으로 전환했어요",
            "converted this issue into a discussion": "이 이슈를 토론으로 전환했어요",
            "removed their assignment": "담당자 지정이 취소되었어요",
            "assigned": "담당자로 지정했어요",
            "unassigned": "담당자 지정이 취소됐어요",
            "and unassigned": "및 담당자 지정 취소",
            "marked this pull request as draft": "이 끌어오기 요청을 초안으로 표시했어요",
            "marked this pull request as ready for review": "이 끌어오기 요청을 검토 가능 상태로 표시했어요",
            "dismissed a stale review via": "오래된 리뷰를 무시했어요, 방법:",
            "requested changes": "변경을 요청했어요",
            "added a commit that referenced this issue": "이 이슈를 참조하는 커밋을 추가했어요",
            "referenced this issue": "이 이슈를 참조했어요",
            "closed this as completed": "완료됨으로 이 항목을 닫았어요",
            "added a parent issue": "상위 이슈를 추가했어요",
            "added a commit that references this issue": "이 이슈를 참조하는 커밋을 추가했어요",
            "transferred this issue from": "이 이슈를 다음 위치에서 이동했어요:",
            "as off topic": "주제 벗어남으로",
            "as too heated": "과열됨으로",
            "added a sub-issue": "하위 이슈를 추가했어요",

            // 오른쪽 사이드바 보충
                // "Development": "진행 상황",
                    "No branches or pull requests": "분기나 끌어오기 요청이 없어요",
                    "Shows branches and pull requests linked to this issue.": "이 이슈와 연결된 분기와 끌어오기 요청을 보여드려요.",
                    "Create a branch": "분기 만들기",
                    "for this issue or link a pull request.": "이 이슈를 위해 또는 끌어오기 요청과 연결하려면요.",
                    "When branches are created from issues, their pull requests are automatically linked.": "이슈에서 분기를 만들면, 끌어오기 요청이 자동으로 연결돼요.",
                    "Open in Workspace": "작업공간에서 열기",

                    // 관계
                        "Add parent": "상위 이슈 추가",
                        "Select a repository": "저장소 선택하기",

                    // 참여자가 2명 이상일 때
                        "and others": "등",

                    // 드롭다운
                    "Link a pull request from this repository": "이 저장소의 끌어오기 요청 연결하기",

                    // 첫 이슈 열기 안내
                    "It looks like this is your first time opening an issue in this project!": "이 프로젝트에서 처음 이슈를 여시는 것 같아요!",
                    "Be sure to review the": "반드시 다음을 검토해 보세요:",

                    // 이슈 양식 관련
                    "You're using an": "사용자님께서는",
                    "issue form": "이슈 양식을",
                    ", a new type of issue template.": " 사용하고 계세요, 새로운 형태의 이슈 템플릿이에요.",

                    // 분기 만들기 대화 상자
                        "Create a branch for this issue": "이 이슈를 위한 분기 만들기",
                        "Branch name": "분기 이름",
                        "Repository destination": "저장소 대상",
                            "Search for a repository": "저장소 검색하기",
                        "Change branch source": "분기 소스 변경하기",
                        "What's next?": "다음 단계는 무엇인가요:",
                            "Checkout locally": "로컬에서 체크아웃하기",
                            "Open branch with GitHub Desktop": "GitHub Desktop으로 분기 열기",
                        "Create branch": "분기 만들기",

                    // 로컬 저장소에서 체크아웃 대화 상자
                        "Checkout in your local repository": "로컬 저장소에서 체크아웃하기",
                        "Run the following commands in your local clone.": "로컬 클론에서 다음 명령어들을 실행해 보세요.",

                    //
                        "Link a branch or pull request": "분기 또는 끌어오기 요청 연결하기",
                        "Select a repository to search for branches and pull requests or": "분기 및 끌어오기 요청을 검색할 저장소를 선택하시거나",
                        "create a branch": "분기 만들기",
                        "Search for repositories": "저장소 검색하기",
                        "Link a branch, pull request, or": "분기, 끌어오기 요청 또는",
                        "Search for branches or pull requests": "분기 또는 끌어오기 요청 검색하기",

                "Pin issue": "이슈 고정하기",
                    "Up to 3 issues can be pinned and they will appear publicly at the top of the issues page": "최대 3개의 이슈를 고정할 수 있으며, 고정된 이슈는 이슈 페이지 상단에 공개로 표시돼요.",
                    "Up to 3 issues can be pinned to the top of the issues page": "최대 3개의 이슈를 이슈 페이지 상단에 고정할 수 있어요.",
                    "This will unpin this issue from the top of the issues page": "이 작업을 통해 이슈 페이지 상단에서 이 이슈의 고정이 해제돼요.",
                    // 상단 알림
                    "The issue has been pinned.": "이 이슈가 고정되었어요.",
                "Unpin issue": "이슈 고정 해제",
                    "Up to 3 issues can be pinned and they will appear at the top of the issues page": "최대 3개의 이슈를 고정할 수 있으며, 고정된 이슈는 이슈 페이지 상단에 표시돼요.",
                    // 상단 알림
                    "The issue has been unpinned.": "이 이슈의 고정이 해제되었어요.",
                "Transfer issue": "이슈 이동하기",
                    // 이슈 이동 대화 상자
                        "Transfer this issue": "이 이슈 이동하기",
                            "Repository projects assigned to this issue will not transfer to the new location": "이 이슈에 할당된 저장소 프로젝트는 새 위치로 이동되지 않아요.",
                        "Choose a repository": "저장소 선택하기",
                        "Find a repository": "저장소 검색하기",
                        "Warning!": "경고!",
                            "Transferring an issue does not scrub any issue content. Content such as text references to other issues, pull requests, projects, teams will remain in this issue's descriptions and comments.": "이슈를 이동해도 이슈의 내용은 삭제되지 않아요. 다른 이슈, 끌어오기 요청, 프로젝트, 팀에 대한 텍스트 참조 등은 그대로 남아 있어요.",
                            "Assignees, labels and milestones will be transferred if they are present in the target repository.": "대상 저장소에 존재한다면, 담당자, 라벨, 마일스톤도 함께 이동돼요.",
                "Convert to discussion": "토론으로 전환하기",
                    // 이슈를 토론으로 전환 대화 상자
                    "Convert issue to a discussion": "이슈를 토론으로 전환하기",
                        "Are you sure you want to convert this issue to a discussion?": "이 이슈를 토론으로 전환할까요?",
                        "What happens when an issue is converted into a discussion:": "이슈가 토론으로 전환되면 다음과 같이 돼요:",
                        "Issue will be closed and locked": "이슈가 닫히고 잠기게 돼요",
                        "Title, description, and author will be the same as the issue": "제목, 설명, 작성자는 이슈와 동일해요",
                        "All comments and reactions will be the same as the issue": "모든 댓글과 반응도 이슈와 동일해요",
                        "Category for new discussion": "새 토론의 카테고리",
                            "Announcements": "공지사항",
                            "General": "일반",
                            "Ideas": "아이디어",
                            "Polls": "투표",
                            "Q&A": "질의응답",
                            "Show and tell": "소개 및 설명",
                        "I understand, convert issue to discussion": "알겠어요, 이 이슈를 토론으로 전환할게요.",
                        "I understand, convert issues to discussions": "알겠어요, 이 이슈들을 토론으로 전환할게요.",
                        "Future issues with this label will not be automatically converted into discussions.": "앞으로 이 라벨이 붙은 이슈는 자동으로 토론으로 전환되지 않아요.",

        // 이슈 템플릿 추가/편집 /<user-name>/<repo-name>/issues/templates/edit
            "Propose changes": "변경 제안하기",
            "Add template:": "템플릿 추가하기:",
            "select": "선택",
            "Bug report": "오류 보고",
                "Standard bug report template": "표준 오류 보고 템플릿",
                "Create a report to help us improve": "개선을 위한 보고서를 작성해 보세요.",
            "Feature request": "기능 제안",
                "Standard feature request template": "표준 기능 제안 템플릿",
                "Suggest an idea for this project": "이 프로젝트에 대한 아이디어를 제안해 보세요.",
            "Custom template": "사용자 정의 템플릿",
                "Blank template for other issue types": "기타 이슈 유형을 위한 빈 템플릿",
                "Custom issue template": "사용자 정의 이슈 템플릿",
                "Describe this issue template's purpose here.": "이 이슈 템플릿의 용도를 여기에 설명해 주세요.",

            "Preview and edit": "미리보기 및 편집하기",
            "Close preview": "미리보기 닫기",

            "Template name": "템플릿 이름",
            "This file lives in": "이 파일의 위치:",
            "Template content": "템플릿 내용",
            "Optional additional items": "선택적 추가 항목",
            "Issue default title": "이슈 기본 제목",
            "This will be suggested as the issue title": "이슈 제목으로 제안될 거예요",
            
    },
    "regexp": [ // 정규식 번역
        [/Want to contribute to ([^ ]+)\?/, "想为 $1 做贡献吗？"],
        [/Awaiting requested review from ([^ ]+)/, "正在等待 $1 审查请求"],
        [/([\d,]+) Open/, "$1 열림"],
        [/([\d,]+) Closed/, "$1 닫힘"],
        [/(#\d+) opened/, "$1 열린 날짜:"],
        [/(#\d+) by/, "$1 작성자:"],
        [/(\d+) linked pull requests?/, "연결된 끌어오기 요청 $1개"],
        [/([\d,]+) linked issues?/, "$1 개 연관 이슈"],
        [/(\d+) tasks? done/, "$1 개 작업 완료"],
        [/(\d+) of (\d+) tasks?/, "$1 / $2 개 작업"],
        [/(\d+) tasks?/, "$1 개 작업"],
        [/First time contributing to ([^ ]+)\?/, "처음으로 $1에 기여하실래요?"],
        
        // 특정 이슈
        [/· ([\d,]+) comments?/, "• $1 개 댓글"],
        [/([\d,]+) participants?/, "$1 명 참여자"],
        [/(\d+) similar comments?/, "$1 개 유사 댓글"],
        [/(\d+) hidden items?/, "$1 개 숨김 항목"],
        [/added a commit to ([^ ]+) that referenced this issue/, "$1 에 이 이슈를 참조하는 커밋 추가됨"],
        [/Only people who can see ([^ ]+) will see this reference./, "$1 를 볼 수 있는 사람만 이 참조를 볼 수 있어요."],
        [/Sponsor ([^ ]+)?/, "후원 $1"],
        [/Notify someone on an issue with a mention, like: @([^ ]+)./, "이슈에서 누군가에게 멘션하여 알리기, 예: @$1."],
        [/Edited (\d+) times?/, "$1 번 수정됨"],
        [/edited by ([^ ]+)/, "$1 에 의해 수정됨"],
        [/This issue will close when (#?\d+) is merged/, "이 이슈는 $1 가 병합되면 닫혀요"],
        [/Opened this issue \(their first in ([^ ]+)\)/, "처음으로 $1 에서 이 이슈를 열었어요"],
        
        // 라벨 페이지
        [/open issues? and pull requests?/, "개 열린 이슈와 끌어오기 요청"],
        [/open issues? or pull requests?/, "개 열린 이슈 또는 끌어오기 요청"],
        [/Are you sure you want to convert (\d+) issues? with the following label to (?:a |)discussions?\?/, "다음 라벨이 붙은 $1 개 이슈를 토론으로 전환할까요?"],
        
        // 하위 이슈
        [/Create new sub-issue in ([^ ]+)/, "$1 에서 새 하위 이슈 만들기"],
        [/(\d+) of (\d+)/, "$1 / $2"],
        
        // 신버전 이슈
        [/(.+) will be between (.+) and (.+)./, "“$1” 은(는) “$2” 와(과) “$3” 사이에 위치해요."],
        [/(.+) will not be moved./, "“$1” 은(는) 이동되지 않아요."],
        [/(.+) will be first item in the list./, "“$1” 은(는) 목록의 첫 번째 항목이에요."],
        [/(.+) will be last item in the list./, "“$1” 은(는) 목록의 마지막 항목이에요."],
        [/of (\d+) selected/, "/ $1 개 선택됨"],
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        ...I18N["ko-KR"]["repository/pull_issue_public"]["regexp"],
    ],
};

I18N["ko-KR"]["repository/labels"] = I18N["ko-KR"]["repository/issues"];

I18N["ko-KR"]["repository/pulls"] = { // 저장소 - 끌어오기 요청 페이지 // 검토 필요
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository/pull_issue_public"]["static"],

        // 저장소 --> 끌어오기 요청 탭 /<user-name>/<repo-name>/pulls
            // 환영 메시지
            "Welcome to pull requests!": "끌어오기 요청 사용해보세요!",
            "Pull requests help you collaborate on code with other people. As pull requests are created, they’ll appear here in a searchable and filterable list. To get started, you should": "끌어오기 요청은 다른 사람들과 코드 협업을 도와드려요. 끌어오기 요청을 생성하면, 검색 및 필터링이 가능한 목록에 표시돼요. 시작하시려면",
            "create a pull request": "끌어오기 요청 발행하기",

            // [/First time contributing to ([^ ]+)?/, "首次为 $1 做贡献？"], // /pulls
            "If you know how to fix an": "어떤",
            "issue": "이슈",
            ", consider opening a pull request for it.": "를 어떻게 고칠 수 있는지 아신다면, 해당 이슈에 대해 끌어오기 요청을 열어보세요.",
            "You can read this repository’s": "이 저장소의",
            "to learn how to open a good pull request.": "를 읽어보시면 좋은 끌어오기 요청을 여는 방법을 배우실 수 있어요.",
            "If you would like to submit code to this repository, consider opening a pull request.": "이 저장소에 코드를 제출하고 싶으시다면, 끌어오기 요청을 열어보세요.",
            "If you would like to submit code to this repository, consider opening a pull request. You can read this repository’s": "이 저장소에 코드를 제출하고 싶으시다면, 끌어오기 요청을 열어보세요. 이 저장소의",
            
            "Label issues and pull requests for new contributors": "신규 기여자를 위한 이슈와 끌어오기 요청에 라벨 지정하기",
            "Now, GitHub will help potential first-time contributors": "이제 GitHub가 잠재적인 첫 기여자분들이",
            "discover issues": "이슈를 찾아볼 수 있도록 도와드려요.",
            "labeled with": "다음 라벨로 지정됨:",

            "Dismiss": "무시하기",
                // 무시 드롭다운
                "Dismiss for this repository only": "이 저장소에만 무시하기",
                "Dismiss for all repositories": "모든 저장소에 대해 무시하기",

            "New pull request": "끌어오기 요청 발행하기",

            "Reviews": "검토",
                // 필터링 작업줄
                "Filter by reviews": "검토별로 필터링하기",
                "No reviews": "검토가 없어요.",
                // "Review required": "검토 필요",
                "Approved review": "승인된 검토",
                "Changes requested": "변경 요청됨",
                "Reviewed by you": "사용자님께서 검토하셨음",
                "Not reviewed by you": "사용자님께서 검토하지 않으셨어요",
                "Awaiting review from you": "사용자님의 검토를 기다리고 있어요",
                "Awaiting review from you or your team": "사용자님 또는 팀의 검토를 기다리고 있어요",
                "Awaiting review from you specifically": "특별히 사용자님의 검토를 기다리고 있어요",

                // 필터링 결과
                "There aren’t any open pull requests.": "열린 끌어오기 요청이 없어요.",

            "ProTip!": "전문가 팁!",
                "Find everything you created by searching": "사용자님께서 작성하신 모든 항목은 검색으로 찾으실 수 있어요.",
                "Exclude your own issues with": "자신의 이슈를 제외하려면",
                "Mix and match filters to narrow down what you’re looking for.": "필터들을 조합해서 원하는 항목만 좁혀보세요.",
                "Exclude everything labeled": "모든 라벨된 항목을 제외하려면",
                "with": "라벨:",
                "Follow long discussions with": "긴 토론을 계속 보시려면",
                "on any issue or pull request to go back to the pull request listing page.": "어떤 이슈나 끌어오기 요청에서 해당 페이지로 돌아가세요.",
                "Filter pull requests by the default branch with": "기본 분기로 끌어오기 요청을 필터링하려면:",
                "to see everything that’s not assigned.": "할당되지 않은 모든 요청을 확인해보세요.",
                "Find all pull requests that aren't related to any open issues with": "열린 이슈와 관련되지 않은 모든 끌어오기 요청을 찾으시려면",
                "Add comments to specific lines under": "특정 행에 댓글을 추가하시려면 아래에:",
                
                "You commented on and opened this pull request": "사용자님께서 이 끌어오기 요청을 열고 댓글을 남기셨어요.",
                "You were mentioned on and commented on this pull request": "사용자님께서 언급되시고 이 끌어오기 요청에 댓글을 남기셨어요.",
                "You commented on this pull request": "사용자님께서 이 끌어오기 요청에 댓글을 남기셨어요.",
                "You opened this pull request": "사용자님께서 이 끌어오기 요청을 열었어요.",

                "Suggested change": "제안된 변경 사항",

    },
    "regexp": [
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        ...I18N["ko-KR"]["repository/pull_issue_public"]["regexp"],

        [/(\d+) reviews? requesting changes?/, "$1 개의 변경 요청 검토"],
        [/(\d+) linked issues?/, "$1 개의 이슈 연결됨"],
        [/([\d,]+) Open/, "$1 열림"],
        [/([\d,]+) Closed/, "$1 닫힘"],
        [/(#\d+) opened/, "$1 열림"],
        [/(#\d+) by/, "$1 작성자"],
        [/(\d+) tasks? done/, "$1 개의 작업 완료"],
        [/(\d+) of (\d+) tasks?/, "$1 / $2 개 작업"],
        [/(\d+) tasks?/, "$1 개 작업"],
        [/(\d+) review requesting changes/, "$1 개의 변경 요청 검토"],
        [/First time contributing to ([^ ]+)\?/, "$1 저장소에 처음 기여하시나요?"],
        [/Suggested change/, "제안된 변경 사항"],
        [/Ears burning\? Get\@([^ ]+) mentions with/, "귀가 타오르시나요? @$1 언급을 받아보세요."],
        [/Notify someone on an issue with a mention, like: \@([^ ]+)/, "이슈에서 누군가에게 알림을 보내려면, 예: @$1"],
    ],
};

I18N["ko-KR"]["repository/pull"] = { // 저장소 - 특정 끌어오기 요청 페이지 // 검토 필요
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository/pull_issue_public"]["static"],

        // 특정 끌어오기 요청 페이지 /<user-name>/<repo-name>/pull/<id> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            // 상단 알림
                "The head ref may contain hidden characters:": "헤드 참조에 숨은 문자가 포함되어 있을 수 있어요:",
                "Your review was submitted on a merged pull request.": "사용자님의 검토가 병합된 끌어오기 요청에 제출되었어요.",
                "Marked pull request as ready for review.": "끌어오기 요청을 검토 가능 상태로 표시했어요.",
                "Your review was submitted successfully.": "사용자님의 검토가 성공적으로 제출되었어요.",
                "requested your review on this pull request.": "사용자님의 검토를 요청했어요.",
                // Dependabot이 연 끌어오기 요청
                    "Merging this pull request will resolve": "이 끌어오기 요청을 병합하면 문제가 해결돼요", // 뒤에 경고 숫자 정규식으로 처리됨
                    //"on rollup including a": "，포함하여 1개",
                    "severity alert.": "심각도 경고가 해결돼요.",

            // 단축키
                "Edit pull request title": "끌어오기 요청 제목 수정하기",
                "Edit pull request body": "끌어오기 요청 본문 수정하기",

            // 편집 -> 기준 저장소 선택
            "Choose a base branch": "기준 분기 선택하기",
            "base:": "기준:",
                // 기준 분기 변경 대화 상자
                "Find a branch": "분기 검색하기",
                "Are you sure you want to change the base?": "정말 기준 분기를 변경하시겠어요?",
                "Some commits from the old base branch may be removed from the timeline, and old review comments may become outdated.": "이전 기준 분기의 일부 커밋은 타임라인에서 제거될 수 있으며, 이전 검토 댓글은 구식이 될 수 있어요.",
                "Change base": "기준 분기 변경하기",

            // 코드 드롭다운 메뉴
                "Code 55% faster with AI pair programming.": "AI 페어 프로그래밍으로 코딩 속도를 55% 향상해보세요.",
                    "Start my free trial": "무료 체험 시작하기",
                    "Don't show again": "다시 보이지 않게 하기",

                "Local": "로컬",
                    "Checkout with GitHub CLI": "GitHub CLI로 체크아웃하기",
                    "Work fast with our official CLI.": "공식 CLI로 빠르게 작업해보세요.",
                    "Checkout with GitHub Desktop": "GitHub Desktop으로 체크아웃하기",

                // 코드 공간
                    "This pull request must be reopened to create new codespaces on it.": "새로운 코드 공간을 만들려면 이 끌어오기 요청을 다시 열어야 해요.",
                    "Your workspaces in the cloud": "클라우드에 있는 사용자님의 작업공간",
                    //[/Create a codespace on ([^ ]+)/, "在 $1 上创建代码空间"],
                    "Codespace repository configuration": "코드 공간 저장소 구성",
                        "New with options...": "옵션 포함 새로 만들기...",
                        "Configure dev container": "개발 컨테이너 구성하기",
                        "Set up prebuilds": "사전 빌드 설정하기",
                        "Manage codespaces": "코드 공간 관리하기",
                        "Share a deep link": "깊은 링크 공유하기",
                            "Share codespace configuration": "코드 공간 구성 공유하기",
                            "Choose which settings from this configuration to include when sharing": "공유할 때 포함할 설정들을 선택해주세요.",
                            "Quick start": "빠른 시작",
                            "Automatically create or reuse the most recent matching codespace.": "최신에 일치하는 코드 공간을 자동으로 생성하거나 재사용해요.",
                            "Read more about creating a link.": "링크 생성에 대해 더 읽어보세요.",
                            "Snippets": "코드 스니펫",
                            "Use the following snippets to embed an “Open in Codespaces” button for this configuration in your own page or README.": "다음 스니펫을 사용하여 본인의 페이지 또는 리드미에 '코드 공간에서 열기' 버튼을 삽입해보세요.",
                        "What are codespaces?": "코드 공간이란 무엇인가요?",
                    "No codespaces": "코드 공간이 없어요",
                    "You don't have any codespaces with this repository checked out": "사용자님께서는 이 저장소로 체크아웃된 코드 공간이 없어요",
                    //[/Create codespace on ([^ ]+)/, "在 $1 上创建代码空间"],
                    "Learn more about codespaces...": "코드 공간에 대해 더 알아보세요...",

                    "On current branch": "현재 분기에서",
                        "No codespaces on current branch": "현재 분기에 코드 공간이 없어요",
                    "On other branches": "다른 분기에서",
                    "miniature adventure": "미니어처 어드벤처",
                    "Open miniature adventure in web": "웹에서 미니어처 어드벤처 열기",
                    "Active": "활성화됨",
                        "Open in ...": "열기:",
                            "Open in browser": "브라우저에서 열기",
                            "Open in Visual Studio Code": "Visual Studio Code에서 열기",
                            "Open in JetBrains Gateway": "JetBrains Gateway에서 열기",
                            "Open in JupyterLab": "JupyterLab에서 열기",
                        "Rename": "이름 변경하기",
                            "Change codespace display name to...": "코드 공간 표시 이름을 변경해보세요...",
                        "Export changes to a branch": "변경 사항을 분기로 내보내기",
                            "This will create a new branch with any unpushed changes": "푸시되지 않은 변경 사항이 있는 새로운 분기가 생성될 거예요.",
                            "Create branch": "분기 생성하기",
                        "Change machine type": "머신 타입 변경하기",
                            "Change codespace machine type": "코드 공간 머신 타입 변경하기",
                            "Machine type": "머신 타입",
                                "2-core": "2코어",
                                "4-core": "4코어",
                            "Need even more power?": "더 강력한 성능이 필요하신가요?",
                            "Contact our team": "저희 팀에 문의해보세요.",
                            "to enable 32-core or GPU machines.": "32코어 또는 GPU 머신 사용을 위해.",
                            "Update codespace": "코드 공간 업데이트하기",
                        "Stop codespace": "코드 공간 중지하기",
                    "Codespace configuration": "코드 공간 설정",
                    "No changes": "변경 사항 없음",

                    "Codespace usage for this repository is paid for by": "이 저장소의 코드 공간 사용료는 다음에서 결제돼요",

                    // [/Codespace \"(.+)\" stopped./, "代码空间 “$1” 已停止。"],
                    // [/Codespace \"(.+)\" deleted./, "代码空间 “$1” 已删除。"],
                    // [/Are you sure you want to delete (.+)\?/, "您确定要删除 $1 吗？"],
                    
            // 자동 보안 취약점 수정 알림
                "This automated pull request fixes a": "이 자동 끌어오기 요청이",
                "security vulnerability": "보안 취약점을 수정해요.",
                "Only users with access to Dependabot alerts can see this message.": "Dependabot 경고 접근 권한이 있는 사용자님만 이 메시지를 보실 수 있어요.",
                "Learn more about Dependabot security updates": "Dependabot 보안 업데이트에 대해 더 알아보세요.",
                "opt out": "옵트아웃하기",
            // 상단 알림
                "Opted out of Dependabot security updates.": "Dependabot 보안 업데이트에서 옵트아웃하셨어요.",

            // Dependabot 경고 끌어오기 요청 알림
                "Merging this pull request will resolve a": "이 끌어오기 요청을 병합하면",
                "high": "높은",
                "severity": "심각도의",
                "Dependabot alert": "Dependabot 경고가 해결돼요.",
                "on": "：",
                // 최초 팝업
                    "Your first automated security update": "사용자님의 첫 자동 보안 업데이트",
                        "Dependabot security updates keep your projects secure and up-to-date.": "Dependabot 보안 업데이트는 사용자님의 프로젝트를 안전하고 최신 상태로 유지해드려요.",
                        "You can opt out at any time in": "원하실 때 언제든 옵트아웃하실 수 있어요, 해당 저장소의",
                        "this repository’s settings": "설정에서",
                        "Got it!": "알겠어요!",

                // 병합 후 상단 알림
                    // [/This pull request resolved a Dependabot alert on ([^ ]+)./, "该请求解决了 $1 的 Dependabot 警报问题。"],

            // 상태 단어
            // [/merged (\d+) commits? into/, "将 4 个提交合并到"],
            "into": "에",
            // "merged": "병합됨",
            "wants to merge": "병합하기를 원해요",
            "commit into": "개의 커밋을",
            "commits into": "개의 커밋을",
            "from": "에서",
            "closed this": "이 요청을 닫았어요",
            "reopened this": "이 요청을 다시 열었어요",
            "added a commit that referenced this pull request": "이 끌어오기 요청을 참조하는 커밋을 추가했어요",
            "removed the request for review from": "검토 요청을 삭제했어요",
            "pushed a commit that referenced this pull request": "이 끌어오기 요청을 참조하는 커밋을 푸시했어요",
            "suggested changes": "변경을 제안했어요",

            // 숨김
            "Load more…": "더 불러오기…",

            // 탭
            "Conversation": "대화",
            // 커밋
                "No new commits": "새로운 커밋이 없어요", // 아래 문장은 정규식 처리
                "was force-pushed and no longer has any new commits. Pushing new commits will allow the pull request to be re-opened.": "강제 푸시되어 더 이상 새로운 커밋이 없어요. 새로운 커밋을 푸시하면 끌어오기 요청을 다시 열 수 있어요.",
            "Checks": "검사",
                "Search logs": "로그 검색하기",
                "Pushing new commits will allow the pull request to be re-opened.": "새로운 커밋을 푸시하면 끌어오기 요청을 다시 열 수 있어요.", // 위 문장은 정규식 처리
            "Files changed": "변경된 파일",
                "No changes to show.": "표시할 변경 사항이 없어요.", // 포크된 저장소에서 커밋 삭제 시 나타남
                "This commit has no content.": "이 커밋에는 내용이 없어요.", // 동일
              "authored": "작성됨",

            // 오른쪽 사이드바 보충
                "Allow edits by maintainers": "유지 관리자 편집 허용하기",
                    "Allowing edits by maintainers": "유지 관리자 편집을 허용 중이에요",
                    "If checked, users with write access to": "선택 시, 쓰기 권한이 있는 사용자님께서",
                    "can add new commits to": "새로운 커밋을 추가할 수 있어요, 대상은",
                    "branch.": "분기이에요.",
                    "You can always change this setting later.": "이 설정은 나중에 언제든 변경할 수 있어요.",
                    "Note: By granting write access, maintainers could potentially edit your repository's workflows to reveal values of secrets and gain access to other branches.": "참고: 쓰기 권한 부여 시, 유지 관리자는 저장소의 워크플로를 수정하여 비밀 값이 노출되거나 다른 분기에 접근할 수 있어요.",
                    "Got it": "알겠어요",
                    "If checked,": "만약 선택된다면,",
                    // [/users with write access to ([^ ]+) can add new commits/, "对 $1 具有写权限的用户可以添加新的提交"], // 특정 끌어오기 요청
                    "to your": "사용자님의",
                    "branch. You can always change this setting later.": "분기이에요. 이 설정은 언제든 변경할 수 있어요.",
                "Allow edits and access to secrets by maintainers": "유지 관리자에게 편집 및 비밀 접근 허용하기",
                    "Maintainers could potentially edit this repository's workflows to reveal values of secrets and gain access to other branches.": "유지 관리자는 이 저장소의 워크플로를 수정하여 비밀 값을 노출하거나 다른 분기에 접근할 수 있어요.",

                "Maintainers are allowed to edit this pull request.": "유지 관리자는 이 끌어오기 요청을 편집할 수 있어요.",

            // 대화 탭 메인
            "Refresh": "새로고침",

            "marked this pull request as draft": "이 끌어오기 요청을 초안으로 표시했어요",
            "First-time contributor": "첫 기여자",
            // [/This user is a first-time contributor to the ([^ ]+) repository./, "该用户是第一次为 $1 仓库做贡献。"]
            "View changes": "변경 내용 보기",
            "Outdated": "구식이에요",
            "Resolve conversation": "대화를 해결로 변경하기",
                "Resolving conversation…": "대화를 해결 중이에요…",
            "Unresolve conversation": "대화를 미해결로 변경하기",
                "Unresolving conversation…": "대화를 미해결로 변경 중이에요…",
                "marked this conversation as resolved.": "이 대화를 해결됨으로 표시했어요.",
            "Changes requested": "변경 요청됨",
            "Change requested": "변경 요청됨",
            "Show resolved": "해결된 대화 보기",
            "Hide resolved": "해결된 대화 숨기기",
            "Reviews": "검토",
            "Show all reviewers": "모든 검토자 보기",
            "Hide all reviewers": "모든 검토자 숨기기",
            "New changes since you last viewed": "마지막으로 보신 이후의 새로운 변경 사항",
            "mentioned this pull request": "이 끌어오기 요청에서 언급되었어요",
            "linked an issue": "이슈가 연결되었어요",
            "that may be": "해당 끌어오기 요청 병합 시",
            "closed": "닫힘",  // 작은 글씨 정규식 처리
            "by this pull request": "에 의해",
            "dismissed": "기각됨",
            "\’s": "의",
            "stale review": "오래된 검토",
            "via": "통해",
            "force-pushed": "강제 푸시됨",
            "enabled auto-merge (squash)": "자동 병합(압축) 활성화됨",
            "the": " ",
            "branch from": "분기에서",
            "and others": "및 기타",
            "previously": "이전에",
            "approved these changes": "이 변경 사항을 승인했어요",
            "previously approved these changes": "이전에 승인했어요",
                "See review": "검토 보기",
                "Dismiss review": "검토 기각하기",
            "started a review": "검토를 시작했어요",
                "View reviewed changes": "검토한 변경 내용 보기",
            "self-requested a review": "자체적으로 검토 요청했어요",
            "self-assigned this": "자기 자신에게 할당했어요",
            "marked this pull request as ready for review": "이 끌어오기 요청을 검토 준비 완료로 표시했어요",
            "merged commit": "병합된 커밋",
            "left a comment": "댓글을 남겼어요",
            "Add more commits by pushing to the": "분기로 푸시하여 더 많은 커밋 추가하기",
            "branch on": "분기에서",
            "requested review from": "검토 요청 보냈어요",
            "This pull request was": "이 끌어오기 요청은",
            "Compare": "비교하기",
            "deleted the": "삭제했어요",
            "branch": "분기",
            "added": "추가됨",
            "requested changes": "변경 요청됨",
            "changed the title": "제목을 변경했어요",
            "changed the base branch from": "기준 분기를 변경했어요 from",
            "added the": "추가함",
            "label": "라벨",
            "closed this": "이 요청을 닫았어요",
            "reopened this": "이 요청을 다시 열었어요",
            "closed this by deleting the head repository": "헤드 저장소 삭제로 인해 이 요청을 닫았어요",
            "Requested changes": "변경 요청됨",

            //
            "This branch has not been deployed": "이 분기는 아직 배포되지 않았어요",
            "No deployments": "배포가 없어요",

            // 끌어오기 요청 상태
            "Review requested": "검토 요청됨",
            "Review has been requested on this pull request. It is not required to merge.": "이 끌어오기 요청에 대해 검토 요청이 되었어요. 병합하기 위해 반드시 필요한 것은 아니에요.",
            "Learn more about requesting a pull request review.": "끌어오기 요청 검토 요청에 대해 더 알아보세요.",
            // [/(\d+) pending reviewers?/, "$1 명의 대기중인 검토자"],
            "was requested for review": "검토 요청을 받았어요",

            // 변경 요청됨
                // [/(\d+) reviews? requesting changes by reviewers with write access./, "$1 개의 검토가 쓰기 권한을 가진 검토자에 의해 변경 요청되었어요。"], // 끌어오기 요청
            "All conversations are resolved": "모든 대화가 해결되었어요",
                // [/(\d+) resolved conversations?/, "2 개의 대화 해결됨"], // 끌어오기 요청
            "No unresolved conversations": "해결되지 않은 대화가 없어요",
                "There aren't yet any conversations on this pull request.": "이 끌어오기 요청에는 아직 대화가 없어요.",
            "View": "보기",

            "This pull request is still a work in progress": "이 끌어오기 요청은 아직 진행 중이에요",
                "Ready for review": "검토 준비 완료",
                "Draft pull requests cannot be merged.": "초안 상태의 끌어오기 요청은 병합할 수 없어요.",
            "This pull request can be automatically merged by project collaborators": "이 끌어오기 요청은 프로젝트 협업자에 의해 자동으로 병합될 수 있어요",
                "Only those with": "오직 이 저장소에",
                "write access": "쓰기 권한이 있는 분들만",
                "to this repository can merge pull requests.": "끊어오기 요청을 병합할 수 있어요.",
                "to this repository can mark a draft pull request as ready for review.": "이 저장소에 쓰기 권한이 있는 분들만 초안 상태의 끌어오기 요청을 검토 준비 완료로 바꿀 수 있어요.",

            // "Review required": "검토 필요", // 끌어오기 요청 페이지 상태 단어
                "Add your review": "검토를 추가해보세요",
                // [/At least (\d+) approving reviews? is required by reviewers with write access./, "쓰기 권한을 가진 검토자들에 의해 최소 $1 번의 승인 검토가 필요해요."],
            "Code owner review required": "코드 소유자 검토가 필요해요",
                "was requested for review as a code owner": "코드 소유자로서 검토 요청 받았어요",
            "Conversation resolution required": "대화 해결이 필요해요",
                "A conversation must be resolved before this pull request can be merged.": "이 끌어오기 요청을 병합하기 전에 대화를 해결해야 해요.",
            "Learn more about pull request reviews.": "끌어오기 요청 검토에 대해 더 알아보세요.",
            "Changes approved": "변경 사항이 승인되었어요",
            "Approval not required": "승인이 필요 없어요",
            "This pull request may be merged without approvals.": "승인 없이도 이 끌어오기 요청을 병합할 수 있어요.",
            // [/(\d+) approving reviews? by reviewers? with write access./, "$1 개의 승인 검토가 쓰기 권한을 가진 검토자에 의해 이루어졌어요."],
            // [/(\d+) approvals?/, "$1 개의 승인"],
            "Some checks haven’t completed yet": "일부 검사들이 아직 완료되지 않았어요",
            // [/1 in progress check/, "$1 개의 진행 중인 검사"],
            "Some checks were not successful": "일부 검사가 성공적이지 않았어요",
            // [/1 skipped, 4 successful, and 2 failing checks/, "$1 건의 건너뜀, $2 건의 성공, 그리고 $3 건의 실패 검사"],
            // [/1 skipped, 4 successful, and 2 expected checks/, "$1 건의 건너뜀, $2 건의 성공, 그리고 $3 건의 예상 검사"],
            "All checks have passed": "모든 검사가 통과되었어요",
            "All checks have failed": "모든 검사가 실패했어요",
            // [/5 successful checks/, ""],
            // [/6 checks passed/, ""],
                "Show all checks": "모든 검사 보기",
                "Hide all checks": "모든 검사 숨기기",
                "Details": "세부사항",
                "Required": "필수",
            "Unresolved conversations": "해결되지 않은 대화",
                // [/(\d+) conversations? must be resolved before merging./, "병합 전에 $1 개의 대화를 해결해야 해요."],
            "No conflicts with base branch": "기준 분기와 충돌이 없어요",
                "Changes can be cleanly merged.": "변경 사항을 깔끔하게 병합할 수 있어요.",
            "Merging is blocked": "병합이 차단되었어요",
                "The base branch requires all conversations on code to be resolved.": "기준 분기에서는 코드에 대한 모든 대화가 해결되어야 해요.",
                "The base branch requires all commits to be signed.": "기준 분기에서는 모든 커밋에 서명이 필요해요.",
                "Learn more about signing commits.": "커밋 서명에 대해 더 알아보세요.",
                "View rules": "규칙 보기",
                // 새 병합 인터페이스
                "Merge is not an allowed merge method in this repository.": "이 저장소에서는 이 병합 방식이 허용되지 않아요.",
                "Pull request cannot be merged because it has a merge conflict.": "병합 충돌이 발생하여 끌어오기 요청을 병합할 수 없어요.",
                "User does not have push access to the repository.": "사용자님께서는 저장소에 푸시할 권한이 없어요.",
                "You're not authorized to push to this branch. Visit https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches for more information.": "이 분기에 푸시할 권한이 없어요. 자세한 정보는 https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches 를 방문해보세요.",
            "Merging can be performed automatically once the requested changes are addressed.": "요청된 변경 사항이 해결되면 자동으로 병합할 수 있어요.",
            "This branch is out-of-date with the base branch": "이 분기는 기준 분기에 비해 오래되었어요",
                "Merge the latest changes from": "최신 변경 사항을 병합하세요:",
                "into this branch.": "이 분기에",
                    "Update branch": "분기 업데이트하기",
                        "Update with merge commit": "병합 커밋으로 업데이트하기",
                            "The latest changes will be merged into this branch with a merge commit.": "최신 변경 사항이 병합 커밋으로 이 분기에 병합될 거예요.",
                        "Update with rebase": "리베이스로 업데이트하기",
                            "This branch cannot be rebased due to conflicts.": "충돌 때문에 이 분기를 리베이스할 수 없어요.",
                            "This pull request will be rebased on top of the latest changes and then force pushed.": "이 끌어오기 요청은 최신 변경 사항 위에 리베이스된 후 강제 푸시될 거예요.",
                            "This branch cannot be rebased due to conflicts": "충돌로 인해 이 분기를 리베이스할 수 없어요.",

            "The base branch restricts merging to authorized users.": "기준 분기는 승인된 사용자님만 병합할 수 있도록 제한하고 있어요.",
            "Learn more about protected branches.": "보호된 분기에 대해 더 알아보세요.",
            // [/Merging can be performed automatically with (\d+) approving review./, "병합은 $1 번의 승인 검토를 통해 자동으로 수행될 수 있어요."],
            "Merge without waiting for requirements to be met (bypass branch protections)": "요구 사항이 충족되지 않아도 병합하기 (분기 보호 우회)",
                "Add an optional extended description…": "선택적 확장 설명 추가하기…",
                // [/This commit will be authored by ([^@]+@[^\n]+)/, "이 커밋은 $1 작성됨"],
                
            // 병합 실패 알림
                "Merge attempt failed": "병합 시도가 실패했어요",
                "We couldn’t merge this pull request. Reload the page before trying again.": "이 끌어오기 요청을 병합하지 못했어요. 페이지를 새로고침한 후 다시 시도해보세요.",

            // [/(\d+) workflow awaiting approval/, "$1 개의 작업 흐름 대기중"],
            "First-time contributors need a maintainer to approve running workflows.": "첫 기여자는 작업 흐름 실행 승인을 유지 관리자가 해주셔야 해요.",
            "The base branch does not accept merge commits. Alternate merge methods are preferred.": "기준 분기는 병합 커밋을 허용하지 않아요. 다른 병합 방법이 선호돼요.",
            // [/The ([^ ]+) branch requires linear history/, "$1 분기는 선형 이력이 필요해요."],
            "Learn more about required linear history.": "필요한 선형 이력에 대해 더 알아보세요.",

            "Checking for ability to merge automatically…": "자동 병합 가능 여부를 확인 중이에요…",
            "Hang in there while we check the branch’s status.": "분기 상태를 확인하는 동안 잠시만 기다려주세요.",

            "Required statuses must pass before merging": "병합 전에 필수 상태가 모두 통과되어야 해요",
            "All required": "모든 필수",
            "statuses": "상태",
            "and check runs on this pull request must run successfully to enable automatic merging.": "와 이 끌어오기 요청의 검사 실행이 모두 성공해야 자동 병합이 가능해요.",

            "Continuous integration has not been set up": "지속적 통합이 설정되지 않았어요",
            "several other apps": "또 다른 여러 앱들이",
            "can be used to automatically catch bugs and enforce style.": "버그를 자동으로 잡고 코딩 스타일을 강제할 수 있어요.",

            "This branch has no conflicts with the base branch": "이 분기는 기준 분기와 충돌이 없어요",
                "Merging can be performed automatically.": "자동으로 병합할 수 있어요.",

            "This branch has no conflicts with the base branch when rebasing": "리베이스 시, 이 분기는 기준 분기와 충돌이 없어요",
                "Rebase and merge can be performed automatically.": "자동으로 리베이스 및 병합할 수 있어요.",

                "You’re not": "사용자님께서는",
                "authorized": "권한이 없어서",
                "to merge this pull request.": "이 끌어오기 요청을 병합할 수 없어요.",

            "Merge pull request": "끌어오기 요청 병합하기",
                "Merging is blocked due to failing merge requirements": "병합 요구 사항 미충족으로 병합이 차단되었어요.",
            // 끌어오기 요청 병합 버튼 드롭다운
                "Create a merge commit": "병합 커밋 생성하기",
                    "All commits from this branch will be added to the base branch via a merge commit.": "이 분기의 모든 커밋은 병합 커밋을 통해 기준 분기에 추가될 거예요.",
                    "Not enabled for this repository": "이 저장소에서 활성화되지 않았어요",
                "Squash and merge": "압축 병합하기",
                    // [/The (\d+) commits? from this branch will be added to the base branch./, "이 분기의 $1 개 커밋이 기준 분기에 추가될 거예요."],
                "Rebase and merge": "리베이스 후 병합하기",
                    // [/The (\d+) commits? from this branch will be rebased and added to the base branch./, "이 분기의 $1 개 커밋이 기준 분기에 리베이스되어 추가될 거예요."],
                    "Failed to load repo merge settings": "저장소 병합 설정을 불러오지 못했어요",

            // 병합 확인 대화 상자
                // 새 병합 인터페이스
                "Commit header": "커밋 제목",
                "Commit message": "커밋 메시지",
                "This commit will be authored by": "이 커밋은 다음에 의해 작성될 거예요:",
            "Confirm merge": "병합 확인하기",
            "Confirm squash and merge": "압축 병합 확인하기",
            "Confirm rebase and merge": "리베이스 병합 확인하기",
            "Merging…": "병합 중이에요…",

            "You can also": "또한 다음 방법도 있으니 참고해보세요:",
            "open this in GitHub Desktop": "GitHub Desktop에서 열기",
            "or view": "또는 보기",
            "You can also merge this with the command line, view": "명령줄을 사용하여 병합할 수도 있어요, 참고로",
            "command line instructions": "명령줄 지침",
            "You can also merge this with the command line.": "명령줄을 사용해서도 병합할 수 있어요.",
            "View command line instructions.": "명령줄 지침 보기.",

            // "Merged": "병합됨",
            "View details": "세부사항 보기",
            "Hide details": "세부사항 숨기기",
            "Revert": "되돌리기",
                "Create a new pull request to revert these changes": "이 변경 사항을 되돌리기 위한 새로운 끌어오기 요청 생성하기",
            "Closed with unmerged commits": "미병합 커밋과 함께 닫힘",
                "This pull request is closed.": "이 끌어오기 요청은 닫혔어요.",

            "Pull request successfully merged and closed": "끌어오기 요청이 성공적으로 병합되고 닫혔어요.",
                "You're all set — the": "이제 모두 준비되었어요 —",
                "branch has been merged and deleted.": "분기가 병합되어 삭제되었어요.",
                "You're all set — the branch has been merged.": "이제 모두 준비되었어요 — 분기가 병합되었어요.",
            "Delete branch": "분기 삭제하기",
            "Restore branch": "분기 복원하기",

            "Pull request closed": "끌어오기 요청 닫힘",
            "This pull request is closed, but the": "이 끌어오기 요청은 닫혔지만,",
            "branch has unmerged commits.": "분기에 미병합 커밋이 있어요.",
            "branch has unmerged commits. You can delete this branch if you wish.": "분기에 미병합 커밋이 있어요. 원하신다면 이 분기를 삭제할 수 있어요.",
            "If you wish, you can also delete this fork of": "원하신다면, 이 포크도 삭제할 수 있어요.",
            "If you wish, you can delete this fork of": "원하신다면, 이 포크를 삭제할 수 있어요.",
            "in the": "에서",
            "Settings": "설정",

            // "Only those with": "오직 이 저장소에",
            // "write access": "쓰기 권한",
            // "to this repository can merge pull requests.": "의 사용자만 끌어오기 요청을 병합할 수 있어요.",
            "You’re all set — the": "이제 모두 준비되었어요 —",
            "You’re all set—the": "이제 모두 준비되었어요 —",
            "branch can be safely deleted.": "분기는 안전하게 삭제할 수 있어요.",
            "This branch has conflicts that must be resolved": "이 분기에는 해결해야 할 충돌이 있어요",
                "Resolve conflicts then push again. These conflicts are too complex to resolve in the web editor. Actions workflows will not trigger on activity from this pull request while it has merge conflicts.": "충돌을 해결하고 다시 푸시해주세요. 이 충돌은 웹 편집기에서 해결하기에 너무 복잡해요. 병합 충돌이 있는 동안에는 작업 흐름이 트리거되지 않아요.",
                "Use the command line": "명령줄을 사용해보세요",
                "to resolve conflicts before continuing.": "충돌 해결 후 계속 진행해보세요.",
                "or the command line to resolve conflicts before continuing. Actions workflows will not trigger on activity from this pull request while it has merge conflicts.": "또는 명령줄을 사용해 충돌을 해결한 후 진행하세요. 끌어오기 요청에 병합 충돌이 있는 동안에는 작업 흐름이 트리거되지 않아요.",
                "or the command line to resolve conflicts before continuing.": "또는 명령줄로 충돌을 해결한 후 계속 진행해보세요.",
                "Use the command line to resolve conflicts before continuing.": "충돌 해결 후 계속 진행하시려면 명령줄을 사용해보세요.",

                "Checkout via command line": "명령줄로 체크아웃하기",
                "Checkout via the command line": "명령줄을 통해 체크아웃하기", // 새 병합 인터페이스
                "If the conflicts on this branch are too complex to resolve in the web editor, you can check it out via command line to resolve the conflicts.": "이 분기의 충돌이 웹 편집기에서 해결하기에 너무 복잡하다면, 명령줄로 체크아웃하여 충돌을 해결할 수 있어요.",
                "If you do not want to use the merge button or an automatic merge cannot be performed, you can perform a manual merge on the command line. However, the following steps are not applicable if the base branch is protected.": "병합 버튼을 사용하고 싶지 않거나 자동 병합이 불가능하다면, 명령줄에서 수동 병합을 수행할 수 있어요. 단, 기준 분기가 보호된 경우 아래 단계는 적용되지 않아요.", // 새 병합 인터페이스
                "Step": "단계", // 새 병합 인터페이스
                "Step 1:": "1단계:",
                    "From your project repository, check out a new branch and test the changes.": "프로젝트 저장소에서 새 분기를 체크아웃하고 변경 사항을 테스트해보세요.",
                    "Clone the repository or update your local repository with the latest changes.": "저장소를 클론하거나 최신 변경 사항으로 로컬 저장소를 업데이트해주세요.",
                "Step 2:": "2단계:",
                    "Merge the changes and update on GitHub.": "변경 사항을 병합하고 GitHub에서 업데이트하세요.",
                    "Switch to the head branch of the pull request.": "끌어오기 요청의 헤드 분기로 전환하세요.",
                "Step 3:": "3단계:",
                    "Merge the base branch into the head branch.": "기준 분기를 헤드 분기에 병합하세요.",
                "Step 4:": "4단계:",
                    "Fix the conflicts and commit the result.": "충돌을 해결하고 결과를 커밋하세요.",
                    "See": "자세한 내용은",
                        "Resolving a merge conflict using the command line": "명령줄로 병합 충돌 해결하기",
                        "for step-by-step instructions on resolving merge conflicts.": "를 참고하세요.",
                "Step 5:": "5단계:",
                    "Push the changes.": "변경 사항을 푸시하세요.",
                // 새 병합 인터페이스 복사 버튼
                    "Copy clone URL": "클론 URL 복사하기",
                    "Copy clone command": "클론 명령어 복사하기",
                    "Copy checkout command": "체크아웃 명령어 복사하기",
                    "Copy merge command": "병합 명령어 복사하기",
                    "Copy push command": "푸시 명령어 복사하기",

            "Resolve conflicts": "충돌 해결하기",
                "Use the": "다음을 사용하여",
                "web editor": "웹 편집기",
                "or the": "또는",
                "command line": "명령줄을",
                "to resolve conflicts.": "충돌을 해결해보세요.",
                "These conflicts are too complex to resolve in the web editor": "이 충돌은 웹 편집기에서 해결하기에 너무 복잡해요",
            "Conflicting files": "충돌 파일:",

            "Require approval from specific reviewers before merging": "병합 전에 특정 검토자의 승인을 요구하기",
                "Branch protection rules": "분기 보호 규칙",
                "Rulesets": "규칙 집합",
                "ensure specific people approve pull requests before they're merged.": "특정 인원이 병합 전에 끌어오기 요청을 승인하도록 보장해요.",
            "Add rule": "규칙 추가하기",
            // [/Ensure specific people or teams approve pull requests before they're merged into your ([^ ]+) branch./, "确保特定的人或团队在拉取请求被合并到您的 $1 分支之前批准它们。"], // 끌어오기 요청
            // [/(\d+) workflows? awaiting approval/, "$1 개의 작업 흐름 대기중"],
            "This workflow requires approval from a maintainer.": "이 작업 흐름은 유지 관리자의 승인이 필요해요.",
            "Learn more about approving workflows.": "작업 흐름 승인에 대해 더 알아보세요.",
            "Approve and run": "승인 후 실행하기",

            // 상태 단어
            "reviewed": "검토됨",
            "requested a review from": "검토 요청 보냈어요",
            "Reply...": "답글 달기...",

            // 코드 검토 답글
            "Suggestions cannot be applied on outdated comments.": "오래된 댓글에는 제안을 적용할 수 없어요.",
            "Suggested change": "제안된 변경 사항",
            "This code change can be committed by users with write permissions.": "이 코드 변경은 쓰기 권한이 있는 사용자님께서 커밋할 수 있어요.",

            "This branch was successfully deployed": "이 분기는 성공적으로 배포되었어요",
            "Show environments": "환경 보기",
            // [/(\d+) active deployments?/, "$1 개의 활성 배포"],
            
            // 댓글 입력 옵션 (PR 화면에 한정됨)
                "Copilot actions": "Copilot 액션",
                   "Generate": "생성하기",
                   "Summary": "요약하기",
                   "Generate a summary of the changes in this pull request.": "이 끌어오기 요청의 변경 내용을 요약해보세요.",
                "Summarizing changes… this might take a minute": "변경 내용을 요약 중이에요… 잠시만 기다려주세요.",

        // 끌어오기 요청 --> 커밋 탭 /<user-name>/<repo-name>/pull/<id>/commits
            // 상단 안내문
                "This pull request is big! We're only showing the most recent 250 commits": "이 끌어오기 요청이 커서! 최신 250개의 커밋만 보여드려요.",
            "Commits": "커밋",
            // [/Commits (.+)/, "커밋 작성일 $1"],
            "committed": "커밋됨",

            "Copy the full SHA": "전체 SHA 복사하기",
            "View commit details": "커밋 세부사항 보기",
            "Browse the repository at this point in the history": "해당 시점의 저장소 기록 보기",

        // 끌어오기 요청 --> 커밋 --> 특정 커밋 상세 /<user-name>/<repo-name>/pull/<id>/commits/<full SHA>
            "commit": "커밋",
            // 변경된 파일 좌측 확장 버튼
            "Expand all": "모두 펼치기",
            "Expand All": "모두 펼치기",
            "Collapse expanded lines": "펼쳐진 줄 접기",
            "Expand Up": "위쪽 펼치기",
            "Expand Down": "아래쪽 펼치기",

            // 변경된 파일 우측 드롭다운
            "Show comments": "댓글 보기",
            "Show annotations": "주석 보기",
            "View file": "파일 보기",
            "Edit file": "파일 수정하기",
            "Delete file": "파일 삭제하기",
            "Open in desktop": "GitHub Desktop에서 열기",
            "Copilot is not available for this file type": "이 파일 유형은 Copilot을 지원하지 않아요",

            // 이전 페이지
            "You are viewing the earliest commit": "가장 초기 커밋을 보고 있어요",
            // 다음 페이지
            "You are viewing the latest commit": "가장 최신 커밋을 보고 있어요",

            "This merge commit was added into this branch cleanly.": "이 병합 커밋이 깔끔하게 이 분기에 추가되었어요.",
                "There are no new changes to show, but you can still": "새로운 변경 사항은 없지만, 여전히",
                "view the diff.": "차이를 보실 수 있어요.",

        // 끌어오기 요청 --> 변경된 파일 탭 /<user-name>/<repo-name>/pull/<id>/files
            // 도구 모음
            "Show file tree": "파일 트리 보기",
            "Hide file tree": "파일 트리 숨기기",
            "Changes from": "변경 출처:",
                "all commits": "모든 커밋",
                // 드롭다운
                "Show all changes": "모든 변경 사항 보기",
                // [/(\d+) commits?/, "$1 개의 커밋"],
                "Show changes since your last review": "마지막 검토 이후 변경 사항 보기",
                // "You haven‘t reviewed this pull requeste": "사용자님께서 이 끌어오기 요청을 검토하지 않으셨어요",
                "You haven’t reviewed this pull request yet": "아직 이 끌어오기 요청을 검토하지 않으셨어요",
                "Select commit": "커밋 선택하기",
                "Hold shift + click to select a range": "Shift키 누른 채 클릭하여 범위 선택하기",
            "File filter": "파일 필터",
                "Filter by extension": "확장자로 필터링하기",
                    "No extension": "확장자 없음",
                    // [/All (\d+) file types? selected/, "모든 $1 종류의 파일 유형 선택됨"],
                    // [/Select all (\d+) file types?/, "모든 $1 종류의 파일 유형 선택하기"],
                    "Only manifest files": "매니페스트 파일만",
                "There are no files selected for viewing": "보기를 위해 선택된 파일이 없어요",
                "Viewed files": "보기 완료 파일",
                // "filter file types": "파일 유형 필터",
                // "filter viewed files": "보기 완료 파일 필터",
                // "hide viewed files": "보기 완료 파일 숨기기",
                // "filter by context": "문맥별 필터",
            "Clear filters": "필터 모두 지우기",
            "Conversations": "대화",
            "Jump to conversation": "대화로 건너뛰기",
                "Give feedback": "피드백 남기기",
                // [/Unresolved conversations/, "해결되지 않은 대화"],
                "Nice work!": "잘하셨어요!",
                "All of your conversations have been resolved.": "모든 대화가 해결되었어요.",
                // [/Resolved conversations/, "해결된 대화"],
                "No conversations yet": "아직 대화가 없어요",
                "Review conversations will show up here.": "검토 대화가 여기에 표시될 거예요.",
            // "Jump to": "건너뛰기",
                "Jump to file": "파일로 건너뛰기",
                "Filter changed files": "변경된 파일 필터하기",
                    "No files found.": "파일을 찾을 수 없어요.",
            // 차이점 보기
                "Diff view": "차이점 보기",
                // "Always": "항상",
                "Unified": "통합 보기",
                "Split": "분할 보기",
                // "Just for now": "현재만",
                // "Hide whitespace changes": "공백 변경 숨기기",
                "Hide whitespace": "공백 숨기기",
                "Apply and reload": "적용 후 다시 불러오기",
            "Show whitespace": "공백 보이기",
            // "Refresh": "새로고침",

            "files viewed": "보기 완료 파일",
                "Marking files as viewed can help keep track of your progress, but will not affect your submitted review": "파일을 본 것으로 표시하면 진행 상황 추적에 도움이 되지만, 제출한 검토에는 영향을 주지 않아요.",
            // Copilot 문의
                "Loading Copilot features…": "Copilot 기능 로딩 중이에요…",
                "Copilot is not available for this pull request": "이 끌어오기 요청에서는 Copilot을 사용할 수 없어요",
            "Review in codespace": "코드 공간에서 검토하기",
            // "Review changes": "변경 사항 검토하기", // Selector 규칙에 따름
                // 드롭다운
                "Finish your review": "검토 마무리하기",
                    "Submit general feedback without explicit approval.": "명시적 승인이 없이 일반 피드백 제출하기.",
                "Approve": "승인하기",
                    "Submit feedback approving these changes.": "이 변경 사항에 대해 피드백과 함께 승인하기.",
                    "Submit feedback and approve merging these changes.": "피드백 제출 후 이 변경 사항 병합 승인하기.",
                    "Pull request authors can’t approve their own pull request.": "끌어오기 요청 작성자는 스스로 승인할 수 없어요.",
                    "Only users with explicit access to this repository may approve pull requests": "이 저장소에 명시적으로 접근 권한이 있는 사용자만 끌어오기 요청을 승인할 수 있어요.",
                "Request changes": "변경 요청하기",
                    "Submit feedback suggesting changes.": "변경 제안을 포함하여 피드백 제출하기.",
                    "Submit feedback that must be addressed before merging.": "병합 전에 해결해야 하는 피드백 제출하기.",
                    "Pull request authors can’t request changes on their own pull request.": "끌어오기 요청 작성자는 스스로 변경 요청할 수 없어요.",
                    "Only users with explicit access to this repository may request changes to pull requests": "이 저장소에 명시적 접근 권한이 있는 사용자만 끌어오기 요청에 대해 변경 요청할 수 있어요.",
                "Abandon review": "검토 포기하기",
                "Submit review": "검토 제출하기",
                    // 상단 알림
                        "You need to leave a comment indicating the requested changes.": "요청된 변경 사항을 명시하는 댓글을 남겨주세요.",
                "Cancel review": "검토 취소하기",
                "pending": "건 대기중",
                "comment": "댓글",
                "comments": "댓글들",

            "Review changes": "변경 사항 검토하기",
                // 잠긴 경우
                "This conversation has been locked and limited to collaborators.": "이 대화는 잠겨 있으며, 협업자에게만 제한되어 있어요.",

            "Viewed": "본 것으로 표시됨",
            "Comment on this file": "이 파일에 댓글 남기기",

            "Load diff": "차이점 불러오기",
            "This file was deleted.": "이 파일은 삭제되었어요.",
            "Large diffs are not rendered by default.": "큰 차이점은 기본적으로 표시되지 않아요.",
            "Some generated files are not rendered by default. Learn more about": "일부 생성된 파일은 기본적으로 표시되지 않아요. 더 알아보시려면",
            "how customized files appear on GitHub": "GitHub에서 사용자화된 파일의 표시 방식에 대해",
            "File renamed without changes.": "파일 이름만 변경되었고, 내용에는 변경이 없어요.",
            "File renamed without changes": "파일 이름만 변경되었고, 내용에는 변경이 없어요.",
            "Binary file not shown.": "이진 파일은 표시되지 않아요.",
            "Display the source diff": "원본 차이점 표시하기",
            "Display the rich diff": "세부 차이점 표시하기",
                "Added": "추가됨",
                "Deleted": "삭제됨",
                "2-up": "2-열",
                "Swipe": "밀기",
                "Onion Skin": "어니언 스킨",

            "These merge commits were added into this branch cleanly.": "이 병합 커밋들이 이 분기에 깔끔하게 추가되었어요.",
                "There are no new changes to show.": "새로운 변경 사항이 없어요.",

            // 변경되지 않은 파일 검사 주석 (GA 검사)
                "Unchanged files with check annotations": "검사 주석이 있는 변경되지 않은 파일",
                    "View workflow job for this annotation": "이 주석의 작업 흐름 작업 보기",

            // 코드 댓글
                "Comment on lines": "라인에 댓글 남기기",
                "Commenting on lines": "라인에 댓글 남기는 중이에요",

            // Copilot 메뉴
                "Ask Copilot about this diff": "이 차이점에 대해 Copilot에게 물어보기",
                    "Copilot is not available for this file type": "이 파일 유형은 Copilot을 지원하지 않아요",
                "Ask Copilot about this file-diff": "이 파일 차이점에 대해 Copilot에게 물어보기",
                "Copilot menu": "Copilot 메뉴",
                    "Explain": "설명하기",
                    "Attach to current thread": "현재 대화에 첨부하기",

                "Select files to discuss": "논의할 파일 선택하기",
                    "Copilot is not available for this file": "이 파일은 Copilot을 지원하지 않아요",

            // 제안된 변경 사항
                "Suggested change": "제안된 변경 사항",
                "Sign off and commit suggestion": "서명하고 제안 커밋하기",
                    "Suggestions cannot be applied from pending reviews.": "대기 중인 검토에서는 제안을 적용할 수 없어요.",
                    "This suggestion has been applied or marked resolved.": "이 제안은 이미 적용되었거나 해결된 것으로 표시되었어요.",
                    "Outdated suggestions cannot be applied.": "오래된 제안은 적용할 수 없어요.",
                "Add suggestion to batch": "제안을 배치에 추가하기",
                    "Add this suggestion to a batch that can be applied as a single commit.": "이 제안을 하나의 커밋으로 배치하여 적용할 수 있도록 추가해보세요.",
                    "Batching suggestions must be done from the files tab.": "배치 제안은 파일 탭에서 진행해야 해요.",

                "Pending in batch": "배치 대기 중",
                "Remove from batch": "배치에서 제거하기",
                    "Remove this suggestion from those to be applied in batch": "배치 적용될 제안들에서 이 제안을 제거해보세요.",
                "Sign off and commit suggestions": "서명하고 제안들을 커밋하기",
                    "Apply all batched suggestions as a single commit": "모든 배치 제안을 하나의 커밋으로 적용하기",
                "Sign off and commit changes": "서명하고 변경 사항 커밋하기",
                    "Applying commit...": "커밋 적용 중이에요...",

                "This diff has recently been updated.": "이 차이점이 최근에 업데이트되었어요.",
                "Refresh and try again.": "새로고침 후 다시 시도해보세요.",

                "Multiple suggested changes can be batched together in a single commit. Each suggestion author will be attributed in the commit as a co-author.": "여러 제안된 변경 사항을 하나의 커밋으로 배치할 수 있어요. 각 제안 작성자는 공동 작성자로 기재될 거예요.",

        // 끌어오기 요청 --> 변경된 파일 탭 /<user-name>/<repo-name>/pull/<id>/files/<full SHA>
            "You are viewing a condensed version of this merge commit. You can view the": "이 병합 커밋의 요약 버전을 보고 계세요. 전체 변경 사항은",
            "full changes here": "여기서 확인할 수 있어요.",

            "We went looking everywhere, but couldn’t find those commits.": "여기저기 찾아보았지만, 해당 커밋들을 찾지 못했어요.",
            "Sometimes commits can disappear after a force-push. Head back to the": "강제 푸시 후에 커밋이 사라질 때가 있으니, 머리 부분으로 돌아가서",
            "latest changes here": "최신 변경 사항을 확인해보세요.",

        // 끌어오기 요청 --> 충돌 해결 /<user-name>/<repo-name>/pull/<id>/conflicts
            "Resolving conflicts": "충돌 해결 중",
            "between": "와",
            "and committing changes": "그리고 변경 사항 커밋 중",
            // [/(\d+) conflicting files?/, "$1 개의 충돌 파일"],
            // [/(\d+) conflicts?/, "$1 곳의 충돌"],
            
            "Mark as resolved": "해결됨으로 표시하기",
                "Remove all conflict markers to resolve this file": "이 파일의 충돌 표시를 모두 제거하여 해결하기",
            "Indent mode": "들여쓰기 모드",
                "Spaces": "공백",
                "Tabs": "탭",
            "Indent size": "들여쓰기 크기",
            "Line wrap mode": "줄 바꿈 모드",
                "No wrap": "줄 바꿈 없음",
                "Soft wrap": "부드러운 줄 바꿈",

            "Commit merge": "병합 커밋하기",
            "Sign off and commit merge": "서명하고 병합 커밋하기",
                "Heads up, this will commit to": "주의해 주세요, 이 작업은 다음 분기에 커밋할 거예요:",
                "Commit updates to the": "업데이트를 커밋할 분기는",
                "branch.": "분기이에요.",
                "Create a": "새로운",
                "new branch": "분기",
                "and commit updates. Your pull request will be updated automatically.": "를 만들고 업데이트를 커밋할 거예요. 끌어오기 요청은 자동으로 업데이트됩니다.",
                // [/I understand, sign off and update/, "이해했어요, 서명하고 업데이트할게요"],
                "You are": "사용자님은",
                "signing off": "서명 중이에요",
                // [/on this commit as ([^@]+@[^\n]+)/, "이 커밋은 $1 작성됨"],
                "Committing merge…": "병합 커밋 중이에요...",

                "conflict": "충돌",
                "conflicts": "충돌들",

        // 새 끌어오기 요청 커밋 페이지
            "authored and": "작성 및",
            "Browse repository at this point": "해당 시점의 저장소 보기",

        "ProTip!": "전문가 팁!",
            "to the end of URLs for Git’s plaintext views.": "Git의 평문 보기 URL 끝에",
            "Add comments to specific lines under": "특정 행에 댓글을 추가하시려면 아래에:",
        "Switch back to the classic merge experience": "클래식 병합 방식으로 전환하기",
        "Try the new merge experience": "새로운 병합 방식을 사용해보세요.",
    },
    "regexp": [ // 정규식 번역
        [/The (\d+) commits? from this branch will be rebased and added to the base branch./, "이 분기의 $1 개 커밋이 기준 분기에 리베이스되어 추가될 거예요."],
        [/([^ ]+):([^ ]+)% was force-pushed and no longer has any new commits./, "$1:$2 분기는 강제 푸시되어 이제 새로운 커밋이 없어요."], // 기존 항목과 충돌 방지를 위해 배치함
        // Dependabot이 연 끌어오기 요청
        [/This pull request resolved a Dependabot alert on ([^ ]+)./, "이 끌어오기 요청이 $1에서 Dependabot 경고를 해결했어요."],
        [/(\d+) Dependabot alerts?/, "$1 개의 Dependabot 경고"],
        [/^on ([^ ]+) including a/, "[$1에서, 1개 포함하여]"],
        [/^on ([^ ]+)./, "[$1에서]."],
        
        // 커밋 시 확장/축소 설명
        [/Show description for ([a-f0-9]{7})/, "커밋 $1 설명 보기"],
        [/Hide description for ([a-f0-9]{7})/, "커밋 $1 설명 숨기기"],
        
        // 새 PR 커밋 페이지
        [/wants to merge (\d+) commits? into/, "이 분기에 $1 개 커밋 병합하기를 원해요"],
        [/Commits on (.+)/,  (match, p1) => {
            const dateRegExp = I18N["ko-KR"]["public"]["time-regexp"];
            const translatedDate = dateRegExp.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), p1);
            return `커밋 작성일${translatedDate}`;
        }],
        
        // 특정 끌어오기 요청
        [/edited by ([^ ]+)/, "$1에 의해 수정됨"],
        [/At least (\d+) approving reviews? is required to merge this pull request./, "이 끌어오기 요청을 병합하려면 최소 $1 번의 승인 검토가 필요해요."],
        [/Commits?/, "커밋"],
        [/Files? changed/, "파일 변경"],
        [/merged (\d+) commits? into/, "$1 개 커밋이 병합되었어요"],
        [/Copy full SHA for ([^ ]+)/, "$1의 전체 SHA 복사하기"],
        [/View checks?/, "검사 보기"],
        [/([^ ]+) left review comments?/, "$1이(가) 검토 댓글을 남겼어요"],
        [/([^ ]+) approved these changes?/, "$1이(가) 이 변경 사항을 승인했어요"], // 특정 끌어오기 요청 검토자
        [/Request review from ([^ ]+)/, "$1에게 검토 요청하기"],
        [/users with write access to ([^ ]+) can add new commits/, "$1에 쓰기 권한이 있는 사용자들은 새로운 커밋을 추가할 수 있어요"],
        [/At least (\d+) approving reviews? are required to merge this pull request./, "이 끌어오기 요청을 병합하려면 최소 $1 번의 승인 검토가 필요해요."],
        [/This user is a first-time contributor to the ([^ ]+) repository./, "$1 저장소에 처음 기여하시는 분이에요."],
        [/(\d+) pending reviewers?/, "$1 명의 대기 중인 검토자"],
        [/([\d,]+) participants?/, "$1 명의 참여자"],
        [/At least (\d+) approving reviews? is required by reviewers with write access./, "쓰기 권한을 가진 검토자들은 최소 $1 번의 승인 검토가 필요해요."],
        [/(\d+) approving reviews? by reviewers? with write access./, "$1 개의 승인 검토가 쓰기 권한을 가진 검토자에 의해 이루어졌어요."],
        [/(\d+) review requesting changes by reviewers with write access/, "$1 개의 변경 요청 검토가 쓰기 권한을 가진 검토자에 의해 요청되었어요"],
        [/(\d+) changes? requested by reviewers with write access/, "쓰기 권한을 가진 검토자에 의해 $1 개의 변경 요청이 있었어요"],
        [/(\d+) changes? requested/, "$1 개의 변경 요청"],
        [/This pull request closes issue (#\d+)./, "이 끌어오기 요청이 이슈 $1을(를) 닫아요."], // 변하지 않음
        [/([\d,]+) additions, ([\d,]+) deletions not shown because the diff is too large. Please use a local Git client to view these changes./, "$1 건의 추가, $2 건의 삭제는 차이가 너무 커서 표시되지 않아요. 로컬 Git 클라이언트를 사용하여 확인해보세요."],
        [/(\d+) requested change/, "$1 개의 변경 요청"],
        
        // 상태
        [/branch (\d+) times, most recently from/, "분기 $1번, 최근에는"],
        [/pushed a commit to ([^ ]+) that referenced this pull request/, "$1에 이 끌어오기 요청을 참조하는 커밋을 푸시했어요"],
        [/Missing successful active ([^ ]+) deployment./, "$1 배포가 성공적으로 활성화되지 않았어요."], // 새 병합 페이지
        
        [/(\d+) in progress checks?/, "$1 개의 진행 중인 검사"],
        [/(\d+) skipped and (\d+) successful checks?/, "$1 건 건너뜀, $2 건 성공 검사"],
        [/(\d+) successful and (\d+) failing checks?/, "$1 건 성공, $2 건 실패 검사"],
        [/(\d+) skipped, (\d+) successful, and (\d+) failing checks?/, "$1 건 건너뜀, $2 건 성공, $3 건 실패 검사"],
        [/(\d+) skipped, (\d+) successful, (\d+) cancelled, and (\d+) failing checks?/, "$1 건 건너뜀, $2 건 성공, $3 건 취소, $4 건 실패 검사"],
        [/(\d+) skipped, (\d+) successful, and (\d+) expected checks?/, "$1 건 건너뜀, $2 건 성공, $3 건 예상 검사"],
        [/(\d+) skipped, (\d+) successful, (\d+) queue, and (\d+) expected checks?/, "$1 건 건너뜀, $2 건 성공, $3 건 대기, $4 건 예상 검사"],
        [/(\d+) skipped, (\d+) successful, (\d+) in progress, and (\d+) expected checks?/, "$1 건 건너뜀, $2 건 성공, $3 건 진행 중, $4 건 예상 검사"],
        [/(\d+) neutral checks?/, "$1 번의 중립 검사"],
        [/(\d+) successful checks?/, "$1 번의 성공 검사"],
        [/(\d+) of (\d+) checks? passed/, "$1/$2 번 검사 통과"],
        [/(\d+) checks? passed/, "$1 번 검사 통과"],
        
        [/Merging can be performed automatically with (\d+) approving review./, "병합은 $1 번의 승인 검토로 자동으로 수행될 수 있어요."],
        [/(\d+) workflow awaiting approval/, "$1 개의 작업 흐름이 승인을 기다리고 있어요"],
        [/The ([^ ]+) branch requires linear history/, "$1 분기는 선형 이력이 필요해요"],
        [/The (\d+) commits? from this branch will be added to the base branch./, "이 분기의 $1 개 커밋이 기준 분기에 병합될 거예요."],
        [/The (\d+) commits? from this branch will be combined into one commit in the base branch./, "이 분기의 $1 개 커밋이 기준 분기에 하나의 커밋으로 합쳐질 거예요."],
        [/The (\d+) commits? from this branch will be rebased and added to the base branch./, "이 분기의 $1 개 커밋이 기준 분기에 리베이스되어 추가될 거예요."],
        [/Ensure specific people or teams approve pull requests before they're merged into your ([^ ]+) branch./, "사용자님의 $1 분기에 끌어오기 요청이 병합되기 전에 특정 인원이나 팀이 승인하도록 보장해보세요."],
        [/(\d+) commits?/, "$1 개의 커밋"],
        [/All (\d+) file types? selected/, "모든 $1 종류의 파일 유형이 선택되었어요"],
        [/Select all (\d+) file types?/, "모든 $1 종류의 파일 유형 선택하기"],
        [/Unresolved conversations/, "해결되지 않은 대화"],
        [/Resolved conversations/, "해결된 대화"],
        // [/Commits (.+)/, "커밋 작성일 $1"], // 커밋 탭
        [/(#\d+) will be closed when this pull request is merged/, "$1은(는) 이 끌어오기 요청이 병합될 때 닫힐 거예요"],
        // 코드 공간
        [/Create a codespace on ([^ ]+)/, "$1에서 코드 공간 만들기"],
        [/Create codespace on ([^ ]+)/, "$1에서 코드 공간 만들기"],
        [/Codespace \"(.+)\" stopped./, "코드 공간 “$1”이(가) 중지되었어요."],
        [/Codespace \"(.+)\" deleted./, "코드 공간 “$1”이(가) 삭제되었어요."],
        [/Are you sure you want to delete (.+)\?/, "정말로 $1을(를) 삭제하시겠어요?"],
        [/(\d+) conflicting files?/, "$1 개의 충돌 파일"],
        [/(\d+) conflicts?/, "$1 곳의 충돌"],
        [/Awaiting requested review from ([^ ]+)/, "$1의 검토 요청 대기 중"],
        [/([^ ]+) is a code owner/, "$1은(는) 코드 소유자에요"],
        [/This commit will be authored by ([^@]+@[^\n]+)/, "이 커밋은 $1 작성됨"],
        [/This pull request resolved a Dependabot alert on ([^ ]+)./, "이 끌어오기 요청이 $1의 Dependabot 경고 문제를 해결했어요."],
        [/(\d+) workflows? awaiting approval/, "$1 개의 작업 흐름이 승인을 기다리고 있어요"],
        [/(\d+) resolved conversations?/, "$1 개의 대화가 해결되었어요"],
        [/I understand, continue updating ([^ ]+)/, "이해했어요, 계속해서 $1 업데이트할게요"],
        [/I understand, sign off and update/, "이해했어요, 서명하고 업데이트할게요"],
        [/on this commit as ([^@]+@[^\n]+)/, "이 커밋은 $1 작성됨"],
        [/Notify someone on an issue with a mention, like: @([^ ]+)./, "이슈에서 누군가에게 언급(예: @$1)으로 알림 보내기"],
        [/(\d+) conversations? must be resolved before merging./, "병합 전에 $1 개의 대화를 해결해야 해요."],
        [/(\d+) hidden items?/, "$1 개의 숨김 항목"],
        [/([^ ]+) requested changes/, "$1이(가) 변경을 요청했어요"],
        [/(\d+) active deployments?/, "$1 개의 활성 배포"],
        [/Check failure on line (\d+)/, "줄 $1에서 검사 실패:"],

        // 명령줄 충돌 해결 페이지
        [/Copy (.+?) to clipboard/, "$1을(를) 클립보드에 복사하기"],
        
        // 파일 차이점이 너무 클 경우 참고 https://github.com/maboloshi/github-chinese/pull/306/files
        [/([\d,]+) additions, ([\d,]+) deletions not shown because the diff is too large. Please use a local Git client to view these changes./, "차이가 너무 커서 $1 건의 추가와 $2 건의 삭제는 표시되지 않아요. 로컬 Git 클라이언트를 사용해 변경 사항을 확인해보세요."],
        
        // 충돌 해결 편집기 (F12 눌러야 번역됨)
        [/Search:/, "검색:"],
        [/\(Use \/re\/ syntax for regexp search\)/, "(정규식 검색을 위해 /re/ 구문 사용)"],
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        ...I18N["ko-KR"]["repository/pull_issue_public"]["regexp"],
    ],
    "selector": [ // 요소 선택 규칙
        ["span[data-message='Review changes']", "변경 사항 검토하기"], // 끌어오기 요청 --> 변경된 파일
    ],
};

I18N["ko-KR"]["repository/compare"] = { // 저장소 - 끌어오기 요청 비교 및 생성
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 변경 비교 페이지 /<user-name>/<repo-name>/compare
            "Compare changes": "변경 비교하기",
            "Compare changes across branches, commits, tags, and more below. If you need to, you can also": "분기, 커밋, 꼬리표 등 다양한 변경 사항을 비교해 보세요. 필요하다면",
            "compare across forks": "복제 저장소 간 비교하기",
            "Learn more about diff comparisons here": "차이 비교에 대해 자세히 알아보기:",
            "This is a direct comparison between two commits made in this repository or its related repositories.": "이것은 이 저장소 또는 관련 저장소의 두 커밋을 직접 비교한 결과에요.",
            "View the default comparison": "기본 비교 보기",
            "for this range or": "범위에 대해 또는",

            // 분기 선택 영역
            "base repository:": "기본 저장소:",
                "Choose a Base Repository": "기본 저장소 선택하기",
                "Filter repos": "저장소 필터링하기",
            "head repository:": "헤드 저장소:",
                "Choose a Head Repository": "헤드 저장소 선택하기",

            "base:": "기본 분기:",
                "Choose a base ref": "기본 참조 선택하기",
                "Find a branch": "분기 검색하기",
                "Find a tag": "꼬리표 검색하기",
            "compare:": "비교 분기:",
                "Choose a head ref": "헤드 참조 선택하기",

            "Choose different branches or forks above to discuss and review changes.": "위에서 서로 다른 분기나 복제 저장소를 선택하여 변경 사항에 대해 논의하고 검토해 보세요.",
            "Learn about pull requests": "끌어오기 요청에 대해 알아보기",

            "Create pull request": "끌어오기 요청 생성하기",

            "Compare and review just about anything": "모든 것을 비교 및 검토하기",
            "Branches, tags, commit ranges, and time ranges. In the same repository and across forks.": "분기, 꼬리표, 커밋 범위 및 시간 범위를 동일 저장소나 복제 저장소에서 비교할 수 있어요.",
            "Example comparisons": "비교 예시들",

            "Commit": "커밋",
            "Commits": "커밋들",
            "File changed": "변경된 파일",
            "Files changed": "변경된 파일들",

        // 끌어오기 요청 생성 페이지
        // /<user-name>/<repo-name>/compare/<branch>...<user-name-1>:<branch-1>
        // /<user-name>/<repo-name>/compare/<branch>...<branch-1>
        // <user-name>/<repo-name>/compare/<branch>...<user-name-1>:<repo-name-1>:<branch-1>
            "Comparing changes": "변경 사항 비교 중",
            "Choose two branches to see what’s changed or to start a new pull request. If you need to, you can also": "변경된 내용을 확인하거나 새로운 끌어오기 요청을 시작하기 위해 두 분기를 선택해 보세요. 필요하다면",
            "learn more about diff comparisons": "차이 비교에 대해 자세히 알아보기:",
            // "base fork:": "기본 복제 저장소:",
            "Documentation has changed since you last contributed": "마지막 기여 이후 문서가 변경되었어요",
            ". Take a look before submitting a pull request:": ". 끌어오기 요청을 제출하기 전에 한번 확인해 보세요:",
            "Contributing guidelines": "기여 가이드라인",
            "Last updated": "최근 업데이트:",
        
            "There isn’t anything to compare.": "비교할 내용이 없어요.",
                "We couldn’t figure out how to compare these references, do they point to valid commits?": "이 참조들이 유효한 커밋을 가리키는지 확인할 수 없어요.",
                "You’ll need to use two different branch names to get a valid comparison.": "유효한 비교를 위해서는 서로 다른 두 분기 이름을 사용해 주세요.",
                "Check out some of these sample comparisons.": "다음 비교 예시들을 한번 확인해 보세요.",
                "is up to date with all commits from": "모든 커밋이 최신 상태에 있어요",
                ". Try": "이에요. 비교를 위해서",
                "switching the base": "기본 분기를 전환해 보세요.",
                "for your comparison.": "",
        
            "Discuss and review the changes in this comparison with others.": "다른 사람과 함께 이 비교의 변경 사항을 논의하고 검토해 보세요.",
        
            "This comparison is big! We’re only showing the most recent 250 commits": "비교 내용이 방대해요! 최근 250개의 커밋만 표시하고 있어요.",
        
            "You’ll need to use two different branch names to get a valid comparison.": "유효한 비교를 위해서는 서로 다른 두 분기 이름을 사용해 주세요.",
        
            "are identical.": "서로 동일해요.",
        
            "Create another pull request to discuss and review the changes again.": "변경 사항을 다시 논의하고 검토하기 위해 다른 끌어오기 요청을 생성해 보세요.",
        
            // 변경된 파일 좌측 확장 버튼
            "Expand all": "전체 확장하기",
            "Expand All": "전체 확장하기",
            "Expand Up": "위로 확장하기",
            "Expand Down": "아래로 확장하기",
        
            "Unified": "통합 보기",
            "Split": "분할 보기",
        
            "Load diff": "차이점 불러오기",
            "This file was deleted.": "이 파일은 삭제되었어요.",
            "Large diffs are not rendered by default.": "큰 차이점은 기본적으로 표시되지 않아요.",
            "File renamed without changes": "파일 이름만 변경되었어요, 내용은 동일해요.",
            "Binary file not shown.": "이진 파일은 표시되지 않아요.",
            "Some generated files are not rendered by default. Learn more about": "일부 생성된 파일은 기본적으로 표시되지 않아요. 자세한 내용은",
                "how customized files appear on GitHub": "GitHub에서 커스터마이즈된 파일 표시 방식을 확인해 보세요.",
            "Empty file.": "빈 파일이에요.",
        
            // 커밋 관련
            "Copy the full SHA": "전체 SHA 복사하기",
            "View commit details": "커밋 상세 정보 보기",
            "Browse the repository at this point in the history": "해당 시점의 저장소 기록을 둘러보세요.",
        
        // 바로 끌어오기 요청 생성 (쿼리스트링 사용)
            "Open a pull request": "끌어오기 요청 열기",
            "The change you just made was written to a new branch named": "방금 하신 변경 사항은",
            ". Create a pull request below to propose these changes.": "라는 새 분기에 기록되었어요. 아래에서 끌어오기 요청을 만들어 제안해 보세요.",
            "Create a new pull request by comparing changes across two branches. If you need to, you can also": "두 분기 간의 변경 사항을 비교하여 새로운 끌어오기 요청을 생성할 수 있어요. 필요하다면",
        
            // 첫 끌어오기 요청 제출 시 안내 상자
            "It looks like this is your first time opening a pull request in this project!": "이 프로젝트에서 처음으로 끌어오기 요청을 열어보시는 것 같아요!",
            "Be sure to review the": "반드시 확인해 보세요:",
            "contributing guidelines": "기여 가이드라인",
            "Reporting a security vulnerability?": "보안 취약점을 보고하시려면?",
            "Check out the project's": "프로젝트의",
            "Looking for help?": "도움이 필요하시면?",
                "Check out the project’s": "프로젝트의",
                "instructions for getting support": "지원 방법 안내",
        
            "Checking mergeability…": "병합 가능 여부 확인 중…",
            "Don’t worry, you can still create the pull request.": "걱정 마세요, 끌어오기 요청을 생성할 수 있어요.",
            "Able to merge.": "병합이 가능해요.",
            "Can’t automatically merge.": "자동 병합은 불가능해요.",
            "These branches can be automatically merged.": "이 분기들은 자동으로 병합될 수 있어요.",
        
            "View pull request": "끌어오기 요청 보기", // 이미 존재하는 경우
        
            "commit": "커밋",
            "commits": "커밋들",
            "file changed": "변경된 파일",
            "files changed": "변경된 파일들",
            "contributor": "기여자",
            "contributors": "기여자들",
            // "No commit comments for this range": "해당 범위에 커밋 댓글이 없어요.",
        
            "Reviewers": "검토자",
                "No reviews": "검토 없음",
                "Loading suggestions…": "추천 불러오는 중…",
                // [/([^ ]+) left review comments/, "$1 님이 검토 의견을 남기셨어요"],
                // [/At least (\d+) approving reviews? are required to merge this pull request./, "이 끌어오기 요청을 병합하기 위해서는 최소 $1 번의 승인 검토가 필요해요."],
                "No reviews—at least 0 approving review is required.": "검토가 없어요 — 최소 0번의 승인 검토가 필요해요.",
                "Re-request review": "검토 재요청하기",
                "Still in progress?": "아직 진행 중이신가요?",
                // [/Awaiting requested review from ([^ ]+)/, "$1 님의 검토 요청 대기 중"],
                "Learn about draft PRs": "끌어오기 요청 초안에 대해 알아보기:",
                    "Try draft pull requests": "초안 끌어오기 요청 시도하기",
                    "Open an in-progress pull request without asking for formal review or risking an unwanted merge. When you're ready for code review, you can mark your draft pull request as ready for review, which will request reviews from any code owners.": "정식 검토 요청 없이 진행 중인 끌어오기 요청을 열어보세요. 코드 검토 준비가 완료되면 초안을 검토 요청 가능하도록 전환할 수 있어요.",
                    "Ask admin for access": "관리자에게 권한 요청하기",
                "Convert to draft": "초안으로 전환하기",
                "Request up to 15 reviewers": "최대 15명까지 검토 요청하기",
                // [/([^ ]+) approved these changes/, "$1 님이 이 변경 사항을 승인하셨어요"],
                "Request": "요청하기",
                // [/Request review from ([^ ]+)/, "$1 님에게 검토 요청하기"],
                "This pull request is waiting on your review.": "이 끌어오기 요청은 사용자님의 검토를 기다리고 있어요.",
        
            "Assignees": "담당자",
                "No one assigned": "담당자 없음",
                "No one—": "담당자 없음 — ",
                "assign yourself": "본인에게 지정하기",
                "Assign up to 10 people to this issue": "이 이슈에 최대 10명 지정하기",
                "Assign up to 10 people to this pull request": "이 끌어오기 요청에 최대 10명 지정하기",
                "Clear assignees": "담당자 지우기",
                "Type or choose a user": "사용자 이름 입력 또는 선택하기",
                "Suggestions": "추천",
        
            "Labels": "라벨",
                "None yet": "아직 없음",
                "bug": "버그",
                    "Something isn't working": "작동하지 않는 부분이 있어요.",
                "confirmed": "확인됨",
                    "Issue confirmed to exist and the reason is known": "문제가 존재하며 이유가 확인되었어요.",
                "dependencies": "종속성",
                    "Pull requests that update a dependency file": "종속성 파일을 업데이트하는 끌어오기 요청이에요.",
                "documentation": "문서",
                    "Improvements or additions to documentation": "문서 개선 또는 추가에 관한 것이에요.",
                "duplicate": "중복",
                    "This issue or pull request already exists": "이 이슈 또는 끌어오기 요청은 이미 존재해요.",
                "enhancement": "기능 개선",
                    "New feature or request": "새로운 기능 또는 요청이에요.",
                "good first issue": "첫 이슈로 적합해요",
                    "Good for newcomers": "신규 사용자에게 적합해요.",
                "help wanted": "도움 요청",
                    "Extra attention is needed": "추가적인 도움이 필요해요.",
                "invalid": "유효하지 않아요",
                    "This doesn't seem right": "뭔가 잘못된 것 같아요.",
                "question": "질문",
                    "Further information is requested": "추가 정보가 요청되었어요.",
                "wontfix": "수정하지 않아요",
                    "Not going to fix it": "수정할 계획이 없어요.",
                    "This will not be worked on": "더 이상 처리되지 않을 거예요.",
        
                "Apply labels to this issue": "이 이슈에 라벨 적용하기",
                "Apply labels to this pull request": "이 끌어오기 요청에 라벨 적용하기",
                "Edit labels": "라벨 편집하기",
        
                "dependencies": "종속 관계",
                    "Pull requests that update a dependency file": "종속 파일을 업데이트하는 끌어오기 요청이에요.",
                "Recent": "최근",
                "User": "사용자",
                "No projects": "프로젝트 없음",
        
            "Milestone": "마일스톤",
                "No milestone": "마일스톤 없음",
                "Set milestone": "마일스톤 설정하기",
                    "Nothing to show": "표시할 내용이 없어요",
        
        "Allow edits and access to secrets by maintainers": "유지 관리자가 편집하고 기밀 정보에 접근하도록 허용하기",
            "If checked,": "체크하면,",
            "users with write access to": "쓰기 권한이 있는 사용자들이",
            "can add new commits": "새 커밋을 추가할 수 있어요.",
            "to your": "사용자님의",
            "branch.": "분기에요.",
            "You can always change this setting later.": "언제든지 이 설정을 변경할 수 있어요.",
            "Note: By granting write access, maintainers could potentially edit your repository's workflows to reveal values of secrets and gain access to other branches.": "참고: 쓰기 권한을 부여하면, 유지 관리자가 저장소의 워크플로우를 편집하여 기밀 값 노출이나 다른 분기 접근이 가능할 수 있어요.",
            "Got it": "알겠어요",
        // 끌어오기 요청 생성 버튼 드롭다운
            "Automatically requests reviews from code owners": "코드 소유자에게 자동으로 검토 요청하기",
            "Create draft pull request": "끌어오기 요청 초안 생성하기",
            "Doesn't request code owners review and cannot be merged": "코드 소유자 검토 요청 없이 병합할 수 없어요.",
            "Draft pull request": "끌어오기 요청 초안",
        "Remember, contributions to this repository should follow its": "참고로, 이 저장소에 대한 기여는 반드시",
        "security policy": "보안 정책",
        "code of conduct": "행동 규범",
        "Remember, contributions to this repository should follow our": "참고로, 이 저장소에 대한 기여는 반드시 우리",
        "GitHub Community Guidelines": "GitHub 커뮤니티 가이드라인을 따라야 해요.",
        
        // 오른쪽 사이드바 추가 내용
        "Development": "개발",
            "Use": "사용하기",
            "Closing keywords": "닫기 키워드",
            "in the description to automatically close issues": "이슈를 자동으로 닫기 위해 설명에 사용해 보세요.",
            "Use Closing keywords to add a closing reference": "닫기 키워드를 사용해 닫기 참조를 추가해 보세요.",
        
        "Helpful resources": "도움이 되는 자료들",
            // "GitHub Community Guidelines": "GitHub 커뮤니티 가이드라인",
            "Contributing": "기여하기",
        
        // 꼬리표 기반 버전 비교 /<user-name>/<repo-name>/compare/<tag-id1>...<tag-id2>
            // MD 파일에 한함
            "Display the source diff": "원본 차이점 표시하기",
            "Display the rich diff": "리치 차이점 표시하기",
        
            "Load more commits": "더 많은 커밋 불러오기",
        
        // /<user-name>/<repo-name>/compare/<tag>...<branch>
            "Commit comments": "커밋 댓글",
        
        "Showing": "표시 중",
        "with": "포함하여",
        
        // 편집기 오른쪽 상단 세 점 (댓글 보기 정규식 처리)
        "View file": "파일 보기",
        "Edit file": "파일 편집하기",
        "Delete file": "파일 삭제하기",
        
        // 차이점 불러오기 실패 시
        "This comparison is taking too long to generate.": "비교 결과 생성에 너무 오래 걸리고 있어요.",
        "Unfortunately it looks like we can’t render this comparison for you right now. It might be too big, or there might be something weird with your repository.": "불행히도 지금은 비교 결과를 표시할 수 없어요. 너무 방대하거나 저장소에 문제가 있을 수 있어요.",
        "You can try running this command locally to see the comparison on your machine:": "이 명령어를 로컬에서 실행하여 비교 결과를 확인해 보세요:",
        
        // 댓글 입력창 옵션
        "Copilot actions": "Copilot 액션",
            "Generate": "생성하기",
                "Summary": "요약",
                    "Generate a summary of the changes in this pull request.": "이 끌어오기 요청의 변경 사항을 요약해 보세요.",
        "Summarizing changes… this might take a minute": "변경 사항 요약 중… 1분 정도 걸릴 수 있어요.",
    
    },
    "regexp": [ // 정규식 번역
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/Show comments?/, "댓글 보기"], // 편집기 오른쪽 상단 세 점
        [/committed/, "커밋됨"],
        [/(\d+) contributors?/, "$1 명의 기여자"],
        [/Allow(ing)? edits by maintainers/, "유지 관리자의 편집 허용하기"],
        [/users with write access to ([^ ]+) can add new commits/, "쓰기 권한이 있는 사용자는 $1 에 새 커밋을 추가할 수 있어요."],
        [/(\d+) changed files?/, "$1 개의 변경된 파일"],
        [/(\d+) additions?/, "$1 곳 추가"],
        [/(\d+) deletions?/, "$1 곳 삭제"],
        [/At least (\d+) approving reviews? are required to merge this pull request./, "이 끌어오기 요청을 병합하려면 최소 $1 번의 승인 검토가 필요해요."],
    ],
};

I18N["ko-KR"]["repository/commit"] = { // 저장소 - 커밋 페이지
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],
        
        // 특정 커밋 페이지 /<user-name>/<repo-name>/commit/<full SHA>
            "Commit": "커밋",
        
            // 단축키
            "Browsing commits": "커밋 둘러보기",
            // "": "커밋 댓글",
            "Close form": "댓글 창 닫기",
            "Parent commit": "이전 커밋",
            "Other parent commit": "다른 부모 커밋",
        
            // 삭제된 커밋 접근
            "This commit does not belong to any branch on this repository, and may belong to a fork outside of the repository.": "이 커밋은 이 저장소의 어떤 분기에도 속하지 않으며, 저장소 외부의 복제본에 속할 수 있어요.",
        
            "Browse files": "파일 둘러보기",
            "Loading branch information": "분기 정보 불러오는 중",
        
            // [/This commit closes issue (#\d+)./, "이 커밋이 이슈 $1 을(를) 닫았어요."],
            "committed": "커밋됨",
            "commit": "커밋",
        
            "Showing": "표시 중",
            "with": "포함하여",
            "always": "항상",
            "Whitespace": "공백 문자 차이 표시하기",
            "Ignore whitespace": "공백 문자 차이 무시하기",
            "Unified": "통합 보기",
            "Split": "분할 보기",
        
            "Display the source diff": "원본 차이점 표시하기",
            "Display the rich diff": "리치 차이점 표시하기",
            "Comment on this file": "이 파일에 댓글 남기기",
        
            "Filter changed files": "변경된 파일 필터링하기",
            "Show file tree": "파일 트리 보기",
            "Hide file tree": "파일 트리 숨기기",
        
            "Submodule": "서브모듈",
            "updated": "업데이트됨",
            // [/from ([^ ]+) to ([^ ]+)/, "에서 $1 에서 $2 로 변경됨."],
        
            "Binary file not shown.": "이진 파일은 표시되지 않아요.",
            "Empty file.": "빈 파일이에요.",
            "File renamed without changes.": "파일 이름만 변경되었어요, 내용은 동일해요.",
            "Whitespace-only changes.": "공백 문자만 변경되었어요.",
        
            "Some content is hidden": "일부 내용이 숨겨졌어요",
                "Large Commits have some content hidden by default. Use the searchbox below for content that may be hidden.": "대용량 커밋은 기본적으로 일부 내용이 숨겨져 있어요. 숨겨진 내용을 찾으시려면 아래 검색창을 사용해 보세요.",
            "Dismiss banner": "배너 닫기",
        
            "Load diff": "차이점 불러오기",
            "Load Diff": "차이점 불러오기",
            "This file was deleted.": "이 파일은 삭제되었어요.",
            "Large diffs are not rendered by default.": "큰 차이점은 기본적으로 표시되지 않아요.",
            "Some generated files are not rendered by default. Learn more about": "일부 생성된 파일은 기본적으로 표시되지 않아요. 자세한 내용은",
            "how customized files appear on GitHub": "GitHub에서 커스터마이즈된 파일 표시 방식을 확인해 보세요.",
            "customizing how changed files appear on GitHub.": "변경된 파일이 GitHub에서 어떻게 표시되는지 설정할 수 있어요.",
            "File renamed without changes.": "파일 이름만 변경되었어요, 내용은 동일해요.",
            "File renamed without changes": "파일 이름만 변경되었어요, 내용은 동일해요.",
            "Binary file not shown.": "이진 파일은 표시되지 않아요.",
            "Diff is too big to render. To view,": "차이가 너무 커서 표시되지 않아요. 보시려면,",
            "check out this pull request locally.": "로컬에서 이 끌어오기 요청을 확인해 보세요.",
        
            // 변경된 파일 좌측 확장 버튼
            "Expand all": "전체 확장하기",
            "Expand Up": "위로 확장하기",
            "Expand Down": "아래로 확장하기",
            "Collapse expanded lines": "확장된 줄 접기",
        
            // 변경된 파일 우측 드롭다운
            "Show comments": "댓글 보기",
            "Show annotations": "주석 보기",
            "View file": "파일 보기",
            "Edit file": "파일 편집하기",
            "Delete file": "파일 삭제하기",
            "Open in desktop": "GitHub Desktop에서 열기",
        
            // 하단 댓글창 상단
            "Lock conversation": "대화 잠그기",
                "Lock conversation on this commit": "이 커밋의 대화를 잠가 주세요.",
                "Locking the conversation means:": "대화를 잠근다는 의미는:",
                    "Other users": "다른 사용자는",
                    "can’t add new comments": "새 댓글을 추가할 수 없어요.",
                    "to this commit.": "이 커밋에 대해.",
                    "You and other collaborators": "사용자님과 다른 협업자들은",
                    "with access": "접근 권한이 있는",
                    "to this repository": "이 저장소에 대해",
                    "can still leave comments": "여전히 댓글을 남길 수 있어요.",
                    "that others can see.": "다른 사람이 볼 수 있도록요.",
                "You can always unlock this commit again in the future.": "언제든 다시 이 커밋의 대화를 열 수 있어요.",
            "Unlock conversation": "대화 잠금 해제하기",
                "Unlock conversation on this commit": "이 커밋의 대화 잠금 해제하기",
                "Unlocking the conversation means:": "대화 잠금 해제란:",
                "will be able to comment on this commit once more.": "다시 이 커밋에 댓글을 남길 수 있게 돼요.",
                "You can always lock this commit again in the future.": "앞으로 다시 이 커밋을 잠글 수 있어요.",
        
                "Reply…": "답글 남기기…",
        
            "commented on": "댓글 남김",
        
            "Paste, drop, or click to add files": "파일 추가를 위해 붙여넣거나, 드롭하거나, 클릭해 주세요.",
        
            // 댓글 숨기기
            "Choose a reason for hiding this comment": "이 댓글을 숨길 이유 선택하기",
            "The reason will be displayed to describe this comment to others.": "이유가 다른 사람에게 표시돼 댓글 설명으로 사용돼요.",
                "Choose a reason for hiding this comment": "이 댓글을 숨길 이유를 선택해 주세요.",
                "Unhide": "숨김 해제하기",
                "comment": "댓글",
                "Choose a reason": "이유 선택하기",
                    "Abuse": "남용",
                    "Spam": "스팸",
                    "Off Topic": "주제와 무관함",
                    "Outdated": "구식",
                    "Duplicate": "중복",
                    "Resolved": "해결됨",
        
            "Subscribe": "구독하기",
            "Unsubscribe": "구독 취소하기",
            "You’re not receiving notifications from this thread.": "이 대화에 대한 알림을 받지 않고 있어요.",
            "You’re receiving notifications because you're subscribed to this thread.": "이 대화를 구독 중이어서 알림을 받고 있어요.",
            "You’re receiving notifications because you're watching this repository.": "이 저장소를 주시 중이어서 알림을 받고 있어요.",
        
        // 커밋 페이지 /<user-name>/<repo-name>/commits/<branch> 또는 /<user-name>/<repo-name>/commits
            "Commits": "커밋들",
            "commit": "커밋",
            // 단축키
                "Copy file permalink": "파일 영구 링크 복사하기",
        
            "Copy full SHA for": "해당 커밋의 전체 SHA 복사하기",
            "View commit details": "커밋 상세 정보 보기",
            "Browse the repository at this point in the history": "해당 시점의 저장소 기록을 둘러보세요.",
        
            "Newer": "최신 커밋",
            "Older": "이전 커밋",
        
            // 끌어오기 요청 호버 카드
                "You were mentioned on and commented on this pull request": "이 끌어오기 요청에서 사용자님이 언급되고 댓글을 남기셨어요.",
                "You left a review": "검토를 남기셨어요.",
        
            // 이슈 호버 카드
                "You commented on this issue": "이 이슈에 댓글을 남기셨어요.",
                "You commented on and opened this issue": "이 이슈에 댓글과 함께 생성하셨어요.",
        
        // /commits?since=<start-date XXXX-XX-XX>&until=<end-date XXXX-XX-XX>&author=<author-name>
            "No commits history": "커밋 기록이 없어요.",
            "There isn't any commit history to show here": "여기에는 표시할 커밋 기록이 없어요.",
            "for the selected date range": "선택한 날짜 범위에 대해",
        
        // 신규 커밋 페이지 /<user-name>/<repo-name>/commits/<branch> 또는 /<user-name>/<repo-name>/commits
            // 사용자 필터링
                "All users": "모든 사용자",
                "Find a user...": "사용자 검색하기…",
                "View commits for all users": "모든 사용자의 커밋 보기",
            // 시간 필터링
                "All time": "전체 시간",
                "Today": "오늘",
            "Clear": "지우기",
            "Browse repository at this point": "해당 시점의 저장소 둘러보기",
            "View code at this point": "해당 시점의 코드 보기",
        
            // 달력
                "Su": "일",
                "Mo": "월",
                "Tu": "화",
                "We": "수",
                "Th": "목",
                "Fr": "금",
                "Sa": "토",
        
            // [/Copy full SHA for ([a-f0-9]{7})/, "커밋 $1 의 전체 SHA 복사하기"],
            // [/Show description for ([a-f0-9]{7})/, "커밋 $1 의 설명 보기"],
            // [/Hide description for ([a-f0-9]{7})/, "커밋 $1 의 설명 숨기기"],
        
        // 커밋 중 파일 이력 /<user-name>/<repo-name>/commits/<branch>/<file> 또는 /<user-name>/<repo-name>/commits/<full SHA>/<file>
            "History for": "파일 이력:",
            "View at this point in the history": "이 시점의 이력 보기",
        
            // [/Renamed from/, "…에서 이름 변경됨"],
            "(Browse History)": "（이력 둘러보기）",
        
        // 커밋 중 폴더 이력 /<user-name>/<repo-name>/commits/<branch>/<folder> 또는 /<user-name>/<repo-name>/commits/<full SHA>/<folder>
            "End of commit history for this file": "이 파일의 커밋 이력이 끝났어요.",
        
        // 2/commits?author=maboloshi&since=2021-09-30&until=2021-10-13
            "Seeing something unexpected? Take a look at the": "예상치 못한 내용이 보이시나요? 아래를 확인해 보세요:",
            "GitHub commits guide": "GitHub 커밋 가이드",
        
        // 신규 커밋 페이지
            "More actions": "추가 작업",
            // 특정 커밋
            "authored and": "작성 및",
            "authored": "작성됨",
        
            // 좌측 파일 탐색기
            "Filter files…": "파일 필터링…",
                "File extensions": "파일 확장자",
                "No extension": "확장자 없음",
        
            // 중간 영역
            "file": "개 파일",
                "s": " ",
                "changed": "변경됨",
        
            "Collapse file tree": "파일 트리 접기",
            "Expand file tree": "파일 트리 펼치기",
            "Copy file name to clipboard": "파일 이름 복사하기",
        
            "There are no files selected for viewing": "표시할 파일이 없어요.",
        
            // 우측 영역
            "Search within code": "코드 내 검색하기",
            "Top": "맨 위",
            "Layout": "레이아웃",
                "Hide whitespace": "공백 숨기기",
                "Compact line height": "컴팩트한 줄 높이 사용하기",
        
                "View comments": "댓글 보기",
                    "Loading comments": "댓글 불러오는 중",
                    "Comment on lines": "줄에 댓글 남기기",
        
                "Copy": "복사하기",
                "Select all": "전체 선택하기",
                "Expand above": "위쪽 펼치기",
                "Expand below": "아래쪽 펼치기",
                "Go to previous hunk": "이전 코드 덩어리로 이동하기",
                "Go to next hunk": "다음 코드 덩어리로 이동하기",
        
            "Customizable line height": "사용자 지정 줄 높이",
                "The default line height has been increased for improved accessibility. You can choose to enable a more compact line height from the view settings menu.": "접근성을 개선하기 위해 기본 줄 높이가 늘어났어요. 보기 설정 메뉴에서 더 컴팩트한 줄 높기를 활성화할 수 있어요.",
                "Enable compact line height": "컴팩트한 줄 높이 활성화하기",
                "Dismiss": "닫기",
        
            // 하단 댓글 영역
            "Comments": "댓글들",
            "edited by": "편집자:",
            "Edits": "편집 기록",
                "Most recent": "가장 최근",
                "Deleted": "삭제됨",
            "Lock": "잠그기",
                "conversation": "대화",
                "Off-topic": "주제와 무관",
            "Load more comments": "더 많은 댓글 불러오기",
            "Reference in a new issue": "새 이슈에서 언급하기",
            "Add files": "파일 추가하기",
            "You're not receiving notifications from this thread.": "이 대화에 대한 알림을 받지 않고 있어요.",
            "You're receiving notifications because you're subscribed to this thread.": "이 대화를 구독 중이어서 알림을 받고 있어요.",
    },
    "regexp": [ // 정규식 번역
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/(\d+) parents?/, "$1 명의 부모"],
        [/lines? changed/, "줄 변경됨"],
        [/(\d+) changed files?/, "$1 개의 변경된 파일"],
        [/(\d+) changes?: (\d+) additions? & (\d+) deletions?$/, "$1 곳 변경됨: $2 곳 추가, $3 곳 삭제"],
        [/(\d+) additions?$/, "$1 곳 추가"],
        [/(\d+) deletions?$/, "$1 곳 삭제"],
        [/This commit closes issue (#\d+)./, "이 커밋이 이슈 $1 을(를) 닫았어요."],
        [/from ([^ ]+) to ([^ ]+)/, "$1 에서 $2 로 변경됨."],
        [/([\d,]+) additions, ([\d,]+) deletions not shown because the diff is too large. Please use a local Git client to view these changes./, "$1 곳 추가, $2 곳 삭제는 차이가 너무 커서 표시되지 않아요. 로컬 Git 클라이언트로 확인해 보세요."],
        [/(\d+) comments? on commit/, "이 커밋에 $1 개의 댓글 있음"],
        [/Edited (\d+) times?/, "$1 번 편집됨"],
        // [/Commits (.+)/, "커밋됨: $1"],
        [/Renamed from/, "…에서 이름 변경됨"],
        [/Copy full SHA for ([a-f0-9]{7})/, "커밋 $1 의 전체 SHA 복사하기"],
        [/Show description for ([a-f0-9]{7})/, "커밋 $1 의 설명 보기"],
        [/Hide description for ([a-f0-9]{7})/, "커밋 $1 의 설명 숨기기"],
        [/View (\d+) commit comments?/, "$1 개의 커밋 댓글 보기"],
        [/View checks?/, "검사 보기"],
        [/Add a comment on line (L|R)(\d+)/, "$1$2 행에 댓글 남기기"],
        [/Start conversation on line (L|R)(\d+)/, "$1$2 행에서 대화 시작하기"],
        [/expand all lines: ([^ ]+)/, "전체 줄 확장하기: $1"],
        [/collapse file: ([^ ]+)/, "파일 접기: $1"],
        [/collapse non diff lines: ([^ ]+)/, "차이 없는 줄 접기: $1"],
    ],
};

I18N["ko-KR"]["repository/blob"] = { // 저장소 - 코드 보기
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 파일 코드 페이지 /<user-name>/<repo-name>/blob/<branch>/<file>
            // 상단 알림
                "This commit does not belong to any branch on this repository, and may belong to a fork outside of the repository.": "이 커밋은 이 저장소의 어떤 분기도 속하지 않으며, 저장소 외부의 포크에 속할 수 있어요.",

            // 단축키
                "Source code browsing": "소스 코드 보기",
                    "Jump to line": "지정 행으로 이동하기",
                    "Switch branch/tag": "분기/꼬리표 전환하기",
                    "Expand URL to its canonical form": "URL 을 정규 형식으로 확장하기",
                    "Show/hide all inline notes": "모든 인라인 주석 보이기/숨기기",
                    "Open blame": "추적 보기 열기",
                    "Copy file path": "파일 경로 복사하기",
                    "Toggle symbols panel": "심볼 패널 전환하기",
                    "Toggle file tree": "파일 트리 전환하기",
                    "Open code view": "코드 보기 열기",
                    "Open preview": "미리보기 열기",
                    "Open raw file": "원본 파일 열기",
                "File tree": "파일 트리",
                    "Move focus to row starting with string": "문자열로 시작하는 행으로 포커스 이동하기",
                    "Focus previous row": "이전 행에 포커스 맞추기",
                    "Focus next row": "다음 행에 포커스 맞추기",
                    "Collapse row, or focus parent row": "행을 접거나 상위 행에 포커스 맞추기",
                    "Expand row, or focus child row": "행을 확장하거나 하위 행에 포커스 맞추기",

            // 파일 트리 사이드바
                "Expand file tree": "파일 트리 확장하기",
                "Collapse file tree": "파일 트리 접기",
                // 검색창
                    "Go to file": "파일로 이동하기",
                        "No matches found": "일치 항목 없음",
                        "Go to folder": "폴더로 이동하기",
                        "See all results": "모든 결과 보기",

            // Action의 action.yml 파일
                "You can publish this Action to the GitHub Marketplace": "이 Action 을 GitHub 장터에 게시할 수 있어요.",
                "Draft a release": "릴리스 초안 만들기",
            // 워크플로 파일 /blob/<branch>/.github/workflows/xxxx.yml
                "View Runs": "실행 내역 보기",
            // 이슈 템플릿 /blob/<branch>/.github/ISSUE_TEMPLATE/xxxx.yml
                "This file is used as an Issue Form template.": "이 파일은 이슈 양식 템플릿으로 사용돼요.",
                "Give Feedback.": "피드백 남겨주세요.",
            // 파일 추가 버튼, 폴더 모드에서
                "Add file": "파일 추가하기",
            // 더보기 (점 세 개)
                "Raw file content": "원시 파일 내용",
                    "Copy": "복사하기", // Android UA 에서 표시
                    "View": "보기", // Android UA 에서 표시
                    "Download": "다운로드하기",
                    // "Jump to line": "지정 행으로 이동하기",
                    "Find in file": "파일 내에서 찾기", // 줄바꿈 활성 시 표시
                    "Copy path": "경로 복사하기",
                    "Copy permalink": "영구 링크 복사하기",
                    "View options": "옵션 보기",
                        "Show code folding buttons": "코드 접기 버튼 보이기",
                        "Wrap lines": "줄 바꿈",
                        "Center content": "내용 가운데 정렬",
                        "Open symbols on click": "클릭 시 심볼 열기",
                    "Delete file": "파일 삭제하기",

            "Copied path!": "✅ 경로가 복사되었어요!",

            "History": "히스토리",

            "Top": "맨 위",
            "Jump to file": "파일로 이동하기",

            // 코드 작업 모음
                "Blame": "추적",
                "Your blame took too long to compute.": "추적 계산이 너무 오래 걸렸어요.",
                // [/(\d+) lines? \((\d+) loc\) ·/, "$1 행 (총 $2 비어있지 않은 행) ·"],
                // Copilot 광고
                    "Code 55% faster with GitHub Copilot": "GitHub Copilot 을 사용하면 코딩 속도가 55% 빨라져요",
                        "Spend less time creating boilerplate and repetitive code patterns, and more time building great software. Try it in Codespaces or your favorite file editor.": "반복적인 코드 패턴에 드는 시간을 줄이고 훌륭한 소프트웨어를 구축하는 데 더 많은 시간을 할애해 보세요. Codespaces 또는 좋아하는 파일 편집기에서 사용해 보세요.",
                        "Get GitHub Copilot": "GitHub Copilot 받기",
                        "Don't show again": "다시 표시하지 않기",

                "Executable File": "실행 파일",
                "executable file": "실행 파일",

                // Copilot
                "Ask Copilot about this file": "이 파일에 대해 Copilot 에게 물어보기",

                "Raw": "원본",
                // 파일 복사 아이콘
                    "Copy raw file": "원본 파일 복사하기",
                    "Copy raw content": "원본 내용 복사하기",
                // 파일 다운로드 아이콘
                    "Download raw file": "원본 파일 다운로드하기",
                // 파일 편집 아이콘
                    "Edit this file": "이 파일 편집하기",
                    "Edit the file in your fork of this project": "내 복제본에서 이 파일 편집하기",
                        "Edit file": "파일 편집하기",
                            "Edit in place": "제자리에서 편집하기",
                        "Open with...": "다음에서 열기:",
                            "You must be on a branch to make or propose changes to this file": "이 파일을 변경하거나 수정 제안을 하려면 분기에 있어야 해요.",

                    // 버튼 안내
                    "Fork this repository and edit the file": "이 저장소를 복제한 후 파일을 편집하기",
                // 심볼 패널 아이콘
                    "Open symbols panel": "심볼 패널 열기",
                    "Close symbols panel": "심볼 패널 닫기",

            // 코드 보기 행 번호 모음 메뉴
                "Copy line": "행 복사하기",
                "Copy lines": "여러 행 복사하기",
                "Copy permalink": "영구 링크 복사하기",
                "View git blame": "Git 추적 보기",
                "Reference in new issue": "새 이슈에 인용하기",
                "Reference in new discussion": "새 토론에 인용하기",
                "View file in GitHub.dev": "GitHub.dev 에서 파일 보기",
                "View file in different branch/tag": "다른 분기/꼬리표에서 파일 보기",

            // 알림
                "This file contains bidirectional Unicode text that may be interpreted or compiled differently than what appears below. To review, open the file in an editor that reveals hidden Unicode characters.": "이 파일에는 양방향 Unicode 텍스트가 포함되어 있어서 아래 표시된 내용과 다르게 해석되거나 컴파일될 수 있어요. 확인하려면 숨겨진 Unicode 문자를 표시하는 편집기에서 파일을 열어 보세요.",
                "Learn more about bidirectional Unicode characters": "양방향 Unicode 문자에 대해 더 알아보기",
                "Show hidden characters": "숨겨진 문자 보이기",
                "Code view is read-only.": "코드 보기 모드는 읽기 전용이에요.",
                    "Switch to the editor.": "편집기로 전환하기",

            // 코드 보기 하단
                "View remainder of file in raw view": "원시 보기로 파일 나머지 부분 보기",

            // 본문 부분
                // CSV 파일
                    "Search this file": "이 파일 검색하기", // CSV 파일
                    // 알림
                        "We can make this file": "이 파일을 멋지고 검색 가능하게 만들 수 있어요",
                        "beautiful and searchable": "아름답고 검색 가능하게",
                        "if this error is corrected: No commas found in this CSV file in line 0.": "만약 이 오류가 수정된다면: 이 CSV 파일의 0번째 줄에서 쉼표를 찾을 수 없어요.",
                // 대형 파일
                    "View raw": "원시 데이터 보기",
                    "(Sorry about that, but we can’t show files that are this big right now.)": "（죄송해요, 하지만 지금은 이렇게 큰 파일을 표시할 수 없어요.）",
                // 렌더링 불가
                    "Sorry, something went wrong.": "죄송해요, 문제가 발생했어요.",
                    "Reload?": "다시 불러올까요?",
                    "Unable to render code block": "코드 블록을 렌더링할 수 없어요.",

            "More Pages": "더 많은 페이지",

            // 오른쪽 개요 패널
                "Outline": "개요", // MD 파일
                    "Filter headings": "제목 필터링하기", // MD 파일

            // 오른쪽 심볼 패널
                "Symbols": "심볼",
                    "Symbol outline not available for this file": "이 파일에는 심볼 개요를 사용할 수 없어요.",
                    "To inspect a symbol, try clicking on the symbol directly in the code view.": "심볼을 확인하려면 코드 보기에서 해당 심볼을 직접 클릭해 보세요.",
                    "Code navigation supports a limited number of languages.": "코드 탐색은 제한된 언어만 지원해요.",
                    "See which languages are supported.": "지원되는 언어 보기",
                    "Find definitions and references for functions and other symbols in this file by clicking a symbol below or in the code.": "아래 또는 코드 내의 심볼을 클릭하면 이 파일의 함수 및 기타 심볼에 대한 정의와 참조를 찾을 수 있어요.",
                    "Filter symbols": "심볼 필터링하기",
                "All Symbols": "모든 심볼",
                    "Search for this symbol in this repository": "이 저장소에서 이 심볼 검색하기",
                    "all repositories.": "모든 저장소에서.",
                    "In this file": "이 파일에서",
                    "Definition": "정의",
                    "search-based": "검색 기반",
                    "References": "참조",
                    "Reference": "참조",
                    "No definitions or references found": "정의나 참조를 찾을 수 없어요.",
                    "Show more": "더 보기",
                    "Show less": "간략히 보기",
                    "Search for this symbol": "이 심볼 검색하기",

        // 코드 추적 페이지 /<user-name>/<repo-name>/blame/<branch>/<file>
            "Newer": "최신",
            "Older": "오래된",
            "Contributor": "기여자",
            "Contributors": "기여자들",

            // 부동 검색창
                "Find": "찾기",
                "Press": "누르세요",
                "again to open the browser's find menu": "브라우저의 찾기 메뉴를 열기 위해",
                "Search this file": "이 파일 검색하기",

        // 중간 칸 상단 권한 정보
        "the": "대상:", // 앞부분 정규식 처리

        // 라이선스
            "GNU General Public License v3.0": "GNU 일반 공중 사용 허가서 v3.0",
            "GPL-3.0 License": "GPL-3.0 사용 허가서",
            "AGPL-3.0 License": "AGPL-3.0 사용 허가서",
            "LGPL-3.0 License": "LGPL-3.0 사용 허가서",
            "MIT License": "MIT 사용 허가서",
            "Apache License 2.0": "Apache License 2.0 사용 허가서",
            "OFL-1.1 License": "OFL-1.1 사용 허가서",
            "0BSD License": "0BSD 사용 허가서",
            "BSD-3-Clause License": "BSD-3-Clause 사용 허가서",
            "BSD 3-Clause \"New\" or \"Revised\" License": "BSD-3-Clause 사용 허가서",
            "CC0-1.0 License": "CC0-1.0 사용 허가서",
            "WTFPL License": "WTFPL 사용 허가서",
            "Unknown": "알 수 없음",

        "Permissions": "권한",
        "Limitations": "제한 사항",
            "Commercial use": "상업적 사용",
            "Modification": "수정",
            "Distribution": "배포",
            "Patent use": "특허 사용",
            "Private use": "개인적 사용",
            "Trademark use": "상표 사용",
            "Liability": "책임",
            "Warranty": "보증",
            "Disclose source": "소스 공개",
            "Same license": "동일 라이선스",
        "Conditions": "조건",
            "License and copyright notice": "라이선스 및 저작권 공지",
            "State changes": "상태 변경",
            "License and copyright notice for source": "소스에 대한 라이선스 및 저작권 공지",
            "Network use is distribution": "네트워크 사용은 배포로 간주됨",
            "Same license (library)": "동일 라이선스 (라이브러리)",
            "Same license (file)": "동일 라이선스 (파일)",

        "This is not legal advice.": "법률 조언이 아니에요.",
        "Learn more about repository licenses": "저장소 라이선스에 대해 더 알아보기",

    },
    "regexp": [ // 정규식 번역
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/(\d+) lines? \((\d+) loc\) ·/, "$1 행（$2 비어있지 않은 행）·"],  // loc = 코드 줄 (비어있지 않은 줄 수)
        [/(\d+) References?/, "$1 회 참조"],
        [/Blame prior to change ([a-f0-9]{7}), made on ([^ ]+)/, "변경 전 $1 (작성일: $2) 추적"],
        // 코드 추적 페이지
        [/(\d+) contributors?/, "$1 명의 기여자"],
        [/(\d+) commits?/, "$1 개의 커밋"],
        // 라이선스
        [/([^ ]+) is licensed under/, "$1 의 라이선스:"],
        [/First (\d+) files? shown./, "처음 $1 개의 파일 표시됨."],
    ],
};
I18N["ko-KR"]["repository/blame"] = I18N["ko-KR"]["repository/blob"];

I18N["ko-KR"]["repository/discussions"] = { // 토론 페이지
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 토론 페이지 /<user-name>/<repo-name>/discussions
        // 조직 토론 페이지 /orgs/<orgs-name>/discussions
            // 상단 알림
                "You can't perform that action at this time.": "현재 해당 작업을 수행할 수 없어요.",
            "Start a new discussion": "새 토론 시작하기",
            "Get started by creating the first": "시작하려면 커뮤니티를 위한 첫 번째",
            "discussion for your community.": "토론을 만들어 보세요.",
            "Got it": "알겠어요",
            "About pinned discussions": "고정 토론에 관하여",
            "When you start a discussion,": "토론을 시작할 때,",
            "you can choose to feature it": "해당 토론을 고정할 수 있어요",
            "here by pinning it.": "여기서 고정해 보세요.",
            "Personalize your categories": "카테고리 개인화하기",
            "Choose categories that fit your community. These could be announcements, Q&A with marked answers, open-ended conversations, or polls for community voting.": "커뮤니티에 맞는 카테고리를 선택해 보세요. 공지, 답변이 표시된 Q&A, 자유로운 대화, 커뮤니티 투표용 설문 등이 될 수 있어요.",
            "Welcome to discussions!": "토론에 오신 것을 환영해요!",
            "Discussions are to share announcements, create conversation in your community, answer questions, and more.": "토론은 공지를 공유하고, 커뮤니티에서 대화를 만들며, 질문에 답하는 등 다양한 활동을 위해 사용해 보세요.",
            "Discussions are to share announcements, create conversation in your community, answer questions, and more. To get started, you can create a": "토론은 공지를 공유하고, 커뮤니티에서 대화를 만들며, 질문에 답하는 등 다양한 용도로 사용할 수 있어요. 먼저, 다음을 통해",
            // 조직 토론
            "Welcome to Organization Discussions!": "조직 토론에 오신 것을 환영해요!",
            "There are no discussions here yet": "아직 토론이 없어요.",
            "Organization discussions are to broadcast news, create conversation in your community, answer questions, and share ideas. To get started, you can": "조직 토론은 소식을 전파하고, 커뮤니티 내에서 대화를 형성하며, 질문에 답하거나 아이디어를 공유하기 위해 사용해 보세요. 시작하려면",
            "create a new discussion.": "새 토론을 만들기",
            // 왼쪽 사이드바
            "Submit search": "검색 제출하기",
            "Search all discussions": "전체 토론 검색하기",
            "Suggested filters": "추천 필터",
            "filter by discussion author": "토론 작성자로 필터링하기",
            "filter by discussion category": "토론 분류로 필터링하기",
            "filter by answered or unanswered": "답변 여부로 필터링하기",
            "Categories": "분류",
            "View all discussions": "모든 토론 보기", // 조직 토론
            "View all": "전체 보기", // 저장소 토론
            "Most helpful": "가장 도움되는",
                "Be sure to mark someone’s comment as an answer if it helps you resolve your question — they deserve the credit!": "질문 해결에 도움이 되는 댓글은 꼭 답변으로 표시해 주세요 — 그분의 공로를 인정해야 해요!",
            "Last 30 days": "최근 30일",
            "Community guidelines": "커뮤니티 가이드라인",
            "Community insights": "커뮤니티 인사이트",
            "Sort by:": "정렬 기준:",
                "Latest activity": "최신 활동",
                "Date created": "생성 날짜",
                "Top: Past week": "상위: 지난 주",
                "Top: Past month": "상위: 지난 달",
                "Top: Past day": "상위: 지난 하루",
                "Top: Past year": "상위: 지난 1년",
                "Top: All": "상위: 전체",
            "Label": "라벨",
                "Filter by label": "라벨로 필터링하기",
                "Filter labels": "라벨 필터링하기",
                "Unlabeled": "라벨 없음",
                "bug": "버그",
                    "Something isn't working": "작동하지 않는 기능이 있어요.",
                "dependencies": "종속성",
                    "Pull requests that update a dependency file": "종속 파일을 업데이트한 끌어오기 요청",
                "documentation": "문서",
                    "Improvements or additions to documentation": "문서의 개선 또는 추가",
                "duplicate": "중복",
                    "This issue or pull request already exists": "이 이슈나 끌어오기 요청은 이미 존재해요.",
                "enhancement": "기능 개선",
                    "New feature or request": "새로운 기능 또는 요청",
                "good first issue": "초보자 친화적 이슈",
                    "Good for newcomers": "신규 사용자에게 적합해요.",
                "help wanted": "도움 요청",
                    "Extra attention is needed": "추가적인 주의가 필요해요.",
                "invalid": "유효하지 않음",
                    "This doesn't seem right": "이건 옳지 않아 보여요.",
                "question": "질문",
                    "Further information is requested": "더 많은 정보를 요청해요.",
                "wontfix": "수정하지 않음",
                    "This will not be worked on": "이것은 작업하지 않을 거예요.",
                "Edit labels": "라벨 편집하기",
            "Filter": "필터",
            "Filter:": "필터:",
                "Closed": "닫힌",
                "Answered": "답변된",
                "Unanswered": "미답변",
                "Locked": "잠긴",
                "Unlocked": "잠금 해제됨",
                "All": "전체",
            "New discussion": "새 토론 만들기",
            "There aren't any discussions.": "토론이 없어요.",
            "There are no matching discussions.": "일치하는 토론이 없어요.",
            "There are no matching answered discussions.": "일치하는 답변된 토론이 없어요.",
            "There are no matching unanswered discussions.": "일치하는 미답변 토론이 없어요.",
            "You can open a": "새로운 토론을 열어",
            "new discussion": "새 토론",
            "to ask questions about this repository or get help.": "이 저장소에 대해 질문하거나 도움을 받으실 수 있어요.",
            "asked": "질문함",
            "started": "시작함",
            "· Unanswered": " · 미답변",
            "· Answered": " · 답변됨",
            // 드롭다운 보충
            "Use": "사용하기",
            "click/return": "클릭/엔터",
            "to exclude labels.": "를 눌러 라벨을 제외해 보세요.",
            // 상태 단어
            "asked a question in": "에서 질문함",
            "Unanswered Question": "미답변 질문",
            "announced": "발표함",
            "in": "에서",

        // 토론 분류 /<user-name>/<repo-name>/discussions/categories
            "Manage discussion categories": "토론 분류 관리하기",
                "Sections are a dropdown of categories. Categories have types of discussions, and discussions within them.": "섹션은 분류들의 드롭다운 메뉴예요. 분류는 토론 종류와 해당 토론들을 포함해요.",
            // [/(\d+) categories?/, "$1 개 분류"],
            "Categories without section": "섹션 없는 분류",
            "Announcements": "공지",
                "Updates from maintainers": "유지 관리자의 업데이트",
            "General": "일반",
                "Chat about anything and everything here": "여기서 모든 주제에 대해 대화해 보세요.",
            "Ideas": "아이디어",
                "Share ideas for new features": "새로운 기능에 대한 아이디어 공유하기",
            "Polls": "투표",
                "Take a vote from the community": "커뮤니티 투표 진행하기",
            "Q&A": "질문과 답변",
                "Ask the community for help": "커뮤니티에 도움 요청하기",
            "Answers enabled": "답변 사용 설정됨",
            "Show and tell": "공유 및 소개",
                "Show off something you've made": "만든 것을 뽐내 보세요.",
            "New section": "새 섹션 만들기",
            "New category": "새 분류 만들기",
            "Edit Announcements category": "‘공지’ 분류 편집하기",
            "Edit General category": "‘일반’ 분류 편집하기",
            "Edit Ideas category": "‘아이디어’ 분류 편집하기",
            "Edit Polls category": "‘투표’ 분류 편집하기",
            "Edit Q&A category": "‘질문과 답변’ 분류 편집하기",
            "Edit Show and tell category": "‘공유 및 소개’ 분류 편집하기",
            "Delete Announcements category": "‘공지’ 분류 삭제하기",
            "Delete General category": "‘일반’ 분류 삭제하기",
            "Delete Ideas category": "‘아이디어’ 분류 삭제하기",
            "Delete Polls category": "‘투표’ 분류 삭제하기",
            "Delete Q&A category": "‘질문과 답변’ 분류 삭제하기",
            "Delete Show and tell category": "‘공유 및 소개’ 분류 삭제하기",
            // 분류 삭제
                "If this category has discussions associated, where would you like to reassign them?": "이 분류와 관련된 토론이 있다면, 어디로 재할당할지 선택해 주세요.",
                "Delete and move": "삭제 후 이동하기",
            // 섹션 삭제
                // [/Delete (.*) section/, "‘$1’ 섹션 삭제하기"],
                "Are you sure you want to delete this section? All categories in this section will no longer belong to a section.": "이 섹션을 삭제하시겠어요? 이 섹션에 속한 모든 분류는 더 이상 섹션에 속하지 않게 돼요.",
        // 새 토론 분류/편집 /<user-name>/<repo-name>/discussions/categories/new
        // /<user-name>/<repo-name>/discussions/categories/<id>/edit
            "Create category": "분류 만들기",
            "Edit category": "분류 편집하기",
            "Category name": "분류 이름",
            "Description": "설명",
            "Add a description (optional)": "설명 추가하기 (선택사항)",
            "Discussion Format": "토론 형식",
                "Open-ended discussion": "자유로운 토론",
                    "Enable your community to have conversations that don't require a definitive answer to a question. Great for sharing tips and tricks or just chatting.": "질문에 명확한 답변이 필요 없는 대화를 커뮤니티에서 할 수 있도록 해 보세요. 팁과 요령 공유나 단순 대화에 좋아요.",
                "Question / Answer": "질문 / 답변",
                    "Enable your community to ask questions, suggest answers, and vote on the best suggested answer.": "커뮤니티가 질문을 하고, 답변을 제안하며, 최선의 답변을 투표로 선택할 수 있도록 해 보세요.",
                "Announcement": "공지",
                    "Share updates and news with your community. Only maintainers and admins can post new discussions in these categories, but anyone can comment and reply.": "커뮤니티에 업데이트와 소식을 공유해 보세요. 이 카테고리에서는 유지 관리 담당자와 관리자만 새 토론을 시작할 수 있고, 누구나 댓글과 답글을 남길 수 있어요.",
                "Poll": "투표",
                    "Gauge interest, vote, and interact with other community members using polls.": "관심도를 측정하고 투표하며, 투표를 통해 다른 커뮤니티 구성원과 소통해 보세요.",
                    "Cannot be changed to polls. Please create a new category for polls.": "투표로 변경할 수 없어요. 투표용 분류를 새로 만들어 주세요.",
            "Add this category to a section (optional)": "이 분류를 섹션에 추가하기 (선택사항)",
                "No section": "섹션 없음",
            "Create": "만들기",
            "Save changes": "변경 사항 저장하기",
            "Submitting": "제출 중",
            // 상단 알림
                "Category Announcements has been created.": "‘공지’ 분류가 만들어졌어요.",
                "Category General has been created.": "‘일반’ 분류가 만들어졌어요.",
                "Category Ideas has been created.": "‘아이디어’ 분류가 만들어졌어요.",
                "Category Polls has been created.": "‘투표’ 분류가 만들어졌어요.",
                "Category Q&A has been created.": "‘질문과 답변’ 분류가 만들어졌어요.",
                "Category Show and tell has been created.": "‘공유 및 소개’ 분류가 만들어졌어요.",
                "Category Announcements has been updated.": "‘공지’ 분류가 업데이트되었어요.",
                "Category General has been updated.": "‘일반’ 분류가 업데이트되었어요.",
                "Category Ideas has been updated.": "‘아이디어’ 분류가 업데이트되었어요.",
                "Category Polls has been updated.": "‘투표’ 분류가 업데이트되었어요.",
                "Category Q&A has been updated.": "‘질문과 답변’ 분류가 업데이트되었어요.",
                "Category Show and tell has been updated.": "‘공유 및 소개’ 분류가 업데이트되었어요.",
                "Category Announcements has been deleted.": "‘공지’ 분류가 삭제되었어요.",
                "Category General has been deleted.": "‘일반’ 분류가 삭제되었어요.",
                "Category Ideas has been deleted.": "‘아이디어’ 분류가 삭제되었어요.",
                "Category Polls has been deleted.": "‘투표’ 분류가 삭제되었어요.",
                "Category Q&A has been deleted.": "‘질문과 답변’ 분류가 삭제되었어요.",
                "Category Show and tell has been deleted.": "‘공유 및 소개’ 분류가 삭제되었어요.",
                // [/Category \"(.*)\" has been created./, "‘$1’ 분류가 만들어졌어요."],
                // [/Category \"(.*)\" has been updated./, "‘$1’ 분류가 업데이트되었어요."],
                // [/Category \"(.*)\" has been deleted./, "‘$1’ 분류가 삭제되었어요."],
        // 새 섹션/편집 /<user-name>/<repo-name>/discussions/sections/new
            "Create section": "섹션 만들기",
            "Section name": "섹션 이름",
            "Add categories to this section": "이 섹션에 분류 추가하기",
            "A category can only belong to one section at a time.": "한 분류는 한 번에 하나의 섹션에만 속할 수 있어요.",
            // 상단 알림
                // [/Section \"(.*)\" has been created./, "‘$1’ 섹션이 만들어졌어요."],
                // [/Section \"(.*)\" has been updated./, "‘$1’ 섹션이 업데이트되었어요."],
                // [/Section \"(.*)\" has been deleted./, "‘$1’ 섹션이 삭제되었어요."],
        // 새 토론 페이지 /<user-name>/<repo-name>/discussions/new
            "Start a new discussion": "새 토론 시작하기",
            "Select a discussion category": "토론 분류 선택하기",
            "Get started": "시작하기",
            "Category:": "분류:",
            "Contributing": "기여",
            "It looks like this is your first time starting a discussion in this repository!": "이 저장소에서 처음으로 토론을 시작하는 것 같아요!",
            "This is a community we build together. Please be welcoming and open minded.": "함께 만드는 커뮤니티예요. 따뜻하고 열린 마음으로 참여해 주세요.",
        // 투표 관련
            "Poll question": "투표 질문",
            "Ask your question here (required)": "여기에 질문을 입력해 주세요 (필수)",
            "Poll options": "투표 옵션",
            "Option 1 (required)": "옵션 1 (필수)",
            "Option 2 (required)": "옵션 2 (필수)",
            "Option": "옵션",
            "+ Add an option": "+ 옵션 추가하기",
        // 오른쪽 사이드바
            "Labels": "라벨",
                "None yet": "아직 없음",
            "Helpful resources": "유용한 자료",
            "Code of conduct": "행동 강령",
            "Security policy": "보안 정책",
            "Support": "지원",
            "GitHub Community Guidelines": "GitHub 커뮤니티 가이드라인",
            "Ask a question, start a conversation, or make an announcement": "질문하거나 대화를 시작하거나 공지하기",
        // 새 토론 페이지 /<user-name>/<repo-name>/discussions/new?category=general
            "If this doesn’t look right you can": "이게 마음에 들지 않으면",
            "choose a different category.": "다른 분류를 선택해 보세요.",
            "Fields marked with an asterisk (*) are required.": "별표(*)가 표시된 항목은 필수예요.",
            "Discussion title": "토론 제목",
        // 새 토론 페이지 /<user-name>/<repo-name>/discussions/new?category=announcements&welcome_text=true
            "Since you're new here, we're helping you to get started by generating your first post to the community. Don't worry, you can edit this discussion after you post!": "새로 오셨으니, 커뮤니티에 첫 게시물을 생성해서 시작하실 수 있도록 도와드릴게요. 걱정하지 마세요, 게시 후에 토론을 수정할 수 있어요.",
        // 특정 토론 페이지 /<user-name>/<repo-name>/discussions/<id>
            // [/Congratulations, you've created the first discussion in ([^ ]+)!/, "축하해요, $1 에 첫 토론을 만드셨어요!"],
            // 상단 알림
                "Discussion has successfully been pinned.": "토론이 성공적으로 고정되었어요.",
                "Discussion has been unpinned.": "토론 고정이 해제되었어요.",
                "Discussion pinned to Announcements": "‘공지’ 에 토론 고정하기",
                "Discussion pinned to General": "‘일반’ 에 토론 고정하기",
                "Discussion pinned to Ideas": "‘아이디어’ 에 토론 고정하기",
                "Discussion pinned to Polls": "‘투표’ 에 토론 고정하기",
                "Discussion pinned to Q&A": "‘질문과 답변’ 에 토론 고정하기",
                "Discussion pinned to Show and tell": "‘공유 및 소개’ 에 토론 고정하기",
                "Discussion unpinned from Announcements": "‘공지’ 에서 토론 고정 해제하기",
                "Discussion unpinned from General": "‘일반’ 에서 토론 고정 해제하기",
                "Discussion unpinned from Ideas": "‘아이디어’ 에서 토론 고정 해제하기",
                "Discussion unpinned from Polls": "‘투표’ 에서 토론 고정 해제하기",
                "Discussion unpinned from Q&A": "‘질문과 답변’ 에서 토론 고정 해제하기",
                "Discussion unpinned from Show and tell": "‘공유 및 소개’ 에서 토론 고정 해제하기",
            "Pinned": "고정됨",
            "announced in": "발표함:",
            "started this conversation in": "이 대화를 시작함:",
            "asked this question in": "이 질문을 제기함:",
            "Maintainer": "유지 관리자",
            "Discussion options": "토론 옵션",
            "Category": "분류",
            "You are a maintainer on this repository.": "사용자님은 이 저장소의 유지 관리자예요.",
            "You are the author of this discussion.": "사용자님은 이 토론의 작성자예요.",
            // [/(\d+) answers?/, "$1 명의 답변자"],
            "Return to top": "맨 위로 돌아가기",
            // [/(\d+) comments?/, "$1 개의 댓글"],
            // [/(\d+) replies?/, "$1 개의 답글"],
            // [/(\d+) suggested answer/, "$1 개의 제안된 답변"],
            "Answered by": "답변한 사람:",
            "View full answer": "전체 답변 보기",
            "Oldest": "가장 오래된",
            "Newest": "최신",
            "Top": "상위",
            "Comment options": "댓글 옵션",
            "Events": "활동",
            "Marked": "표시됨",
            "an": "하나의",
            "Marked then unmarked an answer": "답변에 대해 표시 후 해제함",
            "Marked as answer": "답변으로 표시됨",
            "Mark as answer": "답변으로 표시하기",
            "Answer selected by": "답변 선택:",
            "Unmark as answer": "답변 표시 해제하기",
            "Answer": "답변",
            "This comment has been minimized.": "이 댓글은 최소화되었어요.",
            "This comment was marked as off-topic.": "이 댓글은 주제와 벗어난 것으로 표시되었어요.",
            "Show comment": "댓글 보이기",
            "Hide comment": "댓글 숨기기",
            // 댓글 숨김 대화상자
                "The reason will be displayed to describe this comment to others.": "이 댓글을 다른 사람에게 설명하기 위해 이유가 표시될 거예요.",
                "Learn more about hiding a comment": "댓글 숨기기에 대해 더 알아보기",
                "Choose a reason for hiding this comment": "이 댓글을 숨길 이유를 선택해 보세요.",
                "Unhide": "숨김 해제하기",
                "Choose a reason": "이유 선택하기",
                    "Abuse": "남용",
                    "Spam": "스팸",
                    "Off Topic": "주제 벗어남",
                    "Outdated": "구식",
                    "Duplicate": "중복",
                    "Resolved": "해결됨",
            // 숨김 댓글 해제
                "Unhide": "숨김 해제하기",
                "Unhide comment": "댓글 숨김 해제하기",
                "Are you sure you want to unhide this comment?": "이 댓글의 숨김을 해제하시겠어요?",
            // [/Show (\d+) previous repl(y|ies)/, "이전 $1개 답글 보이기"],
            // [/(\d+) hidden items?/, "$1 개의 숨김 항목"],
            "Load more…": "더 불러오기…",
            "New": "새로운",
            "Loading more replies...": "더 많은 답글 로딩 중...",
            "Remember, contributions to this repository should follow its": "기억해 주세요, 이 저장소에 대한 기여는",
            "Remember, contributions to this repository should follow our": "기억해 주세요, 이 저장소에 대한 기여는 우리",
            "code of conduct": "행동 강령",
            "contributing guidelines": "기여 가이드라인",
            // [/(\d+) new suggested answers?/, "$1 개의 새로운 제안 답변"],
            "Answer selected": "답변 선택됨",
            // 오른쪽 사이드바
            // /([\d,]+) participants?/, "$1 명의 참여자"
            "and others": "외에도",
            "Reopened": "다시 열림",
            "Closed as resolved": "해결됨으로 닫힘",
            "Change category": "분류 변경하기",
            "Converted from issue": "이슈에서 전환됨",
                // [/This discussion was converted from issue/, "이 토론은 이슈에서 전환되었습니다."],
            "Notifications": "알림 종류",
                "Subscribe": "구독하기",
                "Unsubscribe": "구독 해제하기",
                "You’re not receiving notifications from this thread.": "이 토론에서는 알림을 받지 않고 있어요.",
                "You’re receiving notifications because you’re watching this repository.": "이 저장소를 주시하고 있으므로 알림을 받고 있어요.",
                "You’re receiving notifications because you authored the thread.": "사용자님가 이 토론을 작성해서 알림을 받고 있어요.",
                "You’re receiving notifications because you’re subscribed to this thread.": "이 토론을 구독 중이어서 알림을 받고 있어요.",
                "You’re receiving notifications because you were mentioned.": "언급되었기 때문에 알림을 받고 있어요.",
                "You’re receiving notifications because you commented.": "댓글을 남기셔서 알림을 받고 있어요.",
                "You’re receiving notifications because you are watching pull requests on this repository.": "이 저장소의 끌어오기 요청을 주시하고 있으므로 알림을 받고 있어요.",
                "You’re receiving notifications because you are watching issues on this repository.": "이 저장소의 이슈를 주시하고 있으므로 알림을 받고 있어요.",
                "You’re receiving notifications because you modified the open/close state.": "열림/닫힘 상태를 변경하셨기 때문에 알림을 받고 있어요.",
                "You’re ignoring this repository.": "이 저장소를 무시 중이에요.",
            // 대화 잠금
            "Lock conversation": "대화 잠그기",
                "Are you sure you want to lock conversation on this discussion?": "이 토론의 대화를 잠그시겠어요?",
                "Other users": "다른 사용자들은",
                "can’t add new comments": "새 댓글을 추가할 수 없고",
                "to this discussion.": "이 토론에는",
                "You and other collaborators": "사용자님와 다른 협업자들은",
                "with access": "접근 권한이 있는",
                "to this repository": "이 저장소에서",
                "can still leave comments": "여전히 댓글을 남길 수 있어요.",
                "that others can see.": "다른 사람들이 볼 수 있도록요.",
                "You can always unlock this discussion again in the future.": "향후 언제든지 이 토론의 대화를 다시 열 수 있어요.",
                "This conversation has been locked and limited to collaborators.": "이 대화는 잠겨 있으며, 협업자들만 댓글을 달 수 있어요.",
            "Unlock conversation": "대화 잠금 해제하기",
                "Are you sure you want to unlock conversation on this discussion?": "이 토론의 대화 잠금을 해제하시겠어요?",
                "Everyone": "모든 사용자들이",
                "will be able to comment on this discussion once more.": "이 토론에 다시 댓글을 남길 수 있어요.",
                "You can always lock this discussion again in the future.": "향후 언제든지 다시 이 토론을 잠글 수 있어요.",
            "Transfer this discussion": "토론 전환하기",
                // 토론으로 이슈 전환 대화상자
                "Results are limited to top repositories, search to find more.": "결과가 상위 저장소로 제한되어 있어요. 더 찾으시려면 검색해 보세요.",
                "Move this discussion to another repository owned by": "이 토론을 소유하신 다른 저장소로 옮기기:",
                "Move this discussion to another repository you own.": "이 토론을 사용자님가 소유한 다른 저장소로 옮기기.",
                "Search repositories": "저장소 검색하기",
                "There aren't any eligible repositories that match your query.": "사용자님의 검색어와 일치하는 적합한 저장소가 없어요.",
                "There aren't any eligible repositories to transfer this discussion to.": "이 토론을 옮길 적합한 저장소가 없어요.",
                "Transfer discussion": "토론 전환하기",
            "Pin discussion": "토론 고정하기",
                "You can pin up to 4 discussions. They will appear publicly at the top of the discussions page.": "최대 4개의 토론을 고정할 수 있어요. 고정된 토론은 토론 페이지 상단에 공개돼요.",
                "Configure pinned discussion": "고정 토론 설정하기",
                    "Background": "배경색",
                    "Pattern": "패턴",
                "Pinning discussion…": "토론 고정 중…",
            "Edit pinned discussion": "고정 토론 편집하기",
            "Unpin discussion": "토론 고정 해제하기",
                "Are you sure you want to unpin this discussion?": "이 토론의 고정을 해제하시겠어요?",
                "The discussion itself won't be deleted, it just won't be shown prominently above the list of discussions.": "토론 자체는 삭제되지 않고, 단지 토론 목록 위에 눈에 띄게 표시되지 않을 뿐이에요.",
                // 상단 알림
                // [/Discussion \"([^ ]+)\" has been unpinned./, "토론 ‘$1’ 의 고정이 해제되었어요."],
            "Pin discussion to Announcements": "‘공지’ 에 토론 고정하기",
                "Pin this discussion to this category": "이 토론을 이 분류에 고정하기",
                    "This will pin this discussion to the top of the Announcements category.": "이렇게 하면 ‘공지’ 분류의 상단에 이 토론이 고정돼요.",
                    "Pin to Announcements": "‘공지’ 에 고정하기",
            "Pin discussion to General": "‘일반’ 에 토론 고정하기",
                    "This will pin this discussion to the top of the General category.": "이렇게 하면 ‘일반’ 분류의 상단에 이 토론이 고정돼요.",
                    "Pin to General": "‘일반’ 에 고정하기",
            "Pin discussion to Ideas": "‘아이디어’ 에 토론 고정하기",
                    "This will pin this discussion to the top of the Ideas category.": "이렇게 하면 ‘아이디어’ 분류의 상단에 이 토론이 고정돼요.",
                    "Pin to Ideas": "‘아이디어’ 에 고정하기",
            "Pin discussion to Polls": "‘투표’ 에 토론 고정하기",
                    "This will pin this discussion to the top of the Polls category.": "이렇게 하면 ‘투표’ 분류의 상단에 이 토론이 고정돼요.",
                    "Pin to Polls": "‘투표’ 에 고정하기",
            "Pin discussion to Q&A": "‘질문과 답변’ 에 토론 고정하기",
                    "This will pin this discussion to the top of the Q&A category.": "이렇게 하면 ‘질문과 답변’ 분류의 상단에 이 토론이 고정돼요.",
                    "Pin to Q&A": "‘질문과 답변’ 에 고정하기",
            "Pin discussion to Show and tell": "‘공유 및 소개’ 에 토론 고정하기",
                    "This will pin this discussion to the top of the Show and tell category.": "이렇게 하면 ‘공유 및 소개’ 분류의 상단에 이 토론이 고정돼요.",
                    "Pin to Show and tell": "‘공유 및 소개’ 에 고정하기",
            "Unpin discussion from this category": "이 분류에서 토론 고정 해제하기",
                "Are you sure you want to unpin this discussion from Announcements?": "‘공지’ 분류에서 이 토론의 고정을 해제하시겠어요?",
                "Are you sure you want to unpin this discussion from General?": "‘일반’ 분류에서 이 토론의 고정을 해제하시겠어요?",
                "Are you sure you want to unpin this discussion from Ideas?": "‘아이디어’ 분류에서 이 토론의 고정을 해제하시겠어요?",
                "Are you sure you want to unpin this discussion from Polls?": "‘투표’ 분류에서 이 토론의 고정을 해제하시겠어요?",
                "Are you sure you want to unpin this discussion from Q&A?": "‘질문과 답변’ 분류에서 이 토론의 고정을 해제하시겠어요?",
                "Are you sure you want to unpin this discussion from Show and tell?": "‘공유 및 소개’ 분류에서 이 토론의 고정을 해제하시겠어요?",
                "The discussion itself won't be deleted, it just won't be shown at the top of this category.": "토론 자체는 삭제되지 않고, 단지 이 분류의 상단에는 표시되지 않을 뿐이에요.",
            "Create issue from discussion": "토론에서 이슈 생성하기",
            "Delete discussion": "토론 삭제하기",
                "Delete discussion?": "토론 삭제하시겠어요?",
                "The discussion will be deleted permanently. You will not be able to restore the discussion or its comments.": "토론은 영구적으로 삭제되며, 복구할 수 없어요.",
                "Deleting discussion…": "토론 삭제 중…",
                // 상단 알림
                "The discussion was successfully deleted.": "토론이 성공적으로 삭제되었어요.",
            "The original post will be copied into a new issue, and the discussion will remain active.": "원본 게시물은 새 이슈로 복사되고, 토론은 활성 상태로 남아있어요.",
            "OK, got it!": "네, 알겠어요!",
            // 댓글 삭제 대화상자
                "Delete comment": "댓글 삭제하기",
                "Are you sure you want to delete this comment?": "이 댓글을 삭제하시겠어요?",
            // 하단 알림 (비로그인)
                "Sign up for free": "무료 가입하기",
                "to join this conversation on GitHub": "GitHub 에서 이 대화에 참여하려면",
                ". Already have an account?": " 이미 계정이 있으신가요?",
                "Sign in to comment": "로그인 후 댓글 달기",
        // 이슈를 토론으로 전환하기 /<user-name>/<repo-name>discussions/<id>?converting=<토론id>
            "This discussion is being migrated": "이 토론은 현재 전환 중이에요.",
                "The issue and any comments are still being copied to this discussion thread, please check back later.": "해당 이슈와 모든 댓글이 아직 이 토론에 복사되고 있으니, 나중에 다시 확인해 주세요.",
                "Refresh": "새로 고침",
        // /<user-name>/community/discussions
            // [/This is a ✨special✨ repository containing the organization level discussions for ([^ ]+). Everything posted here will also be visible at the organization level./, "이곳은 $1 의 조직 차원의 토론이 포함된 ✨특별한✨ 저장소예요. 여기 게시된 모든 내용은 조직 차원에서도 볼 수 있어요."],
            "View organization discussions": "조직 토론 보기",
        // 라벨 도우미 텍스트
            "This user is a collaborator on this repository.": "이 사용자는 이 저장소의 협업자예요.",
            "This user is a maintainer on this repository.": "이 사용자는 이 저장소의 유지 관리자예요.",
            "This user is the author of this discussion.": "이 사용자는 이 토론의 작성자예요.",
        // 토론 시작 버튼 위 안내 문구
            "I have done a": "제가 이미",
            "Reminder to": "기억해 주세요:",
            "search for similar discussions": "유사한 토론 검색하기",
        // 댓글 편집
            "Edited": "편집됨",
            "'s edit": "님의 편집",
        // 반응 관련
            "You can't vote on a locked discussion": "잠긴 토론에서는 투표할 수 없어요.",
            "Uh oh! You can't vote right now.": "앗, 지금은 투표할 수 없어요.",
    },
    "regexp": [ // 정규식 번역
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/(\d+) categories?/, "$1 개의 분류"],
        [/Congratulations, you've created the first discussion in ([^ ]+)!/, "축하해요, $1 에 첫 토론을 만드셨어요!"],
        [/(\d+) answers?/, "$1 명의 답변자"],
        [/(\d+) comments?/, "$1 개의 댓글"],
        [/(\d+) repl(y|ies)/, "$1 개의 답글"],
        [/(\d+) suggested answers?/, "$1 개의 제안된 답변"],
        [/(\d+) participants?/, "$1 명의 참여자"],
        [/Show (\d+) previous repl(y|ies)/, "이전 $1개 답글 보이기"],
        [/(\d+) hidden items?/, "$1 개의 숨김 항목"],
        [/Discussion \"([^ ]+)\" has been unpinned./, "토론 ‘$1’ 의 고정이 해제되었어요."],
        [/Edited (\d+) times?/,"$1 번 편집됨"],
        [/edited by ([^ ]+)/,"$1 에 의해 편집됨"],
        [/This is a ✨special✨ repository containing the organization level discussions for ([^ ]+). Everything posted here will also be visible at the organization level./, "이곳은 $1 의 조직 차원의 토론을 담은 ✨특별한✨ 저장소예요. 여기 게시된 모든 내용은 조직 차원에서도 볼 수 있어요."],
        [/Category \"(.*)\" has been created./, "분류 ‘$1’ 가 만들어졌어요."],
        [/Category \"(.*)\" has been updated./, "분류 ‘$1’ 가 업데이트되었어요."],
        [/Category \"(.*)\" has been deleted./, "분류 ‘$1’ 가 삭제되었어요."],
        [/Section \"(.*)\" has been created./, "섹션 ‘$1’ 이 만들어졌어요."],
        [/Section \"(.*)\" has been updated./, "섹션 ‘$1’ 이 업데이트되었어요."],
        [/Section \"(.*)\" has been deleted./, "섹션 ‘$1’ 이 삭제되었어요."],
        [/Edit (.*) category/, "‘$1’ 분류 편집하기"],
        [/Delete (.*) category/, "‘$1’ 분류 삭제하기"],
        [/Edit section (.*)/, "‘$1’ 섹션 편집하기"],
        [/Delete section (.*)/, "‘$1’ 섹션 삭제하기"],
        [/Delete (.*) section/, "‘$1’ 섹션 삭제하기"],
        [/(\d+) new suggested answers?/, "$1 개의 새로운 제안된 답변"],
        [/This discussion was converted from issue (#\d+) on (.+)/, "이 토론은 이슈 $1 ($2) 에서 전환되었어요."],
        [/(\d+) new comments?/, "$1 개의 새 댓글"],
        [/Show (\d+) more replies/, "나머지 $1개 답글 보이기"],
        [/(\d+) new/, "$1 개의 새"],
        [/Filter:\s*(Open|Closed|Locked|Unlocked|Answered|Unanswered)(?:,\s*(Open|Closed|Locked|Unlocked|Answered|Unanswered))*\s*/, function (all, stat) {
            var statKey = {Open: '열림', Closed: '닫힘', Locked: '잠김', Unlocked: '잠금 해제됨', Answered: '답변됨', Unanswered: '미답변', " ,": "，"};
            return '필터: ' + statKey[stat];
        }],
    ],
};
I18N["ko-KR"]["repository/orgs/discussions"] = I18N["ko-KR"]["repository/discussions"];
I18N["ko-KR"]["repository/actions"] = { // 저장소 - 작업 페이지
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 상단 알림
            "Actions Enabled.": "작업이 사용 중이에요.",

        // 분기 저장소 작업 페이지 알림
            "Workflows aren’t being run on this forked repository": "이 분기 저장소에서는 작업 흐름이 실행되고 있지 않아요.",
            "Because this repository contained workflow files when it was forked, we have disabled them from running on this fork. Make sure you understand the configured workflows and their expected usage before enabling Actions on this repository.": "저장소가 분기될 때 작업 흐름 파일을 포함하고 있었기 때문에 이 분기에서는 실행이 중지되었어요. 작업을 활성화하기 전에 구성된 작업 흐름과 그 사용 용도를 꼭 확인해 주세요.",
            "I understand my workflows, go ahead and enable them": "작업 흐름을 이해했어요. 작업 활성화를 진행할게요.",
            "View the workflows directory": "작업 흐름 디렉토리 보기",

        // 작업 흐름이 없는 경우
            "There are no workflow runs yet.": "아직 실행된 작업 흐름이 없어요.",

        // 새 작업 만들기 /<user-name>/<repo-name>/actions/new
            "Get started with GitHub Actions": "GitHub Actions로 시작해 보세요",
            "Choose a workflow": "작업 흐름 선택하기",
            "Build, test, and deploy your code. Make code reviews, branch management, and issue triaging work the way you want. Select a workflow to get started.": "코드를 빌드, 테스트, 배포해 보세요. 코드 리뷰, 분기 관리 및 이슈 분류를 원하는 방식으로 진행할 수 있어요. 시작하려면 작업 흐름을 선택해 주세요.",
            "Skip this and": "이 과정을 건너뛰고",
            "set up a workflow yourself": "직접 작업 흐름 구성하기",
            "Search workflows": "작업 흐름 검색하기",

            "Suggested for this repository": "이 저장소에 추천해 드려요",
            "Categories": "카테고리",
            "Configure": "설정하기",
            "Deployment": "배포",
            "Continuous integration": "지속적 통합",
            "Automation": "자동화",
            "Browse all categories": "모든 카테고리 보기",
                "Code scanning": "코드 스캔",
            "View all": "전체 보기",

            "Learn more about GitHub Actions": "GitHub Actions에 대해 더 알아보세요",
            "Getting started and core concepts": "시작하기와 핵심 개념",
            "New to Actions? Start here. Learn the core concepts and how to get started.": "GitHub Actions가 처음이세요? 여기서 시작해 보세요. 핵심 개념과 시작 방법을 배울 수 있어요.",
            "Configuring and managing workflows": "작업 흐름 구성 및 관리",
            "Create custom workflows to control your project's life cycle processes.": "프로젝트의 라이프 사이클을 관리할 수 있도록 사용자 정의 작업 흐름을 만들어 보세요.",
            "Language and framework guides": "언어 및 프레임워크 가이드",
            "Guides for projects written in many programming languages.": "다양한 프로그래밍 언어로 작성된 프로젝트를 위한 가이드에요.",

            "Didn't find what you're looking for?": "원하시는 내용을 찾지 못하셨나요?",
            "Fill out a 2-minute survey to request a new workflow template for GitHub Actions." :"새로운 작업 흐름 템플릿을 요청하기 위해 2분 설문에 응답해 주세요.",
            "Request": "템플릿 신청하기",

        // 새 작업 만들기 /<user-name>/<repo-name>/actions/new?category=xxxx
            // [/Found (\d+) workflows?/, "발견된 $1개의 작업 흐름"],

        // 작업 /<user-name>/<repo-name>/actions
            // 단축키
                "Go to usage": "활용으로 이동하기",
                "Go to workflow file": "작업 흐름 파일로 이동하기", // /actions/runs/<id>
                "Toggle timestamps in logs": "로그의 시간 표시 전환하기",
                "Toggle fullscreen logs": "전체 화면 로그 전환하기",
                "Exit fullscreen logs": "전체 화면 로그 종료하기",
                "Actions main view search bar": "작업 메인 화면 검색창",

            "Automate your workflow from idea to production": "아이디어부터 제품까지 작업 흐름을 자동화해 보세요",
            "GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub.": "GitHub Actions로 세계적 수준의 CI/CD와 함께 소프트웨어 작업 흐름을 간편하게 자동화할 수 있어요. GitHub에서 바로 코드를 빌드, 테스트, 배포해 보세요.",
            "Learn more about getting started with Actions.": "GitHub Actions 시작 방법에 대해 더 알아보세요.",
            "Linux, macOS, Windows, ARM, and containers": "Linux, macOS, Windows, ARM 및 컨테이너",
            "Hosted runners for every major OS make it easy to build and test all your projects. Run directly on a VM or inside a container. Use your own VMs, in the cloud or on-prem, with self-hosted runners.": "모든 주요 OS용 호스팅 실행기로 모든 프로젝트를 쉽고 빠르게 빌드 및 테스트할 수 있어요. 가상 머신 또는 컨테이너 내에서 직접 실행할 수 있으며, 클라우드나 온프레미스의 자체 가상 머신(자체 호스팅 실행기)도 사용해 보세요.",

            "Matrix builds": "매트릭스 빌드",
            "Save time with matrix workflows that simultaneously test across multiple operating systems and versions of your runtime.": "여러 운영체제와 런타임 버전에서 동시에 테스트할 수 있는 매트릭스 작업 흐름으로 시간을 절약해 보세요.",

            "Any language": "모든 언어",
            "GitHub Actions supports Node.js, Python, Java, Ruby, PHP, Go, Rust, .NET, and more. Build, test, and deploy applications in your language of choice.": "GitHub Actions는 Node.js, Python, Java, Ruby, PHP, Go, Rust, .NET 등을 지원해요. 원하는 언어로 애플리케이션을 빌드, 테스트, 배포해 보세요.",

            "Live logs": "실시간 로그",
            "See your workflow run in realtime with color and emoji. It’s one click to copy a link that highlights a specific line number to share a CI/CD failure.": "작업 흐름 실행 로그를 색상과 이모지와 함께 실시간으로 확인할 수 있어요. CI/CD 실패를 공유할 때 특정 줄 번호가 강조된 링크를 한 번의 클릭으로 복사할 수 있어요.",

            "Built-in secret store": "내장 비밀 저장소",
            "Automate your software development practices with workflow files embracing the Git flow by codifying it in your repository.": "저장소에 Git 플로우를 코드화하여 작업 흐름 파일로 소프트웨어 개발 방식을 자동화해 보세요.",

            "Multi-container testing": "다중 컨테이너 테스트",
            "Test your web service and its DB in your workflow by simply adding some": "일부",
            "docker-compose": "docker-컴포즈",
            "to your workflow file.": "를 작업 흐름 파일에 추가해서 웹 서비스와 데이터베이스를 테스트해 보세요.",

            // 왼쪽 사이드바
                "New workflow": "새 작업 흐름 만들기",
                "Management": "관리하기",
                    "Caches": "캐시",
                    "Deployments": "배포",
                    "Attestations": "증명서",
                    "Runners": "실행기",
                    "Usage metrics": "사용 지표",
                    "Performance metrics": "성능 지표",
                "Disabled": "사용 안 함",

                // 상단 알림
                    // [/Workflow (.*) pinned./, "작업 흐름 $1이(가) 고정되었어요."],
                    // [/Workflow (.*) unpinned./, "작업 흐름 $1이(가) 고정 해제되었어요."],

                // 고정 해제 대화상자
                    "Unpin this workflow?": "이 작업 흐름의 고정을 해제할까요?",
                        "This action will unpin the workflow for all viewers of this repository.": "이 작업은 이 저장소의 모든 사용자에게서 작업 흐름의 고정을 해제할 거예요.",
                    "Yes, unpin": "네, 고정 해제할게요",

            // 작업 흐름 파일이 없는 경우
            "Not found": "찾을 수 없어요",
                "This workflow does not exist.": "이 작업 흐름은 존재하지 않아요.",

            "All workflows": "전체 작업 흐름",
                "Show more workflows...": "더 많은 작업 흐름 보기...",
                "Showing runs from all workflows": "전체 작업 흐름의 실행 기록 보기",

            "Codespaces Prebuilds": "Codespaces 사전 빌드",
                "Showing all prebuild configuration runs for Codespaces. Learn about": "Codespaces의 모든 사전 빌드 구성 실행 기록을 보여드려요. 자세히 알아보기:",
                "prebuilding your codespaces.": "Codespaces 사전 빌드에 대해.",

            // 필터 바
                "Filter workflow runs": "작업 흐름 실행 필터링하기",
                    "Narrow your search": "검색 범위를 좁혀 보세요",

            // 피드백 알림
                "Help us improve GitHub Actions": "GitHub Actions 개선에 도움을 주세요",
                    "Tell us how to make GitHub Actions work better for you with three quick questions.": "세 가지 간단한 질문으로 GitHub Actions가 더 나은 서비스를 제공할 수 있도록 의견을 보내 주세요.",


            // [/(\d+) workflow runs?$/, "$1 개의 작업 흐름 실행"],
            // [/(\d+) workflow runs results/, "$1 개의 작업 흐름 실행 결과"],

            "Event": "이벤트",
                "Filter by Event": "이벤트로 필터링하기",
                "No matching events.": "일치하는 이벤트가 없어요.",
                //"Filter by event": "이벤트로 필터링하기",
                "Find an event": "이벤트 찾기",
                    "issue_comment": "이슈 댓글",
                    "pull_request": "끌어오기 요청",
                    "pull_request_target": "끌어오기 요청 대상",
                    "push": "푸시",
                    "schedule": "예약",
                    "Watch": "주시자",
                    "workflow_dispatch": "작업 흐름 수동 실행",
                    "repository_dispatch": "저장소 디스패치",
                    "dynamic": "동적",
            // 상태
                "Filter by Status": "상태로 필터링하기",
                "Find a status": "상태 찾기",
                    "queued": "대기 중",
                    "in progress": "진행 중",
                    "waiting": "대기 중",
                    "completed": "완료됨",
                    "neutral": "중립",
                    "success": "성공",
                    "failure": "실패",
                    "failed": "실패",
                    "cancelled": "취소됨",
                    "action required": "조치 필요",
                    "timed out": "시간 초과됨",
                    "skipped": "건너뛰었어요",
                    "stale": "오래됨",
                    "required action": "조치 필요",
            "branch": "분기",
                "Filter by Branch": "분기로 필터링하기",
                "Find a branch": "분기 찾기",
                "Default": "기본",
            "Actor": "역할",
                "Filter by Actor": "역할로 필터링하기",
                "Find a user": "사용자 찾기",

            // 로그 오른쪽 버튼
            "Cancel run": "실행 취소하기",
            "View workflow file": "작업 흐름 파일 보기",
            "Delete workflow run": "작업 흐름 실행 삭제하기",
                // 작업 흐름 실행 삭제 대화상자
                    "Are you sure you want to permanently delete this workflow run?": "이 작업 흐름 실행을 영구적으로 삭제하시겠어요?",
                    "This action cannot be undone.": "이 작업은 취소할 수 없어요.",
                    "Yes, delete this workflow run": "네, 이 작업 흐름 실행을 삭제할게요",
                // 상단 알림
                    "Workflow run deleted successfully.": "작업 흐름 실행이 성공적으로 삭제되었어요.",

            // 필터 결과
                "No results matched your search.": "검색하신 내용과 일치하는 결과가 없어요.",
                "You could search": "전체 작업 흐름 실행을 검색하거나",
                "all workflow runs": "모든 작업 흐름 실행",
                "or try different filters.": "다른 필터를 사용해 보세요.",

            // 리스트 영역
                // 작업 흐름 실행 상태
                "In progress": "실행 중",
                "Queued": "대기 중",
                "Pending": "보류 중",

            // 상단 알림
                "You have successfully requested the workflow to be canceled.": "작업 흐름 취소 요청이 성공적으로 접수되었어요.",

        // /<user-name>/<repo-name>/actions/workflows/<file>.yml
            // 오른쪽 상단 점 3개
                "Show workflow options": "작업 흐름 옵션 보기",
                    "Create status badge": "상태 배지 만들기",
                        // 대화상자
                            "Default branch": "기본 분기",
                                "Filter branches": "분기 필터링하기",
                            "Copy status badge Markdown": "상태 배지 Markdown 코드 복사하기",
                    "Pin workflow": "작업 흐름 고정하기",
                    "Disable workflow": "작업 흐름 사용 안 함",
                        // 상단 알림
                        "Workflow disabled successfully.": "작업 흐름이 성공적으로 사용 안 함으로 설정되었어요.",

            "This workflow has a": "이 작업 흐름은",
            "event trigger.": "이벤트 트리거가 있어요.",

            "Run workflow": "작업 흐름 실행하기",
                "Use workflow from": "작업 흐름 사용 위치:",
                "Branch:": "분기:",
                "Select branch": "분기 선택하기",
                "Select ref": "참조 선택하기",
                "Select a tag": "태그 선택하기",
                    "Nothing to show": "표시할 내용이 없어요",

                    "Workflow does not exist or does not have a": "작업 흐름이 존재하지 않거나",
                    "trigger in this branch.": "이 분기에 트리거가 없어요.",
                    "Learn more about manual workflows": "수동 작업 흐름에 대해 자세히 알아보세요",
                // 상단 알림
                    "Workflow run was successfully requested.": "작업 흐름 실행 요청이 성공적으로 접수되었어요.",

            "This scheduled workflow is disabled because there hasn't been activity in this repository for at least 60 days.": "이 예약 작업 흐름은 이 저장소에서 최소 60일 동안 활동이 없어서 사용 안 함 상태예요.",
            "This scheduled workflow is disabled because there hasn't been activity in this repository for at least 60 days. Enable this workflow to resume scheduled runs.": "이 예약 작업 흐름은 최소 60일 이상 활동이 없어서 사용 안 함 상태예요. 예약 실행을 재개하려면 작업 흐름을 활성화해 주세요.",
            "This scheduled workflow is disabled because scheduled workflows are disabled by default in forks.": "분기 저장소에서는 기본적으로 예약 작업 흐름이 사용 안 함 상태여서 이 예약 작업 흐름은 비활성화되었어요.",
            "This workflow was disabled manually.": "이 작업 흐름은 수동으로 사용 안 함 처리되었어요.",
            "This workflow is": "이 작업 흐름은 유지 관리자",
                "awaiting approval": "승인 대기 중이에요",
                "from a maintainer in": "의 유지 관리자에게서",
            "Enable workflow": "작업 흐름 활성화하기",
                // 상단 알림
                    "Workflow enabled successfully.": "작업 흐름이 성공적으로 활성화되었어요.",
            "Re-run jobs": "작업 재실행하기",
                "Re-running...": "재실행 중이에요...",

            // 재실행 대화상자
                "A new attempt of this workflow will be started, including": "이 작업 흐름의 새로운 실행 시도가 시작되며,",
                "all the jobs": "모든 작업을 포함하고",
                "all failed jobs": "실패한 작업 모두를 포함하며",
                "and dependents:": "종속 작업도 포함해요:",
                "debug logging": "디버그 로그",

            "This workflow has no runs yet.": "이 작업 흐름은 아직 실행된 적이 없어요.",

        // 캐시 /<user-name>/<repo-name>/actions/caches
            "Showing caches from all workflows.": "모든 작업 흐름의 캐시를 보여드려요.",
            "Learn more about managing caches.": "캐시 관리에 대해 더 알아보세요.",
            "Filter caches": "캐시 필터링하기",

            // [/(\d+) caches?/, "$1 개의 캐시"],
            "Sort": "정렬하기",
            "Sort by": "정렬 기준:",
                // 정렬 드롭다운 메뉴
                "Recently used": "최근 사용된 순",
                "Least recently used": "가장 오래된 사용 순",
                "Newest": "최신순",
                "Oldest": "오래된 순",
                "Largest size": "가장 큰 사이즈 순",
                "Smallest size": "가장 작은 사이즈 순",
            "No caches": "캐시가 없어요",
            "Nothing has been cached by workflows running in this repository.": "이 저장소에서 실행된 작업 흐름에서 캐시된 항목이 없어요.",
            "Learn more about caching": "캐시에 대해 더 알아보세요",
            "dependencies and build outputs to improve workflow execution time.": "의존성 및 빌드 산출물을 통해 작업 흐름 실행 시간을 단축할 수 있어요.",
            "Last used": "최근 사용 시각",

            // [/(\d+) cache results?/, "$1 개의 캐시 결과"],
            "No caches matched your search": "검색 결과와 일치하는 캐시가 없어요",
            // [/No caches matched your search branch:([^ ]+)/, "검색한 분기: $1과 일치하는 캐시가 없어요"],
            "Remove the filters": "필터 제거하기",
            "or try a different search query.": "또는 다른 검색어를 사용해 보세요.",

            "Delete cache": "캐시 삭제하기",
                "Remove cache": "캐시 삭제하기",
                "Are you sure you want to delete this cache?": "이 캐시를 삭제하시겠어요?",
                "This action cannot be undone": "이 작업은 취소할 수 없어요",
                "Yes, permanently delete this cache": "네, 이 캐시를 영구적으로 삭제할게요",

                "Deleting Cache...": "캐시 삭제 중이에요...",
                // 상단 알림
                "Cache deleted successfully.": "캐시가 성공적으로 삭제되었어요.",

        // 실행기 /<user-name>/<repo-name>/actions/runners
            "Runners available to this repository": "이 저장소에서 사용 가능한 실행기",
            "New runner": "새 실행기 만들기",
            "GitHub-hosted runners": "GitHub 호스팅 실행기",
                // [/(\d+) available runners?/, "$1 개의 사용 가능한 실행기"],
                "Larger GitHub-hosted runners": "더 큰 GitHub 호스팅 실행기",
                "New": "새로운",
                "Unprovisioned": "미설정",
                "Team & Enterprise": "팀 및 기업",
                "Sizes up to:": "최대 사이즈:",
                "Standard GitHub-hosted runners": "표준 GitHub 호스팅 실행기",
                "Ready-to-use runners managed by GitHub.": "GitHub에서 관리하는 바로 사용 가능한 실행기예요.",
                "Learn more about GitHub-hosted runners.": "GitHub 호스팅 실행기에 대해 더 알아보세요.",
                "Copy ubuntu-latest": "ubuntu-latest 복사하기",
                "Copy windows-latest": "windows-latest 복사하기",
                "Copy macos-latest": "macos-latest 복사하기",

                "View larger runner docs": "더 큰 실행기 문서 보기",
                "See pricing": "가격 보기",
            "Self-hosted runners": "자체 호스팅 실행기",
                "You don't have any": "이 저장소에는 아직",
                "self-hosted": "자체 호스팅 실행기가 없어요",
                "runners for this repository": "실행기",
                    "Self-hosted runners are virtual machines for GitHub Actions workflows that you manage and maintain outside of GitHub.": "자체 호스팅 실행기는 GitHub 외부에서 관리 및 유지하는 GitHub Actions 작업 흐름용 가상 머신이에요.",

        // /<user-name>/<repo-name>/actions/runs/<id>
            // 상단 알림
                "Logs deleted successfully.": "로그가 성공적으로 삭제되었어요.",

            // 제목
            "Re-run all jobs": "모든 작업 재실행하기",
            "Re-run failed jobs": "실패한 작업 재실행하기",
            "Cancel workflow": "작업 흐름 취소하기",

            //"Latest attempt": "마지막 실행",
            //"Attempt": "실행",
            "Explain error": "오류 설명하기",
            // 오른쪽 버튼
            "View workflow runs": "작업 흐름 실행 기록 보기",
            "Workflow run options": "작업 흐름 실행 옵션",
            "Delete all logs": "모든 로그 삭제하기",

            // 왼쪽 사이드바
            "Summary": "요약",
            "Jobs": "작업",
            "Run details": "실행 세부사항",
            "Usage": "활용",

            // 상태 표시줄
            "Triggered via pull request": "끌어오기 요청으로 실행됨",
            "Triggered via issues": "이슈로 실행됨",
            "Triggered via push": "푸시로 실행됨",
            "Triggered via schedule": "예약으로 실행됨",
            "Triggered via dynamic": "동적으로 실행됨",
            "Triggered via GitHub Pages": "GitHub 페이지로 실행됨",
            "Triggered via repository dispatch": "저장소 디스패치로 실행됨",
            "Re-run triggered": "재실행 트리거됨",
            "Manually triggered": "수동으로 실행됨",

            "pushed": "푸시됨",
            "opened": "열림",
            "reopened": "다시 열림",

            // 상태
                "Success": "성공",
                "Failure": "실패",
                "Startup failure": "시작 실패",
                "Cancelled": "취소됨",
                "Action required": "조치 필요",
            "Total duration": "총 소요 시간",
            "Billable time": "청구 시간",

            // 오른쪽 중간 영역
                "This workflow graph cannot be shown": "이 작업 흐름 그래프는 표시할 수 없어요",
                "A graph will be generated the next time this workflow is run.": "다음 실행 시 그래프가 생성될 거예요.",

                "This run and associated checks have been archived and are scheduled for deletion.": "이 실행 및 관련 검사들은 보관되어 있으며 삭제 예정이에요.",
                "Learn more about checks retention": "검사 보관 기간에 대해 더 알아보세요",

            "Artifacts": "산출물",
                "Produced during runtime": "실행 중 생성됨",
                "Name": "이름",
                "Size": "크기",
                // [/Delete artifact ([^ ]+)/, "산출물 $1 삭제하기"],
                "Expired": "만료됨",
                    "This artifact has expired and you can no longer download it": "이 산출물이 만료되어 더 이상 다운로드할 수 없어요",
            "Annotations": "주석",
                // [/1 error/, "$1개의 오류"],
                "Show more": "더 보기",
                "Show less": "간략히 보기",

        // /<user-name>/<repo-name>/actions/runs/<id>/job/<job-id>
            "The logs for this run have expired and are no longer available.": "이 실행의 로그가 만료되어 더 이상 볼 수 없어요.",

            "Started": "시작됨",
            "succeeded": "성공함",
            "ago": "전에",

            "Search logs": "로그 검색하기",
            "Re-run this job": "이 작업 재실행하기",
            // 설정 버튼
                "Show timestamps": "시간표시 보기",
                "Show full screen (Shift+F)": "전체 화면 보기 (Shift+F)",
                "Download log archive": "로그 압축 파일 다운로드하기",
                "View raw logs": "원시 로그 보기",

            "Try broadening your search filters.": "검색 필터 범위를 넓혀 보세요.",

            "Re-run all checks": "모든 검증 재실행하기",

        // /<user-name>/<repo-name>/actions/runs/<id>/usage
            "Run and billable time": "실행 및 청구 시간",
            "Learn about OS pricing on GitHub Actions": "GitHub Actions의 OS 가격에 대해 알아보세요",
            "Job": "작업",
            "Run time": "실행 시간",
            "Billable": "청구",
            "time": "시간",

        // /<user-name>/<repo-name>/actions/runs/<id>/workflow
            "Workflow file": "작업 흐름 파일",
            "Workflow file for this run": "이번 실행의 작업 흐름 파일",

        // 작업 패널
            "Show all jobs": "모든 작업 보기",
            "Scheduled": "예약됨",
            "Commit": "커밋",
                "pushed by": "푸시한 사람",
            "Manually run by": "수동 실행한 사람",
            "The run was canceled by": "실행이 취소됨 – 취소한 사람:",
            "Pull request": "끌어오기 요청",
                "synchronize by": "동기화한 사람",
                "opened by": "열은 사람",
                "reopened by": "다시 연 사람",
            "The operation was canceled.": "작업이 취소되었어요.",
            //"Process completed with exit code 1.": "프로세스가 종료되었습니다. (종료 코드 1)",
            "Cache not found": "캐시를 찾을 수 없어요",
            "Starting job": "작업 시작 중이에요",
            "This job failed": "이 작업이 실패했어요",
            "This job was skipped": "이 작업이 건너뛰어졌어요",
            "Waiting for pending jobs": "보류 중인 작업 대기 중이에요",
            "Input required and not supplied: token": "입력이 필요하지만 제공되지 않았어요: 토큰",
            "The deployment was rejected or didn't satisfy other protection rules.": "배포가 거부되었거나 다른 보호 규칙을 충족하지 않았어요.",
            "Fit to window": "창에 맞추기",
            "Zoom out": "축소하기",
            "Zoom in": "확대하기",

        // 요약 창
            "Unable to load summary": "요약을 불러올 수 없어요",
                // 오른쪽 상단 점 3개
                "View job logs": "작업 로그 보기",
                "View raw markdown": "원시 Markdown 보기",
                "Copy permalink": "영구 링크 복사하기",
    },
    "regexp": [ // 정규식 번역
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/Back to pull request (#\d+)/, "끌어오기 요청으로 돌아가기 $1"],
        [/Workflow (.*) pinned./, "작업 흐름 $1이(가) 고정되었어요"],
        [/Workflow (.*) unpinned./, "작업 흐름 $1이(가) 고정 해제되었어요"],
        [/Found (\d+) workflows?/, "발견된 $1개의 작업 흐름"],
        [/(\d+) workflow runs?$/, "$1개의 작업 흐름 실행"],
        [/(\d+) workflow runs? results?/, "$1개의 작업 흐름 실행 결과"],
        [/Download ([^ ]+)/, "다운로드 $1"],
        [/Delete ([^ ]+)/, "삭제 $1"],
        [/(\d+) errors?/, "$1개의 오류"],
        [/(\d+) cache results?/, "$1개의 캐시 결과"],
        [/(\d+) caches?/, "$1개의 캐시"],
        [/No caches matched your search branch:([^ ]+)/, "검색한 분기: $1과 일치하는 캐시가 없어요"],
        [/(\d+) available runners?/, "$1개의 사용 가능한 실행기"],
        [/(\d+)\/(\d+) jobs? completed/, "$1/$2개의 작업 완료됨"],
        [/(\d+) jobs? completed/, "$1개의 작업 완료됨"],
        [/(\d+) warnings?/, "$1개의 경고"],
        [/Latest attempt (#\d+)/, "마지막 실행 $1"],
        [/Latest (#\d+)/, "최신 $1"],
        [/Attempt (#\d+)/, "실행 $1"],
        [/cached/, "캐시됨"],
        [/(\d+)-cores · (\d+) GB RAM · (\d+) GB SSD Storage/, "$1 코어 · $2 GB 메모리 · $3 GB SSD 저장소"],
        [/Process completed with exit code (\d+)/, "프로세스가 종료되었으며, 종료 코드가 $1 이에요"],
        [/([^ ]+) value is not set/, "$1 값이 설정되지 않았어요"],
        [/([^ ]+) summary/, "$1 요약"],
        [/By ([^ ]+)/, "작성자: $1"],
        [/Branch "([^ ]+)" is not allowed to deploy to ([^ ]+) due to environment protection rules./, "환경 보호 규칙으로 인해 “$1” 분기는 $2 에 배포할 수 없어요."],
    ],
};
I18N["ko-KR"]["repository/runs"] = I18N["ko-KR"]["repository/actions"];

I18N["ko-KR"]["repository/deployments"] = { // 仓库 - 部署页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // /<user-name>/<repo-name>/deployments
            // 左侧栏
                "Deployed": "部署",
                    "All deployments": "所有部署",
                    "Environments": "环境",
                    "Manage environments": "管理环境",

            // 面板
                // 所有部署
                    "Latest deployments from pinned environments": "来自固定环境的最新部署",
                //具体某一项
                    "Latest deployments": "最新部署",
                    "Last": "最后",
                    "deployed": "部署于",
                // 中间面板
                    "Your search did not match any deployments": "您的搜索未匹配任何部署",
                    "Try a different search query": "尝试不同的搜索查询",

                // 筛选条
                    "Filter": "筛选",
                        "Filter deployments": "筛选部署",
                        // 搜索框菜单
                            "State": "状态",
                                "success": "成功",
                                "failure": "失败",
                                "error": "错误",
                                "inactive": "不活跃",
                                "pending": "待定",
                                "queued": "排队",
                                "in progress": "进行中",
                                "waiting": "等待中",
                            "Creator": "创建者",
                            "Environment": "环境",
                            "Ref": "引用",
                            "Text": "文本",

                    // 筛选器窗口
                        "Advanced filters": "高级筛选",
                        "Build complex filter queries": "建立复杂的筛选器查询",
                        "To start building your query add your first filter using the button below.": "要开始建立查询，请使用下面的按钮添加第一个筛选器。",

                        "Qualifier": "限定",
                        "Operator": "操作",
                            "is one of": "之中的",
                            "is": "是",
                        "Value": "值",
                            "Make a selection": "请选择",
                            "Select items": "请选择项目",
                            "Filter values": "筛选值",
                            "Enter search text": "键入任意文本",
                                "Me": "我",
                                "Signed-in user": "已登录用户",
                        "Add a filter": "添加筛选器",
                        "Apply": "반영하기",

                    // 关闭弹窗
                        "Discard changes?": "是否放弃更改？",
                            "You have unsaved changes. Are you sure you want to discard them?": "您有未保存的更改。您确定要放弃它们吗？",
                            "Keep editing": "继续编辑",
                            "Close and discard": "关闭并放弃",

                    //筛选器报错窗口
                        "Empty value for": "空值：",
                        "Text will be ignored since log searching is not yet available:": "由于尚未提供日志搜索功能，文本将被忽略：",

                // 列表
                    "Active": "活跃",
                    "Inactive": "不活跃",
                    "Abandoned": "废弃",
                    "Deployed to": "部署到",
                    "Failed to deploy to": "无法部署到",

                    "View logs": "查看日志",
                    "View workflow run": "查看工作流程运行",

        // /<user-name>/<repo-name>/deployments/activity_log?environment=github-pages
            "Deployments": "部署",
            "/ History": "/ 历史",

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/deployments?/, "部署"],
        [/Filter contains (\d+) issues?:/, "过滤器包含 $1 个问题："], // 过滤器报错窗口
        [/via/, "通过"],
    ],
};

I18N["ko-KR"]["repository/attestations"] = { // 仓库 - 证书页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // <user-name>/repo-name>/attestations 证书
            "Attestations": "证书",

            "No attestations": "尚无证书",
                "Create attestations using the": "创建证书，请使用",
                "action": "操作工作流",
    },
};

I18N["ko-KR"]["repository/watchers"] = { // 仓库 - 关注者页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 关注者页面  /<user-name>/<repo-name>/watchers
            "Watchers": "关注者",
            "No one’s watching this repository yet. You could be the first.": "暂无关注者。您可以成为第一个",
            "Learn more about how watching repositories works on GitHub": "了解更多关于如何在 GitHub 上关注仓库的工作方式",
    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        // [/Joined/,"加入于"], // 追星者，关注者页面
    ],
};

I18N["ko-KR"]["repository/stargazers"] = { // 仓库 - 追星者页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 追星者页面  /<user-name>/<repo-name>/stargazers
            "Stargazers": "追星者",
            "All": "全部",
            "You know": "您关注的",
            "Be the first to star this repository": "成为第一个为这个仓库加星标的人",
            "about how starring works on GitHub.": "关于如何在 GitHub 上加注星标。",
            "Be the first of your friends to star this repository.": "成为第一个为这个仓库加星标的朋友。",

        // /<user-name>/<repo-name>/stargazers/you_know
            "No one you follow has starred this repository yet.": "您关注的任何人都未星标此仓库。",
            "Learn more about how starring works on GitHub.": "了解更多关于在 GitHub 上星标的工作原理。",
    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        // [/Joined/,"加入于"], // 追星者，关注者页面
    ],
};

I18N["ko-KR"]["repository/new"] = { // 仓库 - 新建/编辑/上传/删除文件页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 新建文件页面 /<user-name>/<repo-name>/new/<branch>
            // 文件树侧边栏
                "Expand file tree": "展开文件树",
                "Collapse file tree": "折叠文件树",
                "Add file": "添加文件",
                // 搜索框
                    "Go to file": "转到文件",
                        "No matches found": "未找到匹配项",
                        "Go to folder": "转到文件夹",
                        "See all results": "查看所有结果",

            "Name your file...": "文件名...",
            "in": "在",

            "Cancel changes": "取消更改",
                "You have unsaved changes. Do you want to discard them?": "您有未保存的更改。您想丢弃它们吗？",
            "Commit changes...": "提交更改...",

            "Preview": "预览",
                "Loading preview…": "载入预览…",
                    "There is no content to preview.": "没有可预览的内容。",
                    "There has been an error generating the preview.": "生成预览时发生错误。",
                    "Unable to load this preview, sorry.": "抱歉，无法加载此预览。",
                    "There are no changes to show.": "没有要显示的更改。",
                    "But you can preview the whole file.": "但您可以预览整个文件。", // new code view

            // 代码编辑框
                // Copilot 广告
                    "Code 55% faster with GitHub Copilot": "使用 GitHub Copilot 编码速度提高 55%",
                        "Spend less time creating boilerplate and repetitive code patterns, and more time building great software. Try it in Codespaces or your favorite file editor.": "花更少的时间创建模板和重复的代码模式，花更多的时间构建优秀的软件。在 GitHub 代码空间或您最喜欢的文件编辑器中尝试一下哈。",
                        "Get GitHub Copilot": "获取 GitHub Copilot",
                        "Don't show again": "不再显示",

                "Indent mode": "缩进模式",
                    "Spaces": "空格",
                    "Tabs": "Tab",
                "Indent size": "缩进大小",
                "Line wrap mode": "换行模式",
                    "No wrap": "不换行",
                    "Soft wrap": "软换行",

            "Show Diff": "显示差异",

            // 提交对话框
                "Commit changes": "提交更改",
                    "There was an error committing your changes:": "在提交您的更改时出现错误：",
                    "A file with the same name already exists. Please choose a different name and try again.": "已存在同名文件。请选择其他名称并重试。",
                    "File could not be edited": "文件不能编辑",
                "Sign off and commit changes": "提交更改并签署",
                "Propose changes": "提出更改建议", // 向他人仓库提交
                "Sign off and propose changes": "提出更改建议并签署", // 向他人仓库提交
                    "Commit message": "提交信息",
                    "Extended description": "扩展描述",
                        "Add an optional extended description..": "添加描述.. (可选)",

                    "You are": "您将",
                    "signing off": "签署",
                    // [/on this commit as/,"该提交以"],

                    "You can’t commit to": "您不能提交到",
                    "because its is a": "，因为它是一个",
                    "protected branch": "受保护分支",

                    "Commit directly to the": "提交到",
                    "branch": "분기",

                    "Some rules will be bypassed by committing directly": "直接提交可以绕过一些规则",
                    "Bypass rules and commit changes": "绕过规则并提交更改",

                    "Create a": "创建",
                    "new branch": "新分支",
                    "for this commit and start a pull request": "为这个提交，并且发起一个拉取请求",
                    "Learn more about pull requests": "了解更多关于拉取请求的信息",

                "Something went wrong. Please fork the project, then try from your fork.": "出错了。请复刻该项目，然后从您的复刻处尝试。",

            // 底部栏
                "Use": "使用",
                "to toggle the": "切换",
                "key moving focus. Alternatively, use": "键移动对焦。或者使用",
                "then": "键，然后",
                "to move to the next interactive element on the page.": "键移动到页面上的下一个交互元素。",

            // 顶部提醒
            // [/Your license is ready. Please review it below and either commit it to the ([^ ]+) branch or to a new branch./, "您的许可证已准备就绪。请在下面审查它并将其提交到 $1 分支或新分支。"],

        // 编辑文件页面 /<user-name>/<repo-name>/edit/<branch>/<file>
            // 非本人仓库
                "You need to fork this repository to propose changes.": "您需要复刻此仓库以提出更改。",
                    "Sorry, you’re not able to edit this repository directly—you need to fork it and propose your changes from there instead.": "抱歉，您无法直接编辑此仓库——您需要将其复刻并从那里提出您的更改。",
                "Fork this repository": "复刻此仓库",
                    "Learn more about forks": "了解更多关于复刻的信息",

                "You have unsaved changes on this file that can be restored.": "您可以恢复该文件上未保存的更改。",
                    "Discard": "丢弃",
                    "Restore": "恢复",

                "You’re making changes in a project you don’t have write access to. Submitting a change will write it to a new branch in your fork": "您正在对没有写入权限的项目进行更改。提交更改会将其写入您的复刻",
                ", so you can send a pull request.": " 中的新分支，这样您就可以发送拉取请求。",

            // 复刻仓库过旧
                "Sorry, it looks like your fork is outdated!": "抱歉，您的复刻好像过时了！",
                "You’ll have to bring it up to date before you can propose changes.": "在提出修改意见之前，您必须对其进行更新。",
                "Update your fork": "更新您的复刻",

            // 组织仓库 编辑文件页面
                "You’re making changes in a project you don’t have write access to. We’ve": "您正在对没有写入权限的项目进行更改。我们已经",
                "created a fork of this project": "为该项目创建复刻",
                "for you to commit your proposed changes to. Submitting a change will write it to a new branch in your fork, so you can send a pull request.": "供您提交建议的更改。提交更改会将其写入复刻中的新分支，这样您就可以发送拉取请求。",

            // 混合换行符
                "We’ve detected the file has mixed line endings. When you commit changes we will normalize them to": "我们检测到该文件具有混合行结尾。当您提交更改时，我们会将它们标准化为",
                "Windows-style": "Windows 样式",

            // 与用户名同名仓库 编辑 README.md 文件
                "is a special repository: its": "是一个特殊的仓库：它的",
                "will appear on your profile!": "将出现在您的个人资料中！",

                "New": "新",
                "is now a special repository: its": "现在是一个特殊的仓库：它的",

            // 组织下.github 仓库 编辑 /profile/README.md 文件
                "is a special repository: this": "是一个特殊的仓库：这个",
                "will appear on your organization's profile!": "将出现在您的组织资料中!",

            // 编辑 .gitignore 文件
                "Choose .gitignore template": "选择 .gitignore 模板",
                    ".gitignore template": ".gitignore 模板",
                    "Filter…": "筛选…",
                    "None": "无",

            // 编辑 工作流程文件 .github/workflows/xxxx.yml
                "Collapse help panel": "折叠帮助面板",

                // 帮助面板侧边栏
                    "Search Marketplace for Actions": "搜索 Actions 市场",
                    "Featured Actions": "特色 Actions",
                    "Featured categories": "特色分类",
                        "Code quality": "代码质量",
                        "Monitoring": "监控",
                        "Continuous integration": "持续集成",
                        "Project management": "项目管理",
                        "Deployment": "部署",
                        "Project management": "项目管理",
                        "Testing": "测试",
                    "\/ Search results": "\/搜索结果",
                    "Browse all actions on the GitHub Marketplace": "浏览 GitHub 市场 上的所有 Actions",

                    // 具体某个操作
                        "View full Marketplace listing": "去市场查看详细信息", // 跳转去市场对应页面
                        "Installation": "安装",
                        "Copy and paste the following snippet into your": "将以下代码段复制并粘贴到您的",
                            "file.": "文件。",
                        "Version:": "版本：",

                // 底部栏补充
                    "Space": "空格",
                    "to trigger autocomplete in most situations.": "在大多数情况下将触发自动完成。",
                    "Documentation": "文档",

            // 编辑 LICENSE 许可证文件
                "Choose a license template": "选择许可证模板",

            // 编辑 이슈表单模板文件 .github/ISSUE_TEMPLATE/xxxx.yml
                // 顶部提示
                "Looks like this file is an issue template. Need help?": "此文件是一个이슈模板。需要帮助？",
                "Learn more about issue templates.": "了解更多关于이슈模板的信息。",
                "Give feedback.": "提交反馈。",
                // 右侧帮助说明
                "Top-level configuration options": "顶层配置选项",
                    "Required Fields": "必填项",
                        "(String): The template's name. Must be unique across all templates, including Markdown templates.": "（字符串）模板名。不能与其他模板名重复，包括 Markdown 模板",
                        "(String): A description of this template's intended use. This will be shown in the issue template chooser interface.": "(字符串）：该模板预期用途的说明。这将显示在이슈模板选择界面中。",
                    "Optional Fields": "可选项",
                        "(Array or String): This issue will be automatically assigned to these users. Can be array of usernames or comma-delimited string, e.g. \"monalisa,nat\"": "(数组或字符串）：此이슈将自动分配给这些用户。可以是用户名数组或以逗号分隔的字符串，例如 “monalisa,nat”。",
                        "(Array or String): This issue will automatically receive these labels upon creation. Can be array of labels or comma-delimited string, e.g. \"bug,needs-triage\"": "(数组或字符串）：该이슈在创建时将自动接收这些标签。可以是标签数组或以逗号分隔的字符串，例如 “bug,needs-triage”（错误，需要分流）。",
                        "(Array or String): This issue will be automatically added to these projects. Can be array of projects or comma-delimited string, e.g. \"github\/1,github\/2\"": "(数组或字符串）：该이슈将自动添加到这些项目中。可以是项目数组或以逗号分隔的字符串，如 “github\/1,github\/2”。",
                        "(String): Default title that will be pre-populated in the issue submission form.": "(字符串）：将在이슈表单中预填的默认标题。",
                        "(Array): Definition of user inputs.": "(数组）：用户输入的定义。",
                "Input type configuration options": "输入类型配置项",
                    // Markdown
                        "Markdown blocks contain arbitrary text that a maintainer can add to a template, to provide extra context or guidance to a contributor. Supports Markdown formatting. This text will": "Markdown 块包含任意文本，维护者可将其添加到模板中，为贡献者提供额外的上下文或指导。支持 Markdown 格式。这些文本",
                        "not be rendered in the submitted issue body": "不会在提交的이슈正文中呈现。",
                        // 必填项
                            "(String): The text that will be rendered. Markdown formatting is supported.": "(字符串）：将渲染的文本。支持 Markdown 格式。",
                        "Tip #1: YAML processing will cause the hash symbol to be treated as a comment. To insert Markdown headers, wrap your text in quotes.": "提示 1：YAML 处理会将哈希符号视为注释。要插入 Markdown 标题，请用引号将文本包起来。",
                        "Tip #2: For multi-line text, you can use the pipe operator.": "提示 2：对于多行文本，可以使用管道运算符。",
                        "Example": "示例",
                    "Input": "输入",
                        "Inputs are single-line form input fields. Contributors may use markdown formatting in their responses.": "输入为单行表单输入字段。贡献者可在回复中使用标记符格式。",
                        "Required Attributes": "必要属性",
                            "(String): A brief description of the expected user input.": "(字符串）： 预期用户输入的简要说明。",
                        "Optional Attributes": "可选属性",
                            "(String): Extra context or guidance about filling out this form input. Supports Markdown.": "(字符串）：有关填写此表单输入的额外上下文或指导。支持 Markdown。",
                            "(String): Renders as semi-transparent \"placeholder\" element in the input field when it's empty.": "(字符串）：当输入框为空时，渲染为半透明的 “placeholder”元素。",
                            "(String): Default text that is pre-populated in the input field.": "(字符串）：输入字段中预填的默认文本。",
                        // ID
                            "(String): Optional unique identifier. Can only contain alphanumeric characters,": "(字符串）：可选的唯一标识符。只能包含字母数字字符、",
                        "Validations": "验证",
                            "(Boolean): If": "(布尔值）：若",
                            ", the form will not be submittable until this is filled out. Only for public repositories.": "，则填写此信息后才能提交表格。仅适用于公共仓库。",
                    "Textarea": "文本区域",
                        "Very similar to inputs, textareas are multiple-line form input fields. Typically used if you'd like a contributor to provide an answer longer than a few words. Contributors may use markdown formatting in their responses.": "文本区域与输入非常相似，都是多行表单输入字段。如果希望贡献者提供长于几个单词的答案，일반会使用文本区域。贡献者可以在回复中使用标记符格式。",
                        // 可选属性
                            "(String): If a value is provided, user-submitted text will be formatted into a codeblock automatically.": "(字符串）：如果提供该值，用户提交的文本将自动格式化为代码块。",
                    "Dropdown": "下拉菜单",
                        "Users can select their answer from options defined by the maintainer.": "用户可以从维护者定义的选项中选择答案。",
                            "(String Array): Set of values that user can select from to answer. Cannot be empty, and all choices must be distinct.": "(字符串数组）：用户可从中选择回答的一组值。不能为空，且所有选择必须是不同的。",
                        // 可选属性
                            ", users can submit multiple selections.": "则用户可提交多选项。",
                        // 验证
                            ", the form will not be submittable until at least one choice is selected. Only for public repositories.": "则至少选择一个选项后才能提交表单。仅适用于公共仓库。",
                    "Checkboxes": "勾选框",
                    "A group of one or more checkboxes. This will be saved as a Markdown checkbox, and will continue to support interactive updating.": "由一个或多个复选框组成的组。这将被保存为 Markdown 复选框，并将继续支持交互式更新。",
                        "(Array): Set of values that user can select from to answer. Cannot be empty. Each item must have a": "(数组）：用户可从中选择回答的数值集合。不能为空。每个项目必须有一个",
                        ", described below.": "，如下所述。",
                    "Within each item in": "对于任何带",
                        ", the following fields are supported:": "元素则支持以下字段：",
                        "(String): The text that will appear beside the checkbox. Markdown is supported for bold or italic text formatting, and hyperlinks.": "(字符串）：复选框旁边显示的文本。Markdown 支持粗体或斜体文本格式以及超链接。",
                    "Optional": "可选",
                        "(Boolean): If required, the form will not be submittable unless checked. Only for public repositories.": "(布尔值）：如果需要，除非选中，否则表单将无法提交。仅适用于公共仓库。",

            // 查找工具栏
                "Find": "查找",
                "next": "下一处",
                "previous": "上一处",
                "all": "全部",
                "match case": "区分大小写",
                "regexp": "正则",
                "by word": "全字匹配",
                "Replace": "替换",
                "replace": "替换",
                "replace all": "全部替换",

        // 删除文件页面 /<user-name>/<repo-name>/delete/<branch>/<file>
            // 顶部提醒
            "File successfully deleted.": "文件已成功删除。",

        // 上传文件页面 /<user-name>/<repo-name>/upload/<branch>
            // 自有仓库
                "Drag files here to add them to your repository": "拖拽文件添加到当前仓库",
                "Drag additional files here to add them to your repository": "拖拽其他文件添加到当前仓库",
                "Or": "或",
                "choose your files": "选择文件",
                "Drop to upload your files": "拖拽上传您的文件",
                // 处理反馈
                "Yowza, that’s a big file. Try again with a file smaller than 25MB.": "我勒个擦，这么大的文件，单文件不得超过25MB",
                "Yowza, that’s a lot of files. Try again with fewer than 100 files.": "我勒个擦，这么多文件，一次不能超过100个",
                "This file is": "这个文件是",
                "empty": "空的",
                "Something went really wrong, and we can’t process that file.": "遇到错误，我们无法处理这个文件。",

                // 文件上传进度条
                "Uploading": "文件上传中",
                "of": "/",

                // 提交框 补充
                    "Add files via upload": "通过上传添加文件",
                    "Add an optional extended description…": "添加可选的扩展描述...",

                    "branch.": "分支。", // 上传页面
                    "for this commit and start a pull request.": "为这个提交，并且发起一个拉取请求。", // 上传页面
                    "Learn more about pull requests.": "了解更多关于拉取请求的信息。", // 上传页面

                // 提交后处理页面
                    "Processing your files…": "正在处理您的文件...",

            // 他人仓库
                "Uploads are disabled.": "上传功能已禁用。",
                "File uploads require push access to this repository.": "文件上传需要推送访问此仓库。",

        // new code view
            "Top": "顶部",
            "Jump to file": "跳转到文件",

    },
    "regexp": [ // 正则翻译
        [/on this commit as/,"该提交以"],
        [/Commit changes?/, "提交更改"], // 提交对话框
        [/Your license is ready. Please review it below and either commit it to the ([^ ]+) branch or to a new branch./, "您的许可证已准备就绪。请在下面审查它并将其提交到 $1 分支或新分支。"],
        [/Your search has returned (\d+) results?./, "您的搜索返回了 $1 条结果。"],
        [/First (\d+) files? shown./, "显示前 $1 个文件。"],
        ...I18N["ko-KR"]["repository-public"]["regexp"],
    ],
};
I18N["ko-KR"]["repository/edit"] = I18N["ko-KR"]["repository/new"];
I18N["ko-KR"]["repository/delete"] = I18N["ko-KR"]["repository/new"];
I18N["ko-KR"]["repository/upload"] = I18N["ko-KR"]["repository/new"];

I18N["ko-KR"]["repository/find"] = { //  仓库 - 查找文件页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // Find file 页面 /<user-name>/<repo-name>/find/<branch>
            "You’ve activated the": "您已激活",
            "file finder": "文件搜索模式",
            ". Start typing to filter the file list. Use": "。输入关键词查找您的文件。使用",
            "and": "그리고",
            "to navigate,": "选择文件",
            "to view files,": "查看文件",
            "to exit.": "返回。",

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
    ],
};

I18N["ko-KR"]["repository/wiki"] = { // 仓库 - wiki 页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // wiki 页面  /<user-name>/<repo-name>/wiki
            // [/Welcome to the ([^ ]+) wiki!/, "欢迎访问 $1 的 Wiki"], // wiki页面
            "You do not have permission to update this wiki.": "您无权更新此 wiki。",
            "Wikis provide a place in your repository to lay out the roadmap of your project, show the current status, and document software better, together.": "Wiki 为您的仓库提供了一个更好的文档资料。",
            "Create the first page": "创建第一个页面",

            // [/edited this page/, "编辑此页"], // wiki
            // [/(\d+) revisions?/, "$1 次修订"], // wiki
            "New page": "新建页面",
            "Add a custom footer": "添加自定义页脚",

            // 右侧栏
            "Pages": "页面",
                "Toggle table of contents": "折叠/展开目录",
                "Find a page…": "搜索页面…",
            "Add a custom sidebar": "添加自定义侧边栏",
            "Clone this wiki locally": "在本地克隆这个 Wiki",

            "Last updated": "最后更新",

        // 新建 wiki 页面 /<user-name>/<repo-name>/wiki/_new
            "Create new page": "创建新页面",
            "Title": "标题",
            "Write": "编辑",
            "Preview": "预览",
            "Edit mode:": "编辑模式：",
            "Edit message": "提交信息",

            "Write a small message here explaining this change. (Optional)": "在这里写一条小消息，解释这一变化。(可选)",
            "Save page": "保存页面",
            // 顶部提醒
                "Your Wiki was created.": "您的 Wiki 已创建。",

        // 编辑 wiki 页面 /<user-name>/<repo-name>/wiki/<page name>/_edit
            // [/Editing/, "编辑"], //编辑 wiki
            "Page history": "页面历史",
            "Delete page": "删除页面",
                "Are you sure you want to delete this page?": "您确定要删除此页面吗？",

            "Someone has edited the wiki since you started. Please reload this page and re-apply your changes.": "自您开始以来，有人编辑了 wiki。请重新加载此页面并重新应用您的更改。",

            // 顶部提醒
                "The wiki page was successfully deleted.": "Wiki 页面已成功删除。",

        // wiki页面历史 /<user-name>/<repo-name>/wiki/<page name>/_history
            "History": "历史",
            "Edit page": "编辑页面",
            "Revisions": "修订",
            "Compare revisions": "比较修订",
                "Invalid or empty diff.": "无效或无差异。",

        // wiki 编辑器（补全未翻译部分
            // 工具栏
                "Header 1": "1 级标题",
                "Header 2": "2 级标题",
                "Header 3": "3 级标题",

                "Image": "图片",
                    "Insert Image": "插入图片",
                        "Image URL": "图片 URL",
                        "Alt Text": "文本",

                "Unordered List": "无序列表",
                "Ordered List": "有序列表",
                "Blockquote": "整段引用",
                "Horizontal Rule": "水平规则",

                "Help": "帮助",
                    "Block Elements": "段落元素",
                        "Paragraphs & Breaks": "图表 & 段落",
                            "To create a paragraph, simply create a block of text that is not separated by one or more blank lines. Blocks of text separated by one or more blank lines will be parsed as paragraphs.": "要创建一个段落，只需创建一个没有一个或多个空行分隔的文本块即可。被一个或多个空行分隔的文本块将被解析为段落。",
                            "If you want to create a line break, end a line with two or more spaces, then hit Return/Enter.": "如果要创建换行符，请在行尾空两格或更多格，然后按 Return/Enter 键。",
                        "Headers": "标题",
                            // Markdown 支持两种标题格式。维基编辑器使用“atx”样式的标题。只需在标题文本前加上 # 字符数即可指定标题深度。例如：# 1 级标题，## 2 级标题 和 ### 3 级标题 的标题将逐渐变小。您可以用任意数量的#号结束标题。
                            "Markdown supports two header formats. The wiki editor uses the “atx”-style headers. Simply prefix your header text with the number of": "Markdown 支持两种标题格式。维基编辑器使用“atx”样式的标题。只需在标题文本前加上",
                            "characters to specify heading depth. For example:": "字符数即可指定标题深度。例如：",
                            "will be progressively smaller headers. You may end your headers with any number of hashes.": "的标题将逐渐变小。您可以用任意数量的#号结束标题。",
                        "Blockquotes": "整段引用",
                            // Markdown 通过在每行前加上 > 来创建电子邮件风格的 “楷体引号”。如果您决定硬包文本并在每行前加上 > 字符，这种方法看起来效果最好，但 Markdown 也支持在段落前加上 >。
                                "Markdown creates blockquotes email-style by prefixing each line with the": "Markdown 通过在每行前加上",
                                ". This looks best if you decide to hard-wrap text and prefix each line with a": "来创建电子邮件风格的 “楷体引号”。如果您决定硬包文本并在每行前加上",
                                "character, but Markdown supports just putting": "字符，这种方法看起来效果最好，但 Markdown 也支持在段落前加上",
                                "before your paragraph.": "。",
                        // 清单
                            // Markdown 支持有序和无序列表。要创建有序列表，只需在每行前加上一个数字（任何数字都可以，这就是编辑器只使用一个数字的原因）。要创建无序列表，可以在每行前加上 *、+ 或 -。
                                "Markdown supports both ordered and unordered lists. To create an ordered list, simply prefix each line with a number (any number will do — this is why the editor only uses one number.) To create an unordered list, you can prefix each line with": "Markdown 支持有序和无序列表。要创建有序列表，只需在每行前加上一个数字（任何数字都可以，这就是编辑器只使用一个数字的原因）。要创建无序列表，可以在每行前加上",
                                "or": "或",
                            // 列表项可以包含多个段落，但每个段落必须缩进至少 4 个空格或一个制表符。
                                "List items can contain multiple paragraphs, however each paragraph must be indented by at least 4 spaces or a tab.": "列表项可以包含多个段落，但每个段落必须缩进至少 4 个空格或一个制表符。",
                        "Code Blocks": "代码块",
                            "Markdown wraps code blocks in pre-formatted tags to preserve indentation in your code blocks. To create a code block, indent the entire block by at least 4 spaces or one tab. Markdown will strip the extra indentation you’ve added to the code block.": "Markdown 将代码块封装在预设格式的标签中，以保留代码块的缩进。要创建代码块，请将整个代码块缩进至少 4 个空格或一个制表符。Markdown 会去掉您添加到代码块中的额外缩进。",
                        "Horizontal Rules": "水平规则",
                            "Horizontal rules are created by placing three or more hyphens, asterisks or underscores on a line by themselves. Spaces are allowed between the hyphens, asterisks or underscores.": "横线规则是将三个或三个以上的连字符、星号或下划线单独放在一行中。连字符、星号或下划线之间允许有空格。",
                    "Span Elements": "引用元素",
                        "Links": "链接",
                            // Markdown 有两种链接类型：内联和引用。对于这两种类型的链接，您希望向用户显示的文本都放在方括号中。例如，如果您想让链接显示文本 “GitHub”，您可以写成 [GitHub]。
                                "Markdown has two types of links:": "Markdown 有两种链接类型：",
                                "inline": "内联",
                                "reference": "引用",
                                ". For both types of links, the text you want to display to the user is placed in square brackets. For example, if you want your link to display the text “GitHub”, you write": "。对于这两种类型的链接，您希望向用户显示的文本都放在方括号中。例如，如果您想让链接显示文本 “GitHub”，您可以写成",
                            // 要创建内嵌链接，请在括号后创建一组括号，并在括号内写入 URL。(例如，[GitHub](https://github.com/)）。内联链接允许使用相对路径。
                                "To create an inline link, create a set of parentheses immediately after the brackets and write your URL within the parentheses. (e.g.,": "要创建内嵌链接，请在括号后创建一组括号，并在括号内写入 URL。(例如，",
                                "). Relative paths are allowed in inline links.": "）。内联链接允许使用相对路径。",
                            // 要创建引用链接，请使用两组方括号。[[我的内部链接|内部引用]]将链接到内部引用。
                                "To create a reference link, use two sets of square brackets.": "要创建引用链接，请使用两组方括号。",
                                "will link to the internal reference": "将链接到",
                        "Emphasis": "强调",
                            // 星号（*）和下划线（_）被视为强调，并用 `<em>` 标签包裹，这在大多数浏览器中일반显示为斜体。双星号（**）或双下划线（__）被视为使用 `<strong>` 标签的粗体。要创建斜体或粗体文本，只需用单个/双个星号/下划线包裹您的单词。例如，**我的双重强调文本** 变成我的双重强调文本，*我的单一强调文本* 变成我的单一强调文本。
                                "Asterisks (": "星号（",
                                ") and underscores (": "）和下划线（",
                                ") are treated as emphasis and are wrapped with an": "）被视为强调，并用",
                                "tag, which usually displays as italics in most browsers. Double asterisks (": "标签包裹，这在大多数浏览器中일반显示为斜体。双星号（",
                                ") or double underscores (": "）或双下划线（",
                                ") are treated as bold using the": "）被视为使用",
                                "tag. To create italic or bold text, simply wrap your words in single/double asterisks/underscores. For example,": "标签的粗体。要创建斜体或粗体文本，只需用单个/双个星号/下划线包裹您的单词。例如，",
                                "becomes": "变成",
                                ", and": "，",
                        // 代码
                            // 要创建内联代码，只需用反标 (`) 将代码包起来即可。Markdown 会将 `myFunction` 变成 myFunction。
                                "To create inline spans of code, simply wrap the code in backticks (": "要创建内联代码，只需用反标",
                                "). Markdown will turn": ") 将代码包起来即可。Markdown 会将",
                                "into": "变成",
                        "Images": "图片",
                            // Markdown 的图像语法与链接语法很相似；基本上是相同的语法，前面加上一个感叹号（!）。例如，如果您想链接到 https://github.com/unicorn.png 网站上的图片，并使用另一文本 “我的独角兽”，您可以写成 ![My Unicorn](https://github.com/unicorn.png)。
                            "Markdown image syntax looks a lot like the syntax for links; it is essentially the same syntax preceded by an exclamation point (": "Markdown 的图像语法与链接语法很相似；基本上是相同的语法，前面加上一个感叹号（",
                            "). For example, if you want to link to an image at": "）。例如，如果您想链接到",
                            "with the alternate text": "网站上的图片，并使用另一文本",
                            ", you would write": "，您可以写成",
                    "Miscellaneous": "杂项",
                        "Automatic Links": "自动链接",
                            // 如果您想创建一个能显示实际 URL 的链接，markdown 允许您用 < 和 > 来快速封装 URL。例如，只要写入 <https://github.com/>，就能轻松创建 https://github.com/ 链接。
                            "If you want to create a link that displays the actual URL, markdown allows you to quickly wrap the URL in": "如果您想创建一个能显示实际 URL 的链接，markdown 允许您用",
                            "to do so. For example, the link": "来快速封装 URL。例如，创建链接",
                            "is easily produced by writing": "只需写入",
                        "Escaping": "忽略",
                            "If you want to use a special Markdown character in your document (such as displaying literal asterisks), you can escape the character with the backslash (": "如果您想在文档中使用特殊的 Markdown 字符（例如显示星号），可以用反斜杠 (",
                            "). Markdown will ignore the character directly after a backslash.": ") 来转义该字符。Markdown 将忽略反斜线后的字符。",
                            //"If you want to use a special Markdown character in your document (such as displaying literal asterisks), you can escape the character with the backslash (\). Markdown will ignore the character directly after a backslash.": "如果您想在文档中使用特殊的 Markdown 字符（例如显示星号），可以用反斜杠 (\) 来转义该字符。Markdown 将忽略反斜线后的字符。",

            // 底部
                "Attach files by dragging & dropping, selecting or pasting them.": "通过拖放、选择或粘贴来添加文件。",
                "Styling with Markdown is supported": "支持使用 Markdown 创建样式",

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/Welcome to the ([^ ]+) wiki!/, "欢迎访问 $1 的 Wiki"], // wiki页面
        [/edited this page/, "编辑此页"], // wiki
        [/(\d+) revisions?/, "$1 次修订"], // wiki
        [/Editing/, "编辑"], //编辑 wiki
        [/Could not find version "([^ ]+)"/, "找不到版本 “$1”"],
    ],
};

I18N["ko-KR"]["repository/branches"] = { // 仓库 - 分支页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 分支页面 branches  /<user-name>/<repo-name>/branches
            // 标签卡栏
            "Overview": "개요",
            "Yours": "您的",
            "Active": "活跃的",
            "Stale": "陈旧的",
            "All branches": "所有分支",
            "All": "所有",
            "branches": "분기",
            "New branch": "新建分支",
                // 创建分支对话框
                "Branch source": "源分支",
                    "Choose from this fork or its upstream repository.": "从此复刻或其上游仓库中进行选择。",
                    "Choose a source branch": "选择源分支",
                "Share feedback": "分享反馈",
            "Search branches…": "搜索分支…",
            "Copy branch name to clipboard": "复制分支名到剪切板",

            "Default branch": "默认分支",
            "Switch default branch": "切换默认分支",
            "View branch activity": "查看分支活动",
            "Default": "默认",

            // [/Your ([^ ]+) branch isn't protected/, "您的 $1 分支不受保护"],
            "Your": "您的",
            "branch isn't protected": "分支不受保护",
            "Protect this branch from force pushing or deletion, or require status checks before merging.": "保护此分支不被强制推送或删除，或在合并之前要求状态检查。",
            "Dismiss": "驳回",
            "Protect this branch": "保护该分支",

            "Updated": "更新于",
            "New pull request": "发起拉取请求",

                // 重命名分支对话框
                "Rename default branch": "重命名默认分支", // 重命名默认分支 标题
                "Rename this branch": "重命名分支", // 重命名其他分支 标题
                "Rename": "重命名",
                "to:": "为：",
                "Most projects name the default branch": "大多数项目将默认分支名为",
                "Renaming this branch:": "重命名此分支：",
                    // 该分支存在来自其他分支的拉取请求时
                        "Will update": "将更新",
                        "pull request targeting this branch.": "条针对该分支的拉取请求。",
                        "pull": "条拉取请求",
                        "request": " ",
                        "targeting this": "针对",
                        "branch.": "该分支。",
                        "branch protection rule that explicitly targets": "条分支保护规则明确针对",

                    // 该分支存在用于其他分支的拉取请求时
                        "Will close": "将关闭",
                        "open pull request for this branch.": "个该分支的拉取请求。",
                        "open pull": "个打开的拉取请求",
                        "for this branch.": "针对该分支。",

                    // 重命名 GitHub Pages 所在分支
                        "Will unpublish current GitHub Pages site.": "将取消当前发布的 GitHub Pages 站点。",
                            "Your current GitHub Pages site will become unpublished. A new commit on the renamed branch will publish the GitHub Pages site again.": "您当前的 GitHub Pages 站点将被取消发布。重命名分支上的新提交将再次发布 GitHub Pages 站点。",

                    "Will not update your members' local environments.": "不会更新您成员的本地环境。",
                "Renaming this branch will not update your members' local environments.": "重命名此分支不会更新您成员的本地环境。",
                    "Your members will have to manually update their local environments. We'll let them know when they visit the repository, or you can share the following commands.": "您的成员将不得不手动更新他们的本地环境。我们会在他们访问仓库时通知他们，或者您可以共享以下命令。",

                "Rename branch": "重命名分支",
                "Saving…": "保存中…",

                "Deleted": "已删除",
                // 删除分支后
                "Restore": "还原",
                "Deleted just now by": "刚刚被删除",

                // 删除对话框 仅当该分支存在拉取请求
                "The branch": "分支",
                // [/is associated with (\d+) open pull requests?:/, "与 $1 个拉取请求相关联："], // 分支页面
                "is associated with an open pull request:": "与 1 个拉取请求相关联：", // 分支页面
                "If you delete this branch, the pull request will be closed.": "如果您删除此分支，则拉取请求将被关闭。",
                "Are you sure you want to delete this branch?": "您确定要删除此分支吗？",

                // 顶部提醒
                // [/Branch ([^ ]+) will be renamed to ([^ ]+) shortly./,"分支 $1 将很快重命名为 $2。"], //分支重命名成功

            "Your branches": "您的分支",
            "You haven’t pushed any branches to this repository.": "您没有推送任何分支到该仓库。",
            "Active branches": "活跃的分支",
            "There aren’t any active branches.": "没有任何活跃的分支。",
            "Stale branches": "陈旧的分支",
            "There aren’t any stale branches.": "没有任何陈旧的分支。",
            "View more active branches": "查看更多活跃的分支",
            "View more stale branches": "查看更多陈旧的分支",

            // [/(\d+) commits? ahead, (\d+) commits? behind ([^ ]+)/, "领先 $1 个提交，落后 $2 个提交于 $3"],

            // 新版分支视图
                // 创建分支对话框
                "Create a branch": "创建分支",
                    "New branch name": "新分支名称",
                    "Source": "源分支",
                        "Switch branches": "切换分支",
                        "Find a branch...": "查找分支...",
                        "default": "默认",
                    "Create new branch": "创建新分支",

                "Search branches...": "搜索分支...",

                // 无匹配结果
                    "No branches": "没有分支",
                    "No branches match the search": "没有符合搜索条件的分支",

                "Check status": "检查状态",
                "Behind": "落后",
                "Ahead": "领先",
                "Pull request": "拉取请求",

                "Copy branch name to clipboard": "将分支名称复制到剪贴板",
                "This branch is protected by branch protections": "该分支受分支保护的保护",

                "Branch menu": "分支菜单",
                    "Activity": "活动",
                    "View rules": "查看规则",
                        "There are no rulesets associated with this branch.": "该分支没有相关的规则集。",

                "View more branches": "查看更多分支",

                // 底部提醒
                    "You can't delete this protected branch.": "您无法删除此受保护分支。",
                    "You can't delete the default branch.": "您不能删除默认分支。",

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/Your ([^ ]+) branch isn't protected/, "您的 $1 分支不受保护"],
        [/Rename default branch/, "重命名默认分支"],
        [/Rename branch/, "重命名分支"],
        [/Your branch name will be ([^ ]+)/, "分支将重命名为 $1"],
        [/Delete branch/, "删除分支"],
        // [/is associated with (\d+) open pull requests?:/, "与 $1 个拉取请求相关联："],
        [/Branch ([^ ]+) will be renamed to ([^ ]+) shortly./,"分支 $1 将很快重命名为 $2。"], //分支重命名成功
        [/(\d+) commits? ahead, (\d+) commits? behind ([^ ]+)/, "领先 $1 个提交，落后 $2 个提交于 $3"],
        [/(\d+) commits? behind ([^ ]+)/, "落后 $1 个提交于 $2"],
        [/(\d+) commits? ahead ([^ ]+)/, "领先 $1 个提交于 $2"],
        [/Ahead behind count: (\d+)/, "领先落后数：$1"],
    ],
    "selector": [ // 元素筛选器规则
        ["a[data-target='branch-filter.allFilter']", "所有分支"],
    ],
};

I18N["ko-KR"]["repository/activity"] = { // 仓库 - 活动页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 活动页面 /<user-name>/<repo-name>/activity
            "Activity": "活动",

            "All branches": "所有分支",
                "Switch branches": "切换分支",
                "Find a branch...": "查找分支...",
                "branches": "분기",
                "default": "默认",
                "View activity for all branches": "查看所有分支的活动",

            "All activity": "所有活动",
                "Direct pushes": "直接推送",
                "Pull request merges": "拉取请求合并",
                "Merge queue merges": "合并队列合并",
                "Force pushes": "强制推送",
                "Branch creations": "创建分支",
                "Branch deletions": "删除分支",

            "All users": "所有用户",
                "Find a user...": "查找用户...",
                "View activity for all users": "查看所有用户的活动",

            "All time": "所有时间",
                "Last 24 hours": "过去 24 小时",
                "Last week": "上星期",
                "Last month": "上个月",
                "Last quarter": "上季度",
                "Last year": "去年",


            "Showing oldest first": "显示最早的",
            "Showing most recent first": "显示最近的",

            "Compare changes": "比较变更",
            "Restore Branch": "恢复分支",

            "Previous": "이전",
            "Next": "다음",

            "Direct push": "直接推送",
            "Pull request merge": "拉取请求合并",
            "Force push": "强制推送",
            "Branch creation": "创建分支",
            "Branch deletion": "删除分支",

            "force pushed to": "强制推送到",
            "deleted": "删除",

            "Share feedback about this page": "分享关于此页面的反馈",

        // 活动页面 - 指定分支 /<user-name>/<repo-name>/activity?ref=<branch-name>
            "created this branch": "创建此分支",
            "deleted this branch": "删除此分支",
            "force pushed": "强制推送",

            "No activity matched your search.": "没有与您搜索相匹配的活动。",
            "Try expanding your search by selecting a different branch, activity type, user, or timeframe.": "尝试通过选择不同的分支、活动类型、用户或时间范围来扩大搜索范围。",

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/pushed (\d+) commits? to/, "推送 $1 个提交到"],
        [/pushed (\d+) commits?/, "推送 $1 个提交"],
    ],
};

I18N["ko-KR"]["repository/releases"] = { // 仓库 - 发行版页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 发行版 页面 /<user-name>/<repo-name>/releases
            "Releases": "릴리즈",
            // 无发行版时
            "There aren’t any releases here": "没有任何发行版",
            "You can create a release to package software, along with release notes and links to binary files, for other people to use. Learn more about releases in": "您可以创建一个发行版来打包软件，以及发行说明和二进制文件链接，供其他人使用。了解更多关于发行版的信息，查看",
            "our docs": "文档",
            "Releases are powered by": "发行版是指通过对仓库中",
            "tagging specific points of history": "特定历史点",
            "in a repository. They’re great for marking release points like": "进行标记来发布。用于发布的版本号类似",
            "Create a new release": "创建发行版",

            // 有发行版时
            "Draft a new release": "起草发行版",
            "Find a release": "搜索发行版",

                // 搜索未找到
                "No releases found": "无匹配结果",
            // 左侧栏
            "Pre-release": "预发行版",
            "Latest": "最新发行版",
            "Draft": "草案",

            "Compare": "对比",
                "Choose a tag to compare": "选择标签进行比较",
                "Find a tag": "搜索标签",
                "View all tags": "查看全部标签",

            "Read more": "阅读更多内容",
            "Contributors": "贡献者",
            "Assets": "资源",
            // [/Show all (\d+) assets?/, "显示所有 $1 个资产？"],

            "Join discussion": "加入讨论",

            // [/Edit: (.*)/, "编辑：$1"],
            // [/Delete: (.*)/, "删除：$1"],

        // 发行版 标签卡 /<user-name>/<repo-name>/tags
            "Create release": "创建发行版",
            "Edit release": "编辑发行版",

            "Toggle commit message": "显示/隐藏提交消息",

            "Notes": "说明",
            "Downloads": "下载",

            "Delete tag": "删除标签",
                // 删除标签 对话框
                    "Delete this tag?": "删除此标签？",
                    "This will delete the information for the tag": "这将删除标签信息",
                    "and cannot be undone.": "而且无法撤销。",
                    "Delete this tag": "删除此标签",

        // 某个发行版标签 /<user-name>/<repo-name>/releases/tag/<tag>
            // 不存在发行版时
            // "Create release": "创建发行版",
            "from tag": "来自该标签",
            // "Edit": "编辑",
            "release": "发行版",

            // "Read release notes": "阅读发布说明",
            // 状态词
            "released this": "发布于",
            "tagged this": "标记了",
            "drafted this": "起草了",

            // 删除标签对话框
            "Delete tag?": "删除标签？",
            "This will delete the information for this tag and cannot be undone.": "将删除该标签的所有信息，并且无法撤消。",
            "I understand, delete this tag": "我明白了，依然删除该标签",

            // 存在发行版时
            // 15 commits to master since this release

            "Delete release": "删除发行版",
            // 删除发行版对话框
            "Delete this release?": "删除该发行版？",
            // "This will delete the information for this release.": "这将会删除该发行版的信息。",
                "This will delete the information for the release": "这将删除该发行版信息：",
            "Delete this release": "删除发行版",

            // 顶部提醒框
            "Your tag was removed": "您的标签已删除",
            "Your release was removed": "您的发行版已删除",

        // 创建发行版 /releases/new 和 编辑发行版 /releases/edit/<tag>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            // 提醒条
            "This is a draft and won’t be seen by the public unless it’s published.": "这是一个草案，除非发布，否则不会被公众看到。",
            "Discard draft": "丢弃草案",

            "Choose a tag": "选择标签",
                "Find or create a new tag": "查找或创建新标签",
            "Target:": "目标：",
                "Pick a branch or recent commit": "选择分支或最近的提交",
                "Filter branches…": "筛选分支…",
                "Filter recent commits…": "筛选最近提交…",
                "Recent Commits": "最近提交…",
            "Choose an existing tag, or create a new tag on publish": "选择现有的标签，或在发布时创建新标签",
            "Choose an existing tag, or create a new tag when you publish this release.": "选择现有的标签，或在您发布这个版本时，创建新标签。",

            "Loading tag information…": "载入标签信息…",
            // 在筛选标签框输入 标签时
            "Create new tag:": "创建新标签：",
            "on publish": "发布时",
            // 输入结果
            "Duplicate tag name": "重复的标签名",
                "This tag already has release notes. Would you like to": "这个标签已经有发行说明。您是否愿意",
                "edit them?": "编辑它们？",
                "edit the existing notes": "编辑现有注释",
                "Existing tag": "已存在的标签",
            "Invalid tag name": "无效的标签名",
                "We weren’t able to create the release for you. Make sure you have a valid tag.": "我们无法为您创建发行版。请确保您有一个有效的标签。",
                "There was an error creating your Release: tag name can't be blank, tag name is not well-formed, published releases must have a valid tag.": "创建发行版时出错：标签名称不能为空，标签名称格式不正确，已发布的发行版必须有一个有效的标签。",
                "We can’t create a tag with this name. Take a look at the suggestions in the sidebar for example tag names.": "我们不能用这个名字创建标签。看看侧边栏的建议，看看标签名称的例子。",
            "Excellent! This tag will be created from the target when you publish this release.": "优秀! 当您发布这个版本时，这个标签将从目标创建。",

            "Release title": "发行版标题",

            "Previous tag:": "上一个标签：",
                "auto": "自动",
                "Select previous tag to compare": "选择上一个标签进行比较",
                    "Find previous tag": "筛选上一个标签",
            "Generate release notes": "生成发行版说明",
                "Select a valid tag to automatically add the Markdown for all the merged pull requests from this diff and contributors of this release": "选择一个有效的标签，以自动为该差异中的所有合并拉取请求和该版本的贡献者添加至 Markdown 说明",
                "Automatically add the Markdown for all the merged pull requests from this diff and contributors of this release": "自动为来自此差异和此发行版贡献者的所有已合并拉取请求，添加 Markdown 说明。",
                "Clear existing notes to automatically add the Markdown for all the merged pull requests from this diff and contributors of this release": "清除现有的注释，以自动添加来自此差异和此版本贡献者的所有合并的拉取请求的标记。",

                "There were no pull requests associated with the commits included in this release.": "此版本中没有与提交相关的拉取请求。",

            "Describe this release": "描述此发行版",

            // 编辑器按钮(老版)
                "Add heading text": "添加标题文本",
                "Add bold text, <Ctrl+b>": "添加粗体文本 <Ctrl+b>",
                "Add italic text, <Ctrl+i>": "添加斜体文本 <Ctrl+i>",
                "Add a quote, <Ctrl+Shift+.>": "添加引用 <Ctrl+Shift+.>",
                "Add code, <Ctrl+e>": "添加代码 <Ctrl+e>",
                "Add a link, <Ctrl+k>": "添加链接 <Ctrl+k>",
                "Add a bulleted list, <Ctrl+Shift+8>": "添加无序列表 <Ctrl+Shift+8>",
                "Add a numbered list, <Ctrl+Shift+7>": "添加有序列表 <Ctrl+Shift+7>",
                "Add a task list, <Ctrl+Shift+l>": "添加任务列表 <Ctrl+Shift+l>",
                "Directly mention a user or team": "直接提及用户或团队",
                "Reference an issue, pull request or discussion": "引用이슈，拉取请求或讨论",
                "Add saved reply": "添加快捷回复",
                    "Select a reply": "选择回复",
                        "Filter saved replies": "筛选快捷回复",
                        "Create a new saved reply": "创建新快捷回复",
                "Attach files by dragging & dropping, selecting or pasting them.": "通过拖拽、选择或粘贴来附加文件。",

            // 附加文件
            "Attach binaries by dropping them here or selecting them.": "拖拽文件到这来或选择它们来附加文件。",
            "Uploading your release now…": "正在上传到您的发行版…",
            "An attachment with that filename already exists.": "同名附件已经存在。",
            "Try a different file.": "请尝试不同的文件。",
            "We don’t support that file type.  try zipping it.": "我们不支持该文件类型，请尝试压缩它。",
            "Try another file.": "请尝试另一个文件。",
            "Yowza, that’s a big file.": "哟，这可是个大文件。",
            "Try again": "请尝试",
            "With a file smaller than 2GB.": "一个小于 2GB 的文件。",
            "This file is empty.": "这是一个空文件。",
            "with a file that’s not empty.": "一个非空的文件。",
            "Something went really wrong, and we can’t process that file.": "确实出了点问题，我们无法处理该文件。",
            "Try again.": "请重试。",

            // "Delete and try uploading this file again.": "删除并重新上传。",
            "Upload failed. Delete and try uploading this file again.": "上传失败。请删除并重新上传。",
            "will be deleted": "将被删除",
            "Remove": "删除",
            "Undo": "撤销",

            "Set as a pre-release": "设置为预发布版本",
                "This release is labeled as non-production ready.": "此版本标记为非正式版本。",
                "This release will be labeled as non-production ready": "此版本将被标记为非正式版本。",
            "Create a discussion for this release": "为此版本创建讨论",
                "People will be able to leave comments and reactions on this release using Discussions.": "人们将能够使用“讨论”对此版本发表评论和反应。",
                        "Category:": "类别：",
                            "Announcements": "公告",
                            "General": "일반",
                            "Ideas": "想法",
                            "Polls": "投票",
                            "Q&A": "问与答",
                            "Show and tell": "展示与讲述",
            "Set as the latest release": "设置为最新版本", //edit
                "This release is labeled as the latest for this repository.": "此版本将被标记为此仓库的最新版本。",
                "This release will be labeled as the latest for this repository.": "此版本将被标记为此仓库的最新版本。",

            "Publish release": "发布发行版",
                "Publishing…": "发布中…",
            "Update release": "更新发行版",
                "Updating…": "更新中…",
                "Saving release…": "保存中…",
            "Save draft": "保存草案",
            "Saved!": "已保存",
            "Saving draft failed. Try again?": "保存草案失败。请重试？",

            // 丢弃草案 对话框
            "Are you sure?": "您确定哇?",
            "This will delete the information for this draft.": "这将会删除该草案的信息。",
            "Delete this draft": "删除草案",

            // 右侧栏
            "Tagging suggestions": "标签建议",
            "It’s common practice to prefix your version names with the letter": "일반的做法是在版本名称前加上字母",
            ". Some good tag names might be": "。一些好的标签名称可能是",
            "If the tag isn’t meant for production use, add a pre-release version after the version name. Some good pre-release versions might be": "如果标签不是用于生产的，就在版本名后面加上预发布版本。一些好的预发布版本可能是",

            "Semantic versioning": "语义版本管理",
            "If you’re new to releasing software, we highly recommend to": "如果您是发布新手，我们强烈您",
            "learn more about semantic versioning.": "了解更多关于语义版本管理的信息。",

            "A newly published release will automatically be labeled as the latest release for this repository.": "新发布的版本将自动标记为该仓库的最新版本。",
            "If \'Set as the latest release\' is unchecked, the latest release will be determined by higher semantic version and creation date.": "如果未选中 “设置为最新版本”，则最新版本将由更高语义版本和创建日期确定。",
            "Learn more about release settings.": "了解更多关于发行版设置的信息。",

       // 创建 Action 发行版到市场 /releases/new?marketplace 和 编辑 /releases/edit/... >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "Release Action": "发布 Action",
                "Publish this release to the GitHub Marketplace": "将此版本发布到 GitHub 市场",
                "You must": "您必须",
                "accept the GitHub Marketplace Developer Agreement": "接受 GitHub 市场开发者协议",
                "before publishing an Action.": "在发布之前。",

                "Publish this Action to the GitHub Marketplace": "将此 Action 发布到 GitHub  市场",
                "Your Action will be discoverable in the Marketplace and available in GitHub search.": "您的 Action 将在市场中被发现，并可在 GitHub 搜索中找到。",

                "Your action.yml needs changes before it can be published.": "您的 action.yml 需要更改才能发布。",
                "Everything looks good! You have all the required information.": "一切看起来都不错！您拥有所有必需的信息。",

                "Name": "名称",
                    "- Name must be unique. Cannot match an existing action, user or organization name.": "- 名称必须唯一。不能与现有的操作、用户或组织名称相匹配。",
                "Description": "描述",
                "Icon": "图标",
                "Color": "颜色",

                "A README exists.": "已经存在 README 文件。",

                "Primary Category": "主要类别",
                    "Choose an option": "请选择",
                "Another Category": "其他分类",
                    "— optional": "— 可选",

        // 发行版评论
            "No significant changes": "无重大变化", // GitHub Action 生成的发行版

        // 反应相关
            "You reacted": "您表达看法",
            "All reactions": "所有看法", // Android UA

    },
    "regexp": [ // 正则翻译
        [/Show all (\d+) assets?/, "显示所有 $1 个资产"],
        [/(\d+) commits?/, "$1 个提交"],
        [/to ([^ ]+) since this release/, "在此发行版之后进入 $1 分支"],  // $1 分支在此发行版之后有 xxx 个提交
        [/This will delete the information for the release ([^ ]+)./, "这将删除发行版 $1 的信息。"],
        [/Toggle (.*)'s commit message/, "切换 $1 的提交消息"],
        [/Edit: (.*)/, "编辑：$1"],
        [/Delete: (.*)/, "删除：$1"],
        [/Remove attached binary ([^ ]+)/, "删除 $1"],
        [/and (\d+) other contributors/, "和另外 $1 个贡献者"],
        [/You and (\d+) others? reacted/, "您和另外 $1 人表达看法"],
        [/ and /, " 和 "],
        [/(\d+) (people|person) reacted/, "$1 人表达看法"],
        [/There are no releases containing \"([^ ]+)\"./, "没有发行版包含“$1”。"],
        ...I18N["ko-KR"]["repository-public"]["regexp"],
    ],
};
I18N["ko-KR"]["repository/tags"] = I18N["ko-KR"]["repository/releases"];

I18N["ko-KR"]["repository/packages"] = { // 仓库 - 软件包页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // /<user-name>/<repo-name>/packages
            "Get started with GitHub Packages": "开始使用 GitHub 软件包",
            "Safely publish packages, store your packages alongside your code, and share your packages privately with your team.": "安全地发布包，将您的包与您的代码一起存储，并与您的团队私下共享您的包。",
             "Choose a registry": "选择注册表",

            "A software platform used for building applications based on containers — small and lightweight execution environments.": "用于构建基于容器的应用的软件平台——小型轻量级执行环境。",
            "A default package manager used for the Java programming language and the Java runtime environment.": "用于 Java 编程语言和 Java 运行环境的一个默认包管理器。",
            "A free and open source package manager used for the Microsoft development platforms including .NET.": "一个自由和开源的开源包管理器，用于包括 .NET 在内的 Microsoft 开发平台。",
            "A standard format for distributing Ruby programs and libraries used for the Ruby programming language.": "分发用于 Ruby 编程语言的 Ruby 程序和库的标准格式。",
            "A package manager for JavaScript, included with Node.js. npm makes it easy for developers to share and reuse code.": "npm 是一个 JavaScript 的包管理器，包含在 Node.js 中。它使开发人员能够轻松地分享和重用代码。",
            "Containers": "容器",
            "A single place for your team to manage Docker images and decide who can see and access your images.": "为您的团队提供一个管理 Docker 镜像的单一场所，并决定谁可以看到和访问您的镜像。",

            "Package settings": "软件包设置",
            "Repository source": "仓库来源",
            "This is the repository where the package's source code is stored. This is defined in the repository's package.json file using the": "这是软件包源代码的仓库。这是在仓库中的 package.json 文件使用字段",
            "field.": "定义的。",
            "A GitHub repository has been identified as the source for this package. This package will be displayed in this repositories package list.": "GitHub 仓库已被确定为该软件包的来源，该软件包将显示在此仓库的软件包列表中。",
            "You have referenced a non-GitHub source for this package that cannot be verified.": "您引用了一个无法验证的非 GitHub 来源的软件包。",
            "Manage Actions access": "操作访问权限管理",
            "Add Repository": "添加仓库",
            "Pick the repositories that can access this package using": "选择可以访问此软件包的仓库，用于",
            "Role:": "角色:",
            "Choose role": "选择角色",
            "Change role": "更改角色",
            "Read": "只读",
            "Write": "编辑",
            "Admin": "管理",
            "Remove": "删除",
            "Actions repository access": "操作仓库访问",
            "Pick the repositories that can access this package using GitHub Actions.": "选择可以使用 GitHub Actions 访问此软件包的仓库。",
            "Permissions added for selected repositories.": "为选定的仓库添加了权限。",
            "Permissions updated for selected repositories.": "更新了选定仓库的权限。",
            "Can upload and download this package. Can read and write package metadata.": "可以上传和下载此软件包，并且可以读取和写入元数据。",
            "Can download this package and read package metadata.": "可以下载此软件包并读取元数据。",
            "Can upload, download, and manage this package. Can read and write package metadata. Can delete and restore packages.": "可以上传、下载和管理此软件包，可以读取和写入元数据，可以删除和恢复此软件包。",
            "Can upload, download, and manage this package. Can read and write package metadata. Can grant package permissions.": "可以上传、下载和管理此软件包，可以读取和写入元数据，可以授予软件包权限。",
            "Manage Codespaces access": "代码空间访问管理",
            "Codespaces repository access": "代码空间仓库访问",
            "Pick the repositories that can read this package using GitHub Codespaces.": "选择可以使用 GitHub 代码空间 读取此软件包的仓库。",
            "Pick the repositories that can read this package using": "选择可以读取此软件包的仓库，用于",
            "Inherited access": "继承访问",
            "Inherit access from source repository (recommended)": "从源仓库继承访问权限 (推荐)",
            "Go to": "转到",
            "to change access, or remove inherited access to manage it separately. Inherited access is recommended.": "的访问设置以更改访问权限，或删除继承的访问权限以单独管理它，建议使用继承访问权限。",
            "Danger Zone": "危险操作",
            "Change package visibility": "更改软件包可见性",
            "This package is currently public.": "该软件包当前是公开的",
            "This package is currently private.": "该软件包当前是私有的",
            "Change visibility": "更改可见性",
            "Delete this package": "删除软件包",
            "Once you delete a package, there is no going back. Please be certain.": "您一旦删除了软件包，将再也无法恢复，请确认！",
            "Manage access": "访问管理",
            "Invite teams or people": "邀请团队或人员",

        // 仓库链接对话框
            "Confirm you want to unlink this repository": "确认您要取消与此仓库的链接",
            "Yes, unlink this repository": "是的，取消链接此仓库",

        // 添加仓库对话框
            "Select repository that can access this package using GitHub actions": "选择可以使用 GitHub 操作访问此软件包的仓库",
            "Add repositories": "添加仓库",

        // 删除仓库对话框
            "Confirm you want to remove this repository": "确认要删除此仓库",
            "Once removed,": "删除后，",
            "will no longer have access to the": "将无法再访问",
            "package.": "软件包。",

        // 代码空间添加仓库对话框
            "Select repository that can access this package using GitHub codespaces": "选择可以使用 GitHub 代码空间访问此软件包的仓库",

        // 更改软件包可见性对话框
            "Make this package visible to anyone.": "使这个软件包对所有人都可见。",
            "Make this package visible privately, to organization members that have access.": "仅这个软件包有权访问的组织成员可见。",
            "Please type": "请输入",
            "to confirm:": "进行确认：",
            "I understand the consequences, change package visibility.": "我明白后果，依然更改软件包可见性",

        // 删除软件包对话框
            "Are you absolutely sure?": "您真的确定吗？",
            "Once this package is deleted, it will no longer be accessible.": "一旦删除了这个软件包，您将无法再访问它。",
            "This action will delete package": "此操作将删除软件包",
            ". Versions of this package will no longer be accessible, and it will not appear in searches or package listings.": "。此软件包的版本将不再可访问，并且不会出现在搜索结果或软件包列表中。",
            "I understand the consequences, delete this package": "我明白后果，依然删除这个软件包",

        // 更改仓库角色对话框
            "Select a new role": "选择新角色",
            "Recommended for non-code contributors who want to view or discuss your package.": "推荐给想要查看或讨论您的软件包的非代码贡献者。",
            "Recommended for contributors who actively push to your package.": "推荐给积极推送代码到您的软件包的贡献者。",

        // 更改成员角色对话框
            "Recommended for people who need full access to the package, including sensitive and destructive actions like managing security and package visibility.": "建议需要完全访问软件包的人员使用，包括管理安全性和软件包可见性等敏感和破坏性操作。",

        // 访问管理删除对话框
            "Confirm you want to remove this user": "确认删除该用户",

        // 邀请团队或人员对话框
            "Invite teams or people to": "邀请团队或人员参与",
            "Search by username, full name, or email": "搜索用户名、全名或电子邮件"
    },
    "regexp": [
        [/Are you sure you want to unlink (.*) from (.*)\?/, "您确定要取消 $1 与 $2 的链接吗？"],
        [/(\d+) repositor(y|ies) selected…/, "选中 $1 个仓库"],
        [/Change the role of (\d+) repositor(y|ies)\?/, "更改 $1 个仓库的角色？"],
        [/(\d+) repositor(y|ies)/, "$1 个仓库"],
        [/(\d+) members? selected…/, "选中 $1 个成员"],
        [/Change the role of (\d+) members?\?/, "更改 $1 个成员的角色？"],
        [/(\d+) members?/, "$1 个成员"],
        [/(.*)'s access settings/, "$1 访问设置"],
        [/Removed access from repository (.*)\./, "删除了仓库 $1 的访问权限。"],
        [/Removed (.*) as a package collaborator\./, "删除了 $1 作为软件包的协作者。"],

        // 删除仓库对话框
        [/Remove (.*) from (.*)/, "从 $2 中删除 $1"],

        // 更改仓库角色对话框
        [/Change (\d+) Roles?/, "更改 $1 个角色"],
    ],
}

I18N["ko-KR"]["repository/pkgs"] = { // 仓库 - 软件包
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository/packages"]["static"],

        // /<user-name>/<repo-name>/pkgs/container/<pag name>
            "Installation": "安装",
                "OS / Arch": "系统 / 架构",
                    "unknown/unknown": "未知/未知",
            "Learn more about packages": "了解更多关于软件包的信息",
            "Learn more about npm packages": "了解更多关于 npm 软件包的信息",
            "Install from the command line": "从命令行安装",
            "Install from the command line:": "从命令行安装：",
            "Install via package.json:": "通过 package.json 安装：",
            "Use as base image in Dockerfile:": "在 Dockerfile 中用作基础镜像：",
            "Recent tagged image versions": "最近被标记的映像版本",
            "latest": "最新",
            "Latest": "最新",
            // [/Published (.*) · Digest/, "发布于 $1 · 摘要"],
            "View all tagged versions": "查看所有被标记的版本",

            "Details": "详细信息",
                "stars": "星标",
            "Readme": "README",
            "Last published": "最新发布",
            "Total downloads": "总下载量",
            "Start a discussion": "开始讨论",
            "Contributors": "贡献者",
            "Open an issue": "打开一个이슈",
            "Package settings": "软件包设置",

            "Recent Versions": "最近版本",
            "View and manage all versions": "查看和管理所有版本",

            "Add a Readme to the linked repository": "添加一个 README 自述文件到链接的仓库",
            "The linked repository's Readme will be shown here.": "链接仓库中的 README 自述文件将在此处显示。",

        // 全部版本 /<user-name>/<repo-name>/pkgs/container/<pag name>/versions
            "All versions": "所有版本",
            // [/Published (*)/, "发布于 $1"],
            // [/(\d+) tagged/, "$1 个标记"],
            // [/(\d+) untagged/, "$1 个未标记"],

        // 某个版本 /<user-name>/<repo-name>/pkgs/container/<pag name>/<version id>
            "About this version": "关于这个版本",
            "Manifest": "清单",
            "No description provided": "未提供说明",
            "This package version was published": "此版本软件包发布于",

            "To provide a description, add the following line to your Dockerfile:": "要提供描述，请将以下行添加到您的 Dockerfile 中：",
            "For multi-arch images, set a value for the": "对于多架构镜像，请设置",
            "key in the": "值在",
            "field of the manifest:": "字段：",
            "Learn more about labelling container images": "了解更多关于标记容器镜像的信息",

            "Download activity": "下载活动",
                "Download activity of this version": "此版本的下载活动",
            "Last 30 days": "最近 30 天",
            "Last week": "最近一周",
            "Today": "今天",

            "Other tags on this version": "此版本的其他标签",
            "View all versions": "查看全部版本",

        // 版本删除对话框
            "Are you absolutely sure?": "您真的确定吗？",
            "This cannot be undone. This will permanently delete the version": "这个操作不能撤销，这将永久删除版本",
            "so users and processes won’t be able to download this version.": "，用户和程序将无法再下载该版本。",
            "Please type": "请输入",
            "to confirm:": "进行确认：",
            "I understand the consequences, delete this version": "我明白后果，依然删除此版本"
    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository/packages"]["regexp"],

        [/Published (.*) · Digest/, "发布于 $1 · 摘要"],
        [/Published (.*)/, "发布于 $1"],
        [/(\d+) tagged/, "$1 个标记"],
        [/(\d+) untagged/, "$1 个未标记"],
        [/(\d+) dependencies/, "$1 个依赖包"],
        [/(\d+) active/, "$1 个可用"],
        [/(\d+) deleted/, "$1 个已删除"]
    ],
};
I18N["ko-KR"]["packages"] = { // 软件包 - 未链接仓库的软件包
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository/pkgs"]["static"],

        "Link this package to a repository": "将此软件包链接到仓库",
        "By linking to a repository, you can automatically add a Readme, link discussions, and show contributors on this page.": "通过链接到仓库，您可以自动添加 README 自述文件、链接讨论、在此页面上显示贡献者。",
        "Connect Repository": "关联仓库",

        // 关联仓库对话框
        "Select a repository to link to this package.": "选择一个仓库以链接到此软件包。"
    },
    "regexp": [  // 正则翻译
        ...I18N["ko-KR"]["repository/pkgs"]["regexp"],
    ],
};

I18N["ko-KR"]["repository/security"] = { // 仓库 - 安全页面
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],

        // 安全标签卡 & 安全概述 /<user-name>/<repo-name>/security

            // 公共部分
            "Reporting": "报告",
                "Policy": "政策",
                "Advisories": "咨询",
            "Vulnerability alerts": "漏洞警报",
                "Code scanning": "代码扫描",
                "Secret scanning": "机密扫描",

            "Disabled": "禁用",
            "Enabled": "启用",
            "Needs setup": "需要设置",

            "Security overview": "安全概述",
            "Security policy •": "安全政策 •",
                "Define how users should report security vulnerabilities for this repository": "定义用户应如何报告此仓库的安全漏洞",

                "Suggest how users should report security vulnerabilities for this repository": "建议用户应如何报告此仓库的安全漏洞",
                "Suggest a security policy": "安全政策建议",

                "View how to securely report security vulnerabilities for this repository": "查看如何安全地报告此仓库的安全漏洞",
                "View security policy": "查看安全策略",

            "Security advisories •": "安全公告 •",
                "View or disclose security advisories for this repository": "查看或公开此仓库的安全公告",
                "View security advisories": "查看安全公告",
                "View security advisories for this repository": "查看此仓库的安全公告",

            "Private vulnerability reporting •": "私下漏洞报告 •",
                "Allow users to privately report potential security vulnerabilities": "允许用户私下报告潜在的安全漏洞",
                "Enable vulnerability reporting": "启用漏洞报告",
                "See reported vulnerabilities": "查看报告的漏洞",

            "Dependabot alerts •": "Dependabot 警报 •",
                "— Active": "— 激活",
                "Get notified when one of your dependencies has a vulnerability": "当您的一个依赖项存在漏洞时得到通知",
                "Enable Dependabot alerts": "启用 Dependabot 警报",
                "View Dependabot alerts": "查看 Dependabot 警报",

            "Code scanning alerts •": "代码扫描警报 •",
                "Automatically detect common vulnerability and coding errors": "自动检测常见漏洞和编码错误",
                "Set up code scanning": "设置代码扫描",
                // 私有库
                "Advanced Security is only available for Organizations": "高级安全只适用于组织",
                "Find out more": "了解更多",
                "Code scanning for private repositories is part of GitHub Advanced Security": "私有仓库的代码扫描是 GitHub 高级安全的一部分", //组织仓库
                "Contact sales": "联系销售", //组织仓库

            "Secret scanning alerts •": "机密扫描警报 •",
                "Get notified when a secret is pushed to this repository": "当机密被推送到仓库时得到通知",
                "Enable in settings": "在设置中启用",
                "View detected secrets": "查看检测到的机密",

            // "Vulnerability details": "漏洞详情",
            "High severity": "高风险",
            "Moderate severity": "中风险",
            "Low severity": "低风险",
            // "Create dependabot security update": "创建可靠的安全更新",

            "Suggest a policy": "建议政策",

        // 安全政策 /<user-name>/<repo-name>/security/policy
            "Set up a security policy": "制定安全政策",
            "Help your community understand how to securely report security vulnerabilities for your project.": "帮助您的社区了解如何安全地报告项目的安全漏洞。",
            "Start setup": "开始设置",

            "No security policy detected": "未检测到安全策略",
            "This project has not set up a": "该项目尚未设置",
            "file yet.": "文件。",

        // 安全公告 /<user-name>/<repo-name>/security/advisories
            "Security Advisories": "安全公告",
            "Privately discuss, fix, and publish information about security vulnerabilities in your repository's code.": "私人讨论，修复和发布仓库代码中的安全漏洞的信息。",
            "New draft security advisory": "新的安全建议草案",

            // [/(\d+) Draft/, "$1 项草案"],
            // [/(\d+) Published/, "$1 项已发布"],
            // [/(\d+) Closed/, "$1 项已关闭"],

            "There aren’t any triage security advisories": "没有任何安全建议通知",
            "There aren’t any draft security advisories": "没有任何安全建议草案",
            "There aren’t any published security advisories": "没有任何已发布的安全公告",
            "There aren’t any closed security advisories": "没有任何已关闭的安全公告",

            // 他人库
            "View information about security vulnerabilities from this repository's maintainers.": "查看仓库维护者提供的安全漏洞信息。",

        // Dependabot 警报 /<user-name>/<repo-name>/security/dependabot
            "Dependabot alerts": "Dependabot 警报",

            "Ignore the false alarms": "忽略误报",
            "To help you focus on the alerts that matter, Dependabot now proactively dismisses low impact alerts. These alerts may only have limited effects (e.g. long-running builds or tests) or are unlikely to be exploitable.": "为了帮助您专注于重要的警报，Dependabot 现在会主动消除低影响警报。这些警报可能只会产生有限的影响（例如长时间运行的构建或测试）或不太可能被利用。",
            "Opt out": "设置",
            "learn more about auto-dismissing alerts.": "了解更多关于自动撤消警报的信息。",

            "Auto-triage your alerts": "自动分类您的警报",
                "Control how Dependabot opens pull requests, ignores false positives and snoozes alerts. Rules can be enforced at the organization level. Free for open source and available for private repos through": "控制 Dependabot 如何打开拉取请求、忽略误报和推迟警报。规则可以在组织层面强制执行。免费供开源项目使用，私有仓库需要通过",
                "GitHub Advanced Security.": "GitHub 高级安全性。",
                "Learn more about auto-triage": "了解更多关于自动分类的信息",

            "opened": "打开于",

            "Dependabot alerts are disabled.": "Dependabot 警报已禁用。",
            "To receive Dependabot alerts, you must first enable Dependabot alerts in": "要接收 Dependabot 警报，必须首先启用 Dependabot 警报",
            "this repository’s settings": "在仓库的设置中",

            // "Tell us how to make Dependabot alerts work better for you with three quick questions.": "通过三个快速问题告诉我们如何让 Dependabot 警报更好地为您服务。",

            "Welcome to Dependabot alerts!": "欢迎使用 Dependabot 警报！",
            "Dependabot alerts track security vulnerabilities that apply to your repository's dependencies. As alerts are created, they’ll appear here.": "Dependabot 警报跟踪适用于仓库依赖项的安全漏洞。创建警报后，它们将显示在此处。",

            "Configure": "设置",
                "Manage repository vulnerability settings": "管理仓库漏洞设置",
                "Manage Dependabot rules": "管理 Dependabot 规则",
                "Manage account notification settings": "管理账户通知设置",

            "Closed as": "关闭",
                "Filter by resolution": "按决议筛选",
                "A fix has already been started": "修复已经开始",
                "No bandwidth to fix this": "没有带宽来修复",
                "Risk is tolerable to this project": "风险可承受",
                "This alert is inaccurate or incorrect": "此警报不准确或不正确",
                "Vulnerable code is not actually used": "漏洞代码实际未使用",
                "Fixed": "已修复",
                "fixed": "已修复",
                "Auto-dismissed": "自动忽略",
            "Package": "패키지",
                "Filter by package": "按软件包筛选",
                "Filter package": "筛选软件包",
            "Ecosystem": "生态系统",
                "Filter by ecosystem": "按生态系统筛选",
                "Filter ecosystem": "筛选生态系统",
            "Manifest": "清单",
                "Filter by manifest": "按清单筛选",
                "Filter manifest": "筛选清单",
                "All": "所有",
            "Severity": "严重等级",
                "Filter by severity": "按严重性筛选",
            "Sort": "排序",
                "Sort by": "排序方式",
                "Newest": "最新的",
                "Oldest": "最早的",
                "Most important": "最重要的",
                "Manifest path": "表现路径",
                "Package name": "包名称",

            "selected": "条被选中",
            "Dismiss alerts": "忽略警报",
                "Select a reason to dismiss": "选择忽略理由",

            "opened": "打开于",

            "There aren’t any open alerts.": "尚无任何打开的警报。",
            "There aren’t any closed alerts.": "尚无任何关闭的警报。",
            "As alerts are created, they’ll appear here.": "创建警报后，它们将出现在此处。",
            "As alerts are closed, they’ll appear here.": "关闭警报后，它们将出现在此处。",

            // 底部信息
            "surface known security vulnerabilities in some dependency manifest files.": "表面已知的安全漏洞在某些依赖性清单文件中。",
            "Dependabot security updates": "Dependabot 安全更新",
            "automatically keep your application up-to-date by updating dependencies in response to these alerts.": "通过响应这些警报更新依赖项，自动保持您的应用是最新的。",
            "Dependabot version updates": "Dependabot 版本更新",
            "can also help keep dependencies updated.": "也可以帮助保持依赖项的更新。",

            "ProTip!": "专业提示！",
                "See auto-dismissed alerts with": "要查看自动解除的警报，请使用",
                "to see alerts without an available fix.": "来查看没有可用修复程序的警报。",
                "Find alerts on your dev dependencies using": "使用以下命令查找开发依赖项的警报：",
                "to see alerts with calls to vulnerable functions.": "查看调用易受攻击函数的警报。",

         // 具体某条 Dependabot 警报 /security/dependabot/<id>
            "Dismiss alert": "忽略警报",

            "Opened": "打开",
            // [/Upgrade ([^ ]+) to fix/, "升级 $1 去修复"], // 某个 Dependabot 警报
            // [/Upgrade ([^ ]+) to version/, "升级 $1 到版本"], // 某个 Dependabot 警报
            "Create Dependabot security update": "创建 Dependabot 安全更新",

            // [/Dependabot cannot update ([^ ]+) to a non-vulnerable version/, "Dependabot 无法将 $1 更新为无漏洞的版本"],
            "The latest possible version that can be installed is": "最新可以安装版本是",
            "because of the following conflicting dependency:": "，但是存在以下冲突的依赖关系：",
            "because of the following conflicting dependencies:": "，但是存在以下冲突的依赖关系：",
            "The earliest fixed version is": "最早修复版本为",
            "Try again": "再试一次",
            "View logs": "查看日志",
            "Learn more about troubleshooting Dependabot errors": "了解更多关于排除 Dependabot 错误的信息",
            "about troubleshooting Dependabot errors": "关于排除 Dependabot 错误的信息",

            "Patched version": "补丁版本",

            "Impact": "影响",
            "Patches": "补丁",
            "Workarounds": "解决方法",
            "Workarounds / Mitigations": "解决方法/缓解措施",
            "References": "参考信息",
            "For more information": "更多信息",

            // [/Bump ([^ ]+) from ([^ ]+) to ([^ ]+)/, "将 $1 从 $2 升级到 $3"],
            "Merging this pull request would fix": "合并此拉取请求将修复",
            "Review security update": "审查安全更新",

            "opened this": "打开了这个",

            // 右侧栏
                "This score calculates overall vulnerability severity from 0 to 10 and is based on the Common Vulnerability Scoring System (CVSS).": "该分数以通用漏洞评分系统 (CVSS) 为基础，从 0 到 10 计算总体漏洞严重性。",
                "CVSS base metrics": "CVSS 基本指标",
                    "Attack vector": "攻击载体",
                        "More severe the more the remote (logically and physically) an attacker can be in order to exploit the vulnerability": "攻击者为了利用该漏洞，可以在远程（逻辑上和物理上）攻击时更严重",
                        "Network": "网络",
                        "Local": "本地",
                    "Attack complexity": "攻击复杂性",
                        "More severe for the least complex attacks": "当最不复杂的攻击时更严重",
                    "Privileges required": "所需权限",
                        "More severe if no privileges are required": "当不需要权限时更严重",
                        "None": "无",
                    "User interaction": "用户交互",
                        "More severe when no user interaction is required": "当不需要用户交互时更严重",
                        "Required": "必须",
                    "Scope": "范围",
                        "More severe when a scope change occurs, e.g. one vulnerable component impacts resources in components beyond its security scope": "当范围发生变化时更严重，例如一个易受攻击的组件会影响超出其安全范围的组件中的资源",
                        "Unchanged": "无变化",
                        "Changed": "已变化",
                    "Confidentiality": "保密性",
                        "More severe when loss of data confidentiality is highest, measuring the level of data access available to an unauthorized user": "当数据保密性损失最高时更为严重，衡量未授权用户可获得的数据访问级别",
                    "Integrity": "完整性",
                        "More severe when loss of data integrity is the highest, measuring the consequence of data modification possible by an unauthorized user": "当数据完整性损失最高时更为严重，衡量未授权用户可能修改数据的后果",
                    "Availability": "可利用性",
                        "More severe when the loss of impacted component availability is highest": "当受影响的组件可用性损失最高时更为严重",
                "Weaknesses": "缺陷",
                "Related alerts": "相关警报",
                "See advisory in GitHub Advisory Database": "请参阅 GitHub 咨询数据库中的咨询",
                "See all of your affected repositories": "查看您所有受影响的仓库",
                "See something to contribute?": "看到有什么可贡献的吗？",
                "Suggest improvements for this advisory on the GitHub Advisory Database.": "在 GitHub 咨询数据库上建议改进此咨询。",

            // 生成安全更新
                // 顶部提醒
                    // [/Started generating a security update for ([^ ]+)./, "开始为 $1 生成安全更新。"],
                // [/Creating a security update for ([^ ]+)/, "为 $1 创建安全更新"],
                "Dependabot is creating a security update to fix": "Dependabot 正在创建一个安全更新来修复",
                // [/(\d+) Dependabot alerts?/, "$1 个 Dependabot 警报"],
                // [/on ([^ ]+) in/, "关于 $1 在"],
                // [/Or, manually upgrade ([^ ]+) to version/, "或者，手动将 $1 升级到版本"],
                "or later. For example:": "或更高。例如：",

         // 具体某条Dependabot 警报 日志 /security/dependabot/<id>/update-logs/<id2>
            "Update logs": "更新日志",

        // 代码扫描器 /<user-name>/<repo-name>/security/code-scanning
            "Automatically detect vulnerabilities in your code.": "自动检测您代码中的漏洞。",
            "Code Scanning uses Actions to run the analysis. Enabling this feature will create a new workflow file. Learn more about": "代码扫描使用 Actions 来运行分析。启用此功能将创建一个新的工作流程文件。了解更多关于",
            "Code Scanning": "代码扫描",
            "Configure CodeQL alerts": "配置 CodeQL 警报",
            "Configure other scanning tools": "配置其他扫描工具",

            "Configure tools that integrate with Code Scanning to keep the quality of your code under control. Learn more about": "与代码扫描集成的配置工具，使您的代码质量得到控制。了解更多关于",
            "Configure scanning tool": "配置扫描工具",

        // 机密扫描警报 /<user-name>/<repo-name>/security/secret-scanning
            // 顶端窗口
            "Can you give us some feedback?": "您能给我们一些反馈意见吗？",
            "We want to better understand our users' needs and experiences.": "我们希望更好地了解用户的需求和体验。",
            "Book some time with us": "与我们预约时间，",
            "to discuss the GitHub secret scanning experience.": "讨论 GitHub 机密扫描体验。",

            "Secret scanning alerts": "机密扫描警报",
            "Secret scanning disabled": "机密扫描已停用",
                "To scan for secrets, you must first enable secret scanning in": "要扫描机密，您必须首先启用机密扫描在",
                "this repository's settings": "此仓库设置",

            // 关闭
                "Revoked": "已撤销",
                "False positive": "假阳性",
                "Used in tests": "仅测试",
                "Won't fix": "不会修复",
                "Ignored by configuration": "配置忽略",
                "Clear closure reasons": "全部",

            "Bypassed": "绕行",
                "True": "是",
            "Validity": "有效性",
                "Active": "活跃",
                "Inactive": "不活跃",
                "Unknown": "未知",
            "Secret type": "机密类型",
                "Service Providers": "服务提供商",
                "Custom Patterns": "自定义模式",
                "Filter by secret type": "按机密类型筛选",
                "Filter secret type": "筛选机密类型",
                "Nothing to show": "暂无",

            "Provider": "提供者",
                "Filter by provider": "按提供者筛选",
                "Filter provider": "筛选提供者",

            // 排序
                "Recently updated": "最近更新",
                "Least recently updated": "最早更新",

            "Clear current search query, filters, and sorts": "清除当前搜索查询、过滤器和排序",

            "No secrets found.": "没有发现任何机密",
            "Try": "尝试",
            "clearing filters": "清除过滤器",
            "to view all of this repository's secret alerts.": "以查看此仓库的所有机密警报。",
            "Your repository doesn't have any unresolved secrets.": "您的仓库没有任何未解决的机密。",

            // 具体某条信息 https://github.com/<user-name>/<repo-name>/security/secret-scanning/<id>
                "detected a": "检测到",
                    "secret": "机密",
                "Give us feedback": "提交反馈",

                "Close as": "关闭为",
                    "Select a close reason": "选择关闭原因",
                    "This secret has been revoked": "机密被撤销",
                    "This secret is not in production code": "机密不在生产代码中",
                    "This alert is not valid": "警报无效",
                    "This alert is not relevant": "警报无关",

                "Reopen alert": "重新打开",

                    "Close alert": "关闭警报",

                "Secret detected": "检测到",
                "Possibly active secret": "可能活跃",
                    "Copy token": "复制令牌",

                "Remediation steps": "补救措施",
                    "Follow the steps below before you close this alert.": "关闭此警报前，请按照以下步骤操作。",
                    "Rotate the secret if it's in use to prevent breaking workflows.": "如果正在使用，请轮换机密以防中断工作流程。",
                    "Revoke this": "撤销",
                    "through": "通过",
                    "to prevent unauthorized access.": "，以防止未经授权的访问。",
                    //"Revoke this Google API Key through Google to prevent unauthorized access.": "通过 Google 撤销此 Google API 密钥，以防止未经授权的访问。",
                    "Check security logs for potential breaches.": "检查安全日志，查找潜在漏洞。",
                    "Close the alert as revoked.": "关闭已撤销的警报。",

                // 检测到位置
                    "Preview unavailable": "预览不可用",
                    "This file is too large to show a preview": "文件过大，无法显示预览",

                    "Copy": "复制",
                        "to clipboard": "到剪切板",

                    "View file": "浏览文件",
                    "View git blame": "浏览 Git 追溯",

                // 状态词
                    "Loading": "加载中",
                    "opened this alert": "打开此警报",
                    "reopened this": "重新打开",
                    "closed this as": "将其关闭为",
                    "closed as": "关闭为",
                        "used in tests": "仅测试",
                        "won't fix": "不会修复",
                        "revoked": "忽略",
                        "false positive": "假阳性",
                    "closed this as completed in": "将其关闭为已完成",

                "hidden item": "条隐藏项目",
                "s": " ",
                "Load all...": "加载全部...",

        // 新建安全公告草案 /<user-name>/<repo-name>/security/advisories/new
            "Open a draft security advisory": "打开一个安全公告草案",
            "After the draft security advisory is open, you can privately discuss it with collaborators and create a temporary private fork where you can collaborate on a fix. If you've already fixed the vulnerability, just fill out the draft security advisory and then publish it.": "在安全公告草案打开后，您可以与协作者私下讨论，并创建一个临时的私有复刻，在那里您们可以协作进行修复。如果您已经修复了该漏洞，只需填写安全公告草案，然后发布即可。",

            "Advisory Details": "公告详情",
            "Title *": "标题 *",
            "CVE identifier": "CVE 标识符",
                "Request CVE ID later": "稍后请求 CVE ID",
                "I have an existing CVE ID": "我有一个现有的 CVE ID",
            "Description *": "描述 *",

            "Affected products": "受影响的产品",
            "Ecosystem *": "生态系统 *",
                "Don't see the ecosystem you're looking for? It may not be supported yet.": "没有看到您正在寻找的生态系统？可能还不支持。",
                "Select an ecosystem": "选择一个生态系统",
                "Go": "",
                "Other": "其他",
            "Affected versions": "受影响的版本",
            "Patched versions": "补丁版本",
            "Add another affected product": "添加另一个受影响的产品",

            // 严重等级
            "Pending selection": "待选择",

            "Select severity": "选择严重程度",
                "Low": "低风险",
                "Moderate": "中风险",
                "High": "高风险",
                "Critical": "关键风险",
                "Assess severity using CVSS": "使用 CVSS 评估严重程度",

            "Vector string": "矢量字符串",

            "Calculator": "计算器",
                "Learn more about CVSS scoring": "了解更多关于 CVSS 计分的信息",

                "Adjacent": "邻近",
                "Physical": "物理",

            "Common weakness enumerator (CWE)": "常见弱点枚举器 (CWE)",
                "Search by CWE": "按 CWE 搜索",

            "Credits": "用户",
                "Add a user by username, full name, or email": "通过用户名、全名或电子邮件添加用户",

            "Create draft security advisory": "创建安全公告草案",

            // 右侧栏
            "Access and visibility": "访问和可见性",
                "Until it is published, this draft security advisory will only be visible to the maintainers of": "在发布之前，此安全公告草案仅对以下的所有者可见",
                ". Other users and teams may be added once the advisory is created.": "。 其他用户和团队可以在咨询创建后加入。",
            "Once published, security advisories on public repositories are visible to everyone.": "一旦发布，公共仓库上的安全公告对所有人都是可见的。",
            "Once reviewed by GitHub, security advisories may be broadcast on the": "一旦通过 GitHub 的审查，安全公告就可以出现在",
            "GitHub Advisory Database": "GitHub 咨询数据库",
            ". They may also trigger Dependabot alerts to users that depend on this repository.": "。它们还可能向依赖此仓库的用户触发 Dependabot 警报。",

            "Security policy": "安全政策",
            "Glossary and documentation": "词汇表和文档",
            "Dependabot language support": "Dependabot 语言支持",
    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/([\d,]+) Triages?/, "$1 分类"],
        [/([\d,]+) Draft/, "$1 草案"],
        [/([\d,]+) Published/, "$1 发布"],
        [/([\d,]+) Open/, "$1 打开"],
        [/(#\d+) opened/, "$1 打开于"],
        [/([\d,]+) Closed/, "$1 关闭"],
        [/(#\d+) closed as/, "$1 关闭为"],
        [/(\d+) selected/, "$1 条被选中"],
        [/Detected in (\d+) locations?/, "在 $1 个位置检测到"],
        [/Detected in ([^ ]+)/, "在 $1 中检测到"],
        [/Upgrade ([^ ]+) to fix/, "升级 $1 去修复"], // 某个 Dependabot 警报
        [/Upgrade ([^ ]+) to version/, "升级 $1 到版本"], // 某个 Dependabot 警报
        [/Dependabot cannot update ([^ ]+) to a non-vulnerable version/, "Dependabot 无法将 $1 更新为无漏洞的版本"],
        [/Bump ([^ ]+) from ([^ ]+) to ([^ ]+)/, "将 $1 从 $2 升级到 $3"],
        [/Started generating a security update for ([^ ]+)./, "开始为 $1 生成安全更新。"],
        [/Creating a security update for ([^ ]+)/, "为 $1 创建安全更新"],
        [/(\d+) Dependabot alerts?/, "$1 个 Dependabot 警报"],
        [/on ([^ ]+) in/, "关于 $1 在"],
        [/Or, manually upgrade ([^ ]+) to version/, "或者，手动将 $1 升级到版本"],
        [/on (.+)/, "$1"],
        //[/Copy ([^/]\/(?:[^/]+\/)*[^/]+$) to clipboard/, "复制 $1 到剪切板"],
        [/Prototype Pollution in ([^ ]+)/, "$1 上游污染"],
    ],
};

I18N["ko-KR"]["repository/contribute"] = { // 仓库 - 贡献页面
    "static": { // 静态翻译

        // 贡献页面 /<user-name>/<repo-name>/contribute
            "Contribute to": "贡献于",
            "Make your first contribution to this repository by tackling one of the issues listed below.": "通过解决下面列出的一个이슈，为这个仓库做出您的第一个贡献。",
            "Each issue displayed here is a \"good first issue,\" selected for its relative approachability for first-time contributors.": "此处显示的每个이슈都是 “好的首发이슈”，因其对首次贡献者来说相对容易。",

            "Read the contributing guidelines": "阅读贡献指南",

            "Good first issues": "好的首发이슈",
            "See all issues": "查看所有이슈",

            "This repo doesn't have any good first issues, yet": "该仓库暂无任何好的首发이슈",
            "Once its maintainers label issues and pull requests for new contributors, they will begin to appear here.": "一旦它的维护者为新的贡献者标记了이슈和拉取请求，它们就会开始出现在这里。",
            "All issues in this repository": "此仓库中的所有이슈",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N["ko-KR"]["repository/subscription"] = { // 仓库 - 通知状态页面
    "static": { // 静态翻译

        // 仓库通知状态管理 /<user-name>/<repo-name>/subscription
            "Your": "您的",
            "notifications status": "通知状态",
            "A notification is created every time someone discusses something inside of the repository — Pull Requests, Issues, Comments, and Commit discussions. Whether you are watching the repository, not watching it, or ignoring it determines which notifications you receive.": "每当有人在仓库内讨论什么，比如拉取请求、이슈、评论和提交讨论，都会产生一个通知。无论您是关注仓库、不关注还是忽略它，都决定了您会收到哪些通知。",
            "Not watching": "不关注",
                "You will only receive notifications when you participate or are @mentioned.": "只有当您参与或被 @您 时，您才会收到通知。",
            "Releases only": "仅发行版",
                "You will only receive notifications for new releases, or when you participate or are @mentioned.": "您只会收到新版本的通知，或者当您参与或被 @您 时。",
            "Watching": "关注",
                "You will receive all notifications for this repository.": "您将收到此仓库的所有通知。",
            "Ignored": "忽略",
                "You will not receive any notifications for this repository.": "您将不会收到有关此仓库的任何通知。",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N["ko-KR"]["repository/invitations"] = { // 仓库 - 接受邀请页面
    "static": { // 静态翻译

        // 接受邀请 /<user-name>/<repo-name>/invitations
            "invited you to collaborate": "邀请您进行协作",
            "invited you to collaborate on": "邀请您进行协作",
            "Accept invitation": "接受邀请",
            "Decline": "拒绝",
            "Decline invitation": "拒绝",
            "Owners": "所有者",
            "Your public profile information": "您的公开个人资料信息",
            "Certain activity": "某些活动",
            "within this repository": "在这个仓库中",
            "Country of request origin": "请求来源国家/地区",
            "Your access level for this repository": "您对该仓库的访问等级",
            "Your IP address": "您的 IP 地址",
            "Is this user sending spam or malicious content?": "此用户是否发送垃圾邮件或恶意内容？",

    },
    "regexp": [ // 正则翻译
        [/of ([^ ]+) will be able to see:/, "$1 将能够看到："], // 邀请页
        [/Block ([^ ]+)/, "拉黑 $1"],
    ],
};


// 洞察 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

I18N["ko-KR"]["repository-insights-menu"] = { // 仓库 -> 洞察 - 公共部分
    "static": { // 静态翻译
        // 公共部分
            // 左侧菜单
            "Pulse": "统计",
            "Contributors": "贡献者",
            "Community": "社区",
            "Community Standards": "社区准则",
            "Traffic": "流量",
            "Commits": "提交",
            "Code frequency": "代码频率",
            "Dependency graph": "依赖关系图",
            // "Punch card": "时刻",
            "Network": "网络",
            // "Members": "成员",
            "Forks": "复刻",
            "Actions Usage Metrics": "操作使用情况",
            "Actions Performance Metrics": "操作数据看板",

            "People": "成员", //组织仓库

            // 私有库禁用部分功能的提醒
            "Upgrade to GitHub Pro or make this repository public to enable this feature.": "升级到 GitHub Pro 或将此仓库设为公开以启用此功能。",
            // 他人私有库
            "Contact an administrator to upgrade to GitHub Team or make this repository public to enable this feature.": "请联系管理员升级到 GitHub 团队或将此设为仓库公开以启用此功能。",

            "We want to know how these insights are helping you and where they could be improved.": "我们想知道这些洞察如何帮助您，以及在哪些方面可以改进。",
            "Give us your feedback": "向我们提供反馈意见",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N["ko-KR"]["repository/pulse"] = { // 仓库 -> 洞察 - 统计
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],

        // 统计 /<user-name>/<repo-name>/pulse
            "Period:": "周期：",
                "Filter activity": "筛选活动",
                "24 hours": "24 小时",
                "3 days": "3 天",
                "1 week": "1 周",
                "1 month": "1 个月",
            "Active pull request": "活跃的拉取请求",
            "Active pull requests": "活跃的拉取请求",
            "Active issue": "活跃的이슈",
            "Active issues": "活跃的이슈",
            "Merged pull request": "合并的拉取请求",
            "Merged pull requests": "合并的拉取请求",
            "Open pull request": "打开的拉取请求",
            "Open pull requests": "打开的拉取请求",
            "Closed issue": "关闭的이슈",
            "Closed issues": "关闭的이슈",
            "New issue": "新이슈",
            "New issues": "新이슈",

            "Excluding merges,": "不包括合并，",
            // [/(\d+) authors?/, "$1 位作者"],
            "have pushed": "推送了",
            "has pushed": "推送了",
            "commit": "次提交",
            "commits": "次提交",
            // [/to ([^ ]+), and/, "到 $1 分支和"],
            // [/to all branches. On ([^ ]+),/, "到全部分支。在 $1 分支，"],
            // [/(\d+) files?/, "$1 个文件"],
            "have changed and there have been": "已经发生了变化，并且有",
            "has changed and there have been": "已经发生了变化，并且有",
            "additions": "处增加",
            "deletions": "处删除",

            "commit authored by": "次提交，作者：",
            "commits authored by": "次提交，作者：",

            "Want to help out?": "想帮忙吗？",
            "Fork this repository": "复刻仓库",
            "Release published by": "个发行版已发布由",
            "Releases published by": "个发行版已发布由",
            "published": "发布",
            "Pull request merged by": "个拉取请求已合并由",
            "Pull requests merged by": "个拉取请求已合并由",
            "Pull request opened by": "个拉取请求打开由",
            "Pull requests opened by": "个拉取请求打开由",
            "Issue closed by": "个이슈已关闭由",
            "Issues closed by": "个이슈已关闭由",
            "Issue opened by": "个이슈打开由",
            "Issues opened by": "个이슈打开由",
            "person": "人",
            "people": "人",
            "Sometimes conversations happen on old items that aren’t yet closed. Here is a list of all the Issues and Pull Requests with unresolved conversations.": "有时会针对尚未关闭的旧项目进行讨论。以下是所有未解决的讨论的이슈和拉取请求的列表。",
            // [/• (\d+) new comments/, "• $1 个新评论"],
            "Unresolved conversation": "个未解决的讨论",
            "Unresolved conversations": "个未解决的讨论",

            "merged": "已合并",
            "opened": "打开",
            "closed": "已关闭",

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/(\d+) authors?/, "$1 位作者"],
        [/to ([^ ]+) and/, "到 $1 分支和"],
        [/to all branches. On ([^ ]+),/, "到全部分支。在 $1 分支，"],
        [/(\d+) files?/, "$1 个文件"],
        [/(\d+) commented on/, "$1 评论于",],
        [/• (\d+) new comments?/, "• $1 个新评论"],
        [/There hasn’t been any commit activity on ([^ ]+) in the last 24 hours./, "在过去的 24 小时里，$1 没有任何提交活动。"],
        [/There hasn’t been any commit activity on ([^ ]+) in the last 3 days./, "在过去的 3 天里，$1 没有任何提交活动。"],
        [/There hasn’t been any commit activity on ([^ ]+) in the last week./, "在过去的 1 周里，$1 没有任何提交活动。"],
        [/There hasn’t been any commit activity on ([^ ]+) in the last month./, "在过去的 1 月里，$1 没有任何提交活动。"],
    ],
};

I18N["ko-KR"]["repository/graphs/contributors"] = { // 仓库 -> 洞察 - 贡献者
    "static": { // 静态翻译

        // 贡献者 /<user-name>/<repo-name>/graphs/contributors
            "Loading contributions…": "载入贡献者…",
            // [/Contributions to (.*), excluding merge commits/, "贡献到 $1 分支，不包括合并提交"],
            "Contributions:": "贡献者：",
                // 下拉菜单
                "Filter contributions": "筛选贡献者",
                "Additions": "添加数量",
                "Deletions": "删除数量",
                // [/Contributions to (.*), excluding merge commits and bot accounts/, "贡献到 $1 分支，不包括合并提交和机器人账户"],
            "Crunching the latest data, just for you. Hang tight…": "正在为您准备最新数据，请稍后…",

        // 新版
            // 标题
                "Contributions per week to": "每周贡献到",
                ", excluding merge commits": " 分支，不包括合并提交",
                ", line counts have been omitted because commit count exceeds 10,000.": " 分支，由于提交次数超过 10,000 次，因此省略行数。",
            // 筛选栏
                "Period": "时间",
                    "All": "全部",
                    "Last month": "上月",
            // 日期
                "Weekly from": " 每周从",
                "From": "从",
            // 提交图表
                "over time": "总览",
                "commit": "次提交",
                    "s": " ",
                "Contributions": "贡献", // 图表旁竖写
                "Chart options": "图表选项",
                    "View as table": "以表格形式查看",
                    "Download CSV": "下载 CSV",
                    "Download PNG": "下载 PNG",
                    // 表格窗口
                        "Commits over time": "提交总览",
                        "DateTime": "日期时间",
                        "Week of": "周",

        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],
    },
    "regexp": [ // 正则翻译
        [/Contributions to (.*), excluding merge commits/, "贡献到 $1 分支，不包括合并提交"],
        [/Contributions to (.*), excluding merge commits and bot accounts/, "贡献到 $1 分支，不包括合并提交和机器人账户"],
        [/Contributions to (.*), line counts have been omitted because commit count exceeds 10,000./, "贡献到 $1 分支，由于提交次数超过 10,000 次，因此省略行数。"],
        //[/Contributions per week to (.*), excluding merge commits/, "每周贡献到 $1 分支，不包括合并提交"],
        [/([\d,]+) commits?/, "$1 次提交"],
        // 新版
        [/Last (\d+) months?/, "最后 $1 个月"],
        [/([^ ]+)'s (Commits|Additions|Deletions)/, function(all, user, cont){

            var contKey = {Commits: '提交', Additions: '添加数量', Deletions: '删除数量'};

            return user + ' 的' + contKey[cont];
        }],
        [/Week of (.+)/, (match, p1) => { // p1为(.+)
            const dateRegExp = I18N["ko-KR"]["public"]["time-regexp"];
            const translatedDate = dateRegExp.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), p1);
            return `${translatedDate}当周`;
        }],
        ...I18N["ko-KR"]["repository-public"]["regexp"],
    ],
};

I18N["ko-KR"]["repository/graphs/community"] = { // 仓库 -> 洞察 - 社区
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],

        // 社区 /<user-name>/<repo-name>/graphs/community
            "Enable Discussions to unlock Community Insights!": "启用讨论，以解锁社区见解！",
            "Discussions is the central space for your community to share announcements, ask questions, and host conversations.": "讨论是您的社区共享公告、提出问题和主持对话的中心空间。",
            "Set up discussions": "建立讨论",

            "Community insights": "社区见解",
            "Period:": "周期：",
                "Filter activity": "筛选活动",
                "Last 30 days": "最近 30 天",
                "Last 3 months": "最近 3 个月",
                "Last year": "最近 1 年",

            "Contribution activity": "贡献活动",
                "Count of total contribution activity to Discussions, Issues, and PRs": "对讨论、이슈和拉取请求的总贡献活动计数",
                "Discussions": "토론",
                "Quantity": "数量",
                "Timeline": "时间轴",
                // [/(\d+) pull requests created/, "$1 个拉取请求创建"],
            "We tried our best, but the graph wouldn’t load. Try reloading the page.": "我们尽了最大努力，但图表无法加载。尝试重新加载页面。",
            "Discussions page views": "讨论页面浏览量",
                "Total page views to Discussions segmented by logged in vs anonymous users.": "按登录用户与匿名用户划分的讨论的总页面浏览量。",
                "logged in": "登录",
                "anonymous": "匿名",

                "Not enough data yet.": "还没有足够的数据。",
                "It usually takes about a week to populate this chart.": "填充此图表일반需要大约一周的时间。",
                "Read more about insights": "阅读更多关于见解的信息",

            "Discussions daily contributors": "每日讨论的贡献者",
                "Count of unique users who have reacted, upvoted, marked an answer, commented, or posted in the selected period.": "在所选时间段内，作出反应、投票、标记答案、评论或发帖的唯一用户的数量。",
            "Discussions new contributors": "讨论的新贡献者",
                "Count of unique new users to Discussions who have reacted, upvoted, marked an answer, commented, or posted in the selected period.": "在所选时间段内，对讨论作出反应、投票、标记答案、评论或发帖的唯一新用户的数量。",

            "Crunching the latest data, just for you. Hang tight…": "正在为您准备最新数据，请稍后…",
    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/(\d+) pull requests? created/, "$1 个拉取请求创建"],
        [/(\d+) issues? created/, "$1 个이슈创建"],
        [/(\d+) discussions? created/, "$1 个讨论创建"],
        [/(\d+) contributors?/, "$1 贡献者"],
    ],
};

I18N["ko-KR"]["repository/community"] = { // 仓库 -> 洞察 - 社区准则
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],

        // 社区准则 /<user-name>/<repo-name>/community
            "Here’s how this project compares to": "以下是该项目内容，不同于",
            "recommended community standards": "推荐的社区标准",
            "Checklist": "检查清单",
            "Add": "添加",
            "Propose": "提议",

            "Description": "描述",
                "Add a description to your repository so people understand the goals of your project.": "向您的仓库添加描述，以便人们了解您项目的目标。",
            "README": "自述文件（README）",
                "Writing a README": "编写自述文件（README）",
            "Code of conduct": "行为准则",
                "What is a code of conduct?": "什么是行为准则？",
            "Contributing": "贡献",
                "Writing contributing guidelines": "编写贡献指南",
            "License": "许可证",
                "Choosing a license": "选择许可证",
            "Security policy": "安全政策",
                "Set up a security policy": "设置安全策略",
            "Issue templates": "이슈模板",
            "Pull request template": "拉取请求模板",
            "Repository admins accept content reports": "仓库管理员接受内容报告", // 组织仓库?
            "What is": "什么是",
            "the community profile": "社区简介",

        // 添加许可证 /<user-name>/<repo-name>/community/license/new?branch=main
            "Add a license to your project": "为您的项目添加许可证",
            "Choose a license to add to your project": "选择要添加到项目的许可证",
            "Select a template on the left to get started.": "在左侧选择一个模板开始。",
            "Learn more about": "了解更多关于",
            "which license best fits your project": "哪种许可证最适合您的项目",

        // 添加许可证 /<user-name>/<repo-name>/community/license/new?branch=<branch name>&template=<template name>
            // 右侧栏
                "You’ll have a chance to review before committing a": "您将有机会在提交之前进行审查",
                "file to a new branch or the root of your project.": "文件到新分支或项目的根目录。",

                "To adopt": "采用",
                ", enter your details. You’ll have a chance to review before committing a": "，输入您的详细信息。您将有机会在提交之前进行审查",
                "Year": "年份",
                    "The current year": "当前年份",
                "Full name": "全名",
                    "The full name or username of the repository owner": "仓库所有者的全名或用户名",
                "Review and submit": "审查并提交",

            // 中间栏 顶部 权限信息
                "Permissions": "许可事项",
                "Limitations": "限制条件",
                    "Commercial use": "商业用途",
                    "Modification": "修改",
                    "Distribution": "分布",
                    "Patent use": "专利使用",
                    "Private use": "私人使用",
                    "Trademark use": "商标使用",
                    "Liability": "责任",
                    "Warranty": "担保",
                    "Disclose source": "开源",
                    "Same license": "相同的许可证",
                "Conditions": "条件",
                    "License and copyright notice": "许可和版权声明",
                    "State changes": "状态变化",
                    "License and copyright notice for source": "来源许可和版权声明",
                    "Network use is distribution": "网络使用即分发",
                    "Same license (library)": "相同的许可证（库）",
                    "Same license (file)": "相同的许可证（文件）",

                "This is not legal advice.": "这并不是法律建议。",
                "Learn more about repository licenses": "了解更多关于仓库许可证的信息",

        // 添加行为准则 /<user-name>/<repo-name>/community/code-of-conduct/new
            "Add a code of conduct to your project": "为您的项目添加行为准则",
            "Choose a code of conduct to add to your project": "选择要添加到项目中的行为准则",
            "what a code of conduct is": "什么是行为准则",
            "and how to enforce it.": "以及如何执行。",
            "Contributor Covenant": "贡献者协议",
                "Recommended for projects of all sizes": "建议用于各种规模的项目",
                "Contact method": "联系方式",
            "Citizen Code Of Conduct": "公民行为准则",
                "Suitable for large communities and events": "适合大型社区和活动",
                "Link to reporting guidelines": "报告指南链接",
                "Link to policy": "政策链接",
                "Note": "注释",
                "Contact info": "联系信息",
                "Community name": "团队名称",
                "Governing body": "管理机构",
    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
    ],
};

I18N["ko-KR"]["repository/graphs/traffic"] = { // 仓库 -> 洞察 - 流量
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],

        // 流量 /<user-name>/<repo-name>/graphs/traffic
            "Git clones": "Git 克隆",
            "Clones": "克隆",
            "Unique cloners": "唯一克隆者",
            "clones": "次克隆",
            "clone": "次克隆",
            "unique cloners": "个唯一克隆者",
            "unique cloner": "个唯一克隆者",
            "Visitors": "访客",

            "Referring sites": "引荐网站",
            "Site": "站点",
            "Domains": "域名",
            "Views": "浏览",
            "Unique visitors": "唯一访客",
            "Unique Visits": "唯一访问",
            "views": "次浏览",
            "view": "次浏览",
            "Visits": "访问",
            "unique visitors": "个唯一访客",
            "unique visitor": "个唯一访客",
            "Popular content": "热门内容",
            "Content": "内容",
            "Path": "路径",

            "We don’t have enough data to show anything useful.": "我们没有足够的数据来显示任何有用的东西。",
            "It usually takes about a week to populate this graph.": "일반需要一周左右的时间来填充此图表。",
            "It looks like traffic to your repository is a little light. Go spread the word and check back later!": "看起来您的仓库的流量有点少呀。去宣传一下吧，稍后再回来查看！",

            "Crunching the latest data, just for you. Hang tight…": "正在为您准备最新数据，请稍后…",
    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
    ],
};

I18N["ko-KR"]["repository/graphs/commit-activity"] = { // 仓库 -> 洞察 - 提交
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],

        // 提交 /<user-name>/<repo-name>/graphs/commit-activity
            "Sunday"    : "周日",
            "Monday"    : "周一",
            "Tuesday"   : "周二",
            "Wednesday" : "周三",
            "Thursday"  : "周四",
            "Friday"    : "周五",
            "Saturday"  : "周六",

            "Crunching the latest data, just for you. Hang tight…": "正在为您准备最新数据，请稍后…",
    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/commits? the week of (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d+)/, function(all, month, day){
            var monthKey = {
                "Jan": "1月",
                "Feb": "2月",
                "Mar": "3月",
                "Apr": "4月",
                "May": "5月",
                "Jun": "6月",
                "Jul": "7月",
                "Aug": "8月",
                "Sep": "9月",
                "Oct": "10月",
                "Nov": "11月",
                "Dec": "12月"
            };

            return '次提交本周，' + monthKey[month] + day + '日';
        }],
    ],
};

I18N["ko-KR"]["repository/graphs/code-frequency"] = { // 仓库 -> 洞察 - 代码频率
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],

        // 代码频率 /<user-name>/<repo-name>/graphs/code-frequency
            "Code frequency over the history of": "历史上的代码频率",
            "Additions": "添加数量",
            "Deletions": "删除数量",
            "per week": "每周",
            "Crunching the latest data, just for you. Hang tight…": "正在为您准备最新数据，请稍后…",

            // 过多
            "There are too many commits to generate this graph.": "提交次数过多，无法生成图表。",
            "More information about this data can be found in the": "有关这些数据的更多信息，请参阅",
            "activity documentation": "活动文档",

        // 新版
        "Additions and deletions per week": "添加数量和删除数量/每周",
        "Chart options": "图表选项",
            "View as table": "以表格形式查看",
            "Download CSV": "下载 CSV",
            "Download PNG": "下载 PNG",
            // 图表本体
                "Date": "日期",
                "Frequency": "频率",
                "Values": "值",

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
    ],
};

I18N["ko-KR"]["repository/network/dependencies"] = { // 仓库 -> 洞察 - 依赖关系图 - 依赖关系
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],

        "Dependencies": "依赖关系",
        "Dependents": "依赖者",
        // 依赖关系图 - 依赖关系 /network/dependencies
            "Tell us how to make the Dependency Graph work better for you with a few quick questions.": "请通过几个简单的问题告诉我们，如何使 “依赖关系图” 更好地为您工作。",

            "The dependency graph is not enabled": "依赖关系图未启用",
            "The owner of this repository has not yet enabled the dependency graph. Once enabled, you can": "此仓库的所有者尚未启用依赖关系图。一旦启用，您可以", //个人仓库
            "The dependency graph has not yet been enabled by an organization owner or a user with admin permissions for this repository. Once enabled, you can": "依赖关系图还没有被组织所有者或具有该仓库管理权限的用户启用。一旦启用，您可以", // 组织仓库
            "track this repository’s dependencies": "追踪此仓库的依赖关系",

            "Enable the dependency graph": "启用依赖关系图",
            "Track this repository’s dependencies and sub-dependencies": "追踪该仓库的依赖关系和子依赖关系",
            "The": " ",
            "is not enabled for this repository. Click on \"Enable the dependency graph\" below to enable it.": "暂未启用。单击下面的 “启用依赖关系图” 以启用它。",
            "If you’d like to enable the": "如果您想启用",
            "dependency graph": "依赖关系图",
            "vulnerability alerting": "漏洞警报",
            "click on \"Allow access\" below to enable it.": "点击下面的 “允许访问” 来启用它。",
            "Learn more about how we use your data": "了解更多关于我们如何使用您的数据的信息",
            "Allow access": "允许访问",

            "No dependencies found.": "未找到依赖项",
            "To view your dependency graph, your repository must define dependencies in": "要查看依赖关系图，您的仓库必须定义依赖关系存在",
            "one of the supported manifest file types": "一个支持的清单文件",
            ", like": "，例如",
            ", and": "，和",

            "Export SBOM": "导出 SBOM",

            // "Dependencies": "依赖关系",
            "Search all dependencies": "搜索所有依赖项",

            "These dependencies are defined in": "这些依赖关系被定义在",
            "’s manifest files, such as": "的清单文件，例如",
            "Dependencies defined in": "依赖关系被定义在",

            // 发现已知漏洞
            "Dependencies defined in these manifest files have known security vulnerabilities and should be updated:": "这些清单文件中定义的依赖项具有已知的安全漏洞，应更新：",
            // [/(\d+) vulnerabilities? found/, "发现 $1 个漏洞"],
            "Known security vulnerability in": "已知的安全漏洞，在",
                "Known vulnerability found": "发现已知漏洞",
                "update suggested:": "更新建议：",
                "Always verify the validity and compatibility of suggestions with your codebase.": "始终验证建议与代码库的有效性和兼容性。",

            // [/(\d+) more dependencies/, "更多 $1 个依赖项"],
            // [/Load (\d+) more…/, "加载更多 $1个…"],

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/View Dependabot alerts?/, "查看 Dependabot 警报"],
        [/Detected automatically on (.+)/, "自动检测于$1"],
        [/(\d+) Total/, "$1 总计"],
        [/(\d+) vulnerabilities? found/, "发现 $1 个漏洞"],
        [/(\d+) more dependencies/, "更多 $1 个依赖项"],
        [/(\d+) moderate · (\d+) total/, "$1 中风险 · $2 总计"],
        [/(\d+) high · (\d+) total/, "$1 高风险 · $2 总计"],
        [/(\d+) high/, "$1 高风险"],
        [/(\d+) moderate/, "$1 中风险"],
        [/Load (\d+) more…/, "加载更多 $1个…"],
    ],
};

I18N["ko-KR"]["repository/network/dependents"] = { // 仓库 -> 洞察 - 依赖关系图 - 依赖者
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],

        "Dependencies": "依赖关系",
        "Dependents": "依赖者",
        // 依赖关系图 - 依赖者 /network/dependents
            "GitHub does not currently determine the dependents of private repositories": "GitHub 目前无法确定私有仓库的依赖者",

            "Export SBOM": "导出 SBOM",
            // "Dependents": "依赖者",
            "We haven’t found any dependents for this repository yet.": "我们尚未找到此仓库的任何依赖者。",
            "We’ll keep looking!": "我们会继续寻找！",

            "Repositories that depend on": "依赖的仓库包括",
            "Package:": "软件包：",

            "These counts are approximate and may not exactly match the dependents shown below.": "这些计数是近似值，可能与下方显示的依赖项不完全匹配。",

            // [/(\d+) Repositor(y|ies)/, "$1 仓库"],
            // [/(\d+) Packages?/, "$1 软件包"],

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/(\d+) Repositor(y|ies)/, "$1 仓库"],
        [/(\d+) Packages?/, "$1 软件包"],
    ],
};

I18N["ko-KR"]["repository/network/updates"] = { // 仓库 -> 洞察 - 依赖关系图 - Dependabot
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],

        "Dependencies": "依赖关系",
        "Dependents": "依赖者",

        "Export SBOM": "导出 SBOM",
        // 依赖关系图 - Dependabot /network/updates
            "Enable Dependabot": "启用 Dependabot",
            "Dependabot isn't enabled": "未启用 Dependabot",
            "Dependabot isn't enabled on forks by default": "默认情况下，Dependabot 不会在复刻上启用。",

            "Dependabot version updates aren't configured yet": "尚未配置 Dependabot 版本更新",
            "Dependabot creates pull requests to keep your dependencies up-to-date.": "Dependabot 创建拉取请求以保持您的依赖项是最新的。",
            "Create config file": "创建配置文件",

            "Recent update jobs": "最近更新的工作",

            "Dependabot version updates": "Dependabot 版本更新",
            "automatically keep your application up-to-date by periodically updating dependencies to their latest versions.": "通过定期将依赖项更新到最新版本，自动保持应用的最新状态。",
            "Dependabot security updates": "Dependabot 版本更新",
            "can also help keep dependencies updated.": "还可以帮助保持依赖项更新。",

            "Monitored dependency files": "受监控的依赖文件",
            "Check for updates": "检查更新",
            "Recent jobs": "近期工作",
            "view logs": "查看日志",

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
    ],
};

I18N["ko-KR"]["repository/network"] = { // 仓库 -> 洞察 - 网络图
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],

        // 网络图 /<user-name>/<repo-name>/network
            // 键盘快捷键
                "Scroll left": "向左滑动",
                "Scroll right": "向右滑动",
                "Scroll up": "向上滑动",
                "Scroll down": "向下滑动",
                "Toggle visibility of the head labels": "切换头部标签的可见性",
                "Scroll all the way left": "一直向左滑动",
                "Scroll all the way right": "一直向右滑动",
                "Scroll all the way up": "一直向上滑动",
                "Scroll all the way down": "一直向下滑动",

            "Network graph": "网络图",
            "Timeline of the most recent commits to this repository and its network ordered by most recently pushed to.": "最近提交到此仓库的时间轴及其网络图按最近推送的顺序排序。",

            "The repository network shows the 100 most recently pushed forks.": "仓库网络图显示最近推送的 100 个复刻。",

            "Loading graph data": "加载网络图数据",
            "Keyboard shortcuts available": "可用的键盘快捷键",

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
    ],
};

I18N["ko-KR"]["repository/network/members"] = { // 仓库 -> 洞察 - 复刻
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],

        // 复刻 - 树形视图 /<user-name>/<repo-name>/network/members
            "switch to list view": "切换到列表视图",

            "No one has forked this repository yet.": "目前，暂无人复刻该仓库。",
            "Forks are a great way to contribute to a repository. After": "复刻是给该仓库做贡献的好方法。首先",
            "forking a repository": "复刻仓库",
            ", you can send the original author a": "，然后您可向原作者发送",
            "pull request": "拉取请求",

            "Woah, this network is huge! We’re showing only some of this network’s repositories.": "哇，这个网络太庞大了! 我们只展示了这个网络中的一部分仓库。",

    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
    ],
};

I18N["ko-KR"]["repository/forks"] = { // 仓库 -> 洞察 - 复刻
    "static": { // 静态翻译
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-insights-menu"]["static"],

        // 复刻 - 列表视图 /<user-name>/<repo-name>/forks
            "Switch to tree view": "切换到树形视图",

            "No one has forked this repository yet": "目前，暂无人复刻该仓库",
            "Forks are a great way to contribute to a repository. After": "复刻是给该仓库做贡献的好方法。首先",
            "forking a repository": "复刻仓库",
            ", you can send the original author a": "，然后您可向原作者发送",
            "pull request": "拉取请求",

            "No forked repositories found": "尚无复刻仓库",
            "Try changing your filters, or search for": "尝试更改筛选器，或搜索",
            "active forked repositories": "活跃的复刻仓库",

            "Period:": "周期:",
                "Filter by period": "筛选周期",
                "1 month": "1 个月",
                "6 months": "6 个月",
                "1 year": "1 年",
                "2 years": "2 年",
                "5 years": "5 年",
                "All time": "所有时间",

                "Any repository that has not been created or updated during this period will be excluded.": "在此期间未被创建或更新的任何仓库将被排除在外。",
            "Repository type:": "仓库类型:",
                "Filter by repository type": "筛选仓库类型",
                "None": "无",
                "Active": "活跃",
                    "Repositories with push activity": "有推送活动的仓库",
                "Inactive": "不活跃",
                    "Repositories with no push activity": "无推送活动的仓库",
                "Network": "网络",
                    "Forks of other forks": "其他复刻的复刻",
                "Archived": "보관됨",
                    "Archived repositories": "已存档的仓库",
                "Starred": "星标",
                    "Repositories with at least 1 star": "至少有 1 个星标的仓库",
            "Sort:": "排序:",
                "Sort by": "排序方式",
                    "Most starred": "最多星标",
                    "Recently updated": "最近更新",
                    "Open issues": "打开的이슈",
                    "Open pull requests": "打开的拉取请求",
                "Defaults Saved": "默认值已保存",
                "Save Defaults": "保存默认值",

            "Never updated": "从未更新",
    },
    "regexp": [ // 正则翻译
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/Created/, "创建于"],
        [/Updated/, "更新于"],
    ],
};

// 洞察 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

I18N["ko-KR"]["repository-settings-menu"] = { // 저장소 설정 공통 부분
    "static": { // 정적 번역
        // >>>>>>>>>>>>>>>>>>   저장소 설정 공통 부분  <<<<<<<<<<<<<<<<<<<
            // 상단 알림 표시줄
            "Most repository settings are hidden for archived repositories. This repository must be unarchived to change them.": "보관된 저장소의 대부분의 설정은 숨겨져 있어요. 변경하려면 저장소 보관을 해제해야 해요.",
            "This repository has been archived by the owner. It is now read-only.": "이 저장소는 소유자에 의해 보관되었어요. 이제 읽기 전용이에요.",
            "Repository settings saved.": "저장소 설정이 저장되었어요.",

            // 왼쪽 메뉴
            "General": "일반",

            "Access": "접근",
                // "Collaborators": "협업자",
                "Collaborators and teams": "협업자 및 팀", // 조직 저장소
                "Team and member roles": "팀 및 멤버 역할",  // 조직 저장소
                "Moderation options": "관리 옵션",
                    "Interaction limits": "상호 작용 제한",
                    "Code review limits": "코드 검토 제한",

            "Code and automation": "코드 및 자동화",
                "Branches": "분기",
                "branches": "분기",
                "Tags": "꼬리표",
                "Rules": "규칙",
                    "Rulesets": "규칙 집합",
                // "Actions": "액션",
                    // "General": "일반",
                    "Runners": "실행기",
                "Webhooks": "웹훅",
                "Environments": "환경",
                "Pages": "GitHub Pages",
                "Custom properties": "사용자 지정 속성",  // 조직 저장소

            // "Security": "보안",
            "Code security": "코드 보안",
                "Code security and analysis": "코드 보안 및 분석",
                "Deploy keys": "배포 키",
                "Secrets and variables": "비밀 및 변수",

            "Integrations": "통합",
                "GitHub Apps": "GitHub 앱",
                "Email notifications": "이메일 알림",
                "Autolink references": "자동 링크 참조",
    },
    "regexp": [ // 정규식 번역
    ],
};


I18N["ko-KR"]["repository/settings"] = { // 저장소 설정 - 보통 /<user-name>/<repo-name>/settings
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-settings-menu"]["static"],

        // 보통 - 설정 페이지 /<user-name>/<repo-name>/settings ====================================
            "Repository name": "저장소 이름",
            "Rename": "이름 변경하기",
                // [/is available./, "이름 사용 가능해요."],
                "The repository": "저장소",
                "already exists on this account.": "이미 이 계정에 존재해요.",
                "Your new repository will be created as": "새 저장소가 다음 이름으로 생성될 거예요:",
                // 상단 알림
                "Repository name was not changed": "저장소 이름이 변경되지 않았어요.",

            "Template repository": "템플릿 저장소",
                "Template repositories let users generate new repositories with the same directory structure and files.": "템플릿 저장소를 사용하면 사용자가 동일한 디렉토리 구조와 파일을 가진 새 저장소를 생성할 수 있어요.",
                "A repository with LFS content cannot be used as a template.": "LFS 콘텐츠가 있는 저장소는 템플릿으로 사용할 수 없어요.",
                "Learn more about template repositories": "템플릿 저장소에 대해 더 알아보세요.",

                "Require contributors to sign off on web-based commits": "웹 기반 커밋에 대해 기여자가 서명하도록 요구하기",
                "Enabling this setting will require contributors to sign off on commits made through GitHub’s web interface. Signing off is a way for contributors to affirm that their commit complies with the repository's terms, commonly the": "이 설정을 활성화하면 기여자가 GitHub의 웹 인터페이스를 통해 수행한 커밋에 대해 서명해야 해요. 서명은 기여자가 커밋이 저장소의 조건, 보통은 다음과 같이 준수됨을 확인하는 방법이에요:",
                "Developer Certificate of Origin (DCO)": "개발자 출처 증명서 (DCO)",
                "Learn more about signing off on commits": "커밋 서명에 대해 더 알아보세요.",

            "This setting is enabled on the upstream repository. Disabling this setting may block commits from being merged upstream.": "이 설정은 상위 저장소에서 활성화되어 있어요. 이 설정을 비활성화하면 상위 저장소로의 커밋 병합이 차단될 수 있어요.",

            "Default branch": "기본 분기",
            "The default branch is considered the “base” branch in your repository, against which all pull requests and code commits are automatically made, unless you specify a different branch.": "기본 분기는 저장소에서 '기준' 분기로 간주되며, 다른 분기를 지정하지 않는 한 모든 끌어오기 요청과 코드 커밋이 자동으로 이 분기를 대상으로 이루어져요.",
            "Rename branch": "분기 이름 변경하기",
                // 분기 이름 변경 대화창
                "Rename this branch": "이 분기 이름 변경하기",
                "Rename": "이름 변경하기",
                "to:": "다음:",
                // [/is already the branch name./, "이미 분기 이름이에요."],
                // [/Your branch name will be/, "사용자님의 분기 이름이 다음으로 변경될 거예요:"],
                "Most projects name the default branch": "대부분의 프로젝트는 기본 분기 이름을",
                "Renaming this branch:": "이 분기를 다음으로 이름 변경하기:",
                    // 이 분기에 다른 분기에서 생성된 끌어오기 요청이 있을 때
                        "Will update": "업데이트할 거예요,",
                        "pull request targeting this branch.": "이 분기를 대상으로 한 끌어오기 요청이 업데이트될 거예요.",
                        "pull requests targeting this branch.": "이 분기를 대상으로 한 끌어오기 요청들이 업데이트될 거예요.",
                        "branch protection rule that explicitly targets": "이 분기를 명시적으로 대상으로 하는 분기 보호 규칙을,",
                    
                    // 이 분기가 다른 분기를 위한 끌어오기 요청에 사용될 때
                        "Will close": "닫을 거예요,",
                        "open pull request for this branch.": "이 분기에 대한 열린 끌어오기 요청을 닫을 거예요.",
                    
                    // GitHub Pages가 있는 분기의 이름 변경 시
                        "Will unpublish current GitHub Pages site.": "현재 GitHub Pages 사이트의 게시를 취소할 거예요.",
                            "Your current GitHub Pages site will become unpublished. A new commit on the renamed branch will publish the GitHub Pages site again.": "현재 GitHub Pages 사이트는 게시 취소 상태가 될 거예요. 이름 변경된 분기에서 새로운 커밋이 이루어지면 GitHub Pages 사이트가 다시 게시될 거예요.",
                    
                    "Will not update your members' local environments.": "회원님의 로컬 환경은 업데이트되지 않을 거예요.",
                "Renaming this branch will not update your members' local environments.": "이 분기 이름 변경은 회원님의 로컬 환경을 업데이트하지 않아요.",
                    "Your members will have to manually update their local environments. We'll let them know when they visit the repository, or you can share the following commands.": "회원님들의 로컬 환경은 수동으로 업데이트해야 해요. 회원님들이 저장소를 방문할 때 안내해드리거나, 다음 명령어들을 공유하실 수 있어요.",
                "Saving…": "저장 중…",

            "Switch to another branch": "다른 분기로 전환하기",
                // 분기 전환 대화창
                "Switch default branch to another branch": "기본 분기를 다른 분기로 전환하기",
                // [/Choose another branch to use as the default branch of ([^ ]+) instead of/,"$1 의 기본 분기로 사용하기 위해 다른 분기를 선택해주세요"] // 분기 전환 대화창
                "Update": "업데이트하기",
                "Switch default branch": "기본 분기 전환하기",
                "Filter branches": "분기 필터링하기",
                "default": "기본",
                // 기본 분기 업데이트 대화창
                "Update default branch": "기본 분기 업데이트하기",
                "Changing your default branch": "기본 분기를 변경하는 것은",
                "can have unintended consequences that can affect new pull requests and clones.": "예기치 않은 결과가 발생하여 새로운 끌어오기 요청 및 클론에 영향을 줄 수 있어요.",
                "I understand, update the default branch.": "이해했어요, 기본 분기를 업데이트해주세요.",
                // 상단 알림
                    // [/Default branch changed to ([^ ])/, "기본 분기가 $1(으)로 변경되었어요"]
            
            "Social preview": "소셜 미리보기",
            // 개인 저장소 관련 알림
            "You can upload a social image, but it will not be visible publicly while": "소셜 이미지를 업로드할 수 있어요, 하지만",
            "is private.": "저장소가 비공개일 경우, 공개되지 않아요.",
            "Upload an image to customize your repository’s social media preview.": "저장소의 소셜 미디어 미리보기를 커스터마이즈하기 위해 이미지를 업로드해주세요.",
            "Images should be at least 640×320px (1280×640px for best display).": "이미지는 최소 640×320픽셀, 최적 표시를 위해서는 1280×640픽셀이면 좋아요.",
            "Download template": "템플릿 다운로드하기",
            "Edit": "편집하기",
                "Upload an image…": "이미지 업로드하기…",
                "Remove image": "이미지 삭제하기",
            
            "Features": "기능들",
            // "Wikis": "",
                "Wikis host documentation for your repository.": "Wikis는 저장소의 문서를 호스팅해요.",
                "Restrict editing to collaborators only": "협업자만 편집하도록 제한하기",
                "Restrict editing to users in teams with push access only": "푸시 권한이 있는 팀의 사용자만 편집하도록 제한하기", // 조직 저장소
                    "Public wikis will still be readable by everyone.": "공개된 Wikis는 모두가 읽을 수 있어요.",
            
            // 개인 저장소 Wiki 활성화 알림
                "Upgrade or make this repository public to enable Wikis": "Wikis를 사용하려면 저장소를 업그레이드하거나 공개해주세요.",
                "GitHub Wikis is a simple way to let others contribute content. Any GitHub user can create and edit pages to use for documentation, examples, support, or anything you wish.": "GitHub Wikis는 다른 사람들이 콘텐츠를 기여할 수 있는 간단한 방법이에요. 모든 GitHub 사용자가 문서, 예시, 지원 또는 원하는 용도로 페이지를 생성하고 편집할 수 있어요.",
                // "Upgrade": "업그레이드",
                    "Learn more about wikis": "Wikis에 대해 더 알아보기",
            
            // 이슈
            "Issues integrate lightweight task tracking into your repository. Keep projects on track with issue labels and milestones, and reference them in commit messages.": "이슈는 저장소에 가벼운 작업 추적을 통합해요. 이슈 레이블과 마일스톤으로 프로젝트를 체계적으로 관리하고, 커밋 메시지에서 참조할 수 있어요.",
            "Get organized with issue templates": "이슈 템플릿으로 체계적으로 정리해보세요.",
            "Give contributors issue templates that help you cut through the noise and help them push your project forward.": "기여자에게 이슈 템플릿을 제공하여 혼란을 줄이고 프로젝트 진행에 도움을 줄 수 있어요.",
            "Set up templates": "템플릿 설정하기",
            
            "Allow forking": "포크 허용하기", // 조직 저장소
            "If disabled, existing forks will be unaffected.": "비활성화하면, 기존 포크에는 영향이 없어요.", // 조직 저장소
            
            // 후원
            "Sponsorships": "후원",
            "Sponsorships help your community know how to financially support this repository.": "후원을 통해 커뮤니티가 이 저장소를 재정적으로 지원하는 방법을 알 수 있어요.",
            "Display a \"Sponsor\" button": "“후원하기” 버튼 표시하기",
            "Add links to GitHub Sponsors or third-party methods your repository accepts for financial contributions to your project.": "프로젝트에 대한 재정 지원을 위해 GitHub 스폰서나 제3자 후원 방법에 대한 링크를 추가해주세요.",
            "Set up sponsor button": "후원 버튼 설정하기",
            "Edit funding links": "후원 링크 편집하기",
            
            // 프로젝트
            "Projects on GitHub help you organize and prioritize your work. You can create projects for specific feature work, comprehensive roadmaps, or even release checklists.": "GitHub의 프로젝트는 작업을 체계적으로 정리하고 우선순위를 지정하는 데 도움을 줘요. 특정 기능 작업, 종합적인 로드맵 또는 릴리즈 체크리스트를 위해 프로젝트를 생성할 수 있어요.",
            
            "Preserve this repository": "이 저장소를 보존하기",
            "Include this code in the": "이 코드를 포함하기",
            "GitHub Archive Program": "GitHub 아카이브 프로그램에",
            
            "Table of contents": "목차",
            "Autogenerate table of contents for markdown files in this repository. the table of contents will be displayed near the top of the file.": "이 저장소의 Markdown 파일에 대한 목차를 자동 생성해요. 목차는 파일 상단 근처에 표시될 거예요.",
            
            // "Discussions": "토론",
            "Discussions is the space for your community to have conversations, ask questions and post answers without opening issues.": "토론은 커뮤니티가 대화하고, 질문하며, 답변을 게시할 수 있는 공간이에요. 이슈를 열지 않아도 돼요.",
            "Get started with Discussions": "토론 시작하기",
            "Engage your community by having discussions right in your repository, where your community already lives": "커뮤니티가 이미 있는 저장소에서 토론을 진행하여 커뮤니티를 활성화해보세요.",
            "Set up discussions": "토론 설정하기",
            
            // 프로젝트
            "Projects on GitHub are created at the repository owner's level (organization or user) and can be linked to a repository's Projects tab. Projects are suitable for cross-repository development efforts such as feature work, complex product roadmaps or even Issue triage.": "GitHub의 프로젝트는 저장소 소유자(조직 또는 사용자) 수준에서 생성되며, 저장소의 프로젝트 탭에 연결할 수 있어요. 프로젝트는 기능 작업, 복잡한 제품 로드맵 또는 이슈 분류와 같은 저장소 간 개발 작업에 적합해요.",
            
            // "Pull requests": "끌어오기 요청",
                "When merging pull requests, you can allow any combination of merge commits, squashing, or rebasing. At least one option must be enabled. If you have linear history requirement enabled on any protected branch, you must enable squashing or rebasing.": "끌어오기 요청을 병합할 때, 병합 커밋, 스쿼시 또는 리베이스의 조합을 허용할 수 있어요. 적어도 하나의 옵션은 활성화되어야 해요. 만약 보호된 분기에서 선형 히스토리 요구사항을 활성화했다면, 스쿼시나 리베이스를 활성화해야 해요.",
            
                "You must select at least one option": "적어도 하나의 옵션을 선택해야 해요.",
                "Allow merge commits": "병합 커밋 허용하기",
                    "Add all commits from the head branch to the base branch with a merge commit.": "헤드 분기의 모든 커밋을 병합 커밋으로 베이스 분기에 추가해요.",
                        "Default commit message": "기본 커밋 메시지",
                            "Presented when merging a pull request with merge.": "병합으로 끌어오기 요청을 병합할 때 표시돼요.",
                        "Default message": "기본 메시지",
                        "Pull request title": "끌어오기 요청 제목",
                        "Pull request title and commit details": "끌어오기 요청 제목 및 커밋 세부 사항",
                        "Pull request title and description": "끌어오기 요청 제목 및 설명",
            
                "Allow squash merging": "스쿼시 병합 허용하기",
                    "Combine all commits from the head branch into a single commit in the base branch.": "헤드 분기의 모든 커밋을 하나의 커밋으로 베이스 분기에 합쳐요.",
                        // "Default commit message": "기본 커밋 메시지",
                            "Presented when merging a pull request with squash.": "스쿼시 병합으로 끌어오기 요청을 병합할 때 표시돼요.",
                        "Default to pull request title and commit details": "끌어오기 요청 제목 및 커밋 세부 사항을 기본으로 사용하기",
            
                    "Default to PR title for squash merge commits": "스쿼시 병합 커밋 시, 끌어오기 요청 제목을 기본으로 사용하기",
                    "This will pre-populate the commit message with the PR title when performing a squash merge.": "스쿼시 병합을 수행할 때, 커밋 메시지가 끌어오기 요청 제목으로 미리 채워질 거예요.",
            
                "Allow rebase merging": "리베이스 병합 허용하기",
                    "Add all commits from the head branch onto the base branch individually.": "헤드 분기의 모든 커밋을 베이스 분기에 개별적으로 추가해요.",
            
                "Control how and when users are prompted to update their branches if there are new changes available in the base branch.": "베이스 분기에 새로운 변경 사항이 있을 때, 사용자에게 분기 업데이트를 언제 어떻게 안내할지 제어해요.",
                "Always suggest updating pull request branches": "항상 끌어오기 요청 분기 업데이트를 제안하기",
                    "Whenever there are new changes available in the base branch, present an “update branch” option in the pull request.": "베이스 분기에 새로운 변경 사항이 있을 때마다, 끌어오기 요청에 '분기 업데이트' 옵션을 제시해요.",
            
                "You can allow setting pull requests to merge automatically once all required reviews and status checks have passed.": "필수 검토와 상태 확인이 모두 통과되면, 끌어오기 요청을 자동으로 병합하도록 설정할 수 있어요.",
            
                "Allow auto-merge": "자동 병합 허용하기",
                    "Waits for merge requirements to be met and then merges automatically.": "병합 요건이 충족될 때까지 기다린 후 자동으로 병합해요.",
                    "Why is this option disabled?": "이 옵션이 왜 비활성화되어 있는지요?",
            
                "After pull requests are merged, you can have head branches deleted automatically.": "끌어오기 요청이 병합된 후, 헤드 분기를 자동으로 삭제할 수 있어요.",
            
                    "Automatically delete head branches": "헤드 분기 자동 삭제하기",
                        "Deleted branches will still be able to be restored.": "삭제된 분기는 여전히 복원할 수 있어요.",
            
            "Archives": "아카이브",
            "When creating source code archives, you can choose to include files stored using Git LFS in the archive.": "소스 코드 아카이브를 생성할 때, Git LFS로 저장된 파일을 포함할지 선택할 수 있어요.",
            
            "Include Git LFS objects in archives": "아카이브에 Git LFS 객체 포함하기",
            "Git LFS usage in archives is billed at the same rate as usage with the client.": "아카이브 내 Git LFS 사용량은 클라이언트 사용량과 동일한 요금으로 부과돼요.",
            
            "Pushes": "푸시",
            "Limit how many branches and tags can be updated in a single push": "한 번의 푸시에서 업데이트할 수 있는 분기와 태그의 개수를 제한하기",
                "Pushes will be rejected if they attempt to update more than this.": "이보다 많은 업데이트를 시도하면 푸시가 거부될 거예요.",
                "Learn more about this setting": "이 설정에 대해 더 알아보세요.",
                ", and send us your": "，그리고 사용자님의",
                "feedback": "피드백을 보내주세요.",
            
                "Up to": "최대",
                "branches and tags can be updated in a push": "개의 분기와 태그를 한 푸시에서 업데이트할 수 있어요.",
            
                // 알림
                "Must be a whole number between 2 and 1000": "2에서 1000 사이의 정수여야 해요.",
            
            "Danger Zone": "위험 구역",
            "Change repository visibility": "저장소 공개 여부 변경하기",
            "You cannot change the visibility of a fork. please": "포크 저장소의 공개 여부는 변경할 수 없어요. 부디",
            "Duplicate the repository": "저장소 복제하기",
            "For security reasons, you cannot change the visibility of a fork.": "보안상의 이유로 포크 저장소의 공개 여부는 변경할 수 없어요.",
            
            // 저장소 공개 여부 변경 대화창
            "Change visibility": "공개 여부 변경하기",
                "Change to private": "비공개로 변경하기",
                "Change to public": "공개로 변경하기",
            "This repository is currently public.": "현재 이 저장소는 공개 상태에 있어요.",
            "This repository is currently private.": "현재 이 저장소는 비공개 상태에 있어요.",
            "I want to make this repository public": "저장소를 공개로 전환하고 싶어요",
                "The code will be visible to everyone who can visit https://github.com": "https://github.com 에 방문할 수 있는 모든 사람이 코드를 볼 수 있어요",
                "Attachments uploaded to this repository's issues and pull requests will not be accessible unless it is made private again.": "이 저장소의 이슈 및 끌어오기 요청에 업로드된 첨부 파일은 다시 비공개로 전환하지 않는 한 접근할 수 없어요.",
                "Anyone can fork your repository.": "누구나 사용자님의 저장소를 포크할 수 있어요.",
                "All push rulesets will be disabled.": "모든 푸시 규칙 세트가 비활성화될 거예요.",
                "Your changes will be published as activity.": "사용자님의 변경 사항은 활동으로 게시될 거예요.",
                "Make this repository public": "이 저장소를 공개로 전환하기",
            "I want to make this repository private": "이 저장소를 비공개로 전환하고 싶어요",
                "Making this repository private could permanently erase these counts by removing stars and watchers associated to users that will no longer have access to this repository:": "이 저장소를 비공개로 전환하면, 저장소에 접근할 수 없게 되는 사용자와 연관된 별표와 주시자 수가 영구적으로 삭제될 수 있어요:",
                    "star": "별표",
                    "stars": "별표",
                    "watcher": "주시자",
                    "watchers": "주시자",
                "If you decide to make this repository public in the future, it will not be possible to restore these stars and watchers and this will affect its repository rankings.": "앞으로 이 저장소를 공개로 전환하더라도, 별표와 주시자를 복원할 수 없으며, 저장소 순위에 영향을 줄 거예요.",
                "Dependency graph and Dependabot alerts will remain enabled with permission to perform read-only analysis on this repository.": "의존성 그래프와 Dependabot 알림은 이 저장소에 대해 읽기 전용 분석 권한과 함께 계속 활성화될 거예요.",
                "Dependency graph and Dependabot alerts will remain enabled with permission to perform read-only analysis on this repository. Any custom Dependabot alert rules will be disabled unless GitHub Advanced Security is enabled for this repository.": "의존성 그래프와 Dependabot 알림은 읽기 전용 분석 권한과 함께 계속 활성화되며, GitHub 고급 보안 기능이 활성화되지 않으면 사용자 지정 Dependabot 알림 규칙은 모두 비활성화될 거예요.",
                "Code scanning will become unavailable.": "코드 스캔은 사용 불가능해질 거예요.",
                "Current forks will remain public and will be detached from this repository.": "현재의 포크는 공개 상태로 남으며, 이 저장소와 분리될 거예요.",
                "Make this repository private": "이 저장소를 비공개로 전환하기",
                "I have read and understand these effects": "이 영향들을 읽고 이해했어요.",
            
                "Warning: this is a destructive action": "경고: 이 작업은 파괴적인 행동이에요",
                "To confirm, type the number of stars on this repository in the box below": "확인을 위해, 아래 상자에 이 저장소의 별표 수를 입력해주세요",
            
            "Disable branch protection rules": "분기 보호 규칙 비활성화하기",
                "Disable branch protection rules enforcement and APIs": "분기 보호 규칙 시행과 API를 비활성화하기",
            
                // 상단 알림
                    "Branch protection settings saved.": "분기 보호 설정이 저장되었어요.",
            
            // 분기 보호 비활성화 대화창
                "This will hide the branch protection settings and disable branch protection rules for this repository.": "이 작업은 분기 보호 설정을 숨기고, 이 저장소의 분기 보호 규칙을 비활성화할 거예요.",
                "Disabling branch protection rules allows you to enforce branch and tag protections exclusively with Repository Rules.": "분기 보호 규칙을 비활성화하면, 저장소 규칙만으로 분기와 태그 보호를 시행할 수 있어요.",
                "This action will disable:": "이 작업은 다음을 비활성화할 거예요:",
                    "Branch protection rule enforcement": "분기 보호 규칙 시행",
                    "Branch protection rule APIs": "분기 보호 API",
                // [/(\d+) branch protection rules?/, "$1 개의 분기 보호 규칙"],
                "will be disabled as part of this action": "이 작업의 일부로 비활성화될 거예요.",
            
            "Re-enable branch protection rules": "분기 보호 규칙 재활성화하기",
                "Re-enable branch protection rules enforcement and APIs": "분기 보호 규칙 시행과 API를 재활성화하기",
            
            // 분기 보호 재활성화 대화창
                "Re-enable branch protection": "분기 보호 재활성화하기",
                "will be re-enabled as part of this action": "이 작업의 일부로 재활성화될 거예요.",
            
            "Transfer ownership": "소유권 이전하기",
            "Transfer": "이전하기",
            "Transfer this repository to another user or to an organization where you have the ability to create repositories.": "이 저장소를 다른 사용자 또는 저장소를 생성할 수 있는 조직으로 이전해주세요.",
            
            "Archive this repository": "이 저장소를 아카이브하기",
            "Mark this repository as archived and read-only.": "이 저장소를 아카이브 처리하여 읽기 전용으로 만드세요.",
            
            // 저장소 아카이브 대화창
            "Archive repository": "저장소 아카이브하기",
            "This repository will become read-only.": "이 저장소는 읽기 전용으로 전환될 거예요.",
            "You will still be able to fork the repository and unarchive it at any time.": "언제든지 저장소를 포크하거나 아카이브 해제할 수 있어요.",
            "Unexpected bad things will happen if you don’t read this!": "이 내용을 읽지 않으면 예상치 못한 문제가 발생할 수 있어요!",
            "All scheduled workflows will stop running.": "모든 예약된 워크플로우가 중단될 거예요.",
            "Security features will be unavailable:": "보안 기능은 사용할 수 없게 될 거예요:",
            "Code scanning": "코드 스캔",
            "Before you archive, please consider:": "아카이브 전에, 다음 사항을 고려해주세요:",
            "Updating any repository settings": "모든 저장소 설정 업데이트",
            "Closing all open issues and pull requests": "모든 열린 이슈와 끌어오기 요청 닫기",
            "Making a note in your README": "README에 메모 남기기",
            "Please type": "입력해주세요",
            "to confirm.": "확인을 위해.",
            "I understand the consequences, archive this repository": "영향을 이해했으니, 이 저장소를 아카이브해주세요.",
            // "This repository has been archived by the owner. It is now read-only.": "이 저장소는 소유자에 의해 아카이브되었어요. 이제 읽기 전용이에요.",
            
            // 상단 알림
            // [/Your repository \"([^ ]+)\" was successfully archived./, "사용자님의 저장소 “$1”가 성공적으로 아카이브되었어요."] // 저장소 아카이브
            
            "Unarchive this repository": "이 저장소 아카이브 해제하기",
            "Mark this repository as unarchived and read-write.": "이 저장소를 아카이브 해제하여 읽기/쓰기 가능하게 만드세요.",
            
            // 저장소 아카이브 해제 대화창
            "Unarchive repository": "저장소 아카이브 해제하기",
            "This will make": "이 작업은",
            "read-write.": "읽기/쓰기가 가능하게 할 거예요.",
            "Once unarchived, the following can be modified and commented on:": "아카이브가 해제되면, 다음 항목들은 수정 및 댓글 작성이 가능해요:",
            "Pull requests": "끌어오기 요청",
            "Labels": "레이블",
            "Releases": "릴리즈",
            "Milestones": "마일스톤",
            "Security features will become available:": "보안 기능이 사용 가능해질 거예요:",
            "I understand the consequences, unarchive this repository": "영향을 이해했으니, 이 저장소의 아카이브를 해제해주세요.",
            
            "Delete this repository": "저장소 삭제하기",
            "Once you delete a repository, there is no going back. Please be certain.": "저장소를 삭제하면 되돌릴 수 없어요. 신중하게 결정해주세요.",
            
            // 상단 알림
            // [/Your repository \"([^ ]+)\" was successfully unarchived./, "사용자님의 저장소 “$1”가 성공적으로 아카이브 해제되었어요."] // 저장소 아카이브 해제
            
            // 저장소 삭제 대화창
                // [/Delete/, "삭제하기"],
                "I want to delete this repository": "이 저장소를 삭제하고 싶어요",
            
                "This will permanently delete the": "이 작업은 영구적으로 삭제할 거예요",
                "repository, wiki, issues, comments, packages, secrets, workflow runs, and remove all collaborator associations.": "저장소, Wiki, 이슈, 댓글, 패키지, 비밀, 워크플로우 실행 및 모든 협업자 연관 정보를 삭제할 거예요.",
                "repository, wiki, issues, comments, packages, secrets, workflow runs, and remove all team associations.": "저장소, Wiki, 이슈, 댓글, 패키지, 비밀, 워크플로우 실행 및 모든 팀 연관 정보를 삭제할 거예요.", // 조직 저장소
                "This will not change your billing plan. If you want to downgrade, you can do so in your Billing Settings.": "이 작업은 사용자님의 결제 플랜을 변경하지 않아요. 만약 다운그레이드하고 싶으시다면, 결제 설정에서 변경할 수 있어요.",
    },
    "regexp": [ // 정규식 번역
        ...I18N["ko-KR"]["repository-public"]["regexp"],
        [/is available./, "이름 사용 가능해요."],
        [/Make ([^ ]+) private/, "$1 을(를) 비공개로 설정하기"],
        [/Make ([^ ]+) public/, "$1 을(를) 공개로 설정하기"],
        [/(\d+) stars?/, "$1 명의 별표"],
        [/(\d+) watchers?/, "$1 명의 주시자"],
        [/To confirm, type \"([^ ]+)\" in the box below/, "확인을 위해, 아래 상자에 \"$1\"을(를) 입력해주세요"],
        [/Your repository \"([^ ]+)\" was successfully archived./, "사용자님의 저장소 “$1”가 성공적으로 아카이브되었어요."], // 저장소 아카이브
        [/Your repository \"([^ ]+)\" was successfully unarchived./, "사용자님의 저장소 “$1”가 성공적으로 아카이브 해제되었어요."], // 저장소 아카이브 해제
        [/is already the branch name./, "이미 분기 이름이에요."],
        [/Your branch name will be/, "사용자님의 분기 이름이 다음으로 변경될 거예요:"],
        [/Choose another branch to use as the default branch of ([^ ]+) instead of/,"$1 의 기본 분기로 사용하기 위해 다른 분기를 선택해주세요"],
        [/(\d+) branch protection rules?/, "$1 개의 분기 보호 규칙"],
        [/Delete/, "삭제하기"],
        [/Default branch changed to ([^ ])/, "기본 분기가 $1(으)로 변경되었어요"],
    ],
};


I18N["ko-KR"]["repository/settings/access"] = { // 저장소 설정 - 협업자/(조직 저장소 협업자 및 팀) /<user-name>/<repo-name>/settings/access
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-settings-menu"]["static"],

        // 협업자 / 협업자 및 팀 - 접근 관리 페이지 /<user-name>/<repo-name>/settings/access ====================================
            // 상단 알림
                "Repository invitation URLs work for invited users only. You may only share this URL with an invited user.": "저장소 초대 URL은 초대된 사용자만 사용할 수 있어요. 초대된 사용자에게만 이 URL을 공유할 수 있어요.",
            "Manage visibility": "가시성 관리",
            "Who has access": "누가 접근할 수 있나요",
            "public repository": "공개 저장소",
            "Public repository": "공개 저장소",
            "This repository is public and visible to anyone": "이 저장소는 공개되어 있으며, 누구나 볼 수 있어요.",
            "This repository is public and visible to anyone.": "이 저장소는 공개되어 있으며, 누구나 볼 수 있어요.",
            "private repository": "비공개 저장소",
            "Only those with access to this repository can view it.": "이 저장소에 접근 권한이 있는 사용자만 볼 수 있어요.",
            "Manage": "관리하기",

            "Direct access": "직접 접근",
            "collaborators have access to this repository. Only you can contribute to this repository.": "명의 협업자가 이 저장소에 접근할 수 있어요. 사용자님만 이 저장소에 기여할 수 있어요.",
            "has access to this repository.": "명이 이 저장소에 접근할 수 있어요.",
            // 조직 저장소
            "teams or members have access to this repository. Only": "팀 또는 멤버가 이 저장소에 접근할 수 있어요. 오직",
            "Owners": "소유자",
            "can contribute to this repository.": "만 이 저장소에 기여할 수 있어요.",

            // 조직 저장소
            "Base role": "기본 역할",
            "All": "모두",
            // [/(\d+) members?/, "$1 명의 멤버"],
            "can access this repository.": "이 저장소에 접근할 수 있어요.",

            "Manage access": "접근 관리하기",
            "You haven't invited any collaborators yet": "아직 협업자를 초대하지 않았어요.",
            "Add people": "사람 추가하기",
            // "users": "사용자님들", 이것이 작동 안되는 이유는 무엇인가
            // "user": "사용자님",
            "have access to this repository.": "이(가) 이 저장소에 접근 할 수 있어요.",

            "Select all": "모두 선택하기",
                // [/(\d+) members? selected…/, "$1 명의 멤버 선택됨..."],
                "Remove Access": "접근 권한 삭제하기",
            "Type": "유형",
                "Filter by member type": "멤버 유형별 필터링",
                    "Pending Invitations": "대기 중인 초대",
            "Find a collaborator…": "협업자 찾기...",

            "Pending Invite": "대기 중인 초대",
            "Remove": "삭제하기",

            // 초대 대화 상자
                "Add a collaborator to": "협업자 추가하기 :",
                "Search by username, full name, or email": "사용자 이름, 전체 이름 또는 이메일로 검색하기",
                "Find people": "사람 찾기",
                "Invite collaborator": "협업자 초대하기",
                "Select a collaborator above": "위에서 협업자 선택하기",
                "Add": "추가하기",
                "to this repository": "이 저장소에",

            // 조직 저장소
            "Create team": "팀 만들기",
            "You haven't added any teams or people yet": "아직 팀이나 멤버를 추가하지 않았어요.",
            "Organization owners can manage individual and team access to the organization's repositories. Team maintainers can also manage a team's repository access.": "조직 소유자는 개별 멤버와 팀의 조직 저장소 접근 권한을 관리할 수 있어요. 팀 유지 관리자는 팀의 저장소 접근을 관리할 수도 있어요.",
            "Learn more about organization access": "조직 접근 권한에 대해 더 알아보기",
            "Add teams": "팀 추가하기",

            "Add people to": "사람 추가하기 :",
            "Select a member above": "위에서 멤버 선택하기",
            "Add teams to": "팀 추가하기 :",
            "Search by team name": "팀 이름으로 검색하기",
            "Select a team above": "위에서 팀 선택하기",

    },
    "regexp": [ // 정규식 번역
        [/(\d+) members? selected…/, "$1 명의 멤버 선택됨..."],
        [/(\d+) members?/, "$1 명의 멤버"],
        [/(\d+) collaborators?/, "$1 명의 협업자"],
        [/(\d+) invitations?/, "$1 개의 초대"],
        [/Awaiting ([^ ]+)’s response/, "$1 님의 응답을 기다리는 중"],
        [/([^ ]+) • Invite collaborator/, "$1 • 협업자 초대하기"],
        ...I18N["ko-KR"]["repository-public"]["regexp"],
    ],
};


I18N["ko-KR"]["repository/settings/interaction_limits"] = { // 저장소 설정 - 상호작용 제한 /<user-name>/<repo-name>/settings/interaction_limits
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-settings-menu"]["static"],

        // 저장소 상호작용 제한 설정 (검토 설정) /<user-name>/<repo-name>/settings/interaction_limits
        // 전체 및 조직 저장소와 동일
            "Temporary interaction limits": "일시적 상호작용 제한",
            "Temporarily restrict which external users can interact with your repository (comment, open issues, or create pull requests) for a configurable period of time.": "구성 가능한 기간 동안 외부 사용자가 사용자님의 저장소와 상호작용(댓글 작성, 이슈 열기 또는 끌어오기 요청 생성)을 일시적으로 제한할 수 있어요.",
            "This may be used to force a \"cool-down\" period during heated discussions or prevent unwanted interactions.": "격렬한 토론 중에 '냉각' 기간을 강제로 적용하거나 불필요한 상호작용을 방지하는 데 사용해 보세요.",

            "You can restrict repository interactions across your account in your": "사용자님의 계정 설정에서 저장소와의 상호작용을 제한할 수 있어요.",
            "account settings": "계정 설정",

            // [/You can restrict repository interactions across the ([^ ]+) organization in your/, "사용자님의 $1 조직 내에서 저장소와의 상호작용을 제한할 수 있어요."],

            "Limit to existing users": "기존 사용자로 제한하기",
                "Users that have recently created their account will be unable to interact with the repository.": "최근에 계정을 생성한 사용자는 저장소와 상호작용할 수 없어요.",
            "Limit to prior contributors": "이전에 기여한 사용자로 제한하기",
                "Users that have not previously": "이전에 한 번도",
                "committed": "커밋한",
                // [/to the ([^ ]+) branch of this repository will be unable to interact with the repository./, "이 저장소의 $1 분기에 해당하는 사용자들은 저장소와 상호작용할 수 없어요."],
            "Limit to repository collaborators": "저장소 협업자로 제한하기",
                "Users that are not": "협업자가 아닌",
                // "collaborators": "",
                // "of one of your repositories will not be able to interact with that repository.": "",
                "will not be able to interact with the repository.": "저장소와 상호작용할 수 없어요.",

            "New users": "새 사용자",
            "Users": "사용자",
            "Contributors": "기여자",
            "Collaborators": "협업자",
            "Organization members": "조직 구성원", // 조직 저장소

            "Enable": "사용",
            "Disable": "사용 안 함",
            // 상호작용 제한 시간 드롭다운 메뉴
            "Enable interaction limits for:": "상호작용 제한 사용 기간:",
            "24 hours": "24시간",
            "3 days": "3일",
            "1 week": "1주",
            "1 month": "1개월",
            "6 months": "6개월",

            // 상단 알림
            "Repository interaction limit settings saved.": "저장소 상호작용 제한 설정이 저장되었어요.",
    },
    "regexp": [ // 정규식 번역
        ...I18N["ko-KR"]["repository-public"]["regexp"],
            [/You can restrict repository interactions across the ([^ ]+) organization in your/, "사용자님의 $1 조직 내에서 저장소와의 상호작용을 제한할 수 있어요."],
            [/to the ([^ ]+) branch of this repository will be unable to interact with the repository./, "이 저장소의 $1 분기에 해당하는 사용자들은 저장소와 상호작용할 수 없어요."],
    ],
};

I18N["ko-KR"]["repository/settings/code_review_limits"] = { // 저장소 설정 - 코드 리뷰 제한 /<user-name>/<repo-name>/settings/code_review_limits
    "static": { // 정적 번역
        ...I18N["ko-KR"]["repository-public"]["static"],
        ...I18N["ko-KR"]["repository-settings-menu"]["static"],

        // 코드 리뷰 제한 /<user-name>/<repo-name>/settings/code_review_limits
            "Restrict users who are permitted to approve or request changes on pull requests in this repository.": "이 저장소의 끌어오기 요청에서 승인하거나 변경 요청할 수 있는 사용자를 제한해 보세요.",
            "Limit to users explicitly granted": "명시적으로 읽기 또는 더 높은 권한이 부여된 사용자로 제한하기",
            "read": " ",
            "or higher access": " ",
                "When enabled, only users explicitly granted access to this repository will be able to submit pull request reviews that \"approve\" or \"request changes\". All users able to submit comment pull request reviews will continue to be able to do so.": "사용 설정 시, 명시적으로 이 저장소의 접근 권한을 부여받은 사용자만 끌어오기 요청 리뷰에서 '승인' 또는 '변경 요청'을 제출할 수 있어요. 댓글 형식의 끌어오기 요청 리뷰를 제출할 수 있는 모든 사용자는 계속해서 그렇게 할 수 있어요.",

            // 상단 알림
                "Code review limit settings saved.": "코드 리뷰 제한 설정이 저장되었어요.",
    },
    "regexp": [ // 정규식 번역
        ...I18N[