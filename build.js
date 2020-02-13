/**
 * Instructions: node build.js %{mappingSite[專案名稱]} %{專案根目錄名稱} debug
 * ref
 * shelljs: https://www.kancloud.cn/outsider/clitool/313191
 * nodejs: https://nodejs.org/docs/latest/api/path.html#path_path_dirname_path
 * example: node buildj.js [site] [mode] [devMode] [debug]
 */

/**
 * npm install node_module
 */
// if (shell.exec('npm i').code !== 0) {
//   shell.echo('Error: npm install node_module failed');
//   shell.exit(1);
// }

/**
 * tool
 */
const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

const mappingSite = {
  sunbet_cny: "Demo",
  demo: "Demo"
};

/**
 * temp script info
 */
let tmpSite = "Demo";
let tmpMode = "regulatory";

/**
 * get parameter
 */
const args = process.argv.slice(2);
let site = args[0] ? mappingSite[args[0]] : "";
let mode = args[1] || "";
let devMode = args[2] || false;
let debug = args[3] || false;

shell.echo(`site = ${site}`);
shell.echo(`mode = ${mode}`);
shell.echo(`dev mode = ${devMode}`);
shell.echo(`debug = ${debug}`);

if (site == "" || mode == "" || (mode != "regulatory" && mode != "website") || (devMode != "production" && devMode != "dev")) {
  shell.echo("請輸入正確參數");
  return;
}

/**
 * copy file to destination folder
 */
shell.echo(`複製相對應的檔案資料至目的資料夾進行編譯`);

if (devMode == "dev")
  shell.sed('-i', 'SiteConfig.domain.main', 'SiteConfig.domain.staging', `${__dirname}/src/actions/axiosIns.js`);
else
  shell.sed('-i', 'SiteConfig.domain.staging', 'SiteConfig.domain.main', `${__dirname}/src/actions/axiosIns.js`);

shell.sed('-i', `../${tmpMode}/${tmpSite}/config`, `../${mode}/${site}/config`, `${__dirname}/src/actions/axiosIns.js`);
shell.sed('-i', `../${tmpMode}/${tmpSite}/config`, `../${mode}/${site}/config`, `${__dirname}/src/reducers/LocalesReducer.js`);

shell.sed('-i', `"${tmpSite}"`, `"${site}"`, `${__dirname}/build.js`);
shell.sed('-i', `"${tmpMode}"`, `"${mode}"`, `${__dirname}/build.js`);

/**
 * select run mode
 */
if (debug) {
  shell.echo(`執行 debug 模式`);
  if (shell.exec(`npm run dev --site=${site} --mode=${mode}`).code !== 0) {
    shell.echo('Error: run dev mode failed');
    shell.exit(1);
  }
}
else {
  shell.echo(`執行 build 模式`);
  if (shell.exec(`npm run build --site=${site} --mode=${mode}`).code !== 0) {
    shell.echo('Error: run build mode failed');
    shell.exit(1);
  }
}
