declare module 'method-override' {
    import { RequestHandler } from 'express';

    function methodOverride(method: string): RequestHandler;
    function methodOverride(options: { methods: string[] }): RequestHandler;
    export default methodOverride;
}
