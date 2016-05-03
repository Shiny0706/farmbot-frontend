declare module "farmbot" {
  import Client = __mqtt.Client;
  type FBResponse = Promise<{}>;
  export class Farmbot {
      private _events;
      private _state;
      client: Client;
      constructor(input: any);
      _decodeThatToken(): void;
      getState(key?: any): any;
      setState(key: any, val: any): any;
      emergencyStop(): FBResponse;
      execSequence(sequence: any): FBResponse;
      homeAll(opts: any): FBResponse;
      homeX(opts: any): FBResponse;
      homeY(opts: any): FBResponse;
      homeZ(opts: any): FBResponse;
      moveAbsolute(opts: any): FBResponse;
      moveRelative(opts: any): FBResponse;
      pinWrite(opts: any): FBResponse;
      readStatus(): FBResponse;
      syncSequence(): FBResponse;
      updateCalibration(params: any): FBResponse;
      static config: {
          requiredOptions: string[];
          defaultOptions: {
              speed: number;
              timeout: number;
          };
      };
      event(name: any): any;
      on(event: any, callback: any): void;
      emit(event: any, data: any): void;
      buildMessage(input: any): any;
      channel(name: String): string;
      send(input: any): FBResponse;
      _onmessage(channel: String, buffer: Uint8Array, message: any): void;
      connect(callback: any): FBResponse;
      static defer(label: any): FBResponse;
      static timerDefer(timeout: Number, label: String): FBResponse;
      static extend(target: any, mixins: any): any;
      static requireKeys(input: any, required: any): void;
      static uuid(): string;
      static MeshErrorResponse(input: any): {
          error: {
              method: string;
              error: any;
          };
      };
  }
}
