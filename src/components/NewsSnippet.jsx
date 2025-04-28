import React, { useState } from 'react';
import { Card, Tag, Typography, Space, Tooltip } from 'antd';
import { GlobalOutlined, UserOutlined, FlagOutlined, StarOutlined } from '@ant-design/icons';
import './NewsSnippet.css';

const { Text, Title, Paragraph } = Typography;

const NewsSnippet = ({ data }) => {
  const [showMore, setShowMore] = useState(false);

  // Форматирование даты публикации
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Выделение и форматирование ключевых слов в тексте highlights
  const formatHighlights = (highlight) => {
    // Разделяем текст на части по тегам <kw></kw>
    const parts = highlight.split(/(<kw>.*?<\/kw>)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('<kw>') && part.endsWith('</kw>')) {
        // Извлекаем текст между тегами <kw> и </kw>
        const keyword = part.substring(4, part.length - 5);
        return <Text key={index} className="keyword">{keyword}</Text>;
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  // Определение класса цвета сантимента
  const getSentimentClass = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'sentiment-positive';
      case 'negative':
        return 'sentiment-negative';
      case 'neutral':
        return 'sentiment-neutral';
      default:
        return '';
    }
  };

  // Форматирование числа охвата
  const formatReach = (reach) => {
    if (reach >= 1000) {
      return `${Math.floor(reach / 1000)}K`;
    }
    return reach.toString();
  };

  // Форматирование процентов трафика
  const formatTrafficPercent = (value) => {
    return `${Math.floor(value * 100)}%`;
  };

  return (
    <Card className="news-snippet" bordered={false}>
      <div className="news-header">
        <div className="news-date-reach">
          <span className="news-date">{formatDate(data.DP)}</span>
          <span className="news-reach">{formatReach(data.REACH)} Reach</span>
          <span className="news-traffic-top">
            Top Traffic: 
            {data.TRAFFIC && data.TRAFFIC.map((traffic, index) => (
              <span key={index} className="traffic-item">
                {` ${traffic.value} ${formatTrafficPercent(traffic.count)}`}
                {index < data.TRAFFIC.length - 1 && ' '}
              </span>
            ))}
          </span>
        </div>
        <div className="news-sentiment-container">
          <Tag className={`news-sentiment ${getSentimentClass(data.SENT)}`}>
            {data.SENT}
          </Tag>
          <div className="icon-buttons">
            <button className="icon-btn">i</button>
            <button className="icon-btn">□</button>
          </div>
        </div>
      </div>

      <Title level={4} className="news-title">
        <a href={data.URL} target="_blank" rel="noopener noreferrer">{data.TI}</a>
      </Title>

      <div className="news-source-info">
        <div className="news-source">
          <GlobalOutlined className="globe-icon" />
          <span className="source-name">{data.DOM}</span>
          <span className="country-flag">{data.CNTR}</span>
        </div>
        <div className="news-authors">
          <UserOutlined className="user-icon" />
          {data.AU && data.AU.length > 0 ? (
            <span className="authors-names">{data.AU.join(', ')}</span>
          ) : (
            <span className="authors-names">Unknown author</span>
          )}
        </div>
      </div>

      <div className="news-content">
        <Paragraph className="news-abstract" ellipsis={{ rows: 3, expandable: false }}>
          {data.AB}
        </Paragraph>

        {data.HIGHLIGHTS && data.HIGHLIGHTS.length > 0 && (
          <div className={`news-highlights ${showMore ? 'expanded' : ''}`}>
            {data.HIGHLIGHTS.map((highlight, index) => (
              <Paragraph key={index} className="news-highlight">
                {formatHighlights(highlight)}
              </Paragraph>
            ))}
          </div>
        )}
      </div>

      <div className="news-footer">
        <div className="show-more" onClick={() => setShowMore(!showMore)}>
          Show {showMore ? 'less' : 'more'} <span className="show-more-arrow">{showMore ? '▲' : '▼'}</span>
        </div>

        <div className="news-tags">
          {data.KW && data.KW.map((keyword, index) => (
            <Tag className="tag-with-count" key={index}>
              <span className="tag-icon">⊙</span> {keyword.value} <span className="tag-count">{keyword.count}</span>
            </Tag>
          ))}
          {data.KW && data.KW.length > 0 && (
            <span className="show-all-tags">Show All +{data.KW.length}</span>
          )}
        </div>

        <div className="news-source-link">
          <a href={data.URL} className="source-link-btn">Original Source</a>
        </div>

        <div className="news-duplicates">
          <span className="duplicates-count">Duplicates: {data.ID % 1000}</span>
          <span className="sort-by">By Relevance <span className="sort-arrow">▼</span></span>
        </div>
      </div>
    </Card>
  );
};

export default NewsSnippet;