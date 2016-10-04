export interface BotLog {
  /** The actual message that was emitted */
  message: string;
  /** a Unix timestamp (UTC) */
  time: number;
  /** A subset of interface `HardwareState`. But I only needed x,y,z. */
  status: {
    x: number;
    y: number;
    z: number;
  };
};

/** How the device is stored in the API side.
 * This is what comes back from the API as JSON.
 */
export interface DeviceAccountSettings {
  id: number;
  name: string;
  uuid: string;
  webcam_url?: string;
  /** Must the deivce be saved? */
  dirty?: boolean;
};

export interface BotState {
  account: DeviceAccountSettings;
  /** Maximum number of messages to cache. Excess is truncated. */
  logQueueSize: number;
  logQueue: BotLog[];
  status: string;
  /** How many steps to move when the user presses a manual movement arrow */
  stepSize: number;
  /** Holds coordinates that the user is currently editing, but has not sent */
  axisBuffer: {
    // x?: string;
    // y?: string;
    // z?: string;
  [name: string]: string | undefined;
  };
  /** Holds settings that the user is currently editing, but has not sent */
  settingsBuffer: {
    movement_max_spd_x?: string;
    movement_max_spd_y?: string;
    movement_max_spd_z?: string;
    movement_steps_acc_dec_x?: string;
    movement_steps_acc_dec_y?: string;
    movement_steps_acc_dec_z?: string;
    movement_timeout_x?: string;
    movement_timeout_y?: string;
    movement_timeout_z?: string;
    [name: string]: string | undefined;
  };
  hardware: HardwareState;
}

/** Status registers for the bot's status */
export interface HardwareState {
  version?: string;
  s?: number;
  x?: number;
  y?: number;
  z?: number;
  movement_axis_nr_steps_x?: number;
  movement_axis_nr_steps_y?: number;
  movement_axis_nr_steps_z?: number;
  movement_home_up_x?: number;
  movement_home_up_y?: number;
  movement_home_up_z?: number;
  movement_invert_endpoints_x?: number;
  movement_invert_endpoints_y?: number;
  movement_invert_endpoints_z?: number;
  movement_invert_motor_x?: number;
  movement_invert_motor_y?: number;
  movement_invert_motor_z?: number;
  movement_max_spd_x?: number;
  movement_max_spd_y?: number;
  movement_max_spd_z?: number;
  movement_min_spd_x?: number;
  movement_min_spd_y?: number;
  movement_min_spd_z?: number;
  movement_steps_acc_dec_x?: number;
  movement_steps_acc_dec_y?: number;
  movement_steps_acc_dec_z?: number;
  movement_timeout_x?: number;
  movement_timeout_y?: number;
  movement_timeout_z?: number;
  param_version?: number;
  pin0?: number;
  pin1?: number;
  pin2?: number;
  pin3?: number;
  pin4?: number;
  pin5?: number;
  pin6?: number;
  pin7?: number;
  pin8?: number;
  pin9?: number;
  pin10?: number;
  pin11?: number;
  pin12?: number;
  pin13?: number;
}

export interface MqttMessage {
  error?: string | undefined;
  id?: string | undefined;
  result: HardwareState;
}

