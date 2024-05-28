import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";

const toReadableTime = (time) => {
  return time ? new Date(time).toLocaleString() : "--";
}

const toReadableDate = (date) => {
  return date ? new Date(date).toDateString() : "--";
}

const toPercent = (number) => {
  return typeof number === 'number' ? (number * 100).toFixed(2) + '%' : "--";
}

const toAbbreviateNumber = (number) => {
  try {
    let abbreviated = abbreviateNumber(number, 1, { symbols: ["", "k", "M", "B", "T", "P", "E"] });
    return abbreviated;
  } catch (err) {
    return "--";
  }
}

const toDecimalHundredths = (number) => {
  return typeof number === 'number' ? number.toFixed(2) : "--";
}

export {
  toReadableTime,
  toReadableDate,
  toPercent,
  toAbbreviateNumber,
  toDecimalHundredths,
}