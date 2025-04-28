import React from 'react';
import { Card, Tag, Typography, Space, Tooltip } from 'antd';
import { GlobalOutlined, UserOutlined, FlagOutlined, StarOutlined } from '@ant-design/icons';
import './NewsSnippet.css';

// Интерфейс для данных о новостях
// export interface IData_SnippetNews {
//   ID: number;                   // идентификатор новости
//   TI: string;                   // заголовок новости
//   AB: string;                   // содержимое новости
//   URL: string;                  // ссылка на новость
//   DOM: string;                  // домен
//   DP: string;                   // дата и время публикации новости в формате "%Y-%m-%dT%H:%M:%S")
//   LANG: string;                 // язык новости
//   REACH: number;                // охват новости
//   KW: IData_TagItem[];          // ключевые слова
//   AU: string[];                 // автор новости
//   CNTR: string;                 // страна
//   CNTR_CODE: string;            // код страны
//   SENT: string;                 // сантимент новости
//   TRAFFIC: IData_TrafficItem[]; // траффик из стран
//   FAV: string;                  // ссылка на иконку
//   HIGHLIGHTS: string[];         // блоки содержимого новости с ключевыми словами
// }

// Тэг для сниппета
// export interface IData_TagItem {
//   value: string;                // название тега
//   count: number;                // кол-во тегов с указанным названием
// }

// Траффик для сниппета
// export interface IData_TrafficItem {
//   value: string;                // название страны-источник траффика
//   count: number;                // объём траффика для указанной страны
// }

const { Text, Title, Paragraph } = Typography;

const NewsSnippet = ({ data }) => {
  // Форматирование даты публикации
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      return `${(reach / 1000).toFixed(1)}K`;
    }
    return reach.toString();
  };

  return (
    <Card className="news-snippet" bordered={false}>
      <div className="news-header">
        <div className="news-title-container">
          <div className="news-favicon">
            {data.FAV && <img src={data.FAV} alt="Source favicon" />}
          </div>
          <div className="news-title-info">
            <Title level={4} className="news-title">
              <a href={data.URL} target="_blank" rel="noopener noreferrer">{data.TI}</a>
            </Title>
            <div className="news-meta">
              <Space className="news-meta-items">
                <Text className="news-domain">
                  <GlobalOutlined /> {data.DOM}
                </Text>
                {data.AU.length > 0 && (
                  <Text className="news-author">
                    <UserOutlined /> {data.AU.join(', ')}
                  </Text>
                )}
                <Text className="news-date">
                  {formatDate(data.DP)}
                </Text>
                <Text className={`news-sentiment ${getSentimentClass(data.SENT)}`}>
                  {data.SENT}
                </Text>
              </Space>
            </div>
          </div>
        </div>
        <div className="news-stats">
          <Tooltip title={`Reach: ${data.REACH}`}>
            <div className="news-reach">
              <StarOutlined /> {formatReach(data.REACH)}
            </div>
          </Tooltip>
          <div className="news-country">
            <Tooltip title={data.CNTR}>
              <FlagOutlined /> {data.CNTR_CODE}
            </Tooltip>
          </div>
        </div>
      </div>
      
      <Paragraph className="news-abstract">{data.AB}</Paragraph>
      
      {data.HIGHLIGHTS.length > 0 && (
        <div className="news-highlights">
          {data.HIGHLIGHTS.map((highlight, index) => (
            <Paragraph key={index} className="news-highlight">
              {formatHighlights(highlight)}
            </Paragraph>
          ))}
        </div>
      )}
      
      {data.KW.length > 0 && (
        <div className="news-keywords">
          {data.KW.map((keyword, index) => (
            <Tag key={index} className="news-keyword-tag">
              {keyword.value} ({keyword.count})
            </Tag>
          ))}
        </div>
      )}
      
      {data.TRAFFIC.length > 0 && (
        <div className="news-traffic">
          <Text className="news-traffic-title">Traffic:</Text>
          <div className="news-traffic-items">
            {data.TRAFFIC.map((traffic, index) => (
              <Tag key={index} className="news-traffic-tag">
                {traffic.value} ({(traffic.count * 100).toFixed()}%)
              </Tag>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default NewsSnippet;