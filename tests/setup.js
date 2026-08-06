// Global DOM setup mock for Node test environment

class ElementMock {
    constructor(tagName) {
        this.tagName = tagName;
        this.id = '';
        this.className = '';
        this.innerHTML = '';
        this.innerText = '';
        this.textContent = '';
        this.style = {};
        this.children = [];
        this.classList = {
            _classes: new Set(),
            add: (c) => this.classList._classes.add(c),
            remove: (c) => this.classList._classes.delete(c),
            contains: (c) => this.classList._classes.has(c),
            toggle: (c) => this.classList._classes.has(c) ? this.classList._classes.delete(c) : this.classList._classes.add(c)
        };
        
        let _cssText = '';
        Object.defineProperty(this.style, 'cssText', {
            get: () => _cssText,
            set: (val) => {
                _cssText = val;
                val.split(';').forEach(rule => {
                    const parts = rule.split(':');
                    if (parts.length >= 2) {
                        const prop = parts[0].trim();
                        const value = parts[1].replace('!important', '').trim();
                        this.style[prop] = value;
                    }
                });
            }
        });
    }

    appendChild(child) {
        this.children.push(child);
        return child;
    }

    removeChild(child) {
        const idx = this.children.indexOf(child);
        if (idx !== -1) this.children.splice(idx, 1);
        return child;
    }

    querySelector() { return null; }
    querySelectorAll() { return []; }
    addEventListener() {}
    removeEventListener() {}
}

const elementsMap = new Map();

const documentMock = {
    body: new ElementMock('body'),
    createElement: (tag) => new ElementMock(tag),
    getElementById: (id) => {
        if (!elementsMap.has(id)) {
            elementsMap.set(id, new ElementMock('div'));
            elementsMap.get(id).id = id;
        }
        return elementsMap.get(id);
    },
    querySelector: (selector) => null,
    querySelectorAll: (selector) => [],
    addEventListener: () => {},
    removeEventListener: () => {}
};

const localStorageMock = (function() {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, val) => { store[key] = String(val); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; }
    };
})();

global.window = global;
global.document = documentMock;
global.localStorage = localStorageMock;
global.navigator = { userAgent: 'NodeTestRunner' };
global.location = { href: 'http://localhost/' };
global.fetch = async () => ({
    ok: true,
    json: async () => ({}),
    text: async () => ''
});
global.addEventListener = () => {};
global.removeEventListener = () => {};
