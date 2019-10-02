/* eslint-disable */
import moment from 'moment';
import * as DateTimeUtil from '@/utils/datetime';

export function getLatLngFromXY(x, y) {
  return {
    lat: y * Math.pow(10, -6),
    lng: x * Math.pow(10, -6)
  };
}

export function getLatLngFromWaypoint(wp) {
  if (wp != null && wp.x !== undefined && wp.y !== undefined && wp.x != null && wp.y != null) {
    return getLatLngFromXY(wp.x, wp.y);
  }
  return {
    lat: 10.763553,
    lng: 106.671185
  };
}

export function isVehicleRunning(vehicle) {
  return vehicle.stateModel.status > 0 && vehicle.stateModel.kmh >= 5;
}

export function isVehicleIdle(vehicle) {
  return vehicle.stateModel.status > 0 && vehicle.stateModel.kmh < 5;
}

export function isVehicleOffline(vehicle) {
  return vehicle.stateModel.status <= 0;
}

export function getVehicleLimitSpeed(vehicle) {
  return vehicle.maxSpeed != null && vehicle.maxSpeed > 0 ? vehicle.maxSpeed : 999;
}

export function isVehicleOverspeed(vehicle) {
  return isVehicleRunning(vehicle) && vehicle.stateModel.kmh > getVehicleLimitSpeed(vehicle);
}

export function isVehicleDisconnected(vehicle) {
  // let lastTime = moment().diff(DateTimeUtil.convertSecond2010ToDateTime(vehicle.stateModel.time), 'minutes');
  // return (isVehicleIdle(vehicle) && lastTime >= 60) || (isVehicleRunning(vehicle) && lastTime >= 10);
  return !vehicle.stateModel.isConnected
}

export function disconnectedReason(vehicle) {
  let reason = ''
  let lastTime = moment().diff(DateTimeUtil.convertSecond2010ToDateTime(vehicle.stateModel.time), 'minutes');

  if ((isVehicleRunning(vehicle) && lastTime >= 10)) {
    reason = 'Đang chạy'
  }
  else if ((isVehicleIdle(vehicle) && lastTime >= 60)) {
    reason = 'Dừng lâu'
  }
  // else if (!vehicle.stateModel.isConnected) {
  //   reason = 'Mất kết nối đến server'
  // }

  return reason;
}

export function getVehicleStatus(vehicle) {

  let status = '---';

  if (vehicle.stateModel != null) {

    let lastTimeString = DateTimeUtil.convertSecondToRelativeTime(vehicle.stateModel.time);

    if (isVehicleRunning(vehicle)) {
      status = `Đang chạy ${vehicle.stateModel.kmh} Km/h`;
    }

    if (isVehicleIdle(vehicle)) {
      status = `Dừng ${lastTimeString}`;
    }

    if (isVehicleOffline(vehicle)) {
      status = `Tắt máy ${lastTimeString}`;
    }

    if (isVehicleOverspeed(vehicle)) {
      status = `Đang chạy ${vehicle.stateModel.kmh} Km/h (Quá tốc độ)`;
    }

    if (isVehicleDisconnected(vehicle)) {
      status = `Mất kết nối ${lastTimeString}`;
    }
  }

  return status;
}
export function getVehicleIcon(vehicle) {

  let vehicleType = vehicle.vehicleType === 1 ? 'motor' : 'car';

  let runningVehicle = `static/icons/${vehicleType}/green.png`;
  let stoppedVehicle = `static/icons/${vehicleType}/yellow.png`;
  let offlineVehicle = `static/icons/${vehicleType}/black.png`;
  let overspeedVehicle = `static/icons/${vehicleType}/red.png`;
  let disconnectedVehicle = `static/icons/${vehicleType}/gray.png`;

  let url = disconnectedVehicle;

  if (vehicle.stateModel != null) {

    if (isVehicleRunning(vehicle)) {
      url = runningVehicle;
    }

    if (isVehicleIdle(vehicle)) {
      url = stoppedVehicle;
    }

    if (isVehicleOffline(vehicle)) {
      url = offlineVehicle;
    }

    if (isVehicleOverspeed(vehicle)) {
      url = overspeedVehicle;
    }

    if (isVehicleDisconnected(vehicle)) {
      url = disconnectedVehicle;
    }
  }

  return url;
}

export function getVehicleIconForHistory(vehicle) {

  let vehicleType = vehicle.vehicleType === 1 ? 'motor' : 'car';

  let runningVehicle = `static/icons/${vehicleType}/green.png`;
  let stoppedVehicle = `static/icons/${vehicleType}/yellow.png`;
  let offlineVehicle = `static/icons/${vehicleType}/black.png`;
  let overspeedVehicle = `static/icons/${vehicleType}/red.png`;

  let url = offlineVehicle;

  if (vehicle.stateModel != null) {

    if (isVehicleRunning(vehicle)) {
      url = runningVehicle;
    }

    if (isVehicleIdle(vehicle)) {
      url = stoppedVehicle;
    }

    if (isVehicleOffline(vehicle)) {
      url = offlineVehicle;
    }

    if (isVehicleOverspeed(vehicle)) {
      url = overspeedVehicle;
    }
  }

  return url;
}

export function getVehicleMarkerIcon(vehicle) {

  let url = getVehicleIcon(vehicle);

  let icon = new L.Icon({
    iconUrl: url,
    iconSize: [50, 50]
  });

  let marker = new L.marker(getLatLngFromWaypoint(vehicle.stateModel), {
    icon: icon,
    rotationAngle: vehicle.stateModel.heading,
    rotationOrigin: 'center center'
  })
    .bindTooltip(vehicle.plate, {
      permanent: true,
      direction: 'bottom',
      opacity: 1,
      offset: [0, 25]
    });

  return marker;
}

export function getVehicleMarkerIconForHistory(vehicle) {

  let url = getVehicleIconForHistory(vehicle);

  let icon = new L.Icon({
    iconUrl: url,
    iconSize: [50, 50]
  });

  let marker = new L.marker(getLatLngFromWaypoint(vehicle.stateModel), {
    icon: icon,
    rotationAngle: vehicle.stateModel.heading,
    rotationOrigin: 'center center'
  });

  return marker;
}
