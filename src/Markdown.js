import React from 'react';
import marked from 'marked';

const getMarkdownText = content => {
  var rawMarkup = marked(content, { sanitize: true });
  return { __html: rawMarkup };
};

export const MarkdownParser = ({ content }) => {
  return <div dangerouslySetInnerHTML={getMarkdownText(content)} />;
};
