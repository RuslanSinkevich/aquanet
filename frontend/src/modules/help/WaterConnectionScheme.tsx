import React from "react";
import { Card, Typography, Space, Flex } from "antd";

const { Title, Paragraph, Text } = Typography;

const WaterConnectionInfo = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card>
        <Title level={3}>🔧 Как работает подключение к воде</Title>
        <Paragraph>
          На вашей улице ставятся точки подключения{" "}
          <Text strong>(колодцы)</Text>. Каждая точка подключения — это место,
          откуда можно провести воду на участок.
        </Paragraph>
      </Card>

      <Card>
        <Title level={4}>🏠 Пример</Title>
        <Paragraph>
          На улице 6 домов. Мы ставим 3 точки подключения (колодца):
        </Paragraph>
        <ul>
          <li>
            Точка 1 — обслуживает дома <Text code>1</Text> и <Text code>2</Text>
          </li>
          <li>
            Точка 2 — обслуживает дома <Text code>3</Text> и <Text code>4</Text>
          </li>
          <li>
            Точка 3 — обслуживает дома <Text code>5</Text> и <Text code>6</Text>
          </li>
        </ul>
        <Paragraph>
          Каждая точка — это <Text strong>разовая работа</Text>: нужно выкопать
          яму, поставить кольца, провести трубу до неё и т.д.
        </Paragraph>
      </Card>

      <Card>
        <Title level={4}>💰 Как считается стоимость</Title>
        <Space direction="vertical" size="small">
          <Text>
            • Стоимость колодца — делится между теми, кто к нему подключён.
          </Text>
          <Text>
            • Если к точке 1 подключены дома 1 и 2 — они делят её стоимость.
          </Text>
          <Text>
            • Все клиенты дальше (3, 4, 5, 6) не платят за этот колодец.
          </Text>
          <Text>
            • Если вы подключены к следующей точке — вы не платите за
            предыдущие.
          </Text>
        </Space>
        <Paragraph>
          <Text strong>Но самый дальний клиент платит больше:</Text>
        </Paragraph>
        <ul>
          <li>Для него нужно провести трубу дальше.</li>
          <li>
            Труба до первой точки — толще и дороже, ведь через неё проходит вода
            для всех.
          </li>
        </ul>
        <Text italic>
          Поэтому трубы считаются отдельно, и чем дальше — тем дороже.
        </Text>
      </Card>

      <Card>
        <Title level={4}>📦 Что входит в стоимость</Title>
        <Flex vertical gap="small">
          <Text>• Материалы (бетонные кольца, люки, трубы)</Text>
          <Text>• Работы (копка, монтаж, прокол земли)</Text>
          <Text>• Технадзор (может быть отдельно)</Text>
        </Flex>
      </Card>
    </Space>
  );
};
<script async src="https://comments.app/js/widget.js?3"
        data-comments-app-website="r8jBNIEP"
        data-limit="5"
        data-color="F4F4F4"
        data-dislikes="1"
        data-outlined="1"
        data-colorful="1"
        data-dark="0"></script>
export default WaterConnectionInfo;
