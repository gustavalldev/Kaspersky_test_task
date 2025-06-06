import React from 'react';
import { Layout } from 'antd';
import NewsSnippet from './components/NewsSnippet';
import './App.css';

const { Content } = Layout;

const App = () => {
  // Пример данных из задания
  const newsData = {
    "ID": 260855433,
    "TI": "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones",
    "AB": "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones\nAugust 2020 by Kaspersky\nNew research has revealed that UK consumers carry out online banking on smartphones and devices that are potentially vulnerable to a security breach, despite making sure they keep their desktop or laptop computers safe. In a study commissioned by Kaspersky, nearly half (47%) of smartphone owners who use a banking app don't protect their mobile device with antivirus or security sof...",
    "URL": "https://www.globalsecuritymag.com/Mobile-bankers-left-vulnerable-47,20200819,101944.html",
    "DP": "2025-03-06T21:00:00",
    "DOM": "globalsecuritymag.com",
    "SENT": "negative",
    "LANG": "en",
    "AU": [],
    "FAV": "/favicons/7738202.png",
    "KW": [
      {
        "value": "antivirus",
        "count": 10
      },
      {
        "value": "kaspersky",
        "count": 5
      },
      {
        "value": "new",
        "count": 1
      },
      {
        "value": "key word 1",
        "count": 3
      },
      {
        "value": "key word 2",
        "count": 2
      },
      {
        "value": "key word 3",
        "count": 1
      },
      {
        "value": "key word 4",
        "count": 5
      },
      {
        "value": "key word 5",
        "count": 2
      },
      {
        "value": "key word 6",
        "count": 4
      },
      {
        "value": "key word 7",
        "count": 1
      },
      {
        "value": "key word 8",
        "count": 3
      },
      {
        "value": "key word 9",
        "count": 6
      }
    ],
    "HIGHLIGHTS": [
      "...with <kw>antivirus</kw> or security software. More than half (52%) of UK smartphone owners who access bank accounts with their mobile device are worried about their banking app being hacked if their phone was lost or stolen. Despite that fear, 47%[2] are banking on devices without <kw>antivirus</kw>...",
    ],
    "REACH": 2392,
    "CNTR": "France",
    "CNTR_CODE": "fr",
    "TRAFFIC": [
      {
        "value": "India",
        "count": 0.779
      },
      {
        "value": "United States of America",
        "count": 0.101
      },
      {
        "value": "Mexico",
        "count": 0.036
      }
    ]
  };

  return (
    <Layout style={{minHeight: '100vh', padding: '24px' }}>
      <Content style={{ maxWidth: '900px', margin: '0 auto' }}>
        <NewsSnippet data={newsData} />
      </Content>
    </Layout>
  );
};

export default App;