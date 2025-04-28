import React from 'react';
import { Layout } from 'antd';
import NewsSnippet from './components/NewsSnippet';
import './App.css';

const { Content } = Layout;

const App = () => {
  // Пример данных из задания
  const newsData = {
    "ID": 260855433,
    "TI": "Antivirus leggero: i migliori e più efficaci (free e a pagamento) 2024",
    "AB": "...leading innovator in InnovTech in autonomous driving technology... This next-generation autonomous driving solution promises to revolutionize the way... The AutoPilot 5000 utilizes advanced artificial intelligence and machine learning... InnovTech believes the AutoPilot 5000 represents a significant leap... Early testing has shown remarkable results, with the AutoPilot 5000 demonstr...",
    "URL": "https://www.example.com/antivirus-leggero-2024",
    "DP": "2024-06-18T12:00:00",
    "DOM": "punto-info.it",
    "SENT": "positive",
    "LANG": "it",
    "AU": ["Emily C.", "Taormina A.", "et al."],
    "FAV": "/favicons/e65d69dc71ab539384fcc63062efdd3d.png",
    "KW": [
      {
        "value": "AutoPilot 5000",
        "count": 5
      },
      {
        "value": "InnovTech",
        "count": 5
      },
      {
        "value": "autonomous driving",
        "count": 5
      },
      {
        "value": "key word",
        "count": 1
      }
    ],
    "HIGHLIGHTS": [
      "...leading innovator in <kw>InnovTech</kw> in <kw>autonomous driving</kw> technology... This next-generation <kw>autonomous driving</kw> solution promises to revolutionize the way... The <kw>AutoPilot 5000</kw> utilizes advanced artificial intelligence and machine learning... <kw>InnovTech</kw> believes the <kw>AutoPilot 5000</kw> represents a significant leap... Early testing has shown remarkable results, with the <kw>AutoPilot 5000</kw> demonstr..."
    ],
    "REACH": 211000,
    "CNTR": "Austria",
    "CNTR_CODE": "at",
    "TRAFFIC": [
      {
        "value": "Austria",
        "count": 0.38
      },
      {
        "value": "USA",
        "count": 0.12
      },
      {
        "value": "Italian",
        "count": 0.08
      }
    ]
  };

  return (
    <Layout className="app-layout">
      <Content className="app-content">
        <div className="app-container">
          <NewsSnippet data={newsData} />
        </div>
      </Content>
    </Layout>
  );
};

export default App;