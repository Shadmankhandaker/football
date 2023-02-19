import { UAParser } from "ua-parser-js";

const parser = new UAParser();
const browser = parser.getBrowser();
const device = parser.getDevice();
const OS = parser.getOS();

export const isInMobileBrowser = () => {
  if (
    device.type === "mobile" &&
    browser.name !== "Chrome WebView" &&
    browser.name !== "Webkit"
  ) {
    return {
      status: true,
      device,
      browser,
      OS,
    };
  } else {
    return { status: false, device, browser, OS };
  }
};

export const isInBrowser = () => {
  if (browser.name !== "Chrome WebView" && browser.name !== "Webkit") {
    return true;
  } else {
    return false;
  }
};
