import React from "react";
import { Card, Typography, Space, Tag } from "antd";

const { Title, Paragraph, Text } = Typography;

const WaterConnectionInfo = () => {


  return (
    <div className="container py-4">
    <div className="text-center mb-3">
      <Text type="danger" strong style={{ fontSize: '14px' }}>
        Внимание: приведённый ниже пример носит ознакомительный характер.
      </Text>
    </div>
    <div className="text-center mb-3">
      <Title level={2} className="mb-0">
        Подключение к системе водоснабжения
        <br />
        Лесосибирск, пер. Отрадный
      </Title>
    </div>

    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <Card size="small" title="📋 Этапы реализации проекта">
        <ol>
          <li>Согласование с администрацией</li>
          <li>Закупка колодцев</li>
          <li>Монтаж колодцев</li>
          <li>Закупка труб и фитингов</li>
          <li>Прокладка труб</li>
          <li>Сварка и герметизация</li>
        </ol>
      </Card>

      <Card size="small" title="🔧 Подключение к водоснабжению">
        <Paragraph>
          Устанавливаются <Text strong>точки подключения (колодцы)</Text> — места, откуда подводится вода к участкам.
        </Paragraph>
        <Paragraph type="danger">
          <Text strong>Важно:</Text> Труба от колодца до дома укладывается каждым собственником самостоятельно.
        </Paragraph>
      </Card>

      <Card size="small" title="🏠 Пример расположения колодцев">
        <Paragraph>Улица с 6 домами. Установлены 3 колодца:</Paragraph>
        <ul>
          <li>Колодец 1 — дома 1 и 2</li>
          <li>Колодец 2 — дома 3 и 4</li>
          <li>Колодец 3 — дома 5 и 6</li>
        </ul>
        <Paragraph>
          Каждый колодец — это отдельный комплекс работ: выемка грунта, установка колец, подключение к магистрали.
        </Paragraph>
      </Card>

      <Card size="small" title="💡 Оплата за колодцы">
        <Space direction="vertical" size="small">
          <div><Tag color="blue">Колодец 1</Tag> Дома 1, 2 + проходящие: 3–6</div>
          <div><Tag color="green">Колодец 2</Tag> Дома 3, 4 + проходящие: 5–6</div>
          <div><Tag color="orange">Колодец 3</Tag> Дома 5 и 6</div>
        </Space>
      </Card>

      <Card size="small" title="💰 Оплата за трубы и фитинги">
        <Space direction="vertical" size="small">
          <div><Tag color="red">Труба 1</Tag> Источник → Колодец 1 — платят дома 1–6</div>
          <div><Tag color="red">Труба 2</Tag> Колодец 1 → Колодец 2 — платят дома 3–6</div>
          <div><Tag color="red">Труба 3</Tag> Колодец 2 → Колодец 3 — платят дома 5 и 6</div>
        </Space>
      </Card>

      <Card size="small" title="📊 Принцип распределения затрат">
        <Space direction="vertical" size="small">
          <Text>• Колодцы: платят те, кто подключён или проходит через.</Text>
          <Text>• Трубы: платят все, кто использует участок на пути к дому.</Text>
          <Text>• Чем дальше дом, тем выше участие в общей стоимости.</Text>
        </Space>
      </Card>

      <Card size="small" title="📦 Что входит в стоимость">
        <Space direction="vertical" size="small">
          <Text>• Материалы: кольца, трубы, люки, фитинги</Text>
          <Text>• Работы: копка, монтаж, прокол дорог</Text>
          <Text>• Организация: прораб, логистика, согласования</Text>
        </Space>
      </Card>
    </Space>

    <div id="anycomment-app" />
  </div>
  );
};

export default WaterConnectionInfo;
