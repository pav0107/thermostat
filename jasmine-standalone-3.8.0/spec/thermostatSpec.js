'use strict';

describe('Thermostat', () => {
  let thermostat;
  describe('temperature', () => {
    beforeEach(() => {
      thermostat = new Thermostat();
    });
    it('expects the temperature to start at 20 degrees', () => {
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });
    it('can increase the temperature with an up function', () => {
      thermostat.up();
      expect(thermostat.getCurrentTemperature()).toEqual(21);
    });
    it('can decrease the temperature with an up function', () => {
      thermostat.down();
      expect(thermostat.getCurrentTemperature()).toEqual(19);
    });
    it('has a minimum temperature of 10 degrees', () => {
      for (let i = 0; i < 11; i++) {
        thermostat.down();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(10);
    });
    it('can be reset to the default temperature', () => {
      for (let i = 0; i < 6; i++) {
        thermostat.up();
      }
      thermostat.resetTemperature();
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });
  });

  describe('power saving', () => {
    beforeEach(() => {
      thermostat = new Thermostat();
    });

    it('has power saving mode on by default', () => {
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });

    it('can switch PSM off', () => {
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toBe(false);
    });

    it('can switch PSM back on', () => {
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toBe(false);
      thermostat.switchPowerSavingModeOn();
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });

    it('has a maximum temperature of 25 degrees when power saving is on', () => {
      for (let i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(25);
    });

    it('has a maximum temperature of 32 degrees when power saving is off', () => {
      thermostat.switchPowerSavingModeOff();
      for (let i = 0; i < 13; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(32);
    });
  });

  describe('displaying usage levels', () => {
    describe('when the temperature is below 18 degrees', () => {
      it('it is considered low-usage', () => {
        thermostat = new Thermostat();
        for (let i = 0; i < 3; i++) {
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual('low-usage');
      });
    });

    describe('when the temperature is between 18 and 25 degrees', () => {
      it('it is considered medium-usage', () => {
        thermostat = new Thermostat();
        console.log(thermostat.temperature);
        expect(thermostat.energyUsage()).toEqual('medium-usage');
      });
    });

    describe('when the temperature is anything else', () => {
      it('it is considered high-usage', () => {
        thermostat = new Thermostat();
        thermostat.powerSavingMode = false;
        for (let i = 0; i < 6; i++) {
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual('high-usage');
      });
    });
  });
});
