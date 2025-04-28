import React, { useState } from 'react';
import { Typography, Tooltip, Button } from 'antd';
import { 
  GlobalOutlined, 
  UserOutlined, 
  DownOutlined, 
  SortDescendingOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import './NewsSnippet.css';

const { Text } = Typography;

const NewsSnippet = ({ data }) => {
  const [showMore, setShowMore] = useState(false);

  // Форматирование даты публикации
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    
    return (
      <>
        <span className="day-number">{day}</span> {month} {year}
      </>
    );
  };

  // Выделение и форматирование ключевых слов в тексте highlights
  const formatHighlights = (highlight) => {
    // Разделяем текст на части по тегам <kw></kw>
    const parts = highlight.split(/(<kw>.*?<\/kw>)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('<kw>') && part.endsWith('</kw>')) {
        // Извлекаем текст между тегами <kw> и </kw>
        const keyword = part.substring(4, part.length - 5);
        return <span key={index} className="keyword-highlight">{keyword}</span>;
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  // Форматирование числа охвата
  const formatReach = (reach) => {
    if (reach >= 1000) {
      return <span>{(reach / 1000).toFixed(1)}K</span>;
    }
    return <span>{reach.toString()}</span>;
  };

  // Форматирование трафика для отображения
  const formatTraffic = () => {
    if (!data.TRAFFIC || data.TRAFFIC.length === 0) return '';
    
    let trafficText = 'Top Traffic: ';
    data.TRAFFIC.forEach((item, index) => {
      if (index < 3) { // Показываем только топ-3 страны
        trafficText += item.value + ' ';
        // Оборачиваем процент в span с классом
        trafficText += `<span class="traffic-percent">${Math.round(item.count * 100)}%</span>`;
        if (index < Math.min(2, data.TRAFFIC.length - 1)) {
          trafficText += ' ';
        }
      }
    });
    
    return <span dangerouslySetInnerHTML={{ __html: trafficText }} />;
  };

  return (
    <div className="news-snippet">
      {/* Верхняя часть с датой и статистикой */}
      <div className="news-reach-info">
        <div className="news"> 
          <div className="news-date">
            {formatDate(data.DP)}
          </div>
          <span className="news-reach">{formatReach(data.REACH)} Reach</span>
          <span className="news-traffic">{formatTraffic()}</span>
          </div>
        <div className="prefix"> 
          <span className={`news-sentiment sentiment-${data.SENT.toLowerCase()}`}>
            {data.SENT.charAt(0).toUpperCase() + data.SENT.slice(1)}
          </span>
          <Tooltip title="Info">
            <InfoCircleOutlined style={{ color: '#9aa0a6', marginLeft: '8px' }} />
          </Tooltip>
          <Tooltip title="Bookmark">
            <InfoCircleOutlined style={{ color: '#9aa0a6', marginLeft: '8px' }} />
          </Tooltip>
        </div>
      </div>

      {/* Заголовок новости */}
      <h2 className="news-title">
        <a href={data.URL} target="_blank" rel="noopener noreferrer">
          {data.TI}
        </a>
      </h2>

      {/* Информация об источнике */}
      <div className="news-source-info">
        <div className="news-domain">
          <img src={data.FAV} alt="Source icon" />
          <span>{data.DOM}</span>
        </div>
        <div className="news-language">
          <span className="flag-icon">🇦🇹</span>
          <span>{data.CNTR}</span>
        </div>
        <div className="news-authors">
          <UserOutlined />
          <span>{data.AU && data.AU.length > 0 ? data.AU.join(', ') : 'Unknown'}</span>
        </div>
      </div>

      {/* Основной контент и выделенные части */}
      <div className="news-content">
        {!showMore ? (
          // Показываем только первый хайлайт, если он есть
          data.HIGHLIGHTS && data.HIGHLIGHTS.length > 0 ? (
            <div className="news-highlights">
              <div className="news-highlight">
                {formatHighlights(data.HIGHLIGHTS[0])}
              </div>
            </div>
          ) : (
            // Если хайлайтов нет, показываем сокращенную версию AB
            <div className="news-abstract">
              {data.AB && data.AB.length > 150 ? data.AB.substring(0, 150) + '...' : data.AB}
            </div>
          )
        ) : (
          // При нажатии "Show more" показываем полный текст новости (AB)
          <div className="news-abstract">
            {data.AB}
          </div>
        )}
      </div>

      {/* Кнопка "Показать больше" */}
      <div className="show-more" onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Show less' : 'Show more'} <DownOutlined style={{ transform: showMore ? 'rotate(180deg)' : 'none' }} />
      </div>

      {/* Ключевые слова с счетчиками */}
      <div className="keywords-container">
        {data.KW && data.KW.map((keyword, index) => (
          <div key={index} className="keyword-tag">
            {keyword.value}
            <span className="keyword-count">{keyword.count}</span>
          </div>
        ))}

        {/* Дополнительно добавляем фиктивные ключевые слова из скриншота */}
        <div className="keyword-tag">
          key word
          <span className="keyword-count">1</span>
        </div>
        <div className="keyword-tag">
          key word
          <span className="keyword-count">1</span>
        </div>
        <div className="keyword-tag">
          key word
          <span className="keyword-count">1</span>
        </div>
        
        <div className="show-more">
          Show All +9
        </div>
      </div>

      <Button className="original-source-btn">
        Original Source
      </Button>

      {/* Секция с дубликатами */}
      <div className="duplicates-section">
        <div className="duplicates-header">
          <span>Duplicates: 192</span>
          <div className="sort-by">
            By Relevance <SortDescendingOutlined />
          </div>
        </div>

        <div className="duplicate-item">
          <div className="duplicate-header">
            <div className="duplicate-date">{formatDate(data.DP)}</div>
            <div className="duplicate-reach">{formatReach(data.REACH)} Top Reach</div>
          </div>
          <div className="duplicate-title">
            <a href={data.URL} target="_blank" rel="noopener noreferrer">
              {data.TI}
            </a>
          </div>
          <div className="duplicate-source">
            <div className="duplicate-domain">
              <GlobalOutlined />
              <span>ria.ru</span>
            </div>
            <div className="news-language">
              <span className="flag-icon">🇦🇹</span>
              <span>{data.CNTR}</span>
            </div>
            <div className="duplicate-authors">
              <UserOutlined />
              <span>{data.AU && data.AU.length > 0 ? data.AU.join(', ') : 'Unknown'}</span>
            </div>
          </div>
        </div>

        <button className="view-duplicates-btn">
          <DownOutlined /> View Duplicates
        </button>
      </div>
    </div>
  );
};

export default NewsSnippet;