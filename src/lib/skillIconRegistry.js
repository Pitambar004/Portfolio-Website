import { FaJava } from 'react-icons/fa'
import { FaCloud } from 'react-icons/fa'
import {
  SiCss,
  SiGit,
  SiGithub,
  SiC,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSqlite,
  SiOpenai,
} from 'react-icons/si'

/** Maps stable ids (used in siteData.json) to icon config for the Skills grid. */
export const SKILL_ICON_REGISTRY = {
  java: { Icon: FaJava, color: '#EA2845' },
  python: { Icon: SiPython, color: '#3776AB' },
  javascript: { Icon: SiJavascript, color: '#F7DF1E' },
  c: { Icon: SiC, color: '#A8B9CC' },
  sql: { Icon: SiSqlite, color: '#4479A1' },
  html: { Icon: SiHtml5, color: '#E34F26' },
  css: { Icon: SiCss, color: '#1572B6' },
  react: { Icon: SiReact, color: '#61DAFB' },
  nodejs: { Icon: SiNodedotjs, color: '#3C873A' },
  git: { Icon: SiGit, color: '#F05032' },
  github: { Icon: SiGithub, color: '#181717' },
  mysql: { Icon: SiMysql, color: '#00758F' },
  'azure-openai': {
    Icon: FaCloud,
    overlayIcon: SiOpenai,
    color: '#0078D4',
    overlayColor: '#E5E7EB',
  },
}

export function getSkillIconIds() {
  return Object.keys(SKILL_ICON_REGISTRY)
}
