/**
 * Doc: The design principles of store is that the module only care about its access to the content
 */
export default class StoreEngine {
    engine: Storage;

    constructor(engine?: Storage) {
        this.engine =  engine ? engine : window.localStorage;
    }

    get(key: string) {
        const content = this.engine.getItem(key)

        return content
    }

    set(key: string, content: string) {
        this.engine.setItem(key, content)
    }
    
}
