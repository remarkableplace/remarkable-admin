import React from 'react';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import prism from 'markdown-it-prism';

const md = new MarkdownIt();
md.use(prism);

function Markdown({ markdown }) {
  const html = md.render(markdown);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

Markdown.propTypes = {
  markdown: PropTypes.string.isRequired
};

export default Markdown;
