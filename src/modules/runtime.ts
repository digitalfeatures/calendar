import Store from "../libraries/store"

export interface Config {
    isDarkMode: boolean
}

export class Runtime {
    config: Config

    store: Store

    constructor() {
        this.config = {
            isDarkMode: false
        }

        this.store = new Store();

        this._load();
    }

    _save() {
        const content = JSON.stringify(this.config)

        this.store.set('config', content)
    }

    _load() {
        const content = this.store.get('config');
        if (content) {
            this.config = JSON.parse(content);
        }
    }

    getConfig() {
        return this.config
    }

    setConfig(key: string, value: any) {
        Object.assign(this.config, {
            [key]: value
        })

        this._save()
    }
}