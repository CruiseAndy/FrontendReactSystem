const DOMAINS = "https://admin.fatcatbet.net/api";
const TEST_DOMAINS = "https://reg-backend-staging.1a2b333.com/api";
import { name } from "../../app.json";

/* Tools */
import axios from "axios";

/**
 * zh-TW => '繁體中文'
 * zh-CN => '简体中文'
 * en    => 'English'
 * es    => 'Español'
 * ja    => '日本語'
 */

 export const LangMap = {
  zh_tw: "zh-TW",
  cn: "zh-CN",
  en: "en"
}

export const axios_config = {
  baseURL: DOMAINS,
  timeout: 10000,
  headers: {
    company: "fatcat",
    "Accept-Version": "v2"
  }
};

export const axiosIns = axios.create(axios_config);