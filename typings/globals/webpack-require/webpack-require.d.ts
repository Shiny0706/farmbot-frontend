/**
 * This is a hack to work around the issue that MQTT.js requires streams,
 * which in turn requires node.d.ts, which in turn creates conflicts between
 * node's require() and webpack's require.
 */
interface NodeRequireFunction {
    resolve(id:string): string;
    (id: string): any;
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    cache: any;
    extensions: any;
    main: any;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

declare var require: NodeRequireFunction;
