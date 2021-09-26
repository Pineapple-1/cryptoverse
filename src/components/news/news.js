import React, { useState } from "react";
import { Row, Col, Card, Select, Typography, Avatar } from "antd";
import moment from "moment";
import { useGetNewsQuery } from "../../services/newsApi";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Loader from "../loader/loader";
const { Title, Text } = Typography;
const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptos} = useGetCryptosQuery(100);
  const { data, isFetching } = useGetNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  console.log(data);

  if (isFetching) return <Loader/>;
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"

            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
          >
            <Option value = 'Cryptocurrency'>Cryptocurrency</Option>
            {cryptos?.data?.coins.map((coin)=><Option value = {coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {data.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={5}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substrig(0, 80)} ...`
                  : news.description}
              </p>

              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news"
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
