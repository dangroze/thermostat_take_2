'use strict';

describe('Thermostat', function() {
  var thermostat;
  beforeEach(function() {
    thermostat = new Thermostat;
  })
  it('Starts at 20 degrees', function() {
    expect(thermostat.currentTemperature()).toEqual(20);
  })
  it('Increases temperature by 1', function () {
    thermostat.up();
    expect(thermostat.currentTemperature()).toEqual(21);
  })
  it('Decreases temperature by 1', function () {
    thermostat.down();
    expect(thermostat.currentTemperature()).toEqual(19);
  })
  it('Has a min temperature of 10', function () {
    for(var i = 0; i < 15; i++) {
      thermostat.down();
    }
    expect(thermostat.currentTemperature()).toEqual(10);
  })
  it('Has power saving mode on by default', function () {
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  })
  it('Can switch power saving mode off', function () {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  })
  it('Can switch power saving mode on', function () {
    thermostat.switchPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  })
  describe('When power saving mode on', function () {
    it('Has maximum temp of 25', function () {
      for( var i = 0; i < 10; i++){
        thermostat.up();
      }
      expect(thermostat.currentTemperature()).toEqual(25);
    })
  })
  describe('When power saving mode off', function () {
    it('Has maximum temp of 32', function () {
      thermostat.switchPowerSavingModeOff();
      for(var i = 0; i < 15; i++) {
        thermostat.up();
      }
      expect(thermostat.currentTemperature()).toEqual(32);
    })
  })
  it('Can reset temp back to 20', function () {
    thermostat.reset();
    expect(thermostat.currentTemperature()).toEqual(20);
  })
  describe('Energy usage levels', function () {
    it('Shows low usage when temp < 18', function () {
      for(var i = 0; i < 3; i++) {
        thermostat.down();
      }
        expect(thermostat.energyUsage()).toEqual('low-usage');
    })
    it('Shows medium usage when temp is between 18-25', function () {
      expect(thermostat.energyUsage()).toEqual('medium-usage')
    })
    it('Shows high usage when temp is > 25', function () {
      for(var i = 0; i < 10; i++) {
        thermostat.up();
      }
      expect(thermostat.energyUsage()).toEqual('high-usage');
    })
  })
})