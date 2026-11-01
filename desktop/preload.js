const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("triolingoDesktop", {
  isDesktop: true,
  platform: process.platform,
  version: "1.0.1",
});
