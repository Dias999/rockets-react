import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
// next image
import Image from 'next/image';
import logo from './assets/logo.svg';

const config: DocsThemeConfig = {
  logo: <Image src={logo} alt="Rockets Logo" width={38} height={48} />,
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Nextra Docs Template',
  },
};

export default config;
