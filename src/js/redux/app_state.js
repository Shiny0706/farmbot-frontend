export var appState = {
  getState: function() {
    var stored = localStorage["FARMBOT_DESIGNER_CACHE"];
    try {
      return (stored ? JSON.parse(stored) : this.defaultState);
    } catch(e) {
      console.warn("Error while loading app state from localStorage. " +
                   "Reseting app state.");
      this.saveState(this.defaultState);
      return this.defaultState;
    };

  },
  saveState: function (state) {
    return localStorage["FARMBOT_DESIGNER_CACHE"] = JSON.stringify(state);
  },
  defaultState: {
      leftMenu: {
        component: 'PlantInventory',
        tab:       'Plants'
      },
      route: {
        // Empty initially.
      },
      global: {
        plants: [],
        planting_area: {
                         _id: "56154f3e766f6c5789020000",
                         device_id: "56154f2f766f6c5789010000",
                         length: 300,
                         width: 600
                       },
        selectedPlant: {}
      }
    }
  };
