import SiteConfig from "../regulatory/Demo/config";

/* Tools */
import axios from "axios";

/**
 * zh-TW => '繁體中文'
 * zh-CN => '简体中文'
 * en    => 'English'
 * es    => 'Español'
 * ja    => '日本語'
 * th    => '泰語'
 * vi    => '越語'
 */

export const apiURL = SiteConfig.domain.main;

const axios_config = {
  baseURL: apiURL,
  timeout: SiteConfig.apiTimeout,
  headers: {
    company: SiteConfig.company,
    "Accept-Version": SiteConfig.apiVersion,
    locale: SiteConfig.defaultLocale
  }
};

export const axiosIns = axios.create(axios_config);