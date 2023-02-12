import Store from '../libraries/store'

import { Application } from './application'

import key from 'keymaster'

export interface Config {
    isDarkMode: boolean
    isOpenScreen: boolean
}

export class Runtime {
    config: Config

    store: Store

    applications: Map<string, Application>

    shortcuts: Map<string, Function>

    constructor() {
        this.config = {
            isDarkMode: true,
            isOpenScreen: true
        }

        this.store = new Store();

        this.applications = new Map()

        this.shortcuts = new Map()

        this._handleInlineInit()
    }

    _handleInlineInit() {
        this._handleInlineLoad()
    }

    _handleInlineSave() {
        const config = JSON.stringify(this.config)

        this.store.set('config', config)

        this.applications.forEach(application => {
            application.store()
        })
    }

    _handleInlineLoad() {
        const config = this.store.get('config')

        if (config) {
            const _config = JSON.parse(config)

            this.config = _config
        }

        this.applications.forEach(application => {
            application.restore()
        })
    }

    getConfig() {
        return this.config
    }

    setConfig(key: string, value: any) {
        Object.assign(this.config, {
            [key]: value
        })

        this._handleInlineSave()
    }

    registerApplication(application: Application) {
        const { name } = application;

        this.applications.set(name, application)

        this._handleInlineLoad()
    }

    getApplication(name: string) {
        const application = this.applications.get(name);
        if (!application) {
            return null
        }

        return application
    }

    registerShortcut(shortcut: string, callback: Function) {
        this.shortcuts.set(shortcut, callback)

        key(shortcut, () => callback())
    }
}

const runtime = new Runtime()

export default runtime;
