import React, { useState } from 'react';
import { Typography, Tooltip, Button } from 'antd';
import { 
  GlobalOutlined, 
  UserOutlined, 
  DownOutlined, 
  SortDescendingOutlined,
  InfoCircleOutlined,
  BorderOutlined, 
  CheckSquareOutlined,
  ReadOutlined,
  TagOutlined, 
  FileTextOutlined,
  SecurityScanOutlined,
  AlertOutlined,
  SafetyCertificateOutlined,
  ApiOutlined,
  CodeOutlined,
  SettingOutlined
} from '@ant-design/icons';
import './NewsSnippet.css';

const { Text } = Typography;

const NewsSnippet = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const [showAllKeywords, setShowAllKeywords] = useState(false);

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

  // Выделение ключевых слов в полном тексте
  const formatFullText = (text) => {
    if (!text || !data.KW || data.KW.length === 0) return text;
    
    // Создаем регулярное выражение для поиска ключевых слов
    // Сортируем ключевые слова по длине (от длинных к коротким), 
    // чтобы избежать проблем с подстроками
    const keywordsRegex = data.KW
      .sort((a, b) => b.value.length - a.value.length)
      .map(kw => kw.value)
      .join('|');
      
    const regex = new RegExp(`(${keywordsRegex})`, 'gi');
    
    // Разбиваем текст на части по ключевым словам
    const parts = text.split(regex);
    
    // Отображаем каждую часть, выделяя ключевые слова
    return parts.map((part, index) => {
      const isKeyword = data.KW.some(kw => 
        kw.value.toLowerCase() === part.toLowerCase()
      );
      
      if (isKeyword) {
        return <span key={index} className="keyword-highlight">{part}</span>;
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

  // Определяем отображаемые ключевые слова
  const displayedKeywords = showAllKeywords ? data.KW : data.KW.slice(0, 3);

  // Добавьте функцию выбора иконки внутри компонента
  const getIconForKeyword = (keyword) => {
    // Можно настроить правила выбора иконок на основе ключевых слов
    switch (keyword.toLowerCase()) {
      case 'antivirus':
        return <SecurityScanOutlined />;
      case 'kaspersky':
        return <SafetyCertificateOutlined />;
      case 'new':
        return <AlertOutlined />;
      case 'key word 1':
        return <FileTextOutlined />;
      case 'key word 2':
        return <GlobalOutlined />;
      case 'key word 3':
        return <UserOutlined />;
      case 'key word 4':
        return <ApiOutlined />;
      case 'key word 5':
        return <CodeOutlined />;
      default:
        return <TagOutlined />;
    }
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
            <CheckSquareOutlined style={{ color: '#9aa0a6', marginLeft: '8px' }} />
          </Tooltip>
          <Tooltip title="Bookmark">
            <BorderOutlined style={{ color: '#9aa0a6', marginLeft: '8px' }} />
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
          <GlobalOutlined />
          <a href={`https://${data.DOM}`} target="_blank" rel="noopener noreferrer">
            {data.DOM}
          </a>
        </div>
        <div className="news-country">
          <img 
            src={`https://flagcdn.com/24x18/fr.png`} 
            alt="France" 
            className="flag-icon"
          />
          <span>{data.CNTR}</span>
        </div>
        <div className='news-language'>
          <span className='lang-icon'><ReadOutlined /></span>
          <span>{data.LANG}</span>
        </div>
        <div className="news-authors">
          <UserOutlined />
          <span>{data.AU && data.AU.length > 0 ? data.AU.join(', ') : 'Unknown'}</span>
        </div>
      </div>

      {/* Основной контент и выделенные части */}
      <div className="news-content">
        {/* Показываем первый highlight только если не нажата кнопка "Show more" */}
        {!showMore && data.HIGHLIGHTS && data.HIGHLIGHTS.length > 0 && (
          <div className="news-highlight">
            {formatHighlights(data.HIGHLIGHTS[0])}
          </div>
        )}
        
        {/* При нажатии "Show more" показываем полный текст */}
        {showMore && (
          <div className="news-full-text">
            {formatFullText(data.AB)}
          </div>
        )}
      </div>

      {/* Кнопка "Показать больше" */}
      <div className="show-more" onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Show less' : 'Show more'} <DownOutlined style={{ transform: showMore ? 'rotate(180deg)' : 'none' }} />
      </div>

      {/* Ключевые слова с счетчиками */}
      <div className="keywords-container">
        {displayedKeywords.map((keyword, index) => (
          <div key={index} className="keyword-tag">
            {getIconForKeyword(keyword.value)}
            {keyword.value}
            <span className="keyword-count">{keyword.count}</span>
          </div>
        ))}
        
        {data.KW && data.KW.length > 3 && (
          <div className="show-all" onClick={() => setShowAllKeywords(!showAllKeywords)}>
            {showAllKeywords ? 'Show Less' : `Show All +${data.KW.length - displayedKeywords.length}`}
          </div>
        )}
      </div>

      <Button className="original-source-btn">
        Original Source
      </Button>

      {/* Секция с дубликатами */}
      <div className="duplicates-section">
        <div className="duplicates-header">
          <span>Duplicates: <span className="duplicates-count">192</span></span>
          <div className="sort-by">
            By Relevance <DownOutlined style={{ color: '#fff' }} />
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
              <img src={data.FAV} alt="Source icon" />
              <a href={`https://ria.ru`} target="_blank" rel="noopener noreferrer">
                ria.ru
              </a>
            </div>
            <div className="news-country">
            <img 
              src={`https://flagcdn.com/24x18/fr.png`} 
              alt="France" 
              className="flag-icon"
            />
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