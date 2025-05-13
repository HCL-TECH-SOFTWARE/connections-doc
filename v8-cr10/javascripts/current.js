
window.ScCustomLangSelector = function(cfg) {
 cfg.location = 'TopRight';


    const icon = `
    
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    

<path id="scLangCustomSelectorIcon" d="M16.4001 9.00156C16.4001 13.0885 13.087 16.4016 9.0001 16.4016M16.4001 9.00156C16.4001 4.91466 13.087 1.60156 9.0001 1.60156M16.4001 9.00156H1.6001M9.0001 16.4016C4.91319 16.4016 1.6001 13.0885 1.6001 9.00156M9.0001 16.4016C10.851 14.3752 11.9029 11.7455 11.9601 9.00156C11.9029 6.25767 10.851 3.62794 9.0001 1.60156M9.0001 16.4016C7.14915 14.3752 6.09726 11.7455 6.0401 9.00156C6.09726 6.25767 7.14915 3.62794 9.0001 1.60156M1.6001 9.00156C1.6001 4.91466 4.91319 1.60156 9.0001 1.60156"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    

</svg>`;

    const loader = `

<div class="sc-loader">
        

<span>

</span>

<span>

</span>
        

<span>

</span>

<span>

</span>
    

</div>
    `;

    const selectorStyles = `
   .scLangCustomSelectorLabel {
        display: flex;
		width: fit-content;
        align-items: center;
        background: #262626;
        padding: 10px 20px;
        color: white !important;
        line-height: 13px;
        border: 1px solid #d7d7d7;
        border-radius: 6px;
        font-size: 13px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 19px 0px;
        cursor: pointer;
        transition: opacity 0.3s;
        opacity: 1;
        direction: ltr;
    }
	#scLangSelectorContainer {
		right: 40px;
		top: 20px;
		
	}
    .scLangCustomSelectorLabel span {
        display: inline-block;
    }

    .scLangCustomSelectorLabel span:first-letter, .scLangItem:first-letter {
        text-transform: capitalize;
    }

    #scLangCustomSelectorIcon {
        stroke: white;
    }

    .scLangCustomSelectorLabel:hover #scLangCustomSelectorIcon {
        stroke: white !important;
    }

    .scLangCustomSelectorLabel:hover {
        color: white !important;
    }

    .scLangCustomSelectorLabel svg {
        vertical-align: middle;
    }

    .scLangCustomSelectorLabel > span {
        vertical-align: middle;
        font-weight: 600;
        margin-left: 5px;
    }

    .scLangCustomSelectorLabel.scLangCustomSelectorLabel-open {
        opacity: 0.5;
    }

    .scLangPanel {
        position: relative;
        bottom: calc(100% + 3px);
        right: 0;

        display: grid;
        gap: 6px;
        transform-origin: bottom right;
        min-width: 100%;
        box-sizing: border-box;

        border-radius: 10px;
        line-height: 13px;
        font-size: 13px;
        color: #6B6679;
        background: black !important;
        padding: 6px;
        box-shadow: 0 0 2px rgba(44, 36, 64, 0.48), 0 4px 10px rgba(44, 36, 64, 0.16);
    }

    .scLangPanel.scLangPanel-Top {
        bottom: unset;
        top: calc(100% + 3px);
    }

    .scLangPanel.hidden {
        display: none;
    }

    .scLangPanel.scLangPanel-Top:not(.hidden) {
        animation: scLangPanelEnter-Top .3s;
    }

    .scLangPanel.scLangPanel-Bottom:not(.hidden) {
        animation: scLangPanelEnter-Bottom .3s;
    }

    .scLangItem.scLangItem-selected {
        background: white;
        color: black;
    }

    .scLangItem:hover {
        background: #2e2e2e;
    }

    .scLangItem.scLangItem-selected:hover {
        background: white;
    }

    .scLangItem {
        transition: background 0.1s ease-out;
        flex: 0;
        border-radius: 6px;
        white-space: nowrap;
        font-size: 13px;
        padding: 10px 20px;
        text-align: center;
        color: white;
        cursor: pointer;
        font-weight: bold;
    }

    .scLangCustomSelectorWatermark {
        margin-top: 6px;
        color: #ABA7B3;
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
    }
	
	.scLangCustomSelector-arrow{
		display: inline-block;
		margin-left: 0.255em;
		vertical-align: 0.255em;
		content: "";
		border-top: 0.3em solid white;
		border-right: 0.3em solid transparent;
		border-bottom: 0;
		border-left: 0.3em solid transparent;
	}
    .scLangCustomSelectorWatermark a {
        color: #797389;
        text-decoration: underline;
    }

    .sc-loader {
        display: inline-block;
        position: relative;
        width: 18px;
        height: 18px;
    }

    .sc-loader span {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border-width: 2px;
        border-style: solid;
        border-color: white transparent transparent transparent;
        border-radius: 50%;
        animation: sc-loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }

    .sc-loader span:nth-child(1) {
        animation-delay: -0.45s;
    }

    .sc-loader span:nth-child(2) {
        animation-delay: -0.3s;
    }

    .sc-loader span:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes scLangPanelEnter-Top {
        from {
            opacity: 0;
            transform: translate3d(0, -10px, 0);
        }
        to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes scLangPanelEnter-Bottom {
        from {
            opacity: 0;
            transform: translate3d(0, 10px, 0);
        }
        to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes sc-loader {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    `;

    function genId() {
        const w = window;
        w.__scId = w.__scId || 0;
        w.__scId++;
        return 'sc' + w.__scId;
    }

    function HTMLElementInfo(tag, classes, innerHTML, parent, style) {
        this.tag = tag;
        this.classes = classes;
        this.innerHTML = innerHTML;
        this.parent = parent;
        this.style = style;
    }

    function ResilientStorage() {
        this.trySetItem = function(key, value) {
            try {
                window.localStorage.setItem(key, value);
            } catch (e) {
                console.error(e);
            }
        }

        this.tryGetItem = function(key) {
            try {
                return window.localStorage.getItem(key);
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    }

    function onClickOutside(
        root,
        target,
        handler,
        preCondition = null,
        triggerOnWindowBlur = false
    ) {
        const internalHandler = (e) => {
            if (!e.target || (preCondition && !preCondition(e))) {
                return;
            }

            if (e.type === 'blur') {
                handler(e);
                return;
            }

            if (e.target !== target && !target.contains(e.target)) {
                handler(e);
            }
        };

        root.addEventListener('click', internalHandler);

        if (triggerOnWindowBlur) {
            window.addEventListener('blur', internalHandler);
        }

        return () => {
            root.removeEventListener('click', internalHandler);
            window.removeEventListener('blur', internalHandler);
        };
    }


    this.button = null;
    this.currentLocale = null;
    this.langs = null;
    this.panelIsHidden = true;
    this.langsPromise = null;
    this.storage = new ResilientStorage();
    this.id = genId();
    window[this.id] = this;
    this._cfg = cfg;
    this._renderedElements = new Map();
    this._isLoading = false;

    this.root = () => {
        return this.button.shadowRoot;
    };

    this.init = async () => {
        const langs = await this.loadLangs();
        this.currentLocale = this._cfg.getCurrentLang(langs);

        this.button = document.createElement('div');
        this.button.attachShadow({ mode: 'open' });
        this.button.setAttribute('sc-ignore', 'true');
        this.button.className = 'scLangCustomSelector';
        const container = document.getElementById('scLangSelectorContainer') || document.body;
        container.append(this.button);
        this.button.addEventListener('click', () => {
            if (this.panelIsHidden) {
                this.showPanel();
            } else {
                this.hidePanel();
            }
        });

        onClickOutside(document.body, this.button, () => {
            this.hidePanel();
        });

        this.render();

        if (this.isFirstTime()) {
            this.button.classList.add('fadeIn');
            setTimeout(() => {
                this.button.classList.add('shown');
                this.setFirstTimeFalse();
            }, 1500);
        } else {
            this.button.classList.add('shown');
        }
    };

    this.reloadLangs = async () => {
        this.langsPromise = null;
        await this.loadLangs();
        this.render();
    };

    this.updateConfig = (config) => {
        this._cfg = {
            ...this._cfg,
            ...config
        };
        this.root().innerHTML = '';
        this._renderedElements.clear();
        this.render();
    };

    this.render = () => {
        if (this.langs == null) {
            return;
        }

        if (!this.langs.find(x => x.locale === this.currentLocale.locale)) {
            return;
        }

        const currentLang = this.currentLocale;

        this.renderElement('styles', new HTMLElementInfo(
            'style',
            [],
            selectorStyles,
            this.root(),
            undefined
        ));

        const watermarkInfo = new HTMLElementInfo(
            'span',
            ['scLangCustomSelectorWatermark'],
            `Powered by 

<a href="https://smartcat.com/" target="_blank">Smartcat
</a>`,
            this.root(),
            undefined
        );

        const selectedLangInfo = new HTMLElementInfo(
            'div',
            ['scLangCustomSelectorLabel', `scLangCustomSelectorLabel-${!this.panelIsHidden && 'open'}`],
            `${this._isLoading ? loader : icon} <span>${currentLang.name} </span><span class='scLangCustomSelector-arrow'></span>`,
            this.root(),
            undefined
        );

        let { offsets, location } = this._cfg;
  // FIXED LOCATION  
  location = 'TopRight';
  
  
        if (location == 'BottomRight') {
            this.renderElement('selectedLang', selectedLangInfo);

            if (this._cfg.showWatermark) {
                this.renderElement('watermark', watermarkInfo);
            }
        } else {
            if (this._cfg.showWatermark) {
                this.renderElement('watermark', watermarkInfo);
            }

            this.renderElement('selectedLang', selectedLangInfo);
        }

        this.renderLangPanel();
        this.button.classList.toggle('scLangCustomSelector-None', location === 'None');
    };

    this.setIsLoading = (value) => {
        if (value !== this._isLoading) {
            this._isLoading = value;
            this.render();
        }
    };

    this.isFirstTime = () => {
        try {
            let v = this.storage.tryGetItem('selector-shown');
            return v !== 'true';
        } catch {
            return false;
        }
    };

    this.setFirstTimeFalse = () => {
        try {
            this.storage.trySetItem('selector-shown', 'true');
        } catch {
        }
    };

    this.renderElement = (name, elInfo) => {
        let el;

        if (this._renderedElements.has(name)) {
            el = this._renderedElements.get(name);
        } else {
            el = document.createElement(elInfo.tag);
            this._renderedElements.set(name, el);
            elInfo.parent.appendChild(el);
        }

        if (el.innerHTML != elInfo.innerHTML) {
            el.innerHTML = elInfo.innerHTML;
        }

        if (Array.isArray(elInfo.classes)) {
            el.className = elInfo.classes.join(' ');
        } else {
            Object.keys(elInfo.classes).forEach(key => {
                el.classList.toggle(key, elInfo.classes[key]);
            });
        }

        if (elInfo.style) {
            el.setAttribute('style', elInfo.style);
        }
    };

    this.loadLangs = () => {
        if (this.langsPromise) {
            return this.langsPromise;
        }
        this.langsPromise = this._cfg.langs();
        this.langsPromise.then((v) => {
            this.langs = v;
        });
        return this.langsPromise;
    };

    this.renderLangPanel = () => {
        if (!this.langs) {
            console.log('Can\'t render lang panel: no langs');
            return;
        }
        const langsHtml = this.renderLangButtons();
        const gridColumnCount = this.getColumnCount(this.langs.length - 1);

        this.renderElement('langGrid', new HTMLElementInfo(
            'div',
            {
                'scLangPanel': true,
                'scLangPanel-Top': this._cfg.location == 'TopRight',
                'scLangPanel-Bottom': this._cfg.location == 'BottomRight',
                'hidden': this.panelIsHidden
            },
            langsHtml,
            this.root(),
            `grid-template-columns: repeat(${gridColumnCount}, 1fr)`
        ));
    };

    this.renderLangButtons = () => {
        const renderItem = function (lang) {
            return `
<div onclick="${this.id}.switchLang('${lang.locale}', event)" class="scLangItem">${lang.name}

</div>`;
        }.bind(this);

        return this.langs
            .filter(x => x.isSource || x.isPublished)
            .map(l => renderItem(l))
            .join('');
    };

    this.getColumnCount = (langCount) => {
        if (langCount < 4) {
            return 1;
        }
        if (langCount < 7) {
            return 2;
        }
        return 3;
    };

    this.switchLang = async (locale, event) => {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.hidePanel();

        this._cfg.switchLocale(locale);
        if (!this.langs) {
            await this.loadLangs();
        }
        this.currentLocale = this.langs.find(x => x.locale === locale);
        this.render();
    };

    this.hidePanel = () => {
        this.panelIsHidden = true;
        this.render();
    };

    this.showPanel = () => {
        this.panelIsHidden = false;
        this.render();
    };
}


  function onReady(handler) {
if (document.readyState !== 'loading') {
handler();
} else {
document.addEventListener('DOMContentLoaded', handler);
}
   }
  const observeUrlChange = () => {
  let oldHref = document.location.href;
  const body = document.querySelector("body");
  const observer = new MutationObserver(mutations => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      if (!document.querySelector('.scLangCustomSelector'))
          sc.initLangSelector();
           }
        });
    observer.observe(body, { childList: true, subtree: true });
  };
  onReady(()=>setTimeout(observeUrlChange, 500));