"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeAdapter_1 = require("./NodeAdapter");
const ServerStorage_1 = require("../storage/ServerStorage");
class HapiAdapter extends NodeAdapter_1.default {
    /**
     * @param options Environment-specific options
     */
    constructor(options) {
        super({
            request: options.request.raw.req,
            response: options.request.raw.res,
            storage: options.storage
        });
        /**
         * Holds the Storage instance associated with this instance
         */
        this._storage = null;
        this._request = options.request;
        this._responseToolkit = options.responseToolkit;
    }
    /**
     * Returns a ServerStorage instance
     */
    getStorage() {
        if (!this._storage) {
            if (this.options.storage) {
                if (typeof this.options.storage == "function") {
                    this._storage = this.options.storage({ request: this._request });
                }
                else {
                    this._storage = this.options.storage;
                }
            }
            else {
                this._storage = new ServerStorage_1.default(this._request);
            }
        }
        return this._storage;
    }
    /**
     * Given the current environment, this method must redirect to the given
     * path
     * @param location The path to redirect to
     */
    redirect(location) {
        return this._responseToolkit.redirect(location);
    }
}
exports.default = HapiAdapter;
