/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
        <div className="projectLogo">
          <img src={props.img_src} alt="Project Logo" width="200" height="200" />
        </div>
      );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    const GitHubButton = () => (
        <section className="github-section">
            <a className="github-button" href="https://github.com/polakowo/datadocs" data-show-count="true">datadocs</a>
        </section>
    )

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/logo.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('machine-learning/machine-learning')}>Machine Learning</Button>
            <Button href={docUrl('deep-learning/deep-learning')}>Deep Learning</Button>
            <Button href={docUrl('big-data/data-engineering')}>Big Data</Button>
          </PromoSection>
          <GitHubButton/>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
    render() {
      const {config: siteConfig, language = ''} = this.props;
      const {baseUrl} = siteConfig;
  
      const Block = props => (
        <Container
          padding={['bottom', 'top']}
          id={props.id}
          background={props.background}>
          <GridBlock
            align="center"
            contents={props.children}
            layout={props.layout}
          />
        </Container>
      );
  
      const Features = () => (
        <Block layout="threeColumn">
          {[
            {
                content: "`datadocs` is a documentation platform from data scientists for data scientists. It’s goal is to provide summaries of the vast amount of topics available on data science.",
                title: 'Educational',
            },
            {
                content: "It’s hard to keep a reader’s attention in the modern online culture. `datadocs` facilitates organization that calls attention to key topics and encourages writing to be short, concise and cut to the chase.",
                title: 'Organized',
            },
            {
                content: "`datadocs` is a collaborative workspace in which information can be easily shared. Writing documentation is as easy as writing Markdown.",
                title: 'Collaborative',
            },
          ]}
        </Block>
      );
  
      return (
        <div>
          <HomeSplash siteConfig={siteConfig} language={language} />
          <div className="mainContainer">
            <Features />
          </div>
        </div>
      );
    }
  }

Index.description = "Share your knowledge on concepts and phenomena of data science";

module.exports = Index;
