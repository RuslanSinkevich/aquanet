import React from 'react';
import { Typography, Card, Row, Col, Statistic } from 'antd';
import { TeamOutlined, EnvironmentOutlined, DollarOutlined, ToolOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const WaterConnectionPage: React.FC = () => {
  return (
    <>
      <Title level={2}>Система водоснабжения пер. Отрадный</Title>
      <Paragraph>
        Система управления проектом водоснабжения для переулка Отрадный в г. Лесосибирск.
        Проект включает в себя установку колодцев и прокладку труб для обеспечения жителей водой.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Точки подключения"
              value={3}
              prefix={<EnvironmentOutlined />}
              suffix="колодца"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Клиенты"
              value={6}
              prefix={<TeamOutlined />}
              suffix="человек"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Общая стоимость"
              value={150000}
              prefix={<DollarOutlined />}
              suffix="₽"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Выполнено работ"
              value={30}
              prefix={<ToolOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Этапы работ">
            <ol>
              <li>Согласование проекта в администрации</li>
              <li>Приобретение и установка колодцев</li>
              <li>Закупка труб и материалов</li>
              <li>Прокладка магистральных труб</li>
              <li>Подключение домов к колодцам</li>
            </ol>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Схема подключения">
            <ul>
              <li>Один колодец обслуживает два дома</li>
              <li>Собственники самостоятельно проводят воду от колодца к дому</li>
              <li>Оплата разделена на две части: колодцы и трубы</li>
              <li>Стоимость распределяется между подключенными клиентами</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </>
  );
}; 