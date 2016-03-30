/// <reference path="browser/ambient/jquery/index.d.ts" />
/// <reference path="browser/ambient/lodash/index.d.ts" />
/// <reference path="browser/ambient/react-dom/index.d.ts" />
/// <reference path="browser/ambient/react-redux/index.d.ts" />
/// <reference path="browser/ambient/react-router-redux/index.d.ts" />
/// <reference path="browser/ambient/react-router/index.d.ts" />
/// <reference path="browser/ambient/react/index.d.ts" />
/// <reference path="browser/ambient/redux-thunk/index.d.ts" />
/// <reference path="browser/ambient/redux/index.d.ts" />
/// <reference path="browser/ambient/toastr/index.d.ts" />

// So that we can require() stuff with webpack.
declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
